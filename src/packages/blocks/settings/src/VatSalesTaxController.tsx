// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { } from "./assets";


interface ErrorResponse {
  error: string;
}

interface SalesTaxWithoutVATAttributes {
  account_id: number;
  has_vat: boolean;
  id: number;
  vat_number: string;
}

interface SalesTaxWithVATAttributes {
  account_id: number;
  has_vat: boolean;
  id: number;
  vat_number: string;
}

interface SalesTaxData<T> {
  id: string;
  type: string;
  attributes: T;
}

interface SalesTaxWithoutVATResponse {
  data: SalesTaxData<SalesTaxWithoutVATAttributes>;
}

interface SalesTaxWithVATResponse {
  data: SalesTaxData<SalesTaxWithVATAttributes>;
}

type ApiResponse = ErrorResponse | SalesTaxWithoutVATResponse | SalesTaxWithVATResponse;
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  // Customizable Area Start
  getUserRole: string;
  token: string;
  isCheckBoxOnVatTax: boolean;
  isShowCheckBox: boolean;
  detailOfVatNumber: SalesTaxWithVATResponse | SalesTaxWithoutVATResponse | null;
  selectedRadioBtn: string;
  VatNumber: string;
  isValidateField: boolean;
  showVatUpdatedValue: boolean;
  isSucessMsgModel: boolean;
  errorMessage: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class VatSalesTaxController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiCallToCheckVatTaxAdded: string = "";
  apiCallToCreateAndUpdateVatTax: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
      // Customizable Area Start
      getUserRole: '',
      token: '',
      isCheckBoxOnVatTax: false,
      isShowCheckBox: false,
      detailOfVatNumber: null,
      selectedRadioBtn: '',
      VatNumber: '',
      isValidateField: false,
      showVatUpdatedValue: false,
      isSucessMsgModel: false,
      errorMessage: ''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.storeTokenAndRole(message)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if ((apiRequestCallId === this.apiCallToCheckVatTaxAdded || apiRequestCallId === this.apiCallToCreateAndUpdateVatTax) && responseJson !== undefined) {
        this.manageApiResponse(responseJson, apiRequestCallId)
      }
    }
    // Customizable Area End
  }



  // Customizable Area Start

  manageApiResponse = (response: ApiResponse, apiRequestCallId: string) => {
    if (apiRequestCallId === this.apiCallToCheckVatTaxAdded) {
      if ('error' in response) {
        this.setState({
          isShowCheckBox: true,
          selectedRadioBtn: ''
        });
      } else {
        const { has_vat, vat_number } = response.data.attributes;

        this.setState({
          detailOfVatNumber: response,
          VatNumber: vat_number,
          showVatUpdatedValue: true,
          selectedRadioBtn: has_vat ? 'have' : 'notHave',
        });
      }
    } else if (apiRequestCallId === this.apiCallToCreateAndUpdateVatTax) {
      if ('error' in response) {
        this.setState({errorMessage: response.error[0]})
      }else {
        this.setState({ isSucessMsgModel: true, showVatUpdatedValue: true, errorMessage: '' })
        setTimeout(() => {
          this.closeSucessMsgModel()
        }, 3000);
      }
    }

  };

  selectNotHaveRadio = {
    onPress: () => {
      this.setState({ selectedRadioBtn: 'notHave', VatNumber: '' })
    }
  }

  selectHaveRadio = {
    onPress: () => {
      this.setState({ selectedRadioBtn: 'have' })
    }
  }

  isSaveDetailBtnEnable = () => {
    if (this.state.selectedRadioBtn === 'notHave') {
      return true
    } else if (this.state.selectedRadioBtn === 'have' && this.state.VatNumber !== '') {
      return true
    } else {
      return false
    }
  }

  btnGoBack = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    }
  }

  btnCheckBoxOnVatTaxProps = {
    onPress: () => {
      this.setState({ isCheckBoxOnVatTax: !this.checkBoxOnVatTaxProps.isChecked });
      this.checkBoxOnVatTaxProps.isChecked = !this.checkBoxOnVatTaxProps.isChecked;
    },
  };

  checkBoxOnVatTaxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ isCheckBoxOnVatTax: value });
      this.checkBoxOnVatTaxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnAddDetailsProps = {
    onPress: () => {
      if (this.state.isCheckBoxOnVatTax) {
        this.setState({ isShowCheckBox: false })
      }
    }
  }

  btnEditDetailsProps = {
    onPress: () => {
      this.setState({ showVatUpdatedValue: false })
    }
  }

  btnCancelProps = {
    onPress: () => {
      const vat_number = this.state.detailOfVatNumber?.data.attributes.vat_number;

      this.setState({ showVatUpdatedValue: true, VatNumber: vat_number ? vat_number : '',
        selectedRadioBtn: this.state.detailOfVatNumber?.data.attributes.has_vat ? 'have' : 'notHave', })
    }
  }

  storeTokenAndRole = (message: Message) => {
    const myData = message.getData(
      getName(MessageEnum.CustomDataMessage)
    );
    if (myData) {
      this.setState({ token: myData.token, getUserRole: myData.role }, () => {
        this.getVatTaxAddedDetail()
      })
    }
  }

  getVatTaxAddedDetail(): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCallToCheckVatTaxAdded = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.showVatTaxApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  checkIsSpaceInclude = () => {
    const regex = /^[a-zA-Z]{2}\d+$/;
    return regex.test(this.state.VatNumber)
  }

  checkIsApiCallApplicable = () => {
    if(this.state.selectedRadioBtn === 'notHave'){
      return true
    } else if(this.state.selectedRadioBtn === 'have' && this.checkIsSpaceInclude() && this.checkVatNumberMinLength()){
      return true
    } else {
      return false
    }
  }

  btnSaveDetailsProps = {
    onPress: () => {
      this.setState({ isValidateField: true })
      if (!this.checkIsApiCallApplicable()) {
        return false;
      }
      this.setState({ isValidateField: false })
      this.saveAndModifyVatNumber()
    }
  }

  saveAndModifyVatNumber(): boolean {

    const header = {
      token: this.state.token,
      "Content-Type": configJSON.validationApiContentType,
    }

    const payload = {
      "vat":
      {
        "has_vat": this.state.selectedRadioBtn === 'have' ? true : false,
        "vat_number": this.state.VatNumber
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCallToCreateAndUpdateVatTax = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createUpdateVatTacApiEndpoint
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
      configJSON.POST
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true
  }

  txtInputVaTNumberProps = {
    onChangeText: (text: string) => {
      this.setState({ VatNumber: text, errorMessage: '' });
    },
  }

  checkVatNumberMinLength = () => {
    if (this.state.VatNumber !== undefined && this.state.VatNumber.length >= 9) {
      return true
    } else {
      return false
    }
  }

  isCheckVatNumberValid = () => {
    if (!this.checkVatNumberMinLength() && this.state.isValidateField) {
      return true
    } else {
      return false
    }
  }

  closeSucessMsgModel = () => {
    this.setState({ isSucessMsgModel: false })
  }

  showErrorMsgForVatNumber = () => {
    if(this.state.isValidateField && (this.isCheckVatNumberValid() || !this.checkIsSpaceInclude())){
      return true
    } else {
      return false
    }
  }

  
  
  // Customizable Area End
}
