import * as React from "react";
// Customizable Area Start
// Customizable Area End
import { ViewProps } from "./StripePaymentsComponent";
import { StripeProvider } from "@stripe/stripe-react-native";

export const config = require("./config");

const StripePaymentsComponentView: React.FC<ViewProps> = (
  {
    // Customizable Area Start
    // Customizable Area End
  }
) => {
  // Customizable Area Start
  // Customizable Area End
  return (
    <>
      {/* Customizable Area Start */}
      <StripeProvider
        publishableKey={config.stripePublishableKey}
        merchantIdentifier={config.stripeMerchantIdentifier} // required for Apple Pay
        urlScheme={config.urlScheme}
      >
        <></>
      </StripeProvider>
      {/* Customizable Area End */}
    </>
  );
};

export default StripePaymentsComponentView;
