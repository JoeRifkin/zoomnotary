Feature: DocumentOpener

    Scenario: User navigates to DocumentOpener
        Given I am a User loading DocumentOpener
        When I navigate to the DocumentOpener
        Then DocumentOpener will load with out errors
        When I clicked on button to open doc from device
        Then FileViewer open function should be called to open document
        When I clicked on button to open doc from device and cancelled
        Then Error should be cansole
        When I clicked on button to open doc from url
        Then FileViewer open function should be called to open document by link
        When I click on anywhere to hide keyboard view
        Then I can leave the screen with out errors