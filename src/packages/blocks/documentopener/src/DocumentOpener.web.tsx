import React from "react";

// Customizable Area Start
import { Container, Box, Button } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import DocViewer, { DocViewerRenderers, PDFRenderer } from "react-doc-viewer";
// Customizable Area End

import DocumentOpenerController, {
  Props,
  configJSON,
} from "./DocumentOpenerController.web";

export default class DocumentOpener extends DocumentOpenerController {
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
          <Container maxWidth={"md"}>
            <Box sx={webStyle.mainWrapper}>
              <Button
                data-testid="openWithUrlBtn"
                style={webStyle.buttonStyle}
                variant="contained"
                color="primary"
                onClick={this.openWithUrlHandler}
              >
                {configJSON.openWithUrl}
              </Button>
              {this.state.selectFile && (
                <DocViewer
                  data-testid="docViewer"
                  style={{ width: "100%" }}
                  pluginRenderers={DocViewerRenderers}
                  documents={this.docs}
                />
              )}
            </Box>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  buttonStyle: {
    height: "45px",
    marginTop: 10,
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
};
// Customizable Area End
