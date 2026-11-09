Feature: QuoteManagement

    Scenario: User navigates to QuoteManagement
        Given I am a User loading QuoteManagement
        When I navigate to the QuoteManagement
        Then QuoteManagement will load with out errors
        Then Get token function shoudl be called
        When Network responed for received request api
        Then Network responed for accept request review api
        Then Network responed for reject request review api
        