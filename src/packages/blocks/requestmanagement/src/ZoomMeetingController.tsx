import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from 'framework/src/Utilities';
const navigation = require("react-navigation")
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: typeof navigation;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  zoomLinkJoin:string;
  linkProp:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ZoomMeetingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      zoomLinkJoin:"",
      linkProp:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
     // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }
    // Customizable Area End
  }

  

  // Customizable Area Start
    componentDidMount = async () => {
        const zoomLink = await getStorageData('meetingLink')
        this.setState({ linkProp: zoomLink })
    }

    btnGoBackOnRequestDetail = {
      onPress: () => {
        this.goBack()
      }
    }

    goBack = () => {
        const message = new Message(getName(MessageEnum.NavigationMessage));
        message.addData(getName(MessageEnum.NavigationTargetMessage), "RequestDetail");
        message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(message);
    };
    

  // Customizable Area End
}
