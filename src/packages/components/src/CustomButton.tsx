import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
  title: string;
  outlined?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
  containerStyle?: {};
  isdisabled?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, outlined = false, onPress, disabled = false, testID,containerStyle, isdisabled = false}) => {
  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.button,
        outlined ? styles.bgOtherLoginButton : styles.loginBtn,
        disabled && styles.disabledButton,
        isdisabled === "true" && styles.disabledButton1,
        containerStyle,
      ]}
      onPress={!disabled ? onPress : undefined}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text
        style={[
          outlined ? styles.unfilledBtnText : styles.loginBtnText,
          isdisabled === "true" ? styles.disabledText:null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 20,
    borderRadius: 8,

  },
  loginBtn: {
    backgroundColor: '#012275', 
  },
  bgOtherLoginButton: {
    marginTop: 20,
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
  disabledButton: {
    backgroundColor: '#CCD3E3', 
    borderColor: '#CCD3E3', 
  },
  disabledButton1: {
    backgroundColor: '#F8FAFC', 
    borderColor: '#CCD3E3', 
  },
  disabledText: {
    color: '#CCD3E3', 
  },
  loginBtnText: {
    color: '#fff', 
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
});

export default CustomButton;