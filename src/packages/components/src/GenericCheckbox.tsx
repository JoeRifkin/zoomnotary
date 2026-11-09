import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";


interface Props {
    onChange: (checked: boolean) => void;
    checked: boolean;
    testID?:string
}

const CHECKED = require('./checkbox.png') 
const UN_CHECKED = require('./checkbox_inactive.png') 

const GenericCheckbox = ({ onChange, checked }: Props) => {
    const img = checked ? CHECKED : UN_CHECKED
    return <TouchableOpacity
        onPress={() => onChange(!checked)}
    >
        <Image
            source={img}
            style={styles.checkbox}
        />
    </TouchableOpacity>
};

export default GenericCheckbox;

const styles = StyleSheet.create({
    checkbox: {
        width: 20,
        height: 20
    },

});
