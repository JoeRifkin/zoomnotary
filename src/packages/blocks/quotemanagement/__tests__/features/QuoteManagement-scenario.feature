Feature: QuoteManagement

    Scenario: User navigates to QuoteManagement
        Given I am a User loading QuoteManagement
        When I navigate to the QuoteManagement
        Then I can select the button with with out errors
        And I can leave the screen with out errors