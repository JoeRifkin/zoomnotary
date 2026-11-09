import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
export const GenericPasswordInput = (props: any) => {
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
        btnPasswordShowHideProps,
        idOfShowHideBtn,
        imgEnablePasswordFieldProps,
        imgTestID
    } = props;
   
    const isStringNullOrBlank = (str: string) => {
        return str === null || str.length === 0;
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
                {isAstrick && 
                <View>
                    <Text style={styles.astrickSign}>*</Text>
                </View>}
            </Text>
            <View style={styles.bgPasswordContainer}>
                <TextInput
                    testID={testID}
                    style={[styles.bgMobileInput, styles.bgPasswordInput, (isValidateField && (isStringNullOrBlank(value) || secError)) ? styles.errorOfField : styles.textFieldBg]}
                    placeholder={placeholder}
                    value={value}
                    {...txtInputNamePrpos}
                />
                <TouchableOpacity
                    testID={idOfShowHideBtn}
                    style={styles.passwordShowHide}
                    {...btnPasswordShowHideProps}
                >
                    <Image
                        testID={imgTestID}
                        {...imgEnablePasswordFieldProps}
                    />
                </TouchableOpacity>
            </View>

            {(isValidateField && isStringNullOrBlank(value)) && renderError(nameError)}
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
    errorTextView: {
        color: '#DC2626',
        fontSize: 12,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 18,
        marginBottom: 16
    },
    bgPasswordContainer: {
        flexDirection: "row",
        borderRadius: 2
    },
    bgPasswordInput: {
        flex: 1,
    },
    passwordShowHide: {
        alignSelf: "center",
        position: 'absolute',
        right: 16,
        paddingTop:7
    },
})