Feature: Dashboard

    Scenario: User navigates to Dashboard
        Given I am a User loading Dashboard
        When I navigate to the Dashboard
        Then Dashboard will load with out errors
        When Get success api response on component mount
        Then Category type text should be matche with api reponse
        When Dashboard will display notifcation if API failure
        Then error state value should be set as api reponse
        And I can leave the screen with out errors