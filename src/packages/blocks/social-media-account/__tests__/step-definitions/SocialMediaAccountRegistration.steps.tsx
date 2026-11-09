import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import SocialMediaAccountRegistration from "../../src/SocialMediaAccountRegistration";
import { View as MockView } from "react-native";
import SocialMediaAccountController from "../../src/SocialMediaAccountController";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

const screenProps = {
  id: "SocialMediaAccountRegistration",
  navigation: {}
};

jest.mock("react-native-modal-activityindicator", () => ({
  default: (props: object) => <MockView {...props} />
}));

jest.mock("@react-native-community/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn()
      .mockImplementation(() => Promise.reject("")),
    signIn: jest.fn().mockImplementation(() => ({
      user: {
        email: "test@gmail.com",
        id: "id"
      }
    }))
  },
  statusCodes: {
    PLAY_SERVICES_NOT_AVAILABLE: 1,
    SIGN_IN_CANCELLED: 2,
    IN_PROGRESS: 3
  },
}));

jest.mock("react-native-fbsdk", () => ({
  LoginManager: {
    logInWithPermissions: () => ({
      then: (successCallback: Function, falsedCallback: Function) => {
        successCallback && successCallback({isCancelled: true});
        falsedCallback && falsedCallback("cancel-by-user")
      }
    })
  },
  AccessToken: {
    getCurrentAccessToken:  jest
    .fn()
    .mockImplementation(() => Promise.reject("cancel-by-user"))
  }
}));

describe("SocialMediaAccountRegistration", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.spyOn(runEngine, "sendMessage");
  });

  test("should render without crashes", () => {
    const { container } = render(
      <SocialMediaAccountRegistration {...screenProps} />
    );
    expect(container).toBeTruthy();
  });

  test("social login with facebook button should be define inside render", () => {
    const { getByTestId } = render(
      <SocialMediaAccountRegistration {...screenProps} />
    );
    const facebookSignupBtn = getByTestId("btnFacebookLogIn");
    fireEvent.press(facebookSignupBtn);
    expect(facebookSignupBtn).toBeDefined();
  });

  test("network call should be called for login when user successfully singup to facebook", () => {
    const socialMediaAccountController = new SocialMediaAccountController({
      navigation: {},
      id: "",
      isRegistration: true
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
          RestAPIResponceEndPointMessage: "account/accounts"
        }
      })
    );
  });

  test("social singup with google button should be define inside render", () => {
    const { getByTestId } = render(
      <SocialMediaAccountRegistration {...screenProps} />
    );
    const googleSignupBtn = getByTestId("btnGoogleLogIn");
    fireEvent.press(googleSignupBtn);
    expect(googleSignupBtn).toBeDefined();
  });

  test("network call should be called for signup when user successfully singup to google account", () => {
    const socialMediaAccountController = new SocialMediaAccountController({
      navigation: {},
      id: "",
      isRegistration: true
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
          RestAPIResponceEndPointMessage: "account/accounts"
        }
      })
    );
  });

  test("response message should be saved on session message", () => {
    const responseMessage = new Message(
      getName(MessageEnum.SessionSaveMessage)
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("network response should be get for signup", () => {
    const socialMediaAccountController = new SocialMediaAccountController({
      navigation: {},
      id: "",
      isRegistration: true
    });

    const responseMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      responseMessage.messageId
    );

    socialMediaAccountController.createAccountAPICallId =
      responseMessage.messageId;

    responseMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        meta: {
          token: "dummy-token-string"
        }
      }
    );
    runEngine.sendMessage(responseMessage.id, responseMessage);
  });

  test("user press button to navigate to sinup with email password", () => {
    const { getByTestId } = render(
      <SocialMediaAccountRegistration {...screenProps} />
    );
    const btnNavigate = getByTestId("btnNavigate");
    fireEvent.press(btnNavigate);
    expect(btnNavigate).toBeDefined();
  });
});
