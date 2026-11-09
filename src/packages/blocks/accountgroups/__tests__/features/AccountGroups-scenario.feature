Feature: Tasks

    Scenario: User navigates to Group
        Given I am a User loading Group
        When I navigate to the Group
        Then Group will load without errors
        And I can click the buttons
        Then User can select Add group modal button without errors
        Then user try to add group without entering the group name
        When the user add group name and save group data
        When the user clicks on the get groups
        Then the Groups data will load without errors
        When the user edit group name and save group data
        Then user edit group name without entering the group name
        When the user open and update add account modal and data
        When the user opens delete account modal and updates the data
        And I can leave the screen without errors