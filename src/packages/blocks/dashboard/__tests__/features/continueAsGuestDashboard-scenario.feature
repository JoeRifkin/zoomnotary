Feature: continueAsGuestDashboard

    Scenario: Open the login/signup modal via button press
        When the user presses the "Open Login/Sign Up" button
        Then the login/signup modal should be open

    Scenario: Open the login/signup modal via bottom tab change
        When the user changes the bottom tab
        Then the login/signup modal should be open

    Scenario: Close the login/signup modal via button press
        When the user presses the "Close Login/Sign Up" button
        Then the login/signup modal should be closed

    Scenario: Book Now button is pressed
        When the user presses the "Book Now" button
        Then a "NavigationContinueAsGuestMessage" should be sent with the correct props

    Scenario: Log In button is pressed
        When the user presses the "Log In" button
        Then the login/signup modal should close
        And a "NavigationEmailLogInMessage" should be sent with the correct props

    Scenario: User clicks the Sign Up button
        When the user presses the "Sign Up" button
        Then the login sign-up model should be closed
        And the user type should be saved in AsyncStorage
        And the correct message should be sent