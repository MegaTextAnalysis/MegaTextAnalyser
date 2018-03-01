"use strict";

const Twitter = require("twitter");
const Express = require("express");
const Credentials = require("./credentials_twitter");
// let array = ["Isis","Allahu Akbar","Caliphate","Isil","Islamic State"];
// let array2 = ["Brothers","Cut","Death"];
let array = ["Ireland", "Irish", "6 Nations", "#IREvWAL"];

let client = new Twitter({
  consumer_key: Credentials.CONSUMER_KEY,
  consumer_secret: Credentials.CONSUMER_SECRET,
  access_token_key: Credentials.ACCESS_TOKEN,
  access_token_secret: Credentials.ACCESS_SECRET
});

const server = Express();
server.use(Express.static("public"));
server.listen(80);

// Handles landing page
server.get("/", function(req, res) {
  res.send("Application running.");
});

// Handles username fetching
server.get("/:handle", function(req, res) {
  let flaggedTweets = [];

  getTweets(req.params.handle, function(tweets) {
    for (let i of tweets) {
      for (let j of array) {
        if (i.text.indexOf(j) > -1) {
          console.log(i.text);
          flaggedTweets.push(j);
        }
      }
    }

    console.log(flaggedTweets);
    res.send(tweets);
  });
});

// Handles Twitter API querying
function getTweets(handle, callback) {
  client.get("statuses/user_timeline", {
    screen_name: handle,
    include_rts: 0,
    trim_user: 1
  }, function(err, tweets, res) {
    if (err) {
      console.log(err);
    } else {
      callback(tweets);
    }
  });
}
