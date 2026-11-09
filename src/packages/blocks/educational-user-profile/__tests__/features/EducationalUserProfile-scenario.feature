Feature: EducationalUserProfile

    Scenario: User navigates to EducationalUserProfile
        Given I am a User loading EducationalUserProfile
        
        When I navigate to the EducationalUserProfile
        Then EducationalUserProfile will load with out errors
        And EducationalUserProfile opening on Project page

        When I press the screen
        Then The dismiss keyboard function can be called

        When I press Award button
        Then Active Tab updated correctly on setActiveTab
        And Awards List show ActivityIndicator

        When I press Patent button
        Then Active Tab updated correctly on setActiveTab
        And Patent List show ActivityIndicator

        When I press Project button
        Then Active Tab updated correctly on setActiveTab
        And Project List show ActivityIndicator

        When Qualifications list is loading
        Then Qualifications list show ActivityIndicator

        When Receive projects list
        Then State update correctly

        When Receive awards list
        Then State update correctly

        When Receive patents list
        Then State update correctly

        When Receive qualifications list
        Then State update correctly
        And EducationalQualifications render all items

        When Qualifications List is empty
        Then Qualifications List return Empty Text

        When I opening Projects tab
        Then I can press Show More Button on the first item
        Then State update correctly
        And I can open url from project

        When I press on Modal Close Button
        Then Modal Window is Closed without error

        When Projects List is empty
        Then Projects List return Empty Text

        When I opening Awards tab
        Then I can press Show More Button on the first item
        And State update correctly

        When Awards List is empty
        Then Awards List return Empty Text

        When I opening Patents tab
        Then I can press Show More Button on the first item
        Then State update correctly
        And I can open url from project

        When Patents List is empty
        Then Patents List return Empty Text

        When Projects resonse return error
        Then Show alert has invoked

        When Awards resonse return error
        Then Show alert has invoked

        When Patents resonse return error
        Then Show alert has invoked
