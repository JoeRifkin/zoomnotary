import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import OutlookIntegrationController, {
  Props,
  Email,
} from "./OutlookIntegrationController";
const configJSON = require("./config");
export default class EmailDetail extends OutlookIntegrationController {
  constructor(props: Props) {
    super(props);
  }

  openOutLook = async (webLink: string, idEmail: string) => {
    const outlookUrl = "ms-outlook://";
    const isOutlookInstalled = await Linking.canOpenURL(outlookUrl);
    if (isOutlookInstalled) {
      const appUrl = `ms-outlook://emails/message/${idEmail}`;
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webLink);
      Alert.alert(configJSON.recommendations, configJSON.alertRecommend, [
        {
          text: "OK",
        },
      ]);
    }
  };

  render() {
    const emailDetail = this.props.navigation.state.params.email;
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{emailDetail.subject}</Text>
          </View>
          <View>
            <Text style={styles.text}>{emailDetail.bodyPreview}</Text>
          </View>
          <View style={styles.actionBox}>
            <TouchableOpacity
              testID={"TestReplyButton"}
              style={[styles.circleBox, styles.replyBox]}
              onPress={() =>
                this.openOutLook(emailDetail.webLink, emailDetail.id)
              }
            >
              <Text style={styles.text}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"TestFowardButton"}
              style={styles.circleBox}
              onPress={() =>
                this.openOutLook(emailDetail.webLink, emailDetail.id)
              }
            >
              <Text style={styles.text}>Forward</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#ffffffff",
    width: "100%",
  },
  text: {
    color: "black",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  actionBox: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
  },
  circleBox: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  replyBox: {
    marginRight: 10,
  },
});
