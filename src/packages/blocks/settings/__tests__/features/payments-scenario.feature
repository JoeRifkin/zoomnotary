Feature: Payments

    Scenario: User navigates to Payments
        Given I am a User loading Payments
        When I navigate to the Payments status api will be called
        Then user have to connect his acccount
        
        When I click on the connect account btn i will be redirected to the stripe
        Then the process will fail

        When I click on the connect account btn i will be redirected to the stripe
        Then the process will success and will see the details

        When I click on the disconnect account btn
        Then modal will be show to the user

        When I click on the yes , disconnect  btn
        Then modal will be closed and account will be disconnected