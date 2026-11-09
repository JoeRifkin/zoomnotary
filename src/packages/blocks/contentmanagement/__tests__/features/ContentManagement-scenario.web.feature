Feature: ContentManagement
     Scenario: User navigates to ContentManagement
       Given I am a User loading ContentManagement 
       Then I can see the products
       When user click on dropdown select user
       Then I can see the products based on selected user
       When user click on Add new product button
       Then model will open to fill form
       When user fill all inputs fields and submit button
       Then all fields are fill 
       When user click on submit button
       Then new product will added in list

     Scenario: Handle API errors
        Given I am a User loading ContentManagement
        When the get product API returns an error
        Then I should not see the list of products with 0 element

