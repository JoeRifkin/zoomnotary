import React from 'react';
import { View, TextInput, Text, StyleSheet } from "react-native"
export const GenericTextInput = (props: any) => {
    const {
        labelName, 
        isAstrick, 
        isValidateField, 
        placeholder, 
        value, 
        nameError, 
        txtInputNamePrpos, 
        testID,
        secErrorMsg,
        secError,
        maxCharLength,
        isFullName,
        placeholderTextColor
    } = props;
    
    const isStringNullOrBlank = (str: string) => {
        return str === null || str.length === 0;
    }

    const isStringNullOrBlankAndFullName = (fullName: string) => {
    return fullName === null || fullName.length === 0 || fullName.trim().split(' ').length < 2;
    }

    const renderError = (error: string) => {
        return (
            <Text style={styles.errorTextView}>{error}</Text>
        )
    }

    return (
        <View>
            <Text style={styles.emailTitle}>
                {labelName}
                {isAstrick && <View>
                    <Text style={styles.astrickSign}>*</Text>
                </View>}
            </Text>
            <TextInput
                placeholderTextColor= {placeholderTextColor}
                testID={testID}
                style={[styles.bgMobileInput, ((isValidateField && (isStringNullOrBlank(value) || secError)) || (isValidateField && isStringNullOrBlankAndFullName(value) && isFullName)) ? styles.errorOfField : placeholderTextColor ? styles.textFieldBggreen:styles.textFieldBg]}
                placeholder={placeholder}
                value={value}
                {...txtInputNamePrpos}
                maxLength={maxCharLength}
            />
            {(isValidateField && isStringNullOrBlank(value) && !isFullName) && renderError(nameError)}
            {(isValidateField && isStringNullOrBlankAndFullName(value) && isFullName) && renderError(nameError)}
            {isValidateField && secError && renderError(secErrorMsg)}
        </View>
    )
}

const styles = StyleSheet.create({
    emailTitle: {
        marginTop: 10,
        color: '#334155',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    astrickSign: {
        color: '#DC2626',
        textAlign: 'center',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18,
        paddingLeft: 5,
    },
    bgMobileInput: {
        flexDirection: "row",
        fontSize: 14,
        textAlign: "left",
        marginBottom: 5,
        marginTop: 8,
        includeFontPadding: true,
        paddingLeft: 10,
        paddingBottom: 10,
        height: 44,
        fontWeight: '400',
        lineHeight: 22,
        fontStyle: 'normal',
    },
    errorOfField: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DC2626',
        backgroundColor: '#fff'
    },
    textFieldBg: {
        backgroundColor: "#F1F5F9",
        borderColor: "#767676",
        borderRadius: 8,
    },
    textFieldBggreen: {
        backgroundColor: "#F1F5F9",
        borderColor: "#D1FAE5",
        borderWidth:1.5,
        borderRadius: 8,
    },
    errorTextView: {
        color: '#DC2626',
        fontSize: 12,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 18,
        marginBottom: 10
    },
})