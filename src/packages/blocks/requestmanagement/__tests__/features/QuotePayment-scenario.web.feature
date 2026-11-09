Feature: QuotePayment

    Scenario: User navigates to QuotePayment
        Given I am a User loading QuotePayment
        When I navigate to the QuotePayment
        Then QuotePayment will load with out errors
        Then Get token function shoudl be called
        When Network responed for received request api
        Then Network responed for accept request review api
        Then Network responed for reject request review api
        