import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React, { createRef, RefObject } from 'react';
import {Platform, ScrollView} from 'react-native';
import moment from "moment";
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
  isAllFieldValid: boolean;
  selectedDate: string;
  selectedTime: string;
  checkedRememberMe: boolean;
  selectedCurrency: string;
  fees: string;
  includePlatFormFees: boolean;
  addMessage: string;
  isTimeSelectionModelOpen: boolean;
  selectedStartTime: Date | null;
  selectedEndTime: Date | null;
  timeType: string;
  startTime: string;
  endTime: string;
  isLoader: boolean;
  isMakeQuoteGenerated: boolean;
  isMakeQuoteFailed: boolean;
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
  selectedActionType: string = '';
  requestId: string="";
  makeQuoteApiCallId: string= "";
  notarisationMethodType: string= "";
  scrollViewRef: RefObject<ScrollView> = createRef<ScrollView>();
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
      isAllFieldValid: false,
      selectedDate: '',
      selectedTime: '',
      checkedRememberMe: false,
      selectedCurrency: '',
      fees:'',
      includePlatFormFees: false,
      addMessage: '',
      isTimeSelectionModelOpen: false,
      selectedEndTime: null,
      selectedStartTime: null,
      timeType: '',
      startTime: '',
      endTime: '',
      isLoader: false,
      isMakeQuoteGenerated: false,
      isMakeQuoteFailed: false
      
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayloadMessage(message);
    } else if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleRestAPIResponseMessage(message);
    }
  }

  scrollToTop = () => {
    this.scrollViewRef?.current?.scrollTo({ y: 0, animated: false });
  };

  handleNavigationPayloadMessage = (message: Message) => {
    const myData = message.getData(getName(MessageEnum.CustomDataMessage))
    if (myData) {
      this.selectedActionType = myData.actionType;
      this.requestId = myData.requestId;
      this.notarisationMethodType = myData.notarisation_method;
      this.setState({selectedStartTime: new Date(myData.requestDate), selectedEndTime: new Date(myData.requestDate),  selectedDate: myData.requestDate, token: myData.token });
    }
  };
  
  handleRestAPIResponseMessage = (message: Message) => {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (apiRequestCallId === this.makeQuoteApiCallId) {
      this.handleMakeQuoteApiResponse(responseJson);
    }
  };

  btnRequestDetailRedirect = {
    onPress: () => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationRequestDetailMessage)
      );
      const selectedRequest = {
        requestId: this.requestId,
        actionType: 'view'
      };
      msg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }

  handleMakeQuoteApiResponse = (responseJson: any) => {
    if (responseJson.message === "Quote submitted successfully.") {
      this.setState({isLoader: false, isMakeQuoteGenerated: true, isMakeQuoteFailed: false}, () => {
        this.scrollToTop()
      })
    } else {
      this.setState({isLoader: false, isMakeQuoteFailed: true, isMakeQuoteGenerated: false}, () => {
        this.scrollToTop()
      })
    }
  }

  onClickOfFailOkBtn = {
    onPress: () => {
      this.setState({isLoader: false, isMakeQuoteFailed: false, isMakeQuoteGenerated: false}, () => {
        if (this.props.navigation && this.props.navigation.goBack) {
          this.props.navigation.goBack()
        }
      })
    }
  }

  btnGoBack = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    }
  }

  renderUIStyleOfStartTime = () => {
    if (this.state.isAllFieldValid && this.state.startTime === '') {
      return 'errorOfField'
    } else {
      return 'textFieldBg'
    }
  }

  renderUIStyleOfEndTime = () => {
    if (this.state.isAllFieldValid && this.state.endTime === '') {
      return 'errorOfField'
    } else {
      return 'textFieldBg'
    }
  }

  getMarTopOnError = () => {
    if(this.isErrorMesVisible(this.state.selectedCurrency)){
      return 'topMar'
    } else {
      return 'marTopNon'
    }
  }

  renderStyleOfDataTImeFieldAccordingToOS = () => {
    if (Platform.OS === 'ios') {
      return 'paddTopBott'
    } else {
      return 'padd'
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

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  btnincludPlatformFeeProps = {
    onPress: () => {
      this.setState({ includePlatFormFees: !this.includPlatFormFeesProps.isChecked });
      this.includPlatFormFeesProps.isChecked = !this.includPlatFormFeesProps.isChecked;
    },
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  includPlatFormFeesProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ includePlatFormFees: value });
      this.includPlatFormFeesProps.isChecked = value;
    },
    isChecked: false,
  };

  txtInputCurrencyPrpos = (value: string) => {
    this.setState({ selectedCurrency: value });
  }

  txtInputFeesProps = {
    onChangeText: (text: string) => {
      this.setState({ fees: text });
    },
  }

  isErrorMesVisible = (value: string) => {
    if(this.state.isAllFieldValid && this.isStringNullOrBlank(value)){
      return true
    } else { 
      return false 
    }
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  txtInputAddMessageProps = {
    value: '',
    onChangeText: (text: string) => {
      this.setState({ addMessage: text });
      this.txtInputAddMessageProps.value = text;
    },
  };

  btnMakeQuoteProps = {
    onPress: () => {
      const {startTime, endTime, fees, selectedCurrency, } = this.state;
      this.setState({isAllFieldValid: true})
      if(this.isStringNullOrBlank(startTime) ||
        this.isStringNullOrBlank(endTime) ||
        this.isStringNullOrBlank(selectedCurrency) ||
        this.isStringNullOrBlank(fees) ||
        this.checkStartAndEndTime() ||
        Number(this.state.fees) === 0 ||
        this.checkVideoCallRequired()) {
          return false
        }
      this.setState({isAllFieldValid: false, isLoader: true})
      if(this.getMakeQuoteEnabled()){
        this.callApiForMakeQuote()
      }
    }
  }

  convertDataIntoPayloadReq = (inputDate: Date | null) => {
    if(inputDate){
      const formattedDate = inputDate.toISOString()
      return formattedDate
    }
  }

  callApiForMakeQuote (): boolean {
    const {selectedStartTime, selectedEndTime, checkedRememberMe, fees, includePlatFormFees, addMessage} = this.state;
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.requestApiContentType
    }
    const payload = {
      "quote": {
        "notary_requests_id": this.requestId,
        "start_time": this.convertDataIntoPayloadReq(selectedStartTime),
        "end_time": this.convertDataIntoPayloadReq(selectedEndTime),
        "video_call_required": checkedRememberMe,
        "fees": fees,
        "platform_fee_inclusive": includePlatFormFees,
        "message": addMessage
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.makeQuoteApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.makeQuoteApiEndPoint
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
      configJSON.createSendRequestApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  checkStartAndEndTime = () => {
    if(this.state.startTime !== '' && this.state.endTime !== '' && this.state.selectedStartTime !== null && this.state.selectedEndTime !== null){
      if(this.isWithin30Minutes(this.state.selectedStartTime, this.state.selectedEndTime)){
        return true
      } else {
        return false
      }
    }
  }

  isWithin30Minutes = (date1: Date, date2: Date) => {
    const diffInMinutes = Math.abs(moment(date1).diff(moment(date2), 'minutes'));
    return diffInMinutes < 30;
  };

  showVideoReqError = () => {
    if(this.checkVideoCallRequired() && this.state.isAllFieldValid){
      return true
    } else {
      return false
    }
  }
  

  checkVideoCallRequired = () => {
    if(!this.notarisationMethodType.includes('RIN') && !this.state.checkedRememberMe){
      return true
    } else {
      return false
    }
  }
  
  getMakeQuoteEnabled = () => {
    const {startTime, endTime, fees, selectedCurrency, } = this.state;
    if(startTime !== '' && endTime !== '' && fees !== '' && selectedCurrency !== '' && !this.checkVideoCallRequired()){
      return true
    } else {
      return false
    }
  }

  closeTimeSelectionModel = () => {
    this.setState({ 
      isTimeSelectionModelOpen: false, 
      startTime: this.state.timeType.toLowerCase() === 'start time' ? '' : this.state.startTime,
      endTime: this.state.timeType.toLowerCase() === 'end time' ? '' : this.state.endTime
      
    });
  }
  
  noToChanges = {
    onPress: () => {
      this.closeTimeSelectionModel();
    }
  }
  
  yesProceedToChanges = {
    onPress: () => {
      if (this.getButtonEnabled()) {
        this.setState({ 
          isTimeSelectionModelOpen: false, 
        });
      }
    }
  }

  getButtonEnabled = () => {
    if (this.state.timeType.toLowerCase() === 'start time' && this.state.startTime !== '') {
      return true;
    } else if (this.state.timeType.toLowerCase() === 'end time' && this.state.endTime !== '') {
      return true;
    } else {
      return false;
    }
  }

  getTimeSelectionModalOpen = (type: string) => {
    if (type.toLowerCase() === 'start time') {
      this.setState({isTimeSelectionModelOpen: true, timeType: type, startTime: this.convertDateTimeIntoTime(this.state.selectedStartTime || new Date()) });
    } else {
      this.setState({isTimeSelectionModelOpen: true, timeType: type, endTime: this.convertDateTimeIntoTime(this.state.selectedEndTime || new Date()) });
    }
  }

  onStartAndEndTimeChange = (dateTime: Date) => {
    if (this.state.timeType.toLowerCase() === 'start time') {
      this.setState({ selectedStartTime: dateTime, startTime: this.convertDateTimeIntoTime(dateTime) });
    } else {
      this.setState({ selectedEndTime: dateTime, endTime: this.convertDateTimeIntoTime(dateTime) });
    }
  }

  convertDateTimeIntoTime = (dateTime: Date) => {
    let hourSelect = dateTime.getHours();
    const minutesSelect = dateTime.getMinutes();
    const period = hourSelect >= 12 ? 'PM' : 'AM';

    hourSelect = hourSelect % 12 || 12;
    const formattedTime = `${hourSelect.toString().padStart(2, '0')}:${minutesSelect.toString().padStart(2, '0')} ${period}`;
    return formattedTime
  }

  txtRequestDateProps = {
    editable: false
  }

  showFeesErrorMsg = () => {
    if(Number(this.state.fees) === 0 && this.state.isAllFieldValid && !this.isErrorMesVisible(this.state.selectedCurrency)){
      return true
    } else {
      return false
    }
  }

  // Customizable Area End
}
