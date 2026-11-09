import { BlockComponent } from "../../../../framework/src/BlockComponent";

interface Props {}

interface S {}

interface SS {}
export class GraphAuthProvidersWeb extends BlockComponent<Props, S, SS> {
  getAccessToken = async () => {
    return window.localStorage.getItem("authMsGraphToken") || "";
  };
}
