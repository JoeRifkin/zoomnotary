import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Linking } from "react-native";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start

interface HTMLSource {
  html?: string;
  uri?: string;
}

type ApiData = {
  attributes?: {
    title?: string;
    description?: string;
  };
};

export interface ITermsConds {
  id: string;
  description: string;
  accepted_by: string;
  created_at: string;
  title: string
}
interface ParsedObject {
  title: string;
  description: string;
}
// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  isAdminUser: boolean;
  accountId: number;
  termsConds: ITermsConds | null;
  termsCondsList: ParsedObject[] | undefined;
  isTermsCondsAccepted: boolean;
  isLoading: boolean;
  isTermAndCondCall : boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TermsConditionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getTermsCondsListCallId: string = "";
  setAcceptanceOfTermsCondsId: string = "";
  getCurrentPageType: string = ""
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      accountId: -1,
      termsCondsList: undefined,
      isAdminUser: true,
      termsConds: null,
      isTermsCondsAccepted: false,
      isLoading: false,
      isTermAndCondCall: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (!this.isPlatformWeb()) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  navigateToTermsCondsDetail = (termsCondsId: string) => {
    
  };

  navigateToTermsCondsEdit = () => {

  };

  getTermsCondsList = async (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    this.getCurrentPageType = await getStorageData('selectedMenu');
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTermsCondsListCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      this.getCurrentPageType === 'pandp' ? configJSON.getAllPrivacyPolicyApiEndPoint : configJSON.getAllTermsCondsApiEndPoint
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

  handleCheckBoxChange = (value: boolean) => {
  }

  btnGoBack = {
    onPress: () => {
      if(this.props.navigation && this.props.navigation.goBack){
        this.props.navigation.goBack()
      }
    }
  }

  handleEmailLink = (mailId: string) => {
    Linking.openURL(`mailto:${mailId}`);
  };

  extractTitleAndDescription = (htmlData: string) => {
    const sections = htmlData.split('<h2>').slice(1); // Split by <h2> tags and remove the first empty string
    const extractedSections = sections.map(section => {
      const titleRegex = section.split('</h2>');
      const descriptionRegex = /<\/h2>([\s\S]*?)(?=<h2>|$)/;
      const descriptionMatch = section.match(descriptionRegex);
      const title = titleRegex && titleRegex[1] ? titleRegex[0].trim() : '';
      let description = descriptionMatch ? descriptionMatch[1].trim() : '';
      description = description.replace(/<\/?blockquote>/g, '').replace(/<\/?strong>/g, '').replace(/<\/?p>/g, '').replace(/<\/?p>/g, '');
      return { title, description };
    });
    return extractedSections;
  };

  getSource = () => {
    const title = this.state.termsConds?.title || '';
    const description = this.state.termsConds?.description || '';
    const content = `${title}${description}`;
    return { html: content };
  }

  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errorResponse) this.parseApiCatchErrorResponse(errorResponse);
    if (responseJson?.errors) this.parseApiErrorResponse(responseJson);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      if (token ) {
        runEngine.debugLog("TOKEN", token);
        const messageData = JSON.parse(
          message.getData(getName(MessageEnum.SessionResponseData))
        );
        const accountId: number = messageData?.meta?.id;
        this.setState({ accountId });
        
        this.setState({ token, accountId }, () => {
          if(!this.state.isTermAndCondCall){
            this.setState({isTermAndCondCall: true}, () => {
              this.getTermsCondsList(token)
            })
          }
        });
      }
      else {
        return alert("Please Login");
      }
    }

    if (
      responseJson &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getTermsCondsListCallId !== null && 
      apiRequestCallId === this.getTermsCondsListCallId
    ) {
      const convertedData = this.extractTitleAndDescription(responseJson.data.attributes.description)
      this.setState({
        termsCondsList: convertedData,
        termsConds: responseJson.data.attributes,
        isLoading: false,
      });
    }

    // Customizable Area End
  }
}
