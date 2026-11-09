Feature: CollectTransactionFees

    Scenario: User navigates to CollectTransactionFees
        Given I am a User loading CollectTransactionFees
       

        When Transaction Percentage network request is called
        Then Transaction percentage will set

        When I can select the calculate amount button with out errors
        Then Expected value of changed field

        When I can enter a transaction amount
        Then Expected value of changed transaction amount field

        When I can select the Pay amount button with out errors
        Then Collect Transaction Fees API call ID is assigned

        When I can select the Pay amount button with transaction percentage is null
        Then Expected value of changed transaction percentage field

        When Collect Transaction Fees API network request is called
        Then Collect Transaction Fees API network request fail

        When Transaction Percentage API network request is called
        Then Transaction Percentage API network request fail