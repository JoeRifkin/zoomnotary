Feature: TransactionHistory

    Scenario: User navigates to TransactionHistory
        Given I am a User loading TransactionHistory it will load with out errors

        When transaction history api is called with out any errors
        Then user can see the list of transactions 

        When user enter the wrong id for searching
        Then hit search icon and will see the transaction not found

        When user taps on the back arrow
        Then he will go back to the previous screen

     Scenario: Set state and trigger onScrollToBottom when scrolled to the bottom
        Given I am scrolling to the bottom of the content
        When I handle the scroll event
        Then the state should be updated to indicate scroll is at the bottom
        And the onScrollToBottom function should be called

    Scenario: Do not update state or trigger onScrollToBottom if not scrolled to the bottom
        Given I am scrolling but not to the bottom of the content
        When I handle the scroll event
        Then the state should not be updated
        And the onScrollToBottom function should not be called
        

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

    Scenario: Closing the filter page
        Given the filter page is open
        When the user presses the close filter button
        Then the filter page should be closed

    Scenario: Opening the filter page
        Given the filter page is closed
        When the user presses the second image button
        Then the filter page should be opened

    Scenario: Navigating back
        When the user presses the go back button
        Then the goBack function should be called

    Scenario: User presses the back button
        Given the user is on the current screen
        When the user presses the back button
        Then the navigation should go back to the previous screen

    Scenario: User selects a day filter
        Given the current selected day filter is empty
        When the user selects a day filter
        Then the selected day filter should be updated with the chosen filter

    Scenario: User selects a payment status filter
        Given the current selected payment status is empty
        When the user selects a payment status filter
        Then the selected payment status should be updated with the chosen filter

    Scenario: Rendering style on iOS
        Given the operating system is iOS
        When the style of the date-time field is rendered
        Then it should return the "paddTopBott" style

    Scenario: Rendering style on Android or other OS
        Given the operating system is Android
        When the style of the date-time field is rendered
        Then it should return the "padd" style

    Scenario: Opening the calendar modal
        Given the calendar modal is closed
        When the user presses the open calendar button
        Then the calendar modal should open

    Scenario: Closing the calendar modal
        Given the calendar modal is open
        When the user presses the close calendar button
        Then the calendar modal should close and reset date-related state

    Scenario: Resetting filters
        Given the user has applied some filters
        When the user presses the reset filter button
        Then all filters should be reset and transactions should be fetched with filter "ALL"

    Scenario: Applying filters
        Given the filter page is open
        When the user presses the apply filter button
        Then the filter page should close

    Scenario: Formatting a valid date string
        Given a valid date string "2024-09-06T00:00:00.000Z"
        When the date is formatted
        Then the formatted date should be "06/09/2024"

    Scenario: Formatting a date string with a single-digit day and month
        Given a valid date string "2024-01-03T00:00:00.000Z"
        When the date is formatted
        Then the formatted date should be "03/01/2024"

    Scenario: Updating formatted start date
        Given the component state has no start or end date
        When a date "2024-09-06T00:00:00.000Z" is passed to updateFormattedDateRange
        Then the returned formatted start date should be "06/09/2024"

    Scenario: Selecting a single date
        Given the selectedDateType is "single"
        And a selected date "2024-09-06T00:00:00.000Z"
        When the user presses the Done button on date select
        Then the selectedDateRange should be "06/09/2024"
        And the calendar modal should be closed

    Scenario: Selecting a date range
        Given the selectedDateType is "range"
        And the startDate is "2024-09-01T00:00:00.000Z"
        And the endDate is "2024-09-10T00:00:00.000Z"
        When the user presses the Done button on date select
        Then the selectedDateRange should be "01/09/2024 - 10/09/2024"
        And the calendar modal should be closed

    Scenario: Done button enabled for single date selection
        Given the selectedDateType is "single"
        When checking if the Done button is enabled
        Then the Done button should be enabled

    Scenario: Done button enabled for date range selection
        Given the selectedDateType is "range"
        When checking if the Done button is enabled
        Then the Done button should be enabled

    Scenario: Done button disabled with incomplete date information
        Given the selectedDateType is "single"
        When checking if the Done button is enabled
        Then the Done button should be disabled

    Scenario: Done button disabled with incomplete date range
        Given the selectedDateType is "range"
        When checking if the Done button is enabled
        Then the Done button should be disabled
    
    Scenario: Selecting a single date in model
        Given the initial state is set
        When the user selects the single date option
        Then the selectedDateType should be single

    Scenario: Selecting a date range in model
        Given the initial state is set
        When the user selects the date range option
        Then the selectedDateType should be "range"

    Scenario: Selecting a single date new
        Given the selectedDateType is "single"
        And the initial state is set
        When the user presses a day
        Then the selected date should be updated to that day

    Scenario: Selecting a start date for a date range
        Given the selectedDateType is "range"
        And the initial state is set with no start date
        When the user presses a day to select as start date
        Then the start date should be updated to that day

    Scenario: Selecting an end date for a date range
        Given the selectedDateType is "range"
        And the initial state is set with a start date
        When the user presses a day after the start date to select as end date
        Then the end date should be updated to that day

    Scenario: Re-selecting a new start date
        Given the selectedDateType is "range"
        And the initial state is set with both start and end dates
        When the user presses a new day to select as start date
        Then the start date should be updated to that day
        And the end date should be reset to null

    Scenario: Selecting a new start date earlier than the existing start date
        Given the selectedDateType is "range"
        And the initial state is set with a start date and an end date
        When the user presses a new day that is earlier than the existing start date
        Then the start date should be updated to the new earlier day
        And the end date should be reset to null

    Scenario: Marking a single selected date
        Given the selectedDateType is "single"
        And the selectedDate is "2024-09-10"
        When I get the marked dates
        Then the marked dates should include "2024-09-10" with selected properties

    Scenario: Marking a date range
        Given the selectedDateType is "range"
        And the startDate is "2024-09-01"
        And the endDate is "2024-09-05"
        When I get the marked dates
        Then the marked dates should include dates from "2024-09-01" to "2024-09-05" with selected properties

    Scenario: No dates are marked
        Given the selectedDateType is "single"
        And there is no selectedDate
        When I get the marked dates
        Then the marked dates should be empty

    Scenario: No dates are marked for incomplete range
        Given the selectedDateType is "range"
        And the startDate is "2024-09-01"
        And there is no endDate
        When I get the marked dates
        Then the marked dates should be empty

    Scenario: Check if any filter is applied
        Given the initial state is set with selectedPaymentStatus as "Paid", selectedDateType as "single", selectedDateRange as "2024-09-01", and selectedDayFilter as null
        When the user checks if the filter is applied
        Then the result should be true

    Scenario: Check if no filter is applied
        Given the initial state is set with all filters as null
        When the user checks if the filter is applied
        Then the result should be false

    Scenario: Check if only payment status is selected for filter
        Given the initial state is set with selectedPaymentStatus as "Paid" and other filters as null
        When the user checks if payment status filter is selected
        Then the result should be true

    Scenario: Check if day type is selected for filter
        Given the initial state is set with selectedDayFilter as "Weekend" and other filters as null
        When the user checks if day type filter is selected
        Then the result should be true

    Scenario: Check if date range is selected for filter
        Given the initial state is set with selectedDateType as "range" and selectedDateRange as "2024-09-01 to 2024-09-15" and other filters as null
        When the user checks if date range filter is selected
        Then the result should be true

    Scenario: History list is showing
        Given the initial state contains a list of transactions
        When the user checks if the history list is showing
        Then the result should be true

    Scenario: History list is not showing
        Given the initial state contains no transactions
        When the user checks if the history list is showing
        Then the result should be false

    Scenario: User enters text in the search field
        Given the initial state is set with an empty search query
        When the user types "some text" in the search field
        Then the searchQuery should be updated to "some text"

    Scenario: User clears the search field
        Given the initial state is set with a search query of "some text"
        When the user clears the search field
        Then the searchQuery should be an empty string
        And the pageNumber should be reset to 1
        And the transactions should be reset to an empty array
        And the transactionLength should be reset to 0
        And the getTransactions method should be called with the query "?filter=ALL"

    Scenario: User performs a search with a valid query
        Given the initial state is set with a search query "12345"
        When the user initiates a search
        Then the loading state should be set to true
        And the pageNumber should be reset to 1
        And the transactions should be reset to an empty array
        And the transactionLength should be reset to 0
        And the getTransactions method should be called with the URL parameter "?order_id=12345"

    Scenario: User type is 1
        Given the userType is 1
        When the title of the header is retrieved
        Then it should return the payment title from the config JSON

    Scenario: User type is not 1
        Given the userType is not 1
        When the title of the header is retrieved
        Then it should return the transaction history title from the config JSON

    Scenario: Successfully handling token and user type
        Given a message contains a valid token
        And userProfileData is available in storage
        When the token and user type are handled
        Then it should set the token in the component's state
        And it should set the user type from userProfileData

    Scenario: No userProfileData in storage
        Given a message contains a valid token
        And userProfileData is not available in storage
        When the token and user type are handled
        Then it should set the token in the component's state
        And it should set an empty user type

    Scenario: User presses the Apply Filter button with valid input
        Given the filter button is enabled
        And the selected payment status is "Paid"
        And the search query is "12345"
        And the request start date is "2024-01-01"
        And the request end date is "2024-01-31"
        When the user presses the Apply Filter button
        Then the filter page should close
        And the loader should be shown
        And the transactions should be cleared
        And the transaction length should be reset to 0
        And the getTransactions function should be called with the correct parameters

    Scenario: User selects "today"
        Given today's date is "2024-12-13"
        When the user selects "today"
        Then the request start date should be "2024-12-13"
        And the request end date should be "2024-12-13"

    Scenario: User selects "7days"
        Given today's date is "2024-12-13"
        When the user selects "7days"
        Then the request start date should be "2024-12-06"
        And the request end date should be "2024-12-13"

    Scenario: User selects "30days"
        Given today's date is "2024-12-13"
        When the user selects "30days"
        Then the request start date should be "2024-11-13"
        And the request end date should be "2024-12-13"

    Scenario: User selects "90days"
        Given today's date is "2024-12-13"
        When the user selects "90days"
        Then the request start date should be "2024-09-14"
        And the request end date should be "2024-12-13"

    Scenario: User selects an invalid key
        When the user selects "invalidKey"
        Then the request start date should be empty
        And the request end date should be empty