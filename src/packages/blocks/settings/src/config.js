Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";
exports.exampleAPiEndPoint = "EXAMPLE_URL";
exports.exampleAPiMethod = "POST";
exports.exampleApiContentType = "application/json";
exports.textInputPlaceHolder = "Enter Text";
exports.labelTitleText = "settings";
exports.labelBodyText = "settings Body";

exports.btnExampleTitle = "CLICK ME";

exports.payments = "Payments";
exports.changePassword = "Change Password";
exports.qualifiedSignature = "Qualified Signature";
exports.calendarSync = "Calendar Sync";
exports.vatSalesTax = "VAT (Sales Tax)";
exports.deleteAccount = "Delete Account";
exports.SettingsLabel = "Settings";

exports.valueAddedTaxVAT = "Value Added Tax (VAT)";
exports.vatValueDetail ="renotary collects VAT on transactions. We'll continue to collect taxes for now, but we'll stop collection after we confirm your valid VAT Number";
exports.checkBoxForVatDetail = "I agree to the providers terms of use and privacy policy and understand that the rights to use this product do not come from renotary";
exports.iDontHaveValueAdded = "I don’t have Value Added Tax (VAT)";
exports.iHaveValueAdded = "I have Value Added Tax (VAT)";
exports.textFieldLabel = "Value Added Tax (VAT) Number";
exports.textFieldPlaceholder = "Eg - GB123456789";
exports.addDetails ="Add Details";
exports.editDetails ="Edit Details";
exports.saveDetails = "Save Details";
exports.cancel = "Cancel";
exports.modify = "Modify";

exports.showVatTaxApiEndpoint = "bx_block_sales_tax/show";
exports.createUpdateVatTacApiEndpoint = "bx_block_sales_tax/create_update";
exports.stripeConnectEndpoint = "/bx_block_stripe_integration/stripe_connect";
exports.stripeDisconnectEndpoint = "/bx_block_stripe_integration/stripe_disconnect";
exports.POST = "POST";
exports.PUT = "PUT";
exports.GET = "GET";
exports.DELETE = "DELETE";
exports.stripeConnectStatus = "bx_block_stripe_integration/check_stripe_setup";
exports.contentTypeApplicationJson = "application/json";
exports.labelOfPass = "New Password";
exports.labelOfRePass = "Confirm new password";
exports.passPlaceholder = "Enter your password";
exports.confirmPassPlaceholder = "Confirm your password";
exports.passErrorMsg = "Please enter your password";
exports.confirmPassError = "Please confirm your password";
exports.errorPasswordNotValid = "Password not valid.";
exports.passNotMatchError = "password didn’t match";
exports.passValdationFirst = "Must be at least 8 characters or more.";
exports.passValdationSec = "Use a combination of uppercase and lowercase letters, numbers, and symbols (except symbols or characters with accents, like ñ or â)";
exports.passValdationThired = "Don't create a password beginning or ending with a blank space.";
exports.passValdationFourth = "Must be different from your last 3 passwords.";

exports.viewHistoryEndpoint = 'bx_block_profile/verify_password_history?new_password='
exports.changePasswordEndpoint = 'bx_block_profile/change_password'
exports.vatMinValueErrorMsg = "Invalid Sales Tax Number: The entered sales tax number does not comply with the required format";
exports.idonthaveVat= "I don’t have a VAT number";
exports.ihaveVat= "I have a VAT number";
exports.vATInformation = "VAT Information";
exports.sucessMsg = "VAT (sales tax) Updated";
exports.VatNumber = "VAT Number :  ";
exports.spaceErrorMsg = "VAT number should contain only letters and numbers."
exports.loginAPiEndPoint = "login/login";
exports.loginAPiMethod = "POST";
exports.loginApiContentType = "application/json";
exports.deleteAccountAPiEndPoint = "account_block/accounts/delete_account"; 

exports.googleCalendarIOSClientId =
  "649592030497-1p8g6ec1k5ssja8sqirs2du94cu6auno.apps.googleusercontent.com";
exports.googleCalendarAndroidClientId =
  "855520919327-cktsoaac70dtudhartgir8l26337lki1.apps.googleusercontent.com";
exports.googleCalendarClientId =
  "970345475312-klp702ahgsvvnt3eun75igej2ioq8cjj.apps.googleusercontent.com";
exports.googleCalendarScope = "https://www.googleapis.com/auth/calendar";

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
// Customizable Area End