Feature: DocusignIntegration

    Scenario: User navigates to DocusignIntegration
        Given I am a User loading DocusignIntegration
        When I navigate to the DocusignIntegration
        Then DocusignIntegration will load with out errors
        And I can click back button with with out errors
        And I can draw signature in canvas with out errors
        And signature will get the user on API call
        And User list API through errors
        And I can leave the screen with out errors

    Scenario: Storing property values when custom data is available
        Given I receive a message with custom data
        When I store the property values
        Then the component state should be updated with the token, docuSignUrl, and requestId

    Scenario: No custom data in the message
        Given I receive a message without custom data
        When I try to store the property values
        Then the state should not be updated

    Scenario: Go back to the dashboard
        Given I am on the current page
        When I press the go back button
        Then I should navigate back to the previous page

    Scenario: Handle Stripe success page request
        Given I am navigating a web page
        When I receive a URL with 'StripeSuccessPage'
        Then I should set the state to finish the DocuSign process and stop loading

    Scenario: Check the status of the request
        Given I have a request ID and action type
        When I press the check status button
        Then the navigation message should be sent with the correct request details

    Scenario: URL contains StripeSuccessPage
        Given the URL is https://example.com/StripeSuccessPage
        When the handleShouldStartLoadWithRequest function is called
        Then the state should set isFinishDocuSign to true
        And it should return false
        And it should call the scrollToTop function

    Scenario: URL does not contain StripeSuccessPage
        Given the URL is https://example.com/SomeOtherPage
        When the handleShouldStartLoadWithRequest function is called
        Then it should return true
        And it should not call the scrollToTop function

    Scenario: User clicks to view the request details
        Given the user is on the request page
        When the redirectToRequestDetailpage function is called
        Then the selectedRequest data with requestId and actionType should be added to the message
        
    Scenario: Access token and envelope ID are set
        Given the "access_token" is set to "some_token"
        And the "envelope_id" is set to "some_envelope_id"
        When the onClickOfCheckStatus function is called
        Then the callDocusign_urlApi function should be called

    Scenario: Access token or envelope ID is not set
        Given the "access_token" is an empty string
        And the "envelope_id" is an empty string
        When the onClickOfCheckStatus function is called
        Then the callCheckDocusingStatus function should be called