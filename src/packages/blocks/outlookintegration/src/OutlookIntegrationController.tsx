import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
require("isomorphic-fetch");
import { getStorageData } from "../../../framework/src/Utilities";
import * as helpers from "../../../framework/src/Helpers";

import { GraphManagers } from "./graph/GraphManagers";
import { AuthManagers } from "./auth/AuthManagers";

import { MsalContext } from "@azure/msal-react";
import moment from "moment";

export interface Email {
  id: string;
  subject: string;
  webLink: string;
}

interface Event {
  id: string;
  subject: string;
  start: { dateTime: string };
  end: { dateTime: string };
  organizer: {
    emailAddress: { name: string };
    start: { dateTime: string };
    end: { dateTime: string };
  };
}

interface Contact {
  id: string;
  displayName: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  msalContext: {};
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  displayName: string;
  emails: Array<Email>;
  contacts: Array<Contact>;
  calendars: Array<Event>;
  emailDetail: Email | {};
  isShownMenu: boolean;
  isLoaded?: boolean;
  token?: string | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OutlookIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  static contextType = MsalContext;
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
      displayName: "",
      emails: [],
      contacts: [],
      calendars: [],
      emailDetail: {},
      isShownMenu: false,
      token: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    if (helpers.getOS() !== "web") {
      this.props.navigation.addListener("didFocus", () => {
        this.getUserInfo();
      });
    }
  }

  async componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<S>,
    snapshot?: SS | undefined
  ) {
    const token = await getStorageData(configJSON.userToken);
    if (token !== prevState.token) {
      this.getUserInfo();
    }
  }

  getUserInfo = async () => {
    try {
      const { displayName } = await GraphManagers.getUserAsync();
      const token = await getStorageData(configJSON.userToken);
      this.setState({ displayName, token });
    } catch (error) {
      const { statusCode } = JSON.parse(JSON.stringify(error));
      this.invalidAuthenticationTokenCode(statusCode);
    }
  };

  signInAsync = async () => {
    await AuthManagers.signInAsync();
  };

  resetData = () => {
    this.setState({
      calendars: [],
      emails: [],
      contacts: [],
      displayName: "",
    });
  };
  signOutAsync = async () => {
    await AuthManagers.signOutAsync();
    this.resetData();
  };

  invalidAuthenticationTokenCode = (statusCode: number) => {
    if (statusCode === configJSON.InvalidAuthenticationTokenCode) {
      Alert.alert(configJSON.alertLabl, configJSON.alertSubLabel, [
        {
          text: "OK",
        },
      ]);
    }
  };
  getEmailList = async () => {
    this.setState({
      isLoaded: false,
      calendars: [],
      contacts: [],
    });

    const mails = await GraphManagers.getEmails();
    this.setState({
      emails: mails.value,
      isLoaded: true,
    });
  };

  contactsBtnProps = {
    onPress: () => this.getContactList(),
  };

  getContactList = async () => {
    this.setState({
      isLoaded: false,
      emails: [],
      calendars: [],
    });

    const contacts = await GraphManagers.getContacts();
    this.setState({
      contacts: contacts.value,
      isLoaded: true,
    });
  };

  calendarBtnProps = {
    onPress: () => this.getEventList(),
  };

  getEventList = async () => {
    this.setState({
      isLoaded: false,
      emails: [],
      contacts: [],
    });

    const events = await GraphManagers.getEvents();
    this.setState({
      calendars: events.value,
      isLoaded: true,
    });
  };

  openEmailDetail = (idEmail: string) => {
    const email = this.state.emails.find((item) => item.id === idEmail);
    email?.id &&
      this.props.navigation.navigate("OutlookEmailDetail", { email });
  };

  convertDateTime = (dateTime: string): string => {
    return moment.utc(dateTime).local().format("MMM do h:mm a");
  };
  // web events

  handleLogin = async () => {
    // @ts-ignore #R18RN640524 This TS error is a result of running React 18 with RN 0.64 and will be resolved when we upgrade to RN 0.70
    const msalInstance = this.context.instance;
    const login = await msalInstance.loginPopup({
      scopes: configJSON.appScopes,
    });

    await this.getToken();
    this.props.navigation.navigate("OutlookData");
  };

  /*
  handleLogout = () => {
    const msalInstance = this.context.instance;
    msalInstance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/", // redirects the top level app after logout
    });
    window.localStorage.removeItem("authMsGraphToken");
    this.resetData();
  };
  */

  getToken = async () => {
    this.setState({ isShownMenu: true });
    // @ts-ignore #R18RN640524 This TS error is a result of running React 18 with RN 0.64 and will be resolved when we upgrade to RN 0.70
    const msalAccounts = this.context.accounts;
    // @ts-ignore #R18RN640524 This TS error is a result of running React 18 with RN 0.64 and will be resolved when we upgrade to RN 0.70
    const msalInstance = this.context.instance;
    const request = {
      scopes: configJSON.appScopes,
      account: msalAccounts[0],
    };
    const authResult = await msalInstance.acquireTokenSilent(request);
    window.localStorage.setItem("authMsGraphToken", authResult.accessToken);
    return authResult.accessToken;
  };
  // Customizable Area End
}
