import React, { useState } from "react";

import { StripePaymentsView, ViewProps } from "./StripePaymentsView";

// Customizable Area Start
// Customizable Area End

export interface StripeProps {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

const StripePayments: React.FC<StripeProps> = (props) => {
  // Customizable Area Start
  const [orderId, setOrderId] = useState("");
  const [presentStripePayment, setPresentStripPayment] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showSuccessMessage = () => {
    setPresentStripPayment(false);
    setOrderId("");
    setSuccessMessage("Success");
  };
  // Customizable Area End

  const viewProps: ViewProps = {
    navigation: props.navigation,
    id: props.id,
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
  };

  return <StripePaymentsView {...viewProps} />;
};

export default StripePayments;
