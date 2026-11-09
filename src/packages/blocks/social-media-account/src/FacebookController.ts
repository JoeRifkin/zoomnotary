import { runEngine } from "../../../framework/src/RunEngine";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { FacebookDelegate } from "./FacebookDelegate";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { IBlock } from "../../../framework/src/IBlock";

// Customizable Area Start
const configJSON = require("./config");

type FacebookUserInfo = {
  email: string;
  id: string;
};
// Customizable Area End

interface Props {
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

class FacebookControllerClass
  extends BlockComponent<Props, S, SS> {
  facebookUserInfo: FacebookUserInfo;
  delegateClass: FacebookDelegate;
  apiCallId: string = "";
  isRegistration: boolean = false;
  static instance = new FacebookControllerClass({});

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.delegateClass = new FacebookDelegate();
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    // Customizable Area Start
    // Customizable Area End
    
    runEngine.attachBuildingBlock(this as IBlock, [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area End
    ]);
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (this.apiCallId === apiRequestCallId) {
        const responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        const userEmail = responseJson.email;
        const userId = responseJson.id;

        if (userEmail && userId) {
          FacebookControllerClass.instance.facebookUserInfo = {
            email: userEmail,
            id: userId
          };
          FacebookControllerClass.instance.delegateClass.facebookUserStatusChanged(
            FacebookControllerClass.instance.facebookUserInfo,
            this.isRegistration
          );
        }
      }
    }
  }

  // Customizable Area Start
  // MOBILE
  handleFacebookLogin(
    delegateClass: FacebookDelegate,
    isRegistration: boolean
  ) {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    FacebookControllerClass.instance.delegateClass = delegateClass;

    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      async permissionsResult => {
        if (permissionsResult.isCancelled) {
          runEngine.debugLog("Login cancelled");
        } else {
          runEngine.debugLog("Login DONE");
          try {
            const tokenResult = await AccessToken.getCurrentAccessToken();
            runEngine.debugLog(tokenResult);
            if (tokenResult) {
              const { accessToken } = tokenResult;
              this.isRegistration = isRegistration;
              this.getDetails(accessToken);
            }
          } catch (error) {
            runEngine.debugLog("ERROR GETTING DATA FROM FACEBOOK");
          }
        }
      },
      function(error) {
        runEngine.debugLog("Login fail with error: " + error);
      }
    );
  }

  getDetails = (accessToken: string) => {
    const header = {
      "Content-Type": configJSON.urlHeaderTypeJSON
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.facebookBaseUrl + accessToken
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.facebookApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}

const FacebookController = new FacebookControllerClass({});
export default FacebookController;
