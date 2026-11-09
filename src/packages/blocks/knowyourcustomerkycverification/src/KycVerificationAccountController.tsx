import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import {Keyboard, Platform} from 'react-native';
import {
  Onfido,
  OnfidoCaptureType,
  OnfidoCountryCode,
  OnfidoDocumentType,
  OnfidoTheme,
} from '@onfido/react-native-sdk';

const countryCodeMap: { [key: string]: string } = {
  "Netherlands": "NLD",
  "Norway": "NOR",
  "India": "IND",
  "Germany": "DEU",
  "Finland": "FIN",
  "Czech Republic": "CZE",
  "France": "FRA"
};

const countryData = [
  {name: "Netherlands", code: "NLD"},
  {name: "Norway", code: "NOR"},
  {name: "India", code: "IND"},
  {name: "Germany", code: "DEU"},
  {name: "Finland", code: "FIN"},
  {name: "Czech Republic", code: "CZE"},
  {name: "France", code: "FRA"}
]
// Customizable Area Start

interface CountryListData {
  name: string;
  code: string;
}

interface CountryAttributes {
  name: string;
}

interface Country {
  id: string;
  type: string;
  attributes: CountryAttributes;
}

interface CountryResponse {
  data: Country[];
}
interface FilterCountry {
  label: string;
  value: string;
}

interface CountryCode {
  country_code: string;
  name: string;
  flag: string;
}

interface CountryCodeResponse {
  countries: CountryCode[];
}

interface ApplicatnMsgResponse {
  message: string
}

interface Address {
  flat_number: string;
  building_number: string;
  building_name: string;
  street: string;
  sub_street: string;
  town: string;
  state: string;
  postcode: string;
  country: string;
  line1: string;
  line2: string;
  line3: string;
}

interface IdNumber {
  value: string;
  state_code: string;
  type: string;
}

interface Applicant {
  id: string;
  created_at: string;
  sandbox: boolean;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  delete_at: string | null;
  href: string;
  address: Address;
  id_numbers: IdNumber[];
  phone_number: string;
  location: string | null;
}

interface Link {
  completed_redirect_url: string | null;
  expired_redirect_url: string | null;
  expires_at: string | null;
  language: string;
  url: string;
}

interface Workflow {
  applicant_id: string;
  created_at: string;
  customer_user_id: string;
  dashboard_url: string;
  error: string | null;
  id: string;
  link: Link;
  output: string | null;
  reasons: string[];
  sdk_token: string;
  status: string;
  tags: string[];
  updated_at: string;
  workflow_id: string;
  workflow_version_id: number;
}

interface ApplicatnCreateResponse {
  applicant: Applicant;
  workflow: Workflow;
  mobile_sdk_token: string;
}
interface MessageResponse {
  message: string;
}

interface ErrorMessage {
  message: string;
}

interface ErrorResponse {
  errors: ErrorMessage[];
}

type ApiResponse = MessageResponse | ErrorResponse | CountryCodeResponse | CountryResponse | ApplicatnMsgResponse | ApplicatnCreateResponse;
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
  token: string;
  userRoleType: string;
  stepsNo: number;
  isValidateField: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  selectedCountryCode: string;
  mobileNumber: string;
  email: string;
  dateOfBirth: string;
  stateCode: string;
  idNumber: string;
  addressFirst: string;
  addressSec: string;
  city: string;
  postCode: string;
  isLoader: boolean;
  notaryRequestId: string;
  countryList: FilterCountry[];
  countryDataList: FilterCountry[];
  countryCodeList: FilterCountry[];
  selectedIdType: string;
  requestId: string;
  isIdTypeDropDownOpen: boolean;
  selectedCountry: string;
  isCountryDropDownOpen: boolean;
  isDateOfBirthModelOpen: boolean;
  selectedDate: Date;
  onfidoId: string;
  applicantMsgRes: string;
  onfidoUrl: string;
  isOnfidoPageShow: boolean;
  isBirthDropDownOpen: boolean;
  onfidoSdkToken: string;
  onfidoSdkWorkflowRunId: string | null;
  onfidoApplicantId: string;
  withSDKButton: boolean;
  isKycSuccess: boolean;
  isKycFailure: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class QuoteManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getCountryApiCallId: string = "";
  getCountryCodeApiCallId: string = "";
  apiApplicantCreateCallId: string = "";
  getOnfidoSdkTokenApiCallId: string = "";
  getOnfidoWorkflowRunApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage)

      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      userRoleType: '',
      stepsNo: 1,
      isValidateField: false,
      firstName: '',
      middleName: '',
      lastName: '',
      selectedCountryCode: '+44',
      mobileNumber: '',
      email: '',
      dateOfBirth: '',
      stateCode: '',
      idNumber: '',
      addressFirst: '',
      addressSec: '',
      city: '',
      postCode: '',
      isLoader: false,
      notaryRequestId: '',
      countryList: [],
      countryDataList: [],
      countryCodeList: [],
      selectedIdType: '',
      requestId: '',
      isIdTypeDropDownOpen: false,
      selectedCountry: '',
      isCountryDropDownOpen: false,
      isDateOfBirthModelOpen: false,
      selectedDate: new Date(),
      onfidoId: '',
      applicantMsgRes: '',
      onfidoUrl: '',
      isOnfidoPageShow: false,
      isBirthDropDownOpen: false,
      onfidoSdkToken: "",
      onfidoSdkWorkflowRunId: null,
      onfidoApplicantId: "",
      withSDKButton: false,
      isKycSuccess: false,
      isKycFailure: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.showSessionStoredData(message)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );


      if (apiRequestCallId && responseJson) {
        this.manageApiResponse(responseJson, apiRequestCallId, message);
      }
    }
  }

  manageApiResponse = async (responseJson: ApiResponse, apiRequestCallId: string, message: Message) => {
    switch (apiRequestCallId) {
      case this.getCountryApiCallId:
        this.handleCountryResponse(responseJson as CountryResponse);
        break;
      case this.getCountryCodeApiCallId:
        this.handleCountryCodeResponse(responseJson as CountryCodeResponse);
        break;
      case this.apiApplicantCreateCallId:
        this.manageApplicantCreateResponse(responseJson);
        break;
      case this.getOnfidoSdkTokenApiCallId:
        this.handleOnfidoSdkTokenApiResponse(message);
        break;
      case this.getOnfidoWorkflowRunApiCallId:
        this.handleOnfidoWorkflowRunApiResponse(message);
        break;
      default:
        break;
    }
  }

  manageApplicantCreateResponse = (responseJson: ApiResponse) => {
    if ('applicant' in responseJson && 'workflow' in responseJson) {
      if(this.state.withSDKButton){
      //for ondifo sdk
      this.setState({ 
        onfidoApplicantId : responseJson.applicant.id,
        onfidoSdkToken: responseJson.mobile_sdk_token,
        onfidoSdkWorkflowRunId: responseJson.workflow.id,
        isLoader: false
      }, () => {
        // this.getOnfidoSdkToken();
        //start onfido sdk now As we have both sdk token and workflow run id available
        this.startOnfidoSDK();
      });
    }
    else{
      //normal webview flow
      this.setState({ onfidoUrl: responseJson.workflow.link.url, isOnfidoPageShow: true, isLoader: false});
    }
    } else if ('message' in responseJson) {
      this.setState({ applicantMsgRes: responseJson.message, isLoader: false });
    } else if ('errors' in responseJson) {
      this.setState({ applicantMsgRes: responseJson.errors[0].message, isLoader: false });
    }
  }

  showSessionStoredData = (message: Message) => {
    const myData = message.getData( 
      getName(MessageEnum.CustomDataMessage)
    );
    if (myData) {
      this.setState({countryList: this.getCustmizeCountryData(), onfidoId: myData.onfidoId, requestId: myData.requestId, token: myData.token, userRoleType: myData.userType }, () => {
        this.callApiForGetCountry()
      });
    }
  }

  getCustmizeCountryData = () => {
    const transformedData = countryData.map((item: CountryListData) => {
      return {
        label: item.name,
        value: item.name
      };
    });
    return transformedData
  }

  handleCountryResponse = (responseJson: CountryResponse) => {
    if (responseJson.data) {
      this.getCustmizeCountryList(responseJson.data);
    }
  }

  getCustmizeCountryList = (country: Country[]) => {
    const transformedData = country.map((item: Country) => {
      return {
        label: item.attributes.name,
        value: item.attributes.name
      };
    });
    this.setState({ countryDataList: transformedData }, () => {
      this.callApiForGetCountryCodeList()
    })
  }

  handleCountryCodeResponse = (responseJson: CountryCodeResponse) => {
    if (responseJson.countries) {
      const seenCountryCodes = new Set<string>();
      const uniqueCountries: CountryCode[] = [];

      responseJson.countries.forEach((country: CountryCode) => {
        if (!seenCountryCodes.has(country.country_code)) {
          seenCountryCodes.add(country.country_code);
          uniqueCountries.push(country);
        }
      });
      this.getCustmizeCountryCodeList(uniqueCountries)
    }
  }

  getCustmizeCountryCodeList = (uniqueCountries: CountryCode[]) => {
    const transformedData = uniqueCountries.map((item: CountryCode) => {
      return {
        label: "+" + item.country_code,
        value: "+" + item.country_code
      };
    });
    this.setState({ countryCodeList: transformedData })
  }

  btnGoBackProps = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    }
  }

  goToSteps = (stepNumber: number) => {
    let numberSteps = 1;
    if (stepNumber === 2) {
      return;
    }
    if (stepNumber === 3) {
      return;
    }
    numberSteps = stepNumber;
    this.setState({ stepsNo: numberSteps },);
  }

  isStringNullOrBlank = (str: string) => {
    return str === null || str.length === 0;
  }

  txtInputFirstNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });
    }
  };

  txtInputMiddleNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ middleName: text });
    }
  };

  txtInputLastNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });
    }
  };

  txtInputCountryCodePrpos = (value: string) => {
    this.setState({ selectedCountryCode: value });
  }

  txtInputPhoneNumProps = {
    onChangeText: (text: string) => {
      this.setState({ mobileNumber: text });
    },
  }

  validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
  }

  txtInputEmailMobilePrpos = {
    onChangeText: (text: string) => {
      this.setState({ email: text });
    }
  };

  selectIDTypeOption = (value: string) => {
    this.setState({ selectedIdType: value });
  };

  txtInputStateCodePrpos = {
    onChangeText: (text: string) => {
      this.setState({ stateCode: text });
    }
  };

  txtInputIdNumberPrpos = {
    onChangeText: (text: string) => {
      this.setState({ idNumber: text });
    }
  };

  txtInputAddressFirstProps = {
    onChangeText: (text: string) => {
      this.setState({ addressFirst: text });
    },
  }

  txtInputAddressSecProps = {
    onChangeText: (text: string) => {
      this.setState({ addressSec: text });
    },
  }

  txtInputCityProps = {
    onChangeText: (text: string) => {
      this.setState({ city: text });
    },
  }

  selectCountryOption = (value: string) => {
    this.setState({ selectedCountry: value });
  };

  txtInputPostCodeProps = {
    onChangeText: (text: string) => {
      this.setState({ postCode: text });
    },
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
      configJSON.GETApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  callApiForGetCountryCodeList(): boolean {

    const header = {
      token: this.state.token
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCountryCodeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.countryCodeApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GETApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  openDropdownOfBirth = () => {
    this.setState({ isBirthDropDownOpen: true })
  }

  closeDropDownOfBirth = () => {
    this.setState({ isBirthDropDownOpen: false })
  }

  openDropdownOfIdType = () => {
    this.setState({ isIdTypeDropDownOpen: true })
  }

  closeDropDownOfIdType = () => {
    this.setState({ isIdTypeDropDownOpen: false })
  }

  openDropdownOfCountry = () => {
    this.setState({ isCountryDropDownOpen: true })
  }

  closeDropDownOfCountry = () => {
    this.setState({ isCountryDropDownOpen: false })
  }

  getButtonEnabled = () => {
    const { firstName, lastName, email, addressFirst, city, selectedCountry, postCode } = this.state;
    if (firstName && lastName && email && addressFirst && city && selectedCountry && postCode && this.validateEmail(this.state.email)) {
      return true
    } else {
      return false
    }
  }

  btnNextProps = {
    onPress: () => {
      this.setState({ isValidateField: true })
      if (!this.getButtonEnabled()) {
        return false
      }
      this.setState({ isValidateField: false, isLoader: true }, () => {
        this.gotoNextStep();
      })
    }
  }

  convertToISOFormat = (): string => {
    const [day, month, year] = this.state.dateOfBirth.split('/'); 
    return `${year}-${month}-${day}`;
  };

  getCountryCode(countryName: string) {
    return countryCodeMap[countryName] || "IND";
  }

  gotoNextStep(): boolean {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    }
    const payload = {
      data: {
        first_name: this.state.firstName,
        middle_name: this.state.middleName,
        last_name: this.state.lastName,
        email: this.state.email,
        dob: this.convertToISOFormat(),
        id_numbers: [
          {
            type: this.state.selectedIdType,
            value: this.state.idNumber,
            state_code: this.state.stateCode
          }
        ],
        phone_number: this.state.selectedCountryCode + this.state.mobileNumber,
        consents: [
          {
            granted: false,
            name: "ssn_verification"
          },
          {
            granted: true,
            name: "phone_number_verification"
          }
        ],
        address: {
          country: this.getCountryCode(this.state.selectedCountry),
          postcode: this.state.postCode,
          flat_number: "",
          building_number: "",
          building_name: this.state.addressFirst,
          street: this.state.addressSec,
          sub_street: "",
          town: this.state.city,
          state: "",
          line1: this.state.addressFirst,
          line2: this.state.addressSec,
          line3: ""
        }
      },
      application_id: Platform.OS == "android" ? "com.ZoomNotary" : "ai.builder.ZoomNotary"
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiApplicantCreateCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.applicantCreateApiEndPoint + this.state.onfidoId
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  closeDateOfBirthSelectionModel = () => {
    this.setState({ isDateOfBirthModelOpen: false })
  }

  noToChanges = {
    onPress: () => {
      this.setState({ dateOfBirth: '', isDateOfBirthModelOpen: false })
    }
  }

  yesProceedToChanges = {
    onPress: () => {
      this.setState({ dateOfBirth: this.formatDate(), isDateOfBirthModelOpen: false })
    }
  }

  formatDate = (): string => {
    const day = String(this.state.selectedDate.getDate()).padStart(2, '0');
    const month = String(this.state.selectedDate.getMonth() + 1).padStart(2, '0');
    const year = this.state.selectedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  onSelectDateOfBirth = (dateTime: Date) => {
    this.setState({ selectedDate: dateTime });
  }

  getDateOfBirthSelectionModalOpen = () => {
    this.setState({ isDateOfBirthModelOpen: true });
  }

  getOnFocusProps = {
    onFocus: () => {
      Keyboard.dismiss();
      this.getDateOfBirthSelectionModalOpen()
    },
  }

  onClosePropsModel = {
    onClose: () => {
      this.closeDateOfBirthSelectionModel()
    }
  }

  handleTouchOutside = () => {
    Keyboard.dismiss();
  }

  renderUIStyleOfDateTime = () => {
    if (this.state.isBirthDropDownOpen) {
      return 'errorOfFieldView'
    } else {
      return 'textFieldBgView'
    }
  }

  startOnfidoSDK = () => {
    Onfido.start({
      sdkToken: this.state.onfidoSdkToken,
      //  workflowRunId should be provided if we need to integrate any workflow form onfido studio drag&drop else
      //  no need to add it if using custom api flow
      //  also flow steps will not work if providing workflowrunid
      workflowRunId: this.state.onfidoSdkWorkflowRunId ?? undefined,
      flowSteps: {
        welcome: true,
        captureFace: {
          type: OnfidoCaptureType.PHOTO,
        },
        captureDocument: {
          docType: OnfidoDocumentType.DRIVING_LICENCE,
          countryCode: OnfidoCountryCode.GBR,
        },
      },
      disableNFC: true,
      theme: OnfidoTheme.LIGHT
    })
      .then(res => {
        console.log('OnfidoSDK: Success:', JSON.stringify(res));
        this.setState({ withSDKButton: false, isKycSuccess: true });
      })
      .catch(err => {
        console.log('OnfidoSDK: Error:', err.code, err);
        this.setState({ withSDKButton: false , isKycFailure: true});
      })
  }

  handleOnfidoSdkTokenApiResponse = (message : Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    console.log("SDK Token Response" , JSON.stringify(responseJson, null, 2));

    if(responseJson.token){
     this.setState({onfidoSdkToken: responseJson.token});
     this.getOnfidoWorkflowRunId();
    }
    else{
      alert(responseJson.error.message);
    }
  }

  getOnfidoWorkflowRunId = () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    }
    const payload = {
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getOnfidoWorkflowRunApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOnfidoWorkflowRunApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  handleOnfidoWorkflowRunApiResponse = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    console.log("SDK WorkflowRun Response" , JSON.stringify(responseJson, null, 2));

    if (responseJson.id) {
      this.setState({ onfidoSdkWorkflowRunId: responseJson.id }, () => {
        //start onfido sdk now As we have both sdk token and workflow run id available
        this.startOnfidoSDK();
      });
    }
    else {
      alert(responseJson.error.message);
    }
  }

  btnSDKProps = {
    onPress: () => {
      this.setState({ withSDKButton: true });
      this.setState({ isValidateField: true })
      if (!this.getButtonEnabled()) {
        return false
      }
      this.setState({ isValidateField: false, isLoader: true }, () => {
        this.gotoNextStep();
      })
    }
  }

  btnHandleSuccess = {
    onPress: () => {
      this.setState({ isKycSuccess: false }, () => {
        this.redirectPageToDetailPage();
      })
    }
  }

  btnHandleError = {
    onPress: () => {
      this.setState({ isKycFailure: false });
    }
  }

  redirectPageToDetailPage = () => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationRequestDetailMessage)
    );
    const selectedRequest = {
      requestId: this.state.requestId,
      actionType: 'view'
    };
    msg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  // Customizable Area End
}
