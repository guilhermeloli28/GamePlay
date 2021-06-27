import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native';
import { styles } from './styles';
import GuidIcon from '../GuildIcon';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

export type GuildProps = {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

type Props = TouchableOpacityProps & {
    data: GuildProps;
}

function Guild({ data, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            {...rest}
        >
            <GuidIcon guildId={data.id} iconId={data.icon} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>
                    <Text style={styles.type}>
                        {data.owner ? 'Administrador' : 'Convidado'}
                    </Text>
                </View>
            </View>

            <Feather
                name="chevron-right"
                size={24}
                color={theme.colors.heading}
            />
        </TouchableOpacity>
    )
}

export default Guild;
