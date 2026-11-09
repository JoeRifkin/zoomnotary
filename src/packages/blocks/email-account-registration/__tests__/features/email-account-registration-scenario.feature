Feature: Email Account Registration
    Scenario: Register Email Account
        Given I am a User attempting to Register after confirming OTP
        When I navigate to the Registration Screen
        Then I can enter a first name with out errors
        And I can enter a business name with out errors
        And I can enter a email with out errors
        And I can enter a password with out errors
        And I can toggle the Password Show/Hide with out errors
        And I can enter a confimation password with out errors
        And I can toggle the Confimation Password Show/Hide with out errors
        And I can select the Submit button with out errors
        When I can select the Individual tab button with out errors
        Then UI should be change according to individual

        When I call api of country list with out errors
        Then Country list Should Succeed
        Then RestAPI will return response
        And I can leave the screen with out errors

    Scenario: Empty First Name
        Given I am a User attempting to Register with a Email
        When I Register with an empty First Name
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Invalid Email
        Given I am a User attempting to Register with a Email
        When I Register with an Invalid Email
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Invalid Password
        Given I am a User attempting to Register with a Email
        When I Register with an Invalid Password
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Password and RePassword do not match
        Given I am a User attempting to Register with a Email
        When I Register with Password and RePassword that do not match
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Valid Registration
        Given I am a User attempting to Register with a Email
        When I Register with all valid data
        Then Registration Should Succeed
        And RestAPI will return token

    Scenario: Handling Validation Response
        Given a validation API response
        When the manageApiResponse function is called with validation API call ID
        Then it should handle the validation response correctly

    Scenario: User creates account successfully
        Given a successful responseJson
        When handleCreateAccountResponse is called
        Then redirectToOtpPage should be called with userDetails

    Scenario: User fails to create account
        Given an error responseJson
        When handleCreateAccountResponse is called
        Then setState should be called with signUpFailedMsg and isSignUpFailed
        
     
    Scenario: Valid email address
        Given I have a valid email "test@example.com"
        When I validate the email
        Then the result should be true

    Scenario: Invalid email address without domain
        Given I have an invalid email "test@"
        When I validate the email
        Then the result should be false

    Scenario: Invalid email address without username
        Given I have an invalid email "@example.com"
        When I validate the email
        Then the result should be false

    Scenario: Invalid email address with invalid characters
        Given I have an invalid email "test@exam!ple.com"
        When I validate the email
        Then the result should be false

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

    Scenario: Continue as guest button is pressed
        When the "Continue as Guest" button is pressed
        Then a navigation message to the guest dashboard should be sent
        And the navigation props should be added to the message