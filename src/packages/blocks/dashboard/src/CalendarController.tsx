import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
import { CalendarUtils } from "react-native-calendars";
import { googleImg, outlookImg, renotaryImg } from "./assets";
import moment from "moment";
import { Event } from "react-native-calendars/src/timeline/EventBlock";
import {authorize,AuthConfiguration, refresh} from 'react-native-app-auth';

import { Alert, Linking, Platform } from "react-native";
import { GoogleSignin } from "@react-native-community/google-signin";

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

export type SelectionType = { label: string; id: number };
export const SELECTION_TYPES: SelectionType[] = [
  { label: 'Month', id: 1 },
  { label: 'Week', id: 2 },
];


export type Tab = {
  label?: string;
  id: number;
  isImg?: boolean;
  icon?: number;
  style?: {
    width: number;
  }
};
type MeetingAttributes = {
  audio: string;
  use_pmi: boolean;
  jbh_time: number;
  resources: Array<{
    resource_id: string;
    resource_type: string;
    permission_level: string;
  }>;
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
  meeting_invitees: any[]; // Use a specific type if known
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

type Meeting = {
  id: number;
  type: number;
  uuid: string;
  topic: string;
  status: string;
  host_id: string;
  duration: number;
  join_url: string;
  password: string;
  settings: MeetingAttributes;
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

type AccountAttributes = {
  id: string;
  type: string;
  attributes: {
    name: string;
    role: string;
    photo: {
      url: string;
    };
  };
};
 
type ZoomMeeting = {
  accounts: Array<{
    data: AccountAttributes;
  }>;
  notary_request_id: number;
  meeting: Meeting;
  start_time: string;
  end_time: string;
}


export type ZoomMeetingFilterd = {
  accounts: Array<{
    data: AccountAttributes;
  }>;
  notary_request_id: number;
  meeting: Meeting;
  start_time: string;
  end_time: string;
  color: string,
  title: string,
  start: string,
  end: string,
  summary: string;
  type:string
}





export const TABS: Tab[] = [
  { label: 'All', id: 1  },
  { id: 2, isImg: true, icon: renotaryImg, style: { width: 83 } },
  { id: 3, isImg: true, icon: googleImg },
  { id: 4, isImg: true, icon: outlookImg },
];

type MarkedDate = {
  selected: boolean;
  marked?: boolean;
  selectedColor: string,
  selectedTextColor: string,
};

type MarkedDates = {
  [date: string]: MarkedDate;
};
export interface EventItem {
  id?: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  conferenceData?: {
    entryPoints: { uri: string }[];
  };
  attendees?: {
    responseStatus: string;
    email: string;
  }[];
  color?: string;
  summary?: string;
  type:'google'
}
const today = new Date();
const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));
// Customizable Area End

export const configJSON = require("./config");
// changed ${configJSON.tenantID} to common in issuer authorizationendpoint and tokenendpoint
const configLogin: AuthConfiguration = {
      issuer: `https://login.microsoftonline.com/common/v2.0`,
      clientId: configJSON.appId,
      redirectUrl: Platform.OS === "android" ? "msauth://com.ZoomNotary" : "msauth.com.zoomNotary://auth/",
      scopes: configJSON.appScopes,
      additionalParameters: { prompt: 'select_account', },
      serviceConfiguration: {
      authorizationEndpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`,
      tokenEndpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/token`
      },
    };
  

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}


interface S {
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  loading: boolean;
  profilePic: string;
  full_name: string;
  user_role: string;
  UserProfileDetail: ProfileAttributes | null;
  selectedType: string;
  currentDate: string;
  modalVisible: boolean
  markedDates: MarkedDates;
  selectedTab:number;
  isGoogleSignedIn: boolean;
  isOutlookSignedIn: boolean
  renotaryMeetings: {
    [key: string]: ZoomMeetingFilterd[]
  } | {};
  selectedEvent: ZoomMeetingFilterd | Object;
  meetingModal: boolean;
  googleAccessToken: string ;
  events:  {
    [key: string]: EventItem[]
  } | {};
  accessToken:string;
  allSlotsEvent:any
  // Customizable Area End
}


interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CalendarController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getRenotaryMeetingsApiCallId: string ='';
  getOutlookCalaenderApiCallId:string = '';
  getEventCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      // Customizable Area Start
      UserProfileDetail: null,
      loading: false,
      profilePic: '',
      full_name: '',
      user_role: '',
      selectedType: SELECTION_TYPES[0].label,
      currentDate: getDate(),
      modalVisible: false,
      markedDates: {
        [getDate()]: { selected: true, marked: false, 
          selectedColor:'#CCD3E3',
          selectedTextColor: "#012275",
        }
      },
      selectedTab:TABS[0].id,
      isGoogleSignedIn: false,
      isOutlookSignedIn: false,
      renotaryMeetings: {},
      selectedEvent:{},
      meetingModal: false,
      googleAccessToken: '',
      events: {},
      accessToken:"",
      allSlotsEvent:[]
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", async() => {
    try {
    const accessToken = await getStorageData('accessToken');

      if (accessToken) {
        this.setState({
          accessToken,
          isOutlookSignedIn: true,  
        });
      }
      else{
        this.setState({
          accessToken : "",
          isOutlookSignedIn: false,
          allSlotsEvent: []
        });
      }
    } catch (error) {
    }
    this.getUserDetailData();
    this.getGoolgeEvents(moment(new Date()).format('YYYY-MM-DD'))
    this.getFetchOutlookApi(moment(new Date()).format('YYYY-MM-DD'))
    this.getRenotaryMeetings(moment(new Date()).format('YYYY-MM-DD'))
    await this.configureGoogleSignin();
    await this.checkGoogleSignInStatus();
  });

    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Received", message);

    const sessionResponseMsg = getName(MessageEnum.SessionResponseMessage);
    let msgId = message.id;
    if (sessionResponseMsg === msgId) {
      this.handleSessionResponse(message);
    }

    const apiRequestCallID = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

    if (apiRequestCallID === this.getRenotaryMeetingsApiCallId) {
      this.handleRenotaryMeetingsResponse(responseJSON);
    }

    if (apiRequestCallID === this.getEventCallId) {
      this.handleEventResponse(responseJSON);
    }
    if (apiRequestCallID === this.getOutlookCalaenderApiCallId) {
      this.handleOutLookEventResponse(responseJSON);
    }
  }
  
  private handleSessionResponse(message: Message) {
    const token = message.getData(getName(MessageEnum.SessionResponseToken));
    const userData = message.getData(getName(MessageEnum.SessionResponseData));
    const userRole = JSON.parse(userData);
    this.setState({ token, user_role: userRole.meta.role });
  }
  
  private async handleRenotaryMeetingsResponse(responseJson: any) {
    const renotaryMeetings: ZoomMeetingFilterd[] = this.mapRenotaryMeetings(responseJson.zoom_meetings);
    const groupedByDate = this.groupByDate(renotaryMeetings);
    this.setState({ renotaryMeetings: groupedByDate });
  }
  
  private handleEventResponse(responseJson: any) {
    const eventItems: EventItem[] = this.mapEvents(responseJson.items);
    const groupedByDate = this.groupByDate(eventItems);
    this.setState({ events: groupedByDate });
  }  
  private async handleOutLookEventResponse(responseJson: any) {
    if (responseJson.error) {
      this.retrieveNewOutlookAccessToken();
    } else {
      let result = responseJson.value.map((meeting: any) => ({
        title: meeting.subject || 'No Title',
        start: moment(meeting.start.dateTime).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(meeting.end.dateTime).format("YYYY-MM-DD HH:mm:ss"),
        color: "#87CEEB",
        summary: "",
        type: "outlook"
      }));

      let output = this.groupByDate(result);
      this.setState({ allSlotsEvent: output });
    }
  }

  retrieveNewOutlookAccessToken = async () => {
    const oldrefreshToken = await getStorageData('refreshToken');

    if (oldrefreshToken) {
      const result = await refresh(configLogin, {
        refreshToken: oldrefreshToken,
      });

      if (result && result.refreshToken) {
        await setStorageData("accessToken", result.accessToken)
        await setStorageData("refreshToken", result.refreshToken)
        this.setState({
          accessToken: result.accessToken,
          isOutlookSignedIn: true
        }, ()=>{
          this.getFetchOutlookApi(moment(new Date()).format('YYYY-MM-DD'));
        })
      }
      else{
        await removeStorageData('accessToken')
        await removeStorageData('refreshToken')

        this.setState({
          accessToken: "",
          isOutlookSignedIn: false,
        });
      }

    }
  }
  
  private mapRenotaryMeetings(meetings: ZoomMeeting[]): ZoomMeetingFilterd[] {
    return (meetings || []).map((meeting: ZoomMeeting) => ({
      ...meeting,
      color: "#012275",
      title: "Renotary Meeting",
      start: moment(meeting.start_time).format("YYYY-MM-DD HH:mm:ss"),
      end: moment(meeting.end_time).format("YYYY-MM-DD HH:mm:ss"),
      summary: '',
      type: 'renotary',
    }));
  }
  
  private mapEvents(items: any[]): EventItem[] {
    return (items || []).map((item) => {
      const start = item.start?.dateTime || item.start?.date || "";
      const end = item.end?.dateTime || item.end?.date || "";
  
      return {
        ...item,
        title: item.summary || "",
        start: moment(start).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(end).format("YYYY-MM-DD HH:mm:ss"),
        color: "#1A73E8",
        type: 'google',
        summary: '',
      };
    });
  }
  
  private groupByDate(events: (Event | EventItem)[]): { [key: string]: (Event | EventItem)[] } {
    return events.reduce((acc: { [key: string]: (Event | EventItem)[] }, event: Event | EventItem) => {
      const dateKey = CalendarUtils.getCalendarDateString(event.start || "");
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(event);
      return acc;
    }, {});
  }
  

  getUserDetailData = async () => {
    const userDetail = await getStorageData("userProfileData");
    this.setState({ UserProfileDetail: JSON.parse(userDetail), profilePic: JSON.parse(userDetail)?.photo.url, full_name: JSON.parse(userDetail)?.full_name });
  };

  onClickOfAvatatIcon = {
    onPress: () => {
      this.goTo(MessageEnum.NavigationMenuMessage)
    }
  }

  goTo = (key: number) => {
    const messages: Message = new Message(getName(key));
    messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(messages);
  }

  onChangeBottomTab = (key: number) => {
    const msg: Message = new Message(getName(key));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };


  onTypeSelect = (item: SelectionType) => {
    this.setState({ selectedType: item.label });
    this.toggleModal();
  };


  handleDateChange = (date: string) => {
    this.setState({
      currentDate: date,
      markedDates:{
        [date]:{
          selected:true,
          selectedColor:'#CCD3E3',
          selectedTextColor: "#012275",
        }
      },
      allSlotsEvent: []
    });
    this.getRenotaryMeetings(date)
    this.getGoolgeEvents(date)
    this.getFetchOutlookApi(date)
  };

  getGoolgeEvents = (date: string = moment(new Date()).format('YYYY-MM-DD')) => {
    this.state.googleAccessToken && this.getEvents(date)
  }


  getTimeLineData = () => {
  const { selectedTab, renotaryMeetings, events, allSlotsEvent } = this.state;

    switch (selectedTab) {
        case 1:
            return this.handleCombinedData();
        case 2:
            return renotaryMeetings;
        case 3:
            return events;
        case 4:
            return allSlotsEvent;
        default:
            return {};
    }
};

handleCombinedData = () => {
  const { renotaryMeetings, events, allSlotsEvent } = this.state;
  
  let combinedData: Record<string, any[]> = {}; // Ensure it's an object with arrays for each date

  // Function to merge events into `combinedData`
  const mergeEvents = (sourceData: Record<string, any>) => {
    Object.keys(sourceData).forEach(dateKey => {
      if (!combinedData[dateKey]) {
        combinedData[dateKey] = [];
      }
      combinedData[dateKey] = [...combinedData[dateKey], ...sourceData[dateKey]];
    });
  };

  // Merge renotaryMeetings, events(google), and allSlotsEvent(outlook)
  mergeEvents(renotaryMeetings);
  mergeEvents(events);
  mergeEvents(allSlotsEvent);

  return combinedData; // ✅ FIXED: Returning merged data instead of mergeEvents function
};


  syncNow = (accountType: 'google' | 'outlook') => {
    accountType === 'google' ? this.loginGoogle() : this.signInWithMicrosoft()
  }


  getTodayStartAndEnd(date: string): { start_time: string; end_time: string } {
 
    // Start time: 00:00:00
    const start_time: string = new Date(`${date}T00:00:00.000Z`).toISOString();
  
    // End time: 23:59:59.999
    const end_time: string = new Date(`${date}T23:59:59.999Z`).toISOString();
  
    return { start_time, end_time };
  }
  
  getRenotaryMeetings = (selectedDate: string) => {
    const timerange = this.getTodayStartAndEnd(selectedDate);
  
    const { start_time, end_time } = timerange;
  
    const headerData = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
  
    const apirequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
  
    this.getRenotaryMeetingsApiCallId = apirequestMessage.messageId;
  
    apirequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.renotaryMeetingsEndPoint}start_time=${start_time}&end_time=${end_time}`
    );

    apirequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerData)
    );
    apirequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
  
    runEngine.sendMessage(apirequestMessage.id, apirequestMessage);
  };
  
  getFetchOutlookApi = (date:string) => {
   const { accessToken } = this.state;

   const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 1)

    const header = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  
    const apirequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
  
    this.getOutlookCalaenderApiCallId = apirequestMessage.messageId;
  
    apirequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `https://graph.microsoft.com/v1.0/me/calendarview?startDateTime=${startDate.toISOString()}&endDateTime=${endDate.toISOString()}`,
    );

    apirequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    apirequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     "GET"
    );
  
    runEngine.sendMessage(apirequestMessage.id, apirequestMessage);
  };
  onEventPress = (selectedEvent: ZoomMeetingFilterd | Event) => {
    if ('type' in selectedEvent && selectedEvent.type === 'renotary') {
      this.setState({ selectedEvent, meetingModal: true });
    }
  };

  onCloseMeetingModal = () => {
    this.setState({ meetingModal: false, selectedEvent: {} })
  }

  openLink = (link: string) => {
    Linking.openURL(link)
  }


 signInWithMicrosoft = async () => {
    try {
      const authState = await authorize(configLogin);

      if (authState.accessToken) {
        await setStorageData("accessToken", authState.accessToken)
        await setStorageData("refreshToken", authState.refreshToken)
        this.setState({
          accessToken: authState.accessToken,
          isOutlookSignedIn: true,
        }, ()=>{
          this.getFetchOutlookApi(moment(new Date()).format('YYYY-MM-DD'))
        });
        Alert.alert('Success', 'You are logged in.');
      } 
  
    } catch (error) {
      Alert.alert('Error', 'Login Failed. Please try again.');
    }
  };

  
   // Configure Google Sign-In based on the platform
   configureGoogleSignin = async () => {
    GoogleSignin.configure({
      webClientId: configJSON.googleCalendarClientId,
      scopes: [configJSON.googleCalendarScope],
    });
  };

  // Check if the user is already signed in and fetch the access token
  checkGoogleSignInStatus = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await this.updateAccessToken();
      }
    } catch (error) {
      console.error('Error checking Google Sign-In status:', error);
    }
  };

  // Fetch and store the access token
  updateAccessToken = async () => {
    try {
      const token = await GoogleSignin.getTokens(); // Get tokens directly
      this.setState({ googleAccessToken: token.accessToken, isGoogleSignedIn: true }, ()=> {
        this.getGoolgeEvents(moment(new Date()).format('YYYY-MM-DD'))
      });
    } catch (error) {
      console.error('Error updating access token:', error);
    }
  };

  // Trigger Google Sign-In flow and fetch the access token
  loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      await GoogleSignin.signIn(); // Trigger the sign-in flow
      const token = await GoogleSignin.getTokens(); // Retrieve the access token

      this.setState({ googleAccessToken: token.accessToken, isGoogleSignedIn: true }, ()=> {
        this.getGoolgeEvents(moment(new Date()).format('YYYY-MM-DD'))
      });

    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  getEvents = (selectedDate: string) => {
    const timerange = this.getTodayStartAndEnd(selectedDate);

    const { start_time, end_time } = timerange;

    const endpointParam = '?timeMin=' + start_time + '&timeMax=' + end_time + '&singleEvents=true'

    const headerItem = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      Authorization: `Bearer ${this.state.googleAccessToken}`,
    };

    const getEventMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getEventCallId = getEventMsg.messageId;

    getEventMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleEventEntPoint + endpointParam
    );

    getEventMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerItem)
    );

    getEventMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(getEventMsg.id, getEventMsg);
    return true;
  };

  // Customizable Area End
}