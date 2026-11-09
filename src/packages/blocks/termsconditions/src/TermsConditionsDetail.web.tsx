import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
// Customizable Area End

import TermsConditionsDetailController, {
  Props,
  configJSON,
} from "./TermsConditionsDetailController";

export default class TermsConditionsDetail extends TermsConditionsDetailController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return this.state.isLoading ? (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator color="#000" size={30} />
      </View>
    ) : <View>

    </View>;
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
// Customizable Area End
