import React from "react";


// Customizable Area Start

import { View, StyleSheet } from "react-native";

import { imgVisbility, imgVisbilityOff } from "./assets";

// Customizable Area End

import Cfzoomintegration92Controller, {
  Props,
  configJSON,
} from "./Cfzoomintegration92Controller";

export default class Cfzoomintegration92 extends Cfzoomintegration92Controller {
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
