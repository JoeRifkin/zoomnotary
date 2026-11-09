import React, { useEffect } from 'react';

import {
  createStackNavigator
} from "react-navigation";

import HomeScreen from "../components/src/HomeScreen";
import InfoPage from '../blocks/info-page/src/InfoPageBlock'
import Quotemanagement2 from "../blocks/quotemanagement2/src/Quotemanagement2";
import AccountGroups from "../blocks/accountgroups/src/AccountGroups";
import BulkUploading from "../blocks/bulkuploading/src/BulkUploading";
import StripePayments from "../blocks/stripepayments/src/StripePayments";
import Search from "../blocks/search/src/Search";
import DocumentOpener from "../blocks/documentopener/src/DocumentOpener";
import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import TermsConditions from "../blocks/termsconditions/src/TermsConditions";
import TermsConditionsDetail from "../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../blocks/termsconditions/src/TermsConditionsUsers";
import Catalogue from "../blocks/catalogue/src/Catalogue";
import CatalogueNotaryServices from "../blocks/catalogue/src/CatalogueNotaryServices";
import CataloguePopularNotaries from "../blocks/catalogue/src/CataloguePopularNotaries";
import SocialMediaAccountRegistrationScreen from "../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Emailnotifications2 from "../blocks/emailnotifications2/src/Emailnotifications2";
import CountryCodeSelector from "../blocks/country-code-selector/src/CountryCodeSelector";
import CountryCodeSelectorTable from "../blocks/country-code-selector/src/CountryCodeSelectorTable";
import UserProfileBasicBlock from "../blocks/user-profile-basic/src/UserProfileBasicBlock";
import NotaryServices from "../blocks/user-profile-basic/src/NotaryServices";
import TransactionHistory from "../blocks/user-profile-basic/src/TransactionHistory";
import Splashscreen from "../blocks/splashscreen/src/Splashscreen";
import Settings2 from "../blocks/settings2/src/Settings2";
import Payments from "../blocks/settings/src/Payments";
import ChangePassword from "../blocks/settings/src/ChangePassword";
import EmailAccountRegistration from "../blocks/email-account-registration/src/EmailAccountRegistration";
import Adminconsole2 from "../blocks/adminconsole2/src/Adminconsole2";
import Location from "../blocks/location/src/Location";
import Analytics from "../blocks/analytics/src/Analytics";
import EmailAccountLoginBlock from "../blocks/email-account-login/src/EmailAccountLoginBlock";
import NavigationMenu from "../blocks/navigationmenu/src/NavigationMenu";
import LandingPage from "../blocks/landingpage/src/LandingPage";
import CameraAccess from "../blocks/cameraaccess/src/CameraAccess";
import EducationalUserProfile from "../blocks/educational-user-profile/src/EducationalUserProfile";
import Tasks from "../blocks/tasks/src/Tasks";
import TaskList from "../blocks/tasks/src/TaskList";
import Task from "../blocks/tasks/src/Task";
import RequestManagement from "../blocks/requestmanagement/src/RequestManagement";
import RequestDetail from "../blocks/requestmanagement/src/RequestDetail";
import ZoomMeeting from "../blocks/requestmanagement/src/ZoomMeeting"
import QuoteManagement from "../blocks/requestmanagement/src/QuoteManagement";
import QuotePayment  from "../blocks/requestmanagement/src/QuotePayment";
import Rolesandpermissions2 from "../blocks/rolesandpermissions2/src/Rolesandpermissions2";
import GoogleCalendarSync from "../blocks/googlecalendarsync/src/GoogleCalendarSync";
import Geofence from "../blocks/geofence/src/Geofence";
import Cfzoomintegration92 from "../blocks/cfzoomintegration92/src/Cfzoomintegration92";
import Scheduling from "../blocks/scheduling/src/Scheduling";
import OrderManagement from "../blocks/ordermanagement/src/OrderManagement";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import Dashboard from "../blocks/dashboard/src/Dashboard";
import NewNotaryRequest from "../blocks/dashboard/src/NewNotaryRequest";
import DocusignIntegration from "../blocks/docusignintegration/src/DocusignIntegration";
import Settings from '../blocks/settings/src/Settings';
import VatSalesTax from "../blocks/settings/src/VatSalesTax";
import CalendarSync from "../blocks/settings/src/CalendarSync";
import Calendar from "../blocks/dashboard/src/Calendar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Chat from "../blocks/chat/src/Chat";
import ContinueAsGuest from "../blocks/dashboard/src/ContinueAsGuest";
import ContinueAsGuestDashboard from "../blocks/dashboard/src/ContinueAsGuestDashboard";
import messaging from '@react-native-firebase/messaging';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { setStorageData, getStorageData } from '../framework/src/Utilities';
import { Platform } from 'react-native';
import InviteClient from "../blocks/requestmanagement/src/InviteClient"
import KycVerificationAccount from "../blocks/knowyourcustomerkycverification/src/KycVerificationAccount";
import Notifications from "../blocks/notifications/src/Notifications";
import { StripeProvider } from '@stripe/stripe-react-native';
import GooglePayIntegration from '../blocks/googlepayintegration/src/GooglePayIntegration';
import InvoiceBilling from '../blocks/invoicebilling/src/InvoiceBilling';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

const HomeStack = createStackNavigator({
Splashscreen:{ screen:Splashscreen,navigationOptions:{ header: null,title:""}},
Home: { screen: Catalogue, navigationOptions: { header: null, title: "Home" } },
Quotemanagement2:{ screen:Quotemanagement2,navigationOptions:{ title:"Quotemanagement2"}},
AccountGroups:{ screen:AccountGroups,navigationOptions:{ title:"AccountGroups"}},
BulkUploading:{ screen:BulkUploading,navigationOptions:{ title:"BulkUploading"}},
StripePayments:{ screen:StripePayments,navigationOptions:{ title:"StripePayments"}},
Search:{ screen:Search,navigationOptions:{  header: null,title:""}},
DocumentOpener:{ screen:DocumentOpener,navigationOptions:{ title:"DocumentOpener"}},
SocialMediaAccountLoginScreen:{ screen:SocialMediaAccountLoginScreen,navigationOptions:{ title:"SocialMediaAccountLoginScreen"}},
ForgotPassword:{ screen:ForgotPassword,navigationOptions:{header: null, title:""}},
ForgotPasswordOTP:{ screen:ForgotPasswordOTP,navigationOptions:{ title:"ForgotPasswordOTP"}},
NewPassword:{ screen:NewPassword,navigationOptions:{header: null, title:""}},
TermsConditions:{ screen:TermsConditions,navigationOptions:{ header: null, title:""}},
TermsConditionsDetail:{ screen:TermsConditionsDetail,navigationOptions:{ title:"TermsConditionsDetail"}},
TermsConditionsUsers:{ screen:TermsConditionsUsers,navigationOptions:{ title:"TermsConditionsUsers"}},
Catalogue:{ screen:Catalogue,navigationOptions:{header:null, title:""}},
CatalogueNotaryServices:{ screen:CatalogueNotaryServices,navigationOptions:{header:null, title:""}},
CataloguePopularNotaries:{ screen:CataloguePopularNotaries,navigationOptions:{header:null, title:""}},
Payments: { screen: Payments, navigationOptions: { header: null, title: "" } },
ChangePassword:{ screen:ChangePassword,navigationOptions:{header:null, title:""}},
SocialMediaAccountRegistrationScreen:{ screen:SocialMediaAccountRegistrationScreen,navigationOptions:{ title:"SocialMediaAccountRegistrationScreen"}},
Emailnotifications2:{ screen:Emailnotifications2,navigationOptions:{ title:"Emailnotifications2"}},
CountryCodeSelector:{ screen:CountryCodeSelector,navigationOptions:{ title:"CountryCodeSelector"}},
CountryCodeSelectorTable:{ screen:CountryCodeSelectorTable,navigationOptions:{ title:"CountryCodeSelectorTable"}},
UserProfileBasicBlock:{ screen:UserProfileBasicBlock,navigationOptions:{  header: null,title:""}},
Settings2:{ screen:Settings2,navigationOptions:{ title:"Settings2"}},
EmailAccountRegistration:{ screen:EmailAccountRegistration,navigationOptions:{header: null, title:""}},
Adminconsole2:{ screen:Adminconsole2,navigationOptions:{ title:"Adminconsole2"}},
Location:{ screen:Location,navigationOptions:{ title:"Location"}},
Analytics:{ screen:Analytics,navigationOptions:{ title:"Analytics"}},
EmailAccountLoginBlock:{ screen:EmailAccountLoginBlock,navigationOptions:{ header: null, title:"", gesturesEnabled: false}},
NavigationMenu:{ screen:NavigationMenu,navigationOptions:{header: null, title:""}},
LandingPage:{ screen:LandingPage,navigationOptions:{ header: null, title:""}},
CameraAccess:{ screen:CameraAccess,navigationOptions:{ title:"CameraAccess"}},
EducationalUserProfile:{ screen:EducationalUserProfile,navigationOptions:{ title:"EducationalUserProfile"}},
Tasks:{ screen:Tasks,navigationOptions:{ title:"Tasks"}},
TaskList:{ screen:TaskList,navigationOptions:{ title:"TaskList"}},
Task:{ screen:Task,navigationOptions:{ title:"Task"}},
RequestManagement:{ screen:RequestManagement,navigationOptions:{ header: null,title:""}},
RequestDetail:{ screen:RequestDetail,navigationOptions:{ header: null,title:""}},
ZoomMeeting:{screen:ZoomMeeting,navigationOptions:{ header: null,title:""}},
Rolesandpermissions2:{ screen:Rolesandpermissions2,navigationOptions:{ title:"Rolesandpermissions2"}},
GoogleCalendarSync:{ screen:GoogleCalendarSync,navigationOptions:{ title:"GoogleCalendarSync"}},
Geofence:{ screen:Geofence,navigationOptions:{ title:"Geofence"}},
Cfzoomintegration92:{ screen:Cfzoomintegration92,navigationOptions:{header: null,title:""}},
Scheduling:{ screen:Scheduling,navigationOptions:{ title:"Scheduling"}},
OrderManagement:{ screen:OrderManagement,navigationOptions:{ title:"OrderManagement"}},
OTPInputAuth:{ screen:OTPInputAuth,navigationOptions:{ header: null,title:""}},
InfoPage: { screen: InfoPage, navigationOptions: { title: "Info" } }, 
Dashboard:{screen: Dashboard, navigationOptions:{ header: null,title:""}},
NewNotaryRequest: {screen: NewNotaryRequest, navigationOptions:{ header: null,title:"", gesturesEnabled: false}},
QuoteManagement: {screen: QuoteManagement, navigationOptions: {header: null, title: ""}},
QuotePayment: {screen: QuotePayment, navigationOptions: {header: null, title: ""}},
NotaryServices: {screen: NotaryServices, navigationOptions: {header: null, title: ""}},
TransactionHistory: {screen: TransactionHistory, navigationOptions: {header: null, title: ""}},
DocusignIntegration: {screen: DocusignIntegration, navigationOptions: {header: null, title: ""}},
Settings: {screen: Settings, navigationOptions: {header: null, title: ""}},
VatSalesTax: {screen: VatSalesTax, navigationOptions: {header: null, title: ""}},
CalendarSync: {screen: CalendarSync, navigationOptions: {header: null, title: ""}},
Calendar: {screen: Calendar, navigationOptions: {header: null, title: ""}},
Notifications: {screen: Notifications, navigationOptions: {header: null, title: ""}},
Chat: {screen: Chat, navigationOptions: {header: null, title: ""}},
KycVerificationAccount: {screen: KycVerificationAccount, navigationOptions: {header: null, title:  ""}},
InviteClient :{screen: InviteClient,navigationOptions:{header:null,title:"Invite Client"}},
ContinueAsGuest: {screen: ContinueAsGuest, navigationOptions: {header: null, title: ""}},
ContinueAsGuestDashboard: {screen: ContinueAsGuestDashboard, navigationOptions: {header: null, title: ""}},
GooglePayIntegration : {screen: GooglePayIntegration, navigationOptions: {header: null, title: ""}},
InvoiceBilling: {screen: InvoiceBilling, navigationOptions: {header: null, title: ""}},
});
// Constants for Android 13
const ANDROID_VERSION_13 = 33;

// Permission functions
const CustomRequestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFCMToken();
  }
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_13) {
    return await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  }
  return RESULTS.GRANTED;
};

const checkNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_13) {
    return await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  }
  return RESULTS.GRANTED;
};

const getFCMToken = async () => {
  const deviceToken = await getStorageData("deviceToken");
  console.log("deviceToken@@",deviceToken)
  if (!deviceToken) {
    await messaging().registerDeviceForRemoteMessages();
    const tokenFCM = await messaging().getToken();
    if (tokenFCM) {
      setStorageData('deviceToken', tokenFCM);
    }
  }
};

const requestPermission = async () => {
  const checkPermission = await checkNotificationPermission();
  if (checkPermission !== RESULTS.GRANTED) {
    const request = await requestNotificationPermission();
    if (request === RESULTS.GRANTED) {
      getFCMToken();
    }
  } else {
    getFCMToken();
  }
};

const notificationPermission = () => {
  Platform.OS === "ios" ? CustomRequestNotificationPermission() : requestPermission();
};

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "HomeScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  useEffect(() => {
    notificationPermission();
  }, []);
  return (
    <StripeProvider
      publishableKey={"pk_test_51OP58cJQ8HH57qDmBae6VkMrD6E2YtNuPMu74qsWzG7VU23wm7MLbaD6n7mQRCXLdEqLAWJtiqCk5JzYpjUTYAYq00U04wJ8wg"}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
    <SafeAreaProvider>
    <HomeStack />
    </SafeAreaProvider>
   </StripeProvider>
  );
};
