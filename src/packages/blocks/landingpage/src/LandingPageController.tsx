import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  userType: string;
  isValidateField: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LandingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
    ];

    this.state = {
      userType: '',
      isValidateField: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start

  btnGoBack = {
    onPress: () => {
      if(this.props.navigation && this.props.navigation.goBack){
        this.props.navigation.goBack()
      }
    }
  }

  btnContinueProps = {
    onPress: () => this.clickOnContinueBtn()
  };

  async clickOnContinueBtn () {
    this.setState({isValidateField: true})
    if ( this.isStringNullOrBlank(this.state.userType) ) { 
      return false;
    }
     
    this.setState({isValidateField: false})
    await AsyncStorage.setItem('UserType', this.state.userType).then(() => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigateEmailSignUpMessage, )
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    })
    
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  getButtonEnable = () => {
    if(this.state.userType !== ''){
      return true
    } else return false
  }
  btnLoginRedirect = {
    onPress: () => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationEmailLogInMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }

  selectTypeOfUser = (type: string) => {
    this.setState({userType: type});
  }

  showIamNotaryImg = () => {
    if(this.state.userType === 'am'){
      return 'imgTintColor'
    } else {
      return 'imgNoTintColor'
    }
  }

  showINeedNotaryImg = () => {
    if(this.state.userType === 'need'){
      return 'imgTintColor'
    } else {
       return 'imgNoTintColor'
    }
  }

  // Customizable Area End
}
