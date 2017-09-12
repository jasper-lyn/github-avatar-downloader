var request = require('request');

var GITHUB_USER = "jasper-lyn";
var GITHUB_TOKEN = "27cdb87f34426cd0a3035d869c38f4f9a02e9ea1";

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // create valid url
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // fetch the list of contributors via HTTPS
  var options = {
    url: requestURL,
    method: 'get',
    headers: {
      'User-Agent': 'request'
    }
  };

  // defining callback function
  function callbackForRequestModule(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      // cb is the callback passed in; and it takes in 2 arguments
      // cb => function(err, result)
      // good place to execute a callback is where we have access to the data it needs
      cb(error, data);
    }
  }

  // HTTPS request to GitHub
  request(options, callbackForRequestModule);
};

var cbInsideOfGetRepoContributors = function(err, contributors) {
  console.log("Errors:", err);
  console.log("Contributors:", contributors);
  avatarURLs = [];
  for (i = 0; i < contributors.length; i++) {
    avatarURLs.push(contributors[i].avatar_url);
  }
  console.log(avatarURLs);
};

// takes in 3 arguments; first 2 arguments are to build the URL
// third argument is for getting contributors from github API
getRepoContributors("jquery", "jquery", cbInsideOfGetRepoContributors);


