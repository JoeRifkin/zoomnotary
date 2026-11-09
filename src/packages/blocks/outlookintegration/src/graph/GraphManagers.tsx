import { BlockComponent } from "../../../../framework/src/BlockComponent";
import { Client } from "@microsoft/microsoft-graph-client";
import * as helpers from "../../../../framework/src/Helpers";
import { GraphAuthProviders } from "./GraphAuthProviders";
import { GraphAuthProvidersWeb } from "./GraphAuthProvidersWeb";

export const clientOptions = {
  authProvider:
    helpers.getOS() === "web"
      ? new GraphAuthProvidersWeb({})
      : new GraphAuthProviders({}),
};

// Initialize the client
const graphClient = Client.initWithMiddleware(clientOptions);

interface Props {}

interface S {}

interface SS {}
export class GraphManagers extends BlockComponent<Props, S, SS> {
  static getUserAsync = async () => {
    return graphClient
      .api("/me")
      .select("displayName,givenName,mail,mailboxSettings,userPrincipalName")
      .get();
  };

  static getEvents = async () => {
    return graphClient
      .api("/me/events")
      .select("subject,organizer,start,end")
      .orderby("start/dateTime")
      .top(50)
      .get();
  };

  static getEmails = async () => {
    return graphClient.api("/me/mailFolders/Inbox/messages").top(50).get();
  };

  static getContacts = async () => {
    return graphClient.api("/me/contacts").top(50).get();
  };
}
