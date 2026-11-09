import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import {GenericCustomModel} from "../../../components/src/GenericCustomModel";
import WebView from "react-native-webview";
import { warningImg } from "./assets";

// Customizable Area End

import PaymentsController, { Props } from "./PaymentsController";

export default class Payments extends PaymentsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItem = (title: string, value: string) => {
    return <View style={styles.details}>
      <Text style={styles.detailsTitle}>{title} :</Text>
      <Text style={styles.detailsValue}>{value}</Text>
    </View>
  }

  renderDisconnectModal = () => {
    return <GenericCustomModel visible={this.state.showDisconnectModal} width={Dimensions.get('screen').width - 50}>
      <View style={styles.center}>
        <Image source={warningImg} style={styles.warningImg} />
      </View>
      <Text style={styles.modalTitle}>Are you sure you want to disconnect?</Text>
      <View>
        <CustomButton
          testID='CancelBtn'
          title={'Cancel'}
          onPress={this.toggleModal}
        />
        <TouchableOpacity
          testID="onDisconnect"
          onPress={this.onDisconnect}>
          <Text style={styles.discntBtn}>Yes, Disconnect</Text>
        </TouchableOpacity>
      </View>
    </GenericCustomModel>
  }
  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <View style={styles.flex}>
        <CustomHeader
          title='Payment'
          showBackIcon
          goBack={this.goBack}
          testID="customHeader"
        />
        {this.state.showStripePage ?
          <WebView
            source={{ uri: this.state.stripeUrl }}
            onShouldStartLoadWithRequest={this.handleShouldStartLoadWithRequest}
            startInLoadingState={true}
            javaScriptEnabled={true}
            style={{ height: Dimensions.get('screen').height + 100, width: Dimensions.get('screen').width }}
          /> :

          <View style={styles.container}>
            <View style={styles.flex}>
              <Text style={styles.title}>Payment</Text>
              <Text style={styles.desc}>Accept payments in your renotary account with funds going directly into your bank account with stripe payment method</Text>
              {this.state.isConnected ?
                <>
                  {this.renderItem('Currency', this.state.userDetails.currency)}
                  {this.renderItem('Stripe account name ', this.state.userDetails.account_name)}
                  {this.renderItem('Stripe Email', this.state.userDetails.account_email)}
                </> : null
              }
            </View>

            <View >
              <CustomButton
                testID='AccountBtn'
                title={this.state.isConnected ? "Disconnect Account" : 'Connect Account'}
                onPress={this.state.isConnected ? this.toggleModal : this.onConnect}
                containerStyle={this.state.isConnected ? styles.dBtn : styles.cBtn}
              />
            </View>


          </View>
        }
        {this.renderDisconnectModal()}
        <CustomLoader loader={this.state.loading} />
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  warningImg:{
    height:48,
    width:48,
    resizeMode:'contain',
    marginBottom:10
  },
  discntBtn: {
    color: '#012275',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36,
    textAlign: 'center',
    borderBottomColor:"#012275",
    borderBottomWidth:1,
    alignSelf:'center',
    marginTop:15
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28.8,
    textAlign: 'center',
    color:'#334155',
    paddingHorizontal:20
  },
  details: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: '#011342',
    flex: 1
  },

  detailsValue: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000',
    flex: 1,
    marginLeft: 5
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: 'black',
    marginTop: 20,
    marginBottom: 10
  },
  desc: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    color: '#334155'
  },
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    flex: 1,
  },
  dBtn: {
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#DC2626"
  },

  cBtn: {
    borderRadius: 10,
    marginBottom: 20,
  }
});
// Customizable Area End