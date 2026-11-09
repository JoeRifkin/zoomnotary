import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
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
  userprofile: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SplashscreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    this.state = {
      // Customizable Area Start
      token: "",
      userprofile:null,
      // Customizable Area End
    };

    // Customizable Area Start
    this.subScribedMessages = [];
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.gettoken();
    setTimeout(() => {
      if (this.state.token) {
        this.goToHome();
      } else {
        this.goToLogin();
      }
    }, configJSON.timeout);
    // Customizable Area End
  }

  // Customizable Area Start

  gettoken = async () => {
    const gettoken = await getStorageData("token");
    const getprofiledata = await getStorageData("userprofile");
    this.setState({ token: gettoken ,userprofile:getprofiledata});
  };

  goToLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToHome() {
    const msg1: Message = new Message(getName(MessageEnum.SessionSaveMessage));
    msg1.addData(
      getName(MessageEnum.SessionResponseToken),
      this.state.token
    );
    msg1.addData(
      getName(MessageEnum.SessionResponseData),
      this.state.userprofile
    );
    this.send(msg1);

    const msg: Message = new Message(
      getName(MessageEnum.NavigationDashboardMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  continueAsBtnProps = {
    onPress: () =>{
      const msg: Message = new Message(
        getName(MessageEnum.NavigationContinueAsGuestDashboardMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }
  // Customizable Area End
}
