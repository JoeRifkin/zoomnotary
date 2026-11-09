Feature: DocumentOpener

    Scenario: User navigates to DocumentOpener
        Given I am a User loading DocumentOpener
        When I navigate to the DocumentOpener
        Then DocumentOpener will load with out errors
        When I click on open with url button to open document
        Then Document viewer should be open with url
        When Receive function is called
        Then I can leave the screen with out errors