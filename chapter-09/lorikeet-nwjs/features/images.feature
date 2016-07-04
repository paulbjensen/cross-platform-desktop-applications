Feature: Images
	In order to see photos that I’m currently interested in
	As a User
	I want to open images from the application

	Scenario: Open a PNG image
		Given I have the application open and running
		When I search for "Pictures"
		And I double click on the "Pictures" folder
		And I wait 3 seconds
		And I double click on "app with set icons"
		Then I should see the "/Users/pauljensen/Pictures/app with set icons.png" file opened in a photo app