import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";


// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import Cfzoomintegration92Controller, {
  Props,
  configJSON,
} from "./Cfzoomintegration92Controller";

export default class Cfzoomintegration92 extends Cfzoomintegration92Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (event) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
        data-test-id="touchableWithoutFeedback"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  body: {
    marginBottom: 32,
    textAlign: "left",
    marginVertical: 8,
    padding: 10,
  },
  bgPasswordContainer: {
    marginBottom: 16,
    padding: 10,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    backgroundColor: "transparent",
    marginRight: -10,
  },
  imgShowhide: {},
});
// Customizable Area End
