// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import SignaturePad from "signature_pad";
import { Alert, ScrollView } from "react-native";
import { createRef, RefObject } from 'react';

export const baseURL = require("../../../framework/src/config.js").baseURL;
export interface ISignPad {
  clear: () => void;
  toData: () => SignaturePad['toData'];
}

export interface Resp {
  'errors': null,
  Details:
  {
    id: number,
    account_id: number,
    sign_coordinates: string,
    created_at: string,
    updated_at: string
  }
}

interface Points {
  time:number,
  x:number,
  y:number,
  color: string 

}


export interface CordList{
color:string,
dotSize:number
minWidth:number
maxWidth:number,
compositeOperation:string,
points: Array<Points>
}

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface ApiData {
  contentType: string;
  method: string;
  endPoint: string;
  body: Object;
  type: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  signature: string;
  signData: string;
  dataP: Array<object>;
  uniqueId: number;
  signCords: Array<object>,
  docID: number,
  isOpenCanvas: boolean;
  docList: string[];
  activeDocument: string;
  isOpenSnackbar: boolean;
  docuSignUrl: string;
  token: string;
  isFinishDocuSign: boolean;
  requestId: string;
  document_id: number | null;
  envelope_id: string;
  access_token: string;
  messageShow:string;
}

interface SS {
  id: any;
}



export default class DocusignIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  docuSignPostApicallId: string = '';
  saveDocumentSignDataAPIId: string = "";
  apiCheckDocusignStatusCallID: string ="";
  scrollViewRef: RefObject<ScrollView> = createRef<ScrollView>();
  // signPad: ReactSignatureCanvas | SignaturePad | null = null;


  constructor(Props: Props) {
    super(Props)
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.ReciveUserCredentials),

      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ]

    this.state = {
      isOpenCanvas: false,
      docList: ["Terms & Condition", "Privacy Policy", "Non Discloser Agreement"],
      activeDocument: "",
      isOpenSnackbar: false,
      txtInputValue: "",
      txtSavedValue: "A",
      signature: '',
      enableField: false,
      signData: "",
      uniqueId: 0,
      signCords: [],
      docID: 4,
      dataP: [{ time: 1681386404206, x: 66, y: 18 }, { time: 1681386404206, x: 82, y: 169 }, { time: 1681386404223, x: 168, y: 133 }, { time: 1681386404239, x: 209, y: 117 }, { time: 1681386404256, x: 226, y: 106 }, { time: 1681386404276, x: 243, y: 93 }, { time: 1681386404494, x: 164, y: 76 }, { time: 1681386404552, x: 157, y: 88 }, { time: 1681386404568, x: 156, y: 95 }, { time: 1681386404584, x: 57, y: 105 }, { time: 1681386404605, x: 165, y: 119 }, { time: 1681386404626, x: 175, y: 133 }, { time: 1681386404650, x: 183, y: 142 }, { time: 1681386404683, x: 188, y: 149 }, { time: 1681386404707, x: 191, y: 158 }, { time: 1681386404731, x: 192, y: 169 }, { time: 1681386404758, x: 191, y: 179 }, { time: 1681386404778, x: 187, y: 185 }, { time: 1681386404802, x: 176, y: 187 }, { time: 1681386404818, x: 162, y: 187 }, { time: 1681386404842, x: 130, y: 177 }, { time: 1681386404858, x: 108, y: 167 }, { time: 1681386404874, x: 94, y: 158 }, { time: 1681386404890, x: 87, y: 152 }, { time: 1681386404941, x: 83, y: 148 }, { time: 1681386404986, x: 86, y: 143 }, { time: 1681386405003, x: 101, y: 142 }, { time: 1681386405019, x: 124, y: 142 }, { time: 1681386405043, x: 164, y: 146 }, { time: 1681386405066, x: 198, y: 153 }, { time: 1681386405084, x: 207, y: 155 }, { time: 1681386405200, x: 212, y: 156 }, { time: 1681386405255, x: 217, y: 148 }, { time: 1681386405279, x: 218, y: 138 }, { time: 1681386405313, x: 218, y: 130 }, { time: 1681386405429, x: 218, y: 144 }, { time: 1681386405446, x: 218, y: 161 }, { time: 1681386405480, x: 218, y: 191 }, { time: 1681386405518, x: 219, y: 196 }, { time: 1681386405727, x: 232, y: 181 }, { time: 1681386405802, x: 250, y: 152 }, { time: 1681386405879, x: 250, y: 146 }, { time: 1681386405974, x: 245, y: 155 }, { time: 1681386406046, x: 246, y: 160 }, { time: 1681386406164, x: 252, y: 151 }, { time: 1681386406284, x: 252, y: 163 }, { time: 1681386406301, x: 252, y: 191 }, { time: 1681386406318, x: 252, y: 211 }, { time: 1681386406341, x: 249, y: 222 }, { time: 1681386406384, x: 243, y: 230 }, { time: 1681386406482, x: 238, y: 228 }, { time: 1681386406527, x: 237, y: 220 }, { time: 1681386406543, x: 247, y: 207 }, { time: 1681386406560, x: 259, y: 198 }, { time: 1681386406582, x: 274, y: 187 }, { time: 1681386406636, x: 305, y: 164 }, { time: 1681386406670, x: 309, y: 158 }, { time: 1681386406796, x: 305, y: 167 }, { time: 1681386406813, x: 302, y: 180 }, { time: 1681386406879, x: 298, y: 196 }, { time: 1681386406927, x: 298, y: 188 }, { time: 1681386406943, x: 298, y: 179 }, { time: 1681386406959, x: 300, y: 168 }, { time: 1681386406978, x: 306, y: 161 }, { time: 1681386407011, x: 313, y: 159 }, { time: 1681386407075, x: 318, y: 161 }, { time: 1681386407099, x: 324, y: 172 }, { time: 1681386407124, x: 332, y: 191 }, { time: 1681386407141, x: 334, y: 200 }, { time: 1681386407163, x: 337, y: 210 }, { time: 1681386407203, x: 339, y: 215 }, { time: 1681386407315, x: 334, y: 212 }],
      docuSignUrl: '',
      token: '',
      isFinishDocuSign: false,
      requestId: '',
      document_id: null,
      envelope_id: '',
      access_token: '',
      messageShow:"",
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getData1 = async (data: string) => {
    let signData = await JSON.parse(data)
    let signCord = signData.map((item:CordList) =>{
      item.points.forEach((newResponse:Points) =>{
        newResponse.color = "black"
      })
      return item.points
    })
    this.setState({signCords : signCord},() =>{
      this.signSubmit()
    })
  }

  goBack = () => { this.props.navigation.goBack() }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.storePropValue(message);
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.docuSignPostApicallId) {
        this.docuSignPostApiSuccesCallBack(responseJson, errorReponse)
      }
      if (apiRequestCallId === this.saveDocumentSignDataAPIId) {
        if (responseJson && responseJson.Details) {
          this.setState({...this.state, isOpenSnackbar: true});
          this.backToList();
          setTimeout(() => {
            this.setState({...this.state, isOpenSnackbar: false});
          },3000);
        }
      }
      if(apiRequestCallId === this.apiCheckDocusignStatusCallID){
        if(responseJson){
          this.redirectToRequestDetailpage()
        }
      }

    }
  }

  storePropValue = (message: Message) => {
    const myData = message.getData(getName(MessageEnum.CustomDataMessage));
    if (myData) {
      this.setState({envelope_id: myData.envelope_id, access_token: myData.access_token, document_id: myData.document_id, token: myData.token, docuSignUrl: myData.docusignUrl.url ? myData.docusignUrl.url : myData.docusignUrl, requestId: myData.requestId})
      this.setState({messageShow:myData.docMessSign})
    }
  }

  btnGoBackToDashboard = {
    onPress: () => {
      this.goBack();
    }
  }

  handleShouldStartLoadWithRequest = (request: any) => {
    const { url } = request;
    if (url.includes('event=Send') || url.includes('event=signing_complete')) {
      this.setState({ isFinishDocuSign: true }, () => {
        this.scrollToTop();
      })
      return false;
    }
    return true;
  };

  scrollToTop = () => {
    this.scrollViewRef?.current?.scrollTo({ y: 0, animated: false });
  };
  
  redirectToRequestDetailpage = () => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationRequestDetailMessage)
    );
    const selectedRequest = {
      requestId: this.state.requestId,
      actionType: 'view'
    };
    msg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  onClickOfCheckStatus = {
    onPress: () => {
      if(this.state.access_token !== '' && this.state.envelope_id !== '') {
        this.callDocusign_urlApi()
      } else {
        this.callCheckDocusingStatus()
      }
    }
  }

  callCheckDocusingStatus (): boolean {
    const header = {
      token: this.state.token
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCheckDocusignStatusCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.documentSignedStatusApiEndPoint+this.state.document_id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  callDocusign_urlApi (): boolean {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    }

    const payload = {
      envelope_id: this.state.envelope_id,
      access_token: this.state.access_token,
      base_url: baseURL+"/StripeSuccessPage"
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiCheckDocusignStatusCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.docusignUrlApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  docuSignPostApiSuccesCallBack = async (responseJson: Resp, errorReponse: string) => {
    if (responseJson != null) {
      if (!responseJson.errors) {
        this.docuSignPostApiSucces(responseJson)
      } else {
        this.failureProductApiErrorResponse(errorReponse);
      }
    }
  }
  docuSignPostApiSucces = async (responseJson: Resp) => {
    this.validate()
  }

  failureProductApiErrorResponse(errorReponse: string) {
  }

  apiCall = async (data: ApiData) => {
    const { contentType, method, endPoint, body ,type} = data;
    const header = {
      "Content-Type": contentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    body && type != 'formData' ?
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    )
    : requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      body
    );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  return requestMessage.messageId;
  };

  signSubmit = async () => {
    let formData = new FormData();
    formData.append("account_id", '4')
    formData.append("sign_coordinates", JSON.stringify(this.state.signCords))
    this.docuSignPostApicallId = await this.apiCall({
      contentType: "multipart/form-data",
      method: 'POST',
      endPoint: `bx_block_docu_sign/signs`,
      body: formData,
      type: 'formData'
    });
  }

  validate = () => {
    if (this.state.signCords.length === 0) {
      Alert.alert('No Signature Found')
    }
    else{
      Alert.alert('Signature submitted Successfully')
      this.props.navigation.navigate('DocumentList')
    }
  }

  doButtonPressed() {
    let mesg = new Message(getName(MessageEnum.AccoutLoginSuccess)); 
    mesg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(mesg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  clearSign = () => {
  }

  backToList = () => {
    this.setState({...this.state, isOpenCanvas: false, activeDocument: ""});
    this.clearSign();
  }
  
  openSignCanvas = (activeDoc: string) => {
    this.setState({...this.state, isOpenCanvas: true, activeDocument: activeDoc});
  }


  submitDocumentSignData = () => {
    const headers = {
      "Content-Type": undefined
    };

    const signedFormData = new FormData();
    signedFormData.append("sign_coordinates", JSON.stringify(''))

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.saveDocumentSignDataAPIId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.documentSignAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      signedFormData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

}
// Customizable Area End
