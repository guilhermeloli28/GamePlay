import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import *  as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLETION_USER } from '../configs/database';

const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

import api from "../services/api";

type User = {
    id: string;
    username: string;
    firstname: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    loading: boolean;
}

type AuthProviderProp = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProp) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    async function signIn() {
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            const { type, params } = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success' && !params.error) {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');

                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                    ...userInfo.data,
                    token: params.access_token
                };

                await AsyncStorage.setItem(COLLETION_USER, JSON.stringify(userData));

                setUser(userData);
            }
        } catch {
            throw new Error('Não foi possível autenticar');
        } finally {
            setLoading(false);
        }
    }

    async function loadUserStorage() {
        const user = await AsyncStorage.getItem(COLLETION_USER);

        if (user) {
            const userLogged = JSON.parse(user) as User;
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

            setUser(userLogged);
        }
    }

    async function signOut() {
        setUser({} as User);

        await AsyncStorage.removeItem(COLLETION_USER);
    }

    useEffect(() => {
        loadUserStorage();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}