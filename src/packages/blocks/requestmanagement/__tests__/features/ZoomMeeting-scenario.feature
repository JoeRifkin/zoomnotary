Feature: ZoomMeeting

    Scenario: User navigates to ZoomMeeting
        Given I am a User loading ZoomMeeting
        When I navigate to the ZoomMeeting

        When User click on launch meeting button
        Then User will be navigate on webview screen
        
    Scenario: Go back when button is pressed
        Given the component is rendered
        When the go back button is pressed
        Then the goBack function should be called