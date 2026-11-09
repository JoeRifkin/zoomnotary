Feature: rolesandpermissions2

    Scenario: User can input text into rolesandpermissions2
        Given I am a user loading rolesandpermissions2
        When I navigate to the rolesandpermissions2
        Then rolesandpermissions2 will load with out errors
        Then I can enter text with out errors
        Then I can select the button with with out errors
        Then I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading rolesandpermissions2
        When I navigate to the rolesandpermissions2
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from rolesandpermissions2
        Given I am a user loading rolesandpermissions2
        When I navigate to the rolesandpermissions2
        Then rolesandpermissions2 will load with out errors
        Then I can dismiss rolesandpermissions2

    Scenario: rolesandpermissions2 has event listeners for screen size changes added
        Given I am a user loading rolesandpermissions2
        When I load rolesandpermissions2
        Then the dimensions function has an event listener added

    Scenario: rolesandpermissions2 resizing events are triggered
        Given I am a user loading rolesandpermissions2
        When I load rolesandpermissions2 and change screen size
        Then the window change event is fired