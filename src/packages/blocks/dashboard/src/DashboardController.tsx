import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { BackHandler, Platform } from 'react-native';
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkGrayImg, viewImg, cancelImg, editImg, MLinkImg, messageImg, notificationRedImg, notificationImg, deleteImg } from "./assets";

const menuItems = [
  { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress", "draft"] },
  { icon: editImg, text: 'Edit', key: 'edit', action: ['pending', "draft"] },
  { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
  { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] },
  { icon: cancelImg, text: 'Cancel', key: 'cancel', action: ['pending', "in progress"] },
  { icon: deleteImg, text: 'delete', key: 'cancel', action: ["draft"] }
];

const menuItemsForNotary = [
  { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress",] },
  { icon: editImg, text: "Submit Quote", key: 'submit', action: ['pending'] },
  { icon: cancelImg, text: 'Withdraw Quote', key: 'withdraw', action: ['pending'] },
  { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
  { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] }
];

const menuItemsInvite = [
  { icon: viewImg, text: 'View', key: 'view', action: ["invite", "rejected"] },
  { icon: checkGrayImg, text: 'Accept', key: 'Accept', action: ["invite",] },
  { icon: cancelImg, text: 'Reject', key: 'Reject', action: ['invite'] },
];

const menuItemsInviteForNotary = [
  { icon: viewImg, text: 'View', key: 'view', action: ["invite", "rejected", "accepted"] }
];

interface ServiceAttributes {
  id: number;
  service_icon: string | null;
  service_name: string;
  service_description: string;
  is_selected: boolean;
}
interface CancellactionError {
  errors: string
}

interface MenuItemForAction {
  name: string;
  key: string;
  action: string[];
}

// Define the interface for the service
interface Service {
  id: string;
  type: string;
  attributes: ServiceAttributes;
}

interface ServiceIconDetail {
  url: string
}

interface CancellationPolicy {
  cancellation_charges: number;
}

interface ProfilePhoto {
  url: string | null;
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

interface DetailMeta {
  profile: DetailData,
}
interface DetailUserRole {
  meta: DetailMeta
}

interface DetailData {
  data: DetailAttribute,
}

interface DetailAttribute {
  attributes: ProfileAttributes,
}
interface NotaryResponse {
  notary_id: number;
  message: string;
}
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

// {"data": {"is_address": false, "is_notary_service": false, "is_payment_details": true, "is_phone_number": false, "is_qualified_signature": true, "is_vat_sales_tax": false}}

interface NotarisationMethod {
  id: number;
  notarisation_method: string;
  created_at: string;
  updated_at: string;
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
    invited_request_status: string;
    is_deleted: boolean;
    invite_request: boolean;
    invite_number: number;
    notarisation_method: NotarisationMethod;
    notary_service_name: string;
    quote_statuses_id: number;
  };
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

interface RequestCount {
  all_request_count?: number;
  in_progress_request_count?: number;
  notary_completed_request_count?: number;
  user_completed_request_count?: number;
}

// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  servicesList: any;
  userRoleType: string;
  isModelVisible: boolean;
  isServicesModelOpen: boolean;
  selectedServiceForModel: any,
  selectedService: any;
  requestCountData: RequestCount | null;
  newRequestData: any;
  outgoingRequestData: any;
  requestDate: string;
  UserProfileDetail: ProfileAttributes | null;
  isUserDataStoed: boolean;
  isCancelRequestModelOpen: boolean;
  notaryRequestId: string;
  CancellationCharge: CancellationPolicy | null;
  cancelRequestRes: NotaryResponse | null;
  selectedRequestStatus: string;
  completeProfileList: ProfileStep[];
  userType: keyof BottomMenu;
  cancellationError: CancellactionError | null;
  isCancellactionErrorPopup: boolean;
  isAnyNotificationUnread: boolean;
  isRequestSelected: boolean;
  isInviteSelected: boolean;
  inviteRequestData: NotaryRequest[];
  selectedRequestTypeData: NotaryRequest[];
  selectedRequestTypeDataForNotary: NotaryRequest[];
  selectedTab: string;
  onViewReject: boolean;
  isSucessMsgModel: boolean
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  apiNotaryServiceCallId: string = "";
  apiRequestCountCallId: string = "";
  apiCompleteProfileCallId: string = "";
  apiRequestCountDetailCallId: string = "";
  apiNewRequestCallId: string = "";
  forCompleteProfileList: any = [
    { name: "Notary Services", key: "service" },
    { name: "Mobile Number", key: "mobile" },
    { name: "Complete Address", key: "address" },
    { name: "Qualified Signature", key: "qualified" },
    { name: "VAT (Sales Tax)", key: "vat" },
    { name: "Payment Details", key: "payment" }
  ];
  apiCancellationChargeCallId: string = "";
  apiCancelRequestCallId: string = "";
  getNotificationDataCallId: string = "";
  apiRejetRequestCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      dashboardData: [],
      errorMsg: "",
      token: "",
      loading: false,
      servicesList: [],
      userRoleType: '',
      isModelVisible: false,
      isServicesModelOpen: false,
      selectedServiceForModel: {},
      selectedService: null,
      requestCountData: {
        all_request_count: 0,
        in_progress_request_count: 0,
        notary_completed_request_count: 0,
        user_completed_request_count: 0,
      },
      newRequestData: [],
      outgoingRequestData: [],
      requestDate: '',
      UserProfileDetail: null,
      isUserDataStoed: false,
      isCancelRequestModelOpen: false,
      notaryRequestId: '',
      CancellationCharge: null,
      cancelRequestRes: null,
      selectedRequestStatus: '',
      completeProfileList: [],
      userType: 'end_user',
      isCancellactionErrorPopup: false,
      cancellationError: null,
      isAnyNotificationUnread: false,
      isInviteSelected: false,
      isRequestSelected: true,
      inviteRequestData: [],
      selectedRequestTypeData: [],
      selectedRequestTypeDataForNotary: [],
      selectedTab: 'New Requests',
      onViewReject: false,
      isSucessMsgModel: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.setState({ loading: true })
    this.getNotaryServieData();
    setTimeout(() => {
      this.getCompleteProfileApi()
    }, 300);
    if (this.state.token !== '') {
      this.getRequestCountData()
      this.getDashboardData();
    }
    this.props.navigation.addListener('willFocus', () => {
      this.getUserDetailData();
      this.getCompleteProfileApi()

    });
    // Customizable Area End
  }

  getToken = () => {
    const message: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  }

  getDashboardData(): boolean {
    // Customizable Area Start

    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDashboardItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userNotaryRequestApiEndPoint + '?page=1&per_page=10'
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
    // Customizable Area End
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    switch (message.id) {
      case getName(MessageEnum.SessionResponseMessage):
        await this.handleSessionResponse(message);
        break;
      case getName(MessageEnum.RestAPIResponceMessage):
        await this.handleRestApiResponse(message);
        break;
      default:
        break;
    }
    // Customizable Area End
  }

  // Customizable Area Start

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  getUserDetailData = async () => {
    const userDetail = await getStorageData('userProfileData');
    this.setState({ selectedTab: 'New Requests', isRequestSelected: true, isInviteSelected: false, UserProfileDetail: userDetail ? JSON.parse(userDetail) : {} }, () => {
      this.forceUpdate()
    })
  }

  async handleSessionResponse(message: Message) {
    const userData = message.getData(getName(MessageEnum.SessionResponseData));
    const userRole = JSON.parse(userData);
    console.log('userData', userData, userRole)
    if (!this.state.isUserDataStoed) {
      await this.validateUserDetail(userRole)
    }
    this.setState(
      { token: userRole.meta.token, userRoleType: userRole.meta.role, userType: userRole.meta.role },
      async () => {
        if (this.state.token) {
          const userDetail = await getStorageData('userProfileData');
          this.setState({ UserProfileDetail: userDetail ? JSON.parse(userDetail) : {}, isUserDataStoed: true })
          this.getRequestCountData();
        }
      }
    );
  }

  validateUserDetail = async (userRole: DetailUserRole) => {
    if (userRole.meta.profile) {
      await setStorageData("userProfileData", JSON.stringify(userRole.meta.profile.data.attributes))
    } else {
      const storedData = await AsyncStorage.getItem('signUpUserDetail');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const userDetail = {
          full_name: parsedData.full_name,
          photo: {
            url: null
          }
        }
        await setStorageData("userProfileData", JSON.stringify(userDetail))
      }
    }
  }
  async handleRestApiResponse(message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (responseJson && !responseJson.errors) {
      switch (apiRequestCallId) {
        case this.apiDashboardItemCallId:
          await this.handleDashboardItemResponse(responseJson);
          await this.handleNewRequestDataResponse(responseJson);
          break;
        case this.apiNotaryServiceCallId:
          this.setState({ servicesList: responseJson.data });
          break;
        case this.apiRequestCountCallId:
          this.setState({ requestCountData: responseJson, loading: true }, () => {
            this.getDashboardData();
          });
          break;
        case this.apiCompleteProfileCallId:
          this.getCompleteProfileApiRes(responseJson)
          this.getNotificationList();
          break;
        case this.apiCancellationChargeCallId:
          this.setState({ isModelVisible: false }, async () => {
            setTimeout(() => {
              this.showModelOfCancelForInprogress(responseJson)
            }, Platform.OS === "ios" ? 500 : 0);
          })
          break;
        case this.apiCancelRequestCallId:
          this.setState({
            cancelRequestRes: responseJson as NotaryResponse
          }, () => {
            this.getRequestCountData();
          });
          break;
        case this.getNotificationDataCallId:
          this.handleNotifiactionResponse(responseJson.data)
          break;
        case this.apiRejetRequestCallId:
          this.getRejectReponse(responseJson)
          break;
        default:
          break;
      }
    } else {
      this.setState({ isModelVisible: false }, async () => {
        setTimeout(() => {
          this.handleErrorMessage(responseJson, apiRequestCallId)
        }, Platform.OS === "ios" ? 500 : 0);
      })
    }
  }

  getRejectReponse = (res: any) => {
    if (res && res.message) {
      this.getDashboardData();
      this.setState({ isSucessMsgModel: true, isRequestSelected: true, isInviteSelected: false })
      setTimeout(() => {
        this.closeSucessMsgModel()
      }, 3000);
    }
  };

  closeSucessMsgModel = () => {
    this.setState({ isSucessMsgModel: false })
  }

  handleErrorMessage = (errorJson: CancellactionError, apiRequestCallId: string) => {
    if (errorJson && errorJson.errors) {
      if (apiRequestCallId === this.apiCancellationChargeCallId) {
        this.setState({ isModelVisible: false }, async () => {
          setTimeout(() => {
            this.setState({ isCancellactionErrorPopup: true, cancellationError: errorJson })
          }, Platform.OS === "ios" ? 500 : 0);
        })
      }
    }
  }

  handleNotifiactionResponse = (response: Notification[]) => {
    const is_readValue = response.some(
      (notification: Notification) => notification.attributes.is_read === false
    );
    this.setState({ isAnyNotificationUnread: is_readValue })
  }

  getNotificationImage = () => {
    if (this.state.isAnyNotificationUnread) {
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

  onClickOfOk = {
    onPress: () => {
      this.setState({ isCancellactionErrorPopup: false, cancellationError: null })
    }
  }

  getCompleteProfileApiRes = (res: CompleteProfileRes) => {
    const { outgoingRequestData, newRequestData, userRoleType, requestCountData } = this.state;

    const newCompleteProfileList = Object.keys(res.data)
      .filter(key => !res.data[key as keyof typeof res.data])
      .map(key => PROFILE_STEPS[key as keyof typeof PROFILE_STEPS]);

    const hasIncompleteProfileSteps = newCompleteProfileList.length > 0;

    const countRequst = {
      all_request_count: 0,
      in_progress_request_count: 0,
      notary_completed_request_count: 0
    };

    const updatedState = {
      outgoingRequestData: hasIncompleteProfileSteps ? [] : outgoingRequestData,
      newRequestData: hasIncompleteProfileSteps ? [] : newRequestData,
      completeProfileList: newCompleteProfileList,
      requestCountData: hasIncompleteProfileSteps && userRoleType === 'notary' ? countRequst : requestCountData,
    };

    this.setState(updatedState);
  };

  showModelOfCancelForInprogress = (responseJson: CancellationPolicy) => {
    this.setState({ isModelVisible: false }, async () => {
      setTimeout(() => {
        this.setState({
          CancellationCharge: responseJson,
          isCancelRequestModelOpen: true,
        });
      }, Platform.OS === "ios" ? 500 : 0);
    })
  }

  async handleNewRequestDataResponse(responseJson: any) {
    let filteredData = responseJson?.new_notary_requests?.data?.filter((item: any) => item.attributes.status.toLowerCase() === 'pending').slice(0, 10);
    const newRequestData = this.state.completeProfileList.length > 0 ? [] : filteredData
    this.setState({ newRequestData: newRequestData, selectedRequestTypeDataForNotary: newRequestData });
  }

  async handleDashboardItemResponse(responseJson: any) {
    let filteredData = responseJson?.notary_ongoing_requests?.data?.filter((item: any) => item.attributes.status.toLowerCase() === 'in progress').slice(0, 10);
    const latest10Request = responseJson?.end_user_notary_requests?.data?.slice(0, 10);
    const latest10InviteRequest = responseJson?.invite_request?.data?.slice(0, 10);
    const outgoingRequestData = this.state.completeProfileList.length > 0 ? [] : filteredData
    this.setState(
      {
        loading: false,
        dashboardData: latest10Request,
        selectedRequestTypeData: latest10Request,
        outgoingRequestData: outgoingRequestData,
        errorMsg: "",
        inviteRequestData: latest10InviteRequest,
        requestDate: this.state.userRoleType === 'end_user' ? 'Request Date' : 'Date'
      });
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

  getRequestCountData(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiRequestCountCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.requestCountApiEndPoint
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

  onClickOfAvatatIcon = {
    onPress: () => {
      const messages: Message = new Message(
        getName(MessageEnum.NavigationMenuMessage)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
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

  convertData = (date: any) => {
    const dateObject = new Date(date);
    const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    return formattedDate
  }

  btnBookNowProps = {
    onPress: () => {
      this.setState({ isServicesModelOpen: false }, () => {
        const messages: Message = new Message(
          getName(MessageEnum.NavigationNewNotaryRequestMessage)
        );
        messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(messages);
      })
    }
  }

  btnBookNowFromModelProps = {
    onPress: () => {
      this.setState({ isServicesModelOpen: false }, () => {
        const messages: Message = new Message(getName(MessageEnum.NavigationNewNotaryRequestMessage));

        const selectedRequest = {
          serviceId: this.state.selectedServiceForModel.id,
          serviceName: this.state.selectedServiceForModel.service_name
        };
        messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
        messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(messages);
      })
    }
  }

  getNotaryServieData(): boolean {
    // Customizable Area Start
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
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  getNotaryServiceValue = (text: number | null, charLength: number) => {
    const service = this.state.servicesList.find((service: Service) => service.attributes.id === text);
    return this.truncatedText(service ? service.attributes.service_name : null, charLength)
  }

  truncatedText = (text: string, charLength: number) => {
    if (text !== null) {
      if (text.length <= charLength) {
        return text;
      } else {
        const truncated = text.substring(0, charLength) + '...';
        return truncated;
      }
    } else {
      return '';
    }
  };

  getServiceName = (serviceName: string) => {
    if (serviceName && serviceName.length > 0) {
      return this.truncatText(serviceName, 25)
    } else {
      return ''
    }
  }

  getSetviceModelOpen = (service: any) => {
    this.setState({ isServicesModelOpen: !this.state.isServicesModelOpen, selectedServiceForModel: this.state.isServicesModelOpen ? {} : service })
  }

  toggleDropdown = (index: number) => {
    this.setState({ isModelVisible: true, selectedService: index }
    )
  }

  closeToggleDropDown = () => {
    this.setState({ isModelVisible: false, selectedService: null })
  }

  renderStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'rejected':
        return 'rejectedStatusTxt';
      case 'invite':
        return 'invitedStatusTxt';
      case 'accepted':
        return 'acceptedStatusTxt';
      case 'completed':
        return 'completedStatusTxt';
      case 'draft':
        return 'draftStatusTxt';
      case 'pending':
        return 'pendingStatusTxt';
      case 'cancelled':
        return 'cancelledStatusTxt';
      default:
        return 'inprogressStatusTxt';
    }
  };

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  renderStatusView = (status: string) => {
    switch (status.toLowerCase()) {
      case 'invite':
        return 'invitedStatusView';
      case 'rejected':
        return 'rejectedStatusView';
      case 'accepted':
        return 'acceptedStatusView';
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
  };

  renderCardRightBorder = (priority: string) => {
    switch (priority) {
      case 'Standard':
        return 'cardBorderRightColorForInProgress';
      case 'Priority':
        return 'cardBorderRightColorForDraftPendingCancelled';
      default:
        return 'cardBorderRightColorForCompleted';
    }
  }

  redirectPage = (key: string, requestId: string, status: string, requestDate: string, notarisation_method: string) => {
    this.closeToggleDropDown();

    const sendNavigationMessage = (messageEnum: number, customData: any) => {
      const msg: Message = new Message(getName(messageEnum));
      msg.addData(getName(MessageEnum.CustomDataMessage), customData);
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    };

    switch (key) {
      case 'view':
      case 'withdraw':
      case 'edit':
        sendNavigationMessage(
          key === 'edit'
            ? MessageEnum.NavigationNewNotaryRequestMessage
            : MessageEnum.NavigationRequestDetailMessage,
          { requestId, actionType: key }
        );
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
        sendNavigationMessage(MessageEnum.NavigationQuoteManagementMessage, {
          requestId,
          actionType: key,
          requestDate,
          token: this.state.token,
          notarisation_method
        });
        break;

      case 'message':
        sendNavigationMessage(MessageEnum.NavigationRequestDetailMessage, {
          requestId,
          requestDate,
          token: this.state.token
        });
        break;

      case 'Reject':
        this.setState({ isModelVisible: false, notaryRequestId: requestId, selectedRequestStatus: status }, () => {
          setTimeout(() => {
            this.setState({ onViewReject: true })
          }, Platform.OS === "ios" ? 500 : 0);
        })
        break;

      case 'Accept':
        this.handleNavigation(MessageEnum.NavigationContinueAsGuestMessage, { requestId, actionType: key });
        break;
    }
  };

  onCloseModal = () => {
    this.setState({ onViewReject: false, isRequestSelected: true, isInviteSelected: false })
  }

  yesProceedToRejectRequest = {
    onPress: () => {
      this.callApiToRejectRequest()
      this.onCloseModal();
    }
  }

  noProceedToRejectRequest = {
    onPress: () => {
      this.onCloseModal();
    }
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
      `bx_block_menu_ordering/notary_requests/${this.state.notaryRequestId}/reject_invite_request`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboardPostApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  handleNavigation = (messageEnum: number, customData: any) => {
    const msg: Message = new Message(getName(messageEnum));
    msg.addData(getName(MessageEnum.CustomDataMessage), customData);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

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

  closeServiceModel = () => {
    this.setState({ isServicesModelOpen: false })
  }

  seeAllRequestBtn = (title: string) => {
    this.onRedirectToRequestPage(MessageEnum.NavigationSearchMessage, title === 'New Requests' ? 'new' : 'ongoing')
  }

  seeAllYourRequestBtn = {
    onPress: () => {
      this.onRedirectToRequestPage(MessageEnum.NavigationSearchMessage, 'your')
    }
  }

  onRedirectToRequestPage = (key: number, title: string) => {
    const msg: Message = new Message(getName(key));
    const requestType = {
      type: title
    };
    msg.addData(getName(MessageEnum.CustomDataMessage), requestType);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  onClickseeAllServiceBtnProps = {
    onPress: () => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationCatalogueNotaryServicesMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }

  seeAllServiceBtn = {
    onPress: () => {
      this.goToSeeAllServices()
    }
  }

  goToSeeAllServices = () => {
    alert("Coming Soon");
  }

  inviteClientbtn = {
    onPress: () => {
      this.gotoInviteClient()
    }
  }

  gotoInviteClient = () => {
    const mssage: Message = new Message(getName(MessageEnum.NavigationMessage));
    mssage.addData(getName(MessageEnum.NavigationTargetMessage), "InviteClient");
    mssage.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(mssage);

  }

  selectCompleteProfileTab = (item: ProfileStep) => {
    const messages: Message = new Message(
      getName(item.screen)
    );
    if (item.screen === MessageEnum.NavigationVatSalesTaxMessage) {
      const selectedRequest = {
        token: this.state.token,
        role: this.state.userRoleType,
      };
      messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest)
    }
    messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(messages);
  }

  modifyServiceView = {
    onPress: () => {
      this.gotoModifyYourServices()
    }
  }

  gotoModifyYourServices = () => {
    const messages: Message = new Message(
      getName(MessageEnum.NavigationNotaryServicesMessage)
    );
    messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(messages);
  };

  getServiceIconUrl = (serviceIcon: ServiceIconDetail) => {
    if (serviceIcon !== null && serviceIcon.url) {
      return serviceIcon.url
    } else {
      return ''
    }
  }

  getCompletedRequestCount = (isNotary: boolean) => {
    if (isNotary) {
      return this.formatNumber(this.state.requestCountData?.notary_completed_request_count ?? 0)
    } else {
      return this.formatNumber(this.state.requestCountData?.user_completed_request_count ?? 0)
    }
  }

  getMenuItemList = () => {
    if (this.state.userRoleType === 'end_user') {
      return menuItems;
    } else {
      return menuItemsForNotary
    }
  }

  handleRequestDataResponseInDetail(responseJson: any) {
    let filteredData = responseJson?.new_notary_requests?.data?.filter((item: any) => item.attributes.status.toLowerCase() === 'pending').slice(0, 3);
    this.setState({ newRequestData: filteredData });
  }

  handleDashboardResponseInDetail(responseJson: any) {
    let filteredData = responseJson?.notary_ongoing_requests?.data?.filter((item: any) => item.attributes.status.toLowerCase() === 'in progress').slice(0, 3);
    const latest10Request = responseJson?.end_user_notary_requests?.data?.slice(0, 10);
    this.setState(
      {
        loading: false,
        dashboardData: latest10Request,
        outgoingRequestData: filteredData,
        errorMsg: "",
        requestDate: 'Date'
      },
      () => {
        this.getRequestDetail();
      }
    );
  }

  getRequestDetail(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiRequestCountDetailCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.requestCountDetailApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboardPostApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  renderStatusTextDetail = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'completedStatusTxtDetail';
      case 'draft':
        return 'draftStatusTxtDetail';
      case 'pending':
        return 'pendingStatusTxtDetail';
      case 'cancelled':
        return 'cancelledStatusTxtDetail';
      default:
        return 'inprogressStatusTxtDetail';
    }
  };

  renderCardRightSideBorder = (priority: string) => {
    switch (priority) {
      case 'Standard':
        return 'cardBorderRightColorForInProgressDetail';
      case 'Priority':
        return 'cardBorderRightColorForDraftPendingCancelledDetail';
      default:
        return 'cardBorderRightColorForCompletedDetail';
    }
  }

  renderStatusViewDetail = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'completedStatusViewDetail';
      case 'draft':
        return 'draftStatusViewDetail';
      case 'pending':
        return 'pendingStatusViewDetail';
      case 'cancelled':
        return 'cancelledStatusViewDetail';
      default:
        return 'inprogressStatusViewDetail';
    }
  };

  getNotaryServiceData = (text: number | null, charLength: number) => {
    const service = this.state.servicesList.find((service: Service) => service.attributes.id === text);
    return this.truncatText(service ? service.attributes.service_name : null, charLength)
  }

  truncatText = (text: string, charLength: number) => {
    if (text !== null) {
      if (text.length <= charLength) {
        return text;
      } else {
        const truncated = text.substring(0, charLength) + '...';
        return truncated;
      }
    } else {
      return '';
    }
  };

  getTitleOfNotaryFlowPage = () => {
    if (this.state.userRoleType === 'end_user') {
      return 'Edit Notary Request'
    } else {
      return 'New Notary Request'
    }
  }

  getMenuWidth = () => {
    if (this.state.userRoleType === 'end_user') {
      return 160
    } else {
      return 175
    }
  }

  getBottomHeight = (isOutgoingRequest: boolean, isFromAllRequest: boolean) => {
    if (isOutgoingRequest || isFromAllRequest) {
      return 'margBotForRequest'
    } else {
      return 'nonMargBotForRequest'
    }
  }

  onChangeBottomTab = (key: number) => {
    const msg: Message = new Message(getName(key));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  btnGoBackOnRequestDetail = {
    onPress: () => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationRequestDetailMessage)
      );
      const selectedRequest = {
        requestId: '12345',
        actionType: 'view'
      };
      msg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }

  formatNumber = (num: number) => {
    if (num === 0) return "00";
    return num < 10 ? `0${num}` : `${num}`;
  }

  getActionItemList = (quoteStatusId: number | null) => {
    if (this.state.isInviteSelected || this.state.selectedTab === 'Invites') {
      if (this.state.UserProfileDetail?.role_id === 2) {
        return menuItemsInviteForNotary
      } else {
        return menuItemsInvite
      }
    } else {
      if (this.state.userRoleType === 'notary') {
        if (quoteStatusId === 2 || quoteStatusId === null) {
          return menuItemsForNotary.filter(item => item.key !== 'withdraw');
        } else {
          return menuItemsForNotary.filter(item => item.key !== 'submit');
        }
      } else {
        return menuItems;
      }
    }
  }

  isPreviousDate = (inputDate: string) => {
    const currentDate = new Date();
    const dateToCheck = new Date(inputDate);

    currentDate.setHours(0, 0, 0, 0);
    dateToCheck.setHours(0, 0, 0, 0);

    return dateToCheck < currentDate;
  };

  getDateColorAccordingToData = (date: string) => {
    if (this.state.userRoleType === 'end_user' && this.isPreviousDate(date)) {
      return 'redColor'
    } else {
      return 'normalColor'
    }
  }

  formatCancellactionNumber = (num: string) => {
    return parseFloat(num).toFixed(2);
  };

  getAbbreviation = (str: string): string => {
    const match = str?.match(/\(([^()]*)\)/);
    return match ? match[1] : "";
  };

  getAbbreviationForMethod = (str: string) => {
    if (str) {
      const match = str.match(/\(([^()]*)\)/);
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
        selectedRequestTypeData: !this.state.isRequestSelected ? this.state.dashboardData : this.state.inviteRequestData
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
