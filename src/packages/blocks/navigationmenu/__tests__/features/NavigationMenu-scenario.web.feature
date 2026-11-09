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
