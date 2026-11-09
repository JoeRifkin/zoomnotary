Feature: CameraAccess

    Scenario: User navigates to CameraAccess
        Given I am a User loading CameraAccess
        When I navigate to the CameraAccess
        Then CameraAccess will load with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors