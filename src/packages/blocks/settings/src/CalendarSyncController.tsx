import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { GoogleSignin } from "@react-native-community/google-signin";
import { authorize, AuthConfiguration, refresh } from 'react-native-app-auth';
import { Alert, Platform } from "react-native";
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

const configLogin: AuthConfiguration = {
  issuer: `https://login.microsoftonline.com/common/v2.0`,
  clientId: configJSON.appId,
  redirectUrl: Platform.OS === "android" ? "msauth://com.ZoomNotary" : "msauth.com.zoomNotary://auth/",
  scopes: configJSON.appScopes,
  additionalParameters: { prompt: 'select_account', },
  serviceConfiguration: {
  authorizationEndpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/token`
  },
};

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export type GoogleAuthDetailsType = {
  token: string,
  email: string,
  photo: string | null,
}

interface S {
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  loading: boolean;
  isGoogleChecked: boolean;
  isGoogleSignedIn: boolean;
  isGoogleSyncOn:boolean
  googleAuthDetails: GoogleAuthDetailsType | null;

  isOutlookChecked: boolean;
  isOutlookSignedIn: boolean;
  outlookAuthDetails: GoogleAuthDetailsType | null;
  isOutlookSyncOn:boolean;
  accessTokenOutlook : string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CalendarSyncController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getMicrosoftUserProfileApiCallID: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      // Customizable Area Start
      loading: false,
      isGoogleChecked:false,
      isGoogleSignedIn:false,
      isGoogleSyncOn:false,
      googleAuthDetails: null,
      isOutlookChecked:false,
      isOutlookSignedIn: false,
      outlookAuthDetails: null,
      isOutlookSyncOn:false,
      accessTokenOutlook : ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    await this.updateMicrosoftLoginStatus();
    await this.configureGoogleSignin();
    await this.checkGoogleSignInStatus();
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

 
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token})
    }

    const apiRqCallID = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

  
    if (apiRqCallID === this.getMicrosoftUserProfileApiCallID) {
      if (responseJSON.error) {
        this.retrieveNewOutlookAccessToken();
      }
      else {
        let { accessTokenOutlook } = this.state;
        this.setState({
          isOutlookSignedIn: true,
          outlookAuthDetails: {
            photo: '',
            email: responseJSON.mail || responseJSON.userPrincipalName,
            token: accessTokenOutlook
          },
          isOutlookSyncOn: true
        });
      }
  }
  }

  retrieveNewOutlookAccessToken = async () => {
    const oldrefreshToken = await getStorageData('refreshToken');

    if (oldrefreshToken) {
      const result = await refresh(configLogin, {
        refreshToken: oldrefreshToken,
      });

      if (result && result.refreshToken) {
      await setStorageData("accessToken", result.accessToken)
      await setStorageData("refreshToken", result.refreshToken)

        this.getMicrosoftUserProfile(result.accessToken);
      }
      else{
        await removeStorageData('accessToken')
        await removeStorageData('refreshToken')

        this.setState({
          accessTokenOutlook: "",
          isOutlookSignedIn: false,
          isOutlookSyncOn: false
        });
      }

    }
  }
  
  goBack = ()=>{
    this.props.navigation.goBack()
  }

  onChange = <K extends keyof S>(key: K, value: S[K]) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  // Configure Google Sign-In based on the platform
  configureGoogleSignin = async () => {
    GoogleSignin.configure({
      webClientId: configJSON.googleCalendarClientId,
      scopes: [configJSON.googleCalendarScope],
    });
  }; 

  // Check if the user is already signed in and update auth details
  checkGoogleSignInStatus = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await this.updateGoogleAuthDetails();
      }
  };

  // Update Google authentication details after sign-in
  updateGoogleAuthDetails = async () => {
      const userInfo = await GoogleSignin.signInSilently();
      const token = await GoogleSignin.getTokens();

      // Store token, email, and profile picture in googleAuthDetails
      this.setState({
        googleAuthDetails: {
          token: token.accessToken,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
        },
        isGoogleSignedIn: true,
        isGoogleSyncOn: true
      });
  };

  // Authenticate the user and handle sign-in
  loginGoogle = async () => {
      // Ensure Play Services are available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Attempt sign-in and retrieve tokens
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();

      // Store token, email, and profile picture in googleAuthDetails
      this.setState({
        googleAuthDetails: {
          token: token.accessToken,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
        },
        isGoogleSignedIn: true,
        isGoogleSyncOn: true
      });

    
  };

  // Log out the user
  logoutGoogle = async () => {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ googleAuthDetails: null, isGoogleSignedIn: false, isGoogleSyncOn: false });
  };

  outlookLogin = async () => {
    try {
      const authState = await authorize(configLogin);

      if (authState.accessToken) {
        this.setState({ accessTokenOutlook: authState.accessToken }, async () => {
        await setStorageData("accessToken", authState.accessToken)
        await setStorageData("refreshToken", authState.refreshToken)
          this.getMicrosoftUserProfile(authState.accessToken);
        })
      }

    } catch (error) {
      Alert.alert('Error', 'Login Failed. Please try again.');
    }
  };

  logoutOutlook = async () => {
    await removeStorageData('accessToken')
    await removeStorageData('refreshToken')

    this.setState({
      isOutlookSignedIn: false,
      outlookAuthDetails: null,
      isOutlookSyncOn: false
    })
  }

  getMicrosoftUserProfile = async (accessToken: string) => {
    let endpoint = "https://graph.microsoft.com/v1.0/me";
    const header = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getMicrosoftUserProfileApiCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  updateMicrosoftLoginStatus = async () => {
    const token = await getStorageData('accessToken');

    if (token) {
      this.setState({accessTokenOutlook: token});
      this.getMicrosoftUserProfile(token);
    }
  }
  
  // Customizable Area End
}