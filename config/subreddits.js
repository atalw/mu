var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = "https://www.reddit.com/r/Music/wiki/musicsubreddits";

request(url, function(err, resp, html) {
	var $ = cheerio.load(html);
	var results = [];
	$('.md.wiki ul').each(function(i, element) {
		var genre = $(this).prev().text();
		// console.log(genre);
		var subs = $(this).text();
		var subredditsArray = subs.split("\n");
		var subreddits = []; 
		for (subredditItem in subredditsArray) {
			var data = subredditsArray[subredditItem];
			if (data != '') {
				var arr = data.split('- ');
				if (!arr[1])
					arr[1] = "";
				var subreddit = {
					title: arr[0],
					description: arr[1]
				};
				subreddits.push(subreddit);
			}
		}
		if (genre != '') {
			var subredditsWGenre = {
				genre: genre,
				subreddits: subreddits
			};
			results.push(subredditsWGenre);
		}
	});
	fs.writeFile("routes/subreddits.json", JSON.stringify(results), function(err) {
		if (err)
			console.log(err);
	});
	// console.log(results);
})
