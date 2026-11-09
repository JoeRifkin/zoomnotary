Feature: CollectTransactionFees

    Scenario: User navigates to CollectTransactionFees
        Given I am a User loading CollectTransactionFees

        When Transaction Percentage network request is called
        Then Transaction percentage will set

        When I can enter a transaction amount
        Then Expected value of changed transaction amount field

        When I can select the total amount button with out errors
        Then Correct state values are assigned

        When I can select the pay amount button with out errors
        Then Collect Transaction Fees API call ID is assigned

        When Collect Transaction Fees network request is called
        Then Transaction Percentage API call ID is assigned

        When I can enter an empty transaction amount
        Then Expected value of changed transaction amount field

        When I can select the total amount button with errors
        Then Error message is displayed

        When I can enter an invalid transaction amount
        Then Expected value of changed transaction amount field

        When I can select the total amount button with errors
        Then Error message is displayed
