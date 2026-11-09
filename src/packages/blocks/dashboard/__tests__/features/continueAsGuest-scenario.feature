Feature: continueAsGuest

    Scenario: User navigates to continueAsGuest
        Given I am a User loading continueAsGuest
        When I navigate to the continueAsGuest
        Then continueAsGuest will load with out errors
        Then i can click on back arrow icon with out errors
        Then I can select service with out errors
        Then I can select Date From ccalendar with out errors
        Then I can select Button from popup with out errors
        Then I can select Yes procced Button from popup with out errors
        Then I can select No Button from popup with out errors
        Then I can select Cancel button from step first with out errors
        Then I can Click on add more documet Button with out errors
        Then I can Click on remove documet Button with out errors
        Then I can Click on plus minus button to add doc count with out errors
        Then I can Click and date an time field to open calendar model with out errors
        Then I can enter notes with out errors
        Then Handle when gettin dropdown service api response without error
        Then I can Click on steps with out errors
        Then I can select method of notarization from dropdown with out errors
        Then I can select type of Jurisdiction from dropdown with out errors
        Then I can open calendar modal with out errors
        
        Then I can click on Next button of step 1 with out errors
        Then click on upload document button without error
        Then I can click on First checkbox with out errors
        Then I can click on second checkbox with out errors
        Then I can click on remove documnet file button without error
        Then I can click on upload documnet file button without error
        Then I can click on Next button of step 2 with out errors
        Then I can click on add more receipants button without error
        Then the recipient should be added successfully
        Then I can click on Remove receipants button without error
        Then I can enter name in to recipants with out errors
        Then I can enter email in to recipants with out errors
        Then I can click on create request button of step 3 with out errors
        Then New invite get Profile data if API success
        Then New invite get will notary services data if API success
        And New Notary request will notary services data if API success
        And New Notary request will Country list data if API success
        And New Notary request will notrazation method data if API success
        And New Notary request will country code data if API success
        And guest user email exist data if API success
        And New Notary request for create new notary data if API success
        Then After Notary created goto sucess screen without error
        And I can leave the screen with out errors
    
    Scenario: Checking if the array contains any blank objects
        Given an array of objects
        When checking for blank objects
        Then it should return true if the array contains a blank object
        And it should return false if the array does not contain any blank objects

    Scenario: Extract data from Jurisdictions API response
        Given a mock API response
        When the handleJurisdictionsApiData function is called with the response
        Then the country list state should be updated with the extracted data

    Scenario: Extract data from service API response
        Given a mock API response
        When the handleServiesApiData function is called with the response
        Then the services list state should be updated with the extracted data

    Scenario: Open camera and handle image from camera
        Given the user wants to open the camera
        When the openDocumentPicker function is called with the type "Camera"
        Then the handleImagePicker function should be called with the image from camera

    Scenario: Open photo gallery and handle image selection
        Given the user wants to open the photo gallery
        When the openDocumentPicker function is called with the type "Photos"
        Then the handleImagePicker function should be called with the selected image

    Scenario: Select document from file picker and handle selection
        Given the user wants to select a document from the file picker
        When the openDocumentPicker function is called with an invalid type
        Then the file picker should be invoked and handleImagePicker function should be called with the selected document

    Scenario: Handle dropdown open close and image change
        Given I have the function which is open close dropdown
        When I call the openCloseDropdown function
        Then I should see dropdown is open and image changes

        When I call the closeDropDownOfNotarization function
        Then I should see dropdown is open and image changes

        When I call the openServicesDropdown function
        Then I should see dropdown is open and image changes

        When I call the closeDropDownOfServices function
        Then I should see dropdown is open and image changes

        When I call the openJuridactionDropdown function
        Then I should see dropdown is open and image changes

        When I call the closeDropDownOfJuridaction function
        Then I should see dropdown is open and image changes

    Scenario: Toggling a document
        Given the initial state of toggledDocuments is {}
        When I toggle the document "doc1"
        Then the state of toggledDocuments should be {"doc1": true}
        When I toggle the document "doc1" again
        Then the state of toggledDocuments should be {"doc1": false}

    Scenario: Document is not toggled
        Given the document is "document1"
        And the document is not toggled
        When I call the getArrowImg function
        Then I should get the up arrow image

    Scenario: Document is toggled
        Given the document is "document1"
        And the document is toggled
        When I call the getArrowImg function
        Then I should get the down arrow image
    
    Scenario: Render style for iOS
        Given the platform is iOS
        When the renderStyleAccordingToOS function is called
        Then it should return "paddBottTop"

    Scenario: Render style for Android
        Given the platform is Android
        When the renderStyleAccordingToOS function is called
        Then it should return "padd"

    Scenario: Render error style when step one validation fails and selected day is empty
        Given the step one validation is true
        When the renderUIStyleOfDateAndTime function is called
        Then it should return "errorOfField"

    Scenario: Render text field background style when step one validation passes or selected day is not empty
        Given the step one validation is true
        When the renderUIStyleOfDateAndTime function is called
        Then it should return "textFieldBg"

    Scenario: Document has signatory
        Given the document details with a signatory
        When the function is called
        Then the result should be true

    Scenario: Document has no signatory
        Given the document details without a signatory
        When the function is called
        Then the result should be false

    Scenario: Remove a document when multiple documents exist
        Given a component with 3 documents
        When the removeDocFromList function is called with index 1
        Then the component should have 2 documents
        And the number of documents state should be updated to 2

    Scenario: Do not remove a document when only one document exists
        Given a component with 1 document
        When the removeDocFromList function is called with index 0
        Then the component should still have 1 document
        And the number of documents state should still be 1

    Scenario: Successfully handles session response message
        Given I have a valid session response message
        When I handle the session response message
        Then the userID and token should be set in the state

    Scenario: Successfully handles navigation payload message with valid data
        Given I have a valid navigation payload message
        When I handle the navigation payload message
        Then the selectedActionType should be set
        And the getRequestDetail method should be called with the correct requestId

    Scenario: Handles navigation payload message with no data
        Given I have an invalid navigation payload message
        When I handle the navigation payload message
        Then the selectedActionType should not be set
        And the getRequestDetail method should not be called

    Scenario: Handle successful notary creation response
        Given I have a successful notary creation response
        When I handle the create new notary response
        Then isNewRequestCreated should be set to true
        And isLoader should be set to false

    Scenario: Handle unsuccessful notary creation response
        Given I have an unsuccessful notary creation response
        When I handle the create new notary response
        Then isNewRequestCreated should not be set
        And isLoader should be set to false

    Scenario: Process valid NotaryRequest response
        Given a valid NotaryRequest response
        When the handleRequestDetailApiData function is called
        Then the state should be updated with the response data

    Scenario: Process NotaryRequest response with no file documents
        Given a NotaryRequest response with no file documents
        When the handleRequestDetailApiData function is called
        Then the state should be updated without file document details

    Scenario: Increase the number of documents
        Given the initial number of documents is 5
        When the user clicks the "plus" button
        Then the number of documents should be 6

    Scenario: Increase the number of documents when at max limit
        Given the initial number of documents is 10
        When the user clicks the "plus" button
        Then the number of documents should remain 10

    Scenario: Decrease the number of documents
        Given the initial number of documents is 5
        When the user clicks the "minus" button
        Then the number of documents should be 4

    Scenario: Decrease the number of documents when at min limit
        Given the initial number of documents is 0
        When the user clicks the "minus" button
        Then the number of documents should remain 0

    Scenario: Navigate to step 2 when the first step button is enabled
        Given the first step button is enabled
        And the current step number is 1
        When the user navigates to step 2
        Then the step number should be 2

    Scenario: Do not navigate to step 2 when the first step button is disabled
        Given the first step button is disabled
        And the current step number is 1
        When the user navigates to step 2
        Then the step number should remain 1

    Scenario: Navigate to step 3 when the second step button is enabled
        Given the second step button is enabled
        And the current step number is 2
        When the user navigates to step 3
        Then the step number should be 3

    Scenario: Do not navigate to step 3 when the second step button is disabled
        Given the second step button is disabled
        And the current step number is 2
        When the user navigates to step 3
        Then the step number should remain 2

    Scenario: Transform dynamic object with file details and recipients
        Given a dynamic object with file details and recipients
        When the transformDynamicObject function is called
        Then it should return the transformed object with base64, file, and recipients_attributes

    Scenario: Transform dynamic object with file having no size
        Given a dynamic object with a file having no size
        When the transformDynamicObject function is called
        Then it should return the transformed object with the original path as base64

    Scenario: Transform dynamic object with file having size and uri
        Given a dynamic object with a file having size and uri
        When the transformDynamicObject function is called
        Then it should return the transformed object with base64 converted from uri

    Scenario: Transform dynamic object with file having size but no uri
        Given a dynamic object with a file having size but no uri
        When the transformDynamicObject function is called
        Then it should return the transformed object with base64 read from file path

    Scenario: Pressing the button without enabled secondary step button
        Given a state where secondary step button is not enabled
        When the onPress function of btnNextStepsSecProps is called
        Then it should set isStepSecValidatin and docValidationMsg to true
        And it should return false

    Scenario: Pressing the button with enabled secondary step button
        Given a state where secondary step button is enabled
        When the onPress function of btnNextStepsSecProps is called
        Then it should set isStepSecValidatin to false
        And it should update documentsObject and recipients state
        And it should set stepsNo to 3
        And it should set documnetDetail with updated documentsObject

    Scenario: Navigate to step 2 with enabled first step button
        Given a state where first step button is enabled
        When the goToSteps function is called with step number 2
        Then it should set stepsNo to 2

    Scenario: Navigate to step 3 with enabled secondary step button
        Given a state where secondary step button is enabled
        When the goToSteps function is called with step number 3
        Then it should set stepsNo to 3
        And it should update documnetDetail and documentList

    Scenario: Selected action type is edit
        Given the selected action type is "edit"
        When I get the title of the notary flow page
        Then the title should be "Edit Notary Request"

    Scenario: Selected action type is not edit
        Given the selected action type is not "edit"
        When I get the title of the notary flow page
        Then the title should be "New Notary Request"

    Scenario: Selected action type is edit for sucess screen
        Given the selected action type is "edit"
        When I get the success message screen page
        Then the message should be "Notary Request updated Successfully"

    Scenario: Selected action type is not edit for sucess screen
        Given the selected action type is not "edit"
        When I get the success message screen page
        Then the message should be "Notary Request created Successfully"

    Scenario: Validate recipient name when isStepThiredValidation is true and name is empty
        Given the step third validation is true
        When the recipient name is ""
        Then the validation message should be true

    Scenario: Validate recipient name when isStepThiredValidation is true and name is only whitespace
        Given the step third validation is true
        When the recipient name is "   "
        Then the validation message should be true

    Scenario: Validate recipient name when isStepThiredValidation is true and name is not empty
        Given the step third validation is true
        When the recipient name is "John Doe"
        Then the validation message should be false

    Scenario: Validate recipient name when isStepThiredValidation is false
        Given the step third validation is false
        When the recipient name is ""
        Then the validation message should be false

    Scenario: Valid recipient's name
        Given the input text is "John_Doe"
        When the function handleRecipantsName is called
        Then the result should be true

    Scenario: Invalid recipient's name (starts with a number)
        Given the input text is "1John_Doe"
        When the function handleRecipantsName is called
        Then the result should be false

    Scenario: Invalid recipient's name (contains special characters)
        Given the input text is "John@Doe"
        When the function handleRecipantsName is called
        Then the result should be false

    Scenario: Valid recipient's name with spaces
        Given the input text is "John Doe"
        When the function handleRecipantsName is called
        Then the result should be true

    Scenario: Invalid recipient's name with additional validation step
        Given the input name is "John@Doe"
        And the step third validation is enabled
        When the function getRecipantNameValidation is called
        Then the result should be true

    Scenario: Valid recipient's name with additional validation step
        Given the input name is "John_Doe"
        And the step third validation is enabled
        When the function getRecipantNameValidation is called
        Then the result should be false

    Scenario: Invalid recipient's name but step third validation is disabled
        Given the input name is "John@Doe"
        And the step third validation is disabled
        When the function getRecipantNameValidation is called
        Then the result should be false

    Scenario: Empty name with step third validation enabled
        Given the input name is ""
        And the step third validation is enabled
        When the function getRecipantNameValidation is called
        Then the result should be false

    Scenario: Button name for edit action
        Given the selected action type is "edit"
        When I call the getButtonName function
        Then the button name should be "Update"

    Scenario: Button name for create action
        Given the selected action type is not "edit"
        When I call the getButtonName function
        Then the button name should be "Create Request"

    Scenario: Document can be removed
        Given a document view item with a specific path
        When the canBeRemoved function is called
        Then it should return true

    Scenario: Document cannot be removed
        Given a document view item with a specific path
        When the canBeRemoved function is called
        Then canBeRemoved function should return false

    Scenario: Render error style when step one validation fails
        Given the step one validation is true
        When the renderUIStyleOfDateTime function is called
        Then it should return "errorOfFieldView"

    Scenario: Render text field background validation passes or selected day is not empty
        Given the step one validation is true
        When the renderUIStyleOfDateTime function is called
        Then it should return "textFieldBgView"

    Scenario: Invalid recipient's name with additional validation
        Given the input name is "John@Doe"
        And the step third validation is enabled
        When the function getRecipantValidation is called
        Then the result should be false

    Scenario: Valid recipient's name with additional validation
        Given the input name is "John_Doe"
        And the step third validation is enabled
        When the function getRecipantValidation is called
        Then the result should be true

    Scenario: Invalid recipient's name but step third validation is
        Given the input name is "John@Doe"
        And the step third validation is disabled
        When the function getRecipantValidation is called
        Then the result should be true

    Scenario: Empty name with step third validation
        Given the input name is ""
        And the step third validation is enabled
        When the function getRecipantValidation is called
        Then the result should be true

    Scenario: User toggles a document to show an added participant
        Given the component's initial state with no toggled documents
        When the user toggles the document "doc1"
        Then the document "doc1" should be set to false in the toggledDocuments state

    Scenario: Menu width for end user role
        Given the user role is "end_user"
        When the getMenuWidth function is called
        Then the menu width should be 160

    Scenario: Menu width for other roles
        Given the user role is "admin"
        When the getMenuWidth function is called
        Then the menu width should be 175

    Scenario: Set service type detail with valid serviceId and serviceName
        Given the service ID is "SERVICE_ID"
        And the service name is "SERVICE_NAME"
        When I get the service type detail
        Then the selected service should have value "SERVICE_ID"
        And the selected service should have label "SERVICE_NAME"

    Scenario: Scroll the view to the top
        Given the scrollViewRef is set
        When I call the scrollToTop function
        Then the scroll view should scroll to the top
    
    Scenario: Process notarization API response and update state
        Given I have a response from the notarization API
        When I call handleNotrizationApiResponse with the response
        Then the state should update the notrizationList with the extracted data
        And getCountryListData should be called

    
    Scenario: All required fields are valid and button click proceeds to the next step
        Given the state has all required fields with valid values
        When I press the Step Zero Next button
        Then isStepZeroValidation should be set to false
        And stepsNo should be updated to 2
        And scrollToTop should be called

    Scenario: Some required fields are missing or invalid
        Given the state has missing or invalid values
        When I press the Step Zero Next button
        Then isStepZeroValidation should be set to true
        And stepsNo should remain unchanged
        And scrollToTop should not be called

    Scenario: All required fields are valid
        Given the state has all required fields with valid values
        When I call getZeroStepBtnEnabled
        Then the function should return true

    Scenario: Some required fields are missing or invalid use
        Given the state has missing or invalid values
        When I call getZeroStepBtnEnabled
        Then the function should return false

    Scenario: Select a country option
        Given the dropdown is open
        When I select a country option with value "USA"
        Then the state should update the country to "USA"

    Scenario: Open the country dropdown
        When I call openDropdownOfCountry
        Then the state should set isCountryDropDownOpen to true

    Scenario: Close the country dropdown
        When I call closeDropDownOfCountry
        Then the state should set isCountryDropDownOpen to false

    Scenario: Open the country code dropdown
        When I call openDropdownOfCountryCode
        Then the state should set isCountryCodeDropDownOpen to true

    Scenario: Close the country code dropdown
        When I call closeDropDownOfCountryCode
        Then the state should set isCountryCodeDropDownOpen to false

    Scenario: Set country code
        When I call txtInputCountryCodePrpos with value "+1"
        Then the state should update the countryCode to "+1"

    Scenario: Update phone number
        When I call txtInputPhoneNumProps.onChangeText with text "1234567890"
        Then the state should update the mobileNumber to "1234567890"

    Scenario: Update user name
        When I call txtInputUserNameProps.onChangeText with text "John Doe"
        Then the state should update the userName to "John Doe"

    Scenario: Update address line one
        When I call txtInputAddressOneProps.onChangeText with text "123 Main St"
        Then the state should update the addressOne to "123 Main St"

    Scenario: Update address line two
        When I call txtInputAddressTwoProps.onChangeText with text "Apt 4B"
        Then the state should update the addressTwo to "Apt 4B"

    Scenario: Update city
        When I call txtInputCityProps.onChangeText with text "New York"
        Then the state should update the city to "New York"

    Scenario: Update post code
        When I call txtInputPostCodeProps.onChangeText with text "10001"
        Then the state should update the postCode to "10001"

    Scenario: Update email
        When I call txtInputEmailProps.onChangeText with text "john.doe@example.com"
        Then the state should update the email to "john.doe@example.com"

    Scenario: Validation fails due to missing inputs
        Given the selected service is null
        And the selected notarisation is null
        And the number of documents is 0
        And the selected day is an empty string
        When I press the "Next Steps" button
        Then the step validation state should be true
        And the step number should remain unchanged

    Scenario: Validation passes and navigates to the next step
        Given the selected service is "Service A"
        And the selected notarisation is "Notarisation A"
        And the number of documents is 2
        And the selected day is "2024-12-24"
        When I press the "Next Steps" button
        Then the step validation state should be false
        And the step number should be 3

    Scenario: Error message is not displayed when there is no validation message
        Given step two validation is active
        And there is no document validation message
        And the document has no name and no path
        When I call the "renderErrorMsg" method with the document
        Then it should return false

    Scenario: Extracting the file name when a valid file path is provided
        Given a valid file path "folder/subfolder/file.txt"
        When I call the "getSelectedFileName" function with the file path
        Then it should return "file.txt"

    Scenario: Button press with invalid conditions (validation fails)
        Given the "getCreateRequestBtnEnabled" function returns false
        When I press the "Next Step Third" button
        Then it should set "isStepThiredValidation" to true
        And should return false without calling "getFormData" or "createNewNotary"

    Scenario: User selects a past month
        Given the new month is before the current month
        When the user changes the month
        Then it should not update the state

    Scenario: Text box is empty and step zero validation is enabled
        Given the step zero validation is enabled
        And the text box value is empty
        When the validation is checked
        Then the style of the text box should be "errorOfField"
        And the error message visibility should be true

    Scenario: Text box is not empty and step zero validation is enabled
        Given the step zero validation is enabled
        And the text box value is not empty
        When the validation is checked
        Then the style of the text box should be "textFieldBg"
        And the error message visibility should be false

    Scenario: Text box value is irrelevant when step zero validation is disabled
        Given the step zero validation is disabled
        When the validation is checked
        Then the style of the text box should be "textFieldBg"
        And the error message visibility should be false

    Scenario: User navigates to the login page from the email alert model
        When the user presses the "Go to Login Page" button
        Then the email alert model should close
        And the "callLogInBtn" function should be called

    Scenario: User closes the email alert model
        When the user presses the "Close Email Alert Model" button
        Then the email alert model should close
        And User will able to select 4th step after compliting 3rd