import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";


interface Props {
    onChange: (checked: boolean) => void;
    checked: boolean;
    testID: string
}

const IN_ACTIVE = require('./switch.png') 
const ACTIVE = require('./switch_active.png') 

const GenericSwitch = ({ onChange, checked }: Props) => {
    const img = checked ? ACTIVE: IN_ACTIVE 
    return <TouchableOpacity
        onPress={() => onChange(!checked)}
    >
        <Image
            source={img}
            style={styles.checkbox}
        />
    </TouchableOpacity>
};

export default GenericSwitch;

const styles = StyleSheet.create({
    checkbox: {
        width: 48,
        height: 24,
        resizeMode:'contain'
    },
});
