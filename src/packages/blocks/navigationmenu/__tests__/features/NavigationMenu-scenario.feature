Feature: NavigationMenu

    Scenario: User navigates to NavigationMenu
        Given I am a User loading NavigationMenu
        When I navigate to the NavigationMenu
        Then NavigationMenu will load with out errors
        Then I can change Status Offline to oline without errors
        Then I can select the back button with out errors
        And I can leave the screen with out errors

    Scenario: Successfully fetch user details from storage
        Given there is user profile data stored
        When the getUserDetail function is called
        Then the UserProfileDetail should be populated with the user data

    Scenario: Handle empty or null user profile data
        Given there is no user profile data stored
        When the getUserDetail function is called
        Then the UserProfileDetail should be an empty object

    Scenario: Redirecting to Terms and Conditions page
        Given I have a key tandc
        When I call the redirectToPage function with the key
        Then it should send a NavigationTermAndConditionMessage

    Scenario: Redirecting to Privacy and Policy page
        Given I have a key pandp
        When I call the redirectToPage function with the key
        Then it should send a NavigationTermAndConditionMessage

    Scenario: Redirecting to Profile page
        Given I have a key profile
        When I call the redirectToPage function with the key
        Then it should send a NavigationBasicUserProfileMessage

    Scenario: Redirecting to Notary Services page
        Given I have a key service
        When I call the redirectToPage function with the key
        Then it should send a NavigationNotaryServicesMessage

    Scenario: Redirecting to Transaction History page
        Given have a key pay
        When call the redirectToPage function with the key
        Then the function should send a NavigationTransactionHistoryMessage

    Scenario: Redirecting to Setting page
        Given have a key setting
        When call the redirectToPage function with the key
        Then the function should send a NavigationSettingsMessage

    Scenario: Redirecting to FAQs page
        Given have a key FAQs
        When call the redirectToPage function with the key
        Then the function should send a NavigationFAQsMessage


    Scenario: logout user
        Given user navigates to profile screen
        When user taps the logout modal
        Then then will click yes to logout

    Scenario: Process API response containing FAQs
        Given an API response message containing FAQs
        When the handleFAQsApiResponse function is called
        Then the state should be updated with FAQs data

    Scenario: Open email client with specified email address
        Given a user wants to send an email
        When the handleEmailLink function is triggered
        Then the default email client should open with the correct email address

    Scenario: Filter FAQs based on the user input
        Given a list of FAQs and a search query
        When the user enters a search query
        Then the FAQs should be filtered based on the query

    Scenario: Display all FAQs when the search query is cleared
        Given a list of FAQs and a search query
        When the user clears the search query
        Then all FAQs should be displayed

    Scenario: Open a closed question
        Given no question is currently open
        When the user toggles a question with index 1
        Then the question with index 1 should be opened

    Scenario: Close an already opened question
        Given a question with index 2 is currently open
        When the user toggles the same question with index 2
        Then no question should be open

    Scenario: Open a different question
        Given a question with index 2 is currently open
        When the user toggles a different question with index 3
        Then the question with index 3 should be opened

    Scenario: Go back to the menu page
        Given the FAQs page is open
        When the user clicks the "Go Back to Menu" button
        Then the FAQs page should be closed

    Scenario: Get selected FAQ question status
        Given a question is selected with index number 1
        When I check if the question with index number 1 is selected
        Then it should return true
        When I check if the question with index number 2 is selected
        Then it should return false

    Scenario: Get selected FAQ arrow image
        Given a question is selected with index number 1
        When I check the arrow image for the selected question with index number 1
        Then it should return the up arrow image
        When I check the arrow image for a non-selected question with index number 2
        Then it should return the down arrow image

    Scenario: User logs out successfully
        Given the user is logged in
        When the onSubmitLogout function is called
        Then all session data should be cleared
        And the user should be navigated to the login screen
        And the logout modal should be closed