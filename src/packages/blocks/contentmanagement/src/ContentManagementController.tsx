//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker from "react-native-image-crop-picker";
import { Alert } from "react-native";
const CategoryData = [
  {
    idss: 0,
    title: "User 1",
    value: 'user_1'
  },
  {
    idss: 1,
    title: "User 2",
    value: 'user_2'

  },
];

interface Imagetype {
  uris: string;
  width: number;
  height: number;
}
interface CategoryType {
  idss: number;
  title: string;
  value: string;
}

interface ProductItem  {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
    status: boolean;
    price: number;
    user_type: string;
    quantity: string;
    created_at: string;
    updated_at: string;
    images: [
      {
        id: number;
        url: string;
        type: string;
        filename: string;
      }
    ];
  };
}
// Customizable Area End

export const configJSON = require("./config");


export interface Props {
  // Customizable Area Start
  navigation: object;
  idContent: string | number;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  catagorydata: CategoryType[];
  showCategory: boolean;
  category: CategoryType;
  showModel: boolean;
  images: Imagetype[];
  imagesWeb: File[];
  baseImages: string[];
  title: string;
  description: string;
  price: string;
  quantity: string;
  userDataList:ProductItem[]
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  idManagement: number | string;
  // Customizable Area End
}

export default class ContentManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  userDataListCall:string|Message=''
  addDataCall:string|Message=''
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
      catagorydata: CategoryData,
      showCategory: false,
      category: {
        idss: 0,
        title: "User 1",
      value:'user_1'
      },
      showModel: false,
      images: [],
      imagesWeb:[],
      baseImages: [],
      title: "",
      description: "",
      price: "",
      quantity: "",
      userDataList:[]
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
      this.userDataListCall !== null &&
      this.userDataListCall ===
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
           userDataList: responseJson1.data,
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
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.addDataCall !== null &&
      this.addDataCall ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson2 = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse2 = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson2) {
        Alert.alert(configJSON.success)
        this.setState({
          loading: false,
          showModel:false
        });
        this.getUserDataListApi()
      } else {
        this.setState({
          loading: false,
        });
        this.parseApiErrorResponse(responseJson2);
      }
      this.parseApiCatchErrorResponse(errorResponse2);
    }

    
    // Customizable Area End
  }

  // Customizable Area Start

async componentDidMount() {
  this.getUserDataListApi()
}

  getUserDataListApi = async () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userDataListCall = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userListUrl+this.state.category.value
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  postAddDataApi=async()=>{
    const header = {
    };
    const formData = new FormData();
    formData.append("title", this.state.title)
    formData.append("description", this.state.description)
    formData.append("price", this.state.price);
    formData.append("quantity", this.state.quantity)
    formData.append("user_type", this.state.category.value)

    if(this.isPlatformWeb()){
      this.state.imagesWeb.forEach((item: File) => {
        formData.append("images[]", item)
      })
    }else{
      this.state.images.forEach((item: Imagetype) => {
        formData.append("images[]", {
          uri: item.uris,
          type: "image/png",
          name: "image"
        })
      })
    }

   

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addDataCall = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
     configJSON.addDataUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;


  }

  showCategory = () =>
    this.setState({
      showCategory: !this.state.showCategory,
    });

  onSelectCategory = (item: CategoryType) => {
    this.setState({ category: item, showCategory: false },()=>{
      this.getUserDataListApi()
    });
  };

  onSelectCategoryWeb = (value: string) => {
    const filteredData = this.state.catagorydata.find((finddd) => finddd.value === value)
    filteredData && this.setState({ category: filteredData },()=>{
      this.getUserDataListApi()
    });
  };


  addNewProduct = () => this.setState({ showModel: true });

  hideModal = () => this.setState({ showModel: false });

  openImagePicker = () => {
    ImagePicker?.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
    }).then((ress) => {
      this.setState({
        images: [
          ...this.state.images,
          {
            uris: ress.path,
            width: 300,
            height: 400,
          },
        ],
      });
    });
  };

  onChangeImage = (event:React.ChangeEvent) => {
    const targetData= event.target as HTMLInputElement;
    const fileValue: File = (targetData.files as FileList)[0];
    const base64Img = URL.createObjectURL(fileValue)
    this.setState({ imagesWeb: [...this.state.imagesWeb, fileValue], baseImages: [...this.state.baseImages, base64Img] });
  };

  onChangeTitle = (text: string) => {
    this.setState({ title: text });
  };

  onChangeDescription = (text: string) => {
    this.setState({ description: text });
  };

  onChangePrice = (text: string) => {
    this.setState({ price: text });
  };

  onChangeQuantity = (text: string) => {
    this.setState({ quantity: text });
  };

  // Customizable Area End
}
