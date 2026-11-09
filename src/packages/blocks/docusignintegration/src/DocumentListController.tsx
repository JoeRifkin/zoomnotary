// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
export interface DocumentData{
   docName: string, 
   id: number, 
   src: number
}
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  data:Array<DocumentData>
}

interface SS {
  id: any;
}
  import {document} from './assets'
export default class DocumentListController extends BlockComponent<
  Props,
  S,
  SS
> {

 
  goDocContent = (item:DocumentData)=>{
    this.props.navigation.navigate('DocumentContet',item)
  }

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
    ];

    this.state = {
      data:[
        {docName:'document',id:1,src:document},
        {docName:'document',id:2,src:document},
        {docName:'document',id:3,src:document},
        {docName:'document',id:4,src:document},
      ]
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
}
// Customizable Area End
