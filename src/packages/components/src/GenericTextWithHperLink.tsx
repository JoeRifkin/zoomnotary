import React from 'react';
import { Text, StyleSheet, View} from "react-native"
export const GenericTextWithHperLink = (props: any) => {
    const {
        normalText,
        hyperText,
        redirectProps,
        testid
    } = props;
    

    return (
      <View style={styles.donotHave}>
        <Text style={[styles.dnthaveAcc, styles.textDonthaveAndSignup]}>{normalText}&nbsp;</Text>
        <View style={styles.bottomBorder}>
          <Text style={[styles.signUpView, styles.textDonthaveAndSignup]} testID={testid} {...redirectProps} >{hyperText}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
  donotHave: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    paddingBottom: 10
  },
  dnthaveAcc: {
    color:  '#64748B',
    fontWeight: '400',
  },
  borderView: {
    borderBottomWidth: 2,
    borderBottomColor: "#012275",
    borderStyle: "solid"
  },
  signUpView: {
    color: '#012275',
    fontWeight: 'bold',
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275'
  },
  textDonthaveAndSignup: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 22,
  },
})