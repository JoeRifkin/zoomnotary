import React from "react";
// Customizable Area Start
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import CustomFacebookLogInButton from "../../social-media-account/src/CustomFacebookLogInButton";
import CustomGoogleLogInButton from "../../social-media-account/src/CustomGoogleLogInButton";
// Customizable Area End

const configJSON = require("./config.js");

import SocialMediaAccountController, {
  Props
} from "./SocialMediaAccountController.web";

class SocialMediaAccount extends SocialMediaAccountController {
  static SocialMediaAccount: SocialMediaAccount;

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
      <View style={styles.container}>
        {this.state.loading && (
          <View style={styles.loaderStyle}>
            <ActivityIndicator />
          </View>
        )}
        <Text
          style={styles.labelTitle} //UI Engine::From Sketch
        >
          {this.props.isRegistration
            ? configJSON.signUpTitleText
            : configJSON.logInTitleText}{" "}
          {/*UI Engine::From Sketch*/}
        </Text>

        <Text
          style={styles.titleWhySignUp} //UI Engine::From Sketch
        >
          {this.props.isRegistration
            ? configJSON.signUpBodyText
            : configJSON.logInBodyText}{" "}
          {/*UI Engine::From Sketch*/}
        </Text>

        <CustomFacebookLogInButton
          testID="btnFacebookLogIn" //Merge Engine::From BDS
          appId={configJSON.facebookAppId} //Merge Engine::From SDS
          loginFacebookButtonText={
            this.props.isRegistration
              ? configJSON.facebookButtonText
              : configJSON.loginFacebookButtonText
          } //UI Engine::From Sketch
          {...this.btnFacebookLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
        />

        <CustomGoogleLogInButton
          testID="btnGoogleLogIn" //Merge Engine::From BDS
          style={styles.googleStyle} //UI Engine::From Sketch
          {...this.btnGoogleLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
        />

        <Text
          style={styles.orTextStyle} //UI Engine::From Sketch
        >
          {configJSON.orText} {/*UI Engine::From Sketch*/}
        </Text>

        <View
          style={styles.logInButtonContainer} //UI Engine::From Sketch
        >
          <TouchableOpacity
            testID="btnNavigate" //Merge Engine::From BDS
            style={styles.signUpButtonStyle} //UI Engine::From Sketch
            {...this.btnNavigateProps} //Merge Engine::From BDS - {...this.testIDProps}
          >
            <Text
              style={styles.signUpButtonTextStyle} //UI Engine::From Sketch
            >
              {this.props.isRegistration
                ? configJSON.signUpButtonText
                : configJSON.loginButtonText}{" "}
              {/*UI Engine::From Sketch*/}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logInButtonContainer: {
    overflow: "hidden",
    display: undefined,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    height: 40,
    width: 205,
    marginTop: 16,
    elevation: 6,
    backgroundColor: "#ffffff"
  },
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
  },
  googleStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 8,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginTop: 32
  },
  googleButtonImageStyle: {
    marginRight: 15,
    width: 20,
    height: 20
  },
  googleButtonTextStyle: {
    paddingLeft: 6,
    paddingRight: 3,
    fontSize: 14,
    color: "#2553b4",
    fontFamily: "Helvetica-Bold, sans-serif",
    marginLeft: 8
  },
  orTextStyle: {
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20
  },
  signUpButtonStyle: {
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
    padding: "11px",
    height: "100%",
    width: "100%"
  },
  signUpButtonTextStyle: {
    color: "#2553b4",
    fontSize: 11,
    fontFamily: "Helvetica-Bold, sans-serif"
  },
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  labelTitle: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 32,
    textAlign: "left",
    marginVertical: 8,
    color: "#6200EE"
  },
  loaderStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
// Customizable Area End

export default SocialMediaAccount;
