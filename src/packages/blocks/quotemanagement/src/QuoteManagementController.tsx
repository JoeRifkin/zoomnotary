import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
export interface Comments {

  id: number,
  quotemanagement_id: number,
  account_id: number,
  rejection_comment: string
  reated_at: string
  updated_at: string

}
export interface UserList {
  id: number;
  attributes: {
    account_id: number;
    item_name: string;
    item_quantity: number;
    item_price: number;
    description: string;
    discount: number;
    status: string;
    total_amount: number;
    archived: boolean;
    organization: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    },
    comments: [
      {
        id: number,
        quotemanagement_id: number,
        account_id: number,
        rejection_comment: string
        reated_at: string
        updated_at: string

      }

    ]
  }
}
export interface Login {
  meta: {
    token: string,

    role: string,

  }
  errors: [{
    failed_login: string
  }
  ]

}
interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  selectOrganisation: string[];
  userQuoteList: UserList[];
  userQuoteFilterData: UserList[];
  itemName: string;
  itemPrice: string,
  itemQuantity: string,
  itemDiscount: string,
  itemDescription: string,
  itemComments: string,
  itemOrganisation: string,
  value: string,
  updateId: number,
  levelQuoteList: UserList[],
  itemStatus: string,
  filterStatus: string,
  archiveStatus: string,
  archiveList: UserList[],
  setValues: { attributes: { organization: object, comments: [] } }
  setValues2: {
    attributes: {
      item_name: string,
      item_price: number,
      item_quantity: number,
      discount: number,
      description: string,
      status: string,
      organization: { name: string }, comments: []
    }
  }
  listOfStatus: string[],
  regName: string;
  regEmail: string;
  regPhone: string;
  listOfStatusFinal: string[],
  listOfStatusFilter: string[],
  currentPage: number,
  totalData: number,
  totalPage: number,
  token: string,
  filterData: string,
  isLoading: boolean,
  selectRole: string,
  accountId: number
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
  organisationAPICallId: string = "";
  quoteAPICallId: string = "";
  userQuoteAPI: string = "";
  updateQuoteAPI: string = "";
  focusListener: { remove: () => void } = { remove: () => { } };
  commentQuoteAPI: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      selectOrganisation: [],
      userQuoteList: [],
      levelQuoteList: [],
      userQuoteFilterData: [],
      regName: "",
      regEmail: "",
      regPhone: "",
      itemName: "",
      itemPrice: "",
      itemQuantity: "",
      itemDiscount: "",
      itemDescription: "",
      itemComments: "",
      itemOrganisation: "",
      value: "",
      updateId: 0,
      itemStatus: "",
      filterStatus: "all",
      archiveStatus: "true",
      archiveList: [],
      listOfStatus: ["partially_approved", "rejected"],
      listOfStatusFinal: ["rejected", "approved"],
      listOfStatusFilter: ["All", "rejected", "approved", "partially_approved", "under_review"],
      setValues: { attributes: { organization: {}, comments: [] } },
      setValues2: {
        attributes: {
          item_name: "",
          item_price: 0,
          item_quantity: 0,
          discount: 0,
          description: "",
          status: "",
          organization: { name: "" }, comments: []
        }
      },
      currentPage: 1,
      totalData: 0,
      totalPage: 0,
      filterData: "all",
      isLoading: true,
      //  Before start you can put the token and Role
      token: "",
      selectRole: "",
      accountId: 0
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    switch (apiRequestCallId) {
      case this.organisationAPICallId:
        this.handleOrganisationResponse(responseJson);
        break;
      case this.quoteAPICallId:
        this.handleQuoteResponse(responseJson);
        break;
      case this.userQuoteAPI:
        this.handleUserQuoteResponse(responseJson);
        break;
      case this.updateQuoteAPI:
        this.handleUpdateQuoteResponse(responseJson);
        break;
      case this.commentQuoteAPI:
        this.handleCommentQuoteResponse(responseJson);
        break;
      // Customizable Area Start
      // Customizable Area End
    }
  }

  // Customizable Area Start

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({ userQuoteList: [] });
      this.user_Quote(1)
      this.select_Org()
    });
    this.select_Org();
    this.user_Quote(1);
    this.setData();
  }


  handleOrganisationResponse(responseJson: string[]) {
    if (responseJson) {
      this.setState({ selectOrganisation: responseJson });
    }

  }
   handleQuoteResponse(responseJson: string) {
    if (responseJson) {

      Alert.alert(
        '',
        'Successfully Generated',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.goBack()
          }
        ]
      );

      this.user_Quote(1);
    }
  }

  handleUserQuoteResponse(responseJson: { quotes: { data: UserList[] }, total_data: number, total_page: number }) {

    if (responseJson != null) {
      this.setState({
        totalData: responseJson.total_data,
        userQuoteList: [...this.state.userQuoteList, ...responseJson.quotes.data],
        userQuoteFilterData: responseJson.quotes.data,
        totalPage: responseJson.total_page,
        isLoading: false
      });
    } else {
      this.setState({ isLoading: false })
      Alert.alert("", "Something went wrong")
    }
  }

  handleUpdateQuoteResponse(responseJson: string) {
    if (responseJson) {
      Alert.alert(
        '',
        'Data has been successfully updated.',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.goBack()
          }
        ]
      );

    }
  }



  handleCommentQuoteResponse(responseJson: string) {
    if (responseJson) {
      Alert.alert(
        'Note',
        'Successfully updated.',
        [
          {
            text: 'Ok',

            onPress: () => this.props.navigation.goBack()
          }
        ]
      );
    }
  }

   setData = () => {
    const editedValue = this.props.navigation.state.params.editUserDetails
    this.setState({
      itemName: editedValue.attributes.item_name,
      itemPrice: JSON.stringify(editedValue.attributes.item_price),
      itemQuantity: JSON.stringify(editedValue.attributes.item_quantity),
      itemDiscount: JSON.stringify(editedValue.attributes.discount),
      itemDescription: editedValue.attributes.description
    })
    const get_value = this.props.navigation.state.params.passValue
    this.setState({ itemStatus: get_value.attributes.status })
  }
    addQuote = () => {
    this.props.navigation.navigate("CreateQuote")
  }
  passValue = (item: UserList) => {
    this.props.navigation.navigate("EditQuotation",
      { editUserDetails: item }
    )
  }
  passLevelValue = (item: UserList) => {
    this.props.navigation.navigate("QuoteDetails", { passValue: item })
  }
  passLevelValue2 = (item: UserList) => {
    this.props.navigation.navigate("QuoteDetailsLevel2", { passValue: item })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }
  getLevel1Data = () => {
    return this.props.navigation.state.params.passValue
  }

  getEditUserData = () => {
    return this.props.navigation.state.params.EditQuotation
  }
  getLevel2Data = () => {
    return this.props.navigation.state.params.passValue
  }

   select_Org = () => {
    const header = {
      "Content-Type": "application/json",
      "token": this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.organisationAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.select_Org
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }
  create_Quote = async () => {
    let formdata = new FormData();
    formdata.append("organization_id", this.state.itemOrganisation);
    formdata.append("item_name", this.state.itemName);
    formdata.append("item_price", this.state.itemPrice);
    formdata.append("item_quantity", this.state.itemQuantity);
    formdata.append("discount", this.state.itemDiscount);
    formdata.append("description", this.state.itemDescription);
    const header = {
      "Content-Type": "multipart/form-data",
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.quoteAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.create_Quote
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }
  user_Quote = async (page: number) => {
    this.setState({ currentPage: page, isLoading: true })
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.userQuoteAPI = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_quotemanagement/quotemanagements?status=${this.state.filterData}&page=${page}&per_page=15`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }
  update_Quote = () => {

    const editedValue = this.props.navigation.state.params.editUserDetails
    let formdata = new FormData();
    formdata.append("item_name", this.state.itemName);
    formdata.append("item_quantity", this.state.itemQuantity);
    formdata.append("item_price", this.state.itemPrice);
    formdata.append("description", this.state.itemDescription);
    formdata.append("discount", this.state.itemDiscount);
    formdata.append("staus", 'under_review');
    formdata.append("id", this.state.itemOrganisation);
    const header = {
      "Content-Type": "multipart/form-data",
      "token": this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.updateQuoteAPI = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_quotemanagement/quotemanagements/${editedValue?.id}`

    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PATCH"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  comment_Quote = async () => {
    const get_value = this.props.navigation.state.params.passValue

    let formdata = new FormData();

    formdata.append("comment", this.state.itemComments);
    formdata.append("status", this.state.itemStatus);

    const header = {
      "Content-Type": "multipart/form-data",
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.commentQuoteAPI = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.comment_Quote + "approve_or_reject/" + get_value?.id
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PATCH"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
 
  setName = (nameValue: string) => {
    this.setState({
      itemName: nameValue
    })
  }
  setPrice = (priceValue: string) => {
    this.setState({
      itemPrice: priceValue
    })

  }
  setQuantity = (quantityValue: string) => {
    this.setState({
      itemQuantity: quantityValue
    })

  }
  setDiscount = (discountValue: string) => {
    this.setState({
      itemDiscount: discountValue
    })

  }
  setDescription = (desValue: string) => {
    this.setState({
      itemDescription: desValue
    })

  }
  setComment = (commentValue: string) => {
    this.setState({
      itemComments: commentValue
    })

  }
  selectState() {
    this.setState({ selectRole: "final_approver", currentPage: 3 })
  }
  selectedItem = (selectedItem: string) => {
    this.setState({ itemOrganisation: selectedItem });
  }
  selectStateCreator() {
    this.setState({ selectRole: "creater" })
  }
  selectedItemStatus = (selectedItem: string) => {
    this.setState({ itemStatus: selectedItem });
  }
  selectedItemFilter = (selectedItem: string) => {
    this.setState({ filterData: selectedItem.toLowerCase(), userQuoteList: [] }, () => {
      this.user_Quote(1);
    });
  }
  onReachEndMain = () => {
    if (this.state.currentPage != this.state.totalPage) {
      this.user_Quote(this.state.currentPage + 1)
    }
  }

  getEditRole = (item: string, role: string, account_id: number) => {

    if (((item == "under_review") || (item == "rejected")) && role == "creater" && account_id == this.state.accountId) {
      return true;
    } else {
      return false;
    }

  }
  getItemColor(role: string) {
    if (role == "creater") {
      return "#6C7EF1";
    } else if (role == "final_approver") {
      return "#F2C549";
    } else {
      return "#D2B4DE";
    }
  }
  onPressCondition(item: UserList, role: string) {
    if (role != 'creater') {
      if (item.attributes.status == 'approved' || item.attributes.status == 'rejected') {
        Alert.alert("", "You can not change from Approved or Reject")
      } else {
        if (role == "final_approver") {
          this.passLevelValue2(item);
        } else {
          this.passLevelValue(item);
        }
      }
    }
  }
  // Customizable Area End
}

