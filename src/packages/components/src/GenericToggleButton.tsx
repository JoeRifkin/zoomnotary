import React from 'react';
import { Text, StyleSheet, TouchableOpacity} from "react-native"
export const GenericToggleButton = (props: any) => {
    const {
        text,
        isSelected,
        testID,
        btnTabIndividualProps,
        isNormal
    } = props;
    

    return (
      <TouchableOpacity testID={testID} style={[styles.toggleBtnView, isSelected ? styles.selectedBtn : styles.unSelectedBtn]} {...btnTabIndividualProps}>
        <Text style={[styles.textOfTggleBtn, isSelected ? styles.selectedText : styles.unSelectedText, isNormal ? styles.normalCase : styles.uppderCase]}>{text}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  selectedBtn: {
    backgroundColor: '#012275',
  },
  unSelectedBtn: {
    // backgroundColor: '#fff',
  },
  toggleBtnView: {
    width: 141,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 58,
  },
  selectedText: {
    color: '#fff',
  },
  unSelectedText: {
    color: '#012275',
  },
  textOfTggleBtn:{
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22, /* 157.143% */
    padding: 6,
  },
  uppderCase: {
    textTransform: 'uppercase',
  },
  normalCase: {

  }
})