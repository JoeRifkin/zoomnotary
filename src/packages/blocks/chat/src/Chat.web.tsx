import React from "react";

// Customizable Area Start




// Customizable Area End

import ChatController, { configJSON, IChat, Props } from "./ChatController";

export default class Chat extends ChatController {
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
      <div>

      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
  createButtonView: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px",
    marginBottom: 20,
  },
  roomListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listItemContainer: {
    width: 300,
    border: "2px solid #ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute" as "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  modalButtonView: {
    marginLeft: 10,
  },
  mutedChat: {
    backgroundColor: "lightgray",
  },
};
// Customizable Area End
