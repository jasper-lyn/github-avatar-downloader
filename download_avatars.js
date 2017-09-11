var request = require('request');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // fetch the list of contributors via HTTPS
  var options = {
    url: 'https://api.github.com/repos/jquery/jquery/contributors',
    method: 'get',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      // cb is the callback passed in; and it takes in 2 arguments
      // cb => function(err, result)
      // good place to execute a callback is where we have access to the data it needs
      cb(error, data);
    }
  }

  // HTTPS request to GitHub
  request(options, callback);
};


// takes in 3 arguments; first 2 arguments are to build the URL
// third argument is for getting contributors from github API
getRepoContributors("jquery", "jquery", function(err, contributors) {
  console.log("Errors:", err);
  console.log("Contributors:", contributors);
});