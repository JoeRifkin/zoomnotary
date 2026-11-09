Feature: GraphManager

  Scenario: User integrate with MS Graph API
    Given I am a integrate MS Graph API
    When I get events
    Then I receive events data
    When I get emails
    Then I receive emails data
    When I get contacts
    Then I receive contacts data
    When I am on web platform
    Then should use GraphAuthProviderWeb for web
    When I am on mobile platform
    And should use GraphAuthProvider for mobile