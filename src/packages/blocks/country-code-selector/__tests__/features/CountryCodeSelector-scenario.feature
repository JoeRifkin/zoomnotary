Feature: CountryCodeSelector

    Scenario: User navigates to CountryCodeSelector
        Given I am a User loading CountryCodeSelector
        When I navigate to the CountryCodeSelector
        Then CountryCodeSelector will load with out errors
        When Country code should be get from adapter if present
        When I can press button to country code
        Then navigation should be call after select country code