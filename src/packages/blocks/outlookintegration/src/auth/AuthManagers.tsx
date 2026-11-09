import { BlockComponent } from "../../../../framework/src/BlockComponent";
import {
  getStorageData,
  setStorageData,
  removeStorageData,
} from "../../../../framework/src/Utilities";
import { authorize, refresh, AuthConfiguration } from "react-native-app-auth";
import { compareAsc, parseISO, sub } from "date-fns";
const configJSON = require("../config");

const config: AuthConfiguration = {
  clientId: configJSON.appId,
  redirectUrl: configJSON.redirectUrl,
  scopes: configJSON.appScopes,
  additionalParameters: { prompt: "select_account" },
  serviceConfiguration: {
    authorizationEndpoint: configJSON.authorizationEndpoint,
    tokenEndpoint: configJSON.tokenEndpoint,
  },
};

interface Props {}

interface S {}

interface SS {}

export class AuthManagers extends BlockComponent<Props, S, SS> {
  static signInAsync = async () => {
    try {
      const result = await authorize(config);
      // Store the access token, refresh token, and expiration time in storage
      await setStorageData(configJSON.userToken, result.accessToken);
      await setStorageData(configJSON.refreshToken, result.refreshToken);
      await setStorageData(
        configJSON.expireTime,
        result.accessTokenExpirationDate
      );
    } catch (error) {}
  };

  static signOutAsync = async () => {
    // Clear storage
    await removeStorageData(configJSON.userToken);
    await removeStorageData(configJSON.refreshToken);
    await removeStorageData(configJSON.expireTime);
  };

  static getAccessTokenAsync = async () => {
    const expireTime = await getStorageData(configJSON.expireTime);

    if (expireTime !== null) {
      // Get expiration time - 5 minutes
      // If it's <= 5 minutes before expiration, then refresh
      const expire = sub(parseISO(expireTime), { minutes: 5 });
      const nowTime = new Date();
      if (compareAsc(nowTime, expire) >= 0) {
        // Expired, refresh
        const refreshToken = await getStorageData(configJSON.refreshToken);
        const result = await refresh(config, {
          refreshToken: refreshToken || "",
        });
        // Store the new access token, refresh token, and expiration time in storage
        await setStorageData(configJSON.userToken, result.accessToken);
        await setStorageData(
          configJSON.refreshToken,
          result.refreshToken || ""
        );
        await setStorageData(
          configJSON.expireTime,
          result.accessTokenExpirationDate
        );

        return result.accessToken;
      }
      // Not expired, just return saved access token
      return await getStorageData(configJSON.userToken);
    }
  };
}
