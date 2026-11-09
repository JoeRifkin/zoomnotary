import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert, Platform } from "react-native";
import { getStorageData } from "../../../framework/src/Utilities";
const RNFS = require('react-native-fs');
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  // Customizable Area Start
  navigation: object;
  id: string;
  notaryRequestId: string | null;
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  invoice: string;
  invoiceError: string;
  invoicePdf: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: string | number;
  // Customizable Area End
}

export default class InvoiceBillingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  pdfApiCallId: string | Message = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      invoice: "",
      invoiceError: "",
      invoicePdf: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.pdfApiCallId !== null &&
      this.pdfApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson1 = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse1 = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson1) {
        this.setState({
          invoicePdf: responseJson1.invoice,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
        this.parseApiErrorResponse(responseJson1);
      }
      this.parseApiCatchErrorResponse(errorResponse1);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    super.componentDidMount();
    this.getPdfLink();
  };

  onChangeInvoice = (text: string) => {
    if (text === "") {
      this.setState({
        invoice: text,
        invoiceError: configJSON.invoiceValidation,
      });
    } else {
      this.setState({ invoice: text, invoiceError: "" });
    }
  };

  getPdfLink = async () => {
      this.setState({ loading: true });
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: await getStorageData("token"),
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.pdfApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.exampleAPiEndPoint + this.props.notaryRequestId
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.exampleAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
  };

  DownloadFile = async (fileUrl: string,) => {
    try {
      this.setState({ loading: true })
      const fileName = fileUrl.split('/').pop() || 'downloaded_file';
      let dirPath = Platform.OS === "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
       const timestamp = new Date().getTime();
      let destinationPath = `${dirPath}/${timestamp}_${this.removeSpacesFromImageName(fileName)}`

      const downloadResult = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: destinationPath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        this.setState({ loading: false });
        Alert.alert("File downloaded successfully.");
      }
    } catch (error: any) {
      this.setState({ loading: false });
      Alert.alert('Error during download or opening file:', error.message);
    };
  };

  removeSpacesFromImageName = (imageName: string) => {
    return imageName.replace(/(%20|\s+)/g, '_');
  }

  removeSpacesFromImgName = (imageName: string) => {
    return imageName.replace(/(%20|\s+)/g, '_');
  }

  truncatedText = (text: string, charLength: number) => {
    if (text.length <= charLength) {
      return text;
    } else {
      const truncated = text.substring(0, charLength) + '...';
      return truncated;
    }
  };

  // Customizable Area End
}
