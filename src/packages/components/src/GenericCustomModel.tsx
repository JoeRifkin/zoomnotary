import React from 'react';
import { StyleSheet, View, Image, Modal } from "react-native"
export const GenericCustomModel = (props: any) => {
  const {
    visible, onClose, height, width, children
  } = props;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { height, width }]}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    // alignItems: 'center',
    shadowColor: 'rgba(44, 44, 46, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})