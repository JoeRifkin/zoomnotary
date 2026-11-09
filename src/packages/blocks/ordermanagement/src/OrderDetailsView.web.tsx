import * as React from "react";
// Customizable Area Start
import {
  Container,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
// Customizable Area End

import { configJSON, ViewProps } from "./OrderDetails";

const OrderDetailsView: React.FC<ViewProps> = ({
  // Customizable Area Start
  order,
  deleteOrderItem,
  couponCode,
  setCouponCode,
  applyCouponCode,
  navigateToAddress,
  loading,
  handledeleteOrder,
  handleCancelOrder,
  // Customizable Area End
}) => {
  // Customizable Area Start
  const renderAddress = () => {
    const dAddresses =
      order?.attributes.delivery_addresses &&
      order.attributes.delivery_addresses.length > 0
        ? order.attributes.delivery_addresses[0]
        : null;
    if (dAddresses) {
      return (
        <Box>
          <Typography style={webStyle.addressTitle}>
            {configJSON.addressLabel}
          </Typography>
          {dAddresses.name ? <Typography>{dAddresses.name}</Typography> : null}
          {dAddresses.flat_no ? (
            <Typography>{dAddresses.flat_no}</Typography>
          ) : null}
          {dAddresses.address ? (
            <Typography>{dAddresses.address}</Typography>
          ) : null}
          {dAddresses.address_line_2 ? (
            <Typography>{dAddresses.address_line_2}</Typography>
          ) : null}
          {dAddresses.landmark ? (
            <Typography>{dAddresses.landmark}</Typography>
          ) : null}
          {dAddresses.country ? (
            <Typography>{dAddresses.country}</Typography>
          ) : null}
          {dAddresses.zip_code ? (
            <Typography>{dAddresses.zip_code}</Typography>
          ) : null}
          {dAddresses.phone_number ? (
            <Typography>{dAddresses.phone_number}</Typography>
          ) : null}
        </Box>
      );
    }
  };
  // Customizable Area End

  return (
    // Customizable Area Start
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container style={webStyle.mainWrapper}>
          <Grid container spacing={3}>
            {!order || loading ? (
              <Grid item xs={12}>
                <Typography data-testid="loading" style={webStyle.loadingText}>
                  {configJSON.loadingText}
                </Typography>
              </Grid>
            ) : (
              <>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Box style={webStyle.orderCard}>
                    <Box style={webStyle.orderCardTitle}>
                      <Typography
                        data-testid="orderNumber"
                        style={webStyle.orderNumber}
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
                        <Box style={webStyle.orderItem} key={orderItem.id}>
                          <Box style={webStyle.namePriceWrapper}>
                            <Typography style={webStyle.orderItemName}>
                              {orderItem.attributes.catalogue.attributes.name}
                            </Typography>
                            <Typography style={webStyle.orderItemPrice}>
                              ${orderItem.attributes.total_price}
                            </Typography>
                          </Box>
                          <Typography>
                            {configJSON.descriptionText}
                            {
                              orderItem.attributes.catalogue.attributes
                                .description
                            }
                          </Typography>
                          <Typography>
                            {configJSON.categoryText}
                            {
                              orderItem.attributes.catalogue.attributes.category
                                .name
                            }
                          </Typography>

                          <Typography>
                            {configJSON.quantityText}:{" "}
                            {orderItem.attributes.quantity}
                          </Typography>
                          <Typography>
                            {configJSON.orderedOnText}:
                            {new Date(
                              orderItem.attributes.updated_at
                            ).toLocaleDateString()}
                          </Typography>
                          {(orderItem.attributes.status === "in_cart" ||
                            orderItem.attributes.status === "created") && (
                            <Button
                              color="primary"
                              onClick={() =>
                                deleteOrderItem(orderItem.attributes.id)
                              }
                              style={webStyle.deleteBtnStyle}
                              data-testid={
                                "deleteOrderItem-" + orderItem.attributes.id
                              }
                            >
                              {configJSON.deleteItemBtnLabel}
                            </Button>
                          )}
                        </Box>
                      );
                    })}
                  </Box>

                  <Box style={webStyle.orderCard}>
                    {renderAddress()}
                    {order.attributes.status !== "cancelled" && (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          navigateToAddress(
                            order.attributes.delivery_addresses.length > 0
                              ? order.attributes.delivery_addresses[0].id
                              : null,
                            order.attributes.id
                          )
                        }
                        style={webStyle.selectAddressBtn}
                        data-testid={"navigateToAddress-" + order.id}
                      >
                        {order.attributes.delivery_addresses.length > 0
                          ? configJSON.changeAddress
                          : configJSON.selectAddress}
                      </Button>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {order.attributes.status === "in_cart" && (
                    <Box style={webStyle.orderCard}>
                      <Box style={webStyle.couponCodeWrapper}>
                        <TextField
                          value={couponCode}
                          onChange={(event) =>
                            setCouponCode(event.target.value)
                          }
                          style={webStyle.couponCodeInputStyle}
                          placeholder={configJSON.couponCodePlaceholder}
                          fullWidth
                          variant="outlined"
                          data-testid="couponCodeTextField"
                        />
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={applyCouponCode}
                          data-testid="applyCoupon"
                        >
                          {configJSON.applyBtnLabel}
                        </Button>
                      </Box>
                    </Box>
                  )}
                  <Box style={webStyle.orderCard}>
                    <Box style={webStyle.totalTextWrapper}>
                      <Typography style={webStyle.totalTextLabel}>
                        {configJSON.subTotalText}
                      </Typography>
                      <Typography style={webStyle.totalTextPrice}>
                        {configJSON.currencySymbole}{" "}
                        {order.attributes.sub_total}
                      </Typography>
                    </Box>
                    <Box style={webStyle.totalTextWrapper}>
                      <Typography style={webStyle.totalTextLabel}>
                        {configJSON.shippingChargeText}
                      </Typography>
                      <Typography style={webStyle.totalTextPrice}>
                        {configJSON.currencySymbole}{" "}
                        {order.attributes.shipping_total}
                      </Typography>
                    </Box>
                    <Box style={webStyle.totalTextWrapper}>
                      <Typography style={webStyle.totalTextLabel}>
                        {configJSON.totalTaxText}
                      </Typography>
                      <Typography style={webStyle.totalTextPrice}>
                        {configJSON.currencySymbole}{" "}
                        {order.attributes.total_tax}
                      </Typography>
                    </Box>
                    <Box style={webStyle.totalTextWrapper}>
                      <Typography style={webStyle.totalTextLabel}>
                        {configJSON.discountText}
                      </Typography>
                      <Typography style={webStyle.totalTextPrice}>
                        - {configJSON.currencySymbole}{" "}
                        {order.attributes.applied_discount}
                      </Typography>
                    </Box>
                    <Box style={webStyle.grandTotalTextWrapper}>
                      <Typography style={webStyle.totalTextLabel}>
                        {configJSON.totalText}
                      </Typography>
                      <Typography style={webStyle.totalTextPrice}>
                        {configJSON.currencySymbole} {order.attributes.total}
                      </Typography>
                    </Box>
                  </Box>
                  {order.attributes.status === "created" ? (
                    <Button
                      color="primary"
                      onClick={handleCancelOrder}
                      style={webStyle.cancelButton}
                      fullWidth
                    >
                      {configJSON.cancelOrderText}
                    </Button>
                  ) : null}
                  <Button
                    color="primary"
                    onClick={handledeleteOrder}
                    style={webStyle.cancelButton}
                    fullWidth
                  >
                    {configJSON.deleteOrderText}
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
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
  loadingText: {
    textAlign: "center" as "center",
    marginTop: 20,
  },
  orderCard: {
    border: "1px solid #ccc",
    borderRadius: 5,
    marginTop: 25,
    padding: 20,
  },
  orderCardTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  orderNumber: {
    fontWeight: 700,
  },
  orderStatus: {
    fontWeight: 700,
  },
  orderItem: {
    display: "flex",
    flexDirection: "column" as "column",
    padding: 12,
    border: "1px solid #ccc",
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  orderItemName: {
    fontWeight: 700,
    flex: 1,
  },
  orderItemPrice: {
    fontWeight: 700,
  },
  namePriceWrapper: {
    display: "flex",
    width: "100%",
    marginBottom: 5,
  },
  deleteBtnStyle: {
    textTransform: "capitalize" as "capitalize",
    marginTop: 10,
  },
  couponCodeWrapper: {
    display: "flex",
  },
  couponCodeInputStyle: {
    flex: 1,
  },
  totalTextWrapper: {
    display: "flex",
    marginBottom: 5,
  },
  totalTextLabel: {
    flex: 1,
  },
  totalTextPrice: {
    fontWeight: 700,
  },
  grandTotalTextWrapper: {
    borderTop: "1px solid #ccc",
    display: "flex",
    paddingTop: 10,
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 20,
    color: "#ff0000",
    fontWeight: 700,
  },
  addressTitle: {
    fontWeight: 700,
  },
  selectAddressBtn: {
    marginTop: 15,
  },
};
// Customizable Area End

export default OrderDetailsView;
