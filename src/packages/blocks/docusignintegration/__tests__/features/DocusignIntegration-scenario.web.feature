Feature: DocusignIntegration

    Scenario: User navigates to DocusignIntegration
        Given I am a User loading DocusignIntegration
        When I navigate to the DocusignIntegration
        Then Document list will load with out errors
        And I can leave the screen with out errors
    
    Scenario: User clear the sign and back to document list
        Given I am a User loading document sign playground
        When I click the clear button and back button
        Then document sign will be cleared and I moved to the document list page

    Scenario: User sign and submit the document e-sign
        Given I am a User loading document sign playground
        When I signed and click the submit button
        Then document sign will save with out errors and I moved to the document list page