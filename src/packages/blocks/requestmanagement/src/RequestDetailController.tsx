import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React from "react";
const RNFS = require('react-native-fs');
import FileViewer from 'react-native-file-viewer';
import { Alert, FlatList, Platform } from 'react-native';
import { imgRequestDownArrow, imgRequestUpArrow } from './assets';
import { getStorageData,setStorageData } from 'framework/src/Utilities';
export const baseURL = require("../../../framework/src/config.js").baseURL;
import { setupWebSocket } from "../../../components/src/setupwebsocket";

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

interface DeclineRespInterface {
  message: string
}

interface RelationshipData {
  id: string;
  type: string;
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

interface Signatory {
  name: string;
  email: string;
  is_signatory: boolean | null;
  signed: boolean;
}

interface DocuSignStarted {
  message: string;
  signing_urls: string;
  envelope_id: string;
  access_token: string;
  docMessSign:string
}

interface DocumentSigningStatus {
  document_id: string;
  signing_urls: string;
  file_name: string;
  is_docusign_start: boolean;
  signatory: Signatory[];
  notary: any[];
  document_url: string
}

interface DocumentSigningResponse {
  document_signing_status: DocumentSigningStatus[];
}

interface Recipient {
  id: number;
  created_at: string;
  updated_at: string;
  file_document_id: number;
  name: string;
  email: string;
  is_signatory: boolean;
}

interface FileDocument {
  doc_name: string | null;
  doc_file_url: string;
  signatory_count: number;
  recipients: Recipient[];
}

interface RecipientsDetail {
  id: number,
  created_at: string,
  updated_at: string,
  file_document_id: number,
  name: string,
  email: string,
  is_signatory: boolean
}

type MeetingType = {
  zoom_meetings: {
    notary_request_id: number;
    meeting: {
      id: number;
      type: number;
      uuid: string;
      topic: string;
      status: string;
      host_id: string;
      duration: number;
      join_url: string;
      password: string;
      settings: {
        audio: string;
        use_pmi: boolean;
        jbh_time: number;
        resources: string[];
        watermark: boolean;
        cn_meeting: boolean;
        focus_mode: boolean;
        host_video: boolean;
        in_meeting: boolean;
        waiting_room: boolean;
        approval_type: number;
        breakout_room: {
          enable: boolean;
        };
        enforce_login: boolean;
        auto_recording: string;
        device_testing: boolean;
        show_join_info: boolean;
        encryption_type: string;
        mute_upon_entry: boolean;
        private_meeting: boolean;
        internal_meeting: boolean;
        join_before_host: boolean;
        meeting_invitees: string[];
        alternative_hosts: string;
        participant_video: boolean;
        show_share_button: boolean;
        close_registration: boolean;
        email_notification: boolean;
        enforce_login_domains: string;
        host_save_video_order: boolean;
        allow_multiple_devices: boolean;
        meeting_authentication: boolean;
        continuous_meeting_chat: {
          enable: boolean;
          channel_id: string;
          auto_add_meeting_participants: boolean;
          auto_add_invited_external_users: boolean;
        };
        push_change_to_calendar: boolean;
        email_in_attendee_report: boolean;
        enable_dedicated_group_chat: boolean;
        participant_focused_meeting: boolean;
        sign_language_interpretation: {
          enable: boolean;
        };
        alternative_host_update_polls: boolean;
        registrants_confirmation_email: boolean;
        registrants_email_notification: boolean;
        alternative_hosts_email_notification: boolean;
        approved_or_denied_countries_or_regions: {
          enable: boolean;
        };
        request_permission_to_unmute_participants: boolean;
      };
      timezone: string;
      start_url: string;
      created_at: string;
      host_email: string;
      start_time: string;
      pre_schedule: boolean;
      h323_password: string;
      pstn_password: string;
      encrypted_password: string;
    };
    start_time: string;
    end_time: string;
  };
};


interface NotaryRequest {
    id: string;
    type: string;
    attributes: {
      status: string;
      notary_id: number | null;
      notary_service_type: number;
      priority: string;
      notarisation_method_id: number;
      jurisdiction_id: number;
      date: string; // ISO Date String
      notes: string;
      notarised_document: number;
      timing_slot: string;
      invited_request_status: string | null;
      is_deleted: boolean;
      invite_request: boolean;
      invite_number: string | null;
      platform_fee_details: {
        fee_type: string;
        fee_value: string;
      };
      juridiction: {
        id: number;
        jurisdiction: string;
        created_at: string; // ISO Date String
        updated_at: string; // ISO Date String
      };
      notarisation_method: {
        id: number;
        notarisation_method: string;
        created_at: string; // ISO Date String
        updated_at: string; // ISO Date String
      };
      notary_service_name: string;
      file_documents: FileDocument[];
      kyc_details: {
        data: any | null;
      };
    };
    relationships: {
      jurisdiction: {
        data: {
          id: string;
          type: string;
        };
      };
      notary: {
        data: null | {
          id: string;
          type: string;
        };
      };
      notarisation_method: {
        data: {
          id: string;
          type: string;
        };
      };
      account: {
        data: {
          id: string;
          type: string;
        };
      };
    };
}

interface FileDocument {
  doc_id: number;
  doc_type: string;
  doc_size: number;
  doc_base_64: string;
  doc_name: string | null;
  doc_file_url: string;
  signatory_count: number;
  recipients: Recipient[];
}

interface Recipient {
  id: number;
  created_at: string; // ISO Date String
  updated_at: string; // ISO Date String
  file_document_id: number;
  name: string;
  email: string;
  is_signatory: boolean;
  signed: boolean;
  is_notary: boolean;
  signing_url: string | null;
  envelope_id: string | null;
  access_token: string | null;
}


interface NotraryRequestDetail {
  data: NotaryRequest
}

interface MenuItem {
  name: string;
  key: string;
  action: string[];
}

interface CancellationPolicy {
  cancellation_charges: number;
}

interface NotaryResponse {
  notary_id: number;
  message: string;
}

interface QuoteAttributes {
  notary_requests_id: number;
  start_time: string;
  video_call_required: boolean;
  fees: string;
  end_time: string;
  platform_fee_inclusive: boolean;
  message: string;
  notary_id: number;
  created_at: string;
  updated_at: string;
  quote_statuses_id: number;
  quote_status: string;
  notary_fees: string;
  platform_fees: string;
  vat_fee: string | null
}

interface QuoteData {
  id: string;
  type: string;
  attributes: QuoteAttributes;
}

interface QuoteResponse {
  data: QuoteData[];
}

interface QuoteStatus {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface QuoteStatusesResponse {
  quote_statuses: QuoteStatus[];
}

interface KycStatusResponse {
  status: string | null
}
interface CancellactionError {
  errors: string
}

interface MessageCount {
  count: number
}

interface MarkCompletedError {
  error: string;
}

type ApiResponse = MarkCompletedError | ChatChannel | MessageCount | CancellactionError | KycStatusResponse | MeetingType | DocuSignStarted | NotraryRequestDetail | CancellationPolicy | NotaryResponse | QuoteResponse | QuoteStatusesResponse | DocumentSigningResponse | DeclineRespInterface;
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  requestData: NotaryRequest | null;
  selectedTab: string;
  isSignatoryOpen: boolean,
  selectedSignnatoryIndex: number | null;
  isCancelRequestModelOpen: boolean;
  CancellationCharge: CancellationPolicy | null;
  cancelRequestRes: NotaryResponse | null;
  userRoleType: string;
  quoteListData: QuoteResponse | null;
  isPreviewQuoteModel: boolean;
  previewQuoteDetail: QuoteData | null;
  quoteNumber: number;
  quoteStatusList: QuoteStatusesResponse | null;
  meetingLinkData: MeetingType | null;
  meetingData: MeetingType | null;
  isNotifyMins: boolean;
  opacityView: boolean;
  isZoomMeetingModel: boolean;
  kycDetailData: QuoteResponse | null;
  docuSignDetail: DocumentSigningStatus[] | null;
  selectedQuoteId: string;
  isWithdrawQuote: boolean;
  isCheckNewTab: boolean;
  isCheckDataTab: boolean;
  isDocuSignOpen: boolean;
  selecteddocuSignForStartIndex: number | null
  selectedDocument: DocumentSigningStatus | null;
  docuSignOpenStates: { [index: number]: boolean };
  isLoader: boolean;
  isAddtrackingDetailsModel: boolean;
  expandedItem: null,
  providername: string,
  trackingnumber: string,
  additionalnote: string,
  isValidateFieldName: boolean;
  isValidateFieldNumber: boolean;
  TrackingDataData: any;
  emailid: string,
  id: any,
  kycStatus: KycStatusResponse | null;
  cancellationError: CancellactionError | null;
  isCancellactionErrorPopup: boolean;
  showPDF: boolean,
  fileUrl: string;
  zoomLinkJoin:string;
  startMeeting:boolean;
  messageCount: MessageCount | null;
  chatName: string;
  currentAccountId: number | null
  chatId: string | number;
  newReceivedMessage: string;
  isMarkCompleteModelOpen: boolean;
  markCompletedApiError: string;
  markAsSucessfully: boolean;
  requestID: string | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RequestDetailController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  apiQuoteListCallId: string = "";
  meetingApiCallId: string = "";
  getTrackingDetailsCallId: string = "";
  getUnreadMessageCallId: string = "";
  AddTrackingdataCallId: string = "";
  getKycVerificationStatusCallId: string = ""
  createChatRoomApiCallId: string = "";
  declineRequestApiCallId: string = "";
  webSocket: WebSocket | null = null;
  endUserTabs: MenuItem[] = [
    { name: "Overview", key: "overview", action: ['pending', "cancelled", "completed", "in progress"] },
    { name: "Quotes ", key: "quotes", action: ['pending'] },
    { name: "Meeting", key: "meeting", action: ["completed", "in progress"] },
    { name: "Document Signing", key: "signing", action: ["completed", "in progress"] },
    { name: "Tracking", key: "tracking", action: ["completed", "in progress"] },
    { name: "KYC Verification", key: "kyc", action: ["completed", "in progress"] }
  ];
  notaryUserTabs: MenuItem[] = [
    { name: "Overview", key: "overview", action: ['pending', "cancelled", "completed", "in progress"] },
    { name: "Meeting", key: "meeting", action: ["completed", "in progress"] },
    { name: "Document Signing", key: "signing", action: ["completed", "in progress"] },
    { name: "Tracking", key: "tracking", action: ["completed", "in progress"] },
    { name: "KYC Verification", key: "kyc", action: ["completed", "in progress"] }
  ];
  fromPage: string = "";
  selectedActionType: string = "";
  apiCancellationChargeCallId: string = "";
  apiCancelRequestCallId: string = "";
  apiQuoteStatusListCallId: string = "";
  flatListRef = React.createRef<FlatList<MenuItem>>();
  apiWithdrawQuoteCallId: string = "";
  makeQuoteApiDupCallId: string = "";
  proceedApiDupCallId: string = "";
  apiCallToCheckDocuSignStartedID: string = "";
  apiCallStartDocuSignID: string = "";
  startDocumentId: string = "";
  getMarkCompletedCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      selectedTab: 'overview',
      requestData: null,
      isSignatoryOpen: false,
      selectedSignnatoryIndex: null,
      isCancelRequestModelOpen: false,
      CancellationCharge: null,
      cancelRequestRes: null,
      userRoleType: '',
      quoteListData: null,
      isPreviewQuoteModel: false,
      previewQuoteDetail: null,
      quoteNumber: 0,
      quoteStatusList: null,
      meetingLinkData: null,
      meetingData: null,
      isNotifyMins: false,
      opacityView: true,
      isZoomMeetingModel: false,
      kycDetailData: null,
      docuSignDetail: null,
      selectedQuoteId: '',
      isWithdrawQuote: false,
      isCheckNewTab: false,
      isCheckDataTab: false,
      isDocuSignOpen: false,
      selecteddocuSignForStartIndex: null,
      selectedDocument: null,
      docuSignOpenStates: {},
      isLoader: false,
      isAddtrackingDetailsModel: false,
      expandedItem: null,
      providername: "",
      trackingnumber: "",
      additionalnote: "",
      isValidateFieldName: false,
      isValidateFieldNumber: false,
      TrackingDataData: [],
      emailid: "",
      id: "",
      kycStatus: null,
      isCancellactionErrorPopup: false,
      cancellationError: null,
      showPDF: false,
      fileUrl: "",
      zoomLinkJoin: "",
      startMeeting: false,
      messageCount: null,
      chatName: "ChatChannel",
      currentAccountId: null,
      chatId: '',
      newReceivedMessage: "",
      isMarkCompleteModelOpen: false,
      markCompletedApiError: "",
      markAsSucessfully: false,
      requestID: null
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const myData = message.getData(
        getName(MessageEnum.CustomDataMessage)
      );
      if (myData) {
        this.selectedActionType = myData.actionType
        this.fromPage = myData.from
        this.getRequestDetail(myData.requestId)
        this.setState({requestID: myData.requestId});
      }
    }
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const userData = message.getData(getName(MessageEnum.SessionResponseData));
      const userRole = JSON.parse(userData);
      this.setState({ token: userRole.meta.token, userRoleType: userRole.meta.role })
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.apiDashboardItemCallId && responseJson !== undefined) {
        this.setState({ requestData: responseJson?.data, isLoader: false }, () => {
          this.createChatRoom('ChatChannel')
          this.getQuoteList()
          this.getQuoteStatusList()
          this.meetingApiCal()
          this.getTrakingHistory()
          this.getKycVerificationStatus()
        })
      } else if (apiRequestCallId && responseJson) {
        this.manageApiResponse(apiRequestCallId, responseJson);
      }
    }
  }

  createChatRoom = (chatName: string) => {
    const headerData = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token
    };
    const body = {
      chat: {
        name: chatName,
        notary_request_id: this.state.requestData?.id
      }
    }
    const requestMessageData = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createChatRoomApiCallId = requestMessageData.messageId;

    requestMessageData.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createChatRoomApiEndPoint
    );
    requestMessageData.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerData)
    );
    requestMessageData.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    requestMessageData.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createSendRequestApiMethod
    );

    runEngine.sendMessage(requestMessageData.id, requestMessageData);
  };

  getNewUnreadMsgCount = () => {
    const header = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token,
    };

    const getAllRequestMsgReq = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUnreadMessageCallId = getAllRequestMsgReq.messageId;

    getAllRequestMsgReq.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.unreadeMessageApiEndpoint + this.state.chatId
    )

    getAllRequestMsgReq.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    getAllRequestMsgReq.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getAllRequestMsgReq.id, getAllRequestMsgReq);
  }

  removeSpacesFromImageName = (imageName: string) => {
    return imageName.replace(/(%20|\s+)/g, '_');
  }

  openFileUrlDownload = async (fileUrlPaths: string) => {
    try {
      this.setState({ isLoader: true });
      const fileName = fileUrlPaths.split('/').pop() || 'downloaded_file';
      let dirPath = Platform.OS === "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
      const timestamp = new Date().getTime();
      let destinationPathToSave1 = `${dirPath}/${timestamp}_${this.removeSpacesFromImageName(fileName)}`

      const downloadResultFileData = await RNFS.downloadFile({
        fromUrl: fileUrlPaths,
        toFile: destinationPathToSave1,
      }).promise;

      if (downloadResultFileData.statusCode === 200) {
        this.setState({ isLoader: false });
        Alert.alert("File downloaded successfully.")
      }
    } catch (error:any ) {
      this.setState({ isLoader: false });
      Alert.alert('Error during download or opening file:', error.message);
    };
  };

  openFileUrl = async (fileUrlPath: string) => {
    try {
      this.setState({ isLoader: true });
      const fileName = fileUrlPath.split('/').pop() || 'downloaded_file';
      let dirPath = Platform.OS === "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
      const timestamp = new Date().getTime();
      let destinationPathToSave = `${dirPath}/${timestamp}_${this.removeSpacesFromImageName(fileName)}`

      const downloadResultFile = await RNFS.downloadFile({
        fromUrl: fileUrlPath,
        toFile: destinationPathToSave,
      }).promise;

      if (downloadResultFile.statusCode === 200) {
        this.setState({ isLoader: false });
        await FileViewer.open(destinationPathToSave);
     }
    } catch (error: any) {
      this.setState({ isLoader: false });
      Alert.alert('Error during download or opening file:', error.message);
    }
  }
  
  manageApiResponse = (apiRequestCallId: string, responseJson: ApiResponse) => {
    switch (apiRequestCallId) {
      case this.apiCancellationChargeCallId:
        this.handleCancellactionChargeApiResponse(responseJson)
        break;
      case this.apiCancelRequestCallId:
        this.setState({
          cancelRequestRes: responseJson as NotaryResponse
        }, () => {
          this.getRequestDetail(Number(this.state.requestData?.id))
        });
        break;
      case this.apiQuoteListCallId:
        this.sortQuoteListData(responseJson as QuoteResponse);
        break;
      case this.apiQuoteStatusListCallId:
        this.setState({ quoteStatusList: responseJson as QuoteStatusesResponse })
        break;
      case this.apiWithdrawQuoteCallId:
        this.setState({
          isWithdrawQuote: false, selectedQuoteId: ''
        }, () => {
          this.getRequestDetail(Number(this.state.requestData?.id))
        });
        break;
      case this.apiCallToCheckDocuSignStartedID:
        this.getDocuSignListAccordingToUser(responseJson as DocumentSigningResponse)
        break;
      case this.apiCallStartDocuSignID:
        this.redirectPageToDocuSign(responseJson as DocuSignStarted, this.startDocumentId)
        break;
      case this.meetingApiCallId:
        this.handleMeetingRes(responseJson as MeetingType)
        break;
      case this.getTrackingDetailsCallId:
        this.setState({ isLoader: false })
        this.setState({ TrackingDataData: responseJson })
        break;
      case this.AddTrackingdataCallId:
        this.getTrakingHistory()
        break;
      case this.getKycVerificationStatusCallId:
        this.handleKycStatusResponse(responseJson as KycStatusResponse);
        break;
      case this.getUnreadMessageCallId:
        this.setState({messageCount: responseJson as MessageCount})
        break;
      case this.createChatRoomApiCallId:
        this.handleCreateChatRoomApiRes(responseJson as ChatChannel)
        break;
      case this.getMarkCompletedCallId:
        this.handleMarkAsCompletedApiRes(responseJson as MarkCompletedError)
        break;
      case this.declineRequestApiCallId:
        this.handledeclineRequestApiResponse(responseJson as DeclineRespInterface);
        break;
      default:
        break;
    }
  };

  handledeclineRequestApiResponse = (responseJson: DeclineRespInterface) => {
    if(responseJson.message){
    if(this.fromPage === 'search'){
      const msg: Message = new Message(
        getName(MessageEnum.NavigationSearchMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    } else {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationDashboardMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
    }
  }

  handleMarkAsCompletedApiRes = (responseJson: MarkCompletedError) => {
    const isError = 'error' in responseJson;
    this.setState({
        isLoader: false,
        markCompletedApiError: isError ? responseJson?.error : "",
        markAsSucessfully: isError ? false : true,
      },() => {
        if (!isError) {
          this.getRequestDetail(Number(this.state.requestData?.id));
        }
        setTimeout(() => {
          this.closeCustomMessage();
        }, 5000);
      }
    );
  };
  

  closeCustomMessage = () => {
    this.setState({markAsSucessfully: false, markCompletedApiError: '', isLoader: false, isMarkCompleteModelOpen: false})
  }

  handleCreateChatRoomApiRes = (response: ChatChannel) => {
    if (response.data) {
      const { attributes, relationships } = response.data;
      this.setState({ chatId: attributes.id, chatName: "ChatChannel", currentAccountId: Number(relationships.accounts.data[0].id)}, 
      () => {
        this.getNewUnreadMsgCount()
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
    this.setState({ newReceivedMessage: message }, ()=>{
      this.getNewUnreadMsgCount();
    });
  };

  async componentWillUnmount() {
    this.webSocket?.close();
  }

  handleCancellactionChargeApiResponse = (responseJson: ApiResponse) => {
    if ('errors' in responseJson) {
      this.handleErrorMessage(responseJson)
    } else if ('cancellation_charges' in responseJson) {
      this.setState({
        CancellationCharge: responseJson,
        isCancelRequestModelOpen: true,
      });
    }
  }

  formatCancellactionNumber = (num: string) => {
    return parseFloat(num).toFixed(2);
  };

  handleErrorMessage = (errorJson: CancellactionError) => {
    if (errorJson && errorJson.errors) {
      this.setState({ isCancellactionErrorPopup: true, cancellationError: errorJson })
    }
  }

  onClickOfOk = {
    onPress: () => {
      this.setState({ isCancellactionErrorPopup: false, cancellationError: null })
    }
  }

  handleKycStatusResponse = (responseJson: KycStatusResponse) => {
    this.setState({ kycStatus: responseJson })
  }

  handleMeetingRes =async (res: MeetingType) => {
    if (res?.zoom_meetings?.notary_request_id) {
      this.setState({meetingData: res, meetingLinkData: res,zoomLinkJoin:res?.zoom_meetings?.meeting?.join_url });
      await setStorageData('meetingLink',res?.zoom_meetings?.meeting?.join_url )
    }
  };

  redirectPageToDocuSign = (response: DocuSignStarted, document_id: string) => {
    if (response.signing_urls) {
      this.setState({ isLoader: false }, () => {
        const messages: Message = new Message(getName(MessageEnum.NavigationDocuSignMessage));
        const selectedRequest = {
          requestId: this.state.requestData?.id,
          token: this.state.token,
          docusignUrl: response.signing_urls,
          document_id: document_id,
          access_token: response.access_token,
          envelope_id: response.envelope_id,
          docMessSign:response.docMessSign
        };
        messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
        messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(messages);
      })
    }
  }

  sortQuoteListData = (responseJson: QuoteResponse) => {
    responseJson.data.sort((first: QuoteData, second: QuoteData) => new Date(second.attributes.created_at).getTime() - new Date(first.attributes.created_at).getTime());
    let newSortedResponse: QuoteResponse = responseJson;
    this.setState({ quoteListData: newSortedResponse }, () => {
      if (this.state.requestData?.attributes.status.toLowerCase() === 'in progress') {
        this.callToCheckDocuSignStarted();
      }
    })
  }

  getDocuSignListAccordingToUser = (responseJson: DocumentSigningResponse) => {
    if (this.getUserType()) {
      let filteredData = responseJson.document_signing_status.filter(doc => doc.is_docusign_start === true);
      const filteredDocuments: DocumentSigningStatus[] = filteredData
      this.setState({ docuSignDetail: filteredDocuments })
    } else {
      this.setState({ docuSignDetail: responseJson.document_signing_status })
    }
  }

  callToCheckDocuSignStarted(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCallToCheckDocuSignStartedID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.docuSignStartApiEndpoint + `?notary_request_id=${this.state.requestData?.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getReceivedRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getQuoteList(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiQuoteListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.makeQuoteApiEndPoint + `/${this.state.requestData?.id}/` + 'list_quotes'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getReceivedRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }


  meetingApiCal(): boolean {
    const urlParams = 'notary_request_id=' + this.state.requestData?.id
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.meetingApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.meetingApiEndPoint + urlParams
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getReceivedRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }


  getQuoteStatusList(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiQuoteStatusListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getQuteStatusListApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getReceivedRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  componentDidMount = async () => {
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
        this.updateTabs()
      });
    }
  };

  updateTabs = () => {
    if (this.getFilterTabs().length > 0) {
      this.onClickOfTab('overview', 0);
    }
    if (this.state.requestData?.attributes.status.toLowerCase() === 'in progress') {
      this.callToCheckDocuSignStarted();
      this.getKycVerificationStatus()
    }
  }

  getToken = async () => {
    const tokenMsg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(tokenMsg);

    const loginemail = await getStorageData('email')
    this.setState({ emailid: loginemail })
  };

  getRequestDetail(requestId: number): boolean {
    // Customizable Area Start

    this.setState({ isLoader: true })
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDashboardItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userNotaryRequestApiEndPoint + `/${requestId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSentRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }


  renderStatusView = () => {
    if(this.state.requestData?.attributes.invite_request){
      switch (this.state.requestData?.attributes?.invited_request_status &&  this.state.requestData?.attributes?.invited_request_status.toLowerCase()) {
        case 'invite':
          return 'invitedStatusView';
        case 'rejected':
          return 'rejectedStatusView';
        default:
          return 'acceptedStatusView';
      }
    } else {
      switch (this.state.requestData?.attributes.status.toLowerCase()) {
        case 'completed':
          return 'completedStatusView';
        case 'draft':
          return 'draftStatusView';
        case 'pending':
          return 'pendingStatusView';
        case 'cancelled':
          return 'cancelledStatusView';
        default:
          return 'inprogressStatusView';
      }
    }
    
  };

  onClickMessageIconProps = {
    onPress: () => {
      this.setState({newReceivedMessage: ''}, () => {
        const messages: Message = new Message(getName(MessageEnum.NavigationChatMessage));
      
        const selectedRequest = {
          requestId: this.state.requestData?.id,
          requestDate: this.state.requestData?.attributes.date,
          token: this.state.token,
        };
        messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
        messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(messages);
      }) 
    }
  }

  isMessageIconVisiable = () => {
    if(this.state.kycStatus?.status === null || this.state.kycStatus?.status.toLowerCase() === 'pending'){
      return false
    } else {
      return true
    }
  }

  showMessageIconWithRed = () => {
    if((this.state.messageCount && this.state.messageCount?.count > 0) || (this.state.newReceivedMessage && this.state.messageCount?.count)){
      return true
    } else {
      return false
    }
  }

  onClickOfTab = (key: string, index: number) => {
    if ((this.state.kycStatus?.status === null || this.state.kycStatus?.status.toLowerCase() === 'pending') && (key === 'meeting' || key === 'signing')) {
      return
    } else {
      this.setState({ selectedTab: key })
      if (this.flatListRef.current) {
        this.flatListRef.current.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }

  onUpDownArrowOfSignatory = (index: number) => {
    if (this.state.selectedSignnatoryIndex === index) {
      this.setState({ isSignatoryOpen: !this.state.isSignatoryOpen })
    } else {
      this.setState({ isSignatoryOpen: true, selectedSignnatoryIndex: index })
    }
  }

  getArrowImgUpDown = (index: number) => {
    if (this.state.isSignatoryOpen && this.state.selectedSignnatoryIndex === index)
      return imgRequestUpArrow
    else {
      return imgRequestDownArrow
    }
  }

  isSignatoryNameVisible = (index: number) => {
    if (this.state.selectedSignnatoryIndex === index && this.state.isSignatoryOpen) {
      return true
    } else {
      return false
    }
  }

  btnCancelRequestProps = {
    onPress: () => {
      if (this.state.requestData?.attributes.status.toLowerCase() === 'pending') {
        this.setState({ isCancelRequestModelOpen: true })
      } else {
        this.getCancelCharge()
      }
    }
  }

  closeCancelRequestModel = () => {
    this.setState({ isCancelRequestModelOpen: false })
  }

  noToChanges = {
    onPress: () => {
      this.closeCancelRequestModel()
    }
  }

  yesProceedToChanges = {
    onPress: () => {
      this.setState({ isCancelRequestModelOpen: false }, () => {
        this.callApiToCancelRequest()
      })
    }
  }

  callApiToCancelRequest(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCancelRequestCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cancellationApiFirstEndPoint + this.state.requestData?.id + configJSON.cancelRequestApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.updateRequestTextApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getCancelCharge(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCancellationChargeCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cancellationApiFirstEndPoint + this.state.requestData?.id + configJSON.cancellationApiSecondEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSentRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getIsSignatoryObject = (data: FileDocument) => {
    const signatoryNames = data.recipients.filter(recipient => recipient.is_signatory)
      .map(recipient => recipient.name);

    return signatoryNames;
  };

  isCancelRequestBtnVisible = () => {
    if (this.state.userRoleType === 'end_user' && (this.checkCancelForInviteAccept() || this.checkForNormalReq())) {
      return true
    } else {
      return false
    }
  }

  checkForNormalReq = () => {
    if(!this.state.requestData?.attributes.invite_request && (this.state.requestData?.attributes.status.toLowerCase() === 'pending' || this.state.requestData?.attributes.status.toLowerCase() === 'in progress')){
      return true
    } else {
      return false
    }
  }

  checkCancelForInviteAccept = () => {
    if(this.state.requestData?.attributes.invite_request && this.state.requestData.attributes.invited_request_status?.toLowerCase() === 'accepted') {
      return true
    } else {
      return false
    }
  }

  showNoteForQuoteTabInvite = () => {
    if(this.state.requestData?.attributes.invite_request && this.state.requestData.attributes.invited_request_status?.toLowerCase() === 'invite') {
      return true
    } else {
      return false
    }
  }

  showNoteForQuoteTabInviteRejected = () => {
    if(this.state.requestData?.attributes.invite_request && this.state.requestData.attributes.invited_request_status?.toLowerCase() === 'rejected') {
      return true
    } else {
      return false
    }
  }

  renderStatusDetailView = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'completedStatusDetailView';
      case 'draft':
        return 'draftStatusDetailView';
      case 'pending':
        return 'pendingStatusDetailView';
      case 'cancelled':
        return 'cancelledStatusDetailView';
      default:
        return 'inprogressStatusDetailView';
    }
  };

  truncatedText = (text: string, charLength: number) => {
    if (text.length <= charLength) {
      return text;
    } else {
      const truncated = text.substring(0, charLength) + '...';
      return truncated;
    }
  };

  getSelectedFileName = (fileName: string) => {
    const parts = fileName.split('/');
    const filenameWithExtension = parts[parts.length - 1];
    return filenameWithExtension
  }

  isMakeQuoteBtnVisible = () => {
    let reqStatus = this.state.requestData?.attributes.status.toLowerCase()
    if (this.state.userRoleType === 'notary' && reqStatus === 'pending') {
      return true
    } else {
      return false
    }
  }

  btnMakeQuoteProps = {
    onPress: () => {
      const messages: Message = new Message(getName(MessageEnum.NavigationQuoteManagementMessage));
      const selectedRequest = {
        requestId: this.state.requestData?.id,
        actionType: this.selectedActionType,
        requestDate: this.state.requestData?.attributes.date,
        token: this.state.token,
        notarisation_method: this.state.requestData?.attributes?.notarisation_method?.notarisation_method
      };
      messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
  }

  btnDeclineProps = {
    onPress: () => {
      this.declineRequest();
    }
  }

  declineRequest = () => {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.declineRequestApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.declineRequestApiEndpoint + this.state.requestData?.id + "/notary_decline_request"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.declineRequestAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  onClickPreviewBtn = (item: QuoteData, number: number) => {
    this.setState({ isPreviewQuoteModel: true, previewQuoteDetail: item, quoteNumber: number })
  }

  closePreviewQuoteModel = () => {
    this.setState({ isAddtrackingDetailsModel: false })
  }

  closeAddTrackingModel = () => {
    this.setState({ isPreviewQuoteModel: false })
  }

  cancelPreviewModel = {
    onPress: () => {
      this.closePreviewQuoteModel()
    }
  }

  btnPayNowProps = {
    onPress: () => {
      this.setState({ isPreviewQuoteModel: false }, () => {
        const messages: Message = new Message(getName(MessageEnum.NavigationQuotePaymentMessage));
        const selectedRequest = {
          requestId: this.state.previewQuoteDetail?.attributes.notary_requests_id,
          actionType: this.selectedActionType,
          token: this.state.token,
          quoteID: this.state.previewQuoteDetail?.id,
          amount : this.getTotalFees()
        };
        messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
        messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(messages);
      })
    }
  }

  btnAddTrackingDetailsProps = {
    onPress: () => {
      if (this.isStringNullOrBlank(this.state.providername)) {
        this.setState({ isValidateFieldName: true })
        return false;
      }
      else if (this.isStringNullOrBlank(this.state.trackingnumber)) {
        this.setState({ isValidateFieldNumber: true })
        return false;
      }
      this.setState({ isValidateFieldName: false, isValidateFieldNumber: false })
      this.setState({ isAddtrackingDetailsModel: false })
      this.AddTrakingdataApi()
    }
  }

  getConverteDate = (date: string | undefined) => {
    if (date !== undefined) {
      const dateValue = new Date(date);
      const month = dateValue.getMonth();
      const year = dateValue.getFullYear();
      const dayDate = dateValue.getDate();
      return dayDate.toString().padStart(2, '0') + "/" + (month + 1).toString().padStart(2, '0') + "/" + year
    }
  }

  getConverteTime = (date: string | undefined) => {
    if (date !== undefined) {
      const dateValue = new Date(date);
      let hourSelect = dateValue.getHours();
      const minutesSelect = dateValue.getMinutes();
      const period = hourSelect >= 12 ? 'PM' : 'AM';

      hourSelect = hourSelect % 12 || 12;
      const formattedTime = `${hourSelect.toString().padStart(2, '0')}:${minutesSelect.toString().padStart(2, '0')} ${period}`;
      return formattedTime
    }
  }

  getMenuItemList = () => {
    if (this.state.userRoleType === 'end_user') {
      return this.endUserTabs;
    } else {
      return this.notaryUserTabs;
    }
  }

  getFilterTabs = () => {
    const status = this.state.requestData?.attributes?.status?.toLowerCase();
    const requestType = this.state.requestData?.attributes?.notarisation_method?.notarisation_method;

    if (status) {
      let filteredTabs = this.getMenuItemList().filter(tab => tab.action.includes(status));
      if (requestType?.includes('RIN')) {
        filteredTabs = filteredTabs.filter(tab => tab.key !== 'signing');
      }
      return filteredTabs;
    }
    return [];
  }

  isMakeQuoteBtnShow = () => {
    if (this.state.quoteListData && this.state.quoteListData?.data && this.state.quoteListData?.data[0]?.attributes?.quote_status === 'Submitted') {
      return false;
    } else if(this.state.requestData?.attributes.invite_request) {
      return false;
    }else {
      return true;
    }
  }

  showQuoteNumber = (key: string) => {
    if (key === 'quotes' && this.state.quoteListData?.data && this.state.quoteListData?.data.length > 0) {
      return true
    } else {
      return false
    }
  }

  showorderQuoteView = () => {
    if (this.state.quoteListData?.data && this.state.quoteListData?.data?.length > 0) {
      return true
    } else {
      return false
    }
  }

  isMeetingDataAvailable = () => {
    return this.state.meetingLinkData?.zoom_meetings?.notary_request_id ? true : false
  }

  isTrackingDetailAvailable = () => {
    if (this.state.TrackingDataData?.data && this.state.TrackingDataData?.data?.length > 0) {
      return true
    } else {
      return false
    }
  }

  isKYCDetailAvailable = () => {
    if (this.state.kycDetailData?.data && this.state.kycDetailData?.data?.length > 0) {
      return true
    } else {
      return false
    }
  }

  isDocuSignDetailAvailable = () => {
    if (this.state.docuSignDetail && this.state.docuSignDetail?.length > 0) {
      return true
    } else {
      return false
    }
  }

  getTotalFees = () => {
    if (this.state.previewQuoteDetail) {
      const previewDetail = this.state.previewQuoteDetail.attributes;
      const totalFees = Number(previewDetail.vat_fee ? previewDetail.vat_fee : 0) + Number(previewDetail.notary_fees) + Number(previewDetail.platform_fees)
      return totalFees
    }
  }

  getVatFees = () => {
    if (this.state.previewQuoteDetail) {
      const previewDetail = this.state.previewQuoteDetail.attributes;
      return Number(previewDetail.vat_fee ? previewDetail.vat_fee : 0)
    }
  }

  btnScheduleMeetingProps = {

  }

  btnNotifyMinsProps = {
    onPress: () => {
      this.setState({ isNotifyMins: !this.notifyMinsProps.isChecked });
      this.notifyMinsProps.isChecked = !this.notifyMinsProps.isChecked;
    },
  };

  notifyMinsProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ isNotifyMins: value });
      this.notifyMinsProps.isChecked = value;
    },
    isChecked: false,
  };

  btnJoinMeetingProps = {
    onPress: () => {
      this.setState({ isZoomMeetingModel: true })
    }
  }

  closeZoomMeetingPopup = () => {
    this.setState({ isZoomMeetingModel: false })
  }

  cancelMeetingPopup = {
    onPress: () => {
      this.closeZoomMeetingPopup()
    }
  }

  launchMeeting = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "ZoomMeeting");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), { proKey: "" });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
    this.setState({ isZoomMeetingModel: false });
  };

  onRescheduleClick = {

  }

  btnAddMoreTrackingProps = {
    onPress: () => {
      this.setState({ isAddtrackingDetailsModel: true, providername: "", trackingnumber: "", additionalnote: "", id: "", isValidateFieldName: false, isValidateFieldNumber: false })
    }
  }

  btnEditTrackingdataProps = {
    onPress: () => {
      this.setState({ isAddtrackingDetailsModel: true })
    }
  }
  showCancellactionChargeAmount = () => {
    if (this.state.CancellationCharge && this.state.requestData?.attributes?.status.toLowerCase() === 'in progress') {
      return true;
    } else {
      return false
    }
  }

  getUserType = () => {
    if (this.state.userRoleType === 'end_user') {
      return true;
    } else {
      return false
    }
  }

  getOpacityStyle = () => {
    if (this.state.opacityView) {
      return 'meetingViewOpacity';
    } else {
      return 'lessmeetingViewOpacity'
    }
  }

  onCanelButton = (quoteId: string) => {
    this.setState({ isWithdrawQuote: true, selectedQuoteId: quoteId })
  }

  onCancelWithdraw = () => {
    this.setState({ isWithdrawQuote: false, selectedQuoteId: '' })
  }

  withdrawQuoteNo = {
    onPress: () => {
      this.onCancelWithdraw();
    }
  }

  withdrawQuoteYesProps = {
    onPress: () => {
      this.withdrawQuoteYes();
    }
  }

  withdrawQuoteYes(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiWithdrawQuoteCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.acceptQuoteApiEndpoint + this.state.selectedQuoteId + configJSON.withdrawQuote
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  btnGoBackToDashboard = {
    onPress: () => {
      if(this.fromPage === 'search'){
        const msg: Message = new Message(
          getName(MessageEnum.NavigationSearchMessage)
        );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
      } else {
        const msg: Message = new Message(
          getName(MessageEnum.NavigationDashboardMessage)
        );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
      }
    }
  }

  callMakeQuoteApiWhenDataCall = {
    onPress: () => {
      this.callApiForMakeQuote()
    }
  }

  callApiForMakeQuote(): boolean {
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.requestApiContentType
    }
    const payload = {
      "quote": {
        "notary_requests_id": this.state.requestData?.id,
        "start_time": this.state.previewQuoteDetail?.attributes.start_time,
        "end_time": this.state.previewQuoteDetail?.attributes.end_time,
        "video_call_required": true,
        "fees": this.state.previewQuoteDetail?.attributes.fees,
        "platform_fee_inclusive": false,
        "message": this.state.previewQuoteDetail?.attributes.message
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.makeQuoteApiDupCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.makeQuoteApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createSendRequestApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  btnProceedProps = {
    onPress: () => {
      this.callProceedApi()
    }
  }

  callProceedApi(): boolean {
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.requestApiContentType
    }
    const httpBody = {
      "cancel_url": baseURL+"/StripeFailurePage",
      "success_url": baseURL+"/StripeSuccessPage"
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.proceedApiDupCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.proceedApiEndPoint}?quote_id&notary_request_id=${this.state.requestData?.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createSendRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  isQuoteStatusSubmitted = (detail: QuoteData) => {
    if (detail.attributes.quote_statuses_id === 1) {
      return true
    } else {
      return false
    }
  }

  getConvertedStartEndTimeFormatForView = (detail: QuoteData) => {
    const formattedStartAndEndTime = `${this.getConverteTime(detail?.attributes.start_time)} | ${this.getConverteTime(detail?.attributes.end_time)}`
    return formattedStartAndEndTime;
  }

  btnNotifyValueProps = {
    onPress: () => {
      this.setState({ isCheckNewTab: !this.notifyMinsValueProps.isChecked });
      this.notifyMinsValueProps.isChecked = !this.notifyMinsValueProps.isChecked;
    },
  };

  notifyMinsValueProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ isCheckNewTab: value });
      this.notifyMinsValueProps.isChecked = value;
    },
    isChecked: false,
  };

  btnNotifyDataProps = {
    onPress: () => {
      this.setState({ isCheckDataTab: !this.notifyMinsDataProps.isChecked });
      this.notifyMinsDataProps.isChecked = !this.notifyMinsDataProps.isChecked;
    },
  };

  notifyMinsDataProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ isCheckDataTab: value });
      this.notifyMinsDataProps.isChecked = value;
    },
    isChecked: false,
  };

  getUserTypeStyle = () => {
    if (this.state.userRoleType === 'end_user') {
      return 'endUserViewTab';
    } else {
      return 'notaryUserViewTab'
    }
  }

  onUpDownArrowOfDocuSign = (index: number) => {
    const updatedDocuSignOpenStates = { ...this.state.docuSignOpenStates };
    updatedDocuSignOpenStates[index] = !updatedDocuSignOpenStates[index];
    this.setState({ docuSignOpenStates: updatedDocuSignOpenStates });
  };

  getArrowImgInDocuUpDown = (index: number) => {
    return this.state.docuSignOpenStates[index] ? imgRequestUpArrow : imgRequestDownArrow;
  };

  isDocSignNameForNotartyAnsSigVisible = (index: number) => {
    if (this.state.docuSignOpenStates[index]) {
      return true
    } else {
      return false
    }
  }

  shouldShowEndUserButton(detail: DocumentSigningStatus) {
    return this.getUserType() && detail.signatory.some(signatory => !signatory.signed);
  }

  shouldShowNotaryUserButton(detail: DocumentSigningStatus) {
    return !this.getUserType() && !this.isAllSigned(detail);
  }

  isNotaryButtonDisabled(detail: DocumentSigningStatus) {
    return detail.signatory.some(signatory => !signatory.signed);
  }

  isAllSigned(detail: DocumentSigningStatus) {
    const allSignatoriesSigned = detail.signatory.every(signatory => signatory.signed);
    const allNotariesSigned = detail.notary.every(notary => notary.signed);
    return allSignatoriesSigned && allNotariesSigned;
  }

  checkMeetingEndDate =  () => {
    const dateString = this.state.meetingData?.zoom_meetings.end_time;
    if(dateString){
      const today = new Date();
      const givenDate = new Date(dateString);
      const isTodayGreater = today > givenDate;
      return isTodayGreater
    } else {
      return false
    }
  }

  isMarkAsCompleteBtnClickable = () => {
    if(this.isAllSignedForMarkComplete(this.state.docuSignDetail) && this.isMessageIconVisiable() && this.checkMeetingEndDate()) {
      return true
    } else {
      return false
    }
  }

  isAllSignedForMarkComplete = (docuSignDetails: DocumentSigningStatus[] | null) => {
    if (docuSignDetails) {
      return docuSignDetails.every(detail => {
        const allSignatoriesSigned = detail.signatory.every(signatory => signatory.signed);
        const allNotariesSigned = detail.notary.every(notary => notary.signed);
        return allSignatoriesSigned && allNotariesSigned;
      });
    }
    return false;
  };

  isShowMarkCompleted = () => {
    if (this.state.selectedTab === 'signing' && this.state.docuSignDetail && this.state.docuSignDetail?.length > 0) {
      return true
    } else {
      return false
    }
  }

  isShowMarkCompletedForNotary = () => {
    if (this.state.requestData?.attributes.status.toLowerCase() === 'in progress' && !this.getUserType()) {
      return true
    } else {
      return false
    }
  }

  getMarkCompleteModelOpen = {
    onPress: () => {
      if(this.isMarkAsCompleteBtnClickable()) {
        this.setState({isMarkCompleteModelOpen: true})
      }
    }
  }

  closeMarkCompletedModel = () =>{
    this.setState({isMarkCompleteModelOpen: false})
  }

  callMarkAsComplete = () =>{
    this.setState({isMarkCompleteModelOpen: false}, () => {
      this.callApiForMarkAsComplete()
    })
  }

  callApiForMarkAsComplete = () => {
    this.setState({ isLoader: true })
    const headers = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token,
      Authorization: `Bearer ${this.state.token}`
    };

    const getAllRequestMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getMarkCompletedCallId = getAllRequestMsg.messageId;

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.markAsCompleteApiEndpoint1 + this.state.requestData?.id + configJSON.markAsCompleteApiEndpoint2
    )

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.patchMethodType
    );
    runEngine.sendMessage(getAllRequestMsg.id, getAllRequestMsg);
  }

  getBackColorForSigned = (signed: boolean) => {
    if (signed) {
      return 'backGColorForSigned'
    } else {
      return 'backGColorStatus'
    }
  }

  getTxtColorForSigned = (signed: boolean) => {
    if (signed) {
      return 'signedTxtColor'
    } else {
      return 'statusTxtColor'
    }
  }

  getSignedStatus = (signed: boolean) => {
    if (signed) {
      return 'SIGNED'
    } else {
      return 'PENDING'
    }
  }

  getBtnColorAccordingToEnable = (detail: DocumentSigningStatus) => {
    if (this.isNotaryButtonDisabled(detail)) {
      return 'btnDisableColor'
    } else {
      return 'btnBackGColor'
    }
  }

  callapiForStart = {
    onPress: () => {
      if (this.state.selectedDocument) {
        this.callApiForStartDocuSign(this.state.selectedDocument);
      }
    }
  }

  startDocusignFromNotary = (detail: DocumentSigningStatus) => {
    this.setState({ selectedDocument: detail, isLoader: true }, () => {
      this.callApiForStartDocuSign(detail);
    })
  }

  callApiForStartDocuSign(detail: DocumentSigningStatus): boolean {
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.requestApiContentType
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.startDocumentId = detail.document_id
    const payload = {
      document_id: detail.document_id,
      "base_url": baseURL+"/StripeSuccessPage"
    }
    this.apiCallStartDocuSignID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.docusignStartApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createSendRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getBtnColorToEnable = () => {
    if (this.state.userRoleType === 'end_user') {
      return 'btnDisableColorView'
    } else {
      return 'btnBackGColorView'
    }
  }

  truncatFileName = (fileName: string) => {
    if (fileName.length > 20) {
      const lastTenChars = fileName.slice(-20);
      const result = `...${lastTenChars}`;
      return result
    } else {
      return fileName
    }
  }

  tabViewStyle = (key: string) => {
    if (this.state.selectedTab === key) {
      return 'tabBorder'
    } else {
      return 'unselectedTabBorder'
    }
  }

  tabViewStyleTxt = (key: string) => {
    if (this.state.selectedTab === key) {
      return 'selectedTabsText'
    } else {
      return 'unselectedTabsText'
    }
  }

  getTrakingHistory = () => {
    this.setState({ isLoader: true })
    const headers = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token,
    };

    const getAllRequestMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTrackingDetailsCallId = getAllRequestMsg.messageId;

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTrackingDetailListEndpoint + this.state.requestData?.id
    )

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getReceivedRequestApiMethod
    );
    runEngine.sendMessage(getAllRequestMsg.id, getAllRequestMsg);
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  txtInputProviderNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ providername: text });
    }
  };

  txtInputTrackinNumberPrpos = {
    onChangeText: (text: string) => {
      this.setState({ trackingnumber: text });
    }
  };

  onChangeAdditionalNotes = (text: string) => {
    this.setState({ additionalnote: text });
  };

  trackingdetailsedit = (item: any) => {
    this.setState({
      isAddtrackingDetailsModel: true,
      providername: item.attributes?.shipment_provider_name,
      trackingnumber: item.attributes?.tracking_number,
      additionalnote: item.attributes?.additional_notes,
      id: item.id
    })
    this.AddTrakingdataApi()
  };


  AddTrakingdataApi = () => {
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.requestApiContentType
    }
    const payload = {
      "tracking_detail": {
        "notary_requests_id": this.state.requestData?.id,
        "shipment_provider_name": this.state.providername,
        "tracking_number": this.state.trackingnumber,
        "additional_notes": this.state.additionalnote,
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.AddTrackingdataCallId = requestMessage.messageId;

    if (this.state.id != "") {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.addTrackingDetailsEndpoint + "/" + this.state.id
      );
    }
    else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.addTrackingDetailsEndpoint
      );
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    if (this.state.id != "") {
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.updateRequestApiMethod
      );
    }
    else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.createSendRequestApiMethod
      );
    }

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  tabViewStyleCheck = (key: string) => {
    if (this.state.selectedTab === key) {
      return 'tabBorderCheck'
    } else {
      return 'unselectedTabBorderCHeck'
    }
  }

  tabViewStyleTxtCheck = (key: string) => {
    if (this.state.selectedTab === key) {
      return 'selectedTabsTextCheck'
    } else {
      return 'unselectedTabsTextCheck'
    }
  }

  getKycVerificationStatus = () => {
    const headers = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token,
    };

    const getAllRequestMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getKycVerificationStatusCallId = getAllRequestMsg.messageId;

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.kycVerificationStatusApiEndpoint + this.state.requestData?.id
    )

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getReceivedRequestApiMethod
    );
    runEngine.sendMessage(getAllRequestMsg.id, getAllRequestMsg);
  };


  renderStatusText = () => {
    if(this.state.requestData?.attributes.invite_request){
      const inviteStatus = this.state.requestData?.attributes?.invited_request_status;
      switch (inviteStatus && inviteStatus.toLowerCase()) {
        case 'rejected':
          return 'rejectedStatusTxt';
        case 'invite':
          return 'invitedStatusTxt';
        default:
          return 'acceptedStatusTxt';
      }
    } else {
      const statusRequest = this.state.requestData?.attributes.status.toLowerCase();
        switch (statusRequest) {
          case 'cancelled':
            return 'cancelledStatusTxt';
          case 'pending':
            return 'pendingStatusTxt';
          case 'completed':
            return 'completedStatusTxt';
          case 'draft':
            return 'draftStatusTxt';
          default:
            return 'inprogressStatusTxt';
      }
    }
  };

  // Customizable Area End
}  