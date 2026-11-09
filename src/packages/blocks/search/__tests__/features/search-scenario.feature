Feature: search

    Scenario: User navigates to search
        Given I am a User loading search
        And I can leave the screen with out errors

    Scenario: Handle session response message
        Given the message ID is "SessionResponseMessage"
        When the message is handled
        Then the handleSessionResponse method should be called

    Scenario: Handle rest API response message
        Given the message ID is "RestAPIResponceMessage"
        When the message is handled
        Then the handleRestApiResponse method should be called

    Scenario: Successful API response
        Given a message with a successful API response
        When the handleRestApiResponse function is called
        Then it should process the response without error

    Scenario: Error in API response
        Given a message with an error in the API response
        When the handleRestApiResponse function is called
        Then it should process the error without crashing

    Scenario: Handle session response with user type as 'end_user'
        Given a session response message with a token and role_id 1
        When the message is handled
        Then the state should be updated with userType as 'end_user', requestDate as 'Request Date', and token
        And the request list should be fetched

    Scenario: Handle session response with user type as 'notary'
        Given a session response message with a token and role_id other than 1
        When the message is handled
        Then the state should be updated with userType as 'notary', requestDate as 'Date', and token
        And the request list should be fetched

    Scenario: No responseJson, errorResponse present
        Given the responseJson is null
        And the apiRequestCallId is "someApiCallId"
        And there is an errorResponse
        When the handleApiResponse function is called
        Then it should call the handleErrorResponse function with the apiRequestCallId and errorResponse

    Scenario: Valid response for apiRequestListCallId
        Given the responseJson is valid
        And the apiRequestCallId is "apiRequestListCallId"
        When the handleApiResponse function is called
        Then it should call the manageRequestListData function with the responseJson

    Scenario: Valid response for apiNotaryServiceCallId
        Given the responseJson is valid
        And the apiRequestCallId is "apiNotaryServiceCallId"
        When the handleApiResponse function is called
        Then it should call the handleNotaryServiceResponse function with the responseJson

    Scenario: Valid response for apiCancellationChargeCallId
        Given the responseJson is valid
        And the apiRequestCallId is "apiCancellationChargeCallId"
        When the handleApiResponse function is called
        Then it should call the showModelOfCancelForInprogress function with the responseJson

    Scenario: Valid response for apiCancelRequestCallId
        Given the responseJson is valid
        And the apiRequestCallId is "apiCancelRequestCallId"
        When the handleApiResponse function is called
        Then it should call the handleCancelRequestResponse function with the responseJson

    Scenario: Valid error response and matching apiRequestCallId
        Given there is a valid errorResponse
        And the apiRequestCallId is "apiRequestListCallId"
        When the handleErrorResponse function is called
        Then it should set isLoader to false
        And it should set pageNo to 1

    Scenario: Invalid error response (null or undefined)
        Given the errorResponse is null
        And the apiRequestCallId is "apiRequestListCallId"
        When the handleErrorResponse function is called
        Then it should not update the state

    Scenario: Non-matching apiRequestCallId
        Given there is a valid errorResponse
        And the apiRequestCallId is "someOtherApiCallId"
        When the handleErrorResponse function is called
        Then it should not update the state

    Scenario: Valid message ID and myData exists
        Given the message ID is "NavigationPayLoadMessage"
        And the message has valid custom data
        When the storeMDataValue function is called
        Then it should update the state with comingFromType set to the custom data type

    Scenario: Valid message ID but myData is missing
        Given the message ID is "NavigationPayLoadMessage"
        And the custom data is missing
        When the storeMDataValue function is called
        Then it should not update the state

    Scenario: User is an end-user
        Given the user is an end-user
        When the getNotaryRequests function is called
        Then it should return the end user notary requests

    Scenario: Coming from type is new
        Given the coming from type is new
        When the getNotaryRequests function is called
        Then it should return the new notary requests

    Scenario: Coming from type is ongoing
        Given the coming from type is ongoing
        When the getNotaryRequests function is called
        Then it should return the ongoing notary requests

    Scenario: Default case when coming from type is not new or ongoing
        Given the coming from type is neither new nor ongoing
        When the getNotaryRequests function is called
        Then it should combine and sort the requests

    Scenario: Combine and sort requests when both ongoing and new requests are present
        Given the response contains both ongoing and new notary requests
        When the combineAndSortRequests function is called
        Then it should return the combined and sorted list of notary requests by id in descending order

    Scenario: Combine and sort when only ongoing requests are present
        Given the response contains only ongoing notary requests
        When the combineAndSortRequests function is called
        Then it should return only the ongoing requests sorted by id in descending order

    Scenario: Combine and sort when only new requests are present
        Given the response contains only new notary requests
        When the combineAndSortRequests function is called
        Then it should return only the new requests sorted by id in descending order

    Scenario: Combine and sort when no requests are present
        Given the response contains no notary requests
        When the combineAndSortRequests function is called
        Then it should return an empty list

    Scenario: Scroll reaches the bottom of the content for the first time
        Given the content is being scrolled
        When the scroll reaches the bottom
        Then the isScrollAtBottom state should be set to true
        And onScrollToBottom should be called once

    Scenario: Scroll does not reach the bottom
        Given the content is being scrolled
        When the scroll does not reach the bottom
        Then the isScrollAtBottom state should remain false
        And onScrollToBottom should not be called

    Scenario: Scroll already at the bottom
        Given the content is already scrolled to the bottom
        When the scroll event occurs again
        Then onScrollToBottom should not be called again

    Scenario: Transaction length is 10 and triggers fetching more transactions
        Given the transaction length is 10
        When the user scrolls to the bottom of the list
        Then the page number should be incremented by 1
        And the getTransactions function should be called with correct url parameters

    Scenario: Transaction length is not 10 and no new transactions are fetched
        Given the transaction length is not 10
        When the user scrolls to the bottom of the list
        Then the page number should remain unchanged
        And the getTransactions function should not be called

    Scenario: User clicks on avatar icon to navigate the menu
        Given the avatar icon is visible
        When the user clicks on the avatar icon
        Then a navigation menu message should be sent with the correct props

    Scenario: User triggers reset of state and fetching data
        Given the initial state is not reset
        When the user triggers the reset and fetch action
        Then the state should be reset to the default values
        And the request list data should be fetched with constructed parameters

    Scenario: User types into the search field
        Given the user starts with an empty search query
        When the user types a new query "hello"
        Then the search query state should be updated with "hello"
        And the resetStateAndFetchData function should not be called

    Scenario: User clears the search field
        Given the user has already typed "hello" into the search field
        When the user clears the search field
        Then the search query state should be updated with an empty string
        And the resetStateAndFetchData function should be called

    Scenario: User presses the search button
        Given the user has entered search criteria
        When the user presses the search button
        Then the state should be updated with default values
        And the getRequestListData function should be called with the correct query parameters

    Scenario: Find matching service and return truncated name
        Given the available services include a service with value 1 and label "Notary Service A"
        When the user searches for service with value 1 and truncates to 10 characters
        Then the truncated service name should be "Notary Ser"

    Scenario: No matching service found
        Given the available services do not include a service with value 99
        When the user searches for service with value 99
        Then the result should be an empty string

    Scenario: Find matching service but truncates to a smaller length
        Given the available services include a service with value 1 and label "Notary Service A"
        When the user searches for service with value 1 and truncates to 5 characters
        Then the truncated service name should be "Notar"

    Scenario: Open dropdown for a selected service
        Given the dropdown is initially closed
        When the user selects a service at index 1
        Then the dropdown should be visible
        And the selected service should be set to 1

    Scenario: Close the dropdown
        Given the dropdown is visible with a selected service
        When the user closes the dropdown
        Then the dropdown should be hidden
        And the selected service should be null

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
        Then the action item list should be the default menu items invite

        
    Scenario: Menu width for end user role
        Given the user role is "end_user"
        When the getMenuWidth function is called
        Then the menu width should be 160

    Scenario: Menu width for other roles
        Given the user role is "admin"
        When the getMenuWidth function is called
        Then the menu width should be 175

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
        Then the reject Invite request
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

    Scenario: Redirect to cancel page with pending status
        Given the component is mounted
        When I call redirectPage with key "cancel", requestId "12345", and status "pending"
        Then closeToggleDropDown should be called
        And isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state
        And isCancelRequestModelOpen should be set to true after a delay

    Scenario: Redirect to cancel page with non-pending status
        Given the component is mounted
        When I call redirectPage with key "cancel", requestId "12345", and status "in progress"
        Then closeToggleDropDown should be called
        And isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state
        And getCancelCharge should be called with the requestId

    Scenario: User presses the Book Now button
        Given the component is mounted
        When the user presses the Book Now button
        Then a new message should be created with NavigationNewNotaryRequestMessage
        And the message should contain NavigationPropsMessage with the component's props

    Scenario: User changes the bottom tab
        Given the component is mounted
        When the user selects a tab with key 123
        Then a new message should be created with the key 123
        And the message should contain NavigationPropsMessage with the component's props

    Scenario: User clicks on "No" to close the cancel request modal
        Given the cancel request modal is open
        When the user presses the "No" button
        Then the cancel request modal should be closed

    Scenario: User clicks "Yes" to proceed with the cancel request
        Given the cancel request modal is open
        When the user presses the "Yes" button
        Then the cancel request modal should be closed
        And the API to cancel the request should be called

    Scenario: User clicks on the filter icon to open the filter page
        Given the filter page is closed
        When the user presses the filter icon
        Then the filter page should be opened

    Scenario: User closes the filter page
        Given the filter page is open
        When the user presses the close button
        Then the filter page should be closed

    Scenario: Successfully selecting a priority filter
        Given the component is rendered
        When the user selects a priority filter
        Then the selected priority filter in the state should be updated

    Scenario: Successfully selecting a request status filter
        Given the component is rendered
        When the user selects a request status filter
        Then the selected request status filter in the state should be updated

    Scenario: Successfully resetting the filter and fetching data
        Given the component is rendered
        When the user presses the reset filter button
        Then the filters in the state should be reset
        And it should fetch the request list data with default parameters

    Scenario: Successfully applying the filter and fetching data
        Given the component is rendered
        When the user presses the apply filter button
        Then the state should update with applied filters
        And it should fetch the filtered request list data

    Scenario: Successfully opening the calendar modal
        Given the component is rendered
        When the user presses the open calendar button
        Then the calendar modal should be visible

    Scenario: Button should be enabled when at least one filter is selected
        Given the component is rendered with selectedRequestStatusFilter as "completed"
        When the user checks if the button is enabled
        Then the button should be enabled

    Scenario: Button should be disabled when no filters are selected
        Given the component is rendered with all filters unset
        When the user checks if the button is enabled
        Then the button should be disabled

    Scenario: Selecting a service updates the selected service type
        Given the component is rendered
        When the user selects a service
        Then the selected service type should be updated

    Scenario: Opening the service dropdown
        Given the component is rendered
        When the user opens the services dropdown
        Then the dropdown should be marked as open

    Scenario: Closing the service dropdown
        Given the dropdown is open
        When the user closes the services dropdown
        Then the dropdown should be marked as closed

    Scenario: Selecting a single date
        Given the component is rendered
        When the user selects a single date
        Then the selected date type should be set to "request"

    Scenario: Selecting a range of dates
        Given the component is rendered
        When the user selects a range of dates
        Then the selected date type should be set to "completion"

    Scenario: Closing the calendar modal
        Given the calendar modal is open
        When the user presses the close calendar button
        Then the calendar modal should be closed
        And the selected date type should be cleared

    Scenario: Selecting a start date
        Given the start date is not set
        When the user selects a day
        Then the start date should be set to the selected date
        And the end date should be cleared

    Scenario: Selecting an end date
        Given the start date is set
        And the end date is not set
        When the user selects a day that is after the start date
        Then the end date should be set to the selected date

    Scenario: Resetting the start date
        Given the start date is set
        And the end date is set
        When the user selects a new start date that is before the current start date
        Then the start date should be updated to the new selected date
        And the end date should be cleared

    Scenario: Selecting both start and end dates
        Given the start date and end date are selected
        When the user confirms the date selection
        Then the selected date range should be formatted and set
        And the calendar should close

    Scenario: Start date or end date is not selected
        Given the start date is not selected or end date is null
        When the user confirms the date selection
        Then the selected date range should not be set
        And the calendar should remain open

    Scenario: Filter with a different urgency
        Given the selected priority filter is null
        When the user selects a new urgency level
        Then the state should be updated with the new urgency level
        And the data fetching should be triggered with the corresponding image

    Scenario: Filter with the same urgency
        Given the selected priority filter is set to "high"
        When the user selects the same urgency level
        Then the state should be updated with the urgency level
        And the data fetching should be triggered without an image

    Scenario: Component mounts and triggers necessary methods
        Given the component is mounted
        Then the method getToken should be called
        And the method getNotaryServieData should be called
        And the navigation listener for "willFocus" should be added

    Scenario: Navigation "willFocus" triggers reloading of data
        Given the component is mounted
        When the "willFocus" event is triggered
        Then the request list should be reset
        And the method getRequestListData should be called with the correct parameters

    Scenario: Call API with initial state and fetch request list data
        Given the initial state variables are set to default values
        When the callRequestListDataApi function is called
        Then it should reset the page number to 1
        And it should clear the request list data
        And it should set the loader to true
        And it should call the getRequestListData method with the correct query parameters

    Scenario: Error JSON has errors and matches the apiCancellationChargeCallId
        Given there is an error JSON with errors
        And the apiRequestCallId is for cancellation charge
        When handleErrorMessage is called
        Then isCancellactionErrorPopup state should be set to true
        And cancellationError state should be set to the provided error JSON

    Scenario: Error JSON has errors but does not match apiCancellationChargeCallId
        Given there is an error JSON with errors
        And the apiRequestCallId is for another API
        When handleErrorMessage is called
        Then isCancellactionErrorPopup state should not be set to true
        And cancellationError state should not be set to the provided error JSON

    Scenario: Error JSON has no errors
        Given there is an error JSON without errors
        And any apiRequestCallId
        When handleErrorMessage is called
        Then isCancellactionErrorPopup state should not be set to true
        And cancellationError state should remain unchanged

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

    Scenario: Handle a response with errors
        Given the API response contains "errors"
        When the response is processed by showModelOfCancelForInprogress
        Then the handleErrorMessage function should be called with the response

    Scenario: Handle a response with cancellation charges
        Given the API response contains "cancellation_charges"
        When the response is processed by showModelOfCancelForInprogress
        Then the isModelVisible state should be set to false
        And after a delay, the CancellationCharge state should be set to the response
        And after a delay, the isCancelRequestModelOpen state should be set to true

    Scenario: Successful notification Request response
        Given a successful notification Request API response
        When the handleRestApiResponse function is called
        Then the handleNotifiactionResponse function should be called

    Scenario: Successful completeProfile Request response
        Given a successful completeProfile Request API response
        When the handleRestApiResponse function is called
        Then the handlecompleteProfileResponse function should be called

    Scenario: Display red notification image for unread notifications
        Given there are unread notifications
        When the getNotificationImage function is called
        Then the red notification image should be returned

    Scenario: Display default notification image when all notifications are read
        Given there are no unread notifications
        When the getNotificationImage function is called
        Then the default notification image should be returned

    Scenario: User clicks on notification icon to navigate the notification
        Given the notification icon is visible
        When the user clicks on the notification icon
        Then a navigation notification message should be sent with the correct props

    Scenario: Extract abbreviation from a string containing parentheses
        Given a string "Example (ABC)"
        When the getAbbreviation function is called
        Then the result should be "Example "

    Scenario: Handle string without parentheses
        Given a string "Example"
        When the getAbbreviation function is called
        Then the result should be an empty string

    Scenario: Get action item list for a new invite
        Given the invite data type is "New Invite"
        When I fetch the action item list with any quote status ID
        Then it should return the menu items for invites


    Scenario: Get action item list for other user roles
        Given the user role ID is not 2 and the invite data type is not "New Invite"
        When I fetch the action item list with any quote status ID
        Then it should return the default menu items

    Scenario: User is a notary and invite type is "New Invite"
        Given the invite type is "New Invite"
        And the user's role ID is 2 (Notary)
        When the getActionItemList function is called
        Then the menu items for notary invites should be returned

    Scenario: User is not a notary and invite type is "New Invite"
        Given the invite type is "New Invite"
        And the user's role ID is not 2
        When the getActionItemList function is called
        Then the menu items for general invites should be returned

    Scenario: User selects the "Reject" option
        Given the dropdown is open
        And the key is "Reject"
        And the requestId is "REQ123"
        And the status is "Pending"
        And the requestDate is "2025-01-28"
        And the notarisation method is "Online"
        When the redirectPage function is called
        Then the dropdown should be closed
        And the model visibility should be set to false
        And the notaryRequestId should be set to "REQ123"
        And the selectedRequestStatus should be set to "Pending"
        And after 1 second, the "onViewReject" should be true
        And the "requestId" should be "REQ123"

    Scenario: The response contains a message
        Given the response contains a message
        When getRejectReponse is called
        Then callRequestListDataApi should be triggered

    Scenario: The response does not contain a message
        Given the response does not contain a message
        When getRejectReponse is called
        Then callRequestListDataApi should not be triggered

    Scenario: Handling cancel request with non-pending status
        Given the key is "cancel" and status is not "pending"
        When redirectPage is called
        Then getCancelCharge should be called with the correct requestId

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

    Scenario: Successful reject Request response
        Given a successful reject Request API response
        When the handleRestApiResponse function is called
        Then the getRejectReponse function should be called

    Scenario: Closing the success message modal
        Given the success message modal is open
        When closeSucessMsgModel is called
        Then the success message modal should be closed

    Scenario: User is an end user and Invite tab is selected
        Given the user is an end user and the Invite tab is selected
        Then the function should return requestOfInvite

    Scenario: User is an end user and New Requests tab is selected
        Given the user is an end user and the New Requests tab is selected
        Then the function should return requestOfNewRequest

    Scenario: User is not an end user and New Requests tab is selected
        Given the user is not an end user and the New Requests tab is selected
        Then the function should return requestOfNewRequest

    Scenario: User is not an end user and Invites tab is selected
        Given the user is not an end user and the Invites tab is selected
        Then the function should return requestOfInvite

    Scenario: User is not an end user and selects an undefined tab
        Given the user is not an end user and selects an undefined tab
        Then the function should return requestOfOngoing

    Scenario: User is an End User
        Given a response JSON for an End User
        When getRequestLists is called with isEndUser as true
        Then it should return updated request lists for the end user

    Scenario: User is a Notary User
        Given a response JSON for a Notary User
        When getRequestLists is called with isEndUser as false
        Then it should return updated request lists for the notary user

    Scenario: Handles null or undefined API response gracefully
        Given a null API response
        When manageRequestListData is called with null
        Then it should not update the state