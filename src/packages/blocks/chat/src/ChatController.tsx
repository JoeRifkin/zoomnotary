import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
export const baseURL = require("../../../framework/src/config.js").baseURL;
import { setupWebSocket } from "../../../components/src/setupwebsocket";
import React from "react"
import {FlatList, Keyboard} from "react-native"
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start

interface ChatChannel {
  data: {
      id: string;
      type: string;
      attributes: ChatChannelAttributes;
      relationships: {
          accounts: {
              data: RelationshipData[];
          };
      };
  };
}

interface ChatChannelAttributes {
  id: number;
  name: string;
  notary_request_id: number;
  accounts_chats: AccountsChat[];
  full_name: string;
  profile: string;
  messages: ChatMessage[];
}

interface AccountsChat {
  id: string;
  type: string;
  attributes: {
      account_id: number;
      muted: boolean;
      unread_count: number;
  };
}

interface ChatMessage {
  id: string;
  type: string;
  attributes: {
      id: number;
      message: string;
      account_id: number;
      chat_id: number;
      created_at: string;
      updated_at: string;
      is_mark_read: boolean;
      attachments: string | null;
  };
}

interface RelationshipData {
  id: string;
  type: string;
}

export interface IChat {
  id: string;
  muted: boolean;
  unreadCount: number;
  lastMessage: string;
  name: string;
}

interface IChatResponse {
  id: string;
  attributes: {
    name: string;
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
    messages: {
      id: string;
      attributes: { id: number; message: string };
      message: string;
    };
  };
}

interface MessageList {
  id: number;
  message: string;
  account_id: number;
  name: string;
  profile: string;
  created_at: string;
}

interface MessagesData {
  messages?: MessageList[];
  errors?: string
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
  accountId: number;
  chatName: string;
  chatList: IChat[];
  isVisibleModal: boolean;
  enteredMsg: string;
  messageList: MessageList[] | null;
  messageError: string | undefined;
  currentAccountId: number | null
  chatId: string | number;
  newReceivedMessage: string;
  firstTime: boolean;
  loader: boolean
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatListApiCallId: string = "";
  createChatRoomApiCallId: string = "";
  getMessageDataCallID: string = "";
  requestId: string="";
  makeQuoteApiCallId: string= "";
  webSocket: WebSocket | null = null;
  scrollViewRef: React.RefObject<FlatList>;
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
      accountId: -1,
      chatName: "ChatChannel",
      chatList: [],
      isVisibleModal: false,
      enteredMsg: '',
      messageList: null,
      messageError: '',
      currentAccountId: null,
      chatId: '',
      newReceivedMessage: "",
      firstTime: true,
      loader: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.scrollViewRef = React.createRef<FlatList>();
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
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  isStringNullOrBlank = (string: string) => {
    return string === undefined || string === null || string.length === 0;
  };

  showModal = () => {
    this.setState({ isVisibleModal: true });
  };

  hideModal = () => {
    this.setState({ isVisibleModal: false });
  };

  navigateToChatView = (chatId: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "ViewChat");

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      chatId: chatId,
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(message);
  };

  getChatList = async (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getChatListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getMyChatsApiEndpoint
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

  createChatRoom = (chatName: string) => {
    if (this.isStringNullOrBlank(chatName)) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
        "Access-Control-Allow-Origin": "*",
      };
      const bodyData = {
        chat: {
          name: chatName,
          notary_request_id: this.requestId
        }
      }
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createChatRoomApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.createChatRoomApiEndPoint
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

  inputRoomNameProps = {
    onChangeText: (chatName: string) => {
      this.setState({ chatName });
    },
  };

  btnAddRoomProps = {
    onPress: () => this.createChatRoom(this.state.chatName),
  };

  btnCloseModalProps = {
    onPress: () => this.hideModal(),
  };

  btnShowAddModalProps = {
    onPress: () => {
      this.showModal();
    },
  };

  handleChatNameChange = (chatName: string) => {
    this.setState({ chatName });
  };

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayloadMessage(message);
    }
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

    this.handelApiResponseData(message, apiRequestCallId, responseJson)
    
  }

  handelApiResponseData = (message: Message, apiRequestCallId: string, responseJson: any) => {
    this.handleSessionResponseMessage(message);
    this.handleChatListResponse(message, responseJson, apiRequestCallId)
    this.handleCreateChatRoomResponse(message, responseJson, apiRequestCallId)
    this.handleMessageDataResponse(message, responseJson, apiRequestCallId)
  }

  handleSessionResponseMessage(message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      const messageData = JSON.parse(message.getData(getName(MessageEnum.SessionResponseData)));
      const accountId = messageData?.meta?.id;
      this.setState({ accountId });
      if (token) {
        this.setState({ token });
      }
    }
  }
  
  handleChatListResponse(message: Message, responseJson: any, apiRequestCallId: string) {
    if (
      responseJson?.data &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getChatListApiCallId.length > 0 &&
      apiRequestCallId === this.getChatListApiCallId
    ) {
      this.getChatListApiCallId = "";
      const chatList = responseJson.data;
      const results = chatList.map((item: IChatResponse) => this.mapChatListItem(item));
      this.setState({ chatList: results });
    }
  }
  
  mapChatListItem(item: IChatResponse) {
    const findAccountMuteResult = item.attributes.accounts_chats.find(
      (chat) => chat.attributes.account_id === this.state.accountId
    )?.attributes.muted;
  
    return {
      id: item.id,
      name: item.attributes.name,
      muted: findAccountMuteResult ?? item.attributes.accounts_chats[0].attributes.muted,
      unreadCount: item.attributes.accounts_chats[0].attributes.unread_count,
      lastMessage: item.attributes.messages?.attributes?.message,
    };
  }
  
  handleCreateChatRoomResponse(message: Message, responseJson: ChatChannel, apiRequestCallId: string) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createChatRoomApiCallId.length > 0 &&
      apiRequestCallId === this.createChatRoomApiCallId &&
      responseJson
    ) {
      this.createChatRoomApiCallId = "";
      this.hideModal();
      this.handleCreateChatRoomApiRes(responseJson);
    }
  }
  
  async handleMessageDataResponse(message: Message, responseJson: MessagesData, apiRequestCallId: string) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id && apiRequestCallId === this.getMessageDataCallID) {
      if (responseJson.messages) {
        const userDetail = await getStorageData('userProfileData');
        this.setState({
          enteredMsg: "",
          messageList: responseJson.messages,
          currentAccountId: userDetail ? (JSON.parse(userDetail)).id : '',
        }, () => {
          this.scrollToBottom();
        });
      } else {
        this.setState({ messageError: responseJson.errors, loader: false });
      }
    }
  }
  

  handleCreateChatRoomApiRes = (response: ChatChannel) => {
    if (response.data) {
      const { attributes, relationships } = response.data;
      this.setState({ chatId: attributes.id, chatName: "ChatChannel", currentAccountId: Number(relationships.accounts.data[0].id)}, 
      () => {
        this.getMessageData()
        this.webSocketConnection()
      });
    }
  }

  webSocketConnection = () => {
    const URL = baseURL.replace(/^https?:\/\//i, "");
    const token = this.state.token;
    this.webSocket = setupWebSocket(
      URL,
      token,
      this.state.chatId,
      "ChatChannel",
      this.handleMessage,
    );
  };

  handleMessage = (message: any) => {
    this.setState({ newReceivedMessage: message });
  };

  handleNavigationPayloadMessage = (message: Message) => {
    const myData = message.getData(getName(MessageEnum.CustomDataMessage))
    if (myData) {
      this.requestId = myData.requestId;
      this.setState({token: myData.token }, () => {
        this.createChatRoom('ChatChannel');
      });
    }
  };

  btnGoBack = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    }
  }

  onSendClick = {
    onPress: () => {
      const { enteredMsg, chatId, chatName } = this.state;
  
      if (enteredMsg === '') return;
      if (this.webSocket) {
        this.webSocket.send(
          JSON.stringify({
            command: "message",
            identifier: JSON.stringify({
              channel: chatName,
              id: chatId,
            }),
            data: JSON.stringify({
              message: enteredMsg,
              action: "speak",
            }),
          })
        );
      }
      this.getMessageData();
      Keyboard.dismiss();
    },
  };
  

  async componentWillUnmount() {
    this.webSocket?.close();
  }

  async componentDidUpdate(prevProps: Props, prevState: S) {
    if (prevState.messageList !== this.state.messageList) {
      this.scrollToBottom();
    }
    if (prevState.newReceivedMessage !== this.state.newReceivedMessage) {
      this.getMessageData();
    }
  }

  scrollToBottom = () => {
      let timeout = this.state.firstTime ? 5000 : 100;
      setTimeout(() => {
        if (this.scrollViewRef.current) {
          this.scrollViewRef.current.scrollToEnd({ animated: false });
          this.setState({loader: false, firstTime: false});
        }
      }, timeout);
  };

  getMessageData() {
    this.state.firstTime && this.setState({ loader: true });

    let header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    }

    const getMessageDataReq = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getMessageDataCallID = getMessageDataReq.messageId;

    getMessageDataReq.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getMessageApiEndpoint}${this.requestId}`
    );

    getMessageDataReq.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    getMessageDataReq.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(getMessageDataReq.id, getMessageDataReq);
  }

  onChangeMessage = {
    onChangeText: (enteredMsg: string) => {
      this.setState({enteredMsg})
    }
  }

  getHourAndMint = (dateTimeString: string) => {
    const date = new Date(dateTimeString);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes(); 
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedTime
  }

  getMarginRight = (showAvatar:boolean) => { 
    if(showAvatar) {
      return 'forReverseMarginRight'
    } else {
      return 'forReverseMarginRightSec'
    }
  }

  getMarginLeft = (showAvatar:boolean) => {
    if(showAvatar) {
      return 'forMarginLeft'
    } else {
      return 'forMarginLeftSec'
    }
  }

  // Customizable Area End
}
