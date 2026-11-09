// Customizable Area Start
import React from "react";

import {
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End

import DocusignIntegrationController, {
  Props,
  configJSON,
} from "./DocusignIntegrationController";
import Scale from "../../../components/src/Scale";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { GenericSucessView } from "../../../components/src/GenericSucessView";
import { imgBackArrow, imgCheckbox, } from "./assets";
import { WebView } from 'react-native-webview';
StatusBar.setBarStyle("dark-content");

export default class DocusignIntegration extends DocusignIntegrationController {
  constructor(props: Props) {
    super(props);
  }
  
  renderContent = () => {
    let content;
    if (this.state.isFinishDocuSign) {
      content = (
        <View>
          <GenericHeader
            testID={"btnbackArrowOnSucess"}
            isOtherMsg={true}
          />
            <GenericSucessView
              imgCheckbox={imgCheckbox}
              passchanged={this.state.messageShow =="sign"? configJSON.DocSentSuccessTitle:configJSON.documentsSentDes}
              chnagedDetail={this.state.messageShow =="sign" ? configJSON.DocSentSuccessDes: configJSON.docMessDes2}
              login={'Check status'}
              btnLoginProps={{ ...this.onClickOfCheckStatus }}
              testID={"sucessNotaryID"}
            />
        </View>
      );
    } else {
      content = (
          <WebView
            source={{ uri: this.state.docuSignUrl }}
            onShouldStartLoadWithRequest={this.handleShouldStartLoadWithRequest}
            startInLoadingState={true}
            javaScriptEnabled={true}
            showsVerticalScrollIndicator={true}
            style={styles.webView}
            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
            scalesPageToFit={false}
          />
      );
    }
    return content;
  }

  render() {
    
    // Merge Engine - render - Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {!this.state.isFinishDocuSign && <GenericHeader
            labelTitle={configJSON.summary}
            imgBackArrow={imgBackArrow}
            btnGoBack={{ ...this.btnGoBackToDashboard }}
            testID={"btnbackArrow"}
            isOtherMsg={true}
          /> }
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          ref={this.scrollViewRef}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }} 
          >
            {this.renderContent()}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    }
    }
    // Merge Engine - render - End

const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom:10
  },
  previewText: {
    color: "red",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  },
  container:{
    flex:1,
    backgroundColor: "#ffffffff",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  imgBack:{
    height:Scale(50),
    backgroundColor:"white"
  },
  webView: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height -150,
  },
});
// Customizable Area End
// Customizable Area End
