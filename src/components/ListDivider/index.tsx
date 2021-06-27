import React from 'react'
import { View, Text } from 'react-native';
import { styles } from './styles';

type Props = {
    size: string;
    isCentered?: boolean;
}

function ListDivider({ size, isCentered }: Props) {
    return (
        <View style={[
            styles.container,
            isCentered ? { marginVertical: 12 } : {
                marginTop: 18,
                // marginBottom: 31
            },
            { width: size },
        ]} />
    )
}

export default ListDivider;
