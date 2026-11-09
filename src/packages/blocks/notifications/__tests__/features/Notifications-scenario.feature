Feature: Notifications

    Scenario: User navigates to Notifications
        Given I am a User loading Notifications
        When I navigate to the Notifications
        Then Notifications will load with out errors
        And I can leave the screen with out errors

     Scenario: User presses the Go Back to Dashboard button
        Given the component is mounted
        When the user presses the Go Back to Dashboard button
        Then a Message instance should be created with NavigationDashboardMessage type

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

    Scenario: Notifications length is 10 and triggers fetching more transactions
        Given the transaction length is 10
        When the user scrolls to the bottom of the list
        Then the page number should be incremented by 1
        And the getNotifications function should be called with correct url parameters

    Scenario: Notifications length is not 10 and no new transactions are fetched
        Given the transaction length is not 10
        When the user scrolls to the bottom of the list
        Then the page number should remain unchanged
        And the getNotifications function should not be called

    Scenario: Categorize notifications based on their created_at timestamps
        Given a list of notifications with different created_at timestamps
        When the filterNotifications function is called
        Then it should categorize the notifications into Today, Yesterday, 2 Days ago, 1 Week ago, 2 Week ago, 1 Month ago, and 1 Year ago lists
        And update the state with the categorized data

    Scenario: Determine background color based on read status
        Given a notification read status
        When the backGroundColor function is called
        Then it should return backNon if the notification is read
        And it should return backColor if the notification is unread

    Scenario: Show an empty message based on conditions
        Given the state with page number and notification empty message
        When the isShowEmptyMessage function is called
        Then it should return true if the page number is 1 and notification empty message is not empty
        And it should return false otherwise

    Scenario: Trigger mark all notifications as read
        Given the component is initialized
        When the onPress function of markAllReadProps is invoked
        Then the isLoader state should be set to true
        And the markAsRead function should be called with an empty string

    Scenario: Go back to the previous screen
        Given the navigation object is available
        When the back arrow button is pressed
        Then the navigation goBack method should be called

    Scenario: Do nothing when navigation object is not available
        Given the navigation object is not available
        When the back arrow button is pressed
        Then the navigation goBack method should not be called