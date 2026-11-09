import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ITask, ITaskList } from "./types";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  id: number;
  // Customizable Area Start
  name: string;
  editMode: boolean;
  token: string;
  taskLists: ITaskList[];
  tasksData: ITask[];
  selectedTasks: ITask[];
  isVisibleModal: boolean;
  dropdownTasks: boolean;
  // Customizable Area End
}

export interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TaskListController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getTaskListsApiCallId = "";
  postTaskListApiCallId = "";
  putTaskListApiCallId = "";
  deleteTaskListApiCallId = "";
  getTasksApiCallId = "";
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
      id: 0,
      name: "",
      editMode: false,
      token: "",
      taskLists: [],
      tasksData: [],
      selectedTasks: [],
      isVisibleModal: false,
      dropdownTasks: false,
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

    // Condition for fetching task list.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getTaskListsApiCallId != null &&
      this.getTaskListsApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.setState({
          taskLists: responseJson.data.sort(
            (a: ITaskList, b: ITaskList) => a.id - b.id
          ),
        });
      } else {
        this.showAlert("Alert", "No Data", "");
        this.setState({ taskLists: [] });

        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for creating new task list.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.postTaskListApiCallId != null &&
      this.postTaskListApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getTaskLists(this.state.token);
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

    // Condition for edit task list.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.putTaskListApiCallId != null &&
      this.putTaskListApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.data) {
        this.getTaskLists(this.state.token);
        this.setState({ isVisibleModal: false });
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for delete task list.
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.deleteTaskListApiCallId != null &&
      this.deleteTaskListApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson.errors && responseJson.message) {
        this.getTaskLists(this.state.token);
      } else {
        const errorResponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorResponse);
      }
    }

    // Condition for fetch tasks.
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
        let data = responseJson.data.map((task: ITask, i: number) => {
          if (this.state.selectedTasks.length > 0) {
            let itemExist = this.state.selectedTasks.findIndex(
              (task1: ITask) => task1.id == task.id
            );
            if (itemExist != -1) {
              return { ...task, isSelected: true };
            } else {
              return { ...task, isSelected: false };
            }
          } else {
            return { ...task, isSelected: false };
          }
        });
        this.setState({
          tasksData: data,
        });
      } else {
        this.showAlert("Alert", "No Data", "");
        this.setState({ tasksData: [] });

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

  showAddModal = () => {
    this.getTasks(this.state.token);
    this.setState({
      name: "",
      dropdownTasks: false,
      isVisibleModal: !this.state.isVisibleModal,
      editMode: false,
    });
  };

  handleInputName = (name: string) => {
    this.setState({ name });
  };

  expandTasksView = () => {
    this.setState({ dropdownTasks: !this.state.dropdownTasks });
  };

  showEditModal = () => {
    this.setState({
      isVisibleModal: !this.state.isVisibleModal,
      editMode: true,
    });
  };

  handleEditSelect = (item: ITaskList) => {
    this.getTasks(this.state.token);
    this.setState({
      id: item.id,
      name: item.attributes.name,
      selectedTasks: item.attributes.tasks,
      dropdownTasks: false,
    });
    this.showEditModal();
  };

  handleTasksSelect = (dataId: string) => {
    let newData = this.state.tasksData.map((task: ITask) => {
      if (task.id === dataId) {
        return { ...task, isSelected: !task.isSelected };
      }
      return task;
    });
    this.setState({ tasksData: newData });
  };

  // Function to fetch task list from the API
  getTaskLists = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTaskListsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.tasksListApiEndPoint}`
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

  // Function to add new task list and send it to API
  addTaskList = () => {
    if (this.isStringNullOrBlank(this.state.name)) {
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
      let taskIds: string[] = [];
      this.state.tasksData.map((task: ITask) => {
        if (task.isSelected) {
          taskIds.push(task.id);
        }
      });
      const httpBody = {
        name: this.state.name,
        task_ids: taskIds,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.postTaskListApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.tasksListApiEndPoint
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

  // Function to edit task list and send it to API
  editTaskList = (tasklistId: number) => {
    if (this.isStringNullOrBlank(this.state.name)) {
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
      let taskIds: string[] = [];
      this.state.tasksData.map((task: ITask) => {
        if (task.isSelected) {
          taskIds.push(task.id);
        }
      });
      const httpBody = {
        name: this.state.name,
        task_ids: taskIds,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.putTaskListApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.tasksListApiEndPoint + "/" + `${tasklistId}`
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

  // Function to delete task list and send it to API
  deleteTaskList = (tasklistId: number) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteTaskListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.tasksListApiEndPoint + "/" + `${tasklistId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Function to fetch tasks from the API
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
  // Customizable Area End
}
