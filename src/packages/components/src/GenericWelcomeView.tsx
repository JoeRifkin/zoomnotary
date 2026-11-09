import React from 'react';
import { Text, StyleSheet, View } from "react-native"
export const GenericWelcomeView = (props: any) => {
    const {
      title,
      description,
    } = props;
    

    return (
      <View style={styles.welcomeView}>
        <Text style={[styles.viewWelTitle, styles.fontnormal]}>{title}</Text>
        <Text style={[styles.viewWelDes, styles.fontnormal]}>{description}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  welcomeView : {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingBottom: 24,
    paddingTop:24,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: '#012275',
    justifyContent: 'center'
  },
  viewWelTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    letterSpacing: -0.12
  },
  fontnormal: {
    fontStyle: 'normal'
  },
  viewWelDes: {
    marginTop: 2,
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginRight: 60,
  },
})