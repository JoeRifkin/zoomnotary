Feature: CountryCodeSelectorTable

    Scenario: User navigates to CountryCodeSelectorTable
        Given I am a User loading CountryCodeSelectorTable
        When I navigate to the CountryCodeSelectorTable
        Then CountryCodeSelectorTable will load with out errors
        And Country code should be get from adapter if present
        When I can press button to country code
        When should be render flatlist items
        When Should render header in flatlist
        Then Search text is set