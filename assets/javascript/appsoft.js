// Initial array of fish
var fishes = ["Gar", "Jaws", "Marlin", "Goldfish", "Clownfish", "Siamese fighting fish", "Haddock", "Gar", "Eel", "Snook", "Guppy", "Megalodon"];

// This function re-renders the HTML to display the appropriate content
function displayFishInfo() {

	var fish = $(this).attr("data-name");
	var queryURL = "http://www.omdbapi.com/?t=" + fish + "&y=&plot=short&r=json";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		//  Create div to hold the fish

		var fishDiv = $("<div class='fish-item'>");

          // Storing the rating data     ???????????????????????????????  1
        var rating = response.Rated;

          // Creating an element to have the rating displayed   ???????????????  2
        var pOne = $("<p>").text("Rating: " + rating);

        // displayint the fish rating              ????????????????????????  3
        fishDiv.append(pOne);

// Storing the release year
          var released = response.Released;

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          fishDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          fishDiv.append(pThree);


		// store the fish picture/giffy
// 		var giffy = response.??????;
        // Retrieving the URL for the image
      	var imgURL = response.Poster;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        fishDiv.append(image);

        // put last fish before the other fish (first)
        $("#fishes-view").prepend(fishDiv);
	});
};

function renderButtons() {

//  keeps from having multiples of same buttons
	$("#buttons-view").empty();

// generates buttons dynamically for each fish in original array (don't need end tag 4 button)
	for (var i = 0; i < fishes.length; i++) {
		// make sure you do NOT, I REPEAT DO NOT USE #<button>
		var a = $("<button>");
		// add class of "fish" to out button
		a.addClass("fish");
		// add data attribute 
		a.attr("data-name", fishes[i]);
		// Providing the initial button text
		a.text(fishes[i]);
		// Adding a button to the buttons-view div
		$("#buttons-view").append(a);
	};  // end of for
};  // end of renderButtons function




      // This function handles events where a fish button is clicked
      $("#add-fish").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var fish = $("#fish-input").val().trim();

        // Adding fish from the textbox to our array
        fishes.push(fish);
        console.log(fish);

        // Calling renderButtons which handles the processing of our fish array
        renderButtons();
      });


/*
  // This function handles events where a fish button is clicked
  $("#add-fish").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var fish = $("#fish-input").val().trim();

    // Adding fish from the textbox to our array
    fishes.push(fish);
    console.log(fish);

    // Calling renderButtons which handles the processing of our fish array
    renderButtons();
  });
*/

//  This code will run as soon as the page loads.
$(document).ready(function() {

/// Adding an event listener to all elements with "fish" class dynamically created
$(document).on("click", ".fish", displayFishInfo);

// Calls the renderButtons function to display initial buttons
renderButtons();

}); // end of document.ready
