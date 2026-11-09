import React from "react";

// Customizable Area Start



// Customizable Area End

import ViewChatController, {
  configJSON,
  IMessage,
  Props,
} from "./ViewChatController";

// Customizable Area Start
// Customizable Area End

export default class ViewChat extends ViewChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { chatData } = this.state;
    return (
     <div>
      
     </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: 600,
    border: "1px solid #ccc",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  headerButtonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: 600,
    height: 600,
    overflow: "scroll",
  },
  messageBoxContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#d9d6ed",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
  },
  messageInputView: {
    width: "100%",
    marginRight: 10,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: 600,
    border: "1px solid #ccc",
    background: "#fff",
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
  previewModalContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute" as "absolute",
    width: '80%',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  previewImage: {
    width: "100%",
    height: "auto",
  },
  previewInput: {
    marginLeft: 10,
  },
  modalButtonView: {
    marginLeft: 10,
  },
  previewModalButtons: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
  },
  unreadMessage: {
    color: "red",
  },
  readMessage: {
    color: "black",
  },
  fileInput: {
    display: "none",
  },
};
// Customizable Area End
