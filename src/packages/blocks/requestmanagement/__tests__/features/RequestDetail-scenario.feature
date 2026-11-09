Feature: RequestDetail

    Scenario: User navigates to RequestDetail
        Given I am a User loading RequestDetail
        When I navigate to the RequestDetail
        Then RequestDetail will load with out errors
        And Get token function shoudl be called
        And Get received request api should be called in first render
        When Network responed for received request api
        Then ReceivedRequests state should be update
        When User click on accept button to accept request
        Then Accept request review api should be call
        Then Network responed for accept request review api
        When User click on reject button
        Then User enter reason to reject
        And User submit request review to reject
        And User click on cancel button to close modal
        And Network responed for reject request review api
        When User click on delete request button
        Then Network responed for delete request review api
        When User enter request id in input field to filter
        Then Input field value should be update
        When User press on view button to view request
        Then View request modal should be opened
        When User press on sent request button to navigate
        Then Navigation should be call

        When Call api for get Request Detail data without error
        Then request detail api given sucess response without error

    Scenario: User clicks on the tab
        Given the initial selected tab is "overview"
        When the user clicks on the "settings" tab
        Then the selected tab should be "settings"

    Scenario: Toggle signatory state when the same index is selected
        Given the current signatory index is 1
        And the selected signatory index is 1
        When the onUpDownArrowOfSignatory function is called with index 1
        Then the isSignatoryOpen state should toggle

    Scenario: Open a new signatory when a different index is selected
        Given the current signatory index is 1
        And the selected signatory index is 2
        When the onUpDownArrowOfSignatory function is called with index 2
        Then the isSignatoryOpen state should be true
        And the selectedSignnatoryIndex should be 2

    Scenario: Get up arrow image when signatory is open and index matches
        Given the signatory is open
        And the selected signatory index is 1
        When the getArrowImgUpDown function is called with index 1
        Then the result should be imgRequestUpArrow

    Scenario: Get down arrow image when signatory is not open
        Given the signatory is not open
        And the selected signatory index is 1
        When the getArrowImgUpDown function is called with index 1
        Then the result should be imgRequestDownArrow

    Scenario: Get down arrow image when index does not match
        Given the signatory is open
        And the selected signatory index is 1
        When the getArrowImgUpDown function is called with index 2
        Then the result should be imgRequestDownArrow

    Scenario: Signatory name is visible when index matches and signatory is open
        Given the signatory is open
        And the selected signatory index is 1
        When the isSignatoryNameVisible function is called with index 1
        Then the result should be true

    Scenario: Signatory name is not visible when signatory is not open
        Given the signatory is not open
        And the selected signatory index is 1
        When the isSignatoryNameVisible function is called with index 1
        Then the result should be false

    Scenario: Signatory name is not visible when index does not match
        Given the signatory is open
        And the selected signatory index is 1
        When the isSignatoryNameVisible function is called with index 2
        Then the result should be false

    Scenario: Handle apiCancellationChargeCallId
        Given an apiRequestCallId of "apiCancellationChargeCallId"
        And a responseJson with cancellation charges
        When the manageApiResponse function is called
        Then the CancellationCharge state should be set
        And the isCancelRequestModelOpen state should be true

    Scenario: Handle apiCancelRequestCallId
        Given an apiRequestCallId of "apiCancelRequestCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the cancelRequestRes state should be set

    Scenario: Handle apiQuoteListCallId
        Given an apiRequestCallId of "apiQuoteListCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the quoteListData state should be set

    Scenario: Handle apiQuoteStatusListCallId
        Given an apiRequestCallId of "apiQuoteStatusListCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the quoteStatusList state should be set

    Scenario: Handle apiWithdrawQuoteCallId
        Given an apiRequestCallId of "apiWithdrawQuoteCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the selectedQuoteId state should be set as blank

    Scenario: Handle apiCallToCheckDocuSignStartedID
        Given an apiRequestCallId of "apiCallToCheckDocuSignStartedID"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the docuSignDetail state should be set

    Scenario: Handle apiCallStartDocuSignID
        Given an apiRequestCallId of "apiCallStartDocuSignID"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the startDocumentId state should be set

    Scenario: Handle getKycVerificationStatusCallId
        Given an apiRequestCallId of "getKycVerificationStatusCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the getKycVerificationStatusCallId state should be set

    Scenario: Handle getUnreadMessageCallId
        Given an apiRequestCallId of "getUnreadMessageCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the getUnreadMessageCallId state should be set

    Scenario: Handle createChatRoomApiCallId
        Given an apiRequestCallId of "createChatRoomApiCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the createChatRoomApiCallId state should be set

    Scenario: Handle unhandled API request call ID
        Given an apiRequestCallId of "unknownCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called

    Scenario: When request status is pending
        Given the request status is "pending"
        When the cancel request button is pressed
        Then the isCancelRequestModelOpen state should be true

    Scenario: When request status is not pending
        Given the request status is "in progress"
        When the cancel request button is pressed
        Then the getCancelCharge function should be called

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

    Scenario: Extract signatory names from FileDocument
        Given a FileDocument with recipients
        When I call getIsSignatoryObject
        Then I should get an array of signatory names

    Scenario: Cancel request button should be visible
        Given the selected action type is 'cancel'
        And the request status is 'pending'
        When I check if the cancel request button is visible
        Then the cancel request button should be visible

    Scenario: Cancel request button should not be visible
        Given the selected action type is 'cancel'
        And the request status is 'in progress'
        When I check if the cancel request button is visible
        Then the cancel request button should not be visible

    Scenario: Cancel request button should not be visible for completed status
        Given the selected action type is 'cancel'
        And the request status is 'completed'
        When I check if the cancel request button is visible
        Then the cancel request button should not be visible

        Then returns completedStatusDetailView for completed status
        Then returns draftStatusDetailView for draft status
        Then returns pendingStatusDetailView for pending status
        Then returns cancelledStatusDetailView for cancelled status
        Then returns inprogressStatusDetailView for unknown status

    Scenario: Truncate text when it exceeds the specified length
        Given a text with length exceeding the specified limit
        When the truncatedText function is called
        Then it should return truncated text with the specified length

   
    Scenario: Do not truncate text when it does not exceed the specified length
        Given a text with length not exceeding the specified limit
        When the truncatedText function is called
        Then it should return the original text

    Scenario: File name with multiple slashes
        Given a file path "path/to/the/file/document.txt"
        When I get the selected file name
        Then the selected file name should be "document.txt"

    Scenario: File name without slashes
        Given a file path "document.txt"
        When I get the selected file name
        Then the selected file name should be "document.txt"

    Scenario: File name with special characters
        Given a file path "path/to/the/file/another_document-2024.txt"
        When I get the selected file name
        Then the selected file name should be "another_document-2024.txt"

    Scenario: Pressing the request detail button
        Given the requestId is "12345"
        And the props are set
        When I press the request detail button
        Then it should send a navigation message with the request details
        And the actionType should be "view"

    Scenario: Convert a valid date string to 12-hour time format
        Given the date string "2024-08-16T18:30:00.000Z"
        When the getConverteTime function is called
        Then the result should be "06:30 PM"

    Scenario: Convert another valid date string to 12-hour time format
        Given the date string "2024-08-16T09:15:00.000Z"
        When the getConverteTime function is called
        Then the result should be "09:15 AM"

    Scenario: Handle undefined date input
        Given the date string is undefined
        When the getConverteTime function is called
        Then the result should be undefined

     Scenario: Convert a valid date string to DD/MM/YYYY format
        Given the date string "2024-08-16T18:30:00.000Z"
        When the getConverteDate function is called
        Then the result should be "16/08/2024"

    Scenario: Convert another valid date string to DD/MM/YYYY format
        Given the date string "2024-01-05T09:15:00.000Z"
        When the getConverteDate function is called
        Then the result should be "05/01/2024"


    Scenario: Trigger onPress in cancelPreviewModel
        Given the cancelPreviewModel is defined
        When the onPress method is called
        Then the closePreviewQuoteModel function should be called

    Scenario: Set state when preview button is clicked
        Given a QuoteData item and a number
        When the onClickPreviewBtn method is called with the item and number
        Then the state should be updated with isPreviewQuoteModel true, previewQuoteDetail as the item, and quoteNumber as the number

    Scenario: User role is notary and request status is pending
        Given the user role type is "notary"
        And the request status is "pending"
        When the isMakeQuoteBtnVisible method is called
        Then the result should be true

    Scenario: User role is not notary
        Given the user role type is "client"
        And the request status is "pending"
        When the isMakeQuoteBtnVisible method is called
        Then the result should be false

    Scenario: Request status is not pending
        Given the user role type is "notary"
        And the request status is "completed"
        When the isMakeQuoteBtnVisible method is called
        Then the result should be false

    Scenario: Make Quote button should be visible
        Given the quote list data with the status not equal to "Submitted"
        Then the Make Quote button should be visible

    Scenario: Make Quote button should not be visible
        Given the quote list data with the status equal to "Submitted"
        Then the Make Quote button should not be visible

    Scenario: Order Quote view should be visible
        Given the quote list data is available and has items
        When the showOrderQuoteView function is called
        Then the Order Quote view should be visible

    Scenario: Order Quote view should not be visible
        Given the quote list data is not available or empty
        When the showOrderQuoteView function is called
        Then the Order Quote view should not be visible

    Scenario: Quote number should be visible
        Given the key is "quotes" and the quote list data is available with items
        When the showQuoteNumber function is called with the key "quotes"
        Then the quote number should be visible

    Scenario: Quote number should not be visible due to key mismatch
        Given the key is not "quotes"
        When the showQuoteNumber function is called with the mismatched key
        Then the quote number should not be visible

    Scenario: Quote number should not be visible due to empty quote list data
        Given the key is "quotes" and the quote list data is empty
        When the showQuoteNumber function is called with the key "quotes"
        Then the quote number should not be visible

    Scenario: Pay Now button is pressed
        Given the component is rendered with initial state
        When the Pay Now button is pressed
        Then the state should be updated to close the preview quote model
        And a navigation message should be sent with the correct data

    Scenario: Calculate total fees when previewQuoteDetail is present
        Given the previewQuoteDetail state is set with notary fees "100" and platform fees "50"
        When the getTotalFees function is called
        Then the total fees should be "10"

    Scenario: Return undefined when previewQuoteDetail is not present
        Given the previewQuoteDetail state is not set
        When the getTotalFees function is called
        Then the result should be undefined

    Scenario: Successfully update selected tab to "overview"
        Given the component is rendered
        When I call the updateTabs function
        Then the state should have "selectedTab" set to "overview"

    Scenario: Meeting data is available
        Given the component is rendered with meeting data
        When I call the isMeetingDataAvailable function
        Then it should return true

    Scenario: Meeting data is not available
        Given the component is rendered without meeting data
        When I call the isMeetingDataAvailable function
        Then it should return false

    Scenario: Tracking details are available
        Given the component is rendered with tracking data
        When I call the isTrackingDetailAvailable function
        Then it should return true

    Scenario: Tracking details are not available
        Given the component is rendered without tracking data
        When I call the isTrackingDetailAvailable function
        Then it should return false

    Scenario: KYC details are available
        Given the component is rendered with KYC data
        When I call the isKYCDetailAvailable function
        Then it should return true

    Scenario: KYC details are not available
        Given the component is rendered without KYC data
        When I call the isKYCDetailAvailable function
        Then it should return false

    Scenario: DocuSign details are available
        Given the component is rendered with DocuSign data
        When I call the isDocuSignDetailAvailable function
        Then it should return true

    Scenario: DocuSign details are not available
        Given the component is rendered without DocuSign data
        When I call the isDocuSignDetailAvailable function
        Then it should return false

    Scenario: Toggle isNotifyMins from false to true
        Given the component is rendered with isNotifyMins as false
        And notifyMinsProps.isChecked is false
        When I press the notify mins button
        Then isNotifyMins should be true
        And notifyMinsProps.isChecked should be true

    Scenario: Toggle isNotifyMins from true to false
        Given the component is rendered with isNotifyMins as true
        And notifyMinsProps.isChecked is true
        When I press the notify mins button
        Then isNotifyMins should be false
        And notifyMinsProps.isChecked should be false

    Scenario: Update isNotifyMins and notifyMinsProps.isChecked to true
        Given the component is rendered
        And notifyMinsProps.isChecked is false
        When I change the notify mins value to true
        Then isNotifyMins should be true
        And notifyMinsProps.isChecked should be true

    Scenario: Update isNotifyMins and notifyMinsProps.isChecked to false
        Given the component is rendered
        And notifyMinsProps.isChecked is true
        When I change the notify mins value to false
        Then isNotifyMins should be false
        And notifyMinsProps.isChecked should be false

    Scenario: Open Zoom meeting popup
        Given the component is rendered
        And isZoomMeetingModel is initially false
        When I press the join meeting button
        Then isZoomMeetingModel should be true

    Scenario: Close Zoom meeting popup using closeZoomMeetingPopup function
        Given the component is rendered
        And isZoomMeetingModel is initially true
        When I close the Zoom meeting popup
        Then isZoomMeetingModel should be false

    Scenario: Close Zoom meeting popup using cancelMeetingPopup button
        Given the component is rendered
        And isZoomMeetingModel is initially true
        When I press the cancel meeting button
        Then isZoomMeetingModel should be false

    Scenario: Component mounts on web platform
        Given the platform is web
        When componentDidMount is called
        Then getToken should be called once
        And no navigation listener should be added

    Scenario: Component mounts on non-web platform
        Given the platform is not web
        When componentDidMount is called
        Then getToken should be called twice
        And a navigation listener should be added
        And updateTabs should be called when willFocus event fires

    Scenario: Show cancellation charge amount when conditions are met
        Given the component is rendered
        And CancellationCharge is set
        And requestData status is "in progress"
        When I check if the cancellation charge amount should be shown
        Then the result should be true

    Scenario: Do not show cancellation charge amount when conditions are not met
        Given the component is rendered
        And CancellationCharge is not set
        And requestData status is not "in progress"
        When I check if the cancellation charge amount should be shown
        Then the result should be false

    Scenario: Return true for end_user user type
        Given the component is rendered
        And userRoleType is "end_user"
        When I check the user type
        Then the result should be true

    Scenario: Return false for non-end_user user type
        Given the component is rendered
        And userRoleType is not "end_user"
        When I check the user type
        Then the result should be false

    Scenario: Return meetingViewOpacity when opacityView is true
        Given the component is rendered
        And opacityView is true
        When I get the opacity style
        Then the result should be "meetingViewOpacity"

    Scenario: Return lessmeetingViewOpacity when opacityView is false
        Given the component is rendered
        And opacityView is false
        When I get the opacity style
        Then the result should be "lessmeetingViewOpacity"

    Scenario: Sorts the quote list data by created_at in descending order
        Given a list of quotes with different created_at dates
        When the sortQuoteListData function is called
        Then the quotes should be sorted by created_at in descending order
        And the state quoteListData should be updated with the sorted list

    Scenario: User clicks the Cancel button to withdraw a quote
        Given the component is mounted
        When the user clicks the Cancel button with quoteId "12345"
        Then the state "isWithdrawQuote" should be true
        And the state "selectedQuoteId" should be "12345"

    Scenario: User cancels the withdraw action
        Given the component is mounted
        When the user triggers the cancel withdraw action
        Then the state "isWithdrawQuote" should be false
        And the state "selectedQuoteId" should be an empty string

    Scenario: User presses the Withdraw Quote No button
        Given the component is mounted
        When the user presses the Withdraw Quote No button
        Then the method "onCancelWithdraw" should be called

    Scenario: User presses the Withdraw Quote Yes button
        Given the component is mounted
        When the user presses the Withdraw Quote Yes button
        Then the method "withdrawQuoteYes" should be called

    Scenario: User presses the Go Back to Dashboard button
        Given the component is mounted
        When the user presses the Go Back to Dashboard button
        Then a Message instance should be created with NavigationDashboardMessage type

    Scenario: User presses the Go Back to Search button
        Given the component is mounted
        When the user presses the Go Back to Search button
        Then a Message instance should be created with NavigationDashboardMessage type
        
    Scenario: Call make quote API when onPress is triggered
        Given the component is mounted
        When the onPress function is triggered
        Then it should call the callApiForMakeQuote method

    Scenario: Proceed button is enabled
        Given the proceed button is enabled
        When I press the proceed button
        Then the proceed API should be called

    Scenario: Quote status is submitted
        Given the quote data has a status of submitted
        When I check if the quote status is submitted
        Then the result should be true

    Scenario: Quote status is not submitted
        Given the quote data has a status other than submitted
        When I check if the quote status is submitted
        Then the result should be false

    Scenario: Start and end time are provided
        Given the quote data has a valid start and end time
        When I get the converted start and end time format for view
        Then it should return the formatted start and end time string

    Scenario: Toggling the notify value on button press
        Given the notify value is unchecked
        When I press the button to toggle the notify value
        Then the notify value should be toggled to checked

    Scenario: Setting the notify value to true via onChangeValue
        Given the notify value can be changed
        When I set the notify value to true
        Then the notify value should be set to true

    Scenario: Setting the notify value to false via onChangeValue
        Given the notify value can be changed
        When I set the notify value to false
        Then the notify value should be set to false

    Scenario: Toggling the notify Data on button press
        Given the notify Data is unchecked
        When I press the button to toggle the notify Data
        Then the notify Data should be toggled to checked

    Scenario: Setting the notify Data to true via onChangeValue
        Given the notify Data can be changed
        When I set the notify Data to true
        Then the notify Data should be set to true

    Scenario: Setting the notify Data to false via onChangeValue
        Given the notify Data can be changed
        When I set the notify Data to false
        Then the notify Data should be set to false

    Scenario: User role is end_user
        Given the user role type is "end_user"
        When I call getUserTypeStyle
        Then I should receive "endUserViewTab"

    Scenario: User role is not end_user
        Given the user role type is "notary"
        When I call getUserTypeStyle
        Then I should receive "notaryUserViewTab"

    Scenario: User toggles the up/down arrow of DocuSign for the selected index
        Given the current state is set with the selected DocuSign index as 0 and isDocuSignOpen is false
        When the user toggles the arrow for index 0
        Then the isDocuSignOpen state should be true
        And the selectedDocuSignForStartIndex should be 0

    Scenario: User selects a different index for DocuSign
        Given the current state is set with the selected DocuSign index as 0
        When the user toggles the arrow for index 1
        Then the isDocuSignOpen state should be true
        And the selectedDocuSignForStartIndex should be 1

    Scenario: Arrow image changes based on index
        Given the DocuSign panel is open for index 0
        When the user checks the arrow image for index 0
        Then the up arrow image should be displayed

        Given the DocuSign panel is not open for index 1
        When the user checks the arrow image for index 1
        Then the down arrow image should be displayed

    Scenario: Visibility of DocSign name for selected index
        Given the DocuSign panel is open for index 0
        When the user checks the visibility of DocSign name for index 0
        Then it should be visible

        Given the DocuSign panel is not open for index 1
        When the user checks the visibility of DocSign name for index 1
        Then it should not be visible

    Scenario: User type allows filtering of DocuSign data
        Given the user is of a type that can filter DocuSign data
        And a valid response with document signing statuses is provided
        When the DocuSign list is fetched according to the user type
        Then the state should be updated with filtered DocuSign data

    Scenario: User type does not allow filtering of DocuSign data
        Given the user is of a type that cannot filter DocuSign data
        And a valid response with document signing statuses is provided
        When the DocuSign list is fetched according to the user type
        Then the state should be updated with unfiltered DocuSign data

    Scenario: Show End User Button when conditions are met
        Given the user is an end user
        And the document has at least one signatory who has not signed
        When determining if the End User button should be shown
        Then the result should be true

    Scenario: Do not show End User Button when conditions are not met
        Given the user is not an end user
        When determining if the End User button should be shown
        Then the result should be false

    Scenario: Show Notary User Button when conditions are met
        Given the user is not an end user
        And not all signatories and notaries have signed
        When determining if the Notary User button should be shown
        Then the result should be true

    Scenario: Disable Notary Button when conditions are met
        Given there is at least one signatory who has not signed
        When determining if the Notary button should be disabled
        Then the result should be true

    Scenario: All signatories and notaries have signed
        Given all signatories and notaries have signed
        When checking if all parties have signed
        Then the result should be true

    Scenario: All signatories and notaries have signed check
        Given the document signing details are provided
        When checking if all parties have signed for mark complete
        Then the result should be true

    Scenario: Some signatories or notaries have not signed
        Given the document signing details are provided
        When checking if all parties have signed for mark complete
        Then the result should be false

    Scenario: No document signing details are provided
        Given the document signing details are null
        When checking if all parties have signed for mark complete
        Then the result should be undefined

    Scenario: Sorting the quote list data
        Given I have a list of quotes
        When I sort the quotes by the creation date in descending order
        Then the quotes should be sorted with the most recent first
        And the sorted list should be set in the state

    Scenario: Sorting and checking for DocuSign started when request is in progress
        Given I have a list of quotes
        And the request status is in progress
        When I sort the quotes
        Then the quotes should be sorted
        And DocuSign check should be triggered

    Scenario: Getting background color for signed state
        Given a document is signed
        When I check the background color for signed status
        Then it should return the signed background color
        When I check the background color for signed status false
        Then it should return the signed background color false

    Scenario: Getting text color for signed state
        Given a document is signed
        When I check the text color for signed status
        Then it should return the signed text color
        When I check the text color for signed status false
        Then it should return the signed text color false

    Scenario: Getting signed status text
        Given a document is signed
        When I check the signed status
        Then it should return "SIGNED"
        When I check the signed status false
        Then it should return "SIGNED" false

    Scenario: Getting button color based on notary button disabled state
        Given the notary button is disabled
        When I check the button color
        Then it should return the disabled button color

    Scenario: Start the DocuSign process for a notary
        Given I have a document signing status detail
        When I call the start DocuSign process
        Then it should initiate the API call to start the DocuSign process

    Scenario: Pressing button with selected document in state
        Given the user has selected a document
        When the user presses the start button
        Then the API call for starting DocuSign should be triggered

    Scenario: Pressing button without selected document in state
        Given the user has not selected a document
        When the user presses the start button
        Then the API call for starting DocuSign should not be triggered

    Scenario: Redirect when signing URLs are present
        Given the DocuSign response contains signing URLs
        When the redirectPageToDocuSign function is called
        Then a message to navigate to the DocuSign page should be sent with the required data

    Scenario: Do not redirect when signing URLs are absent
        Given the DocuSign response does not contain signing URLs
        When the redirectPageToDocuSign function is called
        Then no navigation message should be sent

    Scenario: Button color for end user
        Given the user role type is 'end_user'
        When the getBtnColorToEnable function is called
        Then the button color should be 'btnDisableColorView'

    Scenario: Button color for other users
        Given the user role type is not 'end_user'
        When the getBtnColorToEnable function is called
        Then the button color should be 'btnBackGColorView'

    Scenario: Show Mark Completed when conditions are met
        Given the selected tab is 'signing'
        And the docuSignDetail array is not empty
        When the isShowMarkCompleted function is called
        Then it should return true

    Scenario: Do not show Mark Completed when selected tab is not 'signing'
        Given the selected tab is not 'signing'
        When the isShowMarkCompleted function is called
        Then it should return false

    Scenario: Do not show Mark Completed when docuSignDetail is empty
        Given the selected tab is 'signing'
        And the docuSignDetail array is empty
        When the isShowMarkCompleted function is called
        Then it should return false

    Scenario: DocSign name for Notary and Signature is visible
        Given the docuSignOpenStates at index 1 is true
        When the isDocSignNameForNotartyAnsSigVisible function is called with index 1
        Then it should return true

    Scenario: DocSign name for Notary and Signature is not visible
        Given the docuSignOpenStates at index 0 is false
        When the isDocSignNameForNotartyAnsSigVisible function is called with index 0
        Then it should return false

    Scenario: Filter tabs with a specific status and without RIN request type
        Given the request data status is in progress
        When the getFilterTabs function is called

    Scenario: Filter tabs with a specific status and with RIN request type
        Given the request data status is 'completed'
        When the getFilterTabs function is called
        Then it should return the filtered tabs that include 'completed' and exclude 'signing'

    Scenario: No request data status is available
        Given the request data status is undefined
        When the getFilterTabs function is called
        Then it should return an empty array

    Scenario: Tabs are available in the filter
        Given the filter tabs are available
        When the updateTabs function is called
        Then the onClickOfTab function should be called with 'overview' and tab index 0

    Scenario: No tabs are available in the filter
        Given the filter tabs are not available
        When the updateTabs function is called
        Then the onClickOfTab function should not be called

    Scenario: Truncate a long file name
        Given the file name is "example_of_a_really_long_filename.txt"
        When the file name is truncated
        Then the result should be "...ly_long_filename.txt"

    Scenario: Do not truncate a short file name
        Given the file name is "short_name.txt"
        When the file name is truncated
        Then the result should be "short_name.txt"

    Scenario: Return selected tab border style when key matches selectedTab
        Given selectedTab is home
        When the tabViewStyle function is called with key home
        Then it should return tabBorder

    Scenario: Return unselected tab border style when key does not match selectedTab
        Given selectedTab is home
        When the tabViewStyle function is called with key profile
        Then it should return unselectedTabBorder

    Scenario: Return selected tab text style when key matches selectedTab
        Given selectedTab is home
        When the tabViewStyleTxt function is called with key home
        Then it should return selectedTabsText

    Scenario: Return unselected tab text style when key does not match selectedTab
        Given selectedTab is home
        When the tabViewStyleTxt function is called with key profile
        Then it should return unselectedTabsText

    Scenario: Selected tab has the correct style
        Given the selected tab key is "tab1"
        When the tabViewStyleCheck function is called with "tab1"
        Then it should return "tabBorderCheck"

    Scenario: Unselected tab has the correct style
        Given the selected tab key is "tab1"
        When the tabViewStyleCheck function is called with "tab2"
        Then it should return "unselectedTabBorderCHeck"

    Scenario: Selected tab text has the correct style
        Given the selected tab key is "tab1"
        When the tabViewStyleTxtCheck function is called with "tab1"
        Then it should return "selectedTabsTextCheck"

    Scenario: Unselected tab text has the correct style
        Given the selected tab key is "tab1"
        When the tabViewStyleTxtCheck function is called with "tab2"
        Then it should return "unselectedTabsTextCheck"

    Scenario: Filter tabs are available
        Given filter tabs are available
        And the "status" is not "in progress"
        When the updateTabs function is called
        Then the onClickOfTab function should be called with arguments "overview" and 0
        And callToCheckDocuSignStarted and getKycVerificationStatus should not be called

    Scenario: Status is "in progress" and filter tabs are available
        Given filter tabs are available
        And the "status" is "in progress"
        When the updateTabs function is called
        Then the onClickOfTab function should be called with arguments "overview" and 0
        And the callToCheckDocuSignStarted and getKycVerificationStatus functions should be called

    Scenario: Status is "in progress" and no filter tabs are available
        Given no filter tabs are available
        And the "status" is "in progress"
        When the updateTabs function is called
        Then the onClickOfTab function should not be called
        And the callToCheckDocuSignStarted and getKycVerificationStatus functions should be called

    Scenario: No filter tabs available and status is not "in progress"
        Given no filter tabs are available
        And the "status" is not "in progress"
        When the updateTabs function is called
        Then none of onClickOfTab, callToCheckDocuSignStarted, or getKycVerificationStatus functions should be called

    Scenario: KYC status is null and key is "meeting" or "signing"
        Given the KYC status is null
        And the key is "meeting"
        When the onClickOfTab function is called
        Then the selectedTab state should not change
        And scrollToIndex should not be called on the FlatList

    Scenario: KYC status is not null and key is not "meeting" or "signing"
        Given the KYC status is not null
        And the key is "overview"
        And the index is 0
        When the onClickOfTab function is called
        Then the selectedTab state should be updated to "overview"
        And scrollToIndex should be called on the FlatList with index 0

    Scenario: KYC status is null but key is not "meeting" or "signing"
        Given the KYC status is null
        And the key is "overview"
        And the index is 0
        When the onClickOfTab function is called
        Then the selectedTab state should be updated to "overview"
        And scrollToIndex should be called on the FlatList with index 0

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
        When the response is processed by handleCancellactionChargeApiResponse
        Then the handleErrorMessage function should be called with the response

    Scenario: Handle a response with cancellation charges
        Given the API response contains "cancellation_charges"
        When the response is processed by handleCancellactionChargeApiResponse
        Then the CancellationCharge state should be set to the response
        And the isCancelRequestModelOpen state should be set to true

    Scenario: Prevent tab change for specific conditions
        Given the kycStatus status is "null" or "pending"
        And the key is "meeting"
        When onClickOfTab is triggered
        Then the selectedTab state should not change
        And scrollToIndex should not be called

    Scenario: Handle create chat room API response
        Given I have a Chat component with a handleCreateChatRoomApiRes method
        When handleCreateChatRoomApiRes is called with a valid response
        Then the state should be updated with chatId, chatName, and currentAccountId
        And getMessageData should be called
        And webSocketConnection should be established

    Scenario: handleMessage updates the state with the new message
        Given I have a Chat component with a handleMessage method
        When handleMessage is called with a new message
        Then the state should be updated with the new message

    Scenario: onClickMessageIconProps functionality
        Given I have a component with onClickMessageIconProps defined
        When the onPress function is triggered
        Then the state should reset newReceivedMessage to an empty string
        Then a new Message should be created with correct data
        Then the send method should be called with the created Message

    Scenario: messageCount.count is greater than 0
        Given I have a component with messageCount and newReceivedMessage in state
        When showMessageIconWithRed is called
        Then it should return true if messageCount.count is greater than 0

    Scenario: messageCount.count is 0 and newReceivedMessage is an empty string
        Given messageCount.count is 0 and newReceivedMessage is an empty string
        When showMessageIconWithRed is called
        Then it should return false

    Scenario: newReceivedMessage is a non-empty string
        Given newReceivedMessage is a non-empty string
        When showMessageIconWithRed is called
        Then it should return true

    Scenario: Handle getMarkCompletedCallId
        Given an apiRequestCallId of "getMarkCompletedCallId"
        And a responseJson with notary response
        When the manageApiResponse function is called
        Then the getMarkCompletedCallId state should be set

    Scenario: Handle Mark as Completed API response
        Given I have a valid response with no errors
        When handleMarkAsCompletedApiRes is called with the valid response
        Then the state should be updated to indicate success
        And getRequestDetail should be called with the correct request ID
        And closeCustomMessage should be called after 5000 ms

    Scenario: Error in API response
        Given I have a response with an error
        When handleMarkAsCompletedApiRes is called with the error response
        Then the state should be updated to indicate the error
        And getRequestDetail should not be called

    Scenario: Successfully close the custom message
        Given I have a component with a closeCustomMessage method
        When I call the closeCustomMessage method
        Then the component state should reset specific properties

    Scenario: All conditions are met
        Given all conditions for marking as complete are satisfied
        When I call the isMarkAsCompleteBtnClickable method
        Then the method should return true

    Scenario: Some conditions are not met
        Given not all conditions for marking as complete are satisfied
        When I call the isMarkAsCompleteBtnClickable method
        Then the method should return false

    Scenario: Meeting end date is in the past
        Given the meeting end date is in the past
        When I call the checkMeetingEndDate method
        Then the method should return true

    Scenario: Meeting end date is in the future
        Given the meeting end date is in the future
        When I call the checkMeetingEndDate method
        Then the method should return false

    Scenario: Meeting end date is not provided
        Given there is no meeting end date
        When I call the checkMeetingEndDate method
        Then the method should return false

    Scenario: Mark as Complete button is clickable
        Given the Mark as Complete button is clickable
        When I press the button
        Then the state should set isMarkCompleteModelOpen to true

    Scenario: Mark as Complete button is not clickable
        Given the Mark as Complete button is not clickable
        When I press the button
        Then the state should not set isMarkCompleteModelOpen to true

    Scenario: Close the Mark Completed Model
        Given the Mark Completed model is open
        When I call closeMarkCompletedModel
        Then the state should set isMarkCompleteModelOpen to false

    Scenario: Call Mark as Complete API and close the model
        Given the Mark Completed model is open
        When I call callMarkAsComplete
        Then the state should set isMarkCompleteModelOpen to false
        And callApiForMarkAsComplete should be invoked

    Scenario: Invite request status is "invite"
        Given the request data contains an invite request
        When the renderStatusView function is called
        Then the function should return "invitedStatusView"

    Scenario: Invite request status is "rejected"
        Given the request data contains an invite request
        When the renderStatusView function is called
        Then the function should return "rejectedStatusView"

    Scenario: Invite request status is neither "invite" nor "rejected"
        Given the request data contains an invite request
        When the renderStatusView function is called
        Then the function should return "acceptedStatusView"

    Scenario: Request status is "completed"
        Given the request data does not contain an invite request
        When the renderStatusView function is called
        Then the function should return "completedStatusView"

    Scenario: Request status is "draft"
        Given the request data does not contain an invite request
        When the renderStatusView function is called
        Then the function should return "draftStatusView"
    
    Scenario: Request status is "pending"
        Given the request data does not contain an invite request
        When the renderStatusView function is called
        Then the function should return "pendingStatusView"

    Scenario: Request status is "cancelled"
        Given the request data does not contain an invite request
        When the renderStatusView function is called
        Then the function should return "cancelledStatusView"

    Scenario: Request status is neither "completed", "draft", "pending", nor "cancelled"
        Given the request data does not contain an invite request
        When the renderStatusView function is called
        Then the function should return "inprogressStatusView"

    Scenario: The invite request is rejected
        Given the request data contains an invite request
        When showNoteForQuoteTabInviteRejected is called
        Then it should return true
        And User can view and download files

    Scenario: Retrieve VAT fees when available
        Given the previewQuoteDetail contains a valid vat_fee
        When the getVatFees function is called
        Then it should return the correct VAT fee

    Scenario: Return 0 when vat_fee is missing
        Given the previewQuoteDetail does not contain a vat_fee
        When the getVatFees function is called
        Then it should return 0
        And Notary can decline the request
