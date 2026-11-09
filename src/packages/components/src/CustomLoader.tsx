import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

interface LoaderProps {
    loader: boolean;
    text?: string;
}

const CustomLoader: React.FC<LoaderProps> = ({ loader, text }) => {

    return loader ? (
        <View style={styles.loader}>
            <ActivityIndicator animating={true} color={'white'} size="large" />
            {text &&
                <Text style={styles.text}>{text}</Text>
            }
        </View>
    ) : null;
}

export default CustomLoader;

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    text: {
        marginTop: 20,
        color: 'white'
    }
});