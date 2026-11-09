// Customizable Area Start
import React from "react";

import {
  Container,
  Button,
  Table, 
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Snackbar
} from "@material-ui/core";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Alert from '@material-ui/lab/Alert';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1876d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      contrastText: "#fff",
    }
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

import DocusignIntegrationController, {
  Props,
} from "./DocusignIntegrationController";

export default class DocusignIntegration extends DocusignIntegrationController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.state.isOpenSnackbar && <Snackbar open={this.state.isOpenSnackbar} autoHideDuration={3000} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <Alert severity="success">
            Document Signature saved successfully!
          </Alert>
        </Snackbar>}
        <div style={{ backgroundColor: "#e6e6e6", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        {this.state.isOpenCanvas && this.state.activeDocument && 
          <div>
            <div>Document: {this.state.activeDocument}</div>
            <div style={{ backgroundColor: "#fff", border: "1px solid black" }}>
              
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button color="secondary" variant="contained" onClick={this.backToList}>Back</Button>
              <Button color="default" variant="contained" onClick={this.clearSign} >Clear</Button>
              <Button color="primary" variant="contained" onClick={this.submitDocumentSignData}>Submit</Button>
            </div>
          </div>}
        {!this.state.isOpenCanvas &&
          <Container maxWidth="md">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: 16 }}>No</TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: 16 }}>Document</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.docList.map((item: string, index: number) => (
                    <TableRow key={item+"docs"}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item}</TableCell>
                      <TableCell>
                        <Button color="primary" variant="contained" onClick={() => this.openSignCanvas(item)}>E-Sign</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          }
        </div>
      </ThemeProvider>
    );
  }
}

// Customizable Area End
// Customizable Area End
