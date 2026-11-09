Feature: dashboard

    Scenario: User navigates to dashboard
        Given I am a User loading dashboard
        When I navigate to the dashboard
        Then dashboard will load with out errors
        Then i can click on avatar icon with out errors
        Then i can click on Book now button with out errors
        When Call api for get Request list data without error
        Then request list api given sucess response without error
        When Call api for get Services data without error
        Then Services api given sucess response without error
        When Call api for get request count without error
        Then request api given sucess response without error
        And I can leave the screen with out errors

    Scenario: Handling session response successfully
        Given the message contains valid session response data
        When handleSessionResponse is called
        Then the user profile data should be stored in local storage
        And the dashboard data should be fetched

    Scenario: Handle REST API response
        Given a REST API response message
        When the message is received
        Then the appropriate state should be updated based on the API call ID

    Scenario: Sorting and filtering dashboard data
        Given a response JSON with data
        When the handleDashboardItemResponse function is called with the response JSON
        Then the dashboard data should be sorted and filtered correctly

    Scenario: Sorting and filtering new request data
        Given a response JSON with data
        When the handleNewRequestDataResponse function is called with the response JSON
        Then the new request data should be sorted and filtered correctly

    Scenario: Display alert when function call which is not complete
        Given I have the function which is not complete
        When I call the goToSeeAllYourRequest function
        Then I should see an alert with the message "Coming Soon"

        When I call the goToSeeAllNewOrOnGoingRequest function
        Then I should see an alert with the message "Coming Soon"

        When I call the goToSeeAllServices function
        Then I should see an alert with the message "Coming Soon"

        When I call the gotoSelectedRequest function
        Then I should see an alert with the message "Coming Soon"

        When I call the gotoInviteClient function
        Then I should see an alert with the message "Coming Soon"

        When I call the gotoSelectedCompleteProfile function
        Then I should see an alert with the message "Coming Soon"

        When I call the gotoModifyYourServices function
        Then I should see an alert with the message "Coming Soon"

    Scenario: Rendering menu items for a specific status
        Given I have a list of menu items
        When I render the menu items with a status value
        Then I should see menu items corresponding to that status

    Scenario: Service found and text is truncated
        Given the services list contains a service with id 2 and name "Business and Corporate Services"
        When I call getNotaryServiceValue with id 2 and charLength 10
        Then the result should be "Business a"

    Scenario: Service not found
        Given the services list does not contain a service with id 5
        When I call getNotaryServiceValue with id 5 and charLength 10
        Then the result should be null

    Scenario: Truncate text when it exceeds the specified length
        Given a text with length exceeding the specified limit
        When the truncatedText function is called
        Then it should return truncated text with the specified length

    Scenario: Do not truncate null text
        Given a null text
        When the truncatedText function is called
        Then it should return an empty string

    Scenario: Do not truncate text when it does not exceed the specified length
        Given a text with length not exceeding the specified limit
        When the truncatedText function is called
        Then it should return the original text

    Scenario: Exiting the app on back button click
        Given the user wants to exit the app
        When the user clicks the back button
        Then the app should exit

    Scenario: Service icon detail is not null and has a URL
        Given a service icon detail with a URL "https://example.com/icon.png"
        When the getServiceIconUrl function is called
        Then it should return "https://example.com/icon.png"

    Scenario: Service icon detail is null
        Given a null service icon detail
        When the getServiceIconUrl function is called
        Then it should return an empty string

    Scenario: Service icon detail is not null but has no URL
        Given a service icon detail without a URL
        When the getServiceIconUrl function is called
        Then an empty string should be returned

    Scenario: User role contains a profile
        Given the user role contains a profile
        When the function is called
        Then the user profile data should be stored in AsyncStorage

    Scenario: User role does not contain a profile but sign up details are present in AsyncStorage
        Given the user role does not contain a profile
        And the sign up details are present in AsyncStorage
        When the function is called
        Then the user detail should be stored in AsyncStorage with a null photo URL
        
    Scenario: User role does not contain a profile and no sign up details in AsyncStorage
        Given the user role does not contain a profile
        And there are no sign up details in AsyncStorage
        When the function is called
        Then AsyncStorage should not be updated

    Scenario: Successfully fetch user detail data from storage
        Given the storage has user profile data
        When the user detail data is fetched
        Then the state should be updated with the user profile data

    Scenario: No user profile data in storage
        Given the storage has no user profile data
        When the user detail data is fetched
        Then the state should be updated with an empty object

    Scenario: Get notary completed request count
        Given the user is a notary
        And the request count data is available
        When the getCompletedRequestCount function is called
        Then the notary completed request count should be returned

    Scenario: Get user completed request count
        Given the user is not a notary
        And the request count data is available
        When the getCompletedRequestCount function is called
        Then the user completed request count should be returned

    Scenario: Handling response with ongoing requests and end user requests
        Given the user is an "end_user"
        When the response JSON contains notary ongoing requests and end user requests
        Then the loading state should be false
        And the dashboard data should contain the latest 10 end user requests
        And the outgoing request data should contain up to 3 ongoing requests with status "in progress"
        And the request date should be "Request Date"

    Scenario: Handling response with no ongoing requests
        Given the user is an "end_user"
        When the response JSON contains no notary ongoing requests
        Then the outgoing request data should be empty

    Scenario: Handling response with different user role
        Given the user is a "notary"
        When the response JSON contains end user notary requests
        Then the request date should be "Date"

    Scenario: Redirect to view page
        Given the dropdown is open
        When the user selects the "view" option
        Then the dropdown should close
        And a navigation message should be sent

    Scenario: Redirect to withdraw page
        Given the dropdown is open
        When the user selects the "withdraw" option
        Then the dropdown should close
        And a navigation message should be sent

    Scenario: Redirect to edit page
        Given the dropdown is open
        When the user selects the "edit" option
        Then the dropdown should close
        And a navigation message should be sent

    Scenario: Redirect to accept page
        Given the dropdown is open
        When the user selects the "Accept" option
        Then the dropdown should close
        And a navigation message should be sent

    Scenario: Redirect to submit quote page
        Given the dropdown is open
        When the user selects the "submit quote" option
        Then the dropdown should close
        And a navigation message should be sent

    Scenario: Redirect to RequestManagement page
        Given the dropdown is open
        When the user selects the "message" option
        Then the dropdown should close
        And a navigation message should be sent

    Scenario: Do not redirect for other keys
        Given the dropdown is open
        When the user selects an option other than "view"
        Then the dropdown should close
        And no navigation message should be sent

    Scenario: User is an end user
        Given the user role type is "end_user"
        When I call the getMenuItemList function
        Then I should receive the menu items for end users

    Scenario: User is not a notary
        Given the user role type is not "end_user"
        When I call the getMenuItemList function
        Then I should receive the menu items for notaries

    Scenario: Sorting and filtering dashboard Response
        Given a response JSON with data
        When the handleDashboardResponseInDetail function is called with the response JSON
        Then the dashboard data should be sorted and filtered correctly

    Scenario: Sorting and filtering new request Response
        Given a response JSON with data
        When the handleRequestDataResponseInDetail function is called with the response JSON
        Then the new request data should be sorted and filtered correctly

        Then returns completedStatusTxt for completed status
        Then returns draftStatusTxt for draft status
        Then returns pendingStatusTxt for pending status
        Then returns cancelledStatusTxt for cancelled status
        Then returns inprogressStatusTxt for unknown status

        Then returns cardBorderRightColorForInProgressDetail for Standard status
        Then returns cardBorderRightColorForDraftPendingCancelledDetail for Priority status
        Then returns cardBorderRightColorForCompletedDetail for unknown status

        Then returns completedStatusViewDetail for completed status
        Then returns draftStatusViewDetail for draft status
        Then returns pendingStatusViewDetail for pending status
        Then returns cancelledStatusViewDetail for cancelled status
        Then returns inprogressStatusViewDetail for unknown status

    Scenario: Rendering menu items for end_user with status "Pending"
        Given the user role is "end_user"
        And the request ID is "12345"
        When the status is "Pending"
        Then I should see the following menu items:
        | text    |
        | View    |
        | Edit    |
        | Meeting Link |
        | Message |
        | Cancel  |
        | Delete  |

    Scenario: Rendering menu items for notary with status "Pending"
        Given the user role is "notary"
        And the request ID is "12345"
        When the status is "Pending"
        Then I should see the following menu items:
        | text         |
        | View         |
        | Submit Quote |
        | Withdraw Quote |
        | Meeting Link |
        | Month        |

    Scenario: Service found and text is truncated data
        Given the services list contains a service with id 2 and name "Business and Corporate Services"
        When I call getNotaryServiceData with id 2 and charLength 10
        Then the result should be "Business a"

    Scenario: Service not found data
        Given the services list does not contain a service with id 5
        When I call getNotaryServiceData with id 5 and charLength 10
        Then the result should be null

    Scenario: Truncate text when it exceeds the specified length data
        Given a text with length exceeding the specified limit
        When the truncatText function is called
        Then it should return truncated text with the specified length

    Scenario: Do not truncate null text data
        Given a null text
        When the truncatText function is called
        Then it should return an empty string

    Scenario: Do not truncate text when it does not exceed the specified length data
        Given a text with length not exceeding the specified limit
        When the truncatText function is called
        Then it should return the original text


    Scenario: Close the cancel request model
        Given the cancel request model is open
        When the close cancel request model function is called
        Then the isCancelRequestModelOpen state should be false

    Scenario: Pressing no to changes button
        Given the cancel request model is open
        When the no to changes button is pressed
        Then the isCancelRequestModelOpen state should be false

    Scenario: Pressing yes proceed to changes button
        Given the cancel request model is open
        When the yes proceed to changes button is pressed
        Then the isCancelRequestModelOpen state should be false
        And the callApiToCancelRequest function should be called

    Scenario: Successful Cancel Request response
        Given a successful Cancel Request API response
        When the handleRestApiResponse function is called
        Then the state should be updated with the cancelRequestRes data
        And the getRequestCountData function should be called

    Scenario: Successful notification Request response
        Given a successful notification Request API response
        When the handleRestApiResponse function is called
        Then the handleNotifiactionResponse function should be called

    Scenario: Successful reject Request response
        Given a successful reject Request API response
        When the handleRestApiResponse function is called
        Then the getRejectReponse function should be called

    Scenario: Redirect to cancel page with pending status
        Given the component is mounted
        When I call redirectPage with key "cancel", requestId "12345", and status "pending"
        Then closeToggleDropDown should be called
        And isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state
        And isCancelRequestModelOpen should be set to true after a delay

    Scenario: Redirect to reject request
        Given the component is mounted
        When I call redirectPage with key "reject", requestId "12345", and status "pending"
        Then isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state
        And onViewReject should be set to true after a delay

    Scenario: Redirect to cancel page with non-pending status
        Given the component is mounted
        When I call redirectPage with key "cancel", requestId "12345", and status "in progress"
        Then closeToggleDropDown should be called
        And isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state
        And getCancelCharge should be called with the requestId


    Scenario: Show cancellation model for in-progress with iOS
        Given the platform is iOS
        When I call the showModelOfCancelForInprogress function with a valid responseJson
        Then the model visibility should be set to false
        And the CancellationCharge should be set to the responseJson after a delay
        And the cancel request model should be open

    Scenario: Show cancellation model for in-progress with Android
        Given the platform is Android
        When I call the showModelOfCancelForInprogress function with a valid responseJson
        Then the model visibility should be set to false
        And the CancellationCharge should be set to the responseJson immediately
        And the cancel request model should be open

    Scenario: Selected action type is edit
        Given the selected action type is "edit"
        When I get the title of the notary flow page
        Then the title should be "Edit Notary Request"

    Scenario: Selected action type is not edit
        Given the selected action type is not "edit"
        When I get the title of the notary flow page
        Then the title should be "New Notary Request"

    Scenario: Menu width for end user role
        Given the user role is "end_user"
        When the getMenuWidth function is called
        Then the menu width should be 160

    Scenario: Menu width for other roles
        Given the user role is "admin"
        When the getMenuWidth function is called
        Then the menu width should be 175

    Scenario: Outgoing request
        Given the request is outgoing
        And the request is not from all requests
        When I get the bottom height
        Then it should return "margBotForRequest"

    Scenario: From all requests
        Given the request is not outgoing
        And the request is from all requests
        When I get the bottom height
        Then it should return "margBotForRequest"

    Scenario: Neither outgoing nor from all requests
        Given the request is not outgoing
        And the request is not from all requests
        When I get the bottom height
        Then it should return "nonMargBotForRequest"

    Scenario: Service name is provided and length is greater than 0
        Given the service name is "ExampleServiceNameThatIsLongerThanTwentyFiveCharacters"
        When I get the service name
        Then it should return "ExampleServiceNameThatIsLo..."

    Scenario: Service name is an empty string
        Given the service name is ""
        When I get the service name
        Then it should return ""

    Scenario: Service name is null
        Given the service name is null
        When I get the service name
        Then it should return ""

    Scenario: click on Book now button From popup
        Given the popup is open for slected notary service
        When the user presses the Book now button
        Then the popup will be close and redirect to another page

    Scenario: complete the profile
        Given I am a User loading dashboard
        When I navigate to the dashboard
        Then yet to completed list will load

    Scenario: Pressing the request detail button
        Given the requestId is "12345"
        And the props are set
        When I press the request detail button
        Then it should send a navigation message with the request details
        And the actionType should be "view"

    Scenario: Formatting the number zero
        Given the number is 0
        When I format the number
        Then I should get "00"

    Scenario: Formatting a single-digit number
        Given the number is 5
        When I format the number
        Then I should get "05"

    Scenario: Formatting a two-digit number
        Given the number is 12
        When I format the number
        Then I should get "12"

    Scenario: Notary user with quote status 2
        Given the user role type is "notary"
        And the quote status ID is 2
        When I get the action item list
        Then the action item list should exclude "withdraw"

    Scenario: Notary user with quote status null
        Given the user role type is "notary"
        And the quote status ID is null
        When I get the action item list
        Then the action item list should exclude "withdraw"

    Scenario: Notary user with a different quote status
        Given the user role type is "notary"
        And the quote status ID is 3
        When I get the action item list
        Then the action item list should exclude "submit"

    Scenario: End user with any quote status
        Given the user role type is "end_user"
        And the quote status ID is 2
        When I get the action item list
        Then the action item list should be the default menu items

    Scenario: End user with a previous date
        Given the user role type is "end_user"
        And the date is a previous date
        When I get the date color according to data
        Then the color should be "redColor"

    Scenario: End user with a future date
        Given the user role type is "end_user"
        And the date is a future date
        When I get the date color according to data
        Then the color should be "normalColor"

    Scenario: Notary user with any date
        Given the user role type is "notary"
        And the date is any date
        When I get the date color according to data
        Then the color should be "normalColor"

    Scenario: User presses the "See All Your Request" button
        Given the user is on the current screen
        When the user presses the "See All Your Request" button
        Then the bottom tab should navigate to the search tab

    Scenario: User clicks on "See All New Requests" button
        Given the user is on the main page
        When the user clicks on the "See All New Requests" button
        Then the navigation should occur with the parameter "new"

    Scenario: User clicks on "See All Ongoing Requests" button
        Given the user is on the main page
        When the user clicks on the "See All Ongoing Requests" button
        Then the navigation should occur with the parameter "ongoing"

    Scenario: User clicks on "See All Your Requests" button
        Given the user is on the main page
        When the user clicks on the "See All Your Requests" button
        Then the navigation should occur with the parameter "your"

    Scenario: Requests with pending status and completeProfileList is empty
        Given the response contains new notary requests with pending status
        And the completeProfileList is empty
        When the handleNewRequestDataResponse function is called
        Then it should filter the requests by pending status
        And it should set the newRequestData state with the filtered data

    Scenario: Requests with pending status and completeProfileList is not empty
        Given the response contains new notary requests with pending status
        And the completeProfileList is not empty
        When the handleNewRequestDataResponse function is called
        Then it should set the newRequestData state as an empty array

    Scenario: Navigating to a specific profile tab screen
        Given I have a valid ProfileStep item
        When I call selectCompleteProfileTab with the item
        Then a message is created with the correct screen
        And the message should contain the appropriate navigation properties
        And the send method should be called with the message

    Scenario: Navigating to the VAT Sales Tax screen
        Given I have a valid ProfileStep item with screen as NavigationVatSalesTaxMessage
        And I have a token and userRoleType in the state
        When I call selectCompleteProfileTab with the item
        Then the message should contain the token and role in the custom data
        And the send method should be called with the message

    Scenario: Close the cancellation error popup when OK is clicked
        Given the cancellation error popup is visible
        When the OK button is pressed
        Then isCancellactionErrorPopup state should be set to false
        And cancellationError state should be set to null

    Scenario: Format a valid cancellation number
        Given the cancellation number is "123.456"
        When the number is formatted
        Then the formatted cancellation number should be "123.46"

    Scenario: Format a cancellation number with no decimals
        Given the cancellation number is "123"
        When the number is formatted
        Then the formatted cancellation number should be "123.00"

    Scenario: Format a cancellation number with exactly two decimals
        Given the cancellation number is "123.40"
        When the number is formatted
        Then the formatted cancellation number should be "123.40"

    Scenario: Display cancellation error popup for matching API request call ID
        Given an error JSON with an "errors" field exists
        And the API request call ID matches apiCancellationChargeCallId
        When handleErrorMessage is triggered
        Then isModelVisible should be set to false immediately
        And after a delay, isCancellactionErrorPopup should be true
        And cancellationError should be set to the error JSON

    Scenario: Do not display error popup for non-matching API request call ID
        Given an error JSON with an "errors" field exists
        And the API request call ID does not match apiCancellationChargeCallId
        When handleErrorMessage is triggered
        Then the state should not change

    Scenario: Handle cancellation charge API response
        Given a message with a successful cancellation charge response
        When handleRestApiResponse is called
        Then isModelVisible should be set to false
        And after a delay, showModelOfCancelForInprogress should be called with the response JSON

    Scenario: Handle error response
        Given a message with an error response
        When handleRestApiResponse is called
        Then isModelVisible should be set to false
        And after a delay, handleErrorMessage should be called with the error JSON and API request call ID

    Scenario: Display red notification image for unread notifications
        Given there are unread notifications
        When the getNotificationImage function is called
        Then the red notification image should be returned

    Scenario: Display default notification image when all notifications are read
        Given there are no unread notifications
        When the getNotificationImage function is called
        Then the default notification image should be returned

    Scenario: See All button of notary services pressed
        When the "See All" button is pressed
        Then a navigation message to the catalogue Notary service should be sent
        And the navigation props should be added to the message

    Scenario: Extract abbreviation from a string containing parentheses
        Given a string "Example (ABC)"
        When the getAbbreviation function is called
        Then the result should be "ABC"

    Scenario: Handle string without parentheses
        Given a string "Example"
        When the getAbbreviation function is called
        Then the result should be an empty string

    Scenario: Extract text inside parentheses from a valid string
        Given a string "Example (ABC)"
        When the getAbbreviationForMethod function is called
        Then the result should be "ABC"

    Scenario: Handle empty string input
        Given an empty string
        When the getAbbreviationForMethod function is called
        Then the result should be an empty string

    Scenario: Handle string without parentheses new
        Given a string "Example"
        When the getAbbreviationForMethod function is called
        Then the result should be an empty string

    Scenario: Handle string with empty parentheses
        Given a string "Example ()"
        When the getAbbreviationForMethod function is called
        Then the result should be an empty string

    Scenario: Closing the success message modal
        Given the success message modal is open
        When closeSucessMsgModel is called
        Then the success message modal should be closed

    Scenario: Opening notifications via button press
        Given the user clicks on the notification button
        When openNotificationProps is triggered
        Then a notification navigation message should be sent

    Scenario: User proceeds to reject request
        Given the user clicks on the 'Yes' button to reject the request
        When yesProceedToRejectRequest is triggered
        Then the API to reject the request should be called
        And the modal should be closed

    Scenario: User cancels the rejection
        Given the user clicks on the 'No' button to cancel rejection
        When noProceedToRejectRequest is triggered
        Then the modal should be closed without rejecting the request
        And the API to reject request should not be called

    Scenario: Returns menu items for invite when user is a notary
        Given the user is on the 'Invites' tab and has role_id 2
        When getActionItemList is called
        Then it should return menuItemsInviteForNotary

    Scenario: Returns menu items for invite when user is not a notary
        Given the user is on the 'Invites' tab and does not have role_id 2
        When getActionItemList is called
        Then it should return menuItemsInvite

    Scenario: Toggling between Request and Invite tabs
        Given the user is on the Request tab
        When btnTabRequestAndInviteProps is pressed
        Then the Invite tab should be selected
        When btnTabRequestAndInviteProps is pressed again
        Then the Request tab should be selected again

    Scenario: Handling tab selection
        Given the user is on the dashboard
        When handleTabSelection is called with 'New Requests'
        Then the selectedTab should be 'New Requests' and selectedRequestTypeDataForNotary should be newRequestData
        When handleTabSelection is called with 'Invites'
        Then the selectedTab should be 'Invites' and selectedRequestTypeDataForNotary should be inviteRequestData
        When handleTabSelection is called with 'Outgoing Requests'
        Then the selectedTab should be 'Outgoing Requests' and selectedRequestTypeDataForNotary should be outgoingRequestData