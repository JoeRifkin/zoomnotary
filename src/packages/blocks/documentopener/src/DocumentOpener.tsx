import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
// Customizable Area End

import DocumentOpenerController, {
  Props,
  configJSON,
} from "./DocumentOpenerController";

export default class DocumentOpener extends DocumentOpenerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
          testID="hideKeyboard"
        >
          {/* Merge Engine UI Engine Code */}
          <View>
            <TouchableOpacity
              onPress={this.openFile}
              testID="openDocFromDevice"
            >
              <Text style={styles.button}>{configJSON.openFromDevice}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.openFileUrl}
              testID="openDocWithUrl"
            >
              <Text style={styles.button}>{configJSON.openWithUrl}</Text>
            </TouchableOpacity>
          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
    );
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
  button: {
    backgroundColor: "#6200EE",
    color: "#fff",
    padding: 10,
    borderRadius: 4,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
});
// Customizable Area End
