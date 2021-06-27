import React from "react";
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import IlustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import ButtonIcon from '../../components/ButtonIcon';
import { useAuth } from '../../hooks/auth';
import { theme } from "../../global/styles/theme";

function SignIn() {
    const { signIn, loading } = useAuth();

    async function handleSignIn() {
        try {
            await signIn();
        } catch (error) {
            Alert.alert(error);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={IlustrationImg} style={styles.image} resizeMode="stretch" />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Conecte-se {'\n'}
                    e organize {'\n'}
                    suas jogatinas
                </Text>

                <Text style={styles.subtitle}>
                    Crie grupos para jogar seus games {`\n`}
                    favoritos com seus amigos
                </Text>

                {
                    loading ?
                        <ActivityIndicator color={theme.colors.primary} />
                        : <ButtonIcon
                            title="Entrar com discord"
                            onPress={handleSignIn}
                        />
                }
            </View>
        </View>
    );
}

export default SignIn;