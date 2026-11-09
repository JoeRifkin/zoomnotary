Feature: InvoiceBilling

Scenario: Display the InvoiceBilling
    Given I am on the InvoiceBilling screen
    When the screen is loaded
    Then I should see the InvoiceBilling input
    Then I enter some number
    When I submit invoice number
    Then I should able to view pdf

Scenario: Handle API errors
    Given I am on the InvoiceBilling screen
    When The get pdf api returns an error
    Then I should see alert 