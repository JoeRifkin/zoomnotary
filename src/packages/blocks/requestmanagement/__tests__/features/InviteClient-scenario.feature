Feature: InviteClient

    Scenario: User navigates to InviteClient
        Given I am a User loading InviteClient
        When I navigate to the InviteClient
        When User click on launch meeting button
        Then User enter Input Name invite client
        Then User enter Input email invite client
        Then User click to dropDown country code
        Then User Enter Phone number
        Then User Enter invite client fees
        Then User click to check isCheckedFees

Scenario: Handle dropdown open close and image change
        Given I have the function which is open close dropdown
        When I call the openCloseDropdown function
        Then I should see dropdown is open and image changes
        Then I should see dropdown is open and methodOfNotarisationID changes
        Then I can Click and date an time field to open calendar model with out errors
        Then I can select Date From ccalendar with out errors
        Then I can select show picker
        Then I can select end time picker
        Then I can Enter message note invite client
        Then I can select Yes procced Button from popup with out errors
        Then I can select No Button from popup with out errors
        Then I can enter create invite Client
        Then invite client request for create new notary data if API success
        Then invite client Handle applicant create API response
        Then invite client servcie list response error
        Then invite client getNotrizationMethodApiCallId create API response

    Scenario: Return true when selectedNotarisation is valid and label does not include "RIN"
        Given the selectedNotarisation is valid and its label does not include "RIN"
        When the showAstrickForVide function is called
        Then the function should return true

    Scenario: Return false when selectedNotarisation is null
        Given the selectedNotarisation is null
        When the showAstrickForVide function is called
        Then the function should return false

    Scenario: Return false when selectedNotarisation label is missing
        Given the selectedNotarisation does not have a label
        When the showAstrickForVide function is called
        Then the function should return false

    Scenario: Return false when selectedNotarisation label includes "RIN"
        Given the selectedNotarisation label includes "RIN"
        When the showAstrickForVide function is called
        Then the function should return false

    Scenario: Start time is less than end time and meets the minimum gap
        Given start time is "10:00 AM", end time is "11:30 AM", and the minimum gap is 30 minutes
        When the isStartTimeLessThanEndTime function is called
        Then the function should return true

    Scenario: Start time is equal to end time
        Given start time is "10:00 AM", end time is "10:00 AM", and the minimum gap is 30 minutes
        When the isStartTimeLessThanEndTime function is called
        Then the function should return false

    Scenario: Start time is greater than end time
        Given start time is "02:00 PM", end time is "01:30 PM", and the minimum gap is 30 minutes
        When the isStartTimeLessThanEndTime function is called
        Then the function should return false

    Scenario: Start time is less than end time but does not meet the minimum gap
        Given start time is "10:00 AM", end time is "10:15 AM", and the minimum gap is 30 minutes
        When the isStartTimeLessThanEndTime function is called
        Then the function should return false

    Scenario: Form validation succeeds with valid input
        Given the user has filled all required fields correctly
        When the validateForm function is called
        Then the function should return true

    Scenario: Form validation fails due to missing required fields
        Given the user has not filled all required fields
        When the validateForm function is called
        Then the function should return false with specific error messages

    Scenario: Invalid email format
        Given the user enters an invalid email
        When the validateForm function is called
        Then the function should return false with an error message "Enter a valid email address."

    Scenario: Invalid mobile number format
        Given the user enters an invalid mobile number
        When the validateForm function is called
        Then the function should return false with an error message "Enter a valid 10-digit mobile number."

    Scenario: Fees field is not numeric
        Given the user enters non-numeric fees
        When the validateForm function is called
        Then the function should return false with an error message "Fees must be a numeric value."

    Scenario: Start time is not less than end time
        Given the start time is later than the end time
        When the validateForm function is called
        Then the function should return false with an error message "Start time must be less than end time."

    Scenario: Required video notarization checkbox not checked
        Given the user has selected a notarization type requiring video but has not checked the required box
        When the validateForm function is called
        Then the function should return false with an error message "Video notarization requirement not fulfilled."
        And get availability api called successfully
        And User can click on okay button on modal

    Scenario: Invalid mobile number when length is less than 9
        Given all fields are validated and mobile number is less than 9 digits
        When the function is called
        Then it should return true

    Scenario: Valid case when mobileNumber is empty
        Given mobile number is empty
        When the function is called
        Then it should return false

    Scenario: State updates when getButtonEnabledForTimeSave returns true for start time
        Given the selected time type is 'start time' and selectedStartTimeTxt is not empty
        When the yesProceedToChangesTimeSelection function is called
        Then it should update the state to close the time selection model

    Scenario: State updates when getButtonEnabledForTimeSave returns true for end time
        Given the selected time type is 'end time' and selectedEndTimeTxt is not empty
        When the yesProceedToChangesTimeSelection function is called
        Then it should update the state to close the time selection model

    Scenario: State does not update when getButtonEnabledForTimeSave returns false for start time
        Given the selected time type is 'start time' and selectedStartTimeTxt is empty
        When the yesProceedToChangesTimeSelection function is called
        Then it should not update the state

    Scenario: State does not update when getButtonEnabledForTimeSave returns false for end time
        Given the selected time type is 'end time' and selectedEndTimeTxt is empty
        When the yesProceedToChangesTimeSelection function is called
        Then it should not update the state

    Scenario: closeTimeSelectionModel updates state correctly when timeType is 'start time'
        Given the timeType is 'start time' and selectedStartTimeTxt has a value
        When the closeTimeSelectionModel function is called
        Then it should update the state and clear selectedStartTimeTxt

    Scenario: closeTimeSelectionModel updates state correctly when timeType is 'end time'
        Given the timeType is 'end time' and selectedEndTimeTxt has a value
        When the closeTimeSelectionModel function is called
        Then it should update the state and clear selectedEndTimeTxt

    Scenario: noToChangesTimeSelection.onPress() calls closeTimeSelectionModel
        Given the component is rendered
        When noToChangesTimeSelection.onPress() is called
        Then it should call closeTimeSelectionModel

    Scenario: onStartAndEndTimeChange updates selectedStartTime and selectedStartTimeTxt when timeType is 'start time'
        Given the timeType is 'start time'
        When onStartAndEndTimeChange is called
        Then it should update selectedStartTime and selectedStartTimeTxt in state

    Scenario: onStartAndEndTimeChange updates selectedEndTime and selectedEndTimeTxt when timeType is 'end time'
        Given the timeType is 'end time'
        When onStartAndEndTimeChange is called
        Then it should update selectedEndTime and selectedEndTimeTxt in state

    Scenario: Formatting time in AM/PM format
        Given a Date object with time 14:05
        When convertDateTimeIntoTime is called
        Then it should return '02:05 PM'

    Scenario: convertDateTimeIntoTime correctly formats 12 AM and 12 PM
        Given a Date object with time 00:30 and another with 12:45
        When convertDateTimeIntoTime is called
        Then it should return '12:30 AM' for 00:30 and '12:45 PM' for 12:45

    Scenario: renderUIStyleOfEndTime returns error when no end time is set
        Given selectedEndTimeTxt is empty
        When renderUIStyleOfEndTime is called
        Then it should return 'errorOfField'

    Scenario: renderUIStyleOfEndTime returns 'textFieldBg' when selectedEndTimeTxt is not empty
        Given selectedEndTimeTxt is '03:15 PM'
        When renderUIStyleOfEndTime is called
        Then it should return 'textFieldBg'

    Scenario: Updating selected currency
        Given a user enters a currency value 'USD'
        When txtInputCurrencyPrpos is called with 'USD'
        Then it should update selectedCurrency in state

    Scenario: txtInputFeesProps.onChangeText updates fees state
        Given a user enters a fee amount '100'
        When txtInputFeesProps.onChangeText is called with '100'
        Then it should update fees in state

    Scenario: Updating additional message input field
        Given a user enters an additional message 'Urgent'
        When txtInputAddMessageProps.onChangeText is called with 'Urgent'
        Then it should update additionalMessage in state

    Scenario: renderStyleOfDataTImeFieldAccordingToOS returns correct style for iOS
        Given the platform is iOS
        When renderStyleOfDataTImeFieldAccordingToOS is called
        Then it should return 'paddTopBott'

    Scenario: Rendering style for Android
        Given the platform is Android
        When renderStyleOfDataTImeFieldAccordingToOS is called
        Then it should return 'padd'

    Scenario: getTimeSelectionModalOpen updates state for 'start time'
        Given the user selects 'start time'
        When getTimeSelectionModalOpen is called with 'start time'
        Then it should set isTimeSelectionModelOpen to true, update timeType and selectedStartTimeTxt

    Scenario: Opening time selection modal for end time
        Given the user selects 'end time'
        When getTimeSelectionModalOpen is called with 'end time'
        Then it should set isTimeSelectionModelOpen to true, update timeType and selectedEndTimeTxt

    Scenario: Cancel request button press
        Given the cancel request button is pressed
        When onCancelRequestBtnProps.onPress is called
        Then handleCancelRequest should be called

    Scenario: handleCancelRequest updates onModalOpen state to false
        Given onModalOpen is currently true
        When handleCancelRequest is called
        Then onModalOpen should be set to false

    Scenario: getMarTopOnError returns 'topMar' when error is visible
        Given isErrorMesVisible returns true
        When getMarTopOnError is called
        Then it should return 'topMar'

    Scenario: getMarTopOnError returns 'marTopNon' when isErrorMesVisible is false
        Given isErrorMesVisible returns false
        When getMarTopOnError is called
        Then it should return 'marTopNon'

    Scenario: isErrorMesVisible returns true for null or blank values
        Given the input value is null or blank
        When isErrorMesVisible is called with an empty string
        Then it should return true

    Scenario: isErrorMesVisible returns false for non-blank values
        Given the input value is not blank
        When isErrorMesVisible is called with 'USD'
        Then it should return false

    Scenario: checkStartAndEndTime returns true when both times are set and within 30 minutes
    Given start and end times are selected and within 30 minutes
    When checkStartAndEndTime is called
    Then it should return true

  Scenario: checkStartAndEndTime returns false when times are more than 30 minutes apart
    Given start and end times are selected but more than 30 minutes apart
    When checkStartAndEndTime is called
    Then it should return false

  Scenario: checkStartAndEndTime returns false when any time is missing
    Given start time is missing
    When checkStartAndEndTime is called
    Then it should return false

  Scenario: showVideoReqError returns true when video call is required and fields are validated
    Given video call is required and all fields are validated
    When showVideoReqError is called
    Then it should return true

  Scenario: showVideoReqError returns false when fields are not validated
    Given video call is required but fields are not validated
    When showVideoReqError is called
    Then it should return false

  Scenario: checkVideoCallRequired returns true when notarisation does not contain 'RIN' and first box is unchecked
    Given selectedNotarisation does not contain 'RIN' and checkedFirstBox is false
    When checkVideoCallRequired is called
    Then it should return true

  Scenario: checkVideoCallRequired returns false when notarisation contains 'RIN'
    Given selectedNotarisation contains 'RIN'
    When checkVideoCallRequired is called
    Then it should return false

  Scenario: checkVideoCallRequired returns false when first box is checked
    Given checkedFirstBox is true
    When checkVideoCallRequired is called
    Then it should return false

    Scenario: checkTimeDifferenceErrorMsg returns true when start time is not at least 30 minutes before end time
        Given the start and end times are set but less than 30 minutes apart
        When checkTimeDifferenceErrorMsg is called
        Then it should return true

    Scenario: checkTimeDifferenceErrorMsg returns false when start time is at least 30 minutes before end time
        Given the start and end times are set and at least 30 minutes apart
        When checkTimeDifferenceErrorMsg is called
        Then it should return false