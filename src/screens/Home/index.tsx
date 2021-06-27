import React, { useState, useCallback } from "react";
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import Profile from '../../components/Profile';
import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from "../../components/CategorySelect";
import ListHeader from "../../components/ListHeader";
import Appointment, { AppointmentProps } from "../../components/Appointment";
import ListDivider from '../../components/ListDivider';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Background from "../../components/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLETION_APPOINTMENTS } from "../../configs/database";
import { useEffect } from "react";
import Load from '../../components/Load';

function Home() {
    const [category, setCategory] = useState('');
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleOpenAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected });
    }

    function handleOpenAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointmentsStorage() {
        const storage = await AsyncStorage.getItem(COLLETION_APPOINTMENTS);
        const response: AppointmentProps[] = storage ? JSON.parse(storage) : [];

        if (category) {
            setAppointments(response.filter(item => item.category === category));
        } else {
            setAppointments(response);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointmentsStorage();
    }, [category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleOpenAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {loading ? <Load /> :
                <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider size="73%" />}
                        contentContainerStyle={{ paddingBottom: 69, paddingTop: 15 }}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={() => handleOpenAppointmentDetails(item)}
                            />
                        )}
                    />
                </>
            }
        </Background>
    )
}

export default Home;