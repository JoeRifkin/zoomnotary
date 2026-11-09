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

import { ViewProps, configJSON } from "./OrderManagement";

const OrderManagementView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  orders,
  loading,
  openCreateModal,
  isVisibleCreateModal,
  catalogueId,
  setCatalogueId,
  catalogueVariantId,
  setCatalogueVariantId,
  quantity,
  setQuantity,
  onSubmitCreateOrder,
  navigateToOrderDetail,
  openAddItemModalHandler,
  resetCreateOrderModal,
  selectedOrderId,
  // Customizable Area End
}) => {
  // Customizable Area Start
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
          <Box style={webStyle.headerContainer}>
            <Typography>{configJSON.orderManagementLabel}</Typography>
            <Button
              data-testid="createNewOrderBtn"
              onClick={openCreateModal}
              color="primary"
              variant="contained"
            >
              {configJSON.createNewOrderText}
            </Button>
          </Box>
          {orders.length === 0 || loading ? (
            <Typography data-testid="loading" style={webStyle.loadingText}>
              {loading ? configJSON.loadingText : configJSON.emptyOrderListMsg}
            </Typography>
          ) : (
            orders.map((order) => {
              return (
                <Box style={webStyle.orderWrapper} key={order.id}>
                  <Box style={webStyle.orderIdWrapper}>
                    <Typography
                      style={webStyle.orderNumber}
                      onClick={() => navigateToOrderDetail(order.id)}
                      data-testid="orderNumber"
                    >
                      {configJSON.orderNumberText}:{" "}
                      {order.attributes.order_number}
                    </Typography>
                    <Typography style={webStyle.orderStatus}>
                      {order.attributes.status
                        .split("_")
                        .join(" ")
                        .toUpperCase()}
                    </Typography>
                  </Box>
                  {order.attributes.order_items?.map((orderItem) => {
                    return (
                      <Box style={webStyle.orderItemWrapper} key={orderItem.id}>
                        <Box style={webStyle.orderItemInnerBox}>
                          <Typography>
                            {orderItem.attributes.catalogue.attributes.name}
                          </Typography>
                          <Typography>
                            {
                              orderItem.attributes.catalogue.attributes
                                .description
                            }
                          </Typography>
                          <Typography>
                            {
                              orderItem.attributes.catalogue.attributes.category
                                .name
                            }
                          </Typography>
                        </Box>
                        <Box style={webStyle.orderItemInnerBox}>
                          <Typography style={webStyle.orderItemPrice}>
                            ${orderItem.attributes.total_price}
                          </Typography>
                          <Typography>
                            {configJSON.quantityText}:{" "}
                            {orderItem.attributes.quantity}
                          </Typography>
                          <Typography>
                            {configJSON.orderedOnText}:{" "}
                            {new Date(
                              orderItem.attributes.updated_at
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                  <Box style={webStyle.btnGroup}>
                    <Button
                      style={webStyle.addNewOrderItemStyle}
                      size="small"
                      onClick={() =>
                        openAddItemModalHandler(order.attributes.id)
                      }
                      color="primary"
                      variant="contained"
                      data-testid="addOrderItem"
                    >
                      {configJSON.addNewOrderItem}
                    </Button>
                    <Button
                      style={webStyle.addNewOrderItemStyle}
                      size="small"
                      onClick={() => navigateToOrderDetail(order.id)}
                      color="primary"
                      variant="contained"
                      data-testid="viewDetailBtn"
                    >
                      {configJSON.viewDetailBtn}
                    </Button>
                  </Box>
                </Box>
              );
            })
          )}

          <Dialog
            maxWidth={"sm"}
            open={isVisibleCreateModal}
            onClose={resetCreateOrderModal}
          >
            <DialogContent>
              <Typography style={webStyle.modalTitle}>
                {selectedOrderId
                  ? configJSON.createNewOrderItemText
                  : configJSON.createNewOrderTitle}
              </Typography>
              <TextField
                value={catalogueId}
                onChange={(event) => setCatalogueId(event.target.value)}
                placeholder={configJSON.catalogueIdPlaceholder}
                fullWidth
                variant="outlined"
                style={webStyle.textFieldStyle}
                data-testid="catalogueId"
              />
              <TextField
                value={catalogueVariantId}
                onChange={(event) => setCatalogueVariantId(event.target.value)}
                placeholder={configJSON.catalogueVariantIdPlaceholder}
                fullWidth
                variant="outlined"
                style={webStyle.textFieldStyle}
                data-testid="catalogueVariantId"
              />
              <TextField
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder={configJSON.quantityPlaceholder}
                fullWidth
                variant="outlined"
                style={webStyle.textFieldStyle}
                data-testid="quantity"
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="outlined"
                onClick={resetCreateOrderModal}
              >
                {configJSON.cancelBtnLabel}
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={onSubmitCreateOrder}
              >
                {configJSON.createBtnLabel}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
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
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 10,
    alignItems: "center",
  },
  orderWrapper: {
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 20,
    marginTop: 20,
  },
  orderIdWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  orderItemWrapper: {
    display: "flex",
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  orderItemPrice: {
    fontWeight: 700,
  },
  orderItemInnerBox: {
    flex: 1,
  },
  orderStatus: {
    fontWeight: 700,
  },
  addNewOrderItemStyle: {
    marginTop: 10,
    alignSelf: "flex-end",
    marginLeft: 10,
    textTransform: "capitalize" as "capitalize",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  orderNumber: {
    cursor: "pointer",
    fontWeight: 700,
  },
  loadingText: {
    textAlign: "center" as "center",
    marginTop: 20,
  },
  modalTitle: {
    marginBottom: 10,
  },
  textFieldStyle: {
    marginBottom: 15,
  },
};
// Customizable Area End

export default OrderManagementView;
