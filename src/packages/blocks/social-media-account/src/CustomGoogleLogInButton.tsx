import React from "react";
// Customizable Area Start
import { View } from "react-native";

import {
  CredentialResponse,
  GoogleOAuthProvider,
  GoogleLogin
} from "@react-oauth/google";
const configJSON = require("./config");
// Customizable Area End

type Props = {
  testID: string;
  style: Object;
  onResponse: (credential: string) => void;
  onError: (error: string) => void;
  useOneTap: boolean;
  // Customizable Area Start
  // Customizable Area End
};

export default class CustomGoogleLogInButton extends React.Component<Props> {
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
      <GoogleOAuthProvider clientId={configJSON.clientID}>
        <View style={this.props.style} testID="googleLogin">
          <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) => {
              credentialResponse.credential &&
                this.props.onResponse(credentialResponse.credential);
            }}
            onError={() => this.props.onError(configJSON.loginFailed)}
            useOneTap={true}
          />
        </View>
      </GoogleOAuthProvider>
    );
    // Customizable Area End
  }
}
