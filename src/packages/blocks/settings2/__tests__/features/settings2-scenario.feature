Feature: settings2

    Scenario: User can input text into settings2
        Given I am a user loading settings2
        When I navigate to the settings2
        Then settings2 will load with out errors
        Then I can enter text with out errors
        Then I can select the button with with out errors
        Then I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading settings2
        When I navigate to the settings2
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from settings2
        Given I am a user loading settings2
        When I navigate to the settings2
        Then settings2 will load with out errors
        Then I can dismiss settings2

    Scenario: settings2 has event listeners for screen size changes added
        Given I am a user loading settings2
        When I load settings2
        Then the dimensions function has an event listener added

    Scenario: settings2 resizing events are triggered
        Given I am a user loading settings2
        When I load settings2 and change screen size
        Then the window change event is fired