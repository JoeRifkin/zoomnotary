Feature: OutlookIntegration

  Scenario: User interacts with OutlookIntegration
    Given I am a User on the OutlookIntegration screen
    When I navigate to the OutlookIntegration screen
    Then the OutlookIntegration screen loads without errors by rendering SignIn button
    When the user is sign in is confirmed and the signup is pressed
    Then I can get the user informations
    When the contact button is clicked
    Then the contact flatlist data should be displayed
    When the event button is clicked
    Then the event flatlist data should be displayed
    When the email button is clicked
    Then the email flatlist data should be displayed
    When the logout button is clicked
    Then It should remove all data
    When the token has expried
    Then The invalidAuthenticationTokenCode should have been called
    
