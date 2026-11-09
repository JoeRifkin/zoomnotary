Feature: CatalogueNotaryServices

    Scenario: User navigates to CatalogueNotaryServices
        Given I am a User loading CatalogueNotaryServices
        When I navigate to the CatalogueNotaryServices
        Then CatalogueNotaryServices will load with out errors

        When user enters and remove it
        Then user wont see any result


        When user enters the search query without any failure
        Then user can see the search result

        When user enters the search query without any failure and clicks on cross icon
        Then user can see the list
        