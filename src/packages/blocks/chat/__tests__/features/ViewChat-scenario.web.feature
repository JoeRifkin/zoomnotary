Feature: ViewChat

  Scenario: User navigates to ViewChat
    Given I am a User loading ViewChat
    When I navigate to ViewChat
    Then ViewChat will load

    And a call to retrieve the chatData will be made
    When I will see the messages in the chat

    And the read messages will be updated

    And I can enter a message
    When I click on the btnSendMessage button
    Then a call to send the message will be made

    When I click on the btnInsertImage button
    Then I can change image file
    Then I can enter a message
    When I click on the btnSendMessage button
    Then a call to send the message will be made

    And a call to retrieve the chatData will be made
    When I will see the messages in the chat

    When I click on the addAccount button
    When I click on the btnCloseModal button

    When I click on the addAccount button
    Then I can enter the account id
    When I click on addAccountSubmit button
    Then a call to add the account will be made

    And a call to retrieve the chatData will be made
    And I will see the messages in the chat

    When I click on the mute button
    Then a call to mute the chat room will be made

    When I click on the leaveChat button
    Then a call to leave the chat room will be made

    And I can leave the screen