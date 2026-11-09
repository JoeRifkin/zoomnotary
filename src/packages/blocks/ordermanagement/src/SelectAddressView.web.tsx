import * as React from "react";
// Customizable Area Start
import {
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
// Customizable Area End

import { configJSON, ViewProps } from "./SelectAddress";

const SelectAddressView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  addresses,
  openCreateAddress,
  isVisibleCreateAddress,
  resetCreateModal,
  setTextFields,
  textFields,
  addAddressHandler,
  addressId,
  orderId,
  selectAddress,
  loading,
  // Customizable Area End
}) => {
  // Customizable Area Start
  if (!orderId || loading) {
    return (
      <Typography data-testid="loading" style={webStyle.loadingText}>
        {loading ? configJSON.loadingText : configJSON.addressNavigationAlert}
      </Typography>
    );
  }
  // Customizable Area End

  return (
    // Customizable Area Start
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container
          style={webStyle.mainWrapper}
          data-testid={testID}
          maxWidth={"sm"}
        >
          <Box>
            <Box style={webStyle.topBtnContainer}>
              <Button
                color="primary"
                variant="contained"
                onClick={openCreateAddress}
              >
                {configJSON.createNewAddressText}
              </Button>
            </Box>
            <Box>
              {addresses.map((address) => {
                return (
                  <Box
                    style={
                      addressId === address.id
                        ? webStyle.selectedAddressWrapper
                        : webStyle.addressWrapper
                    }
                    key={address.id}
                  >
                    <Typography data-testid={"addressName-" + address.id}>
                      {configJSON.addressNameLabel} : {address.attributes.name}
                    </Typography>
                    <Typography>
                      {configJSON.addressTypeLabel} :{" "}
                      {address.attributes.address_type}
                    </Typography>
                    <Typography>
                      {configJSON.flatNoLabel} :{address.attributes.flat_no}
                    </Typography>
                    <Typography>
                      {configJSON.landmarkLabel} : {address.attributes.landmark}
                    </Typography>
                    <Typography>
                      {configJSON.addressLabel} : {address.attributes.address}
                    </Typography>
                    <Typography>
                      {configJSON.addressLine2Label} :{" "}
                      {address.attributes.address_line_2}
                    </Typography>
                    <Typography>
                      {configJSON.cityLabel} : {address.attributes.city}
                    </Typography>
                    <Typography>
                      {configJSON.stateLabel} : {address.attributes.state}
                    </Typography>
                    <Typography>
                      {configJSON.countryLabel} : {address.attributes.country}
                    </Typography>
                    <Typography>
                      {configJSON.zipcodeLabel} : {address.attributes.zip_code}
                    </Typography>

                    {addressId !== address.id && (
                      <Button
                        color="primary"
                        onClick={() => selectAddress(address)}
                        fullWidth
                        data-testid={"selectAddressBtn-" + address.id}
                      >
                        {configJSON.selectThisAddressBtn}
                      </Button>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
        <Dialog
          data-testid="ConfirmCancelModal"
          maxWidth={"sm"}
          open={isVisibleCreateAddress}
          onClose={resetCreateModal}
        >
          <DialogContent>
            <Typography style={webStyle.modalTitle}>
              {configJSON.createNewAddressText}
            </Typography>
            {textFields.map((textField, index) => {
              return (
                <TextField
                  key={index}
                  value={textField.value}
                  onChange={(event) =>
                    setTextFields({
                      type: textField.name,
                      payload: event.target.value,
                    })
                  }
                  placeholder={textField.placeholder}
                  fullWidth
                  variant="outlined"
                  style={webStyle.textFieldStyle}
                  data-testid={textField.testId}
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={resetCreateModal}
            >
              {configJSON.cancelBtnLabel}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={addAddressHandler}
            >
              {configJSON.createBtnLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
    // Customizable Area End
  );
};

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
      contrastText: "#fff",
    },
  },
});

const webStyle = {
  mainWrapper: {
    paddingBottom: 32,
    background: "#fff",
  },
  loadingText: {
    textAlign: "center" as "center",
    marginTop: 20,
  },
  topBtnContainer: {
    display: "flex",
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: "flex-end",
  },
  selectedAddressWrapper: {
    border: "1px solid #6200ee",
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  addressWrapper: {
    border: "1px solid #ccc",
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  textFieldStyle: {
    marginBottom: 15,
  },
  modalTitle: {
    marginBottom: 10,
  },
};
// Customizable Area End

export default SelectAddressView;
