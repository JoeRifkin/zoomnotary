Feature: CountryCodeSelector

    Scenario: User navigates to CountryCodeSelector
        Given I am a User loading CountryCodeSelector
        When I navigate to the CountryCodeSelector
        Then CountryCodeSelector will load with out errors
        And Network request should be call to get country codes
        When I can press button to country code
        When I can select any country code from select list
        Then Country code should be set through adapter