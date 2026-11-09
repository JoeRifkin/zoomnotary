import React from "react";
// Customizable Area Start
import {
  Modal,
  Container,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  createTheme, ThemeProvider
} from "@mui/material";
// Customizable Area End

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff"
    }
  }
});
// Customizable Area End

import SearchController, { Props } from "./SearchController";

export default class Search extends SearchController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          {/* Customizable Area Start */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
          </Box>

          <Paper style={{ width: "100%", overflow: "hidden" }}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
               
              </Table>
            </TableContainer>
          </Paper>

        
          {/* Customizable End Start */}
        </Container>
      </ThemeProvider>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
// Customizable Area End
