import * as React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { filterIcon, imgBackArrow } from '../../blocks/user-profile-basic/src/assets';
interface LoaderProps {
    title: string;
    showBackIcon?: boolean;
    goBack: () => void;

    showFilterIcon?: boolean;
    onPressFilter?: () => void;
    testID?: string;
}

const CustomHeader: React.FC<LoaderProps> = (props) => {

    return <>
        <StatusBar backgroundColor={'#012275'} />

        <View style={[styles.headerView]}>
            {props.showBackIcon ?
                <TouchableOpacity
                    onPress={props.goBack}
                    testID="goBack"
                >
                    <Image style={styles.imgArrowBack} source={imgBackArrow} />
                </TouchableOpacity> : <View />
            }


            <Text style={styles.titleView}>{props.title}</Text>

            {props.showFilterIcon ? <TouchableOpacity
                onPress={props.onPressFilter}
                testID="goBack"
            >
                <Image style={styles.filterIconImg} source={filterIcon} />
            </TouchableOpacity> : <View />
            }
        </View>
    </>

}

export default CustomHeader;

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#012275',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
        paddingTop: 50,
    },
    titleView: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
    },
    imgArrowBack: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    filterIconImg: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
        tintColor: '#fff'
    }
});