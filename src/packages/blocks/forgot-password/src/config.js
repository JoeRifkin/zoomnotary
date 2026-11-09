Object.defineProperty(exports, "__esModule", {
    value: true
  });

//APi Methods
exports.httpGetMethod = "GET";
exports.httpPostMethod =  "POST";

exports.profileValidationSettingsAPiEndPoint = "profile/validations";
exports.passwordRecoveryStartOtpAPiEndPoint = "forgot_password/otp"
exports.passwordRecoveryConfirmOtpAPiEndPoint = "otp_confirmation"
exports.passwordRecoveryChangePasswordAPiEndPoint = "forgot_password/password"
exports.forgotPasswordAPiContentType = "application/json";
exports.pleaseEnterAValidEmail = "Please enter a valid email";
exports.emailIsRequired = "Email is required";
exports.phoneNumberIsNotValid = "Phone number is not valid";
exports.phoneNumberIsRequired = "Phone number is required";
exports.otpCodeIsRequired = "Phone number is required";
exports.pleaseEnterAPassword = "Please enter a password";
exports.passwordMustBeAtLeast2Characters = "Password must be at least 2 characters";
exports.pleaseConfirmYourPassword = "Please confirm your password";
exports.passwordsMustMatch = "Passwords must match";
exports.invalidEmailAddress = "Invalid email address";
exports.invalidPassword = "Invalid password";
exports.goToOtpAfterPhoneValidationErrorTitle = "Error";
exports.goToOtpAfterPhoneValidationErrorBody = "Please select country code";

exports.labelTextIsAccountRecovery = "Account Recovery";
exports.secondLabelText = "Please choose what type of account you signed up with."
exports.thirdLabelText = "To Reset your password, please enter the email associated with your account.";
exports.forthLabelText = "We sent a confirmation code to the following email:";
exports.fifthLabelText = "To Reset your password, please enter the phone number associated with your account."
exports.sixthLabelText = "We sent a confirmation code to the following phone:"

exports.firstInputAutoCompleteType = "email";
exports.firstInputPlaceholder = "Email";
exports.firstInputKeyboardStyle = "email-address";
exports.firstInputErrorColor = "red";

exports.buttonTextIsNext = "Next";
exports.buttonColorForNextButton = "#6200EE";

exports.secondInputAutoCompleteType = "tel";
exports.secondInputKeyboardType= "phone-pad"
exports.secondInputPlaceholder = "Mobile"
exports.secondInputErrorColor = "red";

exports.thirdInputPlaceholder = "Enter OTP";
exports.thirdInputErrorColor = "red";

exports.buttonTitleIsSMSPhoneAccount = "SMS (Phone) Account";
exports.buttonTitleIsEmailAccount = "Email Account";

exports.labelTextIsPleaseEnterYourNewPassword = "Please enter your new password.";
exports.labelTextIsYourPasswordHasBeenSuccessfullyChanged = "Your password has been successfully changed";

exports.handled = "handled";

exports.placeholderIsReTypePassword = "Re-Type Password";

exports.buttonTitleIsOk = "Ok"
exports.buttonColorForOkButton = "#6200EE"; 

exports.placeholderIsPassword = "password";
exports.countryCodeSelectorPlaceholder = "Select Country";
// Customizable Area Start
exports.phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
exports.forgotPassTitle = "Forgot Password";
exports.desMsg =  "Enter your registered email to send a reset password link";
exports.emailPlaceholder = "Enter your email";
exports.btnText = "Next";
exports.backTO = "back to";
exports.logIn = "Log in";
exports.emailError = "Please enter your email";
exports.inCorrectEmailError = "Incorrect email";
exports.newPassTitle= "New Password";
exports.labelOfPass = "Password";
exports.passPlaceholder = "Enter your password";
exports.passErrorMsg = "Please enter your password";
exports.labelOfRePass = "Confirm Password";
exports.confirmPassPlaceholder = "Confirm your password";
exports.confirmPassError = "Please confirm your password";
exports.passValdationFirst = "Must be at least 8 characters or more.";
exports.passValdationSec = "Use a combination of uppercase and lowercase letters, numbers, and symbols (except symbols or characters with accents, like ñ or â)";
exports.passValdationThired = "Don't create a password beginning or ending with a blank space.";
exports.passValdationFourth = "Must be different from your last 12 passwords.";
exports.resetPass = "Reset password";
exports.inCorrectEmailError = "Incorrect email";
exports.passNotMatchError = "password didn’t match";
exports.errorPasswordNotValid = "Password not valid.";
exports.httpPutMethod =  "PUT";
exports.forgetPasswordApiEndpoint = '/bx_block_forgot_password/passwords';
exports.passchanged = "Password Changed";
exports.chnagedDetail = "You can browse application and create new notary request";
exports.login = "Login"
exports.sendOTPApiEndpoint = '/bx_block_forgot_password/otps';
exports.otpVerifyApiEndpoint = '/bx_block_forgot_password/otps/verify';
exports.validationApiContentType = "application/json";
exports.otpDes = 'Enter your OTP below, the code has been sent to your registered Email Address';
exports.resendText = 'Resend code?';
exports.otpSizeBox = 6;
// Customizable Area End