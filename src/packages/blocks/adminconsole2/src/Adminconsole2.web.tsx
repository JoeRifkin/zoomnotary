import React from "react";

import { Input, Button, Typography } from '@builder/component-library';

// Customizable Area Start

import { View, StyleSheet } from "react-native";

import { imgVisbility, imgVisbilityOff } from "./assets";

// Customizable Area End

import Adminconsole2Controller, {
  Props,
  configJSON,
} from "./Adminconsole2Controller";

export default class Adminconsole2 extends Adminconsole2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <View style={{ display: "flex", alignItems: "center" }}>
        <View style={styles.mainWrapper}>
          <Typography style={styles.titleText}>{configJSON.labelTitleText}</Typography>
          <Typography style={styles.bodyText}>{configJSON.labelBodyText}</Typography>
          <View style={styles.inputStyle}>
            <Input
              data-test-id="txtInput"
              placeholder={configJSON.txtInputPlaceholder}
              label={`This is the received value: ${this.state.txtSavedValue}`}
              {...this.txtInputProps}
              rightIcon={
                <Button
                  data-test-id="btnTogglePassword"
                  aria-label="toggle password visibility"
                  {...this.btnShowHideProps}
                  style={{ backgroundColor: "" }}
                  icon={this.state.enableField ? (
                    <img src={imgVisbility} />
                  ) : (
                    <img src={imgVisbilityOff} />
                  )}
                />
              }
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              data-test-id="btnAddExample"
              gradientColors={[styles.buttonStyle.backgroundColor, styles.buttonStyle.backgroundColor]}
              onPress={() => this.doButtonPressed()}
              text={configJSON.btnExampleTitle} />
          </View>
        </View>
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

const styles = StyleSheet.create({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    backgroundColor: "#ffff",
    width: "50%",
    fontFamily: "Roboto, sans-serif"
  },
  titleText: {
    fontSize: 30,
    paddingVertical: 10,
    fontWeight: "600",


  },
  bodyText: {
    fontSize: 20,
    paddingVertical: 15,
    fontWeight: "400",
  },
  inputStyle: {
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    backgroundColor: "rgb(98, 0, 238)",
  },
});


// Customizable Area End
