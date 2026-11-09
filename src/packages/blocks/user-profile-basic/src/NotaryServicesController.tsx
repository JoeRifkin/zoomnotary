import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";

interface ServiceIcon {
    url: string;
}

interface ServiceAttributes {
    id: number;
    service_icon: ServiceIcon;
    service_name: string;
    service_description: string;
    is_selected: boolean;
}

export interface ServiceItem {
    id: string;
    type: string;
    attributes: ServiceAttributes;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    // Customizable Area Start
    token: string;
    services: ServiceItem[];
    selectedServices: number[];
    isAllServicesSelected:boolean;
    showModal: boolean;
    loading:boolean
    notarySeviceErrorMssg:string
    isChangesDone:boolean
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class NotaryServicesController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    getServicesApiCallId: string = '';
    getSelectedServicesApiCallId: string = '';
    addServicesApiCallId: string = '';

    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.SessionSaveMessage),
            getName(MessageEnum.SessionResponseMessage),
            // Customizable Area End
        ];

        this.state = {
            txtInputValue: "",
            txtSavedValue: "A",
            enableField: false,
            // Customizable Area Start
            token: '',
            services: [],
            selectedServices: [],
            isAllServicesSelected: false,
            showModal: false,
            loading: true,
            notarySeviceErrorMssg:"",
            isChangesDone:false
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    async componentDidMount() {
        this.getToken();
        setTimeout(() => {
            this.getServices();
            this.getSelectedServices();
        }, 300);
    }

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
            this.setState({ token: token });
        }
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        let responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        if (responseJson && !responseJson.errors) {
            if (apiRequestCallId === this.getServicesApiCallId) {
                this.setState({ services: responseJson.data, loading: false })
            }

            if (apiRequestCallId === this.getSelectedServicesApiCallId) {
                this.setState({ selectedServices: responseJson.services, loading: false });
                responseJson.services.length > 0 && this.checkAllServicesSelected()
            }

            if (apiRequestCallId === this.addServicesApiCallId) {
                if(responseJson.data){
                    this.setState({ showModal: false, loading: false,notarySeviceErrorMssg:"" })
                    setTimeout(() => {
                        this.setState({ isChangesDone: true, }, () => {
                          setTimeout(() => {
                            this.setState({ isChangesDone: false,});
                            this.goBack()
                          }, 2000);
                        });
                      }, 1000);
                } else if(responseJson.message){
                    this.setState({notarySeviceErrorMssg:responseJson.message, showModal: false, loading: false})
                }
            }
        }

    }

   
    checkAllServicesSelected = () => {
        setTimeout(() => {
            const allServicesSelected = this.state.services.every((service: ServiceItem) =>
                this.state.selectedServices.includes(Number(service.attributes.id))
            );
            this.setState({ isAllServicesSelected: allServicesSelected });
        }, 200);
    }
    goBack = () => {
        this.props.navigation.goBack()
    }

    clickOnAllSelect = () => {
        this.setState({ isAllServicesSelected: !this.state.isAllServicesSelected }, () => {
            if (this.state.isAllServicesSelected) {
                const allIds = this.state.services.map((item: ServiceItem) => item.attributes.id);
                this.setState({ selectedServices: allIds });
            } else {
                this.setState({ selectedServices: [] });
            }
        })
    }

    clickOnSelect = (serviceId: number) => {
        const { selectedServices } = this.state;
        const index = selectedServices.indexOf(Number(serviceId));
        if (index !== -1) {
            // ID exists, remove it
            const newArray = selectedServices.filter((item: number) => item !== Number(serviceId));
            this.setState({
                selectedServices: newArray,
                isAllServicesSelected: false
            });
        } else {
            // ID doesn't exist, add it
            this.setState((prevState) => ({
                selectedServices: [...prevState.selectedServices, Number(serviceId)],
            }));
        }
        this.checkAllServicesSelected()
    }


   
    toggleModal = () =>{
        this.setState({showModal: !this.state.showModal})
    }


    disableBtn = () => {
        return this.state.selectedServices.length > 0 ? false : true
    }


    onSubmit = () => {
        this.setState({loading:true})

        const header = {
            "Content-Type": "application/json",
            token: this.state.token
        };
        const payload = {
            service_ids: this.state.selectedServices
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.addServicesApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.addServiceEndPoint
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
            configJSON.postMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true
    }

    getServices = () => {
        const header = {
            "Content-Type": configJSON.contentTypeApplicationJson,
            token: this.state.token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getServicesApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getServicesEndPoint
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
    };


    getSelectedServices = () => {
        const header = {
            "Content-Type": configJSON.contentTypeApplicationJson,
            token: this.state.token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getSelectedServicesApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.selectedServicesEndPoint
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
    };


    // Customizable Area End
}