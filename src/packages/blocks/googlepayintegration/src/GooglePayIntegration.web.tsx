import React from "react";
// Customizable Area Start
import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import "@mui/styles";

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
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
// Customizable Area End

import GooglePayIntegrationController, {
  Props,
  configJSON,
} from "./GooglePayIntegrationController";

export default class GooglePayIntegration extends GooglePayIntegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth={"sm"}>
            <Box sx={webStyle.mainWrapper}>
              <Typography variant="h6">{configJSON.labelTitleText}</Typography>
              <Typography variant="subtitle1" component="div">
                {configJSON.labelBodyText}
              </Typography>
              <Box sx={webStyle.inputStyle}>
                <InputLabel id="service-shop-name">
                  This is the reviced value:{this.state.txtSavedValue}{" "}
                </InputLabel>
                <Input
                  data-test-id={"txtInput"}
                  type={this.state.enableField ? "password" : "text"}
                  placeholder={configJSON.txtInputPlaceholder}
                  fullWidth={true}
                  disableUnderline={true}
                  value={this.state.txtInputValue}
                  onChange={(event) => this.setInputValue(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.setEnableField}
                        edge="end"
                        size="large"
                      >
                        {this.state.enableField ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box
                data-test-id="btnAddExample"
                onClick={() => this.doButtonPressed()}
                component="button"
                sx={webStyle.buttonStyle}
              >
                <Button color={"primary"}>{configJSON.btnExampleTitle}</Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
};
// Customizable Area End
