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

import { Input, Button, Typography} from '@builder/component-library';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import Settings2Controller, {
  Props,
  configJSON,
} from "./Settings2Controller";

export default class Settings2 extends Settings2Controller {
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
            <Typography
              data-test-id="labelBody" //Merge Engine::From BDS
              style={styles.body} //UI Engine::From Sketch
            >
              {configJSON.labelBodyText} {/* UI Engine::From Sketch */}
            </Typography>

            <View style={styles.bgPasswordContainer}>
              <Input 
              data-test-id="txtInput"
              style={styles.bgMobileInput} //UI Engine::From Sketch
              placeholder={configJSON.txtInputPlaceholder} //UI Engine::From Sketch
              label={`This is the received value: ${this.state.txtSavedValue}`}
              {...this.txtInputProps} //Merge Engine::From BDS - {...this.testIDProps}
              rightIcon={
                <Button
                data-test-id="btnShowHide" //Merge Engine::From BDS
                style={styles.showHide} //UI Engine::From Sketch
                {...this.btnShowHideProps} //Merge Engine::From BDS - {...this.testIDProps}
                icon={<Image
                  data-test-id="btnShowHideImage" //Merge Engine::From BDS - testIDImage
                  style={styles.imgShowhide} //UI Engine::From Sketch
                  {...this.btnShowHideImageProps} //Merge Engine::From BDS - {...this.testIDProps}
                />}
              />
              }
              />
            </View>

            <Button
              data-test-id="btnExample"
              text={configJSON.btnExampleTitle} //UI Engine::From Sketch
              {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
            />
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
