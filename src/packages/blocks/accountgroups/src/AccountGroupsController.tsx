import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Account, Group, GroupAccount } from "./types";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  id: string;
  // Customizable Area Start
  name: string;
  createdAt: string;
  updatedAt: string;
  editMode: boolean;
  token: string;
  groupList: Group[];
  isVisibleModal: boolean;
  isVisibleAddAccountModal: boolean;
  isVisibleDeleteAccountModal: boolean;
  accountsData: Account[];
  modalAccData: Account[];
  selectedAccounts: GroupAccount[];
  dropdownAccountStatus: boolean;
  fieldError: boolean;
  // Customizable Area End
}

export interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class AccountGroupsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getGroupsApiCallId = "";
  getAccountsApiCallId = "";
  postGroupApiCallId = "";
  putGroupApiCallId = "";
  deleteGroupApiCallId = "";
  postAddAccountsApiCallId = "";
  postRemoveAccountsApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      id: "0",
      name: "",
      createdAt: "",
      updatedAt: "",
      editMode: false,
      token: "",
      groupList: [],
      isVisibleModal: false,
      isVisibleAddAccountModal: false,
      isVisibleDeleteAccountModal: false,
      accountsData: [],
      modalAccData: [],
      dropdownAccountStatus: false,
      selectedAccounts: [],
      fieldError: false,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
  }

  receive = async (from: string, message: Message) => {
    runEngine.debugLog("Message Received", message);
    // Condition for fetching group list.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getGroupsApiCallId != null &&
      this.getGroupsApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.setState({
          groupList: responseJson.data.sort(
            (a: Group, b: Group) => parseInt(a.id) - parseInt(b.id)
          ),
        });
      } else {
        this.showAlert("Alert", "No Data");
        this.setState({ groupList: [] });

        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for creating new group.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.postGroupApiCallId != null &&
      this.postGroupApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getGroups(this.state.token);
        this.setState({ isVisibleModal: false });
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    } else if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Received", message);

      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    }

    // Condition for updating group details.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.putGroupApiCallId != null &&
      this.putGroupApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getGroups(this.state.token);
        this.setState({ isVisibleModal: false });
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for deleting group.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.deleteGroupApiCallId != null &&
      this.deleteGroupApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.message) {
        this.getGroups(this.state.token);
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for fetching user account list
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAccountsApiCallId != null &&
      this.getAccountsApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        const data = responseJson.data.map((account: Account) => {
          return { ...account, isSelected: false };
        });
        this.setState({
          accountsData: data,
        });
      } else {
        this.setState({ accountsData: [] });
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for adding account to the group
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.postAddAccountsApiCallId != null &&
      this.postAddAccountsApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getGroups(this.state.token);
        this.setState({ isVisibleAddAccountModal: false });
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for removing account to the group
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.postRemoveAccountsApiCallId != null &&
      this.postRemoveAccountsApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getGroups(this.state.token);
        this.setState({ isVisibleDeleteAccountModal: false });
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }
  };

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  isStringNullOrBlank = (str: string) => {
    return str === null || str.length === 0;
  };

  hideModal = () => {
    this.setState({ isVisibleModal: !this.state.isVisibleModal });
  };

  hideAddAccountModal = () => {
    this.setState({ isVisibleAddAccountModal: false });
  };

  hideDeleteAccountModal = () => {
    this.setState({ isVisibleDeleteAccountModal: false });
  };

  showAddModal = () => {
    this.setState({
      name: "",
      editMode: false,
      fieldError: false,
      isVisibleModal: !this.state.isVisibleModal,
    });
  };

  handleInputName = (name: string) => {
    this.setState({ name, fieldError: false });
  };

  showHideAddAccountModal = () => {
    this.setState({
      isVisibleAddAccountModal: !this.state.isVisibleAddAccountModal,
      editMode: true,
    });
  };

  handleAddAccounts = (group: Group) => {
    let accArr: any[] = [];
    if (group.attributes.accounts.length > 0) {
      accArr = this.state.accountsData.filter(
        (ar) =>
          !group.attributes.accounts.find((rm) => rm.id.toString() === ar.id)
      );
    } else {
      accArr = this.state.accountsData;
    }

    this.setState({
      id: group.id,
      name: group.attributes.name,
      modalAccData: accArr,
    });
    this.showHideAddAccountModal();
  };

  showHideDeleteAccountModal = () => {
    this.setState({
      isVisibleDeleteAccountModal: !this.state.isVisibleDeleteAccountModal,
      editMode: true,
    });
  };

  handleDeleteAccounts = (group: Group) => {
    const accData = group.attributes.accounts.map((account: GroupAccount) => {
      return { ...account, isSelected: false };
    });
    this.setState({
      id: group.id,
      name: group.attributes.name,
      selectedAccounts: accData,
    });
    this.showHideDeleteAccountModal();
  };

  handleEditGroup = (group: Group) => {
    this.setState({ id: group.id, name: group.attributes.name });
    this.showEditModal();
  };

  showEditModal = () => {
    this.setState({
      isVisibleModal: !this.state.isVisibleModal,
      editMode: true,
    });
  };

  expandAccountsView = () => {
    this.setState({ dropdownAccountStatus: !this.state.dropdownAccountStatus });
  };

  handleAccountSelect = (accountId: string) => {
    const newData = this.state.modalAccData.map((account: Account) => {
      if (account.id === accountId) {
        return { ...account, isSelected: !account.isSelected };
      }
      return account;
    });
    this.setState({ modalAccData: newData });
  };

  handleDeleteAccountSelect = (groupAccountId: number) => {
    const newData = this.state.selectedAccounts.map((account: GroupAccount) => {
      if (account.id === groupAccountId) {
        return { ...account, isSelected: !account.isSelected };
      }
      return account;
    });
    this.setState({ selectedAccounts: newData });
  };

  handleGetGroups = () => {
    this.getGroups(this.state.token);
    this.getAccounts(this.state.token);
  };

  // Function to fetch the group list from API
  getGroups = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getGroupsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.groupsApiEndPoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Function to add new group and send it to API
  addGroup = () => {
    if (this.isStringNullOrBlank(this.state.name)) {
      this.setState({ fieldError: true });
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
      };
      const httpBody = {
        name: this.state.name,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.postGroupApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.groupsApiEndPoint
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
        configJSON.postApiMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };

  // Function to edit group and send it to API
  editGroup = (groupId: string) => {
    if (this.isStringNullOrBlank(this.state.name)) {
      this.setState({ fieldError: true });
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
      };
      const httpBody = {
        name: this.state.name,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.putGroupApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.groupsApiEndPoint + "/" + `${groupId}`
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
        configJSON.putApiMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };

  // Function to delete group and send it to API
  deleteGroup = (groupId: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteGroupApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.groupsApiEndPoint + "/" + `${groupId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Function to fetch the accounts list from API
  getAccounts = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAccountsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.tasksAccountsApiEndPoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Function to save accounts to the group and send it to API
  handleSaveAccountsToGroup = (groupId: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const accountIds: string[] = [];
    this.state.modalAccData.map((account: Account) => {
      if (account.isSelected) {
        accountIds.push(account.id);
      }
    });
    const httpBody = {
      account_ids: accountIds,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postAddAccountsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.groupsApiEndPoint + "/" + `${groupId}` + "/add_accounts"
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
      configJSON.postApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Function to remove accounts from the group and send it to API
  handleRemoveAccountsToGroup = (groupId: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const accountIds: string[] = [];
    this.state.selectedAccounts.map((account: GroupAccount) => {
      if (account.isSelected) {
        accountIds.push(account.id.toString());
      }
    });
    const httpBody = {
      account_ids: accountIds,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postRemoveAccountsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.groupsApiEndPoint + "/" + `${groupId}` + "/remove_accounts"
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
      configJSON.postApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
