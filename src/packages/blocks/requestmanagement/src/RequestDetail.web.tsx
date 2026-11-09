import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
      contrastText: "#fff",
    },
  },
  typography: {
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End

import RequestDetailController, {
  Props,
  configJSON,
} from "./RequestDetailController";

export default class RequestDetail extends RequestDetailController {
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
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.titleText}</Typography>

            <Typography variant="h6" style={webStyle.tableTitleStyle}>
              {configJSON.receiveRequestText}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{configJSON.nameLabelText}</TableCell>
                    <TableCell>{configJSON.requestLabelText}</TableCell>
                    <TableCell>{configJSON.statusLabelText}</TableCell>
                    <TableCell>{configJSON.actionLabelText}</TableCell>
                  </TableRow>
                </TableHead>
                
              </Table>
            </TableContainer>
          </Box>
        </Container>


      </ThemeProvider>
    );
    // Customizable Area End
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
  topWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  tableTitleStyle: {
    alignSelf: "flex-start",
    marginTop: 20,
  },
  tableBtnStyle: {
    marginRight: 10,
  },
  inputStyle: {
    marginTop: 15,
    width: 350,
    maxWidth: "100%",
  },
};
// Customizable Area End
