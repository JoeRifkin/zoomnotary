Feature: GooglePayIntegration

    Scenario: User navigates to GooglePayIntegration
        Given I am a User loading GooglePayIntegration
        When I navigate to the GooglePayIntegration
        When I can input an amount in the designated field
        Then The entered value should match the input value
        When I can click on pay now button
        Then Call unused web function without error