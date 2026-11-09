import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { imgBackArrow, image_send } from "./assets";
import ChatController, { Props } from "./ChatController";

export default class Chat extends ChatController {
  constructor(props: Props) {
    super(props);
  }

  renderItem = ({ item }: {
    item: {
      account_id: number,
      profile: string,
      message: string,
      created_at: string
    }
  }) => {
    const isCurrentUser = this.state.currentAccountId === item.account_id;
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.alignEnd : styles.alignStart]}>
        {!isCurrentUser && <Image style={styles.profileIcon} source={{ uri: item.profile }} />}
        <View style={[styles.messageBubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
          <Text style={styles.messageTxt}>{item.message}</Text>
          <Text style={styles.messageTime}>{this.getHourAndMint(item.created_at)}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <GenericHeader
          labelTitle="Message"
          imgBackArrow={imgBackArrow}
          btnGoBack={{ ...this.btnGoBack }}
          isOtherMsg
        />
        <FlatList
          testID="flatlist1"
          ref={this.scrollViewRef}
          data={this.state.messageList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          contentContainerStyle={styles.chatListContainer}
        />
        {this.state.loader && <View style={styles.loaderStyles}>
          <ActivityIndicator size="large" color="#012275" />
        </View>}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            placeholderTextColor="#888"
            value={this.state.enteredMsg}
            {...this.onChangeMessage}
          />
          <TouchableOpacity  {...this.onSendClick} >
            <Image style={styles.sendIcon} source={image_send} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  chatListContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  alignStart: {
    alignSelf: "flex-start",
  },
  alignEnd: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: Dimensions.get("screen").width * 0.7,
    padding: 10,
    borderRadius: 10,
  },
  currentUserBubble: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherUserBubble: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
  },
  messageTxt: {
    fontSize: 16,
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    marginBottom:  Platform.OS === "ios" ?  25 : 0
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginRight: 10,
  },
  sendIcon: {
    width: 28,
    height: 28,
  },
  loaderStyles: {
    justifyContent: 'center',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    opacity: 1,
    alignItems: 'center'
  },
});
