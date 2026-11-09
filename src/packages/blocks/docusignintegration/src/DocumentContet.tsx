// Customizable Area Start
import React from "react";

import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
StatusBar.setBarStyle("dark-content");

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End

import DocumentContetController, {
  Props,
  configJSON,
} from "./DocumentContetController";
import Scale from "../../../components/src/Scale";
export default class DocumentContet extends DocumentContetController {
  constructor(props: Props) {
    super(props);
  }

  back = () => {
    return (
      <TouchableOpacity style={styles.imgBack}
        testID="BACK_BUTTON"
        onPress={this.goBack}>
        <Text>{configJSON.DocumentContetBackText}</Text>
      </TouchableOpacity>
    )
  }

  document = () => {
    return (
      <Image source={this.state.docSrc}
        style={styles.imageStyle}
      />
    )
  }

  btnSign = () => {
    return (
      <TouchableOpacity style={styles.btnSignature}
        testID="SIGN_BUTTON"
        onPress={this.btnNavigation}>
        <Text style={styles.TextBtnSign}>{configJSON.DocumentContetGoSignText}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.back()}
        {this.document()}
        {this.btnSign()}
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4f0f2",
  },
  touchView: {
    height: 50,
    backgroundColor: "white",
    marginBottom: Scale(10),
    marginHorizontal: Scale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",  
    paddingHorizontal: Scale(15)
  },
  imageStyle: {
    height: '85%',
    width: '100%',
    alignSelf: "center"
  },
  btnSignature: {
    height: '5%',
    backgroundColor: "black",
    marginHorizontal: Scale(15),
    borderRadius: Scale(20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom:Scale(15)
  },
  TextBtnSign: {
    color: "#FFFFFF"
  },
  imgBack: {
    height: '5%',
    backgroundColor: "white"
  }
})
// Customizable Area End
// Customizable Area End
