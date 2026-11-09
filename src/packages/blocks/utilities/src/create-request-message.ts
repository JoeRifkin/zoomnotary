import { Message } from '../../../framework/src/Message';
import MessageEnum, { getName } from '../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../framework/src/RunEngine';

export function createRequestMessage(request: {
    requestMessage: Message,
    endPoint: string,
    header?: object,
    method: string,
    token?: string,
    body?: string | FormData,
    isFormDataRequest?: boolean,
}) {
    const {
        requestMessage: apiRequestMessage,
        endPoint: apiEndPoint,
        header: apiHeader,
        method: apiMethod,
        token: apiToken,
        body: apiBodyRequest,
        isFormDataRequest,
    } = request;
    
    const convertHeader =  isFormDataRequest ? {
      Token: apiToken ?? undefined,
    } : {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: apiToken ?? undefined,
        ...apiHeader,
    };

    apiRequestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        apiEndPoint
    );

    apiRequestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(convertHeader)
    );

    apiRequestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        apiMethod
    );

    apiBodyRequest && apiRequestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        apiBodyRequest
    );

    runEngine.sendMessage(apiRequestMessage.id, apiRequestMessage);
}

export default createRequestMessage;
