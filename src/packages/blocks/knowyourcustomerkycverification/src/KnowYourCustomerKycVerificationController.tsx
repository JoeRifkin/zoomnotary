// @ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
const RNFS = require('react-native-fs');
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as yuppp from "yup";
// Customizable Area Start
import {
  Onfido,
  OnfidoCaptureType,
} from "@onfido/react-native-sdk";
import { Platform,Alert } from "react-native";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import {
  imgUnChecked,
  imgChecked
} from "./assets";
interface KycDocument {
  country_name: string;
  created_at: string;
  document_type: string;
  id: number;
  number_of_sides: number;
  region_name: string;
  updated_at: string;
}

interface DocumentAttributes {
  id: number;
  country_name: string;
  region_name: string;
  document_type: string;
  number_of_sides: number;
}

interface DocumentDetails {
  data: {
    id: string;
    type: string;
    attributes: DocumentAttributes;
  };
}

interface RequestedKycDocument {
  id: number;
  onfido_id: number;
  status: string;
  document_details: DocumentDetails;
}

interface Attributes {
  id: number;
  document_type: any[]; // Adjust the type if needed
  onfido_applicant_id: string | null;
  onfido_check_id: string | null;
  onfido_report_id: any[]; // Adjust the type if needed
  kyc_status: string;
  reports_status: any[]; // Adjust the type if needed
  email: string | null;
  notary_request_id: number;
  workflow_id: string;
  requester_id: number;
  requested_kyc_documents: RequestedKycDocument[];
}

interface Data {
  id: string;
  type: string;
  attributes: Attributes;
}

interface OnfidoResponse {
  data: Data;
}

type ApiResponse = KycDocument | OnfidoResponse;
// Customizable Area End
export const configJSON = require("./config");
export interface Props {
  navigation: any;

  // Customizable Area Start
  requestId: string | undefined;
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  firstNameDefault: string;
  lastNameDefault: string;
  middleNameDefault: string;
  emailStateDefault: string;
  nationalityDefault: string;
  dateOfBirth: string;
  phoneNumber: string;
  workflow_id: string;
  userType: string;
  kycDocumentList: KycDocument[];
  selectedRadioBtn: string;
  selectedDocument: number[];
  isLoader: boolean;
  notaryRequestId: string;
  createdKycResponse: OnfidoResponse | null
  token: string;
  // Customizable Area End
}
interface SS {
  // Customizable Area Start

  // Customizable Area End
}
export default class KnowYourCustomerKycVerificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  getVerifyIndentitycallID: string = '';
  getCreateaccountCallID: string = '';
  getreportCallID: string = '';
  // Customizable Area Start
  apiGetKycRequestCallId: string = "";
  apiGetKycDocumentCallId: string = "";
  apiKycCreateCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
      // Customizable Area Start
      , getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];
    this.state = {
      // Customizable Area Start
      firstNameDefault: "",
      lastNameDefault: "",
      middleNameDefault: "",
      emailStateDefault: "",
      nationalityDefault: "",
      dateOfBirth: "",
      phoneNumber: "",
      workflow_id: "b42cf165-031f-4792-a57e-eea4fa10c4e2",
      userType: "",
      kycDocumentList: [],
      selectedRadioBtn: '',
      selectedDocument: [],
      isLoader: false,
      notaryRequestId: '',
      createdKycResponse: null,
      token: ''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }
  async receive(from: string, message: Message)//istanbul ignore next
  {
    // Customizable Area Start

    this.showSessionStoredData(message)
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id)//istanbul ignore next
    {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId != null && apiRequestCallId === this.getCreateaccountCallID && !responseJson.error)//istanbul ignore next 
      {
        await setStorageData("AppicantId", responseJson.id)
        await setStorageData("ReportID", responseJson.id)
        this.onfidouserdeta()
      }
      if (apiRequestCallId != null && apiRequestCallId === this.getVerifyIndentitycallID && responseJson)//istanbul ignore next
      {
        this.startSDK(responseJson.token)
      }
      if (apiRequestCallId != null && apiRequestCallId === this.getreportCallID && responseJson)//istanbul ignore next
      {
        this.props.navigation.navigate("KnowYourCustomerKycVerificationAccount")
      }
      this.manageResponse(apiRequestCallId, responseJson)
    }
  }

  startSDK(responseJson: string) {
    Onfido?.start({
      sdkToken: responseJson,
      flowSteps: {
        welcome: true,
        userConsent: true,
        captureDocument: {
        },
        captureFace: {
          type: OnfidoCaptureType.PHOTO
        },
        enableNFC: false
      }
    })
      ?.then((response: string) => { this.onreportApi() })
      .catch((error: string) => { })
  }

  signupValidationSchema = () => {
    return yuppp.object().shape({
      firstNameDefault: yuppp.string().required("Please, Enter your firstNameDefault!"),
      lastNameDefault: yuppp.string().required("Please, Enter your lastNameDefault!"),
      middleNameDefault: yuppp.string().required("Please, Enter your middleNameDefault!"),
      emailStateDefault: yuppp
        .string()
        .required("Please, provide your email")
        .email("Please enter valid email"),
      phoneNumber: yuppp
        .string()
        .required("Please, provide your mobile number"),
      nationalityDefault: yuppp.string().required("Please, Enter your nationalityDefault!"),
      dateOfBirth: yuppp.string().required("Please, Enter your Date of Birth!"),
    })
  }
  onNavigationGobackscreen = () => {

    this.props.navigation.navigate("KnowYourCustomerKycVerification")
  }

  createAccount = async (values: { firstNameDefault: string; lastNameDefault: string; middleNameDefault: string; emailStateDefault: string; nationalityDefault: string; dateOfBirth: string; phoneNumber: string; }) => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const codedata = {
      first_name: values.firstNameDefault,
      last_name: values.lastNameDefault,
      middle_name: values.middleNameDefault,
      date_of_birth: values.dateOfBirth,
      nationalityDefault: values.nationalityDefault,
      phone_number: values.phoneNumber,
      email: values.emailStateDefault,
    }
    const httpBody = {
      data: codedata,
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage))
    this.getCreateaccountCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "https://datingappdemo-260453-ruby.b260453.dev.eastus.az.svc.builder.cafe//bx_block_knowyourcustomerkycverification2/applicant_create"

    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTAPiMethod
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  onfidouserdeta = async () => {
    const UserDataValidation = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getVerifyIndentitycallID = UserDataValidation.messageId;
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getonfidoApi
    )
    const headers = {
    }
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    )
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTAPiMethod
    )
    let APPID = Platform.OS == "ios" ? "DatingAppDemo" : "com.DatingAppDemo";
    let formdata = new FormData();
    const confidoId = await getStorageData('AppicantId');
    formdata.append("applicant_id", confidoId)
    formdata.append("application_id", APPID)
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    )
    runEngine.sendMessage(UserDataValidation.id, UserDataValidation);
  }

  onreportApi = async () => {
    const confidoId = await getStorageData('AppicantId');
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getreportCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),

      `https://datingappdemo-260453-ruby.b260453.dev.eastus.az.svc.builder.cafe/bx_block_knowyourcustomerkycverification2/retrieve_onfido_report?applicant_id=${confidoId}`
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GETApiMethod
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }
  // web events
  // Customizable Area Start

  showSessionStoredData = (message: Message) => {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      const userData = message.getData(getName(MessageEnum.SessionResponseData));
      const userRole = JSON.parse(userData);
      this.setState({ isLoader: true, notaryRequestId: this.props.requestId, token: token, workflow_id: "b42cf165-031f-4792-a57e-eea4fa10c4e2", userType: userRole.meta.role }, () => {
        this.getCallKycRequest()
      });
    }
  }

  manageResponse = (apiRequestCallId: string, responseJson: ApiResponse) => {
    const { apiGetKycRequestCallId, apiGetKycDocumentCallId, apiKycCreateCallId } = this;

    let newState = { isLoader: false };

    if (apiRequestCallId === apiGetKycRequestCallId || apiRequestCallId === apiKycCreateCallId) {
      newState.createdKycResponse = responseJson as OnfidoResponse;
    }

    if (apiRequestCallId === apiGetKycDocumentCallId) {
      newState.kycDocumentList = responseJson as KycDocument[];
    }

    this.setState(newState, () => {
      if (apiRequestCallId === apiGetKycRequestCallId) {
        this.getKycDocument();
      } else if (apiRequestCallId === apiKycCreateCallId) {
        this.getCallKycRequest();
      }
    });

  }

  componentDidMount = async () => {
    this.getToken();
  };

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  }

  getCallKycRequest(): boolean {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetKycRequestCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getKycRequestApiEndPoint + `${this.props.requestId}&workflow_id=${this.state.workflow_id}`
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

  getKycDocument(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetKycDocumentCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getKycDocumentApiEndpoint
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

  selectNotHaveRadio = {
    onPress: () => {
      this.setState({ selectedRadioBtn: 'deep' })
    }
  }

  selectHaveRadio = {
    onPress: () => {
      this.setState({ selectedRadioBtn: 'id' })
    }
  }

  clickOnSelect = (serviceId: number) => {
    const { selectedDocument } = this.state;
    const index = selectedDocument.indexOf(Number(serviceId));
    if (index !== -1) {
      const newArray = selectedDocument.filter((item: number) => item !== Number(serviceId));
      this.setState({
        selectedDocument: newArray,
        isAllServicesSelected: false
      });
    } else {
      this.setState((prevState) => ({
        selectedDocument: [...prevState.selectedDocument, Number(serviceId)],
      }));
    }
  }

  isSendRequestBtnDisbale = () => {
    if (this.state.selectedDocument.length > 0) {
      return true
    } else {
      return false
    }
  }

  btnSendRequestProps = {
    onPress: () => {
      if (this.isSendRequestBtnDisbale()) {
        this.setState({ isLoader: true }, () => {
          this.callSenRequest()
        })
      }
    }
  }

  callSenRequest(): boolean {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    }
    const payload = {
      workflow_id: this.state.workflow_id,
      notary_request_id: this.state.notaryRequestId,
      requested_kyc_documents: this.state.selectedDocument
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiKycCreateCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.kycCreateApiEndPoint
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
  removeSpacesFromImageName = (imageName: string) => {
    return imageName.replace(/(%20|\s+)/g, '_');
  }

  btnDownloadReportProps = (fileUrl) => ({
    onPress: () => {
      if(fileUrl){
        this.openFileUrlDownload(fileUrl)
      }
    }
  });

  openFileUrlDownload = async (fileUrl: string,) => {
    try {
      this.setState({ isLoader: true })
      const fileName = fileUrl.split('/').pop() || 'downloaded_file';
      let destinationPath = `${RNFS.DownloadDirectoryPath}/${this.removeSpacesFromImageName(fileName?fileName:"")}`
      const downloadResult = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: destinationPath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert("File downloaded successfully....")
        this.setState({ isLoader: false })
      }
    } catch (error:any ) {
      Alert.alert('Error during download or opening file:', error);
  
    };
  };
  btnVerifyNowProps = {
    onPress: () => {
      const messages: Message = new Message(
        getName(MessageEnum.NavigationKycVerificationAccountMessage)
      );
      const selectedRequest = {
        requestId: this.state.notaryRequestId,
        token: this.state.token,
        userType: this.state.userType,
        onfidoId: this.state.createdKycResponse?.data.id
      };
      messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
  }

  getImageCheckOrUnChekced = (isSelected: boolean) => {
    if (isSelected) {
      return imgChecked
    } else {
      return imgUnChecked
    }
  }

  applyStyleForCheckOrUnChekced = (isSelected: boolean) => {
    if (isSelected) {
      return 'radioLabelTxtselected'
    } else {
      return 'radioLabelTxt'
    }
  }

  statucCheckForView = (status: string) => {
    if (status === 'pending') {
      return 'inprogreeView'
    } else {
      return 'completeView'
    }
  }

  statucCheckForTxt = (status: string) => {
    if (status === 'pending') {
      return 'inprogreeTxt'
    } else {
      return 'completeTxt'
    }
  }

  getTxtForStatus = (status: string) => {
    if (status === 'pending') {
      return 'IN PROGRESS'
    } else if (status === 'verified') {
      return 'VERIFIED'
    } else {
      return 'COMPLETED'
    }
  }

  getMarTop = (value: string) => {
    if (value !== '') {
      return 'marTop20'
    } else {
      return 'marTop220'
    }
  }

  checkSelectedDocumnetValue = () => {
    if (this.state.selectedRadioBtn !== '') {
      return true
    } else {
      return false
    }
  }

  getTxtForStatusFirst = (status: string) => {
    if (status === 'pendingFirst') {
      return 'IN PROGRESSFirst'
    } else {
      return 'COMPLETEDFirst'
    }
  }

  getMarTopFirst = (value: string) => {
    if (value !== '') {
      return 'marTop20First'
    } else {
      return 'marTop220First'
    }
  }

  statucCheckForViewFirst = (status: string) => {
    if (status === 'pendingFirst') {
      return 'inprogreeViewFirst'
    } else {
      return 'completeViewFirst'
    }
  }

  statucCheckForTxtFirst = (status: string) => {
    if (status === 'pendingFirst') {
      return 'inprogreeTxtFirst'
    } else {
      return 'completeTxtFirst'
    }
  }

  isUserTypeNotary = () => {
    if (this.state.userType === 'notary') {
      return true
    } else {
      return false
    }
  }

  isUserTypeEndUser = () => {
    if (this.state.userType === 'enduser') {
      return true
    } else {
      return false
    }
  }

  showNotaryUserView = () => {
    let kycStatus = this.state.createdKycResponse?.data?.attributes?.kyc_status.toLowerCase()
    if (this.isUserTypeNotary() || kycStatus === 'verified') {
      return true
    } else {
      return false
    }
  }

  // Customizable Area End
}


