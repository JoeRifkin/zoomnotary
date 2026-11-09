Feature: TermsConditions

  Scenario: User navigates to TermsConditions
    Given I am a User loading TermsConditions
    When I navigate to TermsConditions
    Then TermsConditions will load with out errors
    Then I can select the back button with out errors
    And I can leave the screen

  Scenario: Extracting title and description from HTML data
    Given HTML data string value
    When I extract titles and descriptions
    Then I should get the following extracted sections

  Scenario: Generating HTML content when termsConds is populated
    Given the termsConds state contains a title and description
    When the getSource function is called
    Then it should return an object with the concatenated HTML content

  Scenario: Generating HTML content when termsConds is empty
    Given the termsConds state is empty
    When the getSource function is called
    Then it should return an object with an empty string as the HTML content