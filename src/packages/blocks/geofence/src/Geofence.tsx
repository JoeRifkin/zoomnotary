import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
// Customizable Area End


// Customizable Area Start
// Customizable Area End

import GeofenceController, { Props, configJSON } from "./GeofenceController";

export default class Geofence extends GeofenceController {
  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            <Text
              testID="labelTitle" //Merge Engine::From BDS
              style={styles.title} //UI Engine::From Sketch
            >
              {configJSON.labelTitleText}
            </Text>

            <Text
              testID="labelBody" //Merge Engine::From BDS
              style={styles.title} //UI Engine::From Sketch
            >
              {/* UI Engine::From Sketch */}
              {configJSON.labelBodyText} {/* UI Engine::From Sketch */}
            </Text>

            <Text style={styles.title}> {configJSON.logTitle}</Text>
            <Text style={styles.body} testID="txtLog">
              {this.state.radarLog}
            </Text>

            <Text style={styles.title}>{configJSON.clientLocationTitle}</Text>
            <Text style={styles.body} testID="txtClientLocation">
              {this.state.clientLocation}
            </Text>

            <Text style={styles.title}>{configJSON.locationTitle}</Text>
            <Text style={styles.body} testID="txtLocation">
              {this.state.location}
            </Text>

            <Text style={styles.title}>{configJSON.eventsTitle}</Text>
            <Text style={styles.body} testID="txtEvents">
              {this.state.events}
            </Text>
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
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
  title: {
    marginBottom: 32,
    fontSize: 26,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
});
// Customizable Area End
