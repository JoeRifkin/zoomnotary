Feature: Tasks

    Scenario: User navigates to TaskList
        Given I am a User loading TaskList
        When I navigate to the TaskList
        Then TaskList will load without errors
        And I can click the buttons
        And User can select Add task list modal button without errors
        And I can input the information and click the add button
        When the user clicks on the get tasks list
        Then the Task list data will load without errors
        When the user edit task list details and save the data
        When the user delete task list data
        And I can leave the screen without errors