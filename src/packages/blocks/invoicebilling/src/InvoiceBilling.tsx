import React from "react";
// Customizable Area Start
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { imgRequestDownload } from "./assets";
// Customizable Area End

import InvoiceBillingController, {
  Props,
  configJSON,
} from "./InvoiceBillingController";

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
      <>
        <TouchableOpacity
          style={styles.downloadInvoiceBtn}
          onPress={() => this.DownloadFile(this.state.invoicePdf)}
          disabled={this.state.loading}
        >
          {this.state.loading ?
            <ActivityIndicator size="small" color="#fff" />
            :
            <>
              <Text style={styles.downloadInvoiceBtnTxt}>Order Recipt</Text>
              <Image source={imgRequestDownload} style={styles.downloadImg} />
            </>
          }
        </TouchableOpacity>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  downloadInvoiceBtn: {
    width: '100%',
    height: 52,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#012275',
    flexDirection: 'row'
  },
  downloadInvoiceBtnTxt: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  downloadImg: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginLeft: 5
  },
  loaderStyles: {
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    opacity: 1,
    alignItems: 'center'
  },
});


// Customizable Area End
