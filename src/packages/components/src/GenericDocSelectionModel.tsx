import React from 'react';
import { StyleSheet, View, Image, Modal } from "react-native"
export const GenericDocSelectionModel = (props: any) => {
  const {
    visible, onClose, height, width, children, buttonModelView, isModelView
  } = props;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={buttonModelView ? buttonModelView : styles.centeredView}>
        <View style={[!isModelView ? styles.modalView : styles.modalViewWithoutShadow, { height, width }]}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalViewWithoutShadow: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingTop: 20,
    paddingBottom: 10
  },
})