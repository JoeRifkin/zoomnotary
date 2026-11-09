// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
import firebase from 'firebase'
import { connect } from 'react-firebase'

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import Quotemanagement2 from "../../blocks/quotemanagement2/src/Quotemanagement2";
import AccountGroups from "../../blocks/accountgroups/src/AccountGroups";
import BulkUploading from "../../blocks/bulkuploading/src/BulkUploading";
import StripePayments from "../../blocks/stripepayments/src/StripePayments";
import Search from "../../blocks/search/src/Search";
import DocumentOpener from "../../blocks/documentopener/src/DocumentOpener";
import SocialMediaAccountLoginScreen from "../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import TermsConditions from "../../blocks/termsconditions/src/TermsConditions";
import TermsConditionsDetail from "../../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../../blocks/termsconditions/src/TermsConditionsUsers";
import Catalogue from "../../blocks/catalogue/src/Catalogue";
import SocialMediaAccountRegistrationScreen from "../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Emailnotifications2 from "../../blocks/emailnotifications2/src/Emailnotifications2";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import Splashscreen from "../../blocks/splashscreen/src/Splashscreen";
import Settings2 from "../../blocks/settings2/src/Settings2";
import EmailAccountRegistration from "../../blocks/email-account-registration/src/EmailAccountRegistration";
import Adminconsole2 from "../../blocks/adminconsole2/src/Adminconsole2";
import Location from "../../blocks/location/src/Location";
import Analytics from "../../blocks/analytics/src/Analytics";
import EmailAccountLoginBlock from "../../blocks/email-account-login/src/EmailAccountLoginBlock";
import NavigationMenu from "../../blocks/navigationmenu/src/NavigationMenu";
import LandingPage from "../../blocks/landingpage/src/LandingPage";
import CameraAccess from "../../blocks/cameraaccess/src/CameraAccess";
import EducationalUserProfile from "../../blocks/educational-user-profile/src/EducationalUserProfile";
import Tasks from "../../blocks/tasks/src/Tasks";
import TaskList from "../../blocks/tasks/src/TaskList";
import Task from "../../blocks/tasks/src/Task";
import RequestManagement from "../../blocks/requestmanagement/src/RequestManagement";
import Rolesandpermissions2 from "../../blocks/rolesandpermissions2/src/Rolesandpermissions2";
import GoogleCalendarSync from "../../blocks/googlecalendarsync/src/GoogleCalendarSync";
import Geofence from "../../blocks/geofence/src/Geofence";
import Cfzoomintegration92 from "../../blocks/cfzoomintegration92/src/Cfzoomintegration92";
import Scheduling from "../../blocks/scheduling/src/Scheduling";
import OrderManagement from "../../blocks/ordermanagement/src/OrderManagement";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import NewNotaryRequest from "../../blocks/dashboard/src/NewNotaryRequest";
import GooglePayIntegration from "../blocks/GooglePayIntegration/src/GooglePayIntegration";
import InvoiceBilling from "../../blocks/invoicebilling/src/InvoiceBilling.web";


const routeMap = {
Quotemanagement2:{
 component:Quotemanagement2,
path:"/Quotemanagement2"},
AccountGroups:{
 component:AccountGroups,
path:"/AccountGroups"},
BulkUploading:{
 component:BulkUploading,
path:"/BulkUploading"},
StripePayments:{
 component:StripePayments,
path:"/StripePayments"},
Search:{
 component:Search,
path:"/Search"},
DocumentOpener:{
 component:DocumentOpener,
path:"/DocumentOpener"},
SocialMediaAccountLoginScreen:{
 component:SocialMediaAccountLoginScreen,
path:"/SocialMediaAccountLoginScreen"},
ForgotPassword:{
 component:ForgotPassword,
path:"/ForgotPassword"},
ForgotPasswordOTP:{
 component:ForgotPasswordOTP,
path:"/ForgotPasswordOTP"},
NewPassword:{
 component:NewPassword,
path:"/NewPassword"},
TermsConditions:{
 component:TermsConditions,
path:"/TermsConditions"},
TermsConditionsDetail:{
 component:TermsConditionsDetail,
path:"/TermsConditionsDetail"},
TermsConditionsUsers:{
 component:TermsConditionsUsers,
path:"/TermsConditionsUsers"},
Catalogue:{
 component:Catalogue,
path:"/Catalogue"},
SocialMediaAccountRegistrationScreen:{
 component:SocialMediaAccountRegistrationScreen,
path:"/SocialMediaAccountRegistrationScreen"},
Emailnotifications2:{
 component:Emailnotifications2,
path:"/Emailnotifications2"},
CountryCodeSelector:{
 component:CountryCodeSelector,
path:"/CountryCodeSelector"},
UserProfileBasicBlock:{
 component:UserProfileBasicBlock,
path:"/UserProfileBasicBlock"},
Splashscreen:{
 component:Splashscreen,
path:"/Splashscreen"},
Settings2:{
 component:Settings2,
path:"/Settings2"},
EmailAccountRegistration:{
 component:EmailAccountRegistration,
path:"/EmailAccountRegistration"},
Adminconsole2:{
 component:Adminconsole2,
path:"/Adminconsole2"},
Location:{
 component:Location,
path:"/Location"},
Analytics:{
 component:Analytics,
path:"/Analytics"},
EmailAccountLoginBlock:{
 component:EmailAccountLoginBlock,
path:"/EmailAccountLoginBlock"},
NavigationMenu:{
 component:NavigationMenu,
path:"/NavigationMenu"},
LandingPage:{
 component:LandingPage,
path:"/LandingPage"},
CameraAccess:{
 component:CameraAccess,
path:"/CameraAccess"},
EducationalUserProfile:{
 component:EducationalUserProfile,
path:"/EducationalUserProfile"},
Tasks:{
 component:Tasks,
path:"/Tasks"},
TaskList:{
 component:TaskList,
path:"/TaskList"},
Task:{
 component:Task,
path:"/Task"},
RequestManagement:{
 component:RequestManagement,
path:"/RequestManagement"},
Rolesandpermissions2:{
 component:Rolesandpermissions2,
path:"/Rolesandpermissions2"},
GoogleCalendarSync:{
 component:GoogleCalendarSync,
path:"/GoogleCalendarSync"},
Geofence:{
 component:Geofence,
path:"/Geofence"},
Cfzoomintegration92:{
 component:Cfzoomintegration92,
path:"/Cfzoomintegration92"},
Scheduling:{
 component:Scheduling,
path:"/Scheduling"},
OrderManagement:{
 component:OrderManagement,
path:"/OrderManagement"},
OTPInputAuth:{
 component:OTPInputAuth,
path:"/OTPInputAuth"},

  Home: {
component:Catalogue,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: "*/AlertWeb",
    modal: true
  },
  NewNotaryRequest: {
    component: NewNotaryRequest,
    path: "/NewNotaryRequest"
  },
  GooglePayIntegration: {
    component: GooglePayIntegration,
    path: "/GooglePayIntegration"
  },
  InvoiceBilling: {
    component: InvoiceBilling,
    path: "/InvoiceBilling"
  }

};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});

class App extends Component {
   
  render() {

    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');
    
    return (
      <View style={{ height: '100vh', width: '100vw' }}>
        <TopNav />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
