import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { IBlock } from "../../../framework/src/IBlock";

import facebookController from "./FacebookController";
import { FacebookDelegate } from "./FacebookDelegate";
import googleMobileController from "./GoogleMobileController";
import { GoogleDelegate } from "./GoogleDelegate";

// Customizable Area Start
interface ResponseJson {
  meta: {
    token: string;
  };
}
// Customizable Area End

const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  isRegistration: boolean;
  // Customizable Area End
}

interface S {
  loading: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class SocialMediaAccountController
  extends BlockComponent<Props, S, SS>
  implements GoogleDelegate, FacebookDelegate {
  createAccountAPICallId: string = "";
  googleUser: object | null;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage)
      // Customizable Area End
    ]);

    this.state = {
      // Customizable Area Start
      loading: false,
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End
  }

  facebookUserStatusChanged(userInfo: { email: string; id: string }): void {
    // Customizable Area Start
    if (this.props.isRegistration) {
      this.createAccountFromSocial(userInfo.email, userInfo.id, this.props);
    } else {
      this.logInWithSocial(
        userInfo.email,
        userInfo.email,
        userInfo.id,
        this.props
      );
    }
    // Customizable Area End
  }

  // Customizable Area Start
  facebookLogIn() {
    facebookController.handleFacebookLogin(this, this.props.isRegistration);
  }

  googleUserStatusChanged(userInfo: { email: string; id: string }): void {
    if (this.props.isRegistration) {
      this.createAccountFromSocial(userInfo.email, userInfo.id, this.props);
    } else {
      this.logInWithSocial(
        userInfo.email,
        userInfo.email,
        userInfo.id,
        this.props
      );
    }
  }

  googleLogIn() {
    const self = this;
    googleMobileController
      .handleGoogleSignIn(this, this.props.isRegistration)
      .then(
        function() {
          self.stopLoading();
          runEngine.debugLog("User SIGNED IN.");
        },
        function(error: { error: string }) {
          self.stopLoading();
          if (error.error === "popup_closed_by_user") {
            //handle window closed event
          }
        }
      );
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.stopLoading();
    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      this.openInfoPage();
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createAccountAPICallId !== "" &&
      this.createAccountAPICallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        this.saveLoggedInUserData(responseJson);
      } else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  async createAccountFromSocial(
    incomingEmail: String,
    incomingId: String,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    this.startLoading();

    const header = {
      "Content-Type": configJSON.urlHeaderTypeJSON
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createAccountURL
    );

    const httpBodyData = {
      type: "social_account",
      attributes: {
        email: incomingEmail,
        password: incomingEmail,
        unique_auth_id: incomingId
      }
    };

    const httpBody = {
      data: httpBodyData
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postHttpRequest
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  saveLoggedInUserData(responseJson: ResponseJson) {
    const saveLoggedInUserDataMessage: Message = new Message(
      getName(MessageEnum.SessionSaveMessage)
    );
    saveLoggedInUserDataMessage.addData(
      getName(MessageEnum.SessionResponseData),
      JSON.stringify(responseJson)
    );
    saveLoggedInUserDataMessage.addData(
      getName(MessageEnum.SessionResponseToken),
      responseJson.meta.token
    );

    this.send(saveLoggedInUserDataMessage);
  }

  async logInWithSocial(
    incomingEmail: string,
    incomingPassword: string,
    incomingId: string,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    this.startLoading();

    const header = {
      "Content-Type": configJSON.urlHeaderTypeJSON
    };

    const attributes = {
      email: incomingEmail,
      password: incomingPassword,
      unique_auth_id: incomingId
    };

    const httpBodyData = {
      type: "social_account",
      attributes
    };

    const httpBody = {
      data: httpBodyData
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createAccountAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAccountURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postHttpRequest
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  navigate() {
    runEngine.debugLog("this.isRegistration", this.props.isRegistration);
    if (this.props.isRegistration) {
      this.navigateToSignup();
    } else {
      this.navigateToLogin();
    }
  }

  navigateToSignup() {
    const navigateToSignupMessage: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpMessage)
    );
    navigateToSignupMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(navigateToSignupMessage);
  }

  navigateToLogin() {
    const navigateToLoginMessage: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    navigateToLoginMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(navigateToLoginMessage);
  }

  openInfoPage() {
    const openInfoPageMessage = new Message(
      getName(
        this.props.isRegistration
          ? MessageEnum.AccoutResgistrationSuccess
          : MessageEnum.AccoutLoginSuccess
      )
    );
    openInfoPageMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(openInfoPageMessage);
  }

  btnFacebookLogInProps = {
    onPress: () => this.facebookLogIn()
  };

  btnGoogleLogInProps = {
    onPress: () => this.googleLogIn()
  };

  btnNavigateProps = {
    onPress: () => this.navigate()
  };
  // Customizable Area End
}
