import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { caretRight } from "./assets";
// Customizable Area End

import TasksController, { Props, configJSON } from "./TasksController";

export default class Tasks extends TasksController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              testID={"btnNavigateToTaskList"}
              style={styles.btnContent}
              onPress={this.navigateToTaskList}
            >
              <Text style={styles.btnText}>{configJSON.textTaskList}</Text>
              <Image source={caretRight} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity
              testID={"btnNavigateToTask"}
              style={styles.btnContent}
              onPress={this.navigateToTask}
            >
              <Text style={styles.btnText}>{configJSON.textTasks}</Text>
              <Image source={caretRight} style={styles.img} />
            </TouchableOpacity>
          </View>
        </>
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
  btnWrapper: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    maxWidth: "98%",
    margin: 10,
  },
  btnContent: {
    paddingHorizontal: 30,
    backgroundColor: "#d9d6ed",
    color: "#2f2a2b",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    maxHeight: 35,
    height: 40,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  btnText: {
    fontSize: 16,
  },
  img: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});
// Customizable Area End
