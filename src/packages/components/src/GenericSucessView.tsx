import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, Dimensions, Platform } from "react-native";
const { height } = Dimensions.get('window');
export const GenericSucessView = (props: any) => {
  const {
    imgCheckbox,
    passchanged,
    chnagedDetail,
    login,
    btnLoginProps,
    pending,
    testID
  } = props;

  return (
    <View style={[styles.scuessView, { height: height- (Platform.OS === 'ios'? 50: 80) }]}>
      <Image style={pending === true ? styles.imgVerify : styles.imgCheckView} source={imgCheckbox} />
      <Text style={[styles.changePassVIew, pending === true ? styles.verifyFont : styles.sucessFont]}>{passchanged}</Text>
      <Text style={styles.detailViewText}>{chnagedDetail}</Text>
      <TouchableOpacity testID={testID} style={styles.buttonView} {...btnLoginProps}>
        <Text style={styles.buttonText}>{login}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  scuessView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#012275',
    paddingBottom: 80
  },
  imgCheckView: {
    height: 72,
    width: 72
  },
  imgVerify: {
    height: 90,
    width: 90
  },
  changePassVIew: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
    width: Dimensions.get('window').width-50
  },
  verifyFont: {
    fontSize: 30,
    lineHeight: 40
  },
  sucessFont: {
    fontSize: 24,
    lineHeight: 34
  },
  detailViewText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    color: '#E2E8F0',
    paddingLeft: 50,
    paddingRight: 50
  },
  buttonView: {
    width: 196,
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
    color: '#012275'
  },
})