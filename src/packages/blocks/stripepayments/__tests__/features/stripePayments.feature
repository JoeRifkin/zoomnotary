Feature: Stripe Mobile Payment
    Scenario: Create a Payment while not logged in
        Given I am trying to make a Payment
        When I open payment sheet while not logged in
        Then I receive an error stating I need to be logged in
    Scenario: Stripe Payment Intent Fails
        Given I am trying to make a Payment
        When I open payment sheet and Stripe Payment API call fails
        Then I receive an error callback from the API
    Scenario: Stripe Payment Intent Fails with Unknown reason
        Given I am trying to make a Payment
        When I open payment sheet and Stripe Payment API call fails with unknown issue
        Then I receive an error callback with unknown reason
    Scenario: Successful Stipe Payment
        Given I am trying to make a Payment
        When I submit stripe payment sheet
        Then I receive a successful alert