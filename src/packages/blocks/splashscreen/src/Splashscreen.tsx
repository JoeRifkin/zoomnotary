import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
import {renotaryLogoImg} from "./assets";
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import SplashscreenController, { Props, configJSON } from "./SplashscreenController";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", () => {
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
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar barStyle={"light-content"} backgroundColor="#012275" />
        <View style={styles.splashScreenView}>
          <Image style={styles.imageLogoImage} source={renotaryLogoImg} />
        </View>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  splashScreenView: {
    backgroundColor: "#012275",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column'
  },
  imageLogoImage: {
    opacity: 1,
    resizeMode: "contain",
    height: 100,
    width: 280
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#012275",
  },
});
// Customizable Area End
