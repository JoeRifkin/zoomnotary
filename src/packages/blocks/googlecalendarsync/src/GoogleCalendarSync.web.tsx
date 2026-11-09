import React from "react";

import {
  Container,
  Box,
  Button,
  Typography, // Customizable Area Start
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  TextField,
  Select, // Customizable Area End
  MenuItem,
} from "@mui/material";

// Customizable Area Start
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import CircleIcon from "@mui/icons-material/RadioButtonUnchecked";
import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
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
// Customizable Area End

import GoogleCalendarSyncController, {
  Props,
  configJSON,
} from "./GoogleCalendarSyncController.web";

export default class GoogleCalendarSync extends GoogleCalendarSyncController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <Box
        data-test-id="btnEventInfo"
        style={webStyle.event}
        onClick={() => this.setEventInfo(eventInfo)}
      >
        <Typography style={webStyle.eventTitle}>
          {eventInfo.event.title}
        </Typography>
      </Box>
    );
  };

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth={"md"}>
            <Box sx={webStyle.mainWrapper}>
              {this.state.authDetails ? (
                <Button
                  style={webStyle.googleSigninButton}
                  onClick={() => this.openAddModal()}
                  data-test-id="btnAddEvent"
                >
                  {configJSON.addEventText}
                </Button>
              ) : (
                <Button
                  style={webStyle.googleSigninButton}
                  onClick={this.googleSignIn}
                  data-test-id="btnSignIn"
                >
                  <img
                    {...this.googleIconWebProps}
                    style={webStyle.googleIcon}
                  />
                  {configJSON.syncWithGoogleCalendar}
                </Button>
              )}

              <Box style={webStyle.calendarWrapper}>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  eventContent={this.renderEventContent}
                  events={this.state.calendarData}
                />
              </Box>
            </Box>
          </Container>

          <Dialog
            open={this.state.selectedEvent !== null}
            onClose={this.closeModalHandle}
          >
            {this.state.selectedEvent && (
              <DialogContent>
                <Typography variant="h6">
                  {this.state.selectedEvent.event.title}
                </Typography>
                <Typography>
                  {this.getDate(
                    this.state.selectedEvent.event.start ?? Date(),
                    this.state.selectedEvent.event.end ?? Date()
                  )}
                </Typography>
                <Typography component={"div"}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        this.state.selectedEvent.event.extendedProps
                          .description,
                    }}
                  />
                </Typography>
                <Typography>
                  {this.state.selectedEvent.event.extendedProps.conferenceData
                    ?.entryPoints[0]?.uri && (
                    <Link
                      style={webStyle.link}
                      target="_blank"
                      href={
                        this.state.selectedEvent.event.extendedProps
                          .conferenceData.entryPoints[0].uri
                      }
                    >
                      {
                        this.state.selectedEvent.event.extendedProps
                          .conferenceData.entryPoints[0].uri
                      }
                    </Link>
                  )}
                </Typography>
                <Box>
                  <Typography style={webStyle.guestTitle}>
                    {configJSON.guestText}
                  </Typography>
                  {this.state.selectedEvent.event.extendedProps.attendees?.map(
                    (
                      item: { responseStatus: string; email: string },
                      index: number
                    ) => {
                      return (
                        <Box key={index} style={webStyle.attendeedWrapper}>
                          {item.responseStatus === "accepted" ? (
                            <CheckIcon
                              style={webStyle.attendeedIcon}
                              fontSize={"small"}
                            />
                          ) : item.responseStatus === "declined" ? (
                            <CancelIcon
                              style={webStyle.attendeedIcon}
                              fontSize={"small"}
                            />
                          ) : (
                            <CircleIcon
                              style={webStyle.attendeedIcon}
                              fontSize={"small"}
                            />
                          )}
                          <Typography>{item.email}</Typography>
                        </Box>
                      );
                    }
                  )}
                </Box>
              </DialogContent>
            )}
            <DialogActions>
              <Button
                style={{ backgroundColor: "#3f51b5" }}
                onClick={this.closeModalHandle}
                color="primary"
                variant="contained"
                data-test-id="btnCloseModal"
              >
                {configJSON.cancelText}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.openAddModal}
            onClose={this.closeModalHandle}
          >
            <DialogTitle>{configJSON.addEventText}</DialogTitle>
            <DialogContent>
              <TextField
                variant="outlined"
                label={configJSON.summaryPlaceholder}
                fullWidth
                style={webStyle.textField}
                value={this.state.inputFields.summary}
                name="summary"
                onChange={this.onChangeHandler}
                data-test-id="summaryInput"
              />
              <TextField
                variant="outlined"
                label={configJSON.startDatePlaceholder}
                fullWidth
                style={webStyle.textField}
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={this.state.inputFields.start}
                name="start"
                onChange={this.onChangeHandler}
                data-test-id="startDateInput"
              />
              <TextField
                variant="outlined"
                label={configJSON.endDatePlaceholder}
                fullWidth
                style={webStyle.textField}
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={this.state.inputFields.end}
                name="end"
                onChange={this.onChangeHandler}
                data-test-id="endDateInput"
              />
              <Select
                variant="outlined"
                name="timezone"
                value={this.state.inputFields.timezone}
                onChange={this.onChangeSelectHandler}
                fullWidth
                style={webStyle.textField}
              >
                {this.timeZone.map((zone) => (
                  <MenuItem key={zone.value} value={zone.value}>
                    {zone.label}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                variant="outlined"
                label={configJSON.locationPlaceholder}
                fullWidth
                style={webStyle.textField}
                value={this.state.inputFields.location}
                name="location"
                onChange={this.onChangeHandler}
                data-test-id="locationInput"
              />
              <TextField
                variant="outlined"
                label={configJSON.descriptionPlaceholder}
                fullWidth
                style={webStyle.textField}
                value={this.state.inputFields.description}
                name="description"
                onChange={this.onChangeHandler}
                data-test-id="descriptionInput"
              />
              <TextField
                variant="outlined"
                label={configJSON.attendeesPlaceholder}
                fullWidth
                style={webStyle.textField}
                value={this.state.inputFields.attendees}
                name="attendees"
                onChange={this.onChangeHandler}
                helperText={configJSON.attendeesHelperText}
                data-test-id="attendeesInput"
              />
            </DialogContent>
            <DialogActions>
              <Button
                style={{ backgroundColor: "#3f51b5" }}
                onClick={this.closeModalHandle}
                color="primary"
                variant="contained"
              >
                {configJSON.cancelText}
              </Button>
              <Button
                style={{ backgroundColor: "#3f51b5" }}
                onClick={this.addEvent}
                color="primary"
                variant="contained"
                data-test-id="btnSaveEvent"
              >
                {configJSON.saveText}
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </StyledEngineProvider>
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
  googleSigninButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
    boxShadow:
      "rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px",
    borderRadius: 2,
    border: "1px solid transparent",
    fontSize: 14,
    fontWeight: 500,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50,
  },
  googleIcon: {
    height: 18,
    marginRight: 10,
  },
  calendarWrapper: {
    width: "100%",
    marginTop: 40,
  },
  event: {
    backgroundColor: "#3f51b5",
    padding: 5,
    borderRadius: 4,
    width: "100%",
    overflow: "hidden",
    cursor: "pointer",
  },
  eventTitle: {
    color: "#fff",
    fontSize: 12,
  },
  link: {
    color: "#3f51b5",
  },
  guestTitle: {
    marginTop: 20,
    marginBottom: 5,
  },
  attendeedWrapper: {
    display: "flex",
    flexDirection: "row" as "row",
    padding: 2,
  },
  attendeedIcon: {
    marginTop: 3,
    marginRight: 10,
  },
  textField: {
    marginBottom: 15,
  },
};
// Customizable Area End
