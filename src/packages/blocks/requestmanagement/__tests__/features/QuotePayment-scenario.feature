Feature: QuotePayment

    Scenario: User navigates to QuotePayment
        Given I am a User loading QuotePayment
        When I navigate to the QuotePayment
        Then QuotePayment will load with out errors
        And Get token function shoudl be called
        Then I can click on back arrow icon with out errors
        And User can perform quote payment request

    Scenario: Payment type is card
        Given the payment type is card
        When the isPaymentTypeCard function is called
        Then the result should be true

    Scenario: Payment type is not card
        Given the payment type is cash
        When the isPaymentTypeCard function is called
        Then the result should be false

    Scenario: Setting payment type to "card"
        When I select the payment type as "card"
        Then the payment type should be set to "card"

    Scenario: Both selectedCurrency and paymentType are set
        Given the selected currency is not empty
        And the payment type is not empty
        When the getProceedBtnEnabled function is called
        Then the result should be true

    Scenario: selectedCurrency is empty
        Given the selected currency is empty
        And the payment type is not empty
        When the getProceedBtnEnabled function is called
        Then the result should be false

    Scenario: paymentType is empty
        Given the selected currency is not empty
        And the payment type is empty
        When the getProceedBtnEnabled function is called
        Then the result should be false

    Scenario: paymentType is GPay
        Given the selected currency is not empty
        And the payment type is empty
        When the getProceedBtnEnabled function is called
        Then the result should be false

    Scenario: Proceed button is enabled
        Given the proceed button is enabled
        When I press the proceed button
        Then the proceed API should be called

    Scenario: Proceed button is disabled
        Given the proceed button is disabled
        When I press the proceed button
        Then the proceed API should not be called

    Scenario: Closing the currency dropdown
        Given the currency dropdown is open
        When I close the dropdown of services
        Then the dropdown should be closed

    Scenario: Opening the currency dropdown
        Given the currency dropdown is closed
        When I open the services dropdown
        Then the dropdown should be open

    Scenario: Setting the selected currency value
        When I set the currency input to "£ - British pound sterling (GBP)"
        Then the selected currency state should be "£ - British pound sterling (GBP)"

    Scenario: Opening a valid Stripe URL
        When I open the URL "https://stripe.com"
        Then the URL should be opened in the browser

    Scenario: API request call ID matches proceedApiCallId
        Given a message with a matching API request call ID
        When the REST API response is handled
        Then the Stripe URL should be opened

    Scenario: API request call ID does not match proceedApiCallId
        Given a message with a non-matching API request call ID
        When the REST API response is handled
        Then the Stripe URL should not be opened

    Scenario: Message contains custom data
        Given a message with custom data
        When the navigation payload message is handled
        Then the state should be updated with the token, requestId, and quoteId

    Scenario: All fields are validated, but selectedCurrency is null
        Given all fields are validated
        And selectedCurrency is null
        When checking if an error should be shown for the dropdown
        Then it should return true

    Scenario: All fields are validated, and selectedCurrency is not null
        Given all fields are validated
        And selectedCurrency is not null
        When checking if an error should be shown for the dropdown
        Then it should return false

    Scenario: Not all fields are validated
        Given not all fields are validated
        When checking if an error should be shown for the dropdown
        Then it should return false

    Scenario: Pressing the request detail button
        Given the requestId is "12345"
        And the props are set
        When I press the request detail button
        Then it should send a navigation message with the request details
        And the actionType should be "view"

    Scenario: Successfully handle quote accept response
        Given the component is rendered
        When I call the manageQuoteAcceptResponse function
        Then the state should have "isShowWebView" set to false
        And the state should have "stripeCheckoutUrl" set to an empty string

    Scenario: Successfully handle request with StripeSuccessPage URL
        Given the component is rendered
        When I call the handleShouldStartLoadWithRequest function with a request containing "StripeSuccessPage"
        Then the state should have "isSuccessPayment" set to true
        And the function should return false

    Scenario: Successfully handle request with StripeFailurePage URL
        Given the component is rendered
        When I call the handleShouldStartLoadWithRequest function with a request containing "StripeFailurePage"
        Then the state should have "isFailedPayment" set to true
        And the function should return false

    Scenario: Successfully handle request with cancel URL
        Given the component is rendered
        When I call the handleShouldStartLoadWithRequest function with a request containing "cancel"
        Then the state should have "isFailedPayment" set to true
        And the function should return false

    Scenario: Handle request with a URL not related to Stripe
        Given the component is rendered
        When I call the handleShouldStartLoadWithRequest function with a request containing "example.com"
        Then the function should return true

    Scenario: Successfully reset payment state and redirect to request detail page
        Given the component is rendered
        When I press the btnRedirectTORequestDetail button
        Then the state should have "isSuccessPayment" set to false
        And the state should have "isFailedPayment" set to false
        And the redirectPageToDetailPage function should be called

    Scenario: Handle API response when quoteAcceptApiCallId is matched
        Given the API call ID is quoteAcceptApiCallId
        When handleRestAPIResponseMessage is called
        Then the manageQuoteAcceptResponse method should be called