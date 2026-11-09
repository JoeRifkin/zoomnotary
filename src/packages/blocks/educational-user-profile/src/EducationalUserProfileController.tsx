import moment from "moment/moment";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Linking } from "react-native";
import { Project } from "./model/Project";
import { Award } from "./model/Award";
import { DataType } from "./model/DataType";
import { EducationalQualification } from "./model/EducationalQualification";
import { PublicationPatent } from "./model/PublicationPatent";

// Customizable Area Start
export enum Tab {
  Projects = "1",
  Awards = "2",
  Patents = "3",
}

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
  userName: string;
  isVisible: boolean;
  apiToken: string | null;
  educationQualificationList: EducationalQualification[];
  projectList: Project[];
  awardList: Award[];
  patentList: PublicationPatent[];
  loadingEQ: boolean;
  activeTab: string;
  loadingProject: boolean;
  loadingAwards: boolean;
  loadingPub: boolean;
  isModalOpen: boolean;
  modalItem: DataType<unknown> | null;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EducationalUserProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  labelTitle: string = "";
  getEducationCallId: string = "";
  getProjectCallId: string = "";
  getAwardsCallId: string = "";
  getPatentCallId: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      userName: "",
      isVisible: false,
      apiToken: null,
      educationQualificationList: [],
      projectList: [],
      awardList: [],
      patentList: [],
      activeTab: "1",
      loadingEQ: true,
      loadingProject: true,
      loadingAwards: true,
      loadingPub: true,
      isModalOpen: false,
      modalItem: null
    };

    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getToken();

    if (!this.isPlatformWeb()) {
      this.props.navigation.addListener("willFocus", () => this.getToken());
    }
    // Customizable Area End
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);

      if (token) {
        this.setState({ apiToken: token }, () => {
          this.getEducationQualification();
          this.getProjectList();
          this.getAwardList();
          this.getPatentList();
        });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getEducationCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson.errors?.length > 0) {
        this.showAlert("Error", resJson.errors[0].token);
      } else {
        this.setState({
          educationQualificationList: resJson.data,
          loadingEQ: false
        });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProjectCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson.errors?.length > 0) {
        this.showAlert("Error", resJson.errors[0].token);
      } else {
        this.setState({ projectList: resJson.data, loadingProject: false });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAwardsCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson.errors?.length > 0) {
        this.showAlert("Error", resJson.errors[0].token);
      } else {
        this.setState({ awardList: resJson.data, loadingAwards: false });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getPatentCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson.errors?.length > 0) {
        this.showAlert("Error", resJson.errors[0].token);
      } else {
        this.setState({ patentList: resJson.data, loadingPub: false });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async getEducationQualification() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getEducationContentType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getEducationCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getEducationApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getEducationApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getProjectList() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getProjectContextType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProjectCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProjectApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getProjectApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getAwardList() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getAwardsContextType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAwardsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAwardsApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAwardsApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getPatentList() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getPatentsContextType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPatentCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPatentsApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getPatentsApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  hideModal = () => {
    this.setState({ isModalOpen: false, modalItem: null });
  };

  showModal = (modalItem: DataType<unknown>) => {
    this.setState({ isModalOpen: true, modalItem });
  };

  setActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  openUrl = async (targetUrl?: string) => {
    if (!targetUrl) {
      return;
    }

    const supported = await Linking.canOpenURL(targetUrl);
    if (supported) {
      Linking.openURL(targetUrl);
    }
  };

  formatDate = (value: string) => {
    return moment.utc(value).format("YYYY-DD-MM");
  };

  // Customizable Area End
}
// Customizable Area Start
// Customizable Area End
