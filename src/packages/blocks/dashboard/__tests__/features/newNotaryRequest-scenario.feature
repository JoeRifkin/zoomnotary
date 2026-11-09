Feature: newNotaryRequest

    Scenario: User navigates to newNotaryRequest
        Given I am a User loading newNotaryRequest
        When I navigate to the newNotaryRequest
        Then newNotaryRequest will load with out errors
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
        And New Notary request will notary services data if API success
        And New Notary request will Country list data if API success
        And New Notary request will notrazation method data if API success
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

    Scenario: Save Draft button triggers createDarftNewNotary
        Given the Save Draft button is rendered
        When I press the Save Draft button
        Then the createDarftNewNotary function should be called

    Scenario: Cancel Request button triggers handleCancelRequest
        Given the Cancel Request button is rendered
        When I press the Cancel Request button
        Then the handleCancelRequest function should be called

    Scenario: Button validation fails due to missing inputs
        Given the user has not filled in the required fields
        When the user presses the "Next Steps" button
        Then the step one validation should be triggered
        And the function should return false without proceeding

    Scenario: Button proceeds to step two when inputs are valid
        Given the user has filled in all the required fields
        When the user presses the "Next Steps" button
        Then the step one validation should pass
        And the step number should change to two
        And the scrollToTop function should be called

    Scenario: Button does not proceed when getFirstStepBtnEnabled returns false
        Given the user has filled in all the required fields
        When the user presses the "Next Steps" button
        Then the step one validation should pass
        And the step number should remain unchanged
        And the scrollToTop function should not be called

    Scenario: Handle cancel request and navigation
        Given the user wants to cancel the request
        When the handleCancelRequest function is triggered
        Then a navigation message should be sent with the correct props
        And the modal visibility state should be set to false

    Scenario: Return Standard priority when selectedColor is #D1FAE5
        Given the selectedMarkedDate has a selectedColor of #D1FAE5
        When the getPriority function is called
        Then the function should return "Standard"

    Scenario: Return Priority when selectedColor is #FEF3C7
        Given the selectedMarkedDate has a selectedColor of #FEF3C7
        When the getPriority function is called
        Then the function should return "Priority"

    Scenario: Return Super Priority when selectedColor is neither #D1FAE5 nor #FEF3C7
        Given the selectedMarkedDate has a selectedColor of #FF0000
        When the getPriority function is called
        Then the function should return "Super Priority"

    Scenario: Return an empty string when selectedMarkedDate is null or selectedColor is undefined
        Given the selectedMarkedDate is null or has no selectedColor
        When the getPriority function is called
        Then the function should return an empty string
        And User is able to save draft successfully
        And User get Data api called successfully

    Scenario: User closes the Save Draft popup
        Given the Save Draft popup is visible
        When the user triggers the close event
        Then it should update the state to hide the modal

    Scenario: Show Save Draft Option when action type is 'edit'
        Given the selected action type is 'edit'
        When the function is called
        Then it should return true

    Scenario: Show Save Draft when all state values are default
        Given the selected service, notarisation, jurisdiction, and day are empty, and no documents are selected
        When the function is called
        Then it should return true

    Scenario: Do not show Save Draft when any state value is set
        Given some state values are selected
        When the function is called
        Then it should return false