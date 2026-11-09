// Customizable Area Start
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
StatusBar.setBarStyle("dark-content");


import DocumentListController, {
  DocumentData,
  Props,
  configJSON,
} from "./DocumentListController";
import Scale from "../../../components/src/Scale";

export default class DocumentList extends DocumentListController {
  constructor(props: Props) {
    super(props);
  }
  header = () => {
    return (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>{configJSON.DocumentListListText}</Text>
      </View>
    )
  }

  displayMap = (item: DocumentData, index: number) => {
    return (
      <TouchableOpacity key={index} style={styles.touchView}
        testID="OPEN_DOCUMENT"
        onPress={() => this.goDocContent(item)}>
        <Text>
          {item.docName} {item.id}
        </Text>
        <Text>{configJSON.DocumentListdisplayMapOPENText}</Text>
      </TouchableOpacity>
    )
  }


  render() {
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        {
          this.state.data.map((item, index) => {
            return (
              <View key={index}>
                {this.displayMap(item, index)}
              </View>
            )
          })
        }
      </SafeAreaView>
    );
    // Merge Engine - render - End
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faddb6",
  },
  viewMapDisplay: {
    height: Scale(100),
    marginHorizontal: Scale(15),
    backgroundColor: "lightblue",
    margin: Scale(10),
    paddingHorizontal: Scale(15),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  btnSignature: {
    height: Scale(50),
    backgroundColor: "black",
    marginHorizontal: Scale(15),
    borderRadius: Scale(20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Scale(10)
  },
  btnTextSignature: {
    fontSize: 18,
    color: "white",
  },
  touchView: {
    height: 50,
    backgroundColor: "#876b46",
    borderRadius: 20,
    marginBottom: Scale(10),
    marginHorizontal: Scale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Scale(15)
  },
  viewHeader: {
    height: Scale(50),
    backgroundColor: "#68777a",
    borderRadius: Scale(20),
    marginHorizontal: Scale(20),
    justifyContent: "center",
    paddingHorizontal: Scale(10),
    marginBottom: Scale(10),
    marginTop: Scale(15),
    alignItems: "center",

  },
  textHeader: {
    fontSize: 18,
    fontWeight: "bold"
  }
})
  // Customizable Area End
// Customizable Area End
