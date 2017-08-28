var apiKey = '37893322854073f1983e52e2d03c1994';
var cityID;

// Zomato object that contains the main function to fetch restaurants
var zomato = {
    getRestraunt: function(currObject) {
        // currObject refers to the button that is clicked
        currObject.preventDefault(); // prevents the default behavior
        var location = $('#userLocation').val();
        $('#userLocation').val(''); // sets the location
        var queryURL = `https://developers.zomato.com/api/v2.1/locations?query=${location}`;
        // does a call for Zomato's city code
        $.ajax({
            url: queryURL,
            method: 'GET',
            headers: {
                'user-key': apiKey
            }
        }).done(getCity);
    }
};


// Get the cityId and find the restaurant
function getCity(response) {
    cityID = response.location_suggestions[0].city_id;
    $('#location').html(response.location_suggestions[0].city_name);
    var userSearch = $('#userSearch').val();
    $('#userSearch').val(''); // set city value in webpage

    // Zomato api url
    var queryURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&count=10`;
    //Ajax call to Zomato API
    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            'user-key': apiKey
        }
    }).done(populateRestraunt); // Display restaurant data

}

// Display/print the data to the HTML
function populateRestraunt(response) {
    // The HTML contents
    $('#restaurantName').html(response.restaurants[1].restaurant.name);
    $('#type').html(response.restaurants[1].restaurant.cuisines);
    $('#costForTwo').html(response.restaurants[1].restaurant.average_cost_for_two);
    $('#userRating').html(response.restaurants[1].restaurant.user_rating.aggregate_rating);
}

//Get City ID for User Search and then run
$('#locationBtn').on('click', zomato.getRestraunt);
