Feature: UserProfileBasic

    Scenario: User navigates to UserProfileBasic
        Given I am a User loading UserProfileBasic
        When I navigate to the UserProfileBasic
        Then UserProfileBasic will load with out errors
        Then I can enter a phone number with out errors
        Then I can enter First address with out errors
        Then I can enter Second address with out errors
        Then I can enter post code with out errors
        Then I can enter First name with out errors
        Then I can enter business Name with out errors
        Then I can enter city with out errors
        Then I can select country code with out errors
        Then I can select country with out errors
        Then I can select save changes button with out errors
        Then I can select No button to close popup with out errors
        Then I can select yes procced to save changes button with out errors
        Then I can select edit profile button with out errors

        Then I can click on avatar and edit image text with out errors

        When the receive method is called with the message
        Then the corresponding handler should be invoked
        Then the name error message should be displayed
        Then the email error message should be displayed
        Then the phone number error message should be displayed
        Then the address error message should be displayed
        Then the city error message should be displayed
        Then the country number error message should be displayed
        Then the postcode number error message should be displayed
        Then call the function of open camera and open photos without error
        And I can leave the screen with out errors

    Scenario: Handling error response and session expiration
        Given an error response with session expiration is received
        When the handleUserProfileResponse method is called with the error response
        Then a session expiration alert should be shown
        And parseApiErrorResponse method should not be called
        And parseApiCatchErrorResponse method should be called with the error response

    Scenario: Handling session response with matching requesterId
        Given a session response message with matching requesterId is received
        When the handleSessionResponse method is called with the message
        Then the authToken should be updated
        And getUserProfileDetail method should be called

    Scenario: Validating mobile number and updating profile when both countryCode and mobileNo are provided
        Given both countryCode and mobileNo are provided
        When the validateMobileAndThenUpdateUserProfile method is called
        Then validateMobileOnServer method should be called

    Scenario: Showing error alert when countryCode or mobileNo is invalid
        Given either countryCode or mobileNo is invalid
        When the validateMobileAndThenUpdateUserProfile method is called
        Then an error alert should be shown

    Scenario: Updating profile when countryCode or mobileNo is not provided or unchanged
        Given countryCode or mobileNo is not provided or unchanged
        When the validateMobileAndThenUpdateUserProfile method is called
        Then validateAndUpdateProfile method should be called

    Scenario: User opens image picker
        Given the user wants to select an image
        When the user opens the image picker
        Then the user should be able to select an image

    Scenario: Pressing go back button in edit mode
        Given the app is in edit mode
        When I press the go back button
        Then the edit mode should be deactivated

    Scenario: Pressing go back button in view mode
        Given the app is not in edit mode
        When I press the go back button
        Then the app should navigate back

    Scenario: Testing imageSource handling
        Given the form data is being collected
        When imageSource is not null
        Then the profile photo should be appended to the form data

    Scenario: Successful profile update response
        Given a successful response from the profile update API
        When handleChangeProfileResponse is called with this response
        Then the user profile data should be stored
        And the component state should be updated to exit edit mode
        And the success message modal should be shown

    Scenario: Error in profile update response
        Given an error response from the profile update API
        When handleChangeProfileResponse is called with this response
        Then the API error response should be parsed

    Scenario: Phone number is shorter than the minimum length
        Given the phone number is "12345678"
        When the checkMobileNumberMinLength function is called
        Then it should return true

    Scenario: Phone number meets the minimum length
        Given the phone number is "123456789"
        When the checkMobileNumberMinLength function is called
        Then it should return false

    Scenario: Successful response with valid data
        Given the API response contains valid user data
        When handleUserProfileResponse is called
        Then the state should be updated with the user data

    Scenario: Successful response with null phone_number and country_code
        Given the API response contains user data with null phone_number and country_code
        When handleUserProfileResponse is called
        Then the state should set phoneNumber to an empty string
        And the state should set selectedCountryCode to an empty string

    Scenario: Business field is visible and last name is null or blank
        Given the business field is visible
        And the last name is null or blank
        When I check for the business name
        Then it should return true

    Scenario: Business field is visible and last name is not null or blank
        Given the business field is visible
        And the last name is not null or blank
        When I check for the business name
        Then it should return false

    Scenario: Business field is not visible
        Given the business field is not visible
        When I check for the business name
        Then it should return false


    Scenario: Valid mobile number
        Given the phone number is "123456789"
        And the field validation is enabled
        When I check the mobile number validity
        Then the result should be false

    Scenario: Invalid mobile number (less than 9 digits)
        Given the phone number is "12345678"
        And the field validation is enabled
        When I check the mobile number validity
        Then the result should be true

    Scenario: Invalid mobile number (non-numeric characters)
        Given the phone number is "12345abcd"
        And the field validation is enabled
        When I check the mobile number validity
        Then the result should be true

    Scenario: Empty mobile number
        Given the phone number is ""
        And the field validation is enabled
        When I check the mobile number validity
        Then the result should be false

    Scenario: Field validation is disabled
        Given the phone number is "12345678"
        And the field validation is disabled
        When I check the mobile number validity
        Then the result should be false

    Scenario: Reset user detail with valid data
        Given a user detail object
        When I call the restUserDetail function
        Then the state should be updated with user detail

    Scenario: User is in edit mode and user details are present
        Given a user detail object and edit mode is active
        When I call the handleBackPress function
        Then the restUserDetail function should be called with user detail

    Scenario: User clicks on the close sucess model
        Given the initial selected model view
        When the user clicks on the close button
        Then close the sucess model

    Scenario: Image source has a path
        Given the state image source has a path "path/to/image.jpg"
        When I get the user profile image
        Then the result should be "path/to/image.jpg"

    Scenario: Image source has a URL
        Given the state image source has a URL "http://example.com/image.jpg"
        When I get the user profile image
        Then the result should be "http://example.com/image.jpg"

    Scenario: Image source is neither path nor URL
        Given the state image source is "defaultImageSource"
        When I get the user profile image
        Then the result should be "defaultImageSource"

    Scenario: Button color for end user
        Given the user role type is 'end_user'
        When the getBtnColorToEnable function is called
        Then the button color should be 'btnDisableColorView'

    Scenario: Button color for other users
        Given the user role type is not 'end_user'
        When the getBtnColorToEnable function is called
        Then the button color should be 'btnBackGColorView'

     Scenario: Button color for end user text
        Given the user role type is 'end_user'
        When the getViewColorTodisable function is called
        Then the button color should be 'btnDisableColorForTxt'

    Scenario: Button color for other users text
        Given the user role type is not 'end_user'
        When the getViewColorTodisable function is called
        Then the button color should be 'btnBackGColorForTxt'

    Scenario: Open the country dropdown
        Given the country dropdown is closed
        When the user opens the country dropdown
        Then the country dropdown should be open

    Scenario: Close the country dropdown
        Given the country dropdown is open
        When the user closes the country dropdown
        Then the country dropdown should be closed

    Scenario: isBusinessFieldVisible returns true when lastName is a valid value
        Given the lastName state is set to a valid non-null value
        When isBusinessFieldVisible is called
        Then it should return true

    Scenario: isBusinessFieldVisible returns false when lastName is null
        Given the lastName state is null
        When isBusinessFieldVisible is called
        Then it should return false

    Scenario: Phone number input updates state when editable is true
        Given the phone number input is editable
        When a user enters a phone number
        Then it should update the state with the new phone number

    Scenario: Phone number input does not update state when editable is false
        Given the phone number input is not editable
        When a user enters a phone number
        Then it should not update the state with the new phone number