import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import { BlockComponent } from '../../../framework/src/BlockComponent';
import MessageEnum, {
  getName,
} from '../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../framework/src/RunEngine';

// Customizable Area Start
import { googleIcon } from './assets';
import { EventContentArg } from '@fullcalendar/react';
import { gapi, loadAuth2, loadGapiInsideDOM } from 'gapi-script';
import { CalendarData, EventItem } from './types';
import { SelectChangeEvent } from '@mui/material/Select';
// Customizable Area End

export const configJSON = require('./config.js');

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  calendarData: CalendarData[];
  selectedEventItem: EventItem | null;
  selectedEvent: EventContentArg | null;
  authDetails: unknown;
  openAddModal: boolean;
  inputFields: {
    summary: string;
    start: string;
    end: string;
    location: string;
    description: string;
    timezone: string;
    attendees: string;
  };
  isSingedIn: boolean;
  selectedDay: string | null;
  openDatePicker: string | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoogleCalendarSyncController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  addEventCallId: string = '';
  getEventCallId: string = '';
  timeZone = [
    {
      label: '(GMT+01:00) United Kingdom Time',
      value: 'Europe/London',
    },
    {
      label: '(GMT-04:00) Eastern Time - New York',
      value: 'America/New_York',
    },
    {
      label: '(GMT+05:30) India Standard Time - Kolkata',
      value: 'Asia/Kolkata',
    },
  ];

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      calendarData: [],
      selectedEventItem: null,
      selectedEvent: null,
      authDetails: null,
      openAddModal: false,
      inputFields: {
        summary: '',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        location: '',
        description: '',
        timezone: this.timeZone[0].value,
        attendees: '',
      },
      isSingedIn: false,
      selectedDay: null,
      openDatePicker: null,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    try {
      await loadGapiInsideDOM();

      loadAuth2(
        gapi,
        configJSON.googleCalendarClientId,
        configJSON.googleCalendarScope
      );
    } catch (error) {}

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog('Message Recived', message);

    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.addEventCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        this.parseApiCatchErrorResponse(error);
      } else {
        const responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        if (responseJson && responseJson.error) {
          this.parseApiCatchErrorResponse(configJSON.errorMsg);
        } else {
          this.closeModalHandle();
          this.getEvents(this.state.authDetails as string);
        }
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getEventCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const events: EventItem[] = responseJson.items;

      this.setState({
        calendarData: events
          .filter((v) => !!v.start)
          .map((v) => ({
            ...v,
            title: v.summary,
            description: v.description,
            start: new Date(v.start!.dateTime),
            end: v.end ? new Date(v.end.dateTime) : undefined,
          })),
      });
    }

    // Customizable Area End
  }

  // Customizable Area Start

  getEvents = (token: string) => {
    const header = {
      'Content-Type': configJSON.googleEventApiContentType,
      Authorization: `Bearer ${token}`,
    };

    const getEventMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getEventCallId = getEventMessage.messageId;

    getEventMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleEventEntPoint
    );

    getEventMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    getEventMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getEventApiMethod
    );

    runEngine.sendMessage(getEventMessage.id, getEventMessage);
    return true;
  };

  googleIconWebProps = {
    src: googleIcon,
  };

  googleIconProps = {
    source: googleIcon,
  };

  closeModalHandle = () => {
    this.setState({ selectedEvent: null, openAddModal: false });
  };

  getDate = (date1: string | Date, date2: string | Date) => {
    let sDate = new Date(date1);
    let eDate = new Date(date2);

    if (Math.abs(sDate.getTime() - eDate.getTime()) / 36e5 === 24) {
      return sDate.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long',
      });
    }

    let startDate = sDate.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
      hour: '2-digit',
      hour12: true,
      minute: '2-digit',
    });

    let endDate = eDate.toLocaleString(undefined, {
      hour: '2-digit',
      hour12: true,
      minute: '2-digit',
    });

    return startDate + ' - ' + endDate;
  };

  addEvent = () => {
    let attendees: {
      responseStatus?: string;
      email: string;
    }[] = [];

    if (this.state.inputFields.attendees?.length > 0) {
      this.state.inputFields.attendees
        .replace(/\s/g, '')
        .split(',')
        ?.map((item: string) => {
          attendees.push({ email: item });
        });
    }
    const event = {
      summary: this.state.inputFields.summary,
      location: this.state.inputFields.location,
      description: this.state.inputFields.description,
      start: {
        dateTime: new Date(this.state.inputFields.start).toISOString(),
        timeZone: this.state.inputFields.timezone,
      },
      end: {
        dateTime: new Date(this.state.inputFields.end).toISOString(),
        timeZone: this.state.inputFields.timezone,
      },
      attendees: attendees,
    };

    const header = {
      'Content-Type': configJSON.googleEventApiContentType,
      Authorization: `Bearer ${this.state.authDetails}`,
    };

    const addEventMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addEventCallId = addEventMessage.messageId;

    addEventMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleEventEntPoint
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.addEventApiMethod
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(event)
    );

    runEngine.sendMessage(addEventMessage.id, addEventMessage);
    return true;
  };

  setEventInfo = (eventInfo: EventContentArg) => {
    this.setState({ selectedEvent: eventInfo });
  };

  googleSignIn = async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const response = await auth2.signIn();
      const user = response.getAuthResponse(true);
      this.setState({ authDetails: user.access_token });
      this.getEvents(user.access_token);
    } catch (error) {}
  };

  openAddModal = () => this.setState({ openAddModal: true });

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name) {
      this.setState({
        inputFields: {
          ...this.state.inputFields,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  onChangeSelectHandler = (event: SelectChangeEvent) => {
    if (event.target.name) {
      this.setState({
        inputFields: {
          ...this.state.inputFields,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  // Customizable Area End
}
