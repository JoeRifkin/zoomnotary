Feature: GoogleCalendarSync

    Scenario: User navigates to GoogleCalendarSync
        Given I am a User loading GoogleCalendarSync
        When I navigate to the GoogleCalendarSync
        Then GoogleCalendarSync will load with out errors
        And I can Click Auth Button

        When I press on Screen
        Then HideKeyboard method invoke

        When I press open add event modal
        Then State updates correctly

        When I received Events list
        Then State updates correctly
        Then I can click on Event
        Then I can click on setEventUriButton
        And I can close modal without error

        When Add Event Modal is open
        Then I can change Summary Input fields
        Then I can change Location Input fields
        Then I can change Description Input fields
        Then I can change Attendees Input fields
        Then I can press Start Picker Sprite
        And State updated correctly
        And Start Date update correctly
        Then I can press End Picker Sprite
        And State updated correctly
        And End Date update correctly
        Then I can click AddEvent without error
        And Add Event Modal is close

        When Received Add Event Response with error
        Then Show alert method is invoke

        When I click Sig Out button
        Then State updated correctly