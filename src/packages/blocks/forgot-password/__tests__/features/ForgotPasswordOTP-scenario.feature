Feature: ForgotPasswordOTP

    Scenario: User navigates to ForgotPasswordOTP
        Given I am a User loading to ForgotPasswordOTP
        When I navigate to the ForgotPasswordOTP Screen
        Then ForgotPasswordOTP will load with out errors
        When I can enter otp in otp text input
        Then Otp text input value should be set
        When I am clicking anywhere to hide keyboard
        Then Hide keyboard is called
        When I can press submit button to submit otp
        Then Otp auth token should be set


    Scenario: User navigates to ForgotPasswordOTP in web
        Given I am a User loading to ForgotPasswordOTP
        When I navigate to the ForgotPasswordOTP Screen
        Then ForgotPasswordOTP will load with out errors