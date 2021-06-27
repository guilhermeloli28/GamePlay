import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import Guild from '../../components/Guild';
import ListDivider from '../../components/ListDivider';
import { GuildProps } from '../../components/Guild';
import Load from '../../components/Load';
import api from '../../services/api';

type Props = {
    handleGuildsSelected: (guild: GuildProps) => void;
}

function Guilds({ handleGuildsSelected }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? <Load />
                : <FlatList
                    data={guilds}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <ListDivider size="72%" isCentered />}
                    contentContainerStyle={{ paddingBottom: 69, paddingTop: 104 }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <ListDivider size="72%" />}
                    style={styles.guild}
                    renderItem={({ item }) => (
                        <Guild
                            data={item}
                            onPress={() => handleGuildsSelected(item)}
                        />
                    )}
                />}
        </View>
    )
}

export default Guilds;
