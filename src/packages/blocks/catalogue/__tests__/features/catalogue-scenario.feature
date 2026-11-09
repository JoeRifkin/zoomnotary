Feature: catalogue

    Scenario: User navigates to catalogue
        Given I am a User loading catalogue
        When I navigate to the catalogue
        Then catalogue will load with out errors

        When user tap on change and search with wrong query
        Then he will no result found

        When user enters the right searh query
        Then he can see the filtered values

    Scenario: User navigates to catalogue to book now
        Given I am a User loading catalogue
        When user taps on the book now
        Then he will go to another screen

    Scenario: Continue as guest button is pressed
        When the "Continue as Guest" button is pressed
        Then a navigation message to the guest dashboard should be sent
        And the navigation props should be added to the message