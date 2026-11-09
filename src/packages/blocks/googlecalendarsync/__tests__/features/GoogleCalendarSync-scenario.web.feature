Feature: GoogleCalendarSync

    Scenario: User navigates to GoogleCalendarSync
        Given I am a User loading GoogleCalendarSync
        When I navigate to the GoogleCalendarSync
        Then GoogleCalendarSync will load with out errors
        And I can Click Auth Button
        
        When I press open add event modal
        Then State updates correctly
        
        When I received Events list
        Then State updates correctly
        And I can click on Event
        And I can close modal without error
        
        When Add Event Modal is open
        Then I can change input fields
        Then I can click Save without error
        And Add Event Modal is close
        
        When Received Add Event Response with error
        Then Show alert method is invoke