import React from "react";
// Customizable Area Start
import { Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
// Customizable Area End

import InvoiceBillingController, {
  Props,
  configJSON,
} from "./InvoiceBillingController.web";

export default class InvoiceBilling extends InvoiceBillingController {
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
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        id='main_view'
      >
        <Box>
          <Typography variant="h6">{configJSON.enterInvoice}</Typography>
          <form noValidate autoComplete="off" style={{marginTop:'15px'}}>
            <TextField
              id="textInput"
              placeholder={configJSON.invoiceNumber}
              variant="outlined"
              value={this.state.invoice}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{this.onChangeInvoice(event.target.value)}}
              inputProps={{ maxLength: 6 }}
              style={{width:'500px'}}
            />
            <Typography variant="caption" display="block" style={{color:'red'}}>
            {this.state.invoiceError}
            </Typography>
            <Button id='btnExample' variant="contained" color="primary" onClick={this.getPdfLink} style={{marginTop:'15px'}}>
            {configJSON.btnExampleTitle}
            </Button>
          </form>
          {this.state.loading && (
       <CircularProgress />
        )}
        </Box>
      </Box>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
