import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import DocumentPicker from "react-native-document-picker";
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
  selectFile: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DocumentOpenerController extends BlockComponent<
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
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      selectFile: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  openFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
          DocumentPicker.types.audio,
          DocumentPicker.types.pdf,
        ],
      });

      if (response.length > 0) {
        await FileViewer.open(response[0].uri);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        runEngine.debugLog("Message Recived", "User Canceled Picker");
      } else {
        runEngine.debugLog("Message Recived", error);
      }
    }
  };

  openFileUrl = async () => {
    const getUrlExtension = (docUrl: string) => {
      return docUrl.split(/[#?]/)[0].split(".").pop()?.trim();
    };
    try {
      const docUrl =
        "https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf";
      const localFile = `${
        RNFS.DocumentDirectoryPath
      }/temporaryfile.${getUrlExtension(docUrl)}`;
      const options = {
        fromUrl: docUrl,
        toFile: localFile,
      };
      RNFS.downloadFile(options)
        .promise.then(() => FileViewer.open(localFile))
        .then(() => {
          // success
        })
        .catch((error) => {
          runEngine.debugLog(error);
        });
    } catch (error) {
      runEngine.debugLog(error);
    }
  };
  // Customizable Area End
}
