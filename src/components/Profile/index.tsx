import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Avatar from '../Avatar';
import { useAuth } from "../../hooks/auth";
import { RectButton } from 'react-native-gesture-handler';
import ModalView from '../Modal';

function Profile() {
    const { user, signOut } = useAuth();
    const [visibleModal, setVisibleModal] = useState(false);

    function handleSignOut() {
        Alert.alert('Logout', 'deseja sair do gameplay', [
            {
                text: 'Sim',
                onPress: () => signOut()
            }
        ])
    }

    function handleCloseModal() {
        setVisibleModal(false);
    }

    return (
        <>
            <View style={styles.container}>
                <RectButton onPress={() => setVisibleModal(true)}>
                    <Avatar urlImage={user.avatar} />
                </RectButton>

                <View>
                    <View style={styles.user}>
                        <Text style={styles.greeting}>
                            Olá,
                        </Text>

                        <Text style={styles.username}>
                            {user.username.split(' ')[0]}
                        </Text>

                    </View>

                    <Text style={styles.message}>
                        Hoje é dia de vitória
                    </Text>
                </View>
            </View>

            <ModalView
                visible={visibleModal}
                onRequestClose={handleCloseModal}
                closeModal={handleCloseModal}
                isLogout
                animationType="fade"
            >
                <View style={styles.footerModal}>
                    <Text style={styles.title}>Deseja sair do GamePlay?</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.btnNot}
                            onPress={handleCloseModal}
                        >
                            <Text style={styles.text}>Não</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnYes}
                            onPress={() => signOut()}
                        >
                            <Text style={styles.text}>Sim</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalView>
        </>
    )
}

export default Profile;