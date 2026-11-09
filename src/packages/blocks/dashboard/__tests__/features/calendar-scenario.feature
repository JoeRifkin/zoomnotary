Feature: Calendar

  Scenario: User navigates to Calendar
    Given I am a User loading Calendar
    When I navigate to the Calendar
    Then Calendar will load without errors

    When user tap on the month or week
    Then he will see the modal and change the calendar view

    When user tap renotary tab
    Then he will see timelines

    When user tap google tab and he isnt logged in
    Then he will see sync now button

    When user tap on the sync now button
    Then he will see timelines


    When user tap outlook tab and he isnt logged in
    Then he will see sync now button

    When user tap on the sync now button
    Then he will see timelines

Scenario: Successfully sign in with Microsoft
        Given I have a valid configuration for Microsoft login
        When I call the "signInWithMicrosoft" function
        Then the access token should be saved in AsyncStorage
        And I should see a success alert



Scenario: Sign-in process throws an error
    Given I have an invalid configuration for Microsoft login
    When I call the "signInWithMicrosoft" function
    Then I should see an error alert for sign-in failure
    And I can sync outlook calander successfully