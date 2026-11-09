import React from 'react';
import { Text, StyleSheet, View, Image } from "react-native"
export const GenericPasswordMessage = (props: any) => {
  const {
    validationList,
    validationType,
    sucessImg,
    errorImg,
    infoImg,
    value
  } = props;

  return (

    <View style={styles.welcomeView}>
      {validationList?.map((item: string, index: number) => {
        const isFulfilled = validationType[index];
        const validationStatus = isFulfilled ? 'success' : 'error';

        return (
          <View key={index} style={[styles.validationView, { paddingBottom: index === validationList.length - 1 ? 0 : 15 }]}>
            <Image style={[styles.imgView, { marginTop: index === 0 ? 2 : 3 }]}
              source={value === '' ? infoImg : validationStatus === 'success' ? sucessImg : errorImg}
            />
            <Text style={[styles.viewWelTitle, value === '' ? styles.infoColor : validationStatus === 'success' ? styles.sucessColor : styles.errorColor]}>
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  welcomeView: {
    flexDirection: 'column',
    paddingRight: 40,
    paddingTop: 16,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  viewWelTitle: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 19.5,
    fontStyle: 'normal'
  },
  imgView: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  validationView: {
    
    flexDirection: 'row',
  },
  errorColor: {
    color: '#DC2626'
  },
  infoColor: {
    color: '#475569'
  },
  sucessColor: {
    color: '#059669'
  },

})