import React from "react";
import { Button, adaptV4Theme } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import OutlookIntegrationController, {
  Props,
} from "./OutlookIntegrationController";
import "@mui/styles";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// Customizable Area Start
require("isomorphic-fetch");

// import ProfileContent from 'ProfileContent'

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End

class OutlookIntegration extends OutlookIntegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  render() {
    return (
      // Customizable Area Start
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <div style={webStyle.wraper}>
            <div style={webStyle.container}>
              <h2>Outlook Integration Example</h2>
              <Button
                style={webStyle.link}
                onClick={this.handleLogin}
                data-test-id={"TestSignInButton"}
              >
                Login
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
      // Customizable Area End
    );
  }
  // Customizable Area End
}

// Customizable Area Start
export default OutlookIntegration;
const webStyle = {
  wraper: {
    flex: 1,
    width: "100vw",
    height: "80vh",
    padding: 16,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  container: {
    width: "80vw",
    margin: "0 auto",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    fontSize: 18,
  },
};
// Customizable Area End
