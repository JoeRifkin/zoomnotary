import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { NativeSyntheticEvent, NativeScrollEvent, Platform} from 'react-native';
import { getStorageData } from "../../../framework/src/Utilities";
import {checkGrayImg, notificationRedImg, notificationImg, viewImg, cancelImg, editImg, MLinkImg, messageImg, greenDotImg, redDotImg, orangeDotImg, deleteImg } from "./assets";
const menuItems = [
  { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress","draft"] },
  { icon: editImg, text: 'Edit', key: 'edit', action: ['pending',"draft"] },
  { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
  { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] },
  { icon: cancelImg, text: 'Cancel', key: 'cancel', action: ['pending', "in progress"] },
  { icon: deleteImg, text: 'delete', key: 'cancel', action: ["draft"]}
];
const menuItemsInvite = [
  { icon: viewImg, text: 'View', key: 'view', action: ["invite","rejected"] },
  { icon: checkGrayImg, text: 'Accept', key: 'Accept', action: ["invite",] },
  { icon: cancelImg, text: 'Reject', key: 'Reject', action:['invite']  },
];

const menuItemsInviteForNotary = [
  { icon: viewImg, text: 'View', key: 'view', action: ["invite","rejected", "accepted"] }
];

const menuItemsForNotary = [
  { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress"] },
  { icon: editImg, text: "Submit Quote", key: 'submit', action: ['pending'] },
  { icon: cancelImg, text: 'Withdraw Quote', key: 'withdraw', action: ['pending'] },
  { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
  { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] }
];

export interface ProfileStep {
  name: string;
  screen: number;
}

interface ProfileSteps {
  is_phone_number: ProfileStep;
  is_address: ProfileStep;
  is_notary_service: ProfileStep;
  is_vat_sales_tax: ProfileStep;
  is_payment_details: ProfileStep;
  is_qualified_signature: ProfileStep;
}

interface CompleteProfileRes {
  data: {
    is_phone_number: boolean;
    is_address: boolean;
    is_notary_service: boolean;
  }
}
const PROFILE_STEPS: ProfileSteps = {
  is_phone_number: {
    name: "Mobile Number",
    screen: MessageEnum.NavigationBasicUserProfileMessage,
  },
  is_address: {
    name: "Complete Address",
    screen: MessageEnum.NavigationBasicUserProfileMessage,
  },
  is_notary_service: {
    name: "Notary Services",
    screen: MessageEnum.NavigationNotaryServicesMessage,
  },
  is_vat_sales_tax: {
    name: "Add VAT (Sales Tax)",
    screen: MessageEnum.NavigationVatSalesTaxMessage,
  },
  is_payment_details: {
    name: "Payment Detail",
    screen: MessageEnum.NavigationPaymentsMessage,
  },
  is_qualified_signature: {
    name: "Qualified Signature",
    screen: MessageEnum.NavigationSettingsMessage,
  },
};

export interface Notification {
  id: string;
  type: string;
  attributes: Attributes;
}

export interface Attributes {
  id: number;
  created_by: string | null;
  title: string;
  headings: string;
  contents: string;
  app_url: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  account: Account;
}

export interface Account {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_phone_number: string;
  country_code: number;
  phone_number: number;
  email: string;
  activated: boolean;
  device_id: string | null;
  unique_auth_id: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  user_name: string | null;
  platform: string | null;
  user_type: string;
  app_language_id: string | null;
  last_visit_at: string | null;
  is_blacklisted: boolean;
  suspend_until: string | null;
  status: string;
  role_id: number;
  stripe_id: string;
  stripe_subscription_id: string | null;
  stripe_subscription_date: string | null;
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  age: number | null;
  country: string;
  address: string;
  contact_name: string;
  company_name: string | null;
  google_calendar_credentials: string | null;
  password_history: string[];
  is_otp_verify: boolean;
  city: string;
  post_code: string;
  activation_time: string | null;
  address_line_2: string;
  last_activation_time: string | null;
  rating: number;
  is_online: boolean;
  session_id: string;
  connected_account_id: string | null;
  deletion_time: string | null;
  google_calendar_token: string | null;
  outlook_calendar_token: string | null;
  google_calendar_sync: boolean;
  outlook_calendar_sync: boolean;
  is_deleted: boolean;
  additional_information: string | null;
}

interface ProfileAttributes {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_phone_number: string;
  city: string | null;
  post_code: string | null;
  country_code: string | null;
  phone_number: string | null;
  email: string;
  activated: boolean;
  user_type: string;
  user_name: string | null;
  platform: string | null;
  suspend_until: string | null;
  status: string;
  role_id: number;
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  age: number | null;
  country: string | null;
  address: string | null;
  address_line_2: string | null;
  contact_name: string;
  company_name: string | null;
  photo: ProfilePhoto;
}
interface FilterOption {
  title: string;
  key: string;
  img: any;
}

interface ProfilePhoto {
  url: string | null;
}

interface NotaryRequest {
  id: string;
  type: string;
  attributes: {
    status: string;
    notary_id: number;
    notary_service_type: number;
    priority: string;
    notarisation_method_id: number;
    date: string;
    invited_request_status: string | null;
    is_deleted: boolean;
    invite_request: boolean |null;
    invite_number: number | null;
    notarisation_method: NotarisationMethod;
    notary_service_name: string;
    quote_statuses_id: number | null;
  };
}

interface NotarisationMethod {
  id: number;
  notarisation_method: string;
  created_at: string;
  updated_at: string;
}

interface NotraryRequestDetail {
  data: NotaryRequest[]
}

interface EndUserNotaryRequest {
  end_user_notary_requests: NotraryRequestDetail
  invite_request:NotraryRequestDetail
}

interface NotaryUserNotaryRequest {
  new_notary_requests: NotraryRequestDetail,
  notary_ongoing_requests: NotraryRequestDetail,
  invite_request: NotraryRequestDetail
}

type ApiResponse = CancellactionError | CancellationPolicy |EndUserNotaryRequest | NotaryUserNotaryRequest;


interface ServiceAttributes {
  id: number;
  service_icon: string | null;
  service_name: string;
  service_description: string;
  is_selected: boolean;
}

// Define the interface for the service
interface Service {
  id: string;
  type: string;
  attributes: ServiceAttributes;
}

interface ServiceDetail {
  data: Service[]
}

interface BottomMenu {
  end_user: MenuItem[];
  notary: MenuItem[];
}

interface MenuItem {
  id: number;
  icon: number;
  inActiveIcon: number;
  text: string;
  key: number
}

interface CancellationPolicy {
  cancellation_charges: number;
}

interface NotaryResponse {
  notary_id: number;
  message: string;
}

interface ServiceType {
  value: string;
  label: string;
}
interface Day {
  dateString: string;
  day: number;
  month: number;
  year: number;
}

interface CancellactionError {
  errors:string
}

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
  UserProfileDetail: ProfileAttributes | null;
  searchQuery: string;
  pageNo: number;
  isScrollAtBottom: boolean;
  requestListData: NotaryRequest[]
  requestListLength: number;
  requestDate: string;
  servicesList: ServiceType[];
  isModelVisible: boolean;
  selectedService: number | null;
  notaryRequestId: string;
  selectedRequestStatus: string;
  isCancelRequestModelOpen: boolean;
  isLoader: boolean;
  
  userType: keyof BottomMenu;
  CancellationCharge: CancellationPolicy | null;
  cancelRequestRes: NotaryResponse | null;
  isFilterPageOpen: boolean;
  selectedPriorityFilter: FilterOption | null;
  selectedRequestStatusFilter: FilterOption | null;
  isCalendarForDateSelect: boolean;
  selectedDateRange: string | undefined;
  selectedServiceType: ServiceType | null;
  isServiceDropdownOpen: boolean;
  selectedDateType: string;
  startDate: string | null;
  endDate: string | null;
  comingFromType: string;
  cancellationError: CancellactionError | null;
  isCancellactionErrorPopup: boolean;
  isAnyNotificationUnread: boolean;
  completeProfileList: ProfileStep[];
  inviteRequestData:NotaryRequest[]
  onViewReject:boolean;
  requestId:string;
  inviteDataTypes:string;
  isRequestSelected: boolean;
  isInviteSelected: boolean;
  selectedRequestTypeData: NotaryRequest[];
  selectedRequestTypeDataForNotary: NotaryRequest[];
  selectedTab: string;
  isSucessMsgModel: boolean
  newRequestData: NotaryRequest[];
  outgoingRequestData: NotaryRequest[];
  newRequestLength: number;
  onGoingRequestLength:number;
  inviteRequestLength: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SearchController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  searchApiCallId: any;
  apiRequestListCallId: string = '';
  apiNotaryServiceCallId: string = "";
  apiCancellationChargeCallId: string = "";
  apiCancelRequestCallId: string = "";
  getNotificationDataCallId: string = "";
  apiCompleteProfileCallId: string = "";
  apiRejetRequestCallId: string="";


  PriorityFilterType = [
    { title: 'Standard', key: 'Standard', img: greenDotImg},
    { title: 'Priority', key: 'Priority', img: orangeDotImg },
    { title: 'High Priority', key: 'Super Priority', img: redDotImg }
  ]
  requestStatusType = [
      { title: 'Pending', key: 'PENDING', img: '' },
      { title: 'In Progress', key: 'IN PROGRESS', img: '' },
      { title: 'Completed', key: 'COMPLETED', img: '' },
      { title: 'Cancelled', key: 'CANCELLED' , img: ''}
  ]
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      UserProfileDetail: null,
      searchQuery: '',
      pageNo: 1,
      isScrollAtBottom: false,
      requestListData: [],
      requestListLength: 0,
      requestDate: '',
      servicesList: [],
      isModelVisible: false,
      selectedService: null,
      notaryRequestId: '',
      selectedRequestStatus: '',
      isCancelRequestModelOpen: false,
      isLoader: false,
      
      userType: 'end_user',
      CancellationCharge: null,
      cancelRequestRes: null,
      isFilterPageOpen: false,
      selectedPriorityFilter: null,
      selectedRequestStatusFilter:  null,
      isCalendarForDateSelect: false,
      selectedDateRange: '',
      selectedServiceType: null,
      isServiceDropdownOpen: false,
      selectedDateType: '',
      startDate: '',
      endDate: '',
      comingFromType: '',
      isCancellactionErrorPopup: false,
      cancellationError: null,
      isAnyNotificationUnread: false,
      completeProfileList: [],
      inviteRequestData:[],
      onViewReject:false,
      requestId:"",
      inviteDataTypes:'',
      isInviteSelected: false,
      isRequestSelected: true,
      selectedRequestTypeData: [],
      selectedRequestTypeDataForNotary: [],
      selectedTab: 'New Requests',
      isSucessMsgModel: false,
      newRequestData: [],
      outgoingRequestData: [],
      newRequestLength: 0,
      onGoingRequestLength:0,
      inviteRequestLength: 0,
      // Customizable Area End
    };
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.getNotaryServieData();
    this.props.navigation.addListener("willFocus", () => {
      this.callRequestListDataApi()
    });
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    this.storeMDataValue(message);
    this.storeMyNewInvite(message)
    this.handleMessage(message);
    // Customizable Area End
  }

  // Customizable Area Start

  
  callRequestListDataApi = () => {
    this.setState({pageNo: 1, outgoingRequestData: [], selectedTab: 'New Requests', isInviteSelected: false, isRequestSelected: true, inviteRequestData: [], requestListData: [], requestListLength: 0, 
      newRequestData: [],
      onGoingRequestLength: 0,
      inviteRequestLength: 0,
      newRequestLength: 0,
      selectedRequestTypeDataForNotary: [],
      isLoader: true}, () => {
      this.getRequestListData(`?page=${this.state.pageNo}&per_page=10`)
    })
  }
  
  handleSessionResponse = async (message: Message) => {
    let token = message.getData(getName(MessageEnum.SessionResponseToken));
    runEngine.debugLog("TOKEN", token);
    let userRole = null;
    const userDetail = await getStorageData('userProfileData');
    const userData = userDetail ? JSON.parse(userDetail) : {};
    const requestDateLabel = userData.role_id === 1 ? 'Request Date' : 'Date';
    const userDataInDetail = message.getData(getName(MessageEnum.SessionResponseData));
    try {
      userRole = JSON.parse(userDataInDetail);
  } catch (error) {
      console.error('Invalid JSON:', userDataInDetail);
  }    this.setState(
      { 
        isLoader: true, 
        userType: userRole?.meta?.role, 
        requestDate: requestDateLabel, 
        token: token, 
        UserProfileDetail: userData 
      },
      () => {
        this.getNotificationList();
        this.getCompleteProfileApi();
        this.getRequestListData(`?page=${this.state.pageNo}&per_page=10`);
      }
    );
  };

  handleRestApiResponse = (message: Message) => {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    const errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

    runEngine.debugLog("API Message Recived", message);
    this.handleApiResponse(responseJson, apiRequestCallId, errorResponse);
  };

  handleMessage = async (message: Message) => {
    const sessionResponseMessageId = getName(MessageEnum.SessionResponseMessage);
    const restAPIResponseMessageId = getName(MessageEnum.RestAPIResponceMessage);

    if (message.id === sessionResponseMessageId) {
      await this.handleSessionResponse(message);
      return;
    }
    if (message.id === restAPIResponseMessageId) this.handleRestApiResponse(message);
  };


  handleApiResponse(responseJson: any, apiRequestCallId: string, errorReponse: any) {
    if (!responseJson) {
      this.handleErrorResponse(apiRequestCallId, errorReponse);
      return;
    }
    switch (apiRequestCallId) {
      case this.apiRequestListCallId:
        this.manageRequestListData(responseJson);
        break;
  
      case this.apiNotaryServiceCallId:
        this.handleNotaryServiceResponse(responseJson);
        break;
  
      case this.apiCancellationChargeCallId:
        this.showModelOfCancelForInprogress(responseJson);
        break;
  
      case this.apiCancelRequestCallId:
        this.handleCancelRequestResponse(responseJson);
        break;
      case this.getNotificationDataCallId:
        this.handleNotifiactionResponse(responseJson.data)
        break;
      case this.apiCompleteProfileCallId:
          this.getCompleteProfileApiRes(responseJson)
          break;
     case this.apiRejetRequestCallId:
          this.getRejectReponse(responseJson)
          break;
      default:
        break;
    }
  }

  openNotificationProps = {
    onPress: () => {
      const messages: Message = new Message(
        getName(MessageEnum.NavigationNotificationMessage)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
  }

  handleNotifiactionResponse = (response: Notification[]) => {
    const is_readValue = response.some(
      (notification: Notification) => notification.attributes.is_read === false
    );
    this.setState({isAnyNotificationUnread: is_readValue})
  }

  getNotificationImage = () => {
    if(this.state.isAnyNotificationUnread){
      return notificationRedImg;
    } else {
      return notificationImg
    }
  }

  getNotificationList = () => {
    this.getNotifications()
  }

  getNotifications() {
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getNotificationDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPoint}${configJSON.pageNoAndCount}`
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.dashboarContentType,
        token: this.state.token ? this.state.token : "",
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }
  
  handleNotaryServiceResponse(responseJson: ServiceDetail) {
    const extractedData: {value: string, label: string}[] = responseJson.data.map((item: Service) => ({
      label: item.attributes.service_name || '',
      value: item.id,
    }));
  
    this.setState({ servicesList: extractedData });
  }
  
  handleCancelRequestResponse(responseJson: NotaryResponse) {
    this.setState(
      {
        cancelRequestRes: responseJson,
        requestListData: [],
        requestListLength: 0,
        isLoader: true,
        pageNo: 1,
        newRequestData: [],
        outgoingRequestData: [],
        inviteRequestData: [],
        onGoingRequestLength: 0,
        inviteRequestLength: 0,
        newRequestLength: 0
      },
      () => {
        this.getRequestListData(`?page=${this.state.pageNo}&per_page=10`);
      }
    );
  }
  
  handleErrorResponse(apiRequestCallId: string, errorReponse: any) {
    if (errorReponse && apiRequestCallId === this.apiRequestListCallId) {
      this.setState({ isLoader: false, pageNo: 1 });
    }
  }
  storeMyNewInvite = (message: Message) => {

       if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
        const myData = message.getData(
          getName(MessageEnum.SessionResponseData)
        );
        
        if (myData) {
          this.setState({ inviteDataTypes: myData.resMessage})
        }
      }
    }
  storeMDataValue = (message: Message) => {
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const myData = message.getData(
        getName(MessageEnum.CustomDataMessage)
      );
      
      if (myData) {
        this.setState({ comingFromType: myData.type})
      }
    }
    
  }

  getCompleteProfileApiRes = (res: CompleteProfileRes) => {
    const newCompleteProfileList = Object.keys(res.data)
      .filter(key => !res.data[key as keyof typeof res.data])
      .map(key => PROFILE_STEPS[key as keyof typeof PROFILE_STEPS]);
  
    this.setState({completeProfileList: newCompleteProfileList});
  };

  getRejectReponse = (res: any) => {
    if (res && res.message) {
      this.callRequestListDataApi()
      this.setState({ isSucessMsgModel: true, isRequestSelected: true, isInviteSelected: false })
      setTimeout(() => {
        this.closeSucessMsgModel()
      }, 3000);
    }
  };

  closeSucessMsgModel = () => {
    this.setState({ isSucessMsgModel: false })
  }

  getCompleteProfileApi(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCompleteProfileCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.completeProfileEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  

  manageRequestListData = (responseJson: ApiResponse) => {
    if (!responseJson) return;
  
    this.getNotaryServieData();
    const { UserProfileDetail, selectedTab, isInviteSelected } = this.state;
    const isEndUser = UserProfileDetail?.role_id === 1;
  
    const { requestOfInvite, requestOfNewRequest, requestOfOngoing } = this.getRequestLists(responseJson, isEndUser);
  
    const newPageData = this.getNewPageData(isEndUser, selectedTab, isInviteSelected, requestOfInvite, requestOfNewRequest, requestOfOngoing);
  
    this.setState({
      isLoader: false,
      isScrollAtBottom: false,
      selectedService: null,
      requestListData: [...requestOfNewRequest, ...requestOfInvite, ...requestOfOngoing],
      inviteRequestData: requestOfInvite,
      newRequestData: requestOfNewRequest,
      outgoingRequestData: requestOfOngoing,
      selectedRequestTypeData: newPageData,
      selectedRequestTypeDataForNotary: newPageData,
      requestListLength: requestOfNewRequest.length,
      inviteRequestLength: requestOfInvite.length,
      onGoingRequestLength: requestOfOngoing.length,
    });
  };
  
  getRequestLists = (responseJson: ApiResponse, isEndUser: boolean) => {
    if (isEndUser) {
      const data = responseJson as EndUserNotaryRequest;
      return {
        requestOfInvite: [...(this.state.inviteRequestData ?? []), ...(data?.invite_request?.data ?? [])],
        requestOfNewRequest: [...(this.state.newRequestData ?? []), ...(data?.end_user_notary_requests?.data ?? [])],
        requestOfOngoing: [],
      };
    } else {
      const data = responseJson as NotaryUserNotaryRequest;
      return {
        requestOfInvite: [...(this.state.inviteRequestData ?? []), ...(data?.invite_request?.data ?? [])],
        requestOfNewRequest: [...(this.state.newRequestData ?? []), ...(data?.new_notary_requests?.data ?? [])],
        requestOfOngoing: [...(this.state.outgoingRequestData ?? []), ...(data?.notary_ongoing_requests?.data ?? [])],
      };
    }
  };
  
  getNewPageData = (
    isEndUser: boolean,
    selectedTab: string,
    isInviteSelected: boolean,
    requestOfInvite: NotaryRequest[],
    requestOfNewRequest: NotaryRequest[],
    requestOfOngoing: NotaryRequest[]
  ) => {
    if (isEndUser) {
      return isInviteSelected ? requestOfInvite : requestOfNewRequest;
    }
  
    switch (selectedTab) {
      case "New Requests":
        return requestOfNewRequest;
      case "Invites":
        return requestOfInvite;
      default:
        return requestOfOngoing;
    }
  };
  
  getNotaryRequests = (responseJson: ApiResponse, isEndUser: boolean) => {
    if (isEndUser) {
      const data = responseJson as EndUserNotaryRequest
      return data?.end_user_notary_requests?.data ?? [];
    }
    const { comingFromType } = this.state;
    switch (comingFromType) {
      case 'new':
        const data = responseJson as NotaryUserNotaryRequest
        return this.state.completeProfileList.length > 0 ? [] : data.new_notary_requests?.data ?? [];
  
      case 'ongoing':
        const data1 = responseJson as NotaryUserNotaryRequest
        return this.state.completeProfileList.length > 0 ? [] : data1.notary_ongoing_requests?.data ?? [];
  
      default:
        return this.state.completeProfileList.length > 0 ? [] : this.combineAndSortRequests(responseJson);
    }
  };
  
  combineAndSortRequests = (responseJson: ApiResponse) => {
    const data = responseJson as NotaryUserNotaryRequest
    const combinedData = [
      ...(data.notary_ongoing_requests?.data ?? []),
      ...(data.new_notary_requests?.data ?? []),
    ];
    return combinedData.sort((first: NotaryRequest, second: NotaryRequest) => Number(second.id) - Number(first.id));
  };
  

  showModelOfCancelForInprogress = (responseJson: ApiResponse) => {
    if ('errors' in responseJson) {
      this.setState({isModelVisible: false }, async() => {
        setTimeout( () => {
          this.handleErrorMessage(responseJson)
        }, Platform.OS === "ios" ? 1000 : 0); 
      }) 
    } else if ('cancellation_charges' in responseJson) {
      this.setState({isModelVisible: false }, async() => {
        setTimeout( () => {
          this.setState({
            CancellationCharge: responseJson,
            isCancelRequestModelOpen: true,
          });
        }, Platform.OS === "ios" ? 1000 : 0); 
      })
    }
  }

  formatCancellactionNumber = (num: string) => {
    return parseFloat(num).toFixed(2);
  };

  handleErrorMessage = (errorJson: CancellactionError)=> {
    if (errorJson && errorJson.errors) {
        this.setState({isCancellactionErrorPopup: true, cancellationError: errorJson})
    }
  }

  onClickOfOk = {
    onPress: () => {
      this.setState({isCancellactionErrorPopup: false, cancellationError: null})
    }
  }
  
  handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isAtBottom && !this.state.isScrollAtBottom) {
      this.setState({ isScrollAtBottom: true });
      this.onScrollToBottom();
    }
  };

  constructParamData = () => {
    const {
      selectedServiceType,
      selectedDateType,
      startDate,
      endDate,
      selectedRequestStatusFilter,
      selectedPriorityFilter,
    } = this.state;
  
    const paramData = `?page=${this.state.pageNo}&per_page=10` +
      `&order_id=` +
      `&service_type=${selectedServiceType?.value || ''}` +
      `&request_date_start=${selectedDateType === 'request' ? startDate : ''}` +
      `&request_date_end=${selectedDateType === 'request' ? endDate : ''}` +
      `&completion_date_start=${selectedDateType === 'completion' ? startDate : ''}` +
      `&completion_date_end=${selectedDateType === 'completion' ? endDate : ''}` +
      `&request_status=${selectedRequestStatusFilter?.key || ''}` +
      `&urgency_level=${selectedPriorityFilter?.key || ''}`;
    
    return paramData;
  }
  
  onScrollToBottom = () => {
    if (this.state.requestListLength >= 10 || this.state.inviteRequestLength >= 10 || this.state.onGoingRequestLength >= 10) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        const paramData = this.constructParamData();
        this.getRequestListData(paramData);
      });
    }
  };

  getRequestListData(params: string): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiRequestListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.RequestListApiEndPoint + params
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }
  onClickOfAvatatIcon = {
    onPress: () => {
      const messages: Message = new Message(
        getName(MessageEnum.NavigationMenuMessage)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
  }

  constructParamDataForSearch = () => {
    const {
      selectedServiceType,
      selectedDateType,
      startDate,
      endDate,
      selectedRequestStatusFilter,
      selectedPriorityFilter,
      pageNo,
    } = this.state;

    const paramData = `?page=${pageNo}&per_page=10` +
      `&order_id=` +
      `&service_type=${selectedServiceType?.value || ''}` +
      `&request_date_start=${selectedDateType === 'request' ? startDate : ''}` +
      `&request_date_end=${selectedDateType === 'request' ? endDate : ''}` +
      `&completion_date_start=${selectedDateType === 'completion' ? startDate : ''}` +
      `&completion_date_end=${selectedDateType === 'completion' ? endDate : ''}` +
      `&request_status=${selectedRequestStatusFilter?.key || ''}` +
      `&urgency_level=${selectedPriorityFilter?.key || ''}`;

    return paramData;
  };

  resetStateAndFetchData = () => {
    this.setState(
      { pageNo: 1, isLoader: true, requestListData: [], requestListLength: 0, newRequestData: [],
        outgoingRequestData: [],
        inviteRequestData: [],
        onGoingRequestLength: 0,
        inviteRequestLength: 0,
        newRequestLength: 0
       },
      () => {
        const paramData = this.constructParamDataForSearch();
        this.getRequestListData(paramData);
      }
    );
  };

  onChange = (text: string) => {
    this.setState({ searchQuery: text }, () => {
      if (this.state.searchQuery === '') {
        this.resetStateAndFetchData();
      }
    });
  };


  onSearch = {
    onPress: () => {
      this.setState({ pageNo: 1, isLoader: true, requestListData: [], requestListLength: 0, newRequestData: [],
        outgoingRequestData: [],
        inviteRequestData: [],
        onGoingRequestLength: 0,
        inviteRequestLength: 0,
        newRequestLength: 0 }, () => {
        const parmData = `?page=${this.state.pageNo}&per_page=10&order_id=${this.state.searchQuery}&service_type=${this.state.selectedServiceType ? this.state.selectedServiceType?.value : ''}&request_date_start=${this.state.selectedDateType === 'request' ? this.state.startDate : ''}&request_date_end=${this.state.selectedDateType === 'request' ? this.state.endDate : ''}&completion_date_start=${this.state.selectedDateType === 'completion' ? this.state.startDate : ''}&completion_date_end=${this.state.selectedDateType === 'completion' ? this.state.endDate : ''}&request_status=${this.state.selectedRequestStatusFilter ? this.state.selectedRequestStatusFilter?.key: ''}&urgency_level=${this.state.selectedPriorityFilter ?this.state.selectedPriorityFilter?.key: ''}`
        this.getRequestListData(parmData)
      });
    }
  }

  getNotaryServiceValue = (text: number | null, charLength: number) => {
    const service = this.state.servicesList.find((servic: ServiceType) => Number(servic.value) === text);
    const serviceName = service ? service.label : '';
    return this.truncatedText(serviceName, charLength);
  }

  truncatedText = (text: string, charLength: number) => { 
    if (text !== null) {
      if (text.length <= charLength) {
        return text;
      } else {
        const truncated = text.substring(0, charLength) + '...';
        return truncated;
      }
    }
  };

  getNotaryServieData(): boolean {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiNotaryServiceCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllServicesApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({})
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  toggleDropdown = (index: number) => {
    this.setState({ isModelVisible: true, selectedService: index })
  }

  closeToggleDropDown = () => {
    this.setState({ isModelVisible: false, selectedService: null })
  }

  getActionItemList = (quoteStatusId: number | null) => {
    if (this.state.isInviteSelected || this.state.selectedTab === 'Invites') {
      if (this.state.UserProfileDetail?.role_id === 2) {
        return menuItemsInviteForNotary
      } else {
        return menuItemsInvite
      }
    } else {
      if (this.state.UserProfileDetail?.role_id === 2) {
        if (quoteStatusId === 2 || quoteStatusId === null) {
          return menuItemsForNotary.filter(item => item.key !== 'withdraw');
        } else {
          return menuItemsForNotary.filter(item => item.key !== 'submit');
        }
      }else {
        return menuItems;
      }
    }
  }

  getMenuWidth = () => {
    if (this.state.UserProfileDetail?.role_id === 1) {
      return 160
    } else {
      return 175
    }
  }

  redirectPage = (key: string, requestId: string, status: string, requestDate: string, notarisation_method: string) => {
    this.closeToggleDropDown();
  
    const handleNavigation = (messageEnum: number, customData: any) => {
      const msg: Message = new Message(getName(messageEnum));
      msg.addData(getName(MessageEnum.CustomDataMessage), customData);
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    };
  
    switch (key) {
      case 'view':
      case 'withdraw':
        handleNavigation(MessageEnum.NavigationRequestDetailMessage, {
          requestId,
          actionType: key,
          from: 'search'
        });
        break;
  
      case 'edit':
        handleNavigation(MessageEnum.NavigationNewNotaryRequestMessage, {
          requestId,
          actionType: key
        });
        break;
  
      case 'Reject':
        this.setState({ isModelVisible: false, notaryRequestId: requestId, selectedRequestStatus: status },() => {
          setTimeout(() => {
            this.setState({onViewReject:true,requestId:requestId})
          }, Platform.OS === "ios" ? 500 : 0);
        })
        break;
  
      case 'Accept':
        handleNavigation(MessageEnum.NavigationContinueAsGuestMessage, {
          requestId,
          actionType: key
        });
        break;
  
      case 'cancel':
        if (status.toLowerCase() === 'pending' || status.toLowerCase() === 'draft') {
          this.setState({ isModelVisible: false, notaryRequestId: requestId, selectedRequestStatus: status }, async () => {
            setTimeout(() => {
              this.setState({ isCancelRequestModelOpen: true })
            }, Platform.OS === "ios" ? 500 : 0);
          })
        } else {
          this.setState({ isModelVisible: false, notaryRequestId: requestId, selectedRequestStatus: status }, () => {
            this.getCancelCharge(requestId)
          })
        }
        break;
  
      case 'submit':
        handleNavigation(MessageEnum.NavigationQuoteManagementMessage, {
          requestId,
          actionType: key,
          requestDate,
          token: this.state.token,
          notarisation_method
        });
        break;
  
      case 'message':
        handleNavigation(MessageEnum.NavigationRequestDetailMessage, {
          requestId,
          requestDate,
          token: this.state.token,
          from: 'search'
        });
        break;
    }
  };
  

  getCancelCharge(requestId: string): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCancellationChargeCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cancellationApiFirstEndPoint + requestId + configJSON.cancellationApiSecondEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  btnBookNowProps = {
    onPress: () => {
      const messages: Message = new Message(
        getName(MessageEnum.NavigationNewNotaryRequestMessage)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
  }

  onChangeBottomTab = (key: number) => {
    const msg: Message = new Message(getName(key));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
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
      configJSON.cancellationApiFirstEndPoint + this.state.notaryRequestId + configJSON.cancelRequestApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiRequestMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }
  callApiToRejectRequest(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiRejetRequestCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_menu_ordering/notary_requests/${this.state.requestId}/reject_invite_request`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.onPostMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }
  onClickOfFilterIcon = {
    onPress: () => {
      this.setState({isFilterPageOpen: true})
    }
  }

  closeFilterPage = {
    onPress: () => {
      this.callRequestListDataApi()
        this.setState({ isFilterPageOpen: false ,selectedPriorityFilter: null,
          selectedRequestStatusFilter: null,
          endDate: null,
          startDate: null,
          selectedServiceType: null,
          pageNo: 1,
          selectedDateType: '',
          requestListData:[],
          requestListLength: 0,
          newRequestData: [],
          outgoingRequestData: [],
          inviteRequestData: [],
          onGoingRequestLength: 0,
          inviteRequestLength: 0,
          newRequestLength: 0,
          selectedDateRange: ''})
    }
  }

  getSelectPriorityFilter = (key: FilterOption) => {
    this.setState({ selectedPriorityFilter: key })
  }

  getSelectRequestStatus = (key: FilterOption) => {
      this.setState({ selectedRequestStatusFilter: key })
  }
  
  onResetFilter = {
    onPress: () => {
        this.setState({
            selectedPriorityFilter: null,
            selectedRequestStatusFilter: null,
            isFilterPageOpen: false,
            endDate: null,
            startDate: null,
            selectedServiceType: null,
            pageNo: 1,
            selectedDateType: '',
            requestListData:[],
            requestListLength: 0,
            isLoader: true,
            selectedDateRange: '',
            newRequestData: [],
            outgoingRequestData: [],
            inviteRequestData: [],
            onGoingRequestLength: 0,
            inviteRequestLength: 0,
            newRequestLength: 0
        }, () => {
            this.getRequestListData(`?page=${this.state.pageNo}&per_page=10`)
        })
    }
  }
  onApplyFilter = {
      onPress: () => {
          this.setState({
              isFilterPageOpen: false,
              pageNo: 1,
              requestListData: [],
              requestListLength: 0,
              isLoader: true,
              newRequestData: [],
              outgoingRequestData: [],
              inviteRequestData: [],
              onGoingRequestLength: 0,
              inviteRequestLength: 0,
              newRequestLength: 0
          }, () => {
            const parmData = `?page=${this.state.pageNo}&per_page=10&order_id=&service_type=${this.state.selectedServiceType ? this.state.selectedServiceType?.value : ''}&request_date_start=${this.state.selectedDateType === 'request' ? this.state.startDate : ''}&request_date_end=${this.state.selectedDateType === 'request' ? this.state.endDate : ''}&completion_date_start=${this.state.selectedDateType === 'completion' ? this.state.startDate : ''}&completion_date_end=${this.state.selectedDateType === 'completion' ? this.state.endDate : ''}&request_status=${this.state.selectedRequestStatusFilter ? this.state.selectedRequestStatusFilter?.key: ''}&urgency_level=${this.state.selectedPriorityFilter ?this.state.selectedPriorityFilter?.key: ''}`
            this.getRequestListData(parmData)
          })
      }
  }

  btnOpenCalendarProps = {
    onPress: () => {
        this.getCalendarModalOpen()
    }
  }

  getCalendarModalOpen = () => {
    this.setState({ isCalendarForDateSelect: true })
  }

  getButtonEnabled = () => {
    const { selectedRequestStatusFilter, selectedPriorityFilter, selectedDateRange, selectedServiceType  } = this.state;
    if (selectedRequestStatusFilter !== null || selectedPriorityFilter !== null || selectedDateRange !== '' || selectedServiceType?.value) {
        return true
    } else {
        return false
    }
  }

  txtInputServicesPrpos = (value: ServiceType) => {
    this.setState({ selectedServiceType: value });
  };

  openServicesDropdown = () => {
    this.setState({ isServiceDropdownOpen: true })
  }

  closeDropDownOfServices = () => {
    this.setState({ isServiceDropdownOpen: false })
  }

  onSelectSingleDate = {
    onPress: () => {
        this.setState({ selectedDateType: 'request' })
    }
  }

  onSelectRangeDate = {
      onPress: () => {
          this.setState({ selectedDateType: 'completion' })
      }
  }

  closeCalendarModel = () => {
    this.setState({ 
        isCalendarForDateSelect: false,
        selectedDateType: '' 
    })
  }
  closeCalendar = {
    onPress: () => {
        this.closeCalendarModel()
    }
  } 

  handleDayPress = (day: Day) => {
    const { startDate, endDate } = this.state;
    const selectedDate = day.dateString;

    if (!startDate) {
        this.setState({ startDate: selectedDate, endDate: null });
    } else if (!endDate) {
        if (selectedDate < startDate) {
            this.setState({ startDate: selectedDate, endDate: null });
        } else {
            this.setState({ endDate: selectedDate });
        }
    } else {
        this.setState({ startDate: selectedDate, endDate: null });
    }
  };

getMarkedDates = () => {
    const { startDate, endDate } = this.state;
    const markedDates: { [key: string]: any } = {};

    if ( startDate && endDate) {
        let end = new Date(endDate);
        let current = new Date(startDate);

        while (current <= end) {
            const dateString = current.toISOString().split('T')[0];
            markedDates[dateString] = {
                selected: true,
                selectedColor: '#012275',
                selectedTextColor: '#fff',
            };
            current.setDate(current.getDate() + 1);
        }
    }
    return markedDates;
  };

  getDoneButtonEnabled = () => {
    const {startDate, endDate} = this.state;
     if(startDate && endDate !== null){
        return true
    } else {
        return false
    }
  }

  onDateSelectDone = {
    onPress: () => {
        const {startDate, endDate} = this.state;
        if(startDate && endDate !== null){
            this.setState({
                selectedDateRange: `${this.updateFormattedDateRange(startDate)} - ${this.updateFormattedDateRange(endDate)}`,
                isCalendarForDateSelect: false, 
            })
        }
    }
  }

  formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  updateFormattedDateRange = (date: string) => {
    if (date) {
      const formattedStartDate = this.formatDate(date);
      return formattedStartDate;
    }
  };

  constructParamDataForPriority = () => {
    const {
      selectedServiceType,
      selectedDateType,
      startDate,
      endDate,
      selectedRequestStatusFilter,
      selectedPriorityFilter,
      pageNo,
    } = this.state;

    return `?page=${pageNo}&per_page=10` +
      `&order_id=` +
      `&service_type=${selectedServiceType?.value || ''}` +
      `&request_date_start=${selectedDateType === 'request' ? startDate : ''}` +
      `&request_date_end=${selectedDateType === 'request' ? endDate : ''}` +
      `&completion_date_start=${selectedDateType === 'completion' ? startDate : ''}` +
      `&completion_date_end=${selectedDateType === 'completion' ? endDate : ''}` +
      `&request_status=${selectedRequestStatusFilter?.key || ''}` +
      `&urgency_level=${selectedPriorityFilter?.key || ''}`;
  };

  updateStateAndFetchData = (urgency: string, img: string | null) => {
    this.setState(
      {
        requestListData: [],
        requestListLength: 0,
        selectedPriorityFilter: img ? { key: urgency, title: urgency, img } : null,
        isLoader: true,
        pageNo: 1,
        newRequestData: [],
        outgoingRequestData: [],
        inviteRequestData: [],
        onGoingRequestLength: 0,
        inviteRequestLength: 0,
        newRequestLength: 0
      },
      () => {
        const paramData = this.constructParamDataForPriority();
        this.getRequestListData(paramData);
      }
    );
  };

  filterByPriority = (urgency: string, img: string) => {
    const { selectedPriorityFilter } = this.state;

    if (selectedPriorityFilter?.key !== urgency) {
      this.updateStateAndFetchData(urgency, img);
    } else {
      this.updateStateAndFetchData(urgency, null);
    }
  };

  filterHighPriority = (urgency: string) => this.filterByPriority(urgency, redDotImg);
  filterPriority = (urgency: string) => this.filterByPriority(urgency, orangeDotImg);
  filterStandered = (urgency: string) => this.filterByPriority(urgency, greenDotImg);
onCloseModal =()=>{
  this.setState({onViewReject:false})
}

getAbbreviation = (str: string) => {
  if(str){
    const match = str.match(/(([^()]*))/);
    return match ? match[1] : "";
  } else {
    return ""
  }
};

btnTabRequestAndInviteProps = {
  onPress: () => {
    this.setState({
      isRequestSelected: !this.state.isRequestSelected,
      isInviteSelected: !this.state.isInviteSelected,
      selectedRequestTypeData: !this.state.isRequestSelected ? this.state.newRequestData : this.state.inviteRequestData
    })
  }
}

handleTabSelection = (tabName: string) => {
  let selectedRequestTypeData;

  if (tabName === 'New Requests') {
    selectedRequestTypeData = this.state.newRequestData;
  } else if (tabName === 'Invites') {
    selectedRequestTypeData = this.state.inviteRequestData;
  } else {
    selectedRequestTypeData = this.state.outgoingRequestData;
  }
  this.setState({
    selectedTab: tabName,
    selectedRequestTypeDataForNotary: selectedRequestTypeData
  });
};
  
  // Customizable Area End
}
