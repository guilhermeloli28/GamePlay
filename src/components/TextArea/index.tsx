import React from "react";
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

function TextArea({ ...rest }: TextInputProps) {
    return (
        <TextInput
            style={styles.input}
            {...rest}
        />
    )
}

export default TextArea;