import React from "react";

// Customizable Area Start
import SocialMediaAccount from "./SocialMediaAccount";
// Customizable Area End

import SocialMediaAccountLoginController, {
  Props
} from "./SocialMediaAccountLoginController";

export default class SocialMediaAccountLogin extends SocialMediaAccountLoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return <SocialMediaAccount {...this.props} isRegistration={false} />;
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
