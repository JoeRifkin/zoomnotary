// Customizable Area Start
export interface EventItem {
    id?: string;
    title: string;
    description?: string;
    start?: { dateTime: string; date: string };
    end?: { dateTime: string; date: string };
    conferenceData?: {
        entryPoints: { uri: string }[];
    };
    attendees?: {
        responseStatus: string;
        email: string;
    }[];
    summary: string;
}

export interface CalendarData  extends Omit<EventItem, 'start' | 'end'> {
  start?: Date;
  end?: Date;
}
// Customizable Area End
