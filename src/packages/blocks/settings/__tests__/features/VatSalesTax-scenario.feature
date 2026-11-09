Feature: VatSalesTax

    Scenario: User navigates to settings
        Given I am a User loading settings
        When I navigate to the settings
        Then settings will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: Store token and user role when the message id is NavigationPayLoadMessage
        Given a message with id "NavigationPayLoadMessage"
        And the message contains token "mockedToken" and role "admin"
        When the storeMDataValue function is called
        Then it should update the state with the token and user role


    Scenario: Selecting Not Have radio button
        Given the initial state is set with have selected and VatNumber is provided
        When the user presses the Not Have radio button
        Then the selectedRadioBtn state should be set to notHave
        And the VatNumber state should be cleared

    Scenario: Selecting Have radio button
        Given the initial state is set with notHave selected
        When the user presses the Have radio button
        Then the selectedRadioBtn state should be set to have

    Scenario: Toggle VAT Tax checkbox using btnCheckBoxOnVatTaxProps
        Given the checkbox is initially unchecked
        When the user presses the VAT checkbox button
        Then the checkbox should be checked
        And the isCheckBoxOnVatTax state should be true

    Scenario: Toggle VAT Tax checkbox using checkBoxOnVatTaxProps
        Given the checkbox is initially checked
        When the user changes the value of the checkbox to false
        Then the checkbox should be unchecked
        And the isCheckBoxOnVatTax state should be false

    Scenario: Pressing Add Details button with VAT checkbox checked
        Given the checkbox is checked
        When the user presses the Add Details button
        Then the isShowCheckBox state should be false

    Scenario: API response contains an error for VAT tax check
        Given the API request is for VAT tax check
        When the API response contains an error
        Then the checkbox should be displayed
        And the selected radio button should be reset

    Scenario: API response is successful for VAT tax check
        Given the API request is for VAT tax check
        When the API response is successful
        Then VAT details should be updated in the state
        And the correct radio button should be selected based on VAT

    Scenario: API response is successful for VAT tax creation or update
        Given the API request is for VAT tax creation or update
        When the API response is successful
        Then the success message modal should be shown
        And the modal should close after 3 seconds

    Scenario: Pressing the Edit Details button
        When the user presses the Edit Details button
        Then the VAT updated value should not be shown

    Scenario: Pressing the Cancel button
        When the user presses the Cancel button
        Then the VAT updated value should be shown

    Scenario: Save button clicked with an empty selected radio button
        When the user presses the Save Details button with an empty selected radio button
        Then it should not save and should return false

    Scenario: Save button clicked with have radio button and valid VAT number
        When the user presses the Save Details button with have selected and valid VAT number
        Then it should save the VAT number

    Scenario: Save button clicked with have radio button and invalid VAT number
        When the user presses the Save Details button with have selected and invalid VAT number
        Then it should not save and should return false

    Scenario: Save button clicked with not have radio button
        When the user presses the Save Details button with not have selected
        Then it should save the VAT number

    Scenario: User enters a VAT number
        When the user types a VAT number into the text input
        Then the VAT number state should be updated

    Scenario: VAT number is less than 9 characters
        Given the VAT number is "12345678"
        When the checkVatNumberMinLength function is called
        Then it should return true

    Scenario: VAT number is 9 or more characters
        Given the VAT number is "123456789"
        When the checkVatNumberMinLength function is called
        Then it should return false

    Scenario: VAT number is undefined
        Given the VAT number is undefined
        When the checkVatNumberMinLength function is called
        Then it should return false

    Scenario: Handling API call to create and update VAT tax with error response
        Given the API call ID is for creating and updating VAT tax
        And the API response contains an error
        When the manageApiResponse function is called
        Then the error message should be set

    Scenario: Handling API call to create and update VAT tax with valid response
        Given the API call ID is for creating and updating VAT tax
        And the API response contains valid VAT data
        When the manageApiResponse function is called
        Then the success model should be displayed

    Scenario: VAT number is valid and contains no spaces
        Given the VAT number is valid
        And the VAT number contains no spaces
        When the error message check is triggered
        Then the function should return false

    Scenario: VAT number is invalid or contains spaces
        Given the VAT number is invalid
        And the VAT number contains spaces
        When the error message check is triggered
        Then the function should return true