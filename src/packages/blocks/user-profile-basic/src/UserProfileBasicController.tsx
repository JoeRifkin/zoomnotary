import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { Platform, BackHandler  } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { setStorageData } from "../../../framework/src/Utilities";

interface ProfilePhoto {
  url: string | null;
}

interface ProfileAttributes {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_phone_number: string;
  city: string;
  post_code: string;
  country_code: number;
  phone_number: number | null;
  email: string;
  activated: boolean;
  user_type: string;
  user_name: string | null;
  platform: string | null;
  rating: number;
  suspend_until: string | null;
  status: string;
  role_id: number;
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  age: number | null;
  country: string;
  address: string;
  address_line_2: string;
  contact_name: string;
  company_name: string;
  is_online: boolean;
  photo: ProfilePhoto;
  total_notaries: number;
  type: string;
}


// Interface for the Data object
interface DataProfile {
  id: string;
  type: string;
  attributes: ProfileAttributes;
}

// Interface for the entire ResponseJson object
interface ProfileResponse {
  data: DataProfile;
  errors?: { token: string }[];
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
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  currentCountryCode: any;
  data: any[];
  passwordHelperText: String;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;

  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;

  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;

  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;
  isEditModeActive: boolean,
  saveButtonDisable: boolean;
  addressFirst: any;
  addressSec: any;
  postCode: any;
  country: any;
  city: any;
  countryList: any;
  selectedCountry: any;
  selectedCountryCode: any;
  isOpenModel: boolean;
  imageSource: any;
  countryCode: any;
  fullPhoneNumber: any;
  userId: any;
  isDocSelectionModelOpen: boolean;
  isValidateField: boolean;
  isSucessMsgModel: boolean;
  getUserType: string;
  userDetail: ProfileAttributes | null;
  isCountryDropdownOpen: boolean
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileBasicController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  labelFirstName: string;
  lastName: string;
  labelArea: string;
  labelMobile: string;
  labelEmail: string;
  labelCurrentPassword: string;
  labelNewPassword: string;
  labelRePassword: string;
  btnTextCancelPasswordChange: string;
  btnTextSaveChanges: string;
  labelHeader: any;
  btnTextChangePassword: string;

  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  apiCallMessageUpdateProfileRequestId: any;
  validationApiCallId: string = "";
  apiChangePhoneValidation: any;
  registrationAndLoginType: string = "";
  getCountryApiCallId: string = "";
  authToken: any;
  uniqueSessionRequesterId: any;
  userProfileGetApiCallId: any;
  userAttr: any;
  backHandler: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
   
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      currentCountryCode: configJSON.hintCountryCode,
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,

      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,

      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",
      isEditModeActive: false,
      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,
      addressFirst:"",
      addressSec: "",
      postCode: "",
      country: "",
      city : "",
      countryList: undefined,
      selectedCountry: "",
      selectedCountryCode: "",
      isOpenModel: false,
      imageSource: null,
      countryCode: '+44',
      fullPhoneNumber: '',
      userId: null,
      isDocSelectionModelOpen: false,
      isValidateField: false,
      isSucessMsgModel: false,
      getUserType: '',
      userDetail: null,
      isCountryDropdownOpen: false
    };

    this.arrayholder = [];
    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");

    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelArea = configJSON.labelArea;
    this.labelMobile = configJSON.labelMobile;
    this.labelEmail = configJSON.labelEmail;
    this.labelCurrentPassword = configJSON.labelCurrentPassword;
    this.labelNewPassword = configJSON.labelNewPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.btnTextCancelPasswordChange = configJSON.btnTextCancelPasswordChange;
    this.btnTextSaveChanges = configJSON.btnTextSaveChanges;
    this.labelHeader = configJSON.labelHeader;
    this.btnTextChangePassword = configJSON.btnTextChangePassword;
    this.handleBackPress = this.handleBackPress.bind(this);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    const handlers = {
      [this.userProfileGetApiCallId]: this.handleUserProfileResponse,
      [this.apiCallMessageUpdateProfileRequestId]: this.handleChangeProfileResponse,
      [this.getCountryApiCallId]: this.handleCountryResponse
    };
    
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      
      if (apiRequestCallId && responseJson && handlers[apiRequestCallId]) {
        handlers[apiRequestCallId].call(this, responseJson, errorReponse);
      }
    } else if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      this.handleSessionResponse(message);
    }

    // Customizable Area End
  }

  validateMobileAndThenUpdateUserProfile() {
    let countryCode: any = this.state.currentCountryCode;
    let mobileNo: any = this.state.phoneNumber;

    let error: any = "";

    error = this.validateCountryCodeAndPhoneNumber(countryCode, mobileNo);

    if (error) {
      this.showAlert(configJSON.errorTitle, error);

      return;
    }

    if (this.userAttr) {
      const countryCodeOld = this.userAttr.country_code;
      const mobileNoOld = this.userAttr.phone_number;

      if (
        Number.parseInt(countryCode) === Number.parseInt(countryCodeOld) ||
        countryCode === configJSON.hintCountryCode
      ) {
        countryCode = null;
      }

      if (
        Number.parseInt(this.state.phoneNumber) === Number.parseInt(mobileNoOld)
      ) {
        mobileNo = null;
      }
    }

    if (mobileNo && countryCode) {
      this.validateMobileOnServer(
        this.state.currentCountryCode,
        this.state.phoneNumber
      );
    } else {
      this.validateAndUpdateProfile();
    }
  }

  validateEmail(email: string) {
    let error = null;

    if (!this.isValidEmail(email)) {
      error = configJSON.errorEmailNotValid;
    }

    return error;
  }

  validateLastName(lastName: String) {
    return !this.isNonNullAndEmpty(lastName)
      ? "Last name " + configJSON.errorBlankField
      : null;
  }

  validateFirstName(firstName: String) {
    return !this.isNonNullAndEmpty(firstName)
      ? "First name " + configJSON.errorBlankField
      : null;
  }

  validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
    let error = null;

    if (this.isNonNullAndEmpty(phoneNumber)) {
      if (
        !this.isNonNullAndEmpty(String(countryCode)) ||
        configJSON.hintCountryCode === countryCode
      ) {
        error = configJSON.errorCountryCodeNotSelected;
      }
    } else if (
      this.isNonNullAndEmpty(countryCode) &&
      configJSON.hintCountryCode !== countryCode
    ) {
      if (!this.isNonNullAndEmpty(phoneNumber)) {
        error = "Phone " + configJSON.errorBlankField;
      }
    }

    return error;
  }

  validateAndUpdateProfile() {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let countryCode: any = this.state.currentCountryCode;

    let mobileNo = this.state.phoneNumber;
    let email = this.state.email;

    let currentPwd = this.state.currentPasswordText;
    let newPwd = this.state.newPasswordText;
    let reTypePwd = this.state.reTypePasswordText;

    const errorFirstName = this.validateFirstName(firstName);
    const errorLastName = this.validateLastName(lastName);

    const errorMobileNo = this.validateCountryCodeAndPhoneNumber(
      countryCode,
      mobileNo
    );
    const errorEmail = this.validateEmail(email);

    const errorCurrentPwd = this.validateCurrentPwd(currentPwd);
    const errorNewPwd = this.validatePassword(newPwd);
    const errorRetypePwd = this.validateRePassword(reTypePwd);

    let isValidForSignUp: boolean = true;

    if (errorFirstName != null) {
      this.showAlert(configJSON.errorTitle, errorFirstName);
      return false;
    } else if (errorLastName != null) {
      this.showAlert(configJSON.errorTitle, errorLastName);
      return false;
    }

    if (configJSON.ACCOUNT_TYPE_EMAIL === this.registrationAndLoginType) {
      if (errorMobileNo !== null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);
        return false;
      }
    } else if (
      configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType
    ) {
      if (errorMobileNo != null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);
        return false;
      }
    } else if (
      configJSON.ACCOUNT_TYPE_PHONE === this.registrationAndLoginType
    ) {
      if (errorEmail != null) {
        this.showAlert(configJSON.errorTitle, errorEmail);

        return false;
      }
    } else {
      if (errorMobileNo != null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);

        return false;
      } else if (errorEmail != null) {
        this.showAlert(configJSON.errorTitle, errorEmail);

        return false;
      }
    }

    if (
      configJSON.ACCOUNT_TYPE_SOCIAL !== this.registrationAndLoginType &&
      this.state.llDoChangePwdContainerVisible
    ) {
      if (errorCurrentPwd != null) {
        this.showAlert(configJSON.errorTitle, errorCurrentPwd);
        return false;
      } else if (errorNewPwd != null) {
        this.showAlert(configJSON.errorTitle, errorNewPwd);
        return false;
      } else if (errorRetypePwd != null) {
        this.showAlert(configJSON.errorTitle, errorRetypePwd);
        return false;
      } else if (newPwd !== reTypePwd) {
        this.showAlert(
          configJSON.errorTitle,
          configJSON.errorBothPasswordsNotSame
        );
        return false;
      } else if (currentPwd === newPwd) {
        this.showAlert(
          configJSON.errorTitle,
          configJSON.errorCurrentNewPasswordMatch
        );
        return false;
      }
    }

    //Call update API
    if (this.userAttr) {
      let firstNameOld = this.userAttr.first_name;
      let lastNameOld = this.userAttr.last_name;
      let countryCodeOld = this.userAttr.country_code + "";
      let mobileNoOld = this.userAttr.phone_number + "";
      let emailOld = this.userAttr.email;
      this.registrationAndLoginType = this.userAttr.type;

      if (this.isNonNullAndEmpty(firstName) && firstName === firstNameOld) {
        firstName = null;
      }

      if (this.isNonNullAndEmpty(lastName) && lastName === lastNameOld) {
        lastName = null;
      }

      if (
        this.isNonNullAndEmpty(countryCode) &&
        countryCode === countryCodeOld
      ) {
        countryCode = null;
      }

      if (this.isNonNullAndEmpty(mobileNo) && mobileNo === mobileNoOld) {
        mobileNo = null;
      }

      if (countryCode != null || mobileNo != null) {
        if (countryCode == null) {
          countryCode = countryCodeOld;
        }

        if (mobileNo == null) {
          mobileNo = mobileNoOld;
        }
      }

      if (this.isNonNullAndEmpty(email) && email === emailOld) {
        email = null;
      }
    }

    if (
      this.isNonNullAndEmpty(firstName) ||
      this.isNonNullAndEmpty(lastName) ||
      this.isNonNullAndEmpty(countryCode) ||
      this.isNonNullAndEmpty(mobileNo) ||
      this.isNonNullAndEmpty(email) ||
      (this.isNonNullAndEmpty(currentPwd) && this.isNonNullAndEmpty(newPwd))
    ) {
      const header = {
        "Content-Type": configJSON.contentTypeApiUpdateUser,
        token: this.authToken
      };

      let data: any = {
        first_name: this.state.firstName,
        last_name: this.state.lastName
      };

      if (this.state.edtMobileNoEnabled) {
        if (
          configJSON.hintCountryCode !== countryCode &&
          this.isNonNullAndEmpty(String(countryCode)) &&
          this.isNonNullAndEmpty(String(mobileNo))
        ) {
          data = {
            ...data,
            ...{ new_phone_number: String(countryCode) + String(mobileNo) }
          };
        }
      }

      if (this.isNonNullAndEmpty(email)) {
        data = { ...data, ...{ new_email: email } };
      }

      if (
        this.isNonNullAndEmpty(currentPwd) &&
        this.isNonNullAndEmpty(newPwd)
      ) {
        data = {
          ...data,
          ...{ current_password: currentPwd, new_password: newPwd }
        };
      }

      const httpBody = {
        data: data
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.apiCallMessageUpdateProfileRequestId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.apiEndPointUpdateUser
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiUpdateUserType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }

  validateCurrentPwd(currentPwd: any) {
    if (!this.isNonNullAndEmpty(currentPwd)) {
      return configJSON.errorCurrentPasswordNotValid;
    } else {
      return null;
    }
  }

  validatePassword(newPwd: any) {
    if (!this.passwordReg.test(newPwd)) {
      return configJSON.errorNewPasswordNotValid;
    } else {
      return null;
    }
  }

  validateRePassword(reTypePwd: any) {
    if (!this.passwordReg.test(reTypePwd)) {
      return configJSON.errorReTypePasswordNotValid;
    } else {
      return null;
    }
  }

  isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== null &&
      value !== "null" &&
      value.trim().length > 0
    );
  }

  validateMobileOnServer(countryCode: any, mobileNo: any) {
    const header = {
      "Content-Type": configJSON.contenttypeApiValidateMobileNo,
      token: this.authToken
    };

    const data = {
      new_phone_number: countryCode + mobileNo
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiChangePhoneValidation = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiValidateMobileNo
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.callTypeApiValidateMobileNo
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  enableDisableEditPassword(isEditable: boolean) {
    if (configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType) {
      this.setState({
        edtEmailEnabled: false,
        llDoChangePwdContainerVisible: false,
        llChangePwdDummyShowContainerVisible: false
      });
    } else {
      if (isEditable) {
        this.setState({
          llDoChangePwdContainerVisible: true,
          llChangePwdDummyShowContainerVisible: false
        });
      } else {
        this.setState({
          llDoChangePwdContainerVisible: false,
          llChangePwdDummyShowContainerVisible: true,
          currentPasswordText: "",
          newPasswordText: "",
          reTypePasswordText: ""
        });
      }
    }
  }

  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  requestSessionData() {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.uniqueSessionRequesterId = msg.messageId;
    this.send(msg);
  }

  getUserProfile() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUserProfile
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: this.authToken
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  // Customizable Area Start

  
  handleUserProfileResponse(responseJson: ProfileResponse, errorResponse: any) {
    if (this.isValidResponse(responseJson)) {
      const { data: { attributes } } = responseJson;
      this.updateInputFields(attributes);
      this.updateStateWithUserProfile(attributes);
      this.registrationAndLoginType = attributes.type;
    } else {
      this.handleErrorResponse(responseJson);
    }
  
    this.parseApiCatchErrorResponse(errorResponse);
  }
  
  isValidResponse(responseJson: ProfileResponse) {
    return responseJson && !responseJson.errors && responseJson.data && responseJson.data.attributes;
  }
  
  updateInputFields(attributes: ProfileAttributes) {
    this.txtInputAddressFirstProps.value = attributes.address;
    this.txtInputAddressSecProps.value = attributes.address_line_2 !== 'null' ? attributes.address_line_2 : ''
    this.txtInputCityProps.value = attributes.city;
    this.txtInputPostProps.value = attributes.post_code;
  }
  
  updateStateWithUserProfile(attributes: ProfileAttributes) {
    this.setState({
      email: attributes.email,
      firstName: attributes.full_name,
      lastName: attributes.company_name,
      phoneNumber: attributes.phone_number !== null ? attributes.phone_number.toString() : "",
      selectedCountry: attributes.country ? {label: attributes.country, value: attributes.country} : "",
      addressFirst: attributes.address,
      addressSec: attributes.address_line_2 !== 'null' ? attributes.address_line_2 : '',
      imageSource: attributes.photo.url !== null ? attributes.photo : null,
      fullPhoneNumber: attributes.full_phone_number,
      selectedCountryCode: attributes.country_code !== null ? "+" + attributes.country_code.toString() : "",
      userId: attributes.id,
      city: attributes.city,
      postCode: attributes.post_code,
      userDetail: attributes,
    });
  }
  
  handleErrorResponse(responseJson: ProfileResponse) {
    if (responseJson.errors && responseJson.errors.length > 0 && responseJson.errors[0].token) {
      this.showAlert("Session Expired", "Please Log in again.");
    } else {
      this.parseApiErrorResponse(responseJson);
    }
  }
  
  
  async handleChangeProfileResponse(responseJson: any) {
    if (responseJson != null && responseJson.errors === undefined) {
      await setStorageData("userProfileData", JSON.stringify(responseJson.data.attributes))
      this.setState({ isEditModeActive: false, isOpenModel: false }, () => {
        this.getUserProfileDetail();
        this.setState({isSucessMsgModel: true})
        setTimeout(() => {
          this.closeSucessMsgModel()
        }, 5000);
      });
    } else {
      this.parseApiErrorResponse(responseJson);
    }
  }

  closeSucessMsgModel = () => {
    this.setState({isSucessMsgModel: false})
  }
  
  handleSessionResponse(message: Message) {
    const requesterId = message.getData(
      getName(MessageEnum.SessionRequestedBy)
    );
    if (requesterId === this.uniqueSessionRequesterId) {
      const sessionToken = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      this.authToken = sessionToken;
      this.getUserProfileDetail();
    }
  }
  
  getUserProfileDetail() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userProfileApiEndPoint
    );
    
    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: this.authToken
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  openToSelectImage = () => {
    this.setState({isDocSelectionModelOpen: true})
  }

  gotToEditUserProfile = {
    onPress:() => {
      this.editUserProfile()
    }
  }
  editUserProfile = () => {
    this.setState({isEditModeActive: true}, () => {
      this.getFormData()
      this.callApiForGetCountry()
    })
  }

  callApiForGetCountry(): boolean {
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCountryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCountryAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({})
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  handleCountryResponse = (responseJson: any) => {
    if (!responseJson.errors) {
      this.getCustmizeCountryList(responseJson.data);
    }
  }  

  getCustmizeCountryList = (country: any) => {
    const transformedData = country.map((item: any, index: number) => {
      return {
          label: item.attributes.name,
          value: item.attributes.name
      };
    });
    this.setState({countryList: transformedData})
  }

  noToChanges = {
    onPress: () => {
      this.cancelChanges()
    }
  }

  cancelChanges = () => {
    this.setState({isOpenModel: false})
  }

  yesProceedToChanges = {
    onPress: () => {
      this.callApiToSaveChanges()
    }
  }

  callApiToSaveChanges(): boolean {

    const header = {
      token: this.authToken
    };
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCallMessageUpdateProfileRequestId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.saveChangeEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      this.getFormData()
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiUpdateUserType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true
  }

  getFormData = () => {
    const formData = new FormData();
    formData.append('profile[address]', this.state.addressFirst);
    formData.append('profile[address_line_2]', this.state.addressSec);
    formData.append('profile[company_name]', this.state.lastName);
    formData.append('profile[contact_name]', this.state.firstName);
    formData.append('profile[country]', this.state.selectedCountry ? this.state.selectedCountry.value : this.state.country);
    formData.append('profile[country_code]', this.state.selectedCountryCode);
    formData.append('profile[email]', this.state.email);
    formData.append('profile[full_name]', this.state.firstName);
    formData.append('profile[full_phone_number]', this.state.selectedCountryCode+this.state.phoneNumber);
    formData.append('profile[phone_number]', this.state.phoneNumber);
    formData.append('profile[city]', this.state.city);
    formData.append('profile[post_code]', this.state.postCode);

    const imgUri = this.state.imageSource?.path?.replace('file://', ''); // Remove 'file://' prefix
    const fileExtension = imgUri?.split('.').pop();
    const fileName = `profile.${fileExtension}`;
    let imagetoPost: any = {
      uri: Platform.OS === 'android' ? 'file://' + imgUri : imgUri as string,
      type: 'image/jpeg' ,
      name: fileName,
    }
    if(this.state.imageSource !== null && this.state.imageSource.path){
      formData.append('profile[photo]',  imagetoPost ? imagetoPost : '');
    }
 
    return formData
  } 

  checkMobileNumberMinLength = () => {
    if(this.state.phoneNumber.length >= 9 && /^\d*$/.test(this.state.phoneNumber)){
      return false
    } else {
      return true
    }
  }

  checkValidMobileNumber = () => {
    if(this.state.isValidateField && this.state.phoneNumber !== '' && (this.state.phoneNumber.length < 9 || !(/^\d*$/.test(this.state.phoneNumber)))){
      return true
    } else return false
  }

  checkForBusinessName = () => {
    if(this.isBusinessFieldVisible() && this.isStringNullOrBlank(this.state.lastName)){
      return true
    } else {
      return false
    }
  }

  confirmationForSaveChanges = {
    onPress:() => {
      const {firstName, email, phoneNumber, addressFirst, city, selectedCountry, postCode} = this.state;
      this.setState({isValidateField: true})
      if ( this.isStringNullOrBlank(firstName) ||
        this.isStringNullOrBlank(email) ||
        this.isStringNullOrBlank(phoneNumber) ||
        this.isStringNullOrBlank(city) ||
        selectedCountry === "" ||
        this.isStringNullOrBlank(postCode) ||
        this.isStringNullOrBlank(addressFirst) || 
        this.checkMobileNumberMinLength() ||
        this.checkForBusinessName()
      ) {
        return false;
      }
      this.setState({isValidateField: false})
      if(this.getSaveChangesButtonEnabled()){
        this.saveChangesUserProfile()
      } 
    }
  }

  getSaveChangesButtonEnabled = () => {
    const {firstName, email, phoneNumber, addressFirst, city, selectedCountry, postCode} = this.state;
    if(firstName !== '' && email !== '' && phoneNumber !== '' && addressFirst !== '' && city !== '' && selectedCountry !== '' && postCode !== ''){
      return true
    }else {
      return false
    }
  }

  saveChangesUserProfile = () => {
    this.setState({isOpenModel: true})
  }

  txtInputCountryPrpos = (value: string) => {
    this.setState({ selectedCountry: value });
  };

  txtInputCountryCodePrpos = (value: string) => {
    this.setState({ selectedCountryCode: value });
  }

  txtInputFirstNameProps =  {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });
    }

  };

  txtInputLastNameProps = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });
    }
  };

  txtInputCityProps = {
    value: '', 
    onChangeText: (text: string) => {
      this.setState({ city: text });
      this.txtInputCityProps.value = text;
    }
  };

  txtInputPhoneNumProps = {
    onChangeText: (text: string) => {
      this.setState({ phoneNumber: text });
    },
  }

  txtInputAddressFirstProps = {
    value: '', 
    onChangeText: (text: string) => {
      this.setState({ addressFirst: text });
      this.txtInputAddressFirstProps.value = text;
    }
  };

  txtInputAddressSecProps = {
    value: '', 
    onChangeText: (text: string) => {
      this.setState({ addressSec: text });
      this.txtInputAddressSecProps.value = text;
    }
  };

  txtInputPostCodeWebProps = {
    value: '', 
    onChangeText: (text: string) => {
      this.setState({ postCode: text });
      this.txtInputPostProps.value = text;
    }
  };

  txtInputPostCodeMobileProps = {
    ...this.txtInputPostCodeWebProps
  };

  txtInputPostProps = this.isPlatformWeb()
    ? this.txtInputPostCodeWebProps
    : this.txtInputPostCodeMobileProps;

  txtInputPhoneNumberlWebProps = {
    value:'',
    onChangeText: (text:string) => {
       if (this.txtInputPhoneNumberlWebProps.editable) {
        this.setState({ phoneNumber: text })
        this.txtInputPhoneNumberProps.value = text;
       }
    },
    editable: true
  };

  txtInputPhoneNumberlMobileProps = {
    ...this.txtInputPhoneNumberlWebProps,
    autoCompleteType:"tel",
    keyboardType: "phone-pad",
  };

  txtInputPhoneNumberProps = this.isPlatformWeb()
    ? this.txtInputPhoneNumberlWebProps
    : this.txtInputPhoneNumberlMobileProps;


    txtInputCountryCodeWebProps = {
     editable: false,
     value: '+44'
   };

    txtInputCountryCodeProps = {
      ...this.txtInputCountryCodeWebProps,
    }

  txtInputEmailMobileProps  = {
    editable: false,
  }

  txtInputEmailProps = this.txtInputEmailMobileProps;
  
  btnGoBack = {
    onPress: () => {
      this.handleBackPress()
    }
  }
  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  restUserDetail = (userDetail: ProfileAttributes) => {
    const {
      email,
      full_name,
      company_name,
      country_code,
      full_phone_number,
      address,
      country,
      photo,
      city,
      post_code,
      phone_number,
      address_line_2
    } = userDetail;

    this.txtInputAddressFirstProps.value = address || "";
    this.txtInputAddressSecProps.value = address_line_2 || "";
    this.txtInputCityProps.value = city || "";
    this.txtInputPostProps.value = post_code || "";

    this.setState({
      email,
      firstName: full_name,
      lastName: company_name,
      phoneNumber: phone_number ? phone_number.toString() : '',
      selectedCountry: country ? {value: country, label: country} : "",
      addressFirst: address,
      addressSec: address_line_2,
      imageSource: photo?.url || null,
      fullPhoneNumber: full_phone_number,
      selectedCountryCode: country_code ? `+${country_code}` : '',
      city,
      postCode: post_code,
      isEditModeActive: false,
      isValidateField: false
    });
  }

  handleBackPress = () => {
    const { userDetail, isEditModeActive } = this.state;
    if (isEditModeActive && userDetail) {
      this.restUserDetail(userDetail)
    } else {
      if (this.props.navigation?.goBack) {
        this.props.navigation.goBack();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }
    }
    return true;
  };
  

  openCamera = (type: string) => {
    if(type === 'Camera'){
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        this.setState({imageSource: image, isDocSelectionModelOpen: false})
      });
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then((image) => {
        this.setState({imageSource: image, isDocSelectionModelOpen: false})
      });
    }
  }

  closeModelOfDocument = () => {
    
    this.setState({isDocSelectionModelOpen: false})
  }

  isBusinessFieldVisible = () => {
    if(this.state.lastName !== null && this.state.lastName !== 'null'){
      return true
    } else {
      return false
    }
  }

  isErrorMesVisible = (value: string) => {
    if(this.state.isValidateField && this.isStringNullOrBlank(value)){
      return true
    } else { 
      return false 
    }
  }

  getUserProfleImage = () => {
    if(this.state.imageSource.path){
      return this.state.imageSource.path
    } else if(this.state.imageSource.url){
      return this.state.imageSource.url
    } else {
      return this.state.imageSource
    }
  }

  getBtnColorToEnable = () => {
    if(this.state.getUserType === 'end_user'){
      return 'btnDisableColorView'
    } else {
      return 'btnBackGColorView'
    }
  }

  getViewColorTodisable = () => {
    if(this.state.getUserType === 'end_user'){
      return 'btnDisableColorForTxt'
    } else {
      return 'btnBackGColorForTxt'
    }
  }

  openCountryDropdown = () => {
    this.setState({ isCountryDropdownOpen: true })
  }

  closeCountryDropdown = () => {
    this.setState({ isCountryDropdownOpen: false })
  }

  // Customizable Area End

}
