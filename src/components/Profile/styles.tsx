import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    user: {
        flexDirection: 'row'
    },
    username: {
        fontFamily: theme.fonts.title700,
        fontSize: 24,
        color: theme.colors.heading,
        marginRight: 6
    },
    greeting: {
        fontFamily: theme.fonts.title500,
        fontSize: 24,
        color: theme.colors.heading,
        marginRight: 6
    },
    message: {
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight
    },
    footerModal: {
        padding: 25,
        alignItems: 'center'
    },
    title: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.title700,
        fontSize: 20
    },
    buttons: {
        flexDirection: 'row'
    },
    btnNot: {
        backgroundColor: theme.colors.secondary80,
        width: 150,
        height: 56,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnYes: {
        backgroundColor: theme.colors.primary,
        width: 150,
        height: 56,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.text500
    }
})