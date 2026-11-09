import * as React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, Typography } from "@builder/component-library";
import { StripePaymentsComponent } from "./StripePaymentsComponent";

// Customizable Area Start
// Customizable Area End

export interface ViewProps {
  navigation: any;
  id: string;
  // Customizable Area Start
  setOrderId: (orderID: string) => void;
  orderId: string;
  setPresentStripPayment: (show: boolean) => void;
  presentStripePayment: boolean;
  setError: (error: string) => void;
  error: string;
  successMessage: string;
  showSuccessMessage: () => void;
  // Customizable Area End
}

export const StripePaymentsView: React.FC<ViewProps> = ({
  id,
  navigation,
  // Customizable Area Start
  setOrderId,
  orderId,
  setPresentStripPayment,
  presentStripePayment,
  setError,
  error,
  successMessage,
  showSuccessMessage,
  // Customizable Area End
}) => {
  return (
    //Customizable Area Start
    <>
      <Input
        placeholder="Order Id"
        onChangeText={setOrderId}
        style={styles.input}
        // value={orderId}
      />
      <Button
        style={styles.button}
        onPress={() => setPresentStripPayment(true)}
        text="Show Payment Sheet"
      />
      {presentStripePayment && (
        <StripePaymentsComponent
          id={id}
          navigation={navigation}
          order_id={orderId}
          onError={setError}
          onSuccess={showSuccessMessage}
        />
      )}
      {error ? (
        <Typography testID="errorText" style={styles.errorText}>
          {error}
        </Typography>
      ) : null}
      {successMessage ? (
        <Typography testID="successText" style={styles.successText}>
          {successMessage}
        </Typography>
      ) : null}
    </>
    // Customizable Area End
  );
};

const styles = StyleSheet.create({
  // Customizable Area Start
  button: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    color: "#6200EE",
    fontWeight: "bold",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
  },
  successText: {
    color: "green",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  // Customizable Area End
});
