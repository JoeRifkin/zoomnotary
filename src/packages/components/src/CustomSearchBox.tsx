import React from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { imgClose, searchIcon } from '../../blocks/user-profile-basic/src/assets';

interface Props {
    value: string;
    onChange: (text: string) => void;
    onSearch?: () => void;
    onClear?: () => void;
    testID?: string;
    styles?: {};
    type?: 'outline' | '';
    showClearButton?: boolean;  // New prop to control clear button visibility
}

const CustomSearchBox: React.FC<Props> = ({
    value,
    onChange,
    onSearch,
    onClear,
    testID,
    styles: customStyles,
    type = '',
    showClearButton = true, // Default is true to show the clear button if not specified
}) => {
    const isOutline = type === 'outline';

    return (
        <View style={[isOutline ? styles.outlineContainer : styles.container, customStyles]}>
            <TextInput
                style={isOutline ? styles.outlineInput : styles.input}
                placeholder="Search"
                placeholderTextColor="#333"
                value={value}
                onChangeText={onChange}
                testID={testID || 'onChangeSearch'}
            />
            <TouchableOpacity
                testID="searchIcon"
                onPress={value && showClearButton ? onClear : onSearch}  // Use the prop to toggle the button
            >
                <Image
                    style={isOutline ? styles.outlineIcon : styles.icon}
                    source={value && showClearButton ? imgClose : searchIcon}  // Conditionally show the icons
                />
            </TouchableOpacity>
        </View>
    );
};

export default CustomSearchBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        padding: 6,
        marginVertical: 20,
        borderRadius: 50,
        marginHorizontal: 15,
    },
    input: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        padding: 10,
        borderRadius: 50,
        color: '#64748b',
    },
    icon: {
        marginRight: 20,
        width: 24,
        height: 24,
    },
    outlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 6,
        paddingVertical:2,
        marginVertical: 20,
        borderRadius: 10,
        borderColor: '#D1FAE5',
        borderWidth: 2,
        marginHorizontal: 15,
    },
    outlineInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        color: '#64748b',
    },
    outlineIcon: {
        marginRight: 10,
        width: 24,
        height: 24,
    },
});
