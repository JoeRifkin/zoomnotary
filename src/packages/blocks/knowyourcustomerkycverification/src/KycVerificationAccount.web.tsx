import React from "react";
// Customizable Area Start
import {
Typography,Container
} from "@mui/material";

import KycVerificationAccountController, {
  Props,
} from "./KycVerificationAccountController";

// Customizable Area End

export default class KycVerificationAccount extends KycVerificationAccountController {
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
      <Container  style={styles.container}>
          <Typography style={styles.textstyle1}>
            User Details
        </Typography>
       
      </Container>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffffff",
  },
  textviewstyle1: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  textstyle1: {
    fontSize: 32,
    fontWeight: 700,
    color: '#282828'
  } ,
};
// Customizable Area End
