Feature: QuoteManagement

    Scenario: User navigates to QuoteManagement
        Given I am a User loading QuoteManagement
        When I navigate to the QuoteManagement
        Then QuoteManagement will load with out errors
        And Get token function shoudl be called
        Then I can click on back arrow icon with out errors

    Scenario: Render error style when step one validation fails and selected day is empty
        Given the step one validation is true
        When the renderUIStyleOfDateAndTime function is called
        Then it should return "errorOfField"

    Scenario: Render text field background style when step one validation passes or selected day is not empty
        Given the step one validation is true
        When the renderUIStyleOfDateAndTime function is called
        Then it should return "textFieldBg"

    Scenario: Render style for iOS
        Given the platform is iOS
        When the renderStyleAccordingToOS function is called
        Then it should return "paddBottTop"

    Scenario: Render style for Android
        Given the platform is Android
        When the renderStyleAccordingToOS function is called
        Then it should return "padd"

    Scenario: Toggling the remember me checkbox
        Given the remember me checkbox is initially unchecked
        When the user presses the remember me button
        Then the remember me checkbox should be checked

    Scenario: Toggling the includ Platform Fee checkbox
        Given the includ Platform Fee checkbox is initially unchecked
        When the user presses the includ Platform Fee button
        Then the includ Platform Fee checkbox should be checked
        
    Scenario: Updating the selected currency
        Given the component is rendered
        When I call the txtInputCurrencyPrpos method with "USD"
        Then the selected currency state should be "USD"

    Scenario: Enter value for Include Platform fees
        Given the includ Platform Fee input is initially blank
        When the user enter the includ Platform Fee value
        Then the includ Platform Fee will be enter in input box

    Scenario: Enter value for Add message
        Given the Add message input is initially blank
        When the user enter the Add message value
        Then the Add message will be enter in input box

    Scenario: Click on Cancel button from popup
        Given the popup will be open to click 
        When the user click on Cancel button
        Then the popup will be closed on cancel button

    Scenario: Closing the time selection modal
        Given the time selection modal is open
        When I call the closeTimeSelectionModel method
        Then the isTimeSelectionModelOpen state should be false

    Scenario: Both start and end times are selected
        Given selected start time is "10:00 AM"
        And selected end time is "11:00 AM"
        When I call the getButtonEnabled method
        Then the button should be enabled

    Scenario: Only start time is selected
        Given selected start time is "10:00 AM"
        And selected end time is not selected
        When I call the getButtonEnabled method
        Then the button should not be enabled

    Scenario: Only end time is selected
        Given selected start time is not selected
        And selected end time is "11:00 AM"
        When I call the getButtonEnabled method
        Then the button should not be enabled

    Scenario: Neither start nor end times are selected
        Given selected start time is not selected
        And selected end time is not selected
        When I call the getButtonEnabled method
        Then the button should not be enabled

    Scenario: Click on watch icon button from popup
        Given the popup will be open to click 
        When the user click on watch icon button
        Then the popup will be open on watch icon button
        Then the popup will be open on Date picket keyboard hide

    Scenario: select the start time form poupup
        Given for start time selection modal is open
        When I can select time with calling the onStartDateChange method
        Then the selectedStartTime state should be have start time

    Scenario: select the end time form poupup
        Given for end time selection modal is open
        When I can select time with calling the onEndDateChange method
        Then the selectedEndTime state should be have end time

    Scenario: Click on Make Quote button
        Given the enable Make Quote button 
        When the user click on Make Quote
        Then the method will be call and call api

    Scenario: All fields are valid
        Given the start time is "10:00 AM"
        And the end time is "12:00 PM"
        And the fees are "100"
        And the selected currency is "USD"
        When I press the make quote button
        Then the API should be called to make a quote

    Scenario: Some fields are invalid
        Given the start time is ""
        And the end time is "12:00 PM"
        And the fees are "100"
        And the selected currency is "USD"
        When I press the make quote button
        Then the isAllFieldValid state should be true
        And the API should not be called to make a quote

    Scenario: Start time is later than end time
        Given the start time is "02:00 PM"
        And the end time is "12:00 PM"
        And the fees are "100"
        And the selected currency is "USD"
        When I press the make quote button
        Then the isAllFieldValid state should be true
        And the API should not be called to make a quote

    Scenario: Start time is before end time
        Given the start time is "10:00 AM"
        And the end time is "12:00 PM"
        And the selected start time is 10
        And the selected end time is 12
        When I check the start and end time
        Then the result should be false

    Scenario: Start time is after end time
        Given the start time is "02:00 PM"
        And the end time is "12:00 PM"
        And the selected start time is 14
        And the selected end time is 12
        When I check the start and end time
        Then the result should be true

    Scenario: Start time or end time is empty
        Given the start time is ""
        And the end time is "12:00 PM"
        And the selected start time is null
        And the selected end time is 12
        When I check the start and end time
        Then the result should be undefined

    Scenario: All fields are filled
        Given the start time is "10:00 AM"
        And the end time is "12:00 PM"
        And the fees are "100"
        And the selected currency is "USD"
        When I check if the make quote button should be enabled
        Then the result should be true

    Scenario: Some fields are empty
        Given the start time is "10:00 AM"
        And the end time is ""
        And the fees are "100"
        And the selected currency is "USD"
        When I check if the make quote button should be enabled
        Then the result should be false

    Scenario: All fields are empty
        Given the start time is ""
        And the end time is ""
        And the fees are ""
        And the selected currency is ""
        When I check if the make quote button should be enabled
        Then the result should be false

    Scenario: Close time selection model when time type is start time
        Given the time type is "start time"
        And the start time is "10:00 AM"
        And the end time is "12:00 PM"
        When I close the time selection model
        

    Scenario: Close time selection model when time type is end time
        Given the time type is "end time"
        And the start time is "10:00 AM"
        And the end time is "12:00 PM"
        When I close the time selection model
        

    Scenario: Close time selection model when time type is neither start nor end time
        Given the time type is "other"
        And the start time is "10:00 AM"
        And the end time is "12:00 PM"
        When I close the time selection model

    Scenario: Click on Next button from popup
        Given the popup will be open to click 
        When the user click on Next button
        Then the popup will be closed on Next button
        

     Scenario: Time type is start time and start time is not empty
        Given the time type is "start time"
        And the start time is "10:00 AM"
        When I check if the button is enabled
        Then the button should be enabled

    Scenario: Time type is start time and start time is empty
        Given the time type is "start time"
        And the start time is ""
        When I check if the button is enabled
        Then the button should not be enabled

    Scenario: Time type is end time and end time is not empty
        Given the time type is "end time"
        And the end time is "12:00 PM"
        When I check if the button is enabled
        Then the button should be enabled

    Scenario: Time type is end time and end time is empty
        Given the time type is "end time"
        And the end time is ""
        When I check if the button is enabled
        Then the button should not be enabled

    Scenario: Time type is neither start time nor end time
        Given the time type is "other"
        When I check if the button is enabled
        Then the button should not be enabled

     Scenario: Convert date time in the morning
        Given the date time is "2024-08-01T08:30:00.000Z"
        When I convert the date time into time
        Then the result should be "08:30 AM"

    Scenario: Convert date time in the afternoon
        Given the date time is "2024-08-01T13:45:00.000Z"
        When I convert the date time into time
        Then the result should be "01:45 PM"

    Scenario: Convert date time at noon
        Given the date time is "2024-08-01T12:00:00.000Z"
        When I convert the date time into time
        Then the result should be "12:00 PM"

    Scenario: Convert date time at midnight
        Given the date time is "2024-08-01T00:15:00.000Z"
        When I convert the date time into time
        Then the result should be "12:15 AM"

    Scenario: Fees is zero, all fields are valid, and error message is not visible
        Given the fees is "0"
        And all fields are valid
        And the error message is not visible for selected currency
        When I call the showFeesErrorMsg function
        Then it should return "true"

    Scenario: Fees is not zero
        Given the fees is "100"
        And all fields are valid
        And the error message is not visible for selected currency
        When I call the showFeesErrorMsg function
        Then it should return "false"

    Scenario: All fields are not valid
        Given the fees is "0"
        And all fields are not valid
        And the error message is not visible for selected currency
        When I call the showFeesErrorMsg function
        Then it should return "false"

    Scenario: Error message is visible for selected currency
        Given the fees is "0"
        And all fields are valid
        And the error message is visible for selected currency
        When I call the showFeesErrorMsg function
        Then it should return "false"

    Scenario: All required fields are filled and video call is not required
        Given startTime is "10:00"
        And endTime is "12:00"
        And fees is "100"
        And selectedCurrency is "USD"
        And video call is not required
        When I call the getMakeQuoteEnabled function
        Then it should return "true"

    Scenario: One or more required fields are empty
        Given startTime is ""
        And endTime is "12:00"
        And fees is "100"
        And selectedCurrency is "USD"
        When I call the getMakeQuoteEnabled function
        Then it should return "false"

    Scenario: Video call is required
        Given startTime is "10:00"
        And endTime is "12:00"
        And fees is "100"
        And selectedCurrency is "USD"
        And video call is required
        When I call the getMakeQuoteEnabled function
        Then it should return "false"

    Scenario: Handle make quote API response
        Given the initial state is set
        When I call the handleMakeQuoteApiResponse function with response data
        Then the state should have "isLoader" set to "false"
        And the state should have "isMakeQuoteGenerated" set to "true"
        And the view should scroll to the top

    Scenario: Pressing the request detail button
        Given the requestId is "12345"
        And the props are set
        When I press the request detail button
        Then it should send a navigation message with the request details
        And the actionType should be "view"

    Scenario: Handling navigation payload message with valid data
        Given the message contains valid custom data
        When I call the handleNavigationPayloadMessage function
        Then it should update selectedActionType, requestId, notarisationMethodType, and set state with selectedDate and token

    Scenario: Convert a valid date
        Given I have a valid date "2024-08-09T05:30:00.000Z"
        When I convert the date into payload request format
        Then the result should be "2024-08-09T05:30:00.000Z"

    Scenario: Scroll the view to the top
        Given the scrollViewRef is set
        When I call the scrollToTop function
        Then the scroll view should scroll to the top

     Scenario: User presses the fail OK button and the navigation goes back
        Given the loader is visible and the make quote failed state is true
        When the user presses the fail OK button
        Then the loader, make quote failed, and make quote generated states should be set to false
        And the navigation should go back

     Scenario: Quote submitted successfully
        Given the API response contains the message "Quote submitted successfully."
        When the handleMakeQuoteApiResponse function is called
        Then the loader should be hidden
        And the quote generation should be marked as successful
        And the quote failure should not be marked

    Scenario: Quote submission failed
        Given the API response does not contain the message "Quote submitted successfully."
        When the handleMakeQuoteApiResponse function is called
        Then the loader should be hidden
        And the quote failure should be marked as true
        And the quote generation should not be marked as successful

    Scenario: Start and end times are within 30 minutes
        Given the startTime and endTime are set
        And the selectedStartTime and selectedEndTime are valid
        And the time difference is within 30 minutes
        When I check the start and end times
        Then the result should be true

    Scenario: Start and end times are not within 30 minutes
        Given the startTime and endTime are set
        And the selectedStartTime and selectedEndTime are valid
        And the time difference is more than 30 minutes
        When I check the start and end times
        Then the result should be false

    Scenario: Start or end time is missing
        Given the startTime or endTime is empty
        When I check the start and end times
        Then the result should be undefined

    Scenario: Selected start or end time is null
        Given the selectedStartTime or selectedEndTime is null
        When I check the start and end times
        Then the result should be undefined

    Scenario: Open time selection modal for "start time"
        Given the type is "start time"
        And the selectedStartTime is set
        When I open the time selection modal
        Then the modal state should have isTimeSelectionModelOpen as true
        And the timeType should be "start time"
        And the startTime should be the converted time of selectedStartTime

    Scenario: Open time selection modal for "end time"
        Given the type is "end time"
        And the selectedEndTime is set
        When I open the time selection modal
        Then the modal state should have isTimeSelectionModelOpen as true
        And the timeType should be "end time"
        And the endTime should be the converted time of selectedEndTime

    Scenario: Open time selection modal for "start time" without selectedStartTime
        Given the type is "start time"
        And the selectedStartTime is not set
        When I open the time selection modal
        Then the modal state should have isTimeSelectionModelOpen as true
        And the timeType should be "start time"
        And the startTime should be the converted time of the current date

    Scenario: Open time selection modal for "end time" without selectedEndTime
        Given the type is "end time"
        And the selectedEndTime is not set
        When I open the time selection modal
        Then the modal state should have isTimeSelectionModelOpen as true
        And the timeType should be "end time"
        And the endTime should be the converted time of the current date