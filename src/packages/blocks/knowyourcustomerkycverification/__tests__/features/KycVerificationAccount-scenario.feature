 Feature:KycVerificationAccount



    Scenario:User navigates to KycVerificationAccount
        Given I am a User attempting to KycVerificationAccount
        When I navigate to the KycVerificationAccount Screen
        Then I can successweb with out errors
        Then i can click on back arrow icon with out errors
        And I can leave the screen with out errors 

    Scenario: Handle country API response
        Given the getCountryApiCallId is provided
        When the manageApiResponse function is called with a CountryResponse
        Then the handleCountryResponse method should be called

    Scenario: Handle country code API response
        Given the getCountryCodeApiCallId is provided
        When the manageApiResponse function is called with a CountryCodeResponse
        Then the handleCountryCodeResponse method should be called

    Scenario: Handle applicant create API response
        Given the apiApplicantCreateCallId is provided
        When the manageApiResponse function is called with an ApplicatnMsgResponse
        Then the manageApplicantCreateResponse method should be called

    Scenario: Unknown API call ID
        Given an unknown API request call ID
        When manageApiResponse is called
        Then no API handler function should be called

    Scenario: Store token and user role when the message id is NavigationPayLoadMessage
        Given a message with id "NavigationPayLoadMessage"
        And the message contains token "mockedToken" and role "admin"
        When the storeMDataValue function is called
        Then it should update the state with the token and user role

    Scenario: Call getCustmizeCountryList when responseJson contains data
        Given a responseJson with valid country data
        When the handleCountryResponse function is called with the responseJson
        Then the getCustmizeCountryList method should be called with the country data

    Scenario: Filter out duplicate country codes and call getCustmizeCountryCodeList
        Given a responseJson with duplicate country codes
        When the handleCountryCodeResponse function is called
        Then the getCustmizeCountryCodeList method should be called with unique country codes

    Scenario: Do not update stepsNo when stepNumber is 2
        Given the step number is 2
        When the goToSteps function is called
        Then the state stepsNo should not be updated

    Scenario: Do not update stepsNo when stepNumber is 3
        Given the step number is 3
        When the goToSteps function is called
        Then the state stepsNo should not be updated

    Scenario: Update stepsNo when stepNumber is 1
        Given the step number is 1
        When the goToSteps function is called
        Then the state stepsNo should be updated to 1

    Scenario: Update stepsNo when stepNumber is 4
        Given the step number is 4
        When the goToSteps function is called
        Then the state stepsNo should be updated to 4

    Scenario: Check if string is null or blank
        Given a string value stringValue
        When the isStringNullOrBlank function is called
        Then the result should be expectedResult

    Scenario: Update firstName state when text is changed
        Given the user enters "John" in the first name field
        When the onChangeText function for txtInputFirstNamePrpos is called
        Then the state firstName should be updated to "John"

    Scenario: Update middleName state when text is changed
        Given the user enters "Doe" in the middle name field
        When the onChangeText function for txtInputMiddleNamePrpos is called
        Then the state middleName should be updated to "Doe"

    Scenario: Update lastName state when text is changed
        Given the user enters "Smith" in the last name field
        When the onChangeText function for txtInputLastNamePrpos is called
        Then the state lastName should be updated to "Smith"

    Scenario: Update selectedCountryCode state when country code is changed
        Given the user selects the country code "US"
        When the txtInputCountryCodePrpos function is called
        Then the state selectedCountryCode should be updated to "US"

    Scenario: Update mobileNumber state when phone number is changed
        Given the user enters "1234567890" in the phone number field
        When the onChangeText function for txtInputPhoneNumProps is called
        Then the state mobileNumber should be updated to "1234567890"

    Scenario: Validate a valid email format
        Given the user enters "test@example.com" as the email
        When the validateEmail function is called
        Then the result should be true

    Scenario: Validate an invalid email format
        Given the user enters "test@com" as the email
        When the validateEmail function is called
        Then the result should be false

    Scenario: Update email state when text is changed
        Given the user enters "user@example.com" in the email field
        When the onChangeText function for txtInputEmailMobilePrpos is called
        Then the state email should be updated to "user@example.com"

    Scenario: Update selectedIdType state when ID type is selected
        Given the user selects "passport" as the ID type
        When the selectIDTypeOption function is called
        Then the state selectedIdType should be updated to "passport"

    Scenario: Update stateCode state when text is changed
        Given the user enters "NY" in the state code field
        When the onChangeText function for txtInputStateCodePrpos is called
        Then the state stateCode should be updated to "NY"

    Scenario: Update idNumber state when text is changed
        Given the user enters "12345" in the ID number field
        When the onChangeText function for txtInputIdNumberPrpos is called
        Then the state idNumber should be updated to "12345"

    Scenario: Update addressFirst state when text is changed
        Given the user enters "123 Main St" in the first address field
        When the onChangeText function for txtInputAddressFirstProps is called
        Then the state addressFirst should be updated to "123 Main St"

    Scenario: Update addressSec state when text is changed
        Given the user enters "Apt 4B" in the second address field
        When the onChangeText function for txtInputAddressSecProps is called
        Then the state addressSec should be updated to "Apt 4B"

    Scenario: Update city state when text is changed
        Given the user enters "New York" in the city field
        When the onChangeText function for txtInputCityProps is called
        Then the state city should be updated to "New York"

    Scenario: Update selectedCountry state when a country is selected
        Given the user selects "USA" as the country
        When the selectCountryOption function is called
        Then the state selectedCountry should be updated to "USA"

    Scenario: Update postCode state when text is changed
        Given the user enters "10001" in the postal code field
        When the onChangeText function for txtInputPostCodeProps is called
        Then the state postCode should be updated to "10001"

    Scenario: Open ID type dropdown
        Given the ID type dropdown is closed
        When the openDropdownOfIdType function is called
        Then the state isIdTypeDropDownOpen should be true

    Scenario: Close ID type dropdown
        Given the ID type dropdown is open
        When the closeDropDownOfIdType function is called
        Then the state isIdTypeDropDownOpen should be false

    Scenario: Open country dropdown
        Given the country dropdown is closed
        When the openDropdownOfCountry function is called
        Then the state isCountryDropDownOpen should be true

    Scenario: Close country dropdown
        Given the country dropdown is open
        When the closeDropDownOfCountry function is called
        Then the state isCountryDropDownOpen should be false

    Scenario: Enable the next button when all fields are valid
        Given the user has filled all required fields correctly
        When the getButtonEnabled function is called
        Then the result should be true

    Scenario: Disable the next button when some fields are missing or invalid
        Given the user has left some required fields empty or invalid
        When the getButtonEnabled function is called
        Then the result should be false

    Scenario: Proceed to the next step if the button is enabled
        Given the user has filled all required fields correctly
        When the btnNextProps.onPress function is called
        Then the state isValidateField should be false
        And the gotoNextStep function should be called

    Scenario: Do not proceed to the next step if the button is disabled
        Given the user has left some required fields empty or invalid
        When the btnNextProps.onPress function is called
        Then the state isValidateField should be true
        And the gotoNextStep function should not be called


    Scenario: No to changes in Date of Birth
        Given the Date of Birth modal is open
        When the noToChanges.onPress function is called
        Then the dateOfBirth state should be set to an empty string
        And the isDateOfBirthModelOpen state should be set to false

    Scenario: Yes to changes in Date of Birth
        Given the Date of Birth modal is open and a date is selected
        When the yesProceedToChanges.onPress function is called
        Then the dateOfBirth state should be set to the formatted date
        And the isDateOfBirthModelOpen state should be set to false

    Scenario: Format Date of Birth
        Given a valid date is selected
        When the formatDate function is called
        Then the date should be returned in dd/mm/yyyy format

    Scenario: Select a date of birth
        Given the user selects a date
        When the onSelectDateOfBirth function is called
        Then the selectedDate state should be updated with the chosen date

    Scenario: Open the Date of Birth selection modal
        Given the Date of Birth modal is closed
        When the getDateOfBirthSelectionModalOpen function is called
        Then the isDateOfBirthModelOpen state should be set to true

    Scenario: Response with applicant and workflow
        Given a response containing applicant and workflow
        When manageApplicantCreateResponse is called
        Then the state should be updated with Onfido URL and isOnfidoPageShow set to true
        And should call onError and log the error
        And should call onMessage and log the data
        And should call onPermissionRequest and grant permissions

    Scenario: Response with message
        Given a response containing a message
        When manageApplicantCreateResponse is called
        Then the state should be updated with the applicant message response

    Scenario: Response with errors
        Given a response containing errors
        When manageApplicantCreateResponse is called
        Then the state should be updated with the first error message

    Scenario: Focus on date of birth input
        Given the date of birth input is focused
        When the onFocus event is triggered
        Then the getDateOfBirthSelectionModalOpen function should be called

    Scenario: Close the date of birth selection modal
        Given the modal needs to be closed
        When the onClose event is triggered
        Then the closeDateOfBirthSelectionModel function should be called

    Scenario: Open the birth dropdown
        Given I have a component with an initial state
        When I call the openDropdownOfBirth function
        Then the isBirthDropDownOpen state should be true

    Scenario: Close the birth dropdown
        Given I have a component with an initial state
        When I call the closeDropDownOfBirth function
        Then the isBirthDropDownOpen state should be false

    Scenario: Triggering the onFocus event
        Given I have a component with the onFocus props
        When I trigger the onFocus event
        Then the Keyboard.dismiss should be called
        And the getDateOfBirthSelectionModalOpen should be called

    Scenario: Transform country data into label-value pairs
        Given a list of country data
        When the getCustmizeCountryData function is called
        Then it should return the country data transformed into an array of label-value objects

    Scenario: User touches outside the input field
        Given the keyboard is open
        When the user touches outside the input field
        Then the keyboard should be dismissed

    Scenario: Birth dropdown is open
        When the birth dropdown is open
        Then the UI style should be "errorOfFieldView"

    Scenario: Birth dropdown is closed
        When the birth dropdown is closed
        Then the UI style should be "textFieldBgView"

    Scenario: Onfido SDK works properly
        Given Onfido SDK starts
        When Onfido SDK intitialize
        Then User can Do KYC
        And onfido kyc api integration
