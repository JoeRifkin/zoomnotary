
import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    ScrollView,
    Text
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import KnowYourCustomerKycVerificationController, {
    Props,
} from "./KnowYourCustomerKycVerificationController";
import { Success } from "./assets";


export default class KnowYourCustomerKycVerificationAccount extends KnowYourCustomerKycVerificationController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Star
        // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
               <Text>Hello</Text>
            </ScrollView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffffff",
    },
    groupiconviewstyle: {
        marginTop: 60, alignItems: 'center'
    },
    groupiconstyle: {
        width: 90, height: 85
    },
    textviewstyle1: {
        alignItems: 'center',
        marginTop: 20,

    },
    textstyle1: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: '#282828'
    },
    textviewstyle2: {
        alignItems: 'center',
        marginTop: 20,

    },
    textstyle2: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#282828'
    },
    btnstyle: {
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor:"#6C4695"
    },
    btntext: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    btnview: {
        marginTop: 20,
    }
});
// Customizable Area End
