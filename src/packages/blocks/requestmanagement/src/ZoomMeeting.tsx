import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Dimensions,
  View,
  Linking,
} from "react-native";
import { WebView } from 'react-native-webview';
import { imgBackArrow  } from "./assets";
import { GenericHeader } from "../../../components/src/GenericHeader";
// Customizable Area End

import ZoomMeetingController, {
  Props,
} from "./ZoomMeetingController";
export default class ZoomMeeting extends ZoomMeetingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderWebViewPage = () => {
    return (
        <WebView
          testID="webViewTestId"
          source={{ uri: this.state.linkProp}}
          startInLoadingState={true}
          javaScriptEnabled={true}
          style={styles.webView}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          scalesPageToFit={false}
        />
    )
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={{ flex: 1 }}>
          <GenericHeader
            labelTitle={'Meeting'}
            imgBackArrow={imgBackArrow}
            btnGoBack={{ ...this.btnGoBackOnRequestDetail }}
            testID={"btnbackArrow"}
            isOtherMsg={true}
          />
          {this.renderWebViewPage()}
        </View>
    );
    // Customizable Area End
  }
};

// Customizable Area Start
const styles = StyleSheet.create({
  webView:{
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height -150,
  }
});
// Customizable Area End
