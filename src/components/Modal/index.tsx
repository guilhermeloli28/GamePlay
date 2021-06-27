import React, { ReactNode } from "react";
import { Modal, View, ModalProps, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import BackGround from '../Background';

type Props = ModalProps & {
    children: ReactNode;
    closeModal: () => void;
    isLogout?: boolean;
}

function ModalView({ children, closeModal, isLogout = false, ...rest }: Props) {
    return (
        <Modal
            transparent
            statusBarTranslucent
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={[
                        styles.container,
                        isLogout ? { marginTop: 650 } : { marginTop: 100 }
                    ]}>
                        <BackGround>
                            <View style={styles.bar} />
                            {children}
                        </BackGround>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal >
    )
}

export default ModalView;