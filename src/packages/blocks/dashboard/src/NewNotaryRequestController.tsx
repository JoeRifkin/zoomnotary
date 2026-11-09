import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { pick, types } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS, { readFile } from 'react-native-fs';
import {
  upArrowImg, downArrowBlackImg
} from "./assets";
import { createRef, RefObject } from 'react';
import {Keyboard, Platform, ScrollView} from 'react-native'
import moment from "moment";
interface NotarySucessMsg {
  message: string
}
interface DocumentView {
  id: number;
  name: string;
  path: string;
}

interface FileDetail {
  path: string;
}

interface DocumentDetail {
  fileDetail: FileDetail;
  recipients: Recipient[]
}

interface DocumentsObject {
  [key: string]: DocumentDetail[];
}

interface Recipient {
  id: number;
  created_at: string;
  updated_at: string;
  file_document_id: number;
  name: string;
  email: string;
  is_signatory: boolean;
}

interface FileDocument {
  doc_name: string | null;
  doc_file_url: string;
  signatory_count: number;
  recipients: Recipient[];
}

interface RecipientsDetail {
  id: number,
  created_at: string,
  updated_at: string,
  file_document_id: number,
  name: string,
  email: string,
  is_signatory: boolean
}
type RecipientArray = Recipient[];
type DocumentDetailArray = DocumentDetail[]
interface NotaryRequest {
  id: string;
  type: string;
  attributes: {
    status: string;
    notary_id: string | null;
    notary_service_type: number;
    priority: string;
    notarisation_method_id: number;
    jurisdiction_id: number;
    date: string;
    notes: string;
    notarised_document: number;
    timing_slot: string;
    juridiction: {
      id: number;
      jurisdiction: string;
      created_at: string;
      updated_at: string;
    };
    notarisation_method: {
      id: number;
      notarisation_method: string;
      created_at: string;
      updated_at: string;
    };
    notary_service_name: string;
    file_documents: {
      doc_name: string | null;
      doc_file_url: string;
      signatory_count: number;
      recipients: RecipientsDetail[];
    }[];
  };
  relationships: {
    jurisdiction: {
      data: {
        id: string;
        type: string;
      };
    };
    notary: {
      data: null | {
        id: string;
        type: string;
      };
    };
    notarisation_method: {
      data: {
        id: string;
        type: string;
      };
    };
    account: {
      data: {
        id: string;
        type: string;
      };
    };
  };
};

interface NotraryRequestDetail {
  data: NotaryRequest
}

const PRIORITY_COLORS: { [key: number]: string } = {
  0: "#D1FAE5",
  1: "#F59E0B",
  2: "#F87171",
  3: "#fff",
};

// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  token: string;
  loading: boolean;
  isNewNotaryRequest: boolean;
  stepsNo: number;
  servicesList: any;
  countryList: any;
  selectedService: any;
  selectedNotarisation: any;
  selectedJurisdiction: any;
  addNotes: string;
  noOfDocument: number;
  isModelOpen: boolean;
  markedDates: any
  selectedDayTime: string;
  selectedDay: string;
  dateAndTime: string;
  checkedFirstBox: boolean;
  checkedSecBox: boolean;
  documentList: any;
  recipients: any;
  isValidateField: boolean;
  documnetDetail: any;
  userID: any;
  notrizationList: any;
  isNewRequestCreated: boolean;
  isDraftCreated: boolean;
  isLoader: boolean;
  docValidationMsg: boolean;
  hasBlankObjectResult: boolean;
  isDocSelectionModelOpen: boolean;
  selectedDocument: any;
  isStepOneValidation: boolean;
  isStepSecValidatin: boolean;
  isStepThiredValidation: boolean;
  markedDateList: any;
  selectedMarkedDate: any;
  createNewNotaryFail: string;
  finalPayload: any;
  isDropdownOpen: boolean;
  isServiceDropdownOpen: boolean;
  isJuridactionDropdownOpen: boolean;
  toggledDocuments: { [key: string]: boolean };
  requestId: string;
  requestStatus: string;
  selectedRequestDetail: NotaryRequest | null;
  from_date: string;
  to_date:string;
  selectedMonth:string;
  notAvailable: boolean;
  isModalVisible:boolean
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class NewNotaryRequestController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getAllServicesApiCallId: any;
  getAllCountryListApiCallId: any;
  getNotrizationMethodApiCallId: any;
  createNewNotaryApiCallId: any;
  getAvailabilityApiCallId:string = '';
  apiDashboardItemCallId: string = "";
  viewsOfDocArray: any = [];
  selectedActionType: string = "";
  apiRequestDetailCallId: string = "";
  SaveDraftNotaryApiCallId:string="";
  scrollViewRef: RefObject<ScrollView> = createRef<ScrollView>();
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];
    this.state = {
      token: '',
      loading: false,
      isNewNotaryRequest: true,
      stepsNo: 1,
      servicesList: [],
      countryList: [],
      selectedService: null,
      selectedNotarisation: null,
      selectedJurisdiction: null,
      addNotes: '',
      noOfDocument: 0,
      isModelOpen: false,
      markedDates: null,
      selectedDayTime: '',
      selectedDay: '',
      dateAndTime: '',
      checkedFirstBox: false,
      checkedSecBox: false,
      documentList: [],
      recipients: [{ name: '', email: '', is_signatory: false }],
      isValidateField: false,
      documnetDetail: {},
      userID: null,
      notrizationList: [],
      isNewRequestCreated: false,
      isDraftCreated: false,
      isLoader: false,
      docValidationMsg: true,
      hasBlankObjectResult: false,
      isDocSelectionModelOpen: false,
      selectedDocument: null,
      isStepOneValidation: false,
      isStepSecValidatin: false,
      isStepThiredValidation: false,
      markedDateList: null,
      selectedMarkedDate: null,
      createNewNotaryFail: '',
      finalPayload: {},
      isDropdownOpen: false,
      isServiceDropdownOpen: false,
      isJuridactionDropdownOpen: false,
      toggledDocuments: {},
      requestId: "",
      requestStatus: "",
      selectedRequestDetail: null,
      from_date: moment().format('YYYY-MM-DD'),
      to_date: moment().endOf('month').format('YYYY-MM-DD'),
      selectedMonth: moment().format('YYYY-MM'), // Store the selected month in YYYY-MM format;
      notAvailable: false,
      isModalVisible:false

    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();

    // Customizable Area Start
    this.setState({ loading: true })
    this.getDashboardData();
    this.setInitialDates()
    // Customizable Area End
  }

  getToken = () => {
    const message: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  }

  getDashboardData(): boolean {
    // Customizable Area Start
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllServicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllServicesApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({})
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      this.handleSessionResponseMessage(message);
    } else if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayLoadMessage(message);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleRestAPIResponseMessage(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  setInitialDates = () => {
    const currentDate = moment();
    const from_date = currentDate.startOf('day').format('YYYY-MM-DD');
    const to_date = currentDate.endOf('month').format('YYYY-MM-DD');

    this.setState({ from_date, to_date }, () => {
      // Call the API on initial load
      this.getAvailabilityApi(from_date, to_date);
    });
  };


  handleSessionResponseMessage(message: Message) {
    const userData = message.getData(getName(MessageEnum.SessionResponseData));
    const userRole = JSON.parse(userData);
    this.setState({ userID: userRole.meta.id, token: userRole.meta.token });
  }

  handleNavigationPayLoadMessage(message: Message) {
    const myData = message.getData(getName(MessageEnum.CustomDataMessage));
    if (myData && myData.actionType) {
      this.selectedActionType = myData.actionType;
      this.getRequestDetail(myData.requestId);
    } else if(myData && myData.serviceId){
      this.getServiceTypeDetail(myData.serviceId, myData.serviceName)
    }
  }

  getServiceTypeDetail = (serviceId: string, serviceName: string) => {
    const service_type = {
      value: serviceId,
      label: serviceName
    };
    this.setState({selectedService: service_type})
  }

  handleRestAPIResponseMessage(message: Message) {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

    if (apiRequestCallId === this.getAllServicesApiCallId) {
      this.handleServiesApiData(responseJson);
    } else if (apiRequestCallId === this.getAllCountryListApiCallId) {
      this.handleJurisdictionsApiData(responseJson);
    } else if (apiRequestCallId === this.apiRequestDetailCallId) {
      this.handleRequestDetailApiData(responseJson.data);
    } else if (apiRequestCallId === this.createNewNotaryApiCallId) {
      this.handleCreateNewNotaryResponse(responseJson);
     } else if (apiRequestCallId === this.SaveDraftNotaryApiCallId) {
        this.handleCreateDaraftNotary(responseJson);
    } else if (apiRequestCallId === this.getNotrizationMethodApiCallId) {
      this.handleNotrizationApiResponse(responseJson);
    }else if (apiRequestCallId === this.getAvailabilityApiCallId) {
      this.handleAvailabilityResponse(responseJson);
    }
  }

  handleAvailabilityResponse = (res: { priority: number, date: string }[]) => {
    // Disable loader once the response is handled
    this.setState({ isLoader: false });
    // Initialize the date selection object with an index signature
    const dateSelection: {
      [key: string]: {
        selected: boolean;
        selectedColor: string;
        selectedTextColor: string;
        originalColor: string;
        notAvailable: boolean;
        disableTouchEvent?:boolean
      }
    } = {
      ...this.state.markedDates
    };
  
    // Loop through the response to extract the date and create date selection entries
    res?.length && res.forEach(item => {
      // Extract the YYYY-MM-DD part from the date string
      const dateKey = item.date.split('T')[0];
  
      // Add the selected properties to the dateSelection object
      dateSelection[dateKey] = {
        selected: true,
        selectedColor: moment().format('YYYY-MM-DD') === dateKey ? '#fff' : PRIORITY_COLORS[item.priority], // Gray for today
        selectedTextColor: moment().format('YYYY-MM-DD') === dateKey ? 'rgba(128, 128, 128, 0.4)' : '#000000', // Gray text for today
        originalColor: PRIORITY_COLORS[item.priority],
        notAvailable: item.priority === 3,
        disableTouchEvent: moment().format('YYYY-MM-DD') === dateKey, // Disable touch event if today
      };
      
    });
  
  
    // Optionally, you can set the dateSelection to the state or use it further
    this.setState({ markedDates:dateSelection, markedDateList : dateSelection});
  };
  
  

  handleCreateNewNotaryResponse(responseJson: NotarySucessMsg) {
    if (responseJson && responseJson.message) {
      this.setState({ isNewRequestCreated: true, isLoader: false }, () => {
        this.scrollToTop()
      });
    } else {
      this.setState({ isLoader: false });
    }
  }

  handleCreateDaraftNotary(responseJson: NotarySucessMsg) {
    if (responseJson && responseJson.message) {
      this.setState({ isNewRequestCreated: true, isLoader: false, isDraftCreated: true })
    } 
  }
  scrollToTop = () => {
    this.scrollViewRef?.current?.scrollTo({ y: 0, animated: false });
  };

  getRequestDetail(requestId: number): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiRequestDetailCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userNotaryRequestApiEndPoint + `/${requestId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

handleRequestDetailApiData = async (responseJson: NotaryRequest) => {
  try {
    const {
      notarised_document,
      file_documents,
      date,
      notes,
      status,
      timing_slot,
      notary_service_type,
      notary_service_name,
      notarisation_method,
      juridiction,
    } = responseJson.attributes;
    const service_type = {
      value: notary_service_type,
      label: notary_service_name,
    };

    const notarisation_type = {
        value: notarisation_method?.id,
        label: notarisation_method?.notarisation_method,
      };

    const juridiction_type = {
      value: juridiction?.id,
      label: juridiction?.jurisdiction,
    };

    this.viewsOfDocArray = Array.from({ length: notarised_document }, () => ({}));
    const documentsObject = file_documents.reduce((document: DocumentsObject, item: FileDocument, index: number) => {
      const docDetails = {
        path: item.doc_file_url,
      };
      this.viewsOfDocArray[index] = {
        ...docDetails,
        recipients: item.recipients
      };

      document[`document${index}`] = [
        {
          fileDetail: docDetails,
          recipients: item.recipients,
        },
      ];
      return document;
    }, {});

    const formattedDate = date ? new Date(date).toISOString().split("T")[0] : "";

    const value = formattedDate + " | " + timing_slot;

    this.setState(
      {
        noOfDocument: notarised_document,
        addNotes: notes,
        selectedJurisdiction: juridiction_type,
        selectedNotarisation: notarisation_type,
        selectedService: service_type,
        selectedDay: formattedDate ,
        documnetDetail: documentsObject,
        documentList: this.viewsOfDocArray,
        requestId: responseJson.id,
        requestStatus: status,
        selectedRequestDetail: responseJson,
        selectedDayTime: timing_slot ? timing_slot : "",
        dateAndTime: value,
        selectedMarkedDate: this.state.markedDates && this.state.markedDates[formattedDate],
      },
     
    );
  } catch (error) {
  }
};

  


  handleServiesApiData = (response: any) => {
    const extractedData = response.data.map((item: any) => ({
      label: item.attributes.service_name ? item.attributes.service_name : item.attributes.name,
      value: Number(item.id)
    }));
    this.setState({ servicesList: extractedData }, () => {
      if (this.state.notrizationList.length === 0 && this.state.token) {
        this.getNotariztionMethod()
      }
    })
  }

  handleJurisdictionsApiData = (response: any) => {
    const extractedData = response.map((item: any) => ({
      label: item.jurisdiction,
      value: Number(item.id)
    }));
    this.setState({ countryList: extractedData })
  }

  btnDashboardRedirect = {
    onPress: () => {
      const messages: Message = new Message(
        getName(MessageEnum.NavigationDashboardMessage)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
  }

  handleNotrizationApiResponse = (response: any) => {
    const extractedData = response.map((item: any) => ({
      label: item.notarisation_method,
      value: item.id
    }));
    this.setState({ notrizationList: extractedData }, () => {
      this.getCountryListData();
    })
  }

  getCountryListData(): boolean {
    // Customizable Area Start

    const header = {
      token: this.state.token
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllCountryListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.jurisdictionsApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  getNotariztionMethod(): boolean {
    // Customizable Area Start
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getNotrizationMethodApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.notrazationMethodApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  btnGoBack = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    }
  }

 
  btnNextStepsFirstProps = {
    onPress: () => {
      const { selectedService, selectedDay, selectedJurisdiction, selectedNotarisation, noOfDocument } = this.state;
      this.setState({ isStepOneValidation: true })
      if (selectedService === null ||
        selectedJurisdiction === null ||
        selectedNotarisation === null ||
        noOfDocument === 0 ||
        selectedDay === '') {
        return false;
      }
      this.setState({ isStepOneValidation: false })
      if (this.getFirstStepBtnEnabled()) {
        this.setState({ stepsNo: 2 }, () => {
          this.scrollToTop()
        })
      }
    }
  }

  renderErrorMsg = (item: DocumentView) => {
    if (this.state.isStepSecValidatin && this.state.docValidationMsg && (!item.name && !item.path)) {
      return true
    } else {
      return false
    }
  }

  btnNextStepsSecProps = {
    onPress: () => {
      this.setState({ isStepSecValidatin: true, docValidationMsg: true })
      if (!this.getenabledSecStepBtn()) {
        return false
      }
      this.setState({ isStepSecValidatin: false })
      if (this.getenabledSecStepBtn()) {
        let documentsObject: any = {};
        this.viewsOfDocArray.map((item: any, index: number) => {
          let docKey = `document${index}`;
          documentsObject[docKey] = [{
            fileDetail: item,
            recipients: item.recipients ? item.recipients : [{ email: "", name: "", is_signatory: false }] // Assuming isSignatory starts as false
          }];
          item.recipients = this.state.recipients;
        });
        this.setState({ stepsNo: 3, documnetDetail: documentsObject }, () => {
          this.scrollToTop()
        })
      }
    }
  }

  getSelectedFileName = (fileName: string) => {
    if (!fileName) {
      return ''; // Handle undefined case gracefully
    }
    const parts = fileName.split('/');
    const filenameWithExtension = parts[parts.length - 1];
    return filenameWithExtension
  }

  btnNextStepsThiredProps = {
    onPress: async () => {
      try {
        this.setState({ isStepThiredValidation: true });
        if (!this.getCreateRequestBtnEnabled()) {
          return false;
        }
        this.setState({ isStepThiredValidation: false });
        if (this.getCreateRequestBtnEnabled()) {
          const finalPayload = await this.getFormData();
          this.setState({ finalPayload }, () => {
            this.createNewNotary();
          });
        }
      } catch (error) {
      }
    }
  };


  createNewNotary(): boolean {
    this.setState({ isValidateField: true })
    if (!this.validateEmail(this.state.documnetDetail) || !this.validateisSignatory()) {
      return false;
    }

    this.setState({ isValidateField: false, isLoader: true })
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.dashboarContentType
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createNewNotaryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      this.selectedActionType === 'edit' ? configJSON.createNewNotaryApiEndPoint + `/${this.state.requestId}` : configJSON.createNewNotaryApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(this.state.finalPayload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      this.selectedActionType === 'edit' ? configJSON.putApiRequestMethod : configJSON.dashboardPostApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  onSaveDraftBtnProps = {
    onPress: () => {
      this.createDarftNewNotary();
    }
  }

  isShowSaveDraftOption = () => {
    if(this.selectedActionType === 'edit' || (
      this.state.selectedService === null && 
      this.state.selectedNotarisation === null && 
      this.state.selectedJurisdiction === null &&
      this.state.selectedDay === '' &&
      this.state.noOfDocument === 0 )){
      return true
    } else {
      return false
    }
  }

  onCloseSaveDraftPopup = {
    onPress: () => {
      this.setState({isModalVisible: false})
    }
  }

 createDarftNewNotary() {
    this.setState({ isValidateField: false, isLoader: true ,isModalVisible:false},()=>{
    let raw ={
    notary_service_type: this.state.selectedService?.value,
    notarisation_method_id: this.state.selectedNotarisation?.value,
    jurisdiction_id: this.state.selectedJurisdiction?.value,
    date: this.state.selectedDay,
    notes: this.state.addNotes,
    notarised_document: this.state.noOfDocument,
    timing_slot: this.state.selectedDayTime,
    priority: this.getPriority(),
  //file_documents_attributes: file_documents_attributes
    }

    const header = {
      token: this.state.token,
      "Content-Type": configJSON.dashboarContentType
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.SaveDraftNotaryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
       configJSON.onSaveDraftView 
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(raw)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
       configJSON.dashboardPostApiMethodType 
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  })
  }
  handleMonthChange = (newMonth: string) => {
    // Convert the newMonth from 'YYYY-MM-DD' to a Moment object
    const selectedDate = moment(newMonth);
  
    // Get the year and month from the selected date
    const yearMonth = selectedDate.format('YYYY-MM-DD'); // Format for checking marked dates
  
    // Create fromDate and toDate based on the selected month
    const from_date = selectedDate.startOf('month').format('YYYY-MM-DD');
    const to_date = selectedDate.endOf('month').format('YYYY-MM-DD');
  
    // Check if the selected month is before the current month
    const currentMonth = moment().startOf('month').format('YYYY-MM-DD'); // Current month
  
    if (selectedDate.isBefore(currentMonth, 'month')) {
      return; // Return early if the selected month is before the current month
    }
  
    // Check if the data for the selected month is already fetched
    if (this.state.markedDates && this.state.markedDates[yearMonth]) {
      // Data is already available, update the state without calling the API
      this.setState({ from_date, to_date, isLoader: false });
    } else {
      // Data not fetched yet, call the API
      this.setState({ isLoader: true, from_date, to_date }, () => {
        this.getAvailabilityApi(from_date, to_date);
      });
    }
  
    // Update the selected month in state
    this.setState({ selectedMonth: yearMonth });
  };
  


  getAvailabilityApi = (from_date: string, to_date:string) => {
    const params = `?from_date=${from_date}&to_date=${to_date}`;

    // Define headers for the API request
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.dashboarContentType
    };
  
    // Create a new request message for the API call
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getAvailabilityApiCallId = requestMessage.messageId;
  
    // Add endpoint and params to the request message
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.availabilityEndPoint + params
    );
  
    // Add headers to the request message
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
  
    // Add the request method to the request message
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
  
    // Send the API request
    runEngine.sendMessage(requestMessage.id, requestMessage);
  
    return true; // Return true to indicate the request was initiated
  };
  


  getFormData = async () => {
    try {
      const file_documents_attributes = await this.transformDynamicObject(this.state.documnetDetail);
      const payload = {
        notary_request: {
          notary_service_type: this.state.selectedService.value,
          notarisation_method_id: this.state.selectedNotarisation.value,
          jurisdiction_id: this.state.selectedJurisdiction.value,
          date: this.state.selectedDay,
          notes: this.state.addNotes,
          notarised_document: this.state.noOfDocument,
          timing_slot: this.state.selectedDayTime,
          priority: this.getPriority(),
          file_documents_attributes: file_documents_attributes
        }
      };
      return payload;
    } catch (error) {
      return null; // or throw error if necessary
    }
  };

  getPriority = () => {
    if(this.state.selectedMarkedDate && this.state.selectedMarkedDate.selectedColor){
      if (this.state.selectedMarkedDate.selectedColor === '#D1FAE5') {
        return 'Standard';
      } else if (this.state.selectedMarkedDate.selectedColor === '#FEF3C7') {
        return 'Priority';
      } else {
        return 'Super Priority';
      }
    } else {
      return ""
    }
    
  }

  transformDynamicObject = async (dynamicObject: any) => {
    const file_documents_attributes = await Promise.all(Object.keys(dynamicObject).map(async (objKey, index) => {
      const document = dynamicObject[objKey][0];
      let base64;
      if (document.fileDetail.size) {
        base64 = document.fileDetail.uri ? await this.convertToBase64(document.fileDetail.uri) : await RNFS.readFile(decodeURIComponent(document.fileDetail.path), 'base64');
      } else {
        base64 = document.fileDetail.path
      }
      const file = document.fileDetail.name ? document.fileDetail.name : this.getSelectedFileName(document.fileDetail.path)
      const recipients_attributes = document.recipients.map((recipient: any, indexNo: number) => ({
        name: recipient.name,
        email: recipient.email,
        is_signatory: recipient.is_signatory
      }));
      return {
        base64,
        file,
        recipients_attributes
      };
    }));
    return file_documents_attributes;
  };

  convertToBase64 = async (uriOfFile: any) => {
    try {
      const base64Data = await readFile(uriOfFile, 'base64');
      return base64Data;
    } catch (error) {
    }
  };

  handleRecipantsName = (text: string) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.\-\s]*$/;
    return usernameRegex.test(text);
  };

  isValidRecipientEmail = (email: any) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  validateRecipient = (recipient: Recipient) => {
    return recipient.name && recipient.email && this.handleRecipantsName(recipient.name);
  };
  
  validateRecipients = (recipients: RecipientArray) => {
    for (const recipient of recipients) {
      if (!this.validateRecipient(recipient)) {
        return false;
      }
    }
    return true;
  };
  
  validateDocument = (document: DocumentDetailArray) => {
    for (const docData of document) {
      if (!this.validateRecipients(docData.recipients)) {
        return false;
      }
    }
    return true;
  };
  
  validateObject = (objData: DocumentsObject) => {
    for (const objKey in objData) {
      if (objData.hasOwnProperty(objKey)) {
        if (!this.validateDocument(objData[objKey])) {
          return false;
        }
      }
    }
    return true;
  };
  

  validateEmail = (objData: any) => {
    for (const objkey in objData) {
      if (objData.hasOwnProperty(objkey)) {
        const document = objData[objkey];
        for (let first = 0; first < document.length; first++) {
          const recipients = document[first].recipients;

          for (let second = 0; second < recipients.length; second++) {
            const recipient = recipients[second];
            if (!this.isValidRecipientEmail(recipient.email)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  validateisSignatory = (): boolean => {
    for (const docKey in this.state.documnetDetail) {
      if (this.state.documnetDetail.hasOwnProperty(docKey)) {
        const docArray = this.state.documnetDetail[docKey];
        if (!Array.isArray(docArray) || docArray.length === 0) {
          return false;
        }
        const hasSignatoryInCurrentDocument = docArray.some(docDetail =>
          Array.isArray(docDetail.recipients) &&
          docDetail.recipients.some((recipient: any) => recipient.is_signatory)
        );

        if (!hasSignatoryInCurrentDocument) {
          return false;
        }
      }
    }
    return true;
  }

  checkIsSignatoryForSingleDocument = (objData: any) => {
    for (const docDetail of objData) {
      if (docDetail.is_signatory === true) {
        return true;
      }
    }
    return false;
  }

  getCreateRequestBtnEnabled = () => {
    return this.validateObject(this.state.documnetDetail);
  };


  changeRecipientEmail = (selectedParticipants: any, reciptIndex: number, event: string) => {
    let editableData = this.state.documnetDetail[selectedParticipants];
    editableData[0].recipients[reciptIndex].email = event;
    let changeInEmail = this.state.documnetDetail;
    changeInEmail[selectedParticipants] = editableData;
    this.setState({ documentList: this.viewsOfDocArray, documnetDetail: changeInEmail })
  }

  changeRecipientSignatoryValue = (selectedParticipants: any, reciptIndex: number) => {
    let editableData = this.state.documnetDetail[selectedParticipants];
    editableData[0].recipients[reciptIndex].is_signatory = !editableData[0].recipients[reciptIndex].is_signatory;
    let changeInEmail = this.state.documnetDetail;
    changeInEmail[selectedParticipants] = editableData;
    this.setState({ documentList: this.viewsOfDocArray, documnetDetail: changeInEmail })
  }

  changeRecipientName = (selectedParticipants: any, reciptIndex: number, event: string) => {
    let editableData = this.state.documnetDetail[selectedParticipants];
    editableData[0].recipients[reciptIndex].name = event;
    let changeInEmail = this.state.documnetDetail;
    changeInEmail[selectedParticipants] = editableData;
    this.setState({ documentList: this.viewsOfDocArray, documnetDetail: changeInEmail })
  }

  btnOpenCalendarProps = {
    onPress: () => {
      this.getCalendarModalOpen()
    }
  }

  getCalendarModalOpen = () => {
    Keyboard.dismiss()
    this.setState({ isModelOpen: true })
  }

  markedDatesWithColor = () => {
    const currentDate = new Date();
    const markedDates: any = {};
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + 30); // Show 30 days from current day

    for (let first = 0; first <= 30; first++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + first);
      const dateString = date.toISOString().split('T')[0];

      let color = '#D1FAE5'; // Default color

      if (first < 15) {
        color = '#FEF3C7';
      }

      if (date.getDay() === 0 || date.getDay() === 6) {
        color = '#FEE2E2';
      }

      markedDates[dateString] = { selected: true, selectedColor: color, selectedTextColor: '#000000' };
      markedDates[this.state.selectedDay] = { ...markedDates[dateString], selected: true, selectedColor: '#012275', selectedTextColor: '#fff' };
      if (first === 0) {
        markedDates[dateString] = { ...markedDates[dateString], selected: true, selectedColor: '#fff', selectedTextColor: '#d8dbe1', disabled: true };
      }
      if (this.state.selectedDay === dateString) {
        markedDates[dateString] = { ...markedDates[dateString], selected: true, selectedColor: '#012275', selectedTextColor: '#fff' };
      }
    }
    this.setState({ markedDates, markedDateList: this.state.selectedDay === '' ? markedDates : this.state.markedDateList });
  }

  txtInputServicesPrpos = (value: any) => {
    this.setState({ selectedService: value });
  };

  txtInputJurisdictionPrpos = (value: any) => {
    this.setState({ selectedJurisdiction: value });
  };

  txtInputdNotarisationPrpos = (value: any) => {
    this.setState({ selectedNotarisation: value });
  };

  txtInputAddNotesProps = {
    value: '',
    onChangeText: (text: string) => {
      this.setState({ addNotes: text });
      this.txtInputAddNotesProps.value = text;
    },
  };

  goToSteps = (stepNumber: number) => {
    let numberSteps = 1;
    if (stepNumber === 2 && !this.getFirstStepBtnEnabled()) {
      return;
    }
    if (stepNumber === 3) {
      return;
    }
    const documentsObject = this.state?.selectedRequestDetail?.attributes.file_documents.reduce((document: DocumentsObject, item: FileDocument, index: number) => {
      const docDetail = {
        path: item.doc_file_url
      };
      this.viewsOfDocArray[index] = { ...docDetail, recipients: item.recipients };
      document[`document${index}`] = [{
        fileDetail: docDetail,
        recipients: item.recipients
      }];
      return document; 
    }, {});

    numberSteps = stepNumber;
    this.setState({ stepsNo: numberSteps, documnetDetail: documentsObject, documentList: this.viewsOfDocArray }, () => {
      this.scrollToTop()
    });
  }

  increaseDecreaseNoOfDocument = (type: string) => {
    let documentNumber = this.state.noOfDocument;
    const fileDocLength = this.state?.selectedRequestDetail?.attributes?.file_documents.length || 0;

    if (type === 'plus' && this.state.noOfDocument < 10) {
        documentNumber += 1;
        this.viewsOfDocArray[documentNumber - 1] = {};
    } else if (type === 'minus' && this.state.noOfDocument > 0) {
        if (this.selectedActionType === 'edit' && documentNumber <= fileDocLength) {
            return;
        }
        documentNumber -= 1;
        this.viewsOfDocArray.splice(this.viewsOfDocArray.length - 1, 1);  
    }
    this.setState({ noOfDocument: documentNumber });
  }

  removeDocFromList = (index: number) => {
    if (this.viewsOfDocArray.length > 1) {
      this.viewsOfDocArray.splice(index, 1);
      this.setState({ noOfDocument: this.state.noOfDocument - 1 });
    }
  }

  addDocInList = () => {
    this.viewsOfDocArray.push(this.state.noOfDocument + 1);
    this.setState({ noOfDocument: this.state.noOfDocument + 1, isStepSecValidatin: false })
  }

  onCancelRequestBtnProps = {
    onPress: () => {
      this.handleCancelRequest()
    }
  }
  handleCancelRequest=()=>{
    const messages: Message = new Message(
        getName(MessageEnum.NavigationDashboardMessage)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    this.setState({isModalVisible:false})
  
  }

  cancelNewNotary = {
    onPress: () => {
    this.setState({isModalVisible:true},()=>{
   })
      
    }
  }
  noToChanges = {
    onPress: () => {
      this.setInitialDates()
      this.setState({ isModelOpen: false,selectedDay:"",selectedDayTime:"" })
    }
  }

  yesProceedToChanges = {
    onPress: () => {
      if (this.getButtonEnabled()) {
        const value = this.state.selectedDay + " | " + this.state.selectedDayTime;
        this.setState({ dateAndTime: value, isModelOpen: false, selectedMarkedDate: this.state.markedDates[this.state.selectedDay] })
      }
    }
  }

  formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');

    const date = new Date(`${year}-${month}-${day}`);

    const formattedDay = date.getDate().toString().padStart(2, '0');
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const formattedYear = date.getFullYear().toString();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }

  selectBtn = (type: string) => {
    this.setState({ selectedDayTime: type })
  }

  handleDateSelect = (dateString: string) => {
    const { markedDates, selectedDay } = this.state;
  
    // Return early if the selected date is the same as the current one
    if (dateString === selectedDay) return;
  
    // Create a new object for the updated markedDates
    const updatedMarkedDates = {
      ...markedDates,
      // Set the newly selected date with new styles
      [dateString]: {
        ...markedDates[dateString],
        selectedColor: "#012275", // Highlight the selected date
        selectedTextColor: "#fff", // Set text color for selected date
      },
    };
  
    // If there was a previously selected day, reset its styles
    if (selectedDay && markedDates[selectedDay]) {
      updatedMarkedDates[selectedDay] = {
        ...markedDates[selectedDay],
        selectedColor: markedDates[selectedDay].originalColor || "#fff", // Revert to original color
        selectedTextColor: "#000", // Default text color
      };
    }
  
    // Update state with the new marked dates and selected day
    this.setState({
      markedDates: updatedMarkedDates,
      selectedDay: dateString,
      notAvailable: markedDates[dateString].notAvailable
    });
  };
  
  

  getButtonEnabled = () => {
    if (this.state.selectedDayTime !== '' && this.state.selectedDay !== '' && !this.state.notAvailable) {
      return true
    } else {
      return false
    }
  }

  getFirstStepBtnEnabled = () => {
    const { dateAndTime, selectedJurisdiction, selectedNotarisation, selectedService, noOfDocument } = this.state;
    if (dateAndTime !== '' && selectedJurisdiction !== null && selectedNotarisation !== null && selectedService !== null && noOfDocument > 0) {
      return true
    } else {
      return false
    }
  }

  getenabledSecStepBtn = () => {
    const { checkedFirstBox, checkedSecBox } = this.state;
    if (!this.hasBlankObject() && checkedFirstBox && checkedSecBox) {
      return true
    } else {
      return false
    }
  }

  hasBlankObject = () => {
    for (let first = 0; first < this.viewsOfDocArray.length; first++) {
      const objData = this.viewsOfDocArray[first];
      if (objData && Object.keys(objData).length === 0) {
        return true;
      }
    }
    return false;
  }

  CustomCheckBoxFirstProps = {
    isChecked: false,
  };

  btnFirstCheckBoxProps = {
    onPress: () => {
      this.setState({ checkedFirstBox: !this.CustomCheckBoxFirstProps.isChecked });
      this.CustomCheckBoxFirstProps.isChecked = !this.CustomCheckBoxFirstProps.isChecked;
    },
  };

  CustomCheckBoxSecProps = {
    isChecked: false,
  };

  btnSecCheckBoxProps = {
    onPress: () => {
      this.setState({ checkedSecBox: !this.CustomCheckBoxSecProps.isChecked });
      this.CustomCheckBoxSecProps.isChecked = !this.CustomCheckBoxSecProps.isChecked;
    },
  };

  filterSupportedFiles = (files: any) => {
    const isSizeValid = files.size <= (2 * 1024 * 1024);
    return isSizeValid;
  };

  uploadDocumentFile = (index: number) => {
    this.setState({ isDocSelectionModelOpen: true, selectedDocument: index, docValidationMsg: true, isValidateField: false })
  }

  openDocumentPicker = async (type: string) => {
    const handleImagePicker = (image: any) => {
      const filteredFiles = this.filterSupportedFiles(image);
      if (filteredFiles) {
        this.viewsOfDocArray[this.state.selectedDocument] = image;
      } else {
        this.setState({ isValidateField: true });
      }
      this.setState({ isDocSelectionModelOpen: false, docValidationMsg: filteredFiles });
    };

    switch (type) {
      case 'Camera':
        try {
          const image = await ImagePicker.openCamera({
            cropping: true,
          });
          handleImagePicker(image);
        } catch (error) {

        }
        break;
      case 'Photos':
        try {
          const image = await ImagePicker.openPicker({
            cropping: true,
          });
          handleImagePicker(image);
        } catch (error) {

        }
        break;
      default:
        try {
          const response = await pick({
            allowMultiSelection: false,
            type: [types.pdf, types.docx, types.doc],
          });
          const filteredFiles = this.filterSupportedFiles(response[0]);
          if (filteredFiles) {
            this.viewsOfDocArray[this.state.selectedDocument] = response[0];
            this.setState({
              documentList: this.viewsOfDocArray,
              isDocSelectionModelOpen: false,
              docValidationMsg: filteredFiles,
            });
          } else {
            this.setState({
              isDocSelectionModelOpen: false,
              isValidateField: true,
              docValidationMsg: filteredFiles,
            });
          }
        } catch (error) {

        }
    }
  };

  closeModelOfDocument = () => {
    this.setState({ isDocSelectionModelOpen: false })
  }

  removeFilesOrDoc = (index: number) => {
    this.viewsOfDocArray[index] = {};
    this.setState({ documentList: this.viewsOfDocArray })
  }

  removeParticipant = (selectedParticipants: any, receipantInd: number) => {
    let editableData = this.state.documnetDetail[selectedParticipants];

    if (editableData[0].recipients.length > 1) {
      editableData[0].recipients.splice(receipantInd, 1);
      let changeInEmail = this.state.documnetDetail;
      changeInEmail[selectedParticipants] = editableData;
      this.setState({ documnetDetail: changeInEmail })
    }
  }

  addParticipant = (selectedParticipants: any) => {
    let editableData = this.state.documnetDetail[selectedParticipants];

    if (editableData[0].recipients.length <= 3) {
      editableData[0].recipients.push({ email: "", name: "", is_signatory: false });
      let changeInEmail = this.state.documnetDetail;
      changeInEmail[selectedParticipants] = editableData;
      this.setState({ documnetDetail: changeInEmail, isStepThiredValidation: false }, () => {
        this.showAddedParticipant(selectedParticipants)
      })
    }
  }

  showAddedParticipant = (document: string) => {
    this.setState(prevState => ({
      toggledDocuments: {
        ...prevState.toggledDocuments,
        [document]: false,
      }
    }));
  };

  getMenuWidth = () => {
    if(this.selectedActionType === 'end_user') {
      return 160
    } else {
      return 175
    }
  }

  truncatedText = (text: string, charLength: number) => {
    if (text.length <= charLength) {
      return text;
    } else {
      const truncated = text.substring(0, charLength) + '...';
      return truncated;
    }
  };

  closeCalendarModel = () => {
    this.setState({ isModelOpen: false })
  }

  openCloseDropdown = () => {
    this.setState({ isDropdownOpen: true })
  }

  closeDropDownOfNotarization = () => {
    this.setState({ isDropdownOpen: false })
  }

  openServicesDropdown = () => {
    this.setState({ isServiceDropdownOpen: true })
  }

  closeDropDownOfServices = () => {
    this.setState({ isServiceDropdownOpen: false })
  }

  openJuridactionDropdown = () => {
    this.setState({ isJuridactionDropdownOpen: true })
  }

  closeDropDownOfJuridaction = () => {
    this.setState({ isJuridactionDropdownOpen: false })
  }

  toggleDocument = (document: any) => {
    this.setState(prevState => ({
      toggledDocuments: {
        ...prevState.toggledDocuments,
        [document]: !prevState.toggledDocuments[document],
      }
    }));
  };

  getArrowImg = (document: string) => {
    if (!this.state.toggledDocuments[document]) {
      return upArrowImg
    } else {
      return downArrowBlackImg
    }
  }

  renderStyleAccordingToOS = () => {
    if (Platform.OS === 'ios') {
      return 'paddBottTop'
    } else {
      return 'padd'
    }
  }

  renderStyleOfDataTImeFieldAccordingToOS = () => {
    if (Platform.OS === 'ios') {
      return 'paddTopBott'
    } else {
      return 'padd'
    }
  }

  renderUIStyleOfDateAndTime = () => {
    if (this.state.isStepOneValidation && this.state.selectedDay === '') {
      return 'errorOfField'
    } else {
      return 'textFieldBg'
    }
  }

  getTitleOfNotaryFlowPage = () => {
    if(this.selectedActionType === 'edit'){
      return 'Edit Notary Request'
    } else {
      return 'New Notary Request'
    }
  }

  getSucessMsgScreenPage = () => {
    if(this.selectedActionType === 'edit' && this.state.isDraftCreated){
      return "Notary request draft updated successfully"
    } else if(this.state.isDraftCreated){
      return "Notary request draft created successfully"
    } else if(this.selectedActionType === 'edit'){
      return "Notary Request updated Successfully"
    }
    else {
      return "Notary Request created Successfully"
    }
  }

  getValidateMsgOfRecipantName = (name: string) => {
    if(this.state.isStepThiredValidation && name === '' ){
      return true
    } else {
      return false
    }
  }

  getRecipantNameValidation = (name : string) => {
    if(!this.handleRecipantsName(name) && this.state.isStepThiredValidation && name !== ''){
      return true
    } else {
      return false
    }
  }

  getButtonName = () => {
    if(this.selectedActionType === 'edit'){
      return 'Update'
    } else {
      return 'Create Request'
    }
  }

  canBeRemoved = (item: DocumentView, index: number) => {
    if(this.state.selectedRequestDetail?.attributes.file_documents[index] && item.path === this.state.selectedRequestDetail?.attributes.file_documents[index].doc_file_url){
      return false
    } else {
      return true
    }
  }

  renderUIStyleOfDateTime = () => {
    if (this.state.isStepOneValidation && this.state.selectedDay === '') {
      return 'errorOfFieldView'
    } else {
      return 'textFieldBgView'
    }
  }

  getRecipantValidation = (name : string) => {
    if(!this.handleRecipantsName(name) && this.state.isStepThiredValidation && name !== ''){
      return false
    } else {
      return true
    }
  }

  // Customizable Area End

}
