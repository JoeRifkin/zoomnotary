Feature: NewPassword

    Scenario: User navigates to NewPassword
        Given I am a User loading to NewPassword
        When I navigate to the NewPassword Screen
        Then NewPassword will load with out errors
        When Token should be set prom network message
        When Change password form should be render
        When I can enter new password in text input
        When I press icon to show password
        Then Password field is invisible
        When I can enter confirm password
        Then handleChange function should be called
        When I click on show confirm icon to see confirm password
        Then Password is hidden
        When I press submit button to update new password
        Then Network call should be called for change password
        When Network reponse should be get with error
        When Network reponse should be get with success result
        When I can press on button to navigate home screen
        Then Home navigation message is sent

        When I can press on back button to navigate otp screen
        Then OTP navigation message is sent