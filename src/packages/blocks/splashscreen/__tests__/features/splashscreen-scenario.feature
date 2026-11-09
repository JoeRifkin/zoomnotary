Feature: Splashscreen

    Scenario: User navigates to Splashscreen
        Given I am a User loading Splashscreen
        When I navigate to the Splashscreen
        Then Splashscreen will load with out errors
        And I can leave the screen with out errors

    Scenario: Continue as guest button is pressed
        When the "Continue as Guest" button is pressed
        Then a navigation message to the guest dashboard should be sent
        And the navigation props should be added to the message