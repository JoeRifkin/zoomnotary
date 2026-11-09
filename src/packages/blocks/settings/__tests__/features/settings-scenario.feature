Feature: settings

    Scenario: User navigates to settings
        Given I am a User loading settings
        When I navigate to the settings
        Then settings will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And i can click on back arrow icon with out errors
        And call login api
        And call deleteaccount api
        And I can leave the screen with out errors

    Scenario: Redirecting to Vat and sales page
        Given I have a key vat
        When I call the redirectToPage function with the key
        Then it should send a NavigationVatSalesTaxMessage

     Scenario: Store token and user role when the message id is NavigationPayLoadMessage
        Given a message with id "NavigationPayLoadMessage"
        And the message contains token "mockedToken" and role "admin"
        When the storeMDataValue function is called
        Then it should update the state with the token and user role

    Scenario: Do nothing when the message id is not NavigationPayLoadMessage
        Given a message with id "SomeOtherMessage"
        When the storeMDataValue function is called
        Then it should not update the state