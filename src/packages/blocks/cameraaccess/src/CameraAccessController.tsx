import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CameraAccessController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    // Customizable Area End
  }

  btnGetCameraAccessProps = {
    onPress: () => this.showCameraPicker()
  };

  showCameraPicker() {
    try {
      const ImagePicker = require("react-native-image-crop-picker");
      ImagePicker.openCamera({
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true
      }).then(async (image: any) => {
        console.log("@@@ Selected Image Item =============", image);
      });
    } catch (e) {
      console.log("@@@ Error opening camera ==========", e);
    }
  }
  // Customizable Area Start
  // Customizable Area End
}
