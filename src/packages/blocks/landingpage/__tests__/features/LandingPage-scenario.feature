Feature: LandingPage

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then LandingPage will load with out errors
        And I can select the button with with out errors
        And I can select the back button with out errors
        And I can select the button login with with out errors
        And I can select the button tab need with with out errors
        And I can select the button tab am with with out errors
        And I can leave the screen with out errors

    Scenario: User type is am for showIamNotaryImg
        Given the userType is set to am
        When the showIamNotaryImg function is called
        Then it should return imgTintColor

    Scenario: User type is not am for showIamNotaryImg
        Given the userType is set to need
        When the showIamNotaryImg function is called
        Then it should return imgNoTintColor

    Scenario: User type is need for showINeedNotaryImg
        Given the userType is set to need
        When the showINeedNotaryImg function is called
        Then it should return imgTintColor

    Scenario: User type is not need for showINeedNotaryImg
        Given the userType is set to am
        When the showINeedNotaryImg function is called
        Then it should return imgNoTintColor