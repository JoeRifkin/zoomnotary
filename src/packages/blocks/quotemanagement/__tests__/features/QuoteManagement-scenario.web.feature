Feature: QuoteManagement

    Scenario: User navigates to QuoteManagement
        Given I am a User loading QuoteManagement
        When I navigate to the QuoteManagement
        And i can't create the Quote with errors
        And i can create the Quote with out errors
        And i can  update the Quote with errors
        And i can get the  QuoteListwith out errors
        And getting the  Creator
        And Creator can create an the edit Quote
        And Creator can update the rejected  Quote
        And Approver can update the  creator status
        And Approver can update the comment
        And I can leave the screen with out errors
        
     