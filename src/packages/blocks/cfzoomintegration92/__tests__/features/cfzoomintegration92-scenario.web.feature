Feature: cfzoomintegration92

    Scenario: User navigates to cfzoomintegration92 and inputs text
        Given I am a User loading cfzoomintegration92
        When I navigate to the cfzoomintegration92
        Then cfzoomintegration92 will load with out errors
        Then I can enter text with out errors
        Then I can select the button with out errors
        Then I can leave the screen with out errors

    Scenario: User navigates to cfzoomintegration92 and inputs a password
        Given I am a User loading cfzoomintegration92
        When I navigate to the cfzoomintegration92
        When I want to enter a password
        Then cfzoomintegration92 will load with out errors
        Then the text input field will be a password field
        Then I can enter text with out errors
        Then I can toggle to show the password
        Then I can select the button with out errors
        Then I can leave the screen with out errors