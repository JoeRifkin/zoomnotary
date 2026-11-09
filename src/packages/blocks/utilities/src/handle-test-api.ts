import { Message } from '../../../framework/src/Message';
import MessageEnum, { getName } from '../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../framework/src/RunEngine';

export function handleTestApiCall(messageApi: Message, bodyData?: any) {
  messageApi.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    messageApi.messageId
  );

  messageApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
    error: ['error message']
  });

  runEngine.sendMessage('Unit Test', messageApi);

  messageApi.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    '/endpoint'
  );

  messageApi.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    bodyData
  );

  runEngine.sendMessage('Unit Test', messageApi);
}
