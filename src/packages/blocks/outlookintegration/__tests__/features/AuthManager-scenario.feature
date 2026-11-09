Feature: AuthManager

  Scenario: User signs in successfully
    Given the user is not signed in
    When the user signs in
    Then the user should have a valid access token