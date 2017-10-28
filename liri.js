//Create a variable require the npm twitter api
var Twitter = require('twitter');

//Create a variable to require the npm spotify api
var Spotify = require('node-spotify-api');

//Create a variable to require the npm request api
var request = require('request');

//Create a variable to require the twitter keys from keys.js
var keys = require("./keys.js");

//Create a variable to require the fs from npm
var fs = require('fs');

//Create a variable to produce the movie search
var movieSearch = process.argv[3];



//---------------------------------------------
//-------------------
//---------------------------------------------

//write an if/else condition to run the functions written whenever the command condition equals the input given



//Create a function to hold the api call to twitter
function myTweets() {

    var twitterClient = new Twitter(keys.twitterKeys);

    twitterClient.get('https://api.twitter.com/1.1/statuses/home_timeline/:id=773268000497598465.json', {
        count: 20,
        exclude_replies: true
    }, function(error, tweet) {
        if (!error) {
            console.log(tweet);
        } else {
            console.log(error);
        }
    });

}

myTweets();

//---------------------------------------------
//-------------------
//---------------------------------------------


//Create a variable to hold the spotify search
var search = process.argv[3];

function spot() {
    var spotify = new Spotify({
        id: '9c0190ba08f74bffb5a6f149cdf6a81a',
        secret: '4481ef707fdf45ba8fd3a8b8f0050c9b'
    });
    spotify
        .search({type: 'track', query: search, limit: 1})
        .then(function(data) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].album.artists[0].name);
                console.log(data.tracks.items[i].album.href);
                console.log(data.tracks.items[i].href);
                fs.writeFile('random.txt', 'spotify-this-song, I Want It That Way ' + search);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

spot();


//---------------------------------------------
//-------------------
//---------------------------------------------


function title() {
    fs.writeFile('random.txt', movieSearch, function(err) {
        if(!err) {
            console.log('random.txt file updated');
        } else {
            console.log(err);
        }
    })
}

title();

//---------------------------------------------
//-------------------
//---------------------------------------------


function movies() {
    request("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.stringify(body));
        }
    });
}

movies();