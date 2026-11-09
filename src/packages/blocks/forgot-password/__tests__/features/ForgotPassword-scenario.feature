Feature: ForgotPassword

    Scenario: User navigates to ForgotPassword
        Given I am a User loading to ForgotPassword
        When I navigate to the ForgotPassword Screen
        Then ForgotPassword will load with out errors
        And I can select the back button with out errors
        And I can Enter email for forget with out errors
        And I can select the Login button with out errors
        And Network api shoudl be called for getiing validation rules
        When Network response for validation rules is set
        And I can select the Submit button with out errors
        When I can press on submit button
        Then Network should be called for getting otp
        When Network response should be get with errors
        When Network response should be get with success response data
        Then Token is set
        Then I can select the Resend code button with out errors
        When I can select the Next otp submit button with out errors
        Then Network should be called for submit otp
        When I can press on back button to navigate otp screen
        Then OTP navigation message is sent

    Scenario: Style when the timer is 0
        Given the component is rendered
        And the timer is set to 150
        Then the Resend Code Button style should include the 'disableResend' style
        And the timer is set to 0
        Then the Resend Code Button style should include the 'unableResend' style
   
    Scenario: Resend OTP Button Behavior when timer is 0
        Given the timer is 0
        When the user presses the resend button
        Then the handleResendOtp function should be called

    Scenario: User presses the Go Back button on the OTP screen
        Given the OTP screen is displayed
        When the user presses the Go Back button
        Then the timer interval should be cleared
        And the OTP view should not be displayed
        And the error message should not be displayed
        And the timer should be reset to 150
        And the OTP input should be cleared

    Scenario: Timer countdown starts and stops correctly
        Given the timer is set to a specific value
        When the startTimer function is called
        Then the timer should decrease by 1 every second
        And the timer should stop when it reaches 0

    Scenario: Valid email OTP token response
        Given a message with a valid email OTP token response
        When the manageResponse function is called
        Then the otpToken should be set
        And the OTP view should be displayed
        And the validation should be false
        And the error message should be false
        And the timer should start

    Scenario: Invalid email OTP token response
        Given a message with an invalid email OTP token response
        When the manageResponse function is called
        Then handleSuccessResponse should be called

    Scenario: Valid OTP auth confirmation response
        Given a message with a valid OTP auth confirmation response
        When the manageResponse function is called
        Then handleSuccessResponse should be called with handleOtpAuthConfirmSuccess

    Scenario: Valid request change password response
        Given a message with a valid request change password response
        When the manageResponse function is called
        Then handleSuccessResponse should be called
        And changePassWOrdSuccessFull should be false

    Scenario: Password length is less than 8 characters
        Given the password is "short"
        When the validation is performed
        Then the first validation should fail
        And the second validation should fail
        And the third validation should pass

    Scenario: Password length is 8 or more characters but missing complexity
        Given the password is "longenough"
        When the validation is performed
        Then the first validation should pass
        And the second validation should fail
        And the third validation should pass

    Scenario: Password meets all criteria
        Given the password is "Valid1@Password"
        When the validation is performed
        Then the first validation should pass
        And the second validation should pass
        And the third validation should pass

    Scenario: Password fails the third validation criteria
        Given the password is "Valid1Password"
        When the validation is performed
        Then the first validation should pass
        And the second validation should pass
        And the third validation should fail