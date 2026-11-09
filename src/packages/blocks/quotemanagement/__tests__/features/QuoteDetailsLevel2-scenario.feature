Feature: QuoteManagement

    Scenario: User navigates to QuoteDetailsLevel2
        Given I am a User loading QuoteDetailsLevel2
        When I navigate to the QuoteDetailsLevel2
        Then QuoteDetailsLevel2 will load with out errors
        And I can enter comments with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors