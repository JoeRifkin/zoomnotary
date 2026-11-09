import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, Image } from "react-native"

const otpBoxes = Array(6).fill(React.createRef());
export const GenericOTPBoxes = (props: any) => {
  const {
    otp,
    insertOtp,
    isValidation,
    isAllBoxField
  } = props;

  const renderOtpBoxes = () => {
    return otp.map((value: string, index: number) => (
        <TextInput
          testID={`txtEmailOTP${index}`}
          key={index}
          style={[styles.otpBoxView, isValidation && !isAllBoxField ? styles.errorOfField : styles.normalBox]}
          keyboardType="numeric"
          maxLength={1}
          value={value}
          ref={otpBoxes[index]}
          onChangeText={(text) => handleOtpChangeAtIndex(text, index)}
        />
    ));
  }

  const handleOtpChangeAtIndex = (text : string, index: number) => {
    let updatedOtp = [...otp];
    updatedOtp[index] = text;
    insertOtp(updatedOtp)
      // if (text !== '' && index < otp.length - 1) {
      //   otpBoxes[index + 1].current.focus();
      // }
      // if (text !== '' && index === 0) {
      //   otpBoxes[otp.length - 1].current.focus();
      // }
      // if (text === '' && index > 0) {
      //   otpBoxes[index - 1].current.focus();
      // }
  };
  

  return (
    <View style={{ flexDirection: 'row' }}>{renderOtpBoxes()}</View>
    
  )
}

const styles = StyleSheet.create({
  
  otpBoxView: {
    height: 44,
    width: 44,
    borderWidth: 1.5,
    borderRadius: 8,
    margin: 7,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#000A34'
  },
  errorOfField: {
    borderColor: '#DC2626',
  },
  normalBox: {
    borderColor: '#5D5D5D',
  }
})