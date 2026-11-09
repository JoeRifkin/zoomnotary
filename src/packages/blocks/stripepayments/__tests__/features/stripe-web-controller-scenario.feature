Feature: Stripe Web Payment
    Scenario: The stripe payment block loads
        When I navigate to the payment block
        Then the payment block loads
    Scenario: The block can successfully subscribes to all app services
        When I navigate to the payment block
        Then it links in with run engine
    Scenario: I do not enter an order number and submit
        When I enter a null order number manually and submit it
        Then I see an error message
    Scenario: I enter the order number manually and receive an intent
        Given I receive a payment intent
        When I enter the order number manually and submit it
        Then I receive a payment intent
    Scenario: I can attempt to make a payment
        Given I enter the order number manually and submit it
        When I attempt to make a payment
        Then The payment is submitted to stripe
    Scenario: Check the token retrival system works
        Given There is a token in storage
        When I attempt to get an intent with no token stored in the application
        Then I should be successful with stored token