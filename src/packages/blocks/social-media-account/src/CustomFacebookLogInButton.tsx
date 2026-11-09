import React from "react";
// Customizable Area Start
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const FacebookLogin = require("react-facebook-login/dist/facebook-login-render-props")
  .default;
import { facebookImage } from "./assets";

type Response = {
  status: string;
  id: string;
  name: string;
  email: string;
  accessToken: string;
  userID: string;
};

type RenderProps = {
  isDisabled: boolean;
  isProcessing: boolean;
  isSdkLoaded: boolean;
  onClick: Function;
};
// Customizable Area End

type Props = {
  testID: string;
  appId: string;
  loginFacebookButtonText: string;
  callback: (response: Response) => void;
  onPress: () => void;
  // Customizable Area Start
  // Customizable Area End
};

export default class CustomFacebookLogInButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <FacebookLogin
        fields="name,email,picture"
        scope="email,public_profile"
        appId={this.props.appId}
        callback={this.props.callback}
        testID="facebookCustomLogin"
        render={(renderProps: RenderProps) => (
          <TouchableOpacity
            onPress={() => {
              renderProps.onClick();
              this.props.onPress();
            }}
            style={styles.facebookStyle}
            testID="facebookCustomLoginButton"
          >
            <Image style={styles.facebookImageStyle} source={facebookImage} />
            <Text style={styles.facebookTextStyle}>
              {this.props.loginFacebookButtonText}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  facebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 8,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    padding: "11px"
  },
  facebookImageStyle: {
    marginRight: 10,
    width: 20,
    height: 20
  },
  facebookTextStyle: {
    color: "#2553b4",
    fontFamily: "Helvetica-Bold, sans-serif",
    paddingLeft: 7
  }
});
// Customizable Area End
