import * as React from "react";
// Customizable Area Start
import { StyleSheet, View } from "react-native";
import { ViewProps } from "./StripePayments.web";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Input, Button, Typography } from "@builder/component-library";

// Customizable Area End

const StripePaymentsView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  stripePromise,
  stripeClientSecret,
  errorString,
  setOrderNumber,
  orderNumber,
  submitOrderNumber,
  actionResult,
  stripeInitialised,
  isInStripeCallback,
  onHandleSubmit,
  submitOrderNumberButtonViewProps,
  submitPaymentButtonViewProps,
  loadingViewProps,
  orderIdViewProps,
  stripeMessageViewProps,
  // Customizable Area End
}) => {
  const Render: React.FC<ViewProps> = ({
    testID,
    errorString,
    setOrderNumber,
    orderNumber,
    actionResult,
    stripeInitialised,
    isInStripeCallback,
    onHandleSubmit,
    submitOrderNumberButtonViewProps,
    submitPaymentButtonViewProps,
    orderIdViewProps,
    stripeMessageViewProps,
  }) => {
    // Customizable Area Start
    const stripe = useStripe();
    const stripeElements = useElements();

    if (errorString) {
      return (
        <View testID="errorText" style={webStyle.mainWrapper}>
          <Typography>{stripeMessageViewProps.errorValue}</Typography>
          <Typography>{errorString}</Typography>
        </View>
      );
    }
    if (actionResult) {
      return (
        <View data-testid={testID} style={webStyle.mainWrapper}>
          <Typography>{stripeMessageViewProps.successValue}</Typography>
          <Typography>Payment Status Message</Typography>
          <Typography>{actionResult}</Typography>
        </View>
      );
    }
    if (stripeInitialised) {
      return (
        <View style={webStyle.mainWrapper}>
          <View style={webStyle.mainWrapper}>
            <PaymentElement />
            <Button
              style={webStyle.submitButton}
              onPress={() => onHandleSubmit(stripe, stripeElements)}
              testID="submit-payment"
              text={submitPaymentButtonViewProps.value}
            />
          </View>
        </View>
      );
    }
    if (!isInStripeCallback) {
      return (
        <View style={webStyle.mainWrapper}>
          <View style={webStyle.mainWrapper}>
            <View style={webStyle.horizontalWrapper}>
              <View style={webStyle.flexWrapper}>
                <Input
                  label="Order number"
                  onChangeText={(val) => {
                    setOrderNumber(parseInt(val, 10));
                  }}
                  testID="order-number-input"
                  value={orderNumber?.toString()}
                />
              </View>
            </View>
            <Button
              style={webStyle.submitButton}
              onPress={() => {
                submitOrderNumber();
              }}
              testID="submit-order-number"
              text={submitOrderNumberButtonViewProps.value}
            />
          </View>
        </View>
      );
    }
    // Customizable Area End
    // Customizable Area Start
    return (
      <View style={webStyle.mainWrapper}>
        <Typography>{loadingViewProps.value}</Typography>
      </View>
    );
    // Customizable Area End
  };

  const viewProps: ViewProps = {
    testID: testID,
    errorString,
    stripePromise: stripePromise,
    stripeClientSecret: stripeClientSecret,
    setOrderNumber: setOrderNumber,
    orderNumber: orderNumber,
    submitOrderNumber: submitOrderNumber,
    actionResult: actionResult,
    stripeInitialised: stripeInitialised,
    isInStripeCallback: isInStripeCallback,
    onHandleSubmit: onHandleSubmit,
    submitOrderNumberButtonViewProps,
    submitPaymentButtonViewProps,
    loadingViewProps,
    orderIdViewProps,
    stripeMessageViewProps,
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: stripeClientSecret }}
      key={stripeClientSecret}
    >
      <Render {...viewProps} />
    </Elements>
  );
};

const webStyle = StyleSheet.create({
  // Customizable Area Start
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "32px",
    paddingRight: "32px",
    backgroundColor: "#fff",
  },
  flexWrapper: {
    flex: 1,
  },
  horizontalWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#6200EE",
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#FF0000",
  },
  // Customizable Area End
});

export default StripePaymentsView;
