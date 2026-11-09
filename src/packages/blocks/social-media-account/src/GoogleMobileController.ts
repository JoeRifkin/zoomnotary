import { runEngine } from "../../../framework/src/RunEngine";
import { GoogleDelegate } from "./GoogleDelegate";

// Customizable Area Start
import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";

type GoogleUserInfo = {
  email: string;
  id: string;
};
// Customizable Area End

class GoogleMobileControllerClass {
  googleUserInfo: GoogleUserInfo;
  delegateClass: GoogleDelegate;

  static instance = new GoogleMobileControllerClass();

  // Customizable Area Start
  // Customizable Area End

  constructor() {
    this.delegateClass = new GoogleDelegate();
    this.configureGoogleSignin();
    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // GooGle MOBILE Methods
  configureGoogleSignin() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ["profile", "email"],
      offlineAccess: false
    });
  }

  handleGoogleSignIn(delegateClass: GoogleDelegate, isRegistration: boolean) {
    GoogleMobileControllerClass.instance.delegateClass = delegateClass;
    return this.signIn(isRegistration);
  }

  signIn = (isRegistration: boolean) => {
    return new Promise(async (resolve, reject) => {
      try {
        await GoogleSignin.hasPlayServices({
          //Check if device has Google Play Services installed.
          //Always resolves to true on iOS.
          showPlayServicesUpdateDialog: true
        });

        // call resolve if the method succeeds

        const userInfo = await GoogleSignin.signIn();
        GoogleMobileControllerClass.instance.googleUserInfo = {
          email: userInfo.user.email,
          id: userInfo.user.id
        };
        GoogleMobileControllerClass.instance.delegateClass.googleUserStatusChanged(
          GoogleMobileControllerClass.instance.googleUserInfo,
          isRegistration
        );
        return resolve(true);
      } catch (err) {
        let error = err as { code: string };
        if (
          error.code === statusCodes.SIGN_IN_CANCELLED ||
          error.code === statusCodes.IN_PROGRESS ||
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
          runEngine.debugLog(error.code);
        } else {
          // some other error happened
          runEngine.debugLog("something went wrong!");
        }
        return reject(error);
      }
    });
  };
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

const GoogleMobileController = new GoogleMobileControllerClass();
export default GoogleMobileController;
