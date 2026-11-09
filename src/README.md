# **React Native** | _**ZoomNotary**_ | _**401615**_ | _**studio_pro**_

## **Catalog ProjectId: 186685** | **Catalog BuildId: 30737**

## NOTE FOR DEVELOPERS:
Clone the code-engine branch into your working branch. The contents of the branch may get overwritten.
## Author:
Code-Engine
## Keywords:
 - zoomnotary
 - mobile
 - web
## Assembled Features To Block Status

| **Feature-Name**        | **Block-Name (Certification Type)**        | **Path**  | **Status**  |
|:-------------|:-------------|:-------------|:-------------|
| menuordering2      | navigationmenu (FULL)<br>core (FULL)<br>      | {+packages/blocks/navigationmenu+}<br>{+packages/blocks/core+}<br> | {+Non-Empty+} |
| geolocationreporting2      | location (FULL)<br>analytics (FULL)<br>      | {+packages/blocks/location+}<br>{+packages/blocks/analytics+}<br> | {+Non-Empty+} |
| knowyourcustomerkycverification2      | knowyourcustomerkycverification (LITE)<br>utilities (FULL)<br>      | {+packages/blocks/knowyourcustomerkycverification+}<br>{+packages/blocks/utilities+}<br> | {+Non-Empty+} |
| payments2      | stripepayments<br>      | {+packages/blocks/stripepayments+}<br> | {+Non-Empty+} |
| signuplogin2      | social-media-account-registration (FULL)<br>social-media-account (FULL)<br>email-account-login (FULL)<br>email-account-registration (FULL)<br>country-code-selector (FULL)<br>forgot-password (FULL)<br>otp-input-confirmation (FULL)<br>social-media-account-login (FULL)<br>      | {+packages/blocks/social-media-account-registration+}<br>{+packages/blocks/social-media-account+}<br>{+packages/blocks/email-account-login+}<br>{+packages/blocks/email-account-registration+}<br>{+packages/blocks/country-code-selector+}<br>{+packages/blocks/forgot-password+}<br>{+packages/blocks/otp-input-confirmation+}<br>{+packages/blocks/social-media-account-login+}<br> | {+Non-Empty+} |
| cameraaccess4      | cameraaccess (FULL)<br>      | {+packages/blocks/cameraaccess+}<br> | {+Non-Empty+} |
| bulkuploading2      | bulkuploading<br>      | {+packages/blocks/bulkuploading+}<br> | {+Non-Empty+} |
| geofence4      | geofence (FULL)<br>      | {+packages/blocks/geofence+}<br> | {+Non-Empty+} |
| termsandconditions3      | termsconditions<br>      | {+packages/blocks/termsconditions+}<br> | {+Non-Empty+} |
| documentopener2      | documentopener (FULL)<br>      | {+packages/blocks/documentopener+}<br> | {+Non-Empty+} |
| userprofile3      | user-profile-basic (FULL)<br>educational-user-profile (FULL)<br>      | {+packages/blocks/user-profile-basic+}<br>{+packages/blocks/educational-user-profile+}<br> | {+Non-Empty+} |
| contentmanagement3      | contentmanagement (LITE)<br>      | {+packages/blocks/contentmanagement+}<br> | {+Non-Empty+} |
| docusignintegration3      | docusignintegration (LITE)<br>      | {+packages/blocks/docusignintegration+}<br> | {+Non-Empty+} |
| search5      | search (FULL)<br>      | {+packages/blocks/search+}<br> | {+Non-Empty+} |
| appointmentcalendarlisting2      | scheduling (FULL)<br>      | {+packages/blocks/scheduling+}<br> | {+Non-Empty+} |
| landingpage2      | landingpage (FULL)<br>      | {+packages/blocks/landingpage+}<br> | {+Non-Empty+} |
| taskallocator2      | tasks (FULL)<br>accountgroups (FULL)<br>      | {+packages/blocks/tasks+}<br>{+packages/blocks/accountgroups+}<br> | {+Non-Empty+} |
| requestmanagement2      | requestmanagement<br>      | {+packages/blocks/requestmanagement+}<br> | {+Non-Empty+} |
| collecttransactionfees2      | collecttransactionfees (LITE)<br>      | {+packages/blocks/collecttransactionfees+}<br> | {+Non-Empty+} |
| ordercreation2      | ordermanagement (FULL)<br>catalogue (FULL)<br>      | {+packages/blocks/ordermanagement+}<br>{+packages/blocks/catalogue+}<br> | {+Non-Empty+} |
| outlookintegration2      | outlookintegration (LITE)<br>      | {+packages/blocks/outlookintegration+}<br> | {+Non-Empty+} |
| splashscreen4      | splashscreen (FULL)<br>      | {+packages/blocks/splashscreen+}<br> | {+Non-Empty+} |
| googlecalendarsync2      | googlecalendarsync (FULL)<br>      | {+packages/blocks/googlecalendarsync+}<br> | {+Non-Empty+} |
| rolesandpermissions2      | rolesandpermissions2      | {-packages/blocks/rolesandpermissions2-} | {-Empty-} |
| adminconsole2      | adminconsole2      | {-packages/blocks/adminconsole2-} | {-Empty-} |
| settings2      | settings2      | {-packages/blocks/settings2-} | {-Empty-} |
| cfzoomintegration92      | cfzoomintegration92      | {-packages/blocks/cfzoomintegration92-} | {-Empty-} |
| emailnotifications2      | emailnotifications2      | {-packages/blocks/emailnotifications2-} | {-Empty-} |
| quotemanagement2      | quotemanagement2      | {-packages/blocks/quotemanagement2-} | {-Empty-} |

## AWS BACKEND DEPLOYMENT URL
 - BaseURL exported as: "https://zoomnotary-401615-ruby.b401615.prd.eastus.az.svc.builder.ai"
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

See docs folder for additional information.

### Prerequisites

What things you need to install the software and how to install them

- React Native (last tested on react-native 0.64.4)

  - https://facebook.github.io/react-native/docs/getting-started

- IFF brew is installed and user doesn't have permisions.

```
  $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- XCode 11 or greater

- XCode Command Line Tools

```
  $ xcode-select --install
```

- Android SDK

```
  $ brew cask install android-sdk
```

- JDK 11

```
  $ brew tap homebrew/cask-versions
  $ brew cask install java
  $ brew cask install java11
```

Or if you are using a Macbook with an Apple Silicon chip (M1 or M2) then we highly recommend using the Azul Zulu distribution of the Java Development Kit as it has better support for M1/M2 macs than the standard distribution:

```
  $ brew tap homebrew/cask-versions
  $ brew install --cask zulu11
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn

```
  $ brew install yarn
```

Install node

```
  $ brew install node
```

Web

```
  $ yarn
  $ yarn workspace web start
  (Note: After udpating depencies run again if no cocde erros. )
```

iOS

```
  $ yarn
  $ cd packages/mobile/ios && pod install && cd ../../../ && cp node-runners/RCTUIImageViewAnimated.m node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m && npx react-native bundle --entry-file ./packages/mobile/index.js --platform ios --dev true --bundle-output ./packages/mobile/ios/main.jsbundle && yarn ios
```

Android - https://docs.expo.io/versions/latest/workflow/android-studio-emulator/

```
  $ yarn
  $ export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version; export ANDROID_HOME=${HOME}/Library/Android/sdk; export PATH=${PATH}:${ANDROID_HOME}/emulator && yarn android
```

## Running the tests

```
  $ yarn test
```

## CI/CD Details

We use GitlabCI for our deployment/Build pipelines

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Patches

There are a few small patches applied to the node modules folder that will be automatically applied after the yarn install process is complete.
