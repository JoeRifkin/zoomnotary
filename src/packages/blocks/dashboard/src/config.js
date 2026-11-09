Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.dashboardGetUrl = "/bx_block_dashboard/candidates";
exports.dashboarContentType = "application/json";
exports.dashboarApiMethodType = "GET";
exports.dashboardHost = "<calculated when request is sent>";
exports.dashboarUserAgent = "PostmanRuntime/7.26.5";
exports.dashboarAccept = "*/*";
exports.dashboarAcceptEncoding = "gzip, deflate, br";
exports.dashboarConnection = "keep-alive";
exports.dashboartoken = "";
exports.labelTitleText = "dashboard";
exports.totalCandidateslabelTitleText = "Total Candidates";
exports.viewDetailsBtn = "View Details";
exports.candidateslabelTitleText = "Candidates";
exports.baseUrl = ""
exports.labelBodyText = "dashboard Body";
exports.getAllServicesApiEndpoint = 'bx_block_landing_page/admin_landing_pages/get_services';
exports.standard = "Standard £ ";
exports.priority = "Priority ££";
exports.superPriority = "Super Priority £££";
exports.morning = "Morning";
exports.afternoon = "Afternoon";
exports.evening = "Evening";
exports.createNewNotaryApiEndPoint = "bx_block_menu_ordering/notary_requests";
exports.dashboardPostApiMethodType = "POST";
exports.getAllCountryListApiEndPoint = "account_block/countries";
exports.formDataContentType = "multipart/form-data";
exports.notrazationMethodApiEndPoint = "bx_block_menu_ordering/notary_requests/all_notarisation_method";
exports.userNotaryRequestApiEndPoint = "bx_block_menu_ordering/notary_requests";
exports.sucessMsgHeading = "Notary Request created Successfully";
exports.updatedMsgHeading = "Notary Request updated Successfully";
exports.sucessMsgDetail = "you can check your notary request status in notaries section.";
exports.requestCountApiEndPoint = "bx_block_menu_ordering/notary_requests/request_counts";
exports.requestCountDetailApiEndPoint = "bx_block_menu_ordering/notary_requests/request_counts_details";
exports.emptyRequestMsg = "No requests yet!";
exports.errorOfServiceEmpty = "Choose type of notary service";
exports.errorOfNotarisationEmpty = "Choose method of notarisation";
exports.errorOfDataAndTimeEmpty = "Choose date & time";
exports.errorOfJurisdictionEmpty = "Choose your Jurisdiction";
exports.errorOfChooseDocNoEmpty = "Choose no. of documents";
exports.errorOfInvalidFile = "Invalid file format, Choose another file."
exports.fileValidationMsg = "Please upload a file"
exports.nameOfRecipient = "Name of Recipient";
exports.nameOfRecipientError = "Please enter valid recipient name";
exports.emailOfRecipient = "Email Address of Recipient";
exports.errorForValidEmail = "Please enter valid email";
exports.inviteClient = "Invite Client";
exports.viewClient = "View Invite";
exports.completeProfile = "Complete your Profile";
exports.toStart = "to start accepting request";
exports.newRequest = "New Requests";
exports.outgoingRequest = "Ongoing Orders";
exports.ongoingRequestEmptyMsg = "No ongoing orders yet!";
exports.modifyServiceTitle = "Modify your notary services";
exports.modifyServiceDes =  "The services you would like to provide";
exports.notaryOutgoingRequestApiEndpoint = "bx_block_menu_ordering/notary_requests/notary_ongoing_request";
exports.newRequestApiEndPoint = "bx_block_menu_ordering/notary_requests/notary_new_request";
exports.jurisdictionsApiEndpoint = "bx_block_menu_ordering/notary_requests/all_jurisdictions";
exports.newInvitesDesc = "All the invites from notaries will appear here";
exports.newInvitesTitle = "New Invites";
exports.jurisdictionTitle = 'Choose your Jurisdiction';
exports.jurisdictionDes = 'Select the jurisdiction where you need a notary service.';

exports.notarisationTitle = 'Method of notarisation';
exports.notarisationDes = 'Select the Method of notarisation';

exports.servicesTitle = 'Type of notary service';
exports.servicesDes = 'Select the options that best describes your notary service.';
exports.notSelectedIsSignatoryErrorMsg = "Please select at least one document to signatory.";
exports.putApiRequestMethod = "PUT";
exports.cancelCofirmMsg = "Are you sure you want to Cancel the order?";
exports.deleteCofirmMsg = "Are you sure you want to Delete the order?";
exports.back = "Back";
exports.yesProceed = "Yes, proceed";
exports.chargeRequest = "Cancellation charges will be applied of ";
exports.cancellationApiFirstEndPoint = "bx_block_menu_ordering/notary_requests/";
exports.cancellationApiSecondEndPoint = "/cancellation_charges";
exports.cancelRequestApiEndpoint = "/cancel_end_user_notary_request";
exports.completeProfileEndPoint = "/bx_block_profile/complete_profile";
exports.availabilityEndPoint = 'bx_block_menu_ordering/menu_orderings/availability';

exports.contentTypeApplicationJson = "application/json";
exports.renotaryMeetingsEndPoint = 'bx_block_cfzoomintegration92/zoom_meetings/all_meetings?'

exports.appId = '6ec62ccf-db78-4fd1-b2c0-27dfd8f8d163'
exports.tenantID= 'a030d294-8100-43db-b85f-9c892fb439b0'
exports.redirectUrl = 'https://zoomnotary-401615-react.b401615.stage.eastus.az.svc.builder.ai'
exports.authorizationEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
exports.tokenEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
exports.appScopes = [
  'openid',
  'offline_access',
  'profile',
  'User.Read',
  'MailboxSettings.ReadWrite',
  'Calendars.ReadWrite',
  'Mail.Read',
  'Mail.ReadBasic',
  'Mail.ReadWrite',
  'Contacts.Read',
  'Directory.Read.All'
]
exports.googleEventEntPoint =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";
exports.googleCalendarIOSClientId =
  "649592030497-1p8g6ec1k5ssja8sqirs2du94cu6auno.apps.googleusercontent.com";
exports.googleCalendarAndroidClientId =
  "855520919327-cktsoaac70dtudhartgir8l26337lki1.apps.googleusercontent.com";
exports.googleCalendarClientId =
  "970345475312-klp702ahgsvvnt3eun75igej2ioq8cjj.apps.googleusercontent.com";
exports.googleCalendarScope = "https://www.googleapis.com/auth/calendar";

exports.endPoint = "bx_block_notifications/notifications?page=1";
exports.pageNoAndCount = "&per_page=25";
exports.countryCodeApiEndPoint = "bx_block_menu_ordering/country_codes";
exports.countryError = "Please select your country";
exports.postCodeError = "Enter the Post Code";
exports.cityError = "Enter your city name";
exports.addressOneError = "Enter your Address";
exports.mobileError = "Enter Your mobile number";
exports.emailError = "Enter Your email or  valid email address";
exports.userNameError = "Enter Your first and last name";
exports.guestCreateRequestApiEndpoint ="account_block/accounts/guest_user_notary_request";
exports.pageNoAndCount = "&per_page=25"
exports.errorOfMobileNo = "Enter mobile number";
exports.RequestListApiEndPoint = "bx_block_menu_ordering/notary_requests";
exports.onSaveDraftView ="bx_block_menu_ordering/notary_requests?is_draft=true";
exports.guestUserEmailValidateApiEndpoint = "account_block/accounts/validate_guest_email";
exports.alertMsgForEmailWhichAlreadyExits = "This email is already registered with us. Please login to continue.";
exports.userProfileApiEndPoint = "bx_block_profile/profiles/get_profile";
exports.userProfileInvite ="bx_block_menu_ordering/accept_invite_request";
exports.sucessMsg= "Request has been rejected successfully"
// Customizable Area End