import React from 'react';
import { View } from "react-native";
import { WebView } from 'react-native-webview';
export const GenericWebViewPage = (props: any) => {
  const {
    detail
  } = props;

  return (
    <View style={{flex: 1}}>
      <WebView source={{ html: detail }} style={{ height: 400}} />
    </View>
  )
}
