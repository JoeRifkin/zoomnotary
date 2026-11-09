Feature: Calendar Sync

  Scenario: User navigates to CalendarSync
    Given I am a User loading CalendarSync
    When I navigate to the CalendarSync
    Then CalendarSync will load without errors

  Scenario: User navigates to CalendarSync and login outlook
    Given I am a User loading CalendarSync
    When I navigate to the CalendarSync
    Then CalendarSync will load without errors

 
