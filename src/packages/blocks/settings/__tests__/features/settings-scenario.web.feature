Feature: settings

    Scenario: User navigates to settings
        Given I am a User loading settings
        When I navigate to the settings
        Then settings will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors