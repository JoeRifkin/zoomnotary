import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
  IGroup,
  IAccount,
  IGroupAccount,
  ITask,
  Status,
  Priority,
} from "./types";
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
  title: string;
  description: string;
  priority: string;
  status: string;
  assign_to: string;
  assign_to_type: string;
  editMode: boolean;
  token: string;
  taskList: ITask[];
  isVisibleModal: boolean;
  isVisibleAssignModal: boolean;
  dropdownGroup: boolean;
  dropdownStatus: boolean;
  dropdownAccount: boolean;
  dropdownPriority: boolean;
  groupList: IGroup[];
  statusList: Status[];
  priorityList: Priority[];
  selectedAccounts: IGroupAccount[];
  accountsData: IAccount[];
  // Customizable Area End
}

export interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TaskController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getTasksApiCallId = "";
  postTaskApiCallId = "";
  putTaskApiCallId = "";
  deleteTaskApiCallId = "";
  getGroupsApiCallId = "";
  assignGroupApiCallId = "";
  getAccountsApiCallId = "";
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
      id: "",
      title: "",
      description: "",
      priority: "",
      status: "",
      assign_to: "",
      assign_to_type: "",
      editMode: false,
      token: "",
      taskList: [],
      isVisibleModal: false,
      isVisibleAssignModal: false,
      dropdownGroup: false,
      dropdownStatus: false,
      dropdownAccount: false,
      dropdownPriority: false,
      groupList: [],
      selectedAccounts: [],
      accountsData: [],
      statusList: [
        { id: 1, name: "to_do" },
        { id: 2, name: "in_progress" },
        { id: 3, name: "complete" },
      ],
      priorityList: [
        { id: 1, name: "low" },
        { id: 2, name: "medium" },
        { id: 3, name: "high" },
      ],
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

    // Condition for fetching tasks list.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getTasksApiCallId != null &&
      this.getTasksApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.setState({
          taskList: responseJson.data.sort(
            (a: ITask, b: ITask) => parseInt(a.id) - parseInt(b.id)
          ),
        });
      } else {
        this.showAlert("Alert", "No Data", "");
        this.setState({ taskList: [] });

        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition to create new task.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.postTaskApiCallId != null &&
      this.postTaskApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getTasks(this.state.token);
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
      this.getGroups(token);
    }

    // Condition to edit task details.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.putTaskApiCallId != null &&
      this.putTaskApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getTasks(this.state.token);
        this.setState({ isVisibleModal: false });
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition to delete task.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.deleteTaskApiCallId != null &&
      this.deleteTaskApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.message) {
        this.getTasks(this.state.token);
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition to fetch group list.
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
            (a: IGroup, b: IGroup) => parseInt(a.id) - parseInt(b.id)
          ),
        });
      } else {
        this.setState({ groupList: [] });
      }
    }

    // Condition to assign task to the groups/accounts.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.assignGroupApiCallId != null &&
      this.assignGroupApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getTasks(this.state.token);
        this.setState({ isVisibleAssignModal: false });
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition to fetch accounts list.
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
        let data = responseJson.data.map((account: IGroupAccount) => {
          if (this.state.selectedAccounts.length > 0) {
            let itemExist = this.state.selectedAccounts.findIndex(
              (gAccount: IGroupAccount) => gAccount.id == account.id
            );
            if (itemExist != -1) {
              return { ...account, isSelected: true };
            } else {
              return { ...account, isSelected: false };
            }
          } else {
            return { ...account, isSelected: false };
          }
        });
        this.setState({
          accountsData: data,
        });
      } else {
        this.showAlert("Alert", "No Data", "");
        this.setState({ accountsData: [] });

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
    this.setState({ isVisibleModal: false });
  };

  hideAssignModal = () => {
    this.setState({ isVisibleAssignModal: false });
  };

  handleInputTitle = (title: string) => {
    this.setState({ title });
  };

  handleInputDescription = (description: string) => {
    this.setState({ description });
  };

  toggleAssignModal = () => {
    this.getAccounts(this.state.token);
    this.getGroups(this.state.token);
    this.setState({
      dropdownAccount: false,
      dropdownGroup: false,
      isVisibleAssignModal: !this.state.isVisibleAssignModal,
      editMode: true,
    });
  };

  showAddModal = () => {
    this.setState({
      title: "",
      description: "",
      priority: "",
      status: "",
      isVisibleModal: !this.state.isVisibleModal,
      editMode: false,
    });
  };

  showEditModal = () => {
    this.setState({
      isVisibleModal: !this.state.isVisibleModal,
      editMode: true,
    });
  };

  expandGroupView = () => {
    this.setState({
      dropdownGroup: !this.state.dropdownGroup,
    });
  };

  expandStatusView = () => {
    this.setState({
      dropdownStatus: !this.state.dropdownStatus,
    });
  };

  expandPriorityView = () => {
    this.setState({
      dropdownPriority: !this.state.dropdownPriority,
    });
  };

  expandAccountsView = () => {
    this.setState({ dropdownAccount: !this.state.dropdownAccount });
  };

  handleAccountSelect = (dataId: string) => {
    let newData = this.state.accountsData.map((account: IAccount) => {
      if (account.id === dataId) {
        return { ...account, isSelected: !account.isSelected };
      }
      return account;
    });
    this.setState({ accountsData: newData });
  };

  handleSelectPriority = (item: Priority) => {
    this.setState({ priority: item.name, dropdownPriority: false });
  };

  handleSelectStatus = (item: Status) => {
    this.setState({ status: item.name, dropdownStatus: false });
  };

  handleAssignToModal = (item: ITask) => {
    this.setState({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      priority: item.attributes.priority,
      status: item.attributes.status,
    });
    if (item.attributes.assigned_to) {
      this.setState({
        assign_to:
          item.attributes.assigned_to.type === "group"
            ? item.attributes.assigned_to.attributes.name
            : item.attributes.assigned_to.attributes?.first_name || "",
        assign_to_type: item.attributes.assigned_to.type,
      });
    }
    this.toggleAssignModal();
  };

  handleEditTask = (item: ITask) => {
    this.setState({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      priority: item.attributes.priority,
      status: item.attributes.status,
    });
    this.showEditModal();
  };

  // Function to fetch tasks list from the API
  getTasks = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTasksApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.tasksApiEndPoint}`
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

  // Function to add new task and send it to API
  addTask = () => {
    if (
      this.isStringNullOrBlank(this.state.title) ||
      this.isStringNullOrBlank(this.state.description)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
      };
      const httpBody = {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        priority: this.state.priority,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.postTaskApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.tasksApiEndPoint
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

  // Function to update task details and send it to API
  editTask = (taskId: string) => {
    if (
      this.isStringNullOrBlank(this.state.title) ||
      this.isStringNullOrBlank(this.state.description)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
      };
      const httpBody = {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        priority: this.state.priority,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.putTaskApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.tasksApiEndPoint + "/" + `${taskId}`
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

  // Function to delete task and send it to API
  deleteTask = (taskId: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteTaskApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.tasksApiEndPoint + "/" + `${taskId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Function to fetch groups list from the API
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

  // Function to assign task to groups/accounts and sent it to the API
  handleAssignTo = (
    taskId: string,
    assignToType: string,
    assignToId: string
  ) => {
    if (
      this.isStringNullOrBlank(taskId) ||
      this.isStringNullOrBlank(assignToId)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
      };
      const httpBody = {
        assigned_to_type: assignToType,
        assigned_to_id: assignToId,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.assignGroupApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.tasksApiEndPoint + "/" + `${taskId}` + "/assign"
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

  // Function to fetch accounts list from the API
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
  // Customizable Area End
}
