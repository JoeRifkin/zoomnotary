Feature: Tasks

   Scenario: User navigates to Task
        Given I am a User loading Task
        When I navigate to the Task
        Then Task will load without errors
        And I can click the buttons
        And User can select Add task modal button without errors
        And I can input the information and click the add button
        When the user clicks on the get tasks
        Then the Task data will load without errors
        When the user edit task details and save the data
        When the user try to assign data without selection
        When the user open assign task to group or account modal
        And I can leave the screen without errors