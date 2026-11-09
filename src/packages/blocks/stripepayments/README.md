## Building Blocks React Native Mobile - Stripe Integration

Building Blocks - React Native Master App - Stripe Integration

Note: This feature includes a screen and a component. If only the component is necessary, remove all dependencies related to the screen component in the component file and tests. 

## Getting Started

1. Add details inside config.js from stripe account
    1. stripePublishableKey: Publishable key from stripe
    2. stripeMerchantDisplayName: Display name to show on stripe payment bottom sheet
    3. stripeMerchantIdentifier: Merchant Identifier for apple pay 
        1. Not required
    4. urlScheme: deep linking url for app

### Prerequisites
 
1. Run: `yarn`

### Git Structure

N/A

### Installing

IOS:
1. Add:
        pod 'stripe-react-native', :path => '../../../node_modules/@stripe/stripe-react-native'
    to the Podfile in ios folder

Android:
1. Add: 
        include ':@stripe_stripe-react-native'
        project(':@stripe_stripe-react-native').projectDir = new File(rootProject.projectDir, '../../../node_modules/@stripe/stripe-react-native/android')
    To your android/settings.gradle in android folder
2. Add:
        compile project(':@stripe_stripe-react-native') 
    inside of dependencies in android/app/build.gradle
3. Change resolutionstrategy from 'androidx.core:core:1.6.0' to 'androidx.core:core:1.8.0' in android/app/build.gradle
4. Add:
        import com.reactnativestripesdk.StripeSdkPackage;
    as an import to android/app/src/main/java/com/repo name/MainApplication.java
5. Add:
        packages.add(new StripeSdkPackage());
    to function call getPackages in android/app/src/main/java/com/repo name/MainApplication.java

## Running the tests

1. Run: `yarn test`

## CI/CD Details

N/A

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
