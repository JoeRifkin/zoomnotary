// Customizable Area Start
import React from "react";

import { 
  Container, 
  Box, 
  Input,  
  Button,
  TextField,
  InputLabel,
  Typography, 
  InputAdornment, 
  IconButton,
} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

import CollectTransactionFeesController, {
  Props,
  configJSON
} from "./CollectTransactionFeesController";

export default class CollectTransactionFees extends CollectTransactionFeesController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
        <ThemeProvider theme={theme} >
          <Container maxWidth={'sm'} >
            <Box>
              <Typography>Enter Transaction Amount</Typography>
              <Box>
                <TextField
                  id="txtInputTransactionAmount"
                  onChange={(event)=>this.amountFunction(event.target.value)}
                  value={this.state.transactionAmount}
                  placeholder="Enter amount"
                  fullWidth={true}
                />
              </Box>
              {this.state.transactionAmountMessage !== "" && <Typography>{this.state.transactionAmountMessage}</Typography>}
            </Box>
            <Box  
                onClick={this.totalAmount}
                id="btnTotalAmount"
                component="button" 
                sx={webStyle.buttonStyle}>
            <Button 
              color={'primary'}
            >
              Calculate Amount
            </Button>
            </Box>

            <Typography>Total Amount</Typography>

            <Box>
              <Typography>{this.state.totalAmount}</Typography>
            </Box>

            <Typography>Transaction Fees</Typography>

            <Box>
              <Typography>{this.state.percentage}</Typography>
            </Box>

            <Typography>Actual Amount</Typography>

            <Box>
              <Typography>{this.state.actualAmount}</Typography>
            </Box>

            <Box  
                onClick={this.PayAmount}
                id="btnPayAmount"
                component="button" 
                sx={webStyle.buttonStyle}>
            <Button 
              color={'primary'}
            >
              pay Amount
            </Button>
            </Box>
          </Container>
        </ThemeProvider>
    );
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
  typography: {
    h6: {
      fontWeight: 500
    },
    subtitle1: {
      margin: '20px 0px',
    }
  },
});

const webStyle = {
  mainWrapper: {
    display: 'flex', 
    fontFamily: 'Roboto-Medium',
    flexDirection: 'column', 
    alignItems: 'center',
    paddingBottom: '30px',
    background: '#fff',
  },
  inputStyle: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  buttonStyle: { 
    width: '100%',
    height: '45px',  
    marginTop: '20px',
    marginBottom: '20px',
    border: 'none',
    backgroundColor: 'rgb(98, 0, 238)', 
  },
  boxStyle: {
    display: 'flex', 
    alignItems: 'center',
    padding: '5px',
    justifyContent: 'center'
},
};

// Customizable Area End
