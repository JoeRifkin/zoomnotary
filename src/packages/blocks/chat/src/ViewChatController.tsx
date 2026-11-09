import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React, { ChangeEvent } from "react";
import { Keyboard, ScrollView } from "react-native";
import DocumentPicker from "react-native-document-picker";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IChatData {
  id: string;
  attributes: {
    id: number;
    name: string;
    is_notification_mute: boolean;
    accounts_chats: [
      {
        id: string;
        attributes: {
          account_id: number;
          muted: boolean;
          unread_count: number;
        };
      }
    ];
    messages: IMessage[];
  };
  relationships: { accounts: { data: { id: string; type: string }[] } };
}

export interface IMessage {
  id: string;
  type: "chat_message";
  attributes: {
    id: number;
    message: string;
    account_id: number;
    chat_id: number;
    created_at: string;
    updated_at: string;
    is_mark_read: boolean;
    attachments: { id: number; url: string }[] | null;
  };
}
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  chatId: number;
  message: string;
  accountIdInput: string;
  accountId: number;
  chatData: IChatData | null;
  isVisibleModal: boolean;
  isVisiblePreviewModal: boolean;
  imageUrl: string;
  docRes: unknown;
  keyboardHeight: number;
  muted: boolean | null;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ViewChatController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatApiCallId: string = "";
  addUserToChatApiCallId: string = "";
  leaveChatApiCallId: string = "";
  sendMessageApiCallId: string = "";
  toggleMuteApiCallId: string = "";
  updateReadMessageApiCallId: string = "";
  refreshChatInterval: unknown;
  //(this.isPlatformWeb() ? number: ReturnType<typeof setInterval>)
  //((this.isPlatformWeb()) ? (number) : (NodeJS.Timer));
  scrollViewRef: React.RefObject<ScrollView>;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      chatId: 3,
      message: "",
      accountId: -1,
      accountIdInput: "",
      chatData: null,
      isVisibleModal: false,
      isVisiblePreviewModal: false,
      imageUrl: "",
      docRes: null,
      keyboardHeight: 0,
      muted: null,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.scrollViewRef = React.createRef();
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    // Customizable Area Start
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area End

    Keyboard.addListener("keyboardDidShow", this._keyboardDidShow.bind(this));
    Keyboard.addListener("keyboardDidHide", this._keyboardDidHide.bind(this));
  }

  async componentWillUnmount() {
    clearInterval(this.refreshChatInterval as number);
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  isStringNullOrBlank = (string: string) => {
    return !string || string.length === 0;
  };

  showModal = () => {
    this.setState({ isVisibleModal: true });
  };

  hideModal = () => {
    this.setState({ isVisibleModal: false });
  };

  hidePreviewModal = () => {
    this.setState({ isVisiblePreviewModal: false, imageUrl: '', docRes: null });
  };

  handleAccountIdInputChange = (accountIdInput: string) => {
    this.setState({ accountIdInput });
  };

  handleMessageChange = (message: string) => {
    this.setState({ message });
  };

  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && event.target.files) {
      const file = event.target.files[0] as Blob;
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.setState({
          imageUrl: readerEvent.target?.result as string,
          docRes: file,
          isVisiblePreviewModal: true,
        });
      };
      reader.readAsDataURL(file);
      this.setState({ docRes: file, isVisiblePreviewModal: true });
    } else {
      this.setState({ imageUrl: "", docRes: null });
    }
  };

  handleSendMessage = () => {
    this.sendChatMessage(
      this.state.chatId,
      this.state.message,
      this.state.imageUrl
    );
    this.setState({ message: "", imageUrl: "", isVisiblePreviewModal: false });
  };

  handleInsertImage = () => {
    
  };

  getChatDetails = (token: string, chatId: number) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getChatApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.showChatApiEndPoint}/${chatId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  addUserToChat = (accountIdInput: string, chatId: number) => {
    if (!accountIdInput || this.isStringNullOrBlank(accountIdInput)) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
      };
      const bodyData = {
        accounts_id: [Number(accountIdInput)],
        chat_id: Number(chatId),
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.addUserToChatApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.addUserToChatApiEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(bodyData)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.postApiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };

  leaveChatRoom = (chatId: number) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const bodyData = {
      chat_id: parseInt(chatId + "", 10),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.leaveChatApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.leaveChatApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(bodyData)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  sendChatMessage = async (
    chatId: number,
    message: string,
    imageUrl?: string
  ) => {
    const header = {
      token: this.state.token,
    };
    const formData = new FormData();
    formData.append("message[message]", message);
    if (imageUrl) {
      formData.append("message[attachments][]", this.state.docRes as Blob);
      this.setState({ docRes: null });
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.sendMessageApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.sendMessageApiEndPoint}/${chatId}/messages`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  changeNotificationStatus = () => {
    const { muted } = this.state;
    if (muted === null) {
      this.setState({ muted: true });
    } else {
      this.setState({ muted: !muted });
    }
    this.toggleMute();
  };

  toggleMute = () => {
    const { chatId, muted } = this.state;
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const bodyData = {
      chat: { muted: !muted },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.toggleMuteApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.updateChatApiEndPoint}/${chatId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(bodyData)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  updateReadMessages = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const bodyData = {
      chat_id: this.state.chatId,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateReadMessageApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.updateReadMessageApiEndPoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(bodyData)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  openFile = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      if (response) {
        this.setState({
          imageUrl: response.uri,
          isVisiblePreviewModal: true,
          docRes: response,
        });
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        runEngine.debugLog("Message Recived", "User Canceled Picker");
      } else {
        runEngine.debugLog("Message Recived", error);
      }
    }
  };

  inputAccountIdProps = {
    onChangeText: (text: string) => {
      this.setState({ accountIdInput: text });
    },
  };

  inputMessageProps = {
    onChangeText: (text: string) => {
      this.setState({ message: text });
    },
  };

  btnAddAccountProps = {
    onPress: () =>
      this.addUserToChat(this.state.accountIdInput, this.state.chatId),
  };

  btnCloseModalProps = {
    onPress: () => this.hideModal(),
  };

  btnShowAddModalProps = {
    onPress: () => this.showModal(),
  };

  btnLeaveChatProps = {
    onPress: () => this.leaveChatRoom(this.state.chatId),
  };

  btnSendMessageProps = {
    onPress: () => {
      this.sendChatMessage(
        this.state.chatId,
        this.state.message,
        this.state.imageUrl
      );
      this.setState({
        message: '',
        imageUrl: '',
        isVisiblePreviewModal: false,
      });
    },
  };

  btnClosePreviewModal = {
    onPress: () => this.hidePreviewModal(),
  };

  btnMuteProps = {
    onPress: () => this.changeNotificationStatus(),
  };

  btnInsertPhotoProps = {
    onPress: () => this.openFile(),
  };

  _keyboardDidShow = (event: { endCoordinates: { height: number } }) => {
    this.setState({ keyboardHeight: event.endCoordinates.height });
  };

  _keyboardDidHide = (event: { endCoordinates: { height: number } }) => {
    this.setState({ keyboardHeight: 0 });
  };

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errorResponse) {
      this.parseApiCatchErrorResponse(errorResponse);
    }
    if (responseJson?.errors) {
      this.parseApiErrorResponse(responseJson);
    }

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("TOKEN", token);
      const messageData = JSON.parse(
        message.getData(getName(MessageEnum.SessionResponseData))
      );
      if (messageData && messageData.meta) {
        const accountId: number = messageData.meta.id;
        this.setState({ accountId });
      }
      if (token) {
        this.setState({ token });
      }
      this.refreshChatInterval = setInterval(
        () => this.getChatDetails(this.state.token, this.state.chatId),
        30000
      );
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const chatData = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      const { chatId } = chatData;
      this.setState({ chatId }, () =>
        this.getChatDetails(this.state.token, chatId)
      );
    }

    const restApiDataCondition: boolean =
      responseJson &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id;
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      apiRequestCallId === this.getChatApiCallId &&
      responseJson &&
      responseJson.data
    ) {
      const chatData = responseJson.data;
      const { muted } = chatData.attributes.accounts_chats.find(
        (item: { attributes: { account_id: number } }) =>
          item.attributes.account_id === this.state.accountId
      ).attributes;
      this.setState({
        chatData,
        muted,
      });
      this.updateReadMessages();
    }
    if (
      restApiDataCondition &&
      apiRequestCallId === this.sendMessageApiCallId
    ) {
      this.getChatDetails(this.state.token, this.state.chatId);
    }
    if (
      restApiDataCondition &&
      apiRequestCallId === this.addUserToChatApiCallId
    ) {
      this.hideModal();
      this.getChatDetails(this.state.token, this.state.chatId);
    }
    if (restApiDataCondition && apiRequestCallId === this.toggleMuteApiCallId) {
    }
    if (
      restApiDataCondition &&
      apiRequestCallId === this.updateReadMessageApiCallId
    ) {
    }
    if (restApiDataCondition && apiRequestCallId === this.leaveChatApiCallId) {
      this.props.navigation.goBack();
    }
  }
  // Customizable Area End
}
