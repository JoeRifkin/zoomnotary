Feature: OutlookData

  Scenario: User navigates to OutlookData
    Given I am a User who wants to load OutlookData
    When I navigate to the OutlookData page
    Then I should be able to see the email list
    Then I should be able to open an email
