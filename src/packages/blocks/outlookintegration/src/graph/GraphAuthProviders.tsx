import { BlockComponent } from "../../../../framework/src/BlockComponent";
import { AuthManagers } from "../auth/AuthManagers";

interface Props {}

interface S {}

interface SS {}
export class GraphAuthProviders extends BlockComponent<Props, S, SS> {
  getAccessToken = async () => {
    const token = await AuthManagers.getAccessTokenAsync();
    return token || "";
  };
}
