import React from "react";

// Customizable Area Start
import { Container, Box, Button } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
// Customizable Area End

import TasksController, { Props, configJSON } from "./TasksController";

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
// Customizable Area End

export default class Tasks extends TasksController {
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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="md">
            <Box sx={webStyles.viewStyle}>
              <Box sx={webStyles.buttonViewStyle}>
                <Button
                  data-test-id="btnNavigateToTaskList"
                  variant="contained"
                  color="primary"
                  onClick={() => this.navigateToTaskList()}
                >
                  {configJSON.textTaskList}
                </Button>
              </Box>
              <Box sx={webStyles.buttonViewStyle}>
                <Button
                  data-test-id="btnNavigateToTask"
                  variant="contained"
                  color="primary"
                  onClick={() => this.navigateToTask()}
                >
                  {configJSON.textTasks}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const webStyles = {
  viewStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonViewStyle: {
    mt: 1,
  },
};
// Customizable Area Start
