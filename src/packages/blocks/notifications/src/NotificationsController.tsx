import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgBell } from "./assets";
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export interface Notification {
  id: string;
  type: string;
  attributes: Attributes;
}

export interface INotification {
  id: string;
  type: string;
  attributes: Attributes;
  title: string
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
  data: any[];
  selectedData: any;
  token: any;
  pageNo: number;
  notificationData: Notification[];
  notificationCount: number;
  isScrollAtBottom: boolean;
  notifcationEmptyMsg: string;
  isLoader: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NotificationsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDataCallId: string = "";
  markAsReadCallId: string = "";
  deleteCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      data: [],
      selectedData: null,
      token: "",
      pageNo: 1,
      notificationCount: 0,
      notificationData: [],
      isScrollAtBottom: false,
      notifcationEmptyMsg: '',
      isLoader: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
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
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token, isLoader: true }, () => {
        this.getNotifications();
      });

    } else if (
      this.getDataCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const apiResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      apiResponse &&
        this.setState({
          notificationData: [
            ...this.state.notificationData,
            ...(apiResponse.data ? apiResponse.data as Notification[] : [])
          ],
          notifcationEmptyMsg: apiResponse.errors ? apiResponse.errors[0].message : '',
          notificationCount: apiResponse.data ? apiResponse.data.length : 0,
          isLoader: false
        }, () => {
          this.filterNotifications()
        });
        
    } else if (
      this.markAsReadCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const apiResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({notificationData: [], notificationCount: 0, isLoader: true}, () =>{
        this.getNotifications();
      })
    } else if (
      this.deleteCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.setState({ selectedData: null });
      this.getNotifications();
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isAtBottom && !this.state.isScrollAtBottom) {
      this.setState({ isScrollAtBottom: true });
      this.onScrollToBottom();
    }
  };

  onScrollToBottom = () => {
    if (this.state.notificationCount >= 15) {
      this.setState({ pageNo: this.state.pageNo + 1, isLoader: true }, () => {
        this.getNotifications()
      });
    }
  };

  iconBellProps = {
    source: imgBell,
  };

  getNotifications() {
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPoint}${this.state.pageNo}${configJSON.pageNoAndCount}`
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: this.state.token ? this.state.token : "",
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getDataMethod
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }

  markAllReadProps ={
    onPress: () => {
      this.setState({isLoader: true}, () => {
        this.markAsRead('');
      })
    }
  }

  markAsRead(id: string) {
    const markAsReadMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.markAsReadCallId = markAsReadMsg.messageId;

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      id !== '' ? `${configJSON.markAllAsReadApiEndpointForSingle}${id}` : configJSON.markAllAsReadApiEndpointForAll
    );

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: this.state.token ? this.state.token : "",
      })
    );

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.patchMethod
    );

    runEngine.sendMessage(markAsReadMsg.id, markAsReadMsg);
  }

  timeSince(date: string) {
    var seconds = Math.floor(
      (new Date().valueOf() - new Date(date).valueOf()) / 1000
    );
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  convertDate(inputFormat: string) {
    function pad(s: any) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
  }

  btnGoBack = {
    onPress: () => {
      const messages: Message = new Message(
        getName(MessageEnum.NavigationDashboardMessage)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
  }

  btnGoBackByArrow = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    }
  }

  filterNotifications = () => {
    const today: Notification[] = [];
    const yesterday: Notification[] = [];
    const twoDaysAgo: Notification[] = [];
    const oneWeekAgo: Notification[] = [];
    const twoWeeksAgo: Notification[] = [];
    const monthAgo: Notification[] = [];
    const yearAgo: Notification[] = [];
    const now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const oneYear = 365 * oneDay;

    this.state.notificationData.forEach((notification) => {
      const createdAt = new Date(notification.attributes.created_at);
      const diffTime = now.getTime() - createdAt.getTime();

      if (diffTime < oneDay) today.push(notification);
      else if (diffTime <= 2 * oneDay) yesterday.push(notification);
      else if (diffTime < oneWeek) twoDaysAgo.push(notification);
      else if (diffTime < 2 * oneWeek) oneWeekAgo.push(notification);
      else if (diffTime < oneMonth) twoWeeksAgo.push(notification);
      else if (diffTime < oneYear) monthAgo.push(notification);
      else yearAgo.push(notification);
    });

    let dataList = [
      {title:'Today', list: today},
      {title:'Yesterday', list: yesterday},
      {title:'2 Days ago', list: twoDaysAgo},
      {title:'1 Week ago', list: oneWeekAgo},
      {title:'2 Week ago', list: twoWeeksAgo},
      {title:'1 Month ago', list: monthAgo},
      {title:'1 Year ago', list: yearAgo}
    ]
    this.setState({
      data : dataList
    });

  };

  backGroundColor = (isRead: boolean) => {
    if(isRead) {
      return 'backNon'
    } else {
      return 'backColor'
    }
  }

  isShowEmptyMessage = () => {
    if(this.state.pageNo === 1 && this.state.notifcationEmptyMsg !== ''){
      return true
    } else {
      return false
    }
  }
  // Customizable Area End
}
