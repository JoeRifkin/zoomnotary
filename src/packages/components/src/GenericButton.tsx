import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from "react-native"
export const GenericButton = (props: any) => {
    const {
        btnTextLabel,
        btnProps,
        btnDisable,
        testID,
        filledBtn
    } = props;
    

    return (
        <TouchableOpacity
            testID={testID}
            style={filledBtn ? [styles.loginBtn, btnDisable ? styles.btnColor : styles.disBtnColor] : styles.bgOtherLoginButton}
            {...btnProps}>
            <Text style={filledBtn ? styles.loginBtnText : styles.unfilledBtnText}>{btnTextLabel}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loginBtn: {
        width: '100%',
        height: 52,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        marginTop:20,
        borderRadius:8,
      },
      bgOtherLoginButton: {
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "#012275",
        borderRadius: 8,
        includeFontPadding: true,
        padding: 10,
        height: 52,
        
      },
      unfilledBtnText: {
        fontSize: 16,
        textAlign: "center",
        color: "#012275",
        fontWeight: "bold",
      },
      disBtnColor: {
        backgroundColor: '#CCD3E3',
      },
      btnColor: {
        backgroundColor: '#012275',
      },
      loginBtnText: {
        color: '#fff',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24
      },
})