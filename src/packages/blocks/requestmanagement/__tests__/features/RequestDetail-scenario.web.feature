Feature: RequestDetail

    Scenario: User navigates to RequestDetail
        Given I am a User loading RequestDetail
        When I navigate to the RequestDetail
        Then RequestDetail will load with out errors
        Then Get token function shoudl be called
        When Network responed for received request api
        Then Network responed for accept request review api
        Then Network responed for reject request review api
        