// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  // data:Array<object>
  documentName: string;
  documentId: number;
  docSrc: number;
}

interface SS {
  id: any;
}

export default class DocumentContetController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
    ];

    this.state = {
      documentName: '',
      documentId: 0,
      docSrc: 0,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount(): Promise<void> {
    this.setState({ documentName: this.props.navigation.state.params.docName, documentId: this.props.navigation.state.params.id, docSrc: this.props.navigation.state.params.src })
  }

  btnNavigation = () => {
    this.props.navigation.navigate('DocusignIntegration')
  }

  goBack = () => {
    this.props.navigation.goBack()
  }
}
// Customizable Area End
