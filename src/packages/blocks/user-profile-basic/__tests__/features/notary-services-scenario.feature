Feature: notaryservices

    Scenario: User navigates to NotaryServices with zero selected services
        Given I am a User loading NotaryServices it will load with out errors
        When the user tap on any services checkbox
        Then it will get selected
        
        When the user tap save button
        Then the pop up will show

        When the user click on Yes button
        Then the add service api will be called 
    
     Scenario: User navigates to NotaryServices with zero selected services with error
        Given I am a User loading NotaryServices it will load with out errors
        When the user tap on any services checkbox
        Then it will get selected
        When the user tap save button
        Then the pop up will show
        When the user click on Yes button
        Then the add service api will be called
        
        