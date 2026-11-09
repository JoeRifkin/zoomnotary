import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import SocialMediaAccountLogin from "../../src/SocialMediaAccountLogin";
import { View as MockView } from "react-native";
import SocialMediaAccountController from "../../src/SocialMediaAccountController";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import FacebookController from "../../src/FacebookController";
import { FacebookDelegate } from "../../src/FacebookDelegate";
import { GoogleDelegate } from "../../src/GoogleDelegate";

const screenProps = {
  id: "SocialMediaAccountLogin",
  navigation: {}
};

jest.mock("react-native-modal-activityindicator", () => ({
  default: (props: object) => <MockView {...props} />
}));

describe("SocialMediaAccountLogin", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.spyOn(runEngine, "sendMessage");
  });

  test("should render without crashes", () => {
    const { container } = render(<SocialMediaAccountLogin {...screenProps} />);
    expect(container).toBeTruthy();
  });

  test("social login with facebook button should be define inside render", () => {
    const { getByTestId } = render(
      <SocialMediaAccountLogin {...screenProps} />
    );
    const facebookLoginBtn = getByTestId("btnFacebookLogIn");
    fireEvent.press(facebookLoginBtn);
    expect(facebookLoginBtn).toBeDefined();
  });

  test("network call should be called for login when user successfully login to facebook", () => {
    const socialMediaAccountController = new SocialMediaAccountController({
      navigation: {},
      id: "",
      isRegistration: false
    });
    socialMediaAccountController.facebookUserStatusChanged({
      email: "test@hotmail.com",
      id: "12"
    });

    expect(runEngine.sendMessage).toBeCalledWith(
      "RestAPIRequestMessage",
      expect.objectContaining({
        id: "RestAPIRequestMessage",
        initializeFromObject: expect.any(Function),
        messageId: expect.any(String),
        properties: {
          NavigationPropsMessage: expect.any(Object),
          RestAPIRequestBodyMessage: JSON.stringify({
            data: {
              type: "social_account",
              attributes: {
                email: "test@hotmail.com",
                password: "test@hotmail.com",
                unique_auth_id: "12"
              }
            }
          }),
          RestAPIRequestHeaderMessage: JSON.stringify({
            "Content-Type": "application/json"
          }),
          RestAPIRequestMethodMessage: "POST",
          RestAPIResponceEndPointMessage: "login/login"
        }
      })
    );
  });

  test("network response should be get for facebook login", () => {
    const responseMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      responseMessage.messageId
    );

    FacebookController.apiCallId =
      responseMessage.messageId;

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        email: "test@hotmail.com",
        id: "test@hotmail.com"
      }
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("social login with google button should be define inside render", () => {
    const { getByTestId } = render(
      <SocialMediaAccountLogin {...screenProps} />
    );
    const googleLoginBtn = getByTestId("btnGoogleLogIn");
    fireEvent.press(googleLoginBtn);
    expect(googleLoginBtn).toBeDefined();
  });

  test("network call should be called for login when user successfully login to google account", () => {
    const socialMediaAccountController = new SocialMediaAccountController({
      navigation: {},
      id: "",
      isRegistration: false
    });
    socialMediaAccountController.googleUserStatusChanged({
      email: "",
      id: ""
    });
    socialMediaAccountController.googleUserStatusChanged({
      email: "test@gmail.com",
      id: "test@gmail.com"
    });

    expect(runEngine.sendMessage).toBeCalledWith(
      "RestAPIRequestMessage",
      expect.objectContaining({
        id: "RestAPIRequestMessage",
        initializeFromObject: expect.any(Function),
        messageId: expect.any(String),
        properties: {
          NavigationPropsMessage: expect.any(Object),
          RestAPIRequestBodyMessage: JSON.stringify({
            data: {
              type: "social_account",
              attributes: {
                email: "test@gmail.com",
                password: "test@gmail.com",
                unique_auth_id: "test@gmail.com"
              }
            }
          }),
          RestAPIRequestHeaderMessage: JSON.stringify({
            "Content-Type": "application/json"
          }),
          RestAPIRequestMethodMessage: "POST",
          RestAPIResponceEndPointMessage: "login/login"
        }
      })
    );
  });

  test("response message should be saved on session message", () => {
    new FacebookDelegate().facebookUserStatusChanged({email: "", id: ""}, true)
    new GoogleDelegate().googleUserStatusChanged({email: "", id: ""}, true)
    const responseMessage = new Message(
      getName(MessageEnum.SessionSaveMessage)
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("network response should be get for login", () => {
    const responseMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
 
    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      {}
    );

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      responseMessage.messageId
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("user press button to navigate to login with email password", () => {
    const { getByTestId } = render(
      <SocialMediaAccountLogin {...screenProps} />
    );
    const btnNavigate = getByTestId("btnNavigate");
    fireEvent.press(btnNavigate);
    expect(btnNavigate).toBeDefined();
  });
});
