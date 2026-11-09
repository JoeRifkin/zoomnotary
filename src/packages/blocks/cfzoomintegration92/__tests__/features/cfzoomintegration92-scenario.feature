Feature: cfzoomintegration92

    Scenario: User can input text into cfzoomintegration92
        Given I am a user loading cfzoomintegration92
        When I navigate to the cfzoomintegration92
        Then cfzoomintegration92 will load with out errors
        Then I can enter text with out errors
        Then I can select the button with with out errors
        Then I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading cfzoomintegration92
        When I navigate to the cfzoomintegration92
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from cfzoomintegration92
        Given I am a user loading cfzoomintegration92
        When I navigate to the cfzoomintegration92
        Then cfzoomintegration92 will load with out errors
        Then I can dismiss cfzoomintegration92

    Scenario: cfzoomintegration92 has event listeners for screen size changes added
        Given I am a user loading cfzoomintegration92
        When I load cfzoomintegration92
        Then the dimensions function has an event listener added

    Scenario: cfzoomintegration92 resizing events are triggered
        Given I am a user loading cfzoomintegration92
        When I load cfzoomintegration92 and change screen size
        Then the window change event is fired

    Scenario: Selected tab has the correct style
        Given the selected tab key is "tab1"
        When the tabViewStyleCheck function is called with "tab1"
        Then it should return "tabBorderCheck"

    Scenario: Unselected tab has the correct style
        Given the selected tab key is "tab1"
        When the tabViewStyleCheck function is called with "tab2"
        Then it should return "unselectedTabBorderCHeck"
        
    Scenario: Go back when button is pressed
        Given the component is rendered
        When the go back button is pressed
        Then the goBack function should be called