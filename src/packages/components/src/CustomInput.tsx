import * as React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CustomInputProps {
    testID: string;
    label: string;
    placeholder: string;
    isRequired?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    isPassword?: boolean;
    errorMessage?: string; // make errorMessage optional with a default
}

const CustomInput: React.FC<CustomInputProps> = ({
    label = '', // set a default value for label
    placeholder,
    isRequired = false,
    value,
    onChangeText,
    isPassword = false,
    errorMessage = '', // set default to empty string
    ...rest
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(!isPassword);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <View style={styles.wrapper}>
            {label !== '' && ( // Ensure label is not empty or null before rendering
                <Text style={styles.label}>
                    {label} {isRequired && <Text style={styles.required}>*</Text>}
                </Text>
            )}
            <View style={[styles.inputContainer, errorMessage ? styles.errorBorder : {}]}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    value={value}
                    onChangeText={onChangeText}
                    {...rest}
                />
                {isPassword && (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Image
                            source={isPasswordVisible ? require('./visible.png') : require('./hide.png')}
                            style={styles.passwordIconImg}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {errorMessage !== '' && ( // Ensure errorMessage is not empty before rendering
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    );
};
export default CustomInput;

const styles = StyleSheet.create({
    wrapper: {
        marginTop:10
    },
    passwordIconImg: {
        width: 24,
        height: 24,
        marginRight: 10,
        resizeMode: 'contain',
    },
    errorBorder: {
        borderColor: 'red',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    label: {
        marginBottom: 5,
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 18,
        marginVertical: 8,
        color: '#334155',
        fontStyle: 'normal',
    },
    required: {
        color: 'red',
    },
    input: {
        padding: 10,
        flex: 1,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
