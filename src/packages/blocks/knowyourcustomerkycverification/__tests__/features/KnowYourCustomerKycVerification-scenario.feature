 Feature:KnowYourCustomerKycVerification

    Scenario:User navigates to KnowYourCustomerKycVerification
        Given I am a User attempting to KnowYourCustomerKycVerification
        When I navigate to the KnowYourCustomerKycVerification Screen
        Then I can success with out errors
        And I can leave the screen with out errors 

    Scenario: Handle KYC request call ID
        Given I have a valid API response
        When I call manageResponse with apiRequestCallId as apiGetKycRequestCallId
        Then the state should update with the created KYC response
        And the loader state should be false
        And the getKycDocument method should be called

    Scenario: Handle KYC document call ID
        Given I have a valid API response
        When I call manageResponse with apiRequestCallId as apiGetKycDocumentCallId
        Then the state should update with the KYC document list
        And the loader state should be false

    Scenario: Handle KYC create call ID
        Given I have a valid API response
        When I call manageResponse with apiRequestCallId as apiKycCreateCallId
        Then the state should update with the created KYC response
        And the loader state should be false
        And the getCallKycRequest method should be called
    
    Scenario: Press the 'Not Have' radio button
        Given the component is loaded
        When I press the 'Not Have' radio button
        Then the state should update with 'selectedRadioBtn' as 'deep'

    Scenario: Press the 'Have' radio button
        Given the component is loaded
        When I press the 'Have' radio button
        Then the state should update with 'selectedRadioBtn' as 'id'

    Scenario: Service is already selected
        Given the service with id "1" is already selected
        When I click on select with service id "1"
        Then the service with id "1" should be removed from selectedDocument
        And isAllServicesSelected should be set to false

    Scenario: Service is not selected
        Given the service with id "2" is not selected
        When I click on select with service id "2"
        Then the service with id "2" should be added to selectedDocument

    Scenario: Button is enabled
        Given the selectedRadioBtn is not empty
        And the selectedDocument has elements
        When I check if the Send Request button is disabled
        Then the result should be true

    Scenario: Button is disabled due to empty selectedRadioBtn
        Given the selectedRadioBtn is empty
        And the selectedDocument has elements
        When I check if the Send Request button is disabled
        Then the result should be false

    Scenario: Button is disabled due to empty selectedDocument
        Given the selectedRadioBtn is not empty
        And the selectedDocument is empty
        When I check if the Send Request button is disabled
        Then the result should be false

    Scenario: Button is enabled and callSenRequest is triggered
        Given the isSendRequestBtnDisbale function returns true
        When I press the Send Request button
        Then the isLoader state should be set to true
        And the callSenRequest method should be called

    Scenario: Button is disabled and callSenRequest is not triggered
        Given the isSendRequestBtnDisbale function returns false
        When I press the Send Request button
        Then the isLoader state should not change
        And the callSenRequest method should not be called
    
    Scenario: User presses the Download Report button
        Given the notaryRequestId and token are set in the component state
        When I press the Download Report button
        Then a message with the correct type should be created
        And the message should be sent

     Scenario: Successfully process session data and set state
        Given a session response message is received with session token and user data
        When showSessionStoredData is called
        Then the state should be updated with token, user role, workflow ID, and notary request ID
        And the loader should be set to true
        And getCallKycRequest should be called

    Scenario: Image is checked when isSelected is true
        Given isSelected is true
        When the getImageCheckOrUnChecked function is called
        Then it should return imgChecked

    Scenario: Image is unchecked when isSelected is false
        Given isSelected is false
        When the getImageCheckOrUnChecked function is called
        Then it should return imgUnChecked

    Scenario: Apply style for checked radio button
        Given isSelected is true
        When the applyStyleForCheckOrUnChekced function is called
        Then it should return "radioLabelTxtselected"

    Scenario: Apply style for unchecked radio button
        Given isSelected is false
        When the applyStyleForCheckOrUnChekced function is called
        Then it should return "radioLabelTxt"

    Scenario: View status is pending
        Given status is "pending"
        When the statucCheckForView function is called
        Then it should return "inprogreeView"

    Scenario: View status is complete
        Given status is not "pending"
        When the statucCheckForView function is called
        Then it should return "completeView"

    Scenario: Text style for pending status
        Given status is "pending"
        When the statucCheckForTxt function is called
        Then it should return "inprogreeTxt"

    Scenario: Text style for complete status
        Given status is not "pending"
        When the statucCheckForTxt function is called
        Then it should return "completeTxt"

    Scenario: Text for pending status
        Given status is "pending"
        When the getTxtForStatus function is called
        Then it should return "IN PROGRESS"

    Scenario: Text for completed status
        Given status is not "pending"
        When the getTxtForStatus function is called
        Then it should return "COMPLETED"

    Scenario: Margin for non-empty value
        Given value is not an empty string
        When the getMarTop function is called
        Then it should return "marTop20"

    Scenario: Margin for empty value
        Given value is an empty string
        When the getMarTop function is called
        Then it should return "marTop220"

    Scenario: Radio button is selected
        Given selectedRadioBtn is not an empty string
        When the checkSelectedDocumnetValue function is called
        Then it should return true

    Scenario: Radio button is not selected
        Given selectedRadioBtn is an empty string
        When the checkSelectedDocumnetValue function is called
        Then it should return false

    Scenario: Status is pendingFirst for text
        Given status is "pendingFirst"
        When the getTxtForStatusFirst function is called
        Then it should return "IN PROGRESSFirst"

    Scenario: Status is not pendingFirst for text
        Given status is not "pendingFirst"
        When the getTxtForStatusFirst function is called
        Then it should return "COMPLETEDFirst"

    Scenario: Value is not an empty string for margin
        Given value is not an empty string
        When the getMarTopFirst function is called
        Then it should return "marTop20First"

    Scenario: Value is an empty string for margin
        Given value is an empty string
        When the getMarTopFirst function is called
        Then it should return "marTop220First"

    Scenario: Status is pendingFirst for view
        Given status is "pendingFirst"
        When the statucCheckForViewFirst function is called
        Then it should return "inprogreeViewFirst"

    Scenario: Status is not pendingFirst for view
        Given status is not "pendingFirst"
        When the statucCheckForViewFirst function is called
        Then it should return "completeViewFirst"

    Scenario: Status is pendingFirst for text view
        Given status is "pendingFirst"
        When the statucCheckForTxtFirst function is called
        Then it should return "inprogreeTxtFirst"

    Scenario: Status is not pendingFirst for text view
        Given status is not "pendingFirst"
        When the statucCheckForTxtFirst function is called
        Then it should return "completeTxtFirst"

    Scenario: User type is notary
        Given userType is "notary"
        When the isUserTypeNotary function is called
        Then it should return true

    Scenario: User type is not notary
        Given userType is not "notary"
        When the isUserTypeNotary function is called
        Then it should return false

    Scenario: User type is enduser
        Given userType is "enduser"
        When the isUserTypeEndUser function is called
        Then it should return true

    Scenario: User type is not enduser
        Given userType is not "enduser"
        When the isUserTypeEndUser function is called
        Then it should return false

    Scenario: User is a notary
        Given the user is of type notary
        When I check if the Notary User View should be displayed
        Then the result should be true

    Scenario: User has verified KYC status
        Given the user's KYC status is verified
        When I check if the Notary User View should be displayed
        Then the result should be true

    Scenario: User is not a notary and KYC status is not verified
        Given the user is not of type notary
        And the user's KYC status is not verified
        When I check if the Notary User View should be displayed
        Then the result should be false

Scenario: Successfully download a file
    Given I have a valid file URL
    When openFileUrlDownload is called
    Then the file should be downloaded to the specified path
    And a success alert should be displayed
    And the loader state should be set to false

  Scenario: Handle an error during file download
    Given I have an invalid file URL
    When openFileUrlDownload is called
    Then an error alert should be displayed
    And the loader state should remain as false

Scenario: Downloading a file when fileUrl is present
    Given a valid file URL is available
    When btnDownloadReportProps is pressed
    Then it should call openFileUrlDownload with the file URL

  Scenario: Button press does nothing when fileUrl is missing
    Given fileUrl is not defined
    When btnDownloadReportProps is pressed
    Then it should not call openFileUrlDownload