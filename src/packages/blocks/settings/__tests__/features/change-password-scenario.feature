Feature: ChangePassword

    Scenario: User successfully changes the password
        Given I am a User loading ChangePassword
        When I enter the current password, new password, confirm password
        Then I will submit the change password btn and responds with success

        When im on the success screen i will click dashboard btn
        Then i will go back to dashboard

    Scenario: User successfully changes the password after failed attempts
        Given I am a User loading ChangePassword
        When I enter the current password, and then enter a different new password and confirm password.
        Then I will submit the change password and I will get an error password not match

        When I enter the current password wrong, new password, confirm password
        Then I will submit the change password btn and responds with failure

        When i click on back arrow
        Then i will go back to previous screen
