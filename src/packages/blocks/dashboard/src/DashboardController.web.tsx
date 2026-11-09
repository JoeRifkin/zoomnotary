import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
// Customizable Area End

export const webConfigJSON = require("./config.js");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: {
    type: string;
    quantity: string;
  }[];
  totalCandidates: string;
  type: string;
  token: string;
  errorMsg: string;
  loading: boolean;
  // Customizable Area End
}
interface SS {}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  dashboardApiCallId: string = "";
  apiGetQueryStrinurl: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      type: "",
      dashboardData: [],
      totalCandidates: "",
      errorMsg: "",
      token: "",
      loading: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getDashboardData();
    // Customizable Area Start
    // Customizable Area End
  }

  getDashboardData(): boolean {
    // Customizable Area Start
    const webHeader = {};
    const webRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDashboardItemCallId = webRequestMessage.messageId;
    webRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      webConfigJSON.dashboardGetUrl
    );

    webRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(webHeader)
    );

    webRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      webConfigJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(webRequestMessage.id, webRequestMessage);
    // Customizable Area End
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let webErrorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (webResponseJson && !webResponseJson.errors) {
        if (webApiRequestCallId === this.apiDashboardItemCallId) {
          this.setState({
            dashboardData: webResponseJson.data.attributes.sub_attributres,
            totalCandidates: webResponseJson.data.attributes.total_candidates,
            type: webResponseJson.data.type,
            errorMsg: "",
            loading: false
          });
        }
      } else if (webResponseJson && webResponseJson.errors) {
        if (webApiRequestCallId === this.apiDashboardItemCallId) {
          this.setState({
            errorMsg: webErrorReponse,
            loading: false
          });
        }
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}
