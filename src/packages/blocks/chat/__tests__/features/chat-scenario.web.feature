Feature: Chat

  Scenario: User navigates to Chat
    Given I am a User loading Chat
    When I navigate to Chat
    Then Chat will load

    And a call to retrieve the chatlist will be made
    And I will see a list of chatrooms I am a part of

    When I click on the createChatRoom button
    When I click on the cancel button

    When I click on the createChatRoom button
    Then I can enter the chat room name
    When I click on the createChatRoom button
    Then a call to create the chat room will be made
    When the network will respond with a success
    And a call to retrieve the chatlist will be made
    When I will see a list of chatrooms I am a part of
    When I click on a chat room
    And I can leave the screen