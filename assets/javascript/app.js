//  This code will run as soon as the page loads.
$(document).ready(function() {

    // Initial array of fish
    var topics = ["Clownfish", "Sailfish", "Marlin", "Siamese fighting fish", "Jellyfish", "Dolphin", "Eel", "Starfish", "Sea urchins", "Lobster", "Orca"];

    // This function re-renders the HTML to display the appropriate content
    function displayFishInfo() {

      var fish = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fish + "&limit=10&api_key=dc6zaTOxFJmzC";

    //   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fish + "&api_key=dc6zaTOxFJmzC";

       $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
            //  Create div to hold the fish
            console.log("Response ", response);

        //  clears the previous 10 images
        $("#topics-view").empty();

        for (i=0; i<response.data.length; i++) {

            // creates the div for the items to go in
            var fishDiv = $("<div class='fish-item'>");

            // Retrieving the URL for the image (this will be the initial image)

            var imgURL = response.data[i].images.original_still.url;

            // Creating an element to hold the image
            var image = $("<img>");

            // Appending the images, etc. to the above element (set as still at onset)
            
            image.attr("src", imgURL)
                 .attr("data-still", response.data[i].images.original_still.url)
                 .attr("data-animate", response.data[i].images.original.url)
                 .attr("data-state", "still")
                 .addClass('fishtails');
            //image.attr(alt"image" + '+ i');

            // Appending the image to the above element
            fishDiv.append(image);

            // Storing the rating in the rated variable   
            var rated = response.data[i].rating;

            // Creating an element to have the rating displayed   
            var para = $("<p>").text("Rating: " + rated);

            para.addClass('ratings');

            // appends the rating to the element with other items for each image  
            fishDiv.append(para);
          //  puts the last topic clicked before the other already displayed images
          $("#topics-view").prepend(fishDiv);
        }

      });
    };

    function renderButtons() {

    //  keeps from having multiples of all of the buttons
      $("#buttons-view").empty();

    // generates buttons dynamically for each fish in original array (don't need end tag 4 button)
      for (var i = 0; i < topics.length; i++) {
        // make sure you do NOT, I REPEAT DO NOT USE #<button>
        var a = $("<button>");
        // add class of "fish" to out button
        a.addClass("fish");
        // add data attribute 
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding a button to the buttons-view div
        $("#buttons-view").append(a);
      };  // end of for
    };  // end of renderButtons function

      // This function handles events where a fish button is clicked
      $("#add-fish").on("click", function(event) {

        event.preventDefault();

        // This line grabs the input from the textbox
        var fish = $("#fish-input").val().trim();

        if (fish) {

            // Adding fish from the textbox to our array
            topics.push(fish);

            // Calling renderButtons which handles the processing of our fish array
            renderButtons();
        }
        else
        {
            return false;
        }

        // clears out the input after pressing enter/submit
        $("#fish-input").val("");
      });

// This function handles events when the image is clicked
      //$(".fishtails").on("click", function(event) {
        $(document).on("click", '.fishtails', function() {

            console.log("in the fishtails on click");

        var state = $(this).attr("data-state");
      //  this attr method is for getting or setting any attribute of the html element

        if (state === "still") {
          // set the source and state to animated when it is still
            console.log(" still now, move to animated  ");


          $(this).attr("src", $(this).attr("data-animate"));  
          $(this).attr("data-state", "animate");
        }
        else {

          // set the source and state to still when it is animated

        console.log(" animated now, move to still  ");

          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });  // end of click event (when image is clicked)

/// Adding an event listener to all elements with "fish" class dynamically created
    $(document).on("click", ".fish", displayFishInfo);

// Calls the renderButtons function to display initial buttons
    renderButtons();

}); // end of document.ready
