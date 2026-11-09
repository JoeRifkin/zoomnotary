import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator
} from "react-native";
import { imgGooglePay, imgRadioButton } from "./assets";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import GooglePayIntegrationController, {
  Props,
  configJSON,
} from "./GooglePayIntegrationController";

export default class GooglePayIntegration extends GooglePayIntegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <>
        {
          Platform.OS === "android" &&
          <>
            <TouchableOpacity style={[styles.googlePayView, this.props.paymentType === "GPay" ? styles.selectedColor : styles.unableSelectedColor]}
              onPress={this.onPressGpay}>
              <View style={styles.textAndImg}>
                <View style={styles.radioAndTxt}>
                  {this.props.paymentType === "GPay" ? <Image style={styles.radioBtnImg} source={imgRadioButton} /> :
                    <View style={styles.checkBoxEnable} />}
                  <Text style={[styles.googlePayTxt, this.props.paymentType === "GPay" && { color: "#fff" }]}>Google Pay</Text>
                </View>
                <Image style={styles.imgOfGooglePay} source={imgGooglePay} />
              </View>
            </TouchableOpacity>
            {
              this.state.loader &&
              <View style={styles.loaderStyles}>
                <ActivityIndicator size="large" color="#012275" />
              </View>
            }
          </>
        }
      </>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  googlePayView: {
    borderColor: '#CCD3E3',
    borderWidth: 1,
    backgroundColor: '#F8FAFC',
    height: 88,
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 8,
    marginTop: 10,
    padding: 15
  },
  unableSelectedColor: {
    borderColor: '#CCD3E3',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  selectedColor: {
    borderColor: '#012275',
    borderWidth: 1,
    backgroundColor: '#012275',
  },
  radioBtnImg: {
    height: 20,
    width: 20
  },
  checkBoxEnable: {
    borderColor: '#000',
    height: 20,
    width: 20,
    borderRadius: 16,
    borderWidth: 1.5
  },
  marBot30: {
    marginBottom: 30,
  },
  textAndImg: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  imgOfGooglePay: {
    width: 50,
    height: 24
  },
  googlePayTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginLeft: 10
  },
  googlePayDesTxt: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.4,
    marginTop: 8
  },
  radioAndTxt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkBox: {
    borderColor: '#CBD5E1',
    height: 20,
    width: 20,
    borderRadius: 16,
    borderWidth: 1.5
  },
  loaderStyles: {
    justifyContent: 'center',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44, 44, 46, 0.6)',
    zIndex: 9999,
    opacity: 1
  }

});
// Customizable Area End
