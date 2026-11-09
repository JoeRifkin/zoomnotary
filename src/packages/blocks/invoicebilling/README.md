# InvoiceBilling  
The InvoiceBilling block allows users to input an invoice number and retrieve the corresponding invoice PDF.  
## What this block can do:  
- Input validation for invoice numbers  
- API call to retrieve invoice PDF based on the invoice number  
- Display loading indicator during API call  
- Open the retrieved invoice PDF in a new window or tab  
## External dependencies  
In addition to the dependencies listed in the `package.json` file, projects created with `invoicebilling` will  
have some addition dependencies installed. They are listed here for informational purposes and **do not require  
any additional configuration**.  
### Packages  
- `react-native-elements`@` 3.4.0`  
## Additional information  
#### LITE CERTIFIED BLOCK  
### Getting Started  
As a User, should be able to view the billing of the item ordered with discounts, shipping fee applied.  
### Running the tests  
Before testing Trending, make sure that you rebuild and install the app in your emulator/simulator/device.  
If you're testing on Android, run:  
npx react-native run-android  
Testing with adb on Android​  
### CI/CD Details  
We use GitlabCI for our deployment/Build pipelines  
## Component API  
### InvoiceBillingController  
InvoiceBillingController is a React component that handles the logic for invoice billing, including API calls and state management.  
  
| Name | Type | Default | Description |  
|------------|--------|---------|------------------------------------|  
| navigation | object | | Navigation object for routing. |  
| id | string | | Unique identifier for the component.|  
### InvoiceBilling  
InvoiceBilling is a React component that extends InvoiceBillingController and renders the UI for invoice billing.  
  
| Name | Type | Default | Description |  
|------------|--------|---------|------------------------------------|  
| navigation | object | | Navigation object for routing. |  
| id | string | | Unique identifier for the component.|  
### Versioning  
We use SemVer for versioning. For the versions available, see the tags on this repository.  
