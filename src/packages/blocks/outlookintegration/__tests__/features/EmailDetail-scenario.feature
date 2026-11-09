Feature: EmailDetail

    Scenario: User can view and interact with EmailDetail
        Given I am a User on the EmailDetail page
        When I view the EmailDetail
        Then I should be able to click reply button
        And I should be able to click forward button
        Then the app URL with the correct idEmail should open successfully
        And if the app URL fails, the web URL with correct webLink should open successfully