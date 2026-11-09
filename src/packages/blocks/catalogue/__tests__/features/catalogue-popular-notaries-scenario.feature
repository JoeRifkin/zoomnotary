Feature: CataloguePopularNotaries

    Scenario: User navigates to CataloguePopularNotaries
        Given I am a User loading CataloguePopularNotaries
        When I navigate to the CataloguePopularNotaries
        Then CataloguePopularNotaries will load with out errors

        When user scroll down another api call wil happen
        Then user can see the search result

        When user enters and remove it
        Then user wont see any result


        When user enters the search query without any failure
        Then user can see the search result

        When user enters the search query without any failure and clicks on cross icon
        Then user can see the list

        When user press on filter icon
        Then he will see the jurisdiction sheet

        When user select the jurisdiction
        Then he will see the selected jurisdiction below searchbox