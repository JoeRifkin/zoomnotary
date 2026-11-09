Feature: emailnotifications2

    Scenario: User can input text into emailnotifications2
        Given I am a user loading emailnotifications2
        When I navigate to the emailnotifications2
        Then emailnotifications2 will load with out errors
        Then I can enter text with out errors
        Then I can select the button with with out errors
        Then I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading emailnotifications2
        When I navigate to the emailnotifications2
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from emailnotifications2
        Given I am a user loading emailnotifications2
        When I navigate to the emailnotifications2
        Then emailnotifications2 will load with out errors
        Then I can dismiss emailnotifications2

    Scenario: emailnotifications2 has event listeners for screen size changes added
        Given I am a user loading emailnotifications2
        When I load emailnotifications2
        Then the dimensions function has an event listener added

    Scenario: emailnotifications2 resizing events are triggered
        Given I am a user loading emailnotifications2
        When I load emailnotifications2 and change screen size
        Then the window change event is fired