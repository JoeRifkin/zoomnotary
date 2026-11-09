Feature: OTPInputAuth

    Scenario: User navigates to OTPInputAuth
        Given I am a User loading OTPInputAuth
        When I navigate to the OTPInputAuth
        Then OTPInputAuth will load with out errors
        Then Call function to get otp with out errors
        When I can select the Resend code button with out errors
        When I can press back button without errors
        When I can press submit button without entering otp
        Then Error message should be display
        When I click anywhere to hide keyboard view
        Then Otp state should be updated
        When I can press submit button to verfy otp
        Then Network should be send request for verify otp
        When Network response should be set for verify otp

        When I enter a valid OTP code 123456
        Then After end user sign up sucess screen without error
        Then After notary user sign up sucess screen without error
        Then the authentication should be successful
        Then call the api of get all services without error
        Then I can select the Skip button with out errors
        When the user clicks on "All Select"
        Then the selected services should be updated accordingly
        Then all services should be selected

        Then Click on single service check box with out error
        Then Click on Save button with out error
        Then Click on no button from popup with out error
        Then Click on yes proceed button from popup with out error
        Then I can press back button from sucess screen without errors

    Scenario: should clear interval when timer reaches 0

    Scenario: Selecting a service
        Given the service with ID 1 is not selected
        When I click on select for the service with ID 1
        Then the service with ID 1 should be selected

    Scenario: Deselecting a service
        Given the service with ID 1 is selected
        When I click on select for the service with ID 1
        Then the service with ID 1 should be deselected

    Scenario: Exiting the app on back button click
        Given the user wants to exit the app
        When the user clicks the back button
        Then the app should exit

    Scenario: Resend OTP Button Behavior when timer is 0
        Given the timer is 0
        When the user presses the resend button
        Then the handleResendOtp function should be called

    Scenario: User presses the Go Back button on the OTP screen
        Given the OTP screen is displayed
        When the user presses the Go Back button
        Then the timer interval should be cleared
        And the timer should be reset to 150
        And the OTP input should be cleared

    Scenario: Timer countdown starts and stops correctly
        Given the timer is set to a specific value
        When the startTimer function is called
        Then the timer should decrease by 1 every second
        And the timer should stop when it reaches 0

    Scenario: User successfully resends OTP when timer is less than 1
        Given the timer is set to 0
        When the user triggers the resend OTP function
        Then the API for sending OTP should be called
        And the timer should be reset to 150
        And the OTP input field should be cleared
        And the timer should start again