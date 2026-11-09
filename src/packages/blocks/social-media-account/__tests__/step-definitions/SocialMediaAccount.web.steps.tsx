import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import SocialMediaAccount from "../../src/SocialMediaAccount.web";
import { View as MockView } from "react-native";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import SocialMediaAccountController from "../../src/SocialMediaAccountController.web";

const screenProps = {
  id: "SocialMediaAccount",
  navigation: {},
  isRegistration: false
};

const googleResponse = {
  credential:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFkZWRlZWUyZDE4NjliNjU3ZmE5MzAzMDAwODJmZTI2YjNkOTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODkwOTQ1OTAsImF1ZCI6IjY0OTU5MjAzMDQ5Ny1ncDNtb3FoMGsyc3JjNXIydTVxZmFvcmlpMWRxa3ZkYy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNTA3NjE0NDE0MDA2MTY1MzA0OCIsImhkIjoibW9iaS1naWcuY29tIiwiZW1haWwiOiJhZm5hbi5kYW5pc2hAbW9iaS1naWcuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjY0OTU5MjAzMDQ5Ny1ncDNtb3FoMGsyc3JjNXIydTVxZmFvcmlpMWRxa3ZkYy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJBZm5hbiBEYW5pc2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZGVWaTQ4UUhObXpoVHo4Zl9KcXNPVFV4alNaSG9weWJ6SlZ6emRCSXVBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFmbmFuIiwiZmFtaWx5X25hbWUiOiJEYW5pc2giLCJpYXQiOjE2ODkwOTQ4OTAsImV4cCI6MTY4OTA5ODQ5MCwianRpIjoiMmQxNzJkYzdjOTIyMmM4MzdmZmYyNjFkYzNlZTJlNjE2MDgxYjZiMSJ9.kNpG8x05u2QK30TPCaBBnuvXw569dff0yCZdIXqtBGXNS-DZQFSLJ_gJnbqSB0wUyHfXk6RJZB9JjlTZ77VSd4kmMPBO8svKFcSgGskcXRoxUN9Ii-MFHNaTMZGam4skjWOfPtoN_I_lvE8dkjTrFchafjSyfeXw51Jv-PUdxwugYwcrXpA93U3nBBRyYP42opciDo_iPbOb-v_vidz2DIvYVYBEo9fSTScgXuB-RF4_xgVuL7ZD55HejsamrW-pyAKTnJ7KsKznGY2522csd841fFoqbzlM00CiOOdY5xB22rtxBdjisiAzTTPLFCDyqHQdaIS4ETOveyTN7yoDgg",
  clientId:
    "649592030497-gp3moqh0k2src5r2u5qfaorii1dqkvdc.apps.googleusercontent.com",
  select_by: "user"
};

jest.mock("react-native-modal-activityindicator", () => ({
  default: (props: object) => <MockView {...props} />
}));

jest.mock("react-facebook-login/dist/facebook-login-render-props", () => ({
  default: (props: object) => <MockView {...props} />
}));

describe("SocialMediaAccount", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.spyOn(runEngine, "sendMessage");
    jest.spyOn(runEngine, "debugLog");
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  test("should render without crashes", () => {
    const { container } = render(<SocialMediaAccount {...screenProps} />);
    expect(container).toBeTruthy();
  });

  test("response should be get when user successfully login", () => {
    const { getByTestId } = render(<SocialMediaAccount {...screenProps} />);
    const facebookLoginBtn = getByTestId("facebookCustomLogin");
    facebookLoginBtn.props.callback({
      email: "test@hotmail.com",
      id: "test@hotmail.com",
      name: "test",
      userID: "12",
      accessToken: "dummy access token"
    });
    const children = render(
      facebookLoginBtn.props.render({ onClick: jest.fn() })
    );
    fireEvent.press(children.getByTestId("facebookCustomLoginButton"));

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
                unique_auth_id: "test@hotmail.com"
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

  test("should be called debugLog with error when user failed to login", () => {
    const { getByTestId } = render(<SocialMediaAccount {...screenProps} />);
    const facebookLoginBtn = getByTestId("facebookCustomLogin");
    facebookLoginBtn.props.callback({
      email: "",
      id: "",
      name: "",
      userID: "",
      accessToken: ""
    });

    expect(runEngine.debugLog).toBeCalledWith(
      "createAccountFromSocial empty info"
    );
  });

  test("should be called debugLog with error when user failed to resgistration", () => {
    const { getByTestId } = render(
      <SocialMediaAccount {...screenProps} isRegistration={true} />
    );
    const facebookLoginBtn = getByTestId("facebookCustomLogin");
    facebookLoginBtn.props.callback({
      email: "",
      id: "",
      name: "",
      userID: "",
      accessToken: ""
    });

    expect(runEngine.debugLog).toBeCalledWith(
      "createAccountFromSocial empty info"
    );
  });

  test("resgistration response should be get when user successfully login", () => {
    const { getByTestId } = render(
      <SocialMediaAccount {...screenProps} isRegistration={true} />
    );
    const facebookLoginBtn = getByTestId("facebookCustomLogin");
    facebookLoginBtn.props.callback({
      email: "test@hotmail.com",
      id: "test@hotmail.com",
      name: "test",
      userID: "12",
      accessToken: "dummy access token"
    });
    const children = render(
      facebookLoginBtn.props.render({ onClick: jest.fn() })
    );
    fireEvent.press(children.getByTestId("facebookCustomLoginButton"));

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
                unique_auth_id: "test@hotmail.com"
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

  test("Should be get success message when user login with google account successfully", () => {
    const { getByTestId } = render(<SocialMediaAccount {...screenProps} />);
    waitFor(() => {
      const googleLogin = getByTestId("googleLogin");
      const children: any = googleLogin.children[0];
      children.props.onSuccess(googleResponse);
      expect(runEngine.debugLog).toBeCalledWith("User SIGNED IN.");
    });
  });

  test("Should be get failed message when user click google button and cancel", () => {
    const { getByTestId } = render(<SocialMediaAccount {...screenProps} />);
    waitFor(() => {
      const googleLogin = getByTestId("googleLogin");
      const children: any = googleLogin.children[0];
      children.props.onError();
      expect(window.alert).toBeCalledWith("Something went wrong!");
    });
  });

  test("User login with google account for registration", () => {
    const { getByTestId } = render(
      <SocialMediaAccount {...screenProps} isRegistration={true} />
    );
    const googleLogin = getByTestId("googleLogin");
    const children: any = googleLogin.children[0];
    children.props.onSuccess(googleResponse);
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

  test("Navigation should be called for login with email and password", () => {
    const { getByTestId } = render(<SocialMediaAccount {...screenProps} />);
    const btnNavigate = getByTestId("btnNavigate");
    fireEvent.press(btnNavigate);
    expect(btnNavigate).toBeDefined();
  });

  test("Navigation should be called for signup with email and password", () => {
    const { getByTestId } = render(
      <SocialMediaAccount {...screenProps} isRegistration={true} />
    );
    const btnNavigate = getByTestId("btnNavigate");
    fireEvent.press(btnNavigate);
    expect(btnNavigate).toBeDefined();
  });
});
