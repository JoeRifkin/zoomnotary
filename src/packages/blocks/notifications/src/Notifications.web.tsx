import React from "react";

// Customizable Area Start

import { imgBell } from "./assets";
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notifications extends NotificationsController {
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
        <div>
        </div>
      // Customizable Area End
    );
  }
}

// Customizable Area Start


const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  itemWrapper: {
    border: "1px solid #767676",
    display: "flex",
    width: "70%",
    flexDirection: "row" as "row",
    marginTop: 10,
    padding: 16,
    paddingTop: 10,
    cursor: "pointer",
  },
  itemHeadingWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "row" as "row",
  },
  iconStyle: {
    width: 20,
    height: 26,
    marginTop: 6,
  },
  itemHeading: {
    color: "#000",
    flex: 1,
    fontWeight: 700,
  },
  itemHeadingRead: {
    color: "#6200EE",
    flex: 1,
    fontWeight: 700,
  },
  contents: {
    fontSize: 16,
    color: "#767676",
  },
  okButton: {
    backgroundColor: "#ccc",
    color: "#000",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
  },
};
// Customizable Area End
