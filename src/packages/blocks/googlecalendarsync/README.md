## Building Blocks React Native Mobile - GoogleAssistantIntegration

Building Blocks - React Native Master App - GoogleAssistantIntegration

## Getting Started

N/A

### Prerequisites

N/A

### Setting up

**For iOS:**

- Step-1: Create application if it doesn't exist in [Google Cloud Console](https://console.developers.google.com/?authuser=0)
- Step-2: Get API Key for iOS from [Google Developers Page](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)
- Step-3: Add API Key to `config.js` file inside `src` folder. Property: `exports.googleCalendarIOSClientId`
- Step-4: Change CLIENT_ID and REVERSED_CLIENT_ID in GoogleService-Info.plist
- Step-5: Change CFBundleURLSchemes in Info.plist
- Step-6: Change clientID in AppDelegate.m
- Step-7: If necessary Activate the Google Calendar API for your project in [Google Cloud Console](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com) 

**For Android:**

Step-1: If you already have a Firebase project, skip to step 2. Otherwise, create a new Firebase project by going to Firebase Console. Give your project a name and that's it!

Step-2: Now that the project is created, create a new Android app in the project dashboard.

Step-3: Just mention the correct package name of your app in the Android package name field and SHA1 in the Debug signing certificate SHA-1 field.

Step-4: Download the `google-services.json` file and put it in the `src/packages/mobile/android/app` of your project.

**For Web:**

- Step-1: Create application if it doesn't exist in [Google Cloud Console](https://console.developers.google.com/?authuser=0)
- Step-2: Get API Key from [Google Developers Page](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)
- Step-3: Add API Key to `config.js` file inside `src` folder. Property: `exports.googleCalendarClientId`
- Step-4: Activate the Google Calendar API for your project in [Google Cloud Console](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com)
- Step-5: Open APIs & Service - Credential. Open created client. Add Authorized JavaScript origins and Authorized redirect URIs. For the test  purposes: https://localhost:3000  

### Git Structure

N/A

### Installing

N/A

## Running the tests

N/A

## CI/CD Details

N/A

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
