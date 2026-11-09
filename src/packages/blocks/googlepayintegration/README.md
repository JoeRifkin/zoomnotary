# GooglePayIntegration  
The GooglePayIntegration block enables seamless integration of Google Pay for processing payments within an app.  
## What this block can do:  
- Configure and initialize Google Pay with specified card networks and authentication methods  
- Check the availability of Google Pay on the user's device  
- Request and process payment tokens from Google Pay  
- Handle user input for payment amounts  
- Display success and error messages based on payment outcomes  
## External dependencies  
In addition to the dependencies listed in the `package.json` file, projects created with `googlepayintegration` will  
have some addition dependencies installed. They are listed here for informational purposes and **do not require  
any additional configuration**.  
### Packages  
- `react-native-google-pay`@` ^2.1.0`  
  
- `react-native-elements`@` 3.4.0`  
  
- `react-native-simple-radio-button`@` 2.7.4`  
  
- `@types/react-native-simple-radio-button`@` 2.7.2`  
## Additional information  
#### LITE CERTIFIED BLOCK  
### Getting Started  
- Begin your Google Pay integration journey by understanding the basics of the process.  
- Familiarize yourself with the necessary prerequisites, Git structure, installation steps, testing, CI/CD details, and versioning.  
#### Prerequisites  
- Ensure you have an active Google Pay merchant account.  
- Access the required credentials and APIs for integration.  
#### Git Structure  
- Organize your project's repositories in a structured manner to manage the integration effectively.  
- Consider creating separate branches for development, testing, and production stages.  
#### Installing  
- Acquire and install the latest SDKs and libraries for Google Pay.  
- Configure these components correctly within your application.  
### Running the tests  
- Perform thorough testing to ensure that your Google Pay integration works seamlessly.  
- Test for security, reliability, and compatibility across different platforms and devices.  
### CI/CD Details  
- Implement CI/CD pipelines to automate deployment and updates.  
- This streamlines the integration process and ensures consistent, reliable releases.  
## Component API  
### GooglePayIntegration  
GooglePayIntegration is a React component that integrates Google Pay functionality.  
  
| Name | Type | Default | Description |  
|------------|----------|---------|--------------------------------------------------|  
| navigation | any | | Navigation object for navigation purposes. |  
| id | string | | Unique identifier for the component instance. |  
#### State  
| Name | Type | Default | Description |  
|-----------------------|-----------------------------|---------|--------------------------------------------------|  
| txtInputValue | string | "" | Value of the text input field. |  
| txtSavedValue | string | "A" | Saved value of the text input field. |  
| enableField | boolean | false | Flag to enable or disable the input field. |  
| allowedCardNetworks | AllowedCardNetworkType[] | ["VISA", "MASTERCARD"] | Allowed card networks for Google Pay. |  
| allowedCardAuthMethods| AllowedCardAuthMethodsType[]| ["PAN_ONLY", "CRYPTOGRAM_3DS"] | Allowed card authentication methods for Google Pay. |  
| amountValue | string | "" | Amount value for the transaction. |  
#### Methods  
| Name | Description |  
|-----------------------|--------------------------------------------------|  
| receive | Handles received messages. |  
| doButtonPressed | Handles button press events. |  
| setInputValue | Sets the value of the input field. |  
| setEnableField | Toggles the enableField state. |  
| handleAmountInput | Handles input for the amount field. |  
| subscribePurchase | Initiates the Google Pay purchase process. |  
#### Props for Child Components  
| Name | Type | Default | Description |  
|-----------------------|----------|---------|--------------------------------------------------|  
| txtInputWebProps | object | | Props for the web text input field. |  
| txtInputMobileProps | object | | Props for the mobile text input field. |  
| txtInputProps | object | | Props for the text input field based on platform.|  
| btnShowHideProps | object | | Props for the show/hide button. |  
| btnShowHideImageProps | object | | Props for the show/hide button image. |  
| btnExampleProps | object | | Props for the example button. |  
### Versioning  
- Establish a versioning strategy to track changes and updates to your Google Pay integration.  
- Clearly define version numbers to maintain a transparent development history.  
  
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).  
