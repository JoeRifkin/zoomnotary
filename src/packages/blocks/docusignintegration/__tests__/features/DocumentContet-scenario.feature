Feature: DocumentContet

    Scenario: User navigates to DocumentContet
        Given I am a User loading DocumentContet
        When I navigate to the DocumentContet
        Then DocumentContet will load with out errors
        When I can click back button with with out errors
        Then I can click sign button with with out errors
        And I can leave the screen with out errors