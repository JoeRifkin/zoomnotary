import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { GenericHeader } from "../../../components/src/GenericHeader";
import {imgFailCross, imgCheckbox, imgRadioButton, imgBackArrow, upArrowImg, downArrowBlackImg, imgGooglePay, imgCardPay, imgAmazonPay, imgApplePay, imgPayPal } from "./assets";
import { GenericButton } from "../../../components/src/GenericButton";
import { Dropdown } from 'react-native-element-dropdown';
import { WebView } from 'react-native-webview';
import { GenericSucessView } from "../../../components/src/GenericSucessView";
const currencyList = [{ value: "£ - British pound sterling (GBP)", label: "£ - British pound sterling (GBP)" }]
import GooglePayIntegration from "../../../blocks/googlepayintegration/src/GooglePayIntegration";
// Customizable Area End

import QuotePaymentController, {
  Props,
  configJSON,
} from "./QuotePaymentController";

export default class QuotePayment extends QuotePaymentController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderRightIcon = (isDropdownOpen: boolean) => (
    <View>
      <Image style={styles.arrowUpDownView} source={isDropdownOpen ? upArrowImg : downArrowBlackImg} />
    </View>
  );

  renderChooseYourCurrencyField = () => {
    return (
      <View>
        <Text style={styles.chooseCurrencyTxt}>{configJSON.chooseYourCurrency}</Text>
        <Dropdown
          maxHeight={300}
          style={[
            styles.bgMobileInput,
            (this.showErrorForDropdown()) ? styles.errorOfField : styles.textFieldBg
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          labelField="label"
          valueField="value"
          value={(this.state.selectedCurrency) ? this.state.selectedCurrency : ''}
          placeholder={configJSON.chooseYourCurrency}
          data={currencyList}
          testID="serviceListId"
          onChange={(item: any) => this.txtInputCurrencyPrpos(item)}
          onFocus={this.openServicesDropdown}
          onBlur={this.closeDropDownOfServices}
          renderRightIcon={() => this.renderRightIcon(this.state.isCurrencyDropdownOpen)}
        />
      </View>
    )
  }

  renderProccedBtn = () => {
    return (
      <View>
        <GenericButton
          testID={"btnProceed"}
          btnProps={{ ...this.btnProceedProps }}
          btnDisable={this.getProceedBtnEnabled()}
          btnTextLabel={'Proceed'}
          filledBtn={true}
        />
      </View>
    )
  }

  renderApplePayView = () => {
    return (
      <View style={styles.googlePayView}>
        <View style={styles.textAndImg}>
          <View style={styles.radioAndTxt}>
            <View style={styles.checkBox} />
            <Text style={styles.googlePayTxt}>Apple Pay</Text>
          </View>
          <Image style={styles.imgOfApplePay} source={imgApplePay}/>
        </View>
        <Text style={styles.googlePayDesTxt}>Coming Soon</Text>
      </View>
    )
  }

  renderAmazonPayView = () => {
    return (
      <View style={styles.googlePayView}>
        <View style={styles.textAndImg}>
          <View style={styles.radioAndTxt}>
            <View style={styles.checkBox} />
            <Text style={styles.googlePayTxt}>Amazon Pay</Text>
          </View>
          <Image style={styles.imgOfAmazonPay} source={imgAmazonPay}/>
        </View>
        <Text style={styles.googlePayDesTxt}>Coming Soon</Text>
      </View>
    )
  }

  renderPayPalView = () => { 
    return (
      <View style={styles.googlePayView}>
        <View style={styles.textAndImg}>
          <View style={styles.radioAndTxt}>
            <View style={styles.checkBox} />
            <Text style={styles.googlePayTxt}>Paypal</Text>
          </View>
          <Image style={styles.imgOfPayPal} source={imgPayPal}/>
        </View>
        <Text style={styles.googlePayDesTxt}>Coming Soon</Text>
      </View>
    )
  }

  renderCreditDebitCardView = () => {
    return (
      <TouchableOpacity style={[styles.cardPayView, this.isPaymentTypeCard() ? styles.selectedColor : styles.unableSelectedColor]} onPress={() => this.selectPaymentType('card')}>
        <View style={[styles.textAndImg]}>
          <View style={styles.radioAndTxt}>
            {this.isPaymentTypeCard() ? <Image style={styles.radioBtnImg} source={imgRadioButton} /> :
            <View style={styles.checkBoxEnable} /> }
            <Text style={[styles.cardTxt, this.isPaymentTypeCard() ? styles.selectCardtxt : styles.unableSelectCardtxt]}>Credit/Debit card</Text>
          </View>
          <Image style={styles.imgOfCardPay} source={imgCardPay}/>
        </View>
      </TouchableOpacity>
    )
  }

  renderContent = () => {
    let content;
    if (this.state.isSuccessPayment || this.state.isFailedPayment) {
      content = (
        <View>
          <GenericHeader
            testID={"btnbackArrowOnSucess"}
            isOtherMsg={true}
          />
          {this.state.isSuccessPayment ? (
            <GenericSucessView
              imgCheckbox={imgCheckbox}
              passchanged={configJSON.successPaymentTitle}
              chnagedDetail={`${configJSON.successPaymentDes1} ${this.state.requestId} ${configJSON.successPaymentDes2}`}
              login={'Check status'}
              btnLoginProps={{ ...this.btnRedirectTORequestDetail }}
              testID={"sucessNotaryID"}
            />
          ) : (
            <GenericSucessView
              imgCheckbox={imgFailCross}
              passchanged={configJSON.failPaymentTitle}
              chnagedDetail={`${configJSON.failPaymentDes1} ${this.state.requestId} ${configJSON.failPaymentDes2}`}
              login={'Retry'}
              btnLoginProps={{ ...this.btnRedirectTORequestDetail }}
              testID={"failNotaryID"}
            />
          )}
        </View>
      );
    } else if (this.state.isShowWebView && this.state.stripeCheckoutUrl !== '') {
      content = (
        <View>
          <GenericHeader
            imgBackArrow={imgBackArrow}
            btnGoBack={{ ...this.btnGoBackOnRequestDetail }}
            testID={"btnbackArrow"}
            isOtherMsg={true}
          />
          <WebView
            source={{ uri: this.state.stripeCheckoutUrl }}
            onShouldStartLoadWithRequest={this.handleShouldStartLoadWithRequest}
            javaScriptEnabled={true}
            showsVerticalScrollIndicator={true}
            style={{ height: Dimensions.get('screen').height + 100, width: Dimensions.get('screen').width}}
            domStorageEnabled={true}
            renderLoading={() => (
              <View style={styles.loaderStyles}>
                <ActivityIndicator size="large" color="#012275" />
              </View>
            )}
            startInLoadingState={true}  
            mixedContentMode="always"
            userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          />
        </View>
      );
    } else {
      content = ( 
        <View>
          <GenericHeader
            imgBackArrow={imgBackArrow}
            btnGoBack={{ ...this.btnGoBack }}
            testID={"btnbackArrow"}
            isOtherMsg={true}
          />
          <View style={styles.fieldView}>
         
            {this.renderChooseYourCurrencyField()}
            {this.renderCreditDebitCardView()}
            {this.renderPayPalView()}
            {this.renderAmazonPayView()}
            {this.renderApplePayView()}
            <GooglePayIntegration id="GooglePayIntegration" navigation={this.props}
              onGPaySelect={this.onGPaySelect}
              proceedWithGPay={this.state.proceedWithGPay}
              paymentType={this.state.paymentType}
              countrycode = "GB"
              currencycode= "GBP"
              amount = {this.state.amount}
              quoteId = {this.state.quoteId}
              handleGpaySuccessFailure = {this.handleGpaySuccessFailure}
            />
            {this.renderProccedBtn()}
          </View>
        </View>
      );
    }
    return content;
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        ref={this.scrollViewRef}
      >
      
          {/* Customizable Area Start */}
        
          {this.renderContent()}
          
          {/* Customizable Area End */}
      
      </ScrollView>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  contentContainer: {
    paddingBottom: 30,
  },

  fieldView: {
    padding: 24
  },
  chooseCurrencyTxt: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14.52
  },
  bgMobileInput: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10,
    includeFontPadding: true,
    height: 44,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10
  },
  errorOfField: {
    borderColor: '#DC2626',
    backgroundColor: '#fff'
  },
  textFieldBg: {
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
  },
  placeholderStyle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#64748B'
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.94,
    fontStyle: 'normal',
    color: '#000000'
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  arrowUpDownView: {
    marginRight: 10
  },
  googlePayView: {
    borderColor: '#CCD3E3',
    borderWidth: 1,
    backgroundColor:'#F8FAFC',
    height: 88,
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 8,
    marginTop: 10,
    padding: 15
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
  imgOfApplePay: {
    width: 38,
    height: 19
  },
  imgOfAmazonPay: {
    width: 41,
    height: 24
  },
  imgOfPayPal: {
    width: 32,
    height: 32
  },
  imgOfCardPay: {
    width: 80,
    height: 42
  },
  googlePayTxt: {
    color: '#64748B',
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
  checkBox: {
    borderColor: '#CBD5E1',
    height: 20,
    width: 20,
    borderRadius: 16,
    borderWidth: 1.5
  },
  radioAndTxt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardPayView: {
    height: 88,
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 8,
    marginTop: 20,
    padding: 15
  },
  checkBoxEnable: {
    borderColor: '#000',
    height: 20,
    width: 20,
    borderRadius: 16,
    borderWidth: 1.5
  },
  cardTxt: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
    marginLeft: 10
  },
  unableSelectCardtxt: {
    color: '#000',
  },
  selectCardtxt: {
    color: '#FFFFFF',
  },
  radioBtnImg: {
    height: 20,
    width: 20
  },
  unableSelectedColor: {
    borderColor: '#CCD3E3',
    borderWidth: 1,
    backgroundColor:'#fff',
  },
  selectedColor: {
    borderColor: '#012275',
    borderWidth: 1,
    backgroundColor:'#012275',
  },
  loaderStyles: {
    justifyContent: 'center',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44, 44, 46, 0.6)',
    zIndex: 9999,
    opacity: 1
  },
});
// Customizable Area End
