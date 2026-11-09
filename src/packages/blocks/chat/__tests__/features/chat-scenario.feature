Feature: Chat

  Scenario: User navigates to Chat
    Given I am a User loading Chat
    When I navigate to Chat
    Then Chat will load

    And a call to retrieve the chatlist will be made
    And I will see a list of chatrooms I am a part of

    When I press on the createChatRoom button
    When I press on the cancel button
    
    When I press on the createChatRoom button
    Then I can enter the chat room name
    When I can hide keyboard
    When I press on the createChatRoom button
    Then a call to create the chat room will be made
    When the network will respond with a success
    Then a call to retrieve the chatlist will be made
    When I will see a list of chatrooms I am a part of
    When I press on a chat room
    And I can leave the screen

  Scenario: Convert a date-time string to formatted time
    Given a date-time string "2024-12-19T15:30:00.000Z"
    When the getHourAndMint function is called with this string
    Then it should return "15:30"

  Scenario: Convert a date-time string with midnight time
    Given a date-time string "2024-12-19T00:00:00.000Z"
    When the getHourAndMint function is called with this string
    Then it should return "00:00"

  Scenario: Convert a date-time string with single-digit hours and minutes
    Given a date-time string "2024-12-19T07:08:00.000Z"
    When the getHourAndMint function is called with this string
    Then it should return "07:08"

  Scenario: Update state when a message is entered
    Given the initial state has an empty enteredMsg
    When the user enters the message "Hello, World!"
    Then the state should be updated with enteredMsg as Hello World

  Scenario: Clicking the send button with a non-empty message
    Given the "enteredMsg" state contains "Hello, World!"
    When I call the "onSendClick" function's onPress handler
    Then the "enteredMsg" state should be cleared
    And the "getMessageData" function should be called

  Scenario: Clicking the send button with an empty message
    Given the "enteredMsg" state is empty
    When I call the "onSendClick" function's onPress handler
    Then the "enteredMsg" state should remain empty
    And the "getMessageData" function should not be called

  Scenario: Handling navigation payload message with valid data
    Given the message contains valid custom data
    When I call the handleNavigationPayloadMessage function
    Then it should update selectedActionType, requestId, notarisationMethodType, and set state with selectedDate and token

  Scenario: Scroll to the bottom of the ScrollView when the function is called
    Given I have a ScrollView reference
    When I call the "scrollToBottom" function
    Then the ScrollView should scroll to the bottom

  Scenario: Call scrollToBottom when messageList changes
    Given the component has an initial state
    When the messageList state is updated
    Then the scrollToBottom method should be called

  Scenario: Call getMessageData when newReceivedMessage changes
    Given the component has an initial state
    When the newReceivedMessage state is updated
    Then the getMessageData method should be called

 Scenario: Go back to the previous screen
    Given the navigation object is available
    When the back arrow button is pressed
    Then the navigation goBack method should be called

  Scenario: handleMessage updates the state with the new message
    Given I have a Chat component with a handleMessage method
    When handleMessage is called with a new message
    Then the state should be updated with the new message

  Scenario: Handle create chat room API response
    Given I have a Chat component with a handleCreateChatRoomApiRes method
    When handleCreateChatRoomApiRes is called with a valid response
    Then the state should be updated with chatId, chatName, and currentAccountId
    And getMessageData should be called
    And webSocketConnection should be established

  Scenario: Handle session response message correctly
    Given a valid session response message
    When the message is processed
    Then the token and accountId should be updated correctly in state

  Scenario: Handle session response message with missing token
    Given a session response message with no token
    When the message is processed
    Then the accountId should be updated, but token should remain unchanged

  Scenario: Handle session response message with invalid data
    Given a session response message with invalid data
    When the message is processed
    Then the state should not be updated

  Scenario: WebSocket is properly closed during unmount
    Given a component with an active WebSocket
    When the component is unmounted
    Then the WebSocket should be closed

  Scenario: Message contains custom data
    Given a message with custom data
    When the navigation payload message is handled
    Then the state should be updated with the token, requestId, and quoteId

   Scenario: Handle message data response with valid messages
    Given I have a valid message and responseJson with messages
    When handleMessageDataResponse is called
    Then the state should be updated with messages and currentAccountId
    Then enteredMsg should be cleared and scrollToBottom should be called

  Scenario: Handle message data response with errors
    Given I have a valid message and responseJson with errors
    When handleMessageDataResponse is called
    Then the state should be updated with messageError
    Then scrollToBottom should not be called

  Scenario: Successfully handle the create chat room API response
    Given I have a message with the correct id and a valid responseJson
    And I have a non-empty createChatRoomApiCallId
    When handleCreateChatRoomResponse is called with the message, responseJson, and API request call ID
    Then createChatRoomApiCallId should be cleared
    And hideModal should be called
    And handleCreateChatRoomApiRes should be called with the responseJson

  Scenario: Successfully map a chat list item with a specific account ID
    Given I have a chat response item and a current account ID in state
    When mapChatListItem is called with the chat response item
    Then it should return the mapped object with id, name, muted, unreadCount, and lastMessage

  Scenario: Successfully handle session response message with valid data
    Given I have a valid session response message
    When handleSessionResponseMessage is called
    Then the token and accountId should be set in the state

  Scenario: Get margin-right when avatar is shown
    Given I have a boolean value indicating the avatar is visible
    When getMarginRight is called with true
    Then the result should be 'forReverseMarginRight'

  Scenario: Get margin-right when avatar is not shown
    Given I have a boolean value indicating the avatar is not visible
    When getMarginRight is called with false
    Then the result should be 'forReverseMarginRightSec'

  Scenario: Get margin-left when avatar is shown
    Given I have a boolean value indicating the avatar is visible
    When getMarginLeft is called with true
    Then the result should be 'forMarginLeft'

  Scenario: Get margin-left when avatar is not shown
    Given I have a boolean value indicating the avatar is not visible
    When getMarginLeft is called with false
    Then the result should be 'forMarginLeftSec'