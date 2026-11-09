import React from "react";

// Customizable Area Start
import {
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
// Customizable Area End

import ViewChatController, {
  Props,
  configJSON,
  IMessage,
} from "./ViewChatController";
import { insertPhoto } from "./assets";

export default class ViewChat extends ViewChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAddAccountModal = () => (
    <Modal animationType={"fade"} transparent={false}>
      <View style={styles.modalContainer}>
        <TextInput
          testID={"inputAccountID"}
          style={styles.textInput}
          placeholder={configJSON.accountIdPlaceholder}
          {...this.inputAccountIdProps}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            testID={"btnAddAccount"}
            style={styles.button}
            {...this.btnAddAccountProps}
          >
            <Text style={styles.buttonLabel}>{configJSON.addButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnCloseModal"}
            style={styles.button}
            {...this.btnCloseModalProps}
          >
            <Text style={styles.buttonLabel}>{configJSON.cancelText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  renderPreviewModal = () => (
    <Modal animationType={"fade"} transparent={false}>
      <View style={styles.previewModal}>
        <Image style={styles.privewImage} source={{ uri: this.state.imageUrl }} />
        <View style={styles.fileButtonContainer}>
          <TouchableOpacity
            testID="btnClosePreviewModal"
            style={styles.closeFileButton}
            {...this.btnClosePreviewModal}
          >
            <Text style={styles.buttonLabel}>{configJSON.cancelText}</Text>
          </TouchableOpacity>
          <TextInput
            testID={"inputImageMessage"}
            style={styles.messageTextInput}
            placeholder={configJSON.writeMessagePlaceholder}
            value={this.state.message}
            {...this.inputMessageProps}
          />
          <TouchableOpacity
            testID="btnSendImageMessage"
            style={styles.sendFileButton}
            disabled={this.state.message?.length === 0}
            {...this.btnSendMessageProps}
          >
            <Text style={styles.buttonLabel}>{configJSON.sendText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  renderMessages = () => {
    const messageList = this.state.chatData?.attributes?.messages ?? [];
    return (
      <>
        {messageList?.map((item: IMessage, index: number) => (
          <View key={`message-${index}`} style={styles.messageBoxContainer}>
            {
              item.attributes.attachments?.[0].url ?
                <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={{ uri: item.attributes.attachments?.[0].url }} />
                :
                null
            }
            <Text
              style={
                item.attributes.is_mark_read
                  ? styles.readMessage
                  : styles.unreadMessage
              }
            >
              <Text style={styles.messageText}>{item.attributes?.message}</Text>
              <Text style={styles.messageDate}>
                {item.attributes?.created_at}
              </Text>
            </Text>
          </View>
        ))}
      </>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const { chatData } = this.state;
    return (
      <View style={styles.container}>
        {this.state.isVisibleModal ? <>{this.renderAddAccountModal()}</> : null}
        {this.state.isVisiblePreviewModal ? <>{this.renderPreviewModal()}</> : null}
        <Text> {chatData?.attributes.name}</Text>
        <Text style={styles.userCountText}>{`${configJSON.usersText} ${chatData?.relationships
          ?.accounts?.data?.length ?? ""}`}</Text>
        <View style={styles.headerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              testID={"btnShowAddModal"}
              style={styles.button}
              {...this.btnShowAddModalProps}
            >
              <Text style={styles.buttonLabel}>
                {configJSON.addAccountText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"btnLeaveChat"}
              style={styles.button}
              {...this.btnLeaveChatProps}
            >
              <Text style={styles.buttonLabel}>
                {configJSON.leaveChatRoomText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"btnToggleMute"}
              style={styles.toggleNotificationBtn}
              {...this.btnMuteProps}
            >
              {this.state.muted ? (
                <Octicons name="unmute" size={26} color="blue" />
              ) : (
                <Octicons name="mute" size={26} color="blue" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback
          testID={"hideKeyboard"}
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <ScrollView
            ref={this.scrollViewRef}
            keyboardShouldPersistTaps="always"
            onContentSizeChange={() => {
              this.scrollViewRef?.current?.scrollToEnd();
            }}
            showsVerticalScrollIndicator={false}
          >
            {this.renderMessages()}
          </ScrollView>
        </TouchableWithoutFeedback>
        <View
          style={{
            ...styles.bottomContainer,
            marginBottom: this.state.keyboardHeight,
          }}
        >
          <TextInput
            testID={"inputMessage"}
            style={styles.messageTextInput}
            placeholder={configJSON.writeMessagePlaceholder}
            value={this.state.message}
            {...this.inputMessageProps}
          />
          <TouchableOpacity
            testID={"btnInsertImage"}
            {...this.btnInsertPhotoProps}
          >
            <Image style={styles.insertPhotoIcon} source={insertPhoto} />
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnSendMessage"}
            style={styles.sendButton}
            disabled={this.state.message?.length === 0}
            {...this.btnSendMessageProps}
          >
            <Text style={styles.buttonLabel}>{configJSON.sendText}</Text>
          </TouchableOpacity>
        </View>
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
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  userCountText: {
    fontSize: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems:'center',
    borderTopWidth: 1,
    padding: 10,
  },
  messageTextInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
  sendButton: {
    backgroundColor: "blue",
    width: 80,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
  },
  sendFileButton: {
    backgroundColor: "blue",
    marginLeft: 10,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderRadius: 4,
  },
  closeFileButton: {
    backgroundColor: "red",
    marginRight: 10,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "blue",
    marginLeft: 10,
    width: 120,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end",
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  messageBoxContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#d9d6ed",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginRight: 40,
  },
  messageText: {
    fontSize: 18,
  },
  messageDate: {
    fontSize: 14,
    fontWeight: "200",
    color: "#111",
    marginTop: 5,
  },
  modalContainer: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15,
  },
  previewModal: {
    flex: 1,
  },
  privewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  fileButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop:20,
    marginBottom: 60
  },
  textInput: {
    fontSize: 16,
    textAlign: "left",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
  toggleNotificationBtn: {
    padding: 4,
    borderWidth: 0,
    marginLeft: 10,
  },
  unreadMessage: {
    color: "red",
  },
  readMessage: {
    color: "black",
  },
  insertPhotoIcon: {
    resizeMode: 'contain',
    margin: 0,
    padding: 0
  }
});
// Customizable Area End
