import React from "react";

// Customizable Area Start
require("isomorphic-fetch");
import {
  Dimensions,
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import OutlookIntegrationController, {
  Props,
  configJSON,
} from "./OutlookIntegrationController";

export default class OutlookIntegration extends OutlookIntegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const {
      displayName,
      emails,
      contacts,
      calendars,
      // deletedEmails,
      isLoaded,
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {displayName ? (
              <>
                <Text
                  style={[styles.center, styles.text]}
                >{`Hi, ${displayName}`}</Text>
                <TouchableOpacity
                  onPress={this.signOutAsync}
                  testID={"btnLogout"}
                >
                  <Text style={[styles.center, styles.text]}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Button
                testID={"TestSignInButton"} //Merge Engine::From BDS
                title={configJSON.btnSignInleTitle} //UI Engine::From Sketch
                onPress={this.signInAsync} //Merge Engine::From BDS - {...this.testIDProps}
              />
            )}
            <View style={styles.actionGroup}>
              <Button
                testID={"TestEmailButton"} //Merge Engine::From BDS
                title={configJSON.btnEmailListTitle} //UI Engine::From Sketch
                onPress={this.getEmailList} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <Button
                testID={"TestEventButton"} //Merge Engine::From BDS
                title={configJSON.btnCalendarViewleTitle} //UI Engine::From Sketch
                {...this.calendarBtnProps} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <Button
                testID={"TestContactButton"} //Merge Engine::From BDS
                title={configJSON.btnContactListTitle} //UI Engine::From Sketch
                {...this.contactsBtnProps} //Merge Engine::From BDS - {...this.testIDProps}
              />
              {/* <Button
                testID={"btnExample"} //Merge Engine::From BDS
                title={configJSON.btnDeletedEmailsTitle} //UI Engine::From Sketch
                {...this.deletedEmailsBtnProps} //Merge Engine::From BDS - {...this.testIDProps}
              /> */}
            </View>
            {isLoaded === false && !!displayName && (
              <Text style={styles.labelInfo}>Loading...</Text>
            )}

            <FlatList
              testID="testIDFlatlist"
              data={emails}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  testID={`TestRenderEmail-${item.id}`}
                  key={item.id}
                  onPress={() => this.openEmailDetail(item.id)}
                >
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text style={styles.text}>{item.subject}</Text>
                      </ListItem.Title>
                      <ListItem.Title right>
                        <Icon name="arrow-right" size={15} color="#808080" />
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.id}
            />

            <FlatList
              testID="testIDFlatlistCalendars"
              data={calendars}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback key={item.id}>
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>
                        <View>
                          <Text style={styles.eventSubject}>
                            {item.subject}
                          </Text>
                          <Text style={styles.eventOrganizer}>
                            {item.organizer!.emailAddress!.name}
                          </Text>
                          <Text style={styles.eventDuration}>
                            {this.convertDateTime(item.start!.dateTime!)} -{" "}
                            {this.convertDateTime(item.end!.dateTime!)}
                          </Text>
                        </View>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.id}
            />

            <FlatList
              testID="testIDFlatlistContacts"
              data={contacts}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback key={item.id}>
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>
                        <View>
                          <Text style={styles.eventSubject}>
                            {item.displayName}
                          </Text>
                        </View>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
      </View>
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
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  text: {
    color: "black",
  },
  actionGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  eventSubject: {
    fontWeight: "700",
    fontSize: 18,
    color: "black",
  },
  eventOrganizer: {
    fontWeight: "200",
    color: "black",
  },
  eventDuration: {
    fontWeight: "200",
    color: "black",
  },
  labelInfo: {
    paddingLeft: 10,
    color: "black",
  },
  center: {
    textAlign: "center",
  },
});
// Customizable Area End
