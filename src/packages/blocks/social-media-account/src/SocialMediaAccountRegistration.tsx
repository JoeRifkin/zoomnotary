import React from "react";

// Customizable Area Start
import SocialMediaAccount from "./SocialMediaAccount";
// Customizable Area End

import SocialMediaAccountRegistrationController, {
  Props
} from "./SocialMediaAccountRegistrationController";

export default class SocialMediaAccountRegistration extends SocialMediaAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return <SocialMediaAccount {...this.props} isRegistration={true} />;
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
