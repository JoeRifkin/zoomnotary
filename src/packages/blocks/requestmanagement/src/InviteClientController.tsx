import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
const navigation = require("react-navigation");
import { createRef, RefObject } from 'react';
import { Keyboard, ScrollView, Platform } from 'react-native';
import moment from "moment";
import { getStorageData } from "framework/src/Utilities";
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

const PRIORITY_COLORS: { [key: number]: string } = {
  0: "#D1FAE5",
  1: "#F59E0B",
  2: "#F87171",
  3: "#fff",
};
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  // Customizable Area Start
  navigation: typeof navigation;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  name: string;
  email: string;
  mobileNumber: string;
  notaryService: string;
  methodOfNotarisation: string;
  fees: string;
  includePlatformFees: boolean;
  additionalMessage: string;
  isModelOpen: boolean,
  isLoader: boolean,
  markedDates: any
  selectedDayTime: string,
  selectedDay: string,
  from_date: string;
  to_date: string;
  selectedMonth: string;
  notAvailable: boolean;
  dateAndTime: string,
  selectedMarkedDate: any,
  markedDateList: any,
  selectedCountryCode: string,
  countryCodeList: FilterCountry[],
  isBirthDropDownOpen: boolean,
  isIdTypeDropDownOpen: boolean,
  isDatePickerVisible: boolean,
  token: string,
  selectedService: any,
  selectedNotarisation: any,
  servicesList: any,
  notrizationList: any,
  isDropdownOpen: boolean,
  isServiceDropdownOpen: boolean,
  checkedFirstBox: boolean,
  checkedFeesBox: boolean,
  isDateSelected: boolean,
  selectedStartTime: Date | null,
  selectedEndTime: Date | null,
  selectedStartTimeTxt: string,
  selectedEndTimeTxt: string,
  isEndTimePickerVisible: boolean,
  errors: any
  isNewRequestCreated: boolean,
  onModalOpen: boolean,
  selectedCurrency: string;
  isTimeSelectionModelOpen: boolean;
  timeType: string;
  isAllFieldValidate: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: string;
  // Customizable Area End
}

export default class InviteClientController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  scrollViewRef: RefObject<ScrollView> = createRef<ScrollView>();
  getCountryCodeApiCallId: string = '';
  getAvailabilityApiCallId: string = '';
  getNotrizationMethodApiCallId: string = '';;
  getAllServicesApiCallId: string = '';;
  onCreateInviteRequest: any;
  onCreateInviteRequestCallid: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      name: '',
      email: '',
      mobileNumber: '',
      notaryService: '',
      methodOfNotarisation: '',
      fees: '',
      includePlatformFees: false,
      additionalMessage: '',
      isModelOpen: false,
      isLoader: false,
      markedDates: null,
      selectedDayTime: '',
      selectedDay: '',
      from_date: moment().format('YYYY-MM-DD'),
      to_date: moment().endOf('month').format('YYYY-MM-DD'),
      selectedMonth: moment().format('YYYY-MM'),
      notAvailable: false,
      dateAndTime: '',
      selectedMarkedDate: null,
      markedDateList: null,
      selectedCountryCode: '+44',
      countryCodeList: [],
      isBirthDropDownOpen: false,
      isIdTypeDropDownOpen: false,
      isDatePickerVisible: false,
      token: "",
      selectedService: null,
      selectedNotarisation: null,
      servicesList: [],
      notrizationList: [],
      isDropdownOpen: false,
      isServiceDropdownOpen: false,
      checkedFirstBox: false,
      checkedFeesBox: false,
      isDateSelected: false,
      selectedStartTime: null,
      selectedEndTime: null,
      selectedStartTimeTxt: "",
      selectedEndTimeTxt: "",
      isEndTimePickerVisible: false,
      errors: {},
      isNewRequestCreated: false,
      onModalOpen: false,
      selectedCurrency: '£',
      isTimeSelectionModelOpen: false,
      timeType: '',
      isAllFieldValidate: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived", message);

      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      if (token) {
        this.setState({ token: token }, () => {

        });
      } else {
        this.showAlert("Alert", configJSON.loginAlertMessage);
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleRestAPIResponseMessage(message);
    }
    // Customizable Area End
  };



  // Customizable Area Start

  componentDidMount = async () => {
    this.callApiForGetCountryCodeList()
    this.getNotariztionMethod()
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.callApiForGetCountryCodeList();
      });
    }

  };
  handleSessionResponseMessage(message: Message) {
    const userData = message.getData(getName(MessageEnum.SessionResponseData));
    const userRole = JSON.parse(userData);
    this.setState({ token: userRole.meta.token });
  }

  handleRestAPIResponseMessage(message: Message) {
    const respJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    const apiRequestCallID = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

    if (apiRequestCallID === this.getAllServicesApiCallId) {
      this.handleServiesApiData(respJSON);
    } else if (apiRequestCallID === this.getCountryCodeApiCallId) {
      this.handleCountryCodeResponse(respJSON);

    } else if (apiRequestCallID === this.getNotrizationMethodApiCallId) {
      this.handleNotrizationApiResponse(respJSON);
    }
    else if (apiRequestCallID === this.onCreateInviteRequestCallid) {
      if (respJSON && respJSON.message) {
        Keyboard.dismiss()
        this.setState({ isNewRequestCreated: true, isLoader: false });
      } else if (respJSON && respJSON.error) {
        this.setState({ isLoader: false , onModalOpen: true});
      }
    }
    else if (apiRequestCallID === this.getAvailabilityApiCallId) {
      this.handleAvailabilityResponse(respJSON);
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
  
  txtInputdNotarisationPrpos = (value: any) => {
    this.setState({ selectedNotarisation: value });
  };

  showAstrickForVide = () => {
    if (this.state.selectedNotarisation !== null && this.state.selectedNotarisation?.label && !this.state.selectedNotarisation?.label.includes('RIN')) {
      return true
    } else {
      return false
    }
  }
  getDashboardData(): boolean {
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
      configJSON.getReceivedRequestApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  handleServiesApiData = (response: any) => {
    const extractedData = response.data.map((item: any) => ({
      label: item.attributes.service_name ? item.attributes.service_name : item.attributes.name,
      value: Number(item.id)
    }));
    this.setState({ servicesList: extractedData }, () => {
      this.getNotariztionMethod()

    })
  }
  getNotariztionMethod(): boolean {
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
      configJSON.getReceivedRequestApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  handleNotrizationApiResponse = (response: any) => {
    const extractedData = response.map((item: any) => ({
      label: item.notarisation_method,
      value: item.id
    }));
    this.setState({ notrizationList: extractedData }, () => {
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
    this.getDashboardData()
  }
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
  txtInputServicesPrpos = (value: any) => {
    this.setState({ selectedService: value });
  };
  closeDropDownOfServices = () => {
    this.setState({ isServiceDropdownOpen: false })
  }
  btnGoBack = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    },
  };
  noToChanges = {
    onPress: () => {
      this.setInitialDates()
      this.setState({ isModelOpen: false, selectedDay: "", selectedDayTime: "" })
    }
  }
  setInitialDates = () => {
    const currentDate = moment();
    const from_date = currentDate.startOf('day').format('YYYY-MM-DD');
    const to_date = currentDate.endOf('month').format('YYYY-MM-DD');

    this.setState({ from_date, to_date }, () => {
      this.getAvailabilityApi(from_date, to_date);
    });
  };
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
  getButtonEnabled = () => {
    return this.state.isDateSelected;

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

  handleDateSelect = (dateString: string) => {
    const { markedDates, selectedDay } = this.state;

    const safeMarkedDates = markedDates || {};

    if (dateString === selectedDay) return;

    const updatedMarkedDates = {
      ...safeMarkedDates,
      [dateString]: {
        ...(safeMarkedDates[dateString] || {}),
        selected: true,
        selectedColor: "#012275",
        selectedTextColor: "#fff",
      },
    };

    if (selectedDay && safeMarkedDates[selectedDay]) {
      updatedMarkedDates[selectedDay] = {
        ...safeMarkedDates[selectedDay],
        selected: false,
        selectedColor: safeMarkedDates[selectedDay].originalColor || "#fff",
        selectedTextColor: "#000",
      };
    }

    this.setState({
      markedDates: updatedMarkedDates,
      selectedDay: dateString,
      notAvailable: safeMarkedDates[dateString]?.notAvailable || false,
      isDateSelected: true,
    });
  };

  getSucessMsgScreenPage = () => {

    return "Invite sent Successfully"
 
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
  handleMonthChange = (newMonth: string) => {
    const selectedDate = moment(newMonth);

    const yearMonth = selectedDate.format('YYYY-MM-DD');

    const from_date = selectedDate.startOf('month').format('YYYY-MM-DD');
    const to_date = selectedDate.endOf('month').format('YYYY-MM-DD');

    const currentMonth = moment().startOf('month').format('YYYY-MM-DD');

    if (selectedDate.isBefore(currentMonth, 'month')) {
      return;
    }

    if (this.state.markedDates && this.state.markedDates[yearMonth]) {
      this.setState({ from_date, to_date, isLoader: false });
    } else {
      this.setState({ isLoader: true, from_date, to_date }, () => {
        this.getAvailabilityApi(from_date, to_date);
      });
    }

    this.setState({ selectedMonth: yearMonth });
  };
  getAvailabilityApi = (from_date: string, to_date: string) => {
    const params = `?from_date=${from_date}&to_date=${to_date}`;

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

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  markedDatesWithColor = () => {
    const currentDate = new Date();
    const markedDates: any = {};
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + 30);

    for (let first = 0; first <= 30; first++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + first);
      const dateString = date.toISOString().split('T')[0];

      let color = '#D1FAE5';

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
  txtInputCountryCodePrpos = (value: string) => {
    this.setState({ selectedCountryCode: value });
  }
  openDropdownOfBirth = () => {
    this.setState({ isBirthDropDownOpen: true })
  }

  closeDropDownOfBirth = () => {
    this.setState({ isBirthDropDownOpen: false })
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
      configJSON.getSentRequestApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
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
  CustomCheckBoxfeesProps = {
    isCheckedFees: false,
  };

  btnFirstCheckfeesProps = {
    onPress: () => {
      this.setState({ checkedFeesBox: !this.CustomCheckBoxfeesProps.isCheckedFees });
      this.CustomCheckBoxfeesProps.isCheckedFees = !this.CustomCheckBoxfeesProps.isCheckedFees;
    },
  };

  isStartTimeLessThanEndTime(startTime: string, endTime: string, minGapMinutes: number): boolean {
    const parseTime = (time: string): Date => {
      const [hourMin, period] = time.split(" ");
      let [hours, minutes] = hourMin.split(":").map(Number);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      return new Date(0, 0, 0, hours, minutes);
    };

    const startDate = parseTime(startTime);
    const endDate = parseTime(endTime);

    if (startDate >= endDate) {
      return false;
    }

    const timeDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

    if (timeDifference < minGapMinutes) {
      return false;
    }

    return true;
  }

  checkValidMobileNumber = () => {
    if(this.state.isAllFieldValidate && this.state.mobileNumber !== '' && (this.state.mobileNumber.length < 9 || !(/^\d*$/.test(this.state.mobileNumber)))){
      return true
    } else return false
  }

  validateFormProps = {
    onPress: async () => {
      this.setState({ isAllFieldValidate: true });
  
      if (this.isInvalidForm()) return false;
      Keyboard.dismiss()
      this.setState({ isAllFieldValidate: false, isLoader: true }, async () => {
        await this.createInviteClient();
      });
    },
  };
  
  isInvalidForm = () => {
    const {
      selectedStartTime,
      selectedEndTime,
      selectedDay,
      selectedService,
      selectedNotarisation,
      fees,
      selectedCurrency,
      name,
      email,
      mobileNumber,
    } = this.state;
  
    return (
      this.isStringNullOrBlank(name) ||
      this.isStringNullOrBlank(email) ||
      !this.isValidRecipientEmail(email) ||
      this.isStringNullOrBlank(mobileNumber) ||
      this.checkValidMobileNumber() ||
      !selectedService ||
      !selectedNotarisation ||
      this.isStringNullOrBlank(fees) ||
      !selectedDay ||
      this.state.selectedStartTimeTxt === "" ||
      this.state.selectedEndTimeTxt === "" ||
      this.isStringNullOrBlank(selectedCurrency) ||
      this.checkTimeDifferenceErrorMsg() ||
      this.checkStartAndEndTime() ||
      Number(fees) === 0 ||
      this.checkVideoCallRequired()
    );
  };
  
  checkTimeDifferenceErrorMsg = () => {
    if(!this.isStartTimeLessThanEndTime(this.state.selectedStartTimeTxt, this.state.selectedEndTimeTxt, 30) && 
    this.state.selectedStartTimeTxt !== "" && 
    this.state.selectedEndTimeTxt !== "") {
      return true
    } else {
      return false
    }
  }

  checkStartAndEndTime = () => {
      if(this.state.selectedStartTimeTxt !== '' && this.state.selectedEndTimeTxt !== '' && this.state.selectedStartTime !== null && this.state.selectedEndTime !== null){
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
      if(this.checkVideoCallRequired() && this.state.isAllFieldValidate){
        return true
      } else {
        return false
      }
    }
    
  
    checkVideoCallRequired = () => {
      if(!this.state.selectedNotarisation?.label?.includes('RIN') && !this.state.checkedFirstBox){
        return true
      } else {
        return false
      }
    }

    isValidRecipientEmail = (email: any) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };

  createInviteClient = async () => {

    const row = {
      notary_request:
      {
        notary_service_type: this.state.selectedService?.value,
        notarisation_method_id: this.state.selectedNotarisation?.value,
        jurisdiction_id: 1,
        date: this.state.selectedDay,
        notes: this.state.additionalMessage,
        notarised_document: 1,
        priority: "Standard",
        invite_email: this.state.email,
        invite_name: this.state.name,
        invite_number: this.state.mobileNumber,
      },
      quote: {
        start_time: this.state.selectedStartTime,
        end_time: this.state.selectedEndTime,
        video_call_required: this.state.checkedFirstBox,
        fees: this.state.fees,
        plateform_fee: this.state.checkedFeesBox
      }
    }


    this.setState({ isLoader: true })
    const header = {
      token: await getStorageData("token"),
      "Content-Type": configJSON.dashboarContentType
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.onCreateInviteRequestCallid = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.onCreateInviteClient
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(row)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  onCancelRequestBtnProps = {
    onPress: () => {
      this.handleCancelRequest()
    }
  }

  handleCancelRequest = () => {
    this.setState({onModalOpen : false});
  }

  getStyleOfTextBox = (value: boolean) => {
    if(value) {
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

  isErrorMesVisible = (value: string) => {
    if(this.isStringNullOrBlank(value)){
      return true
    } else { 
      return false 
    }
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  txtInputCurrencyPrpos = (value: string) => {
    this.setState({ selectedCurrency: value });
  }

  txtInputFeesProps = {
    onChangeText: (text: string) => {
      this.setState({ fees: text });
    },
  }

  txtInputAddMessageProps = {
    onChangeText: (text: string) => {
      this.setState({ additionalMessage: text });
    },
  };

  renderStyleOfDataTImeFieldAccordingToOS = () => {
      if (Platform.OS === 'ios') {
        return 'paddTopBott'
      } else {
        return 'padd'
      }
    }

    getTimeSelectionModalOpen = (type: string) => {
      if (type.toLowerCase() === 'start time') {
        this.setState({isTimeSelectionModelOpen: true, timeType: type, selectedStartTimeTxt: this.convertDateTimeIntoTime(this.state.selectedStartTime || new Date()) });
      } else {
        this.setState({isTimeSelectionModelOpen: true, timeType: type, selectedEndTimeTxt: this.convertDateTimeIntoTime(this.state.selectedEndTime || new Date()) });
      }
    }

    onStartAndEndTimeChange = (dateTime: Date) => {
      if (this.state.timeType.toLowerCase() === 'start time') {
        this.setState({ selectedStartTime: dateTime, selectedStartTimeTxt: this.convertDateTimeIntoTime(dateTime) });
      } else {
        this.setState({ selectedEndTime: dateTime, selectedEndTimeTxt: this.convertDateTimeIntoTime(dateTime) });
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

    renderUIStyleOfEndTime = () => {
      if (this.state.selectedEndTimeTxt === '') {
        return 'errorOfField'
      } else {
        return 'textFieldBg'
      }
    }

    closeTimeSelectionModel = () => {
      this.setState({ 
        isTimeSelectionModelOpen: false, 
        selectedStartTimeTxt: this.state.timeType.toLowerCase() === 'start time' ? '' : this.state.selectedStartTimeTxt,
        selectedEndTimeTxt: this.state.timeType.toLowerCase() === 'end time' ? '' : this.state.selectedEndTimeTxt
        
      });
    }

    noToChangesTimeSelection = {
      onPress: () => {
        this.closeTimeSelectionModel();
      }
    }

    yesProceedToChangesTimeSelection = {
      onPress: () => {
        if (this.getButtonEnabledForTimeSave()) {
          this.setState({ 
            isTimeSelectionModelOpen: false, 
          });
        }
      }
    }
  
    getButtonEnabledForTimeSave = () => {
      if (this.state.timeType.toLowerCase() === 'start time' && this.state.selectedStartTimeTxt !== '') {
        return true;
      } else if (this.state.timeType.toLowerCase() === 'end time' && this.state.selectedEndTimeTxt !== '') {
        return true;
      } else {
        return false;
      }
    }

  // Customizable Area End
}
