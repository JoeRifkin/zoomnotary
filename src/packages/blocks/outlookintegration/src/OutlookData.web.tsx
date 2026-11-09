import React from "react";
require("isomorphic-fetch");
import { Button, adaptV4Theme } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

import OutlookIntegrationController, {
  Props,
} from "./OutlookIntegrationController";
import "@mui/styles";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

class OutlookData extends OutlookIntegrationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { emails, calendars, contacts, isLoaded } = this.state;
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <div style={webStyle.wraper}>
            <div style={webStyle.container}>
              <h2>Outlook Integration Data</h2>

              <Button
                style={webStyle.menu}
                onClick={this.getEmailList}
                data-test-id={"TestEmailButton"}
              >
                Emails
              </Button>
              <Button
                style={webStyle.menu}
                onClick={this.getEventList}
                data-test-id={"TestEventButton"}
              >
                Events
              </Button>
              <Button
                style={webStyle.menu}
                onClick={this.getContactList}
                data-test-id={"TestContactButton"}
              >
                Contacts
              </Button>
              {isLoaded === false ? "Loading..." : ""}
              <div>
                {emails &&
                  emails.map((item) => {
                    return (
                      <div
                        key={`emails${item.id}`}
                        data-test-id="TestRenderEmails"
                      >
                        <p style={webStyle.eventSubject}>{item.subject}</p>
                        <p
                          data-test-id="testIDClickBtn"
                          style={webStyle.link}
                          onClick={() => window.open(item.webLink, "_blank")}
                        >
                          Reply/forward
                        </p>
                        <hr />
                      </div>
                    );
                  })}
                {calendars &&
                  calendars.map((item) => {
                    return (
                      <div key={`calendar_${item.id}`}>
                        <p style={webStyle.eventSubject}>{item.subject}</p>
                        <p style={webStyle.eventOrganizer}>
                          {item.organizer!.emailAddress!.name}
                        </p>
                        <p style={webStyle.eventDuration}>
                          {this.convertDateTime(item.start!.dateTime!)}-{" "}
                          {this.convertDateTime(item.end!.dateTime!)}
                        </p>
                        <hr />
                      </div>
                    );
                  })}

                {contacts &&
                  contacts.map((item) => {
                    return (
                      <div key={`contacts${item.id}`}>
                        <p style={webStyle.eventSubject}>{item.displayName}</p>
                        <hr />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
      // Customizable Area End
    );
  }
}

export default OutlookData;
const webStyle = {
  wraper: {
    flex: 1,
    width: "100vw",
    height: "80vh",
    padding: 16,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  container: {
    width: "80vw",
    margin: "0 auto",
  },
  listTab: {
    display: "flex",
  },
  menu: {
    paddingRight: 10,
    fontSize: 18,
    cursor: "pointer",
    color: "blue",
  },
  eventSubject: {
    fontSize: 18,
    color: "black",
    fontWeight: 600,
  },
  eventOrganizer: {
    color: "black",
  },
  eventDuration: {
    color: "black",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    fontSize: 18,
  },
};
