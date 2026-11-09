Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.btnSignInleTitle = "Sign In";
exports.btnEmailListTitle = "Emails";
exports.btnContactListTitle = "Contacts";
exports.btnCalendarViewleTitle = "Events";
exports.userToken = "userTokenStored";
exports.refreshToken = "refreshTokenStored";
exports.expireTime = "expireTimeStored";
exports.InvalidAuthenticationTokenCode = 401;
exports.alertLabl = "Alert";
exports.alertSubLabel =
  "Your token has expired or you have not sign in yet. Please try to sign in";
exports.recommendations = "Recommendations";
exports.alertRecommend =
  "Please install the Outlook app for a better experience.";

exports.appId = "38905076-ae8e-4272-8b91-4ba401631ec2";
exports.redirectUrl = "graph-sample://react-native-auth/";
exports.authorizationEndpoint =
  "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
exports.tokenEndpoint =
  "https://login.microsoftonline.com/common/oauth2/v2.0/token";
exports.appScopes = [
  "openid",
  "offline_access",
  "profile",
  "User.Read",
  "MailboxSettings.ReadWrite",
  "Calendars.ReadWrite",
  "Mail.Read",
  "Mail.ReadBasic",
  "Mail.ReadWrite",
  "Contacts.Read",
  "Directory.Read.All",
];
// Customizable Area End
