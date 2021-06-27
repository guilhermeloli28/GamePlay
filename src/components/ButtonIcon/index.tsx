import React from "react";
import { Text, Image, View } from 'react-native';
import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type Props = RectButtonProps & {
    title: string;
}

function ButtonIcon({ title, ...rest }: Props) {
    return (
        <RectButton style={styles.container} {...rest}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    );
}

export default ButtonIcon;