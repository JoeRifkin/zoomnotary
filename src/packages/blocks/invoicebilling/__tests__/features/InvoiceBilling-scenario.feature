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

Scenario: Remove spaces and %20 from image name using removeSpacesFromImageName
    Given an image name contains spaces or %20
    When the function is called with my image.png
    Then it should return my image.png

Scenario: Remove spaces and %20 from image name using removeSpacesFromImgName
    Given an image name contains spaces or %20
    When the function is called with my image.png
    Then it should return my image.png

Scenario: Truncate text when it exceeds the specified length
    Given a text with length exceeding the specified limit
    When the truncatedText function is called
    Then it should return truncated text with the specified length


Scenario: Do not truncate text when it does not exceed the specified length
    Given a text with length not exceeding the specified limit
    When the truncatedText function is called
    Then it should return the original text