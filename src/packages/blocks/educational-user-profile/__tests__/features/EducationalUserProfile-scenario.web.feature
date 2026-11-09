Feature: EducationalUserProfile

    Scenario: User navigates to EducationalUserProfile
        Given I am a User loading EducationalUserProfile
        
        When I navigate to the EducationalUserProfile
        Then EducationalUserProfile will load with out errors
        And EducationalUserProfile opening on Project page

        When I press Award button
        Then Active Tab updated correctly on setActiveTab

        When I press Patent button
        Then Active Tab updated correctly on setActiveTab

        When I press Project button
        Then Active Tab updated correctly on setActiveTab

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

        When Projects List is empty
        Then Projects List return Empty Text

        When I opening Awards tab
        Then I can press Show More Button on the first item
        Then State update correctly

        When Awards List is empty
        Then Awards List return Empty Text

        When I opening Patents tab
        Then I can press Show More Button on the first item
        Then State update correctly

        When Patents List is empty
        Then Patents List return Empty Text