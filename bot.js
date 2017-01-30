/*!
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */

/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = 'VBPLfPxpiDLzuyb9lLom3GuYN';
var TWITTER_CONSUMER_SECRET = 'Lnr13O2KYiFRKDA32V1LJ4ZCaMKLVBSBUHvnvmgWYdvPdCjKz7';
var TWITTER_ACCESS_TOKEN = '826106596660895745-pcvmsBp8Ppq3L6WWAXA5PBx2nkt5h2f';
var TWITTER_ACCESS_TOKEN_SECRET = '0qCtQx7tPGgu0mJJ20YG2XYaCrjpJGfTt1zJdMbNk93nF';

/* Set Twitter search phrase */
// var TWITTER_SEARCH_PHRASE = '%22make america safe again%22';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {

	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot initiated : 669520341815836672');
		}
	}

	BotTweet();
}

function BotTweet() {

	var query = {
		// q: TWITTER_SEARCH_PHRASE,
		screen_name: 'realDonaldTrump',
	  count: 1,
	}

	Bot.get('statuses/user_timeline', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}

		else {
			console.log(data);
			var id = {
				id : data[0].id_str,
				text: data[0].text
			}

			var refugeeRights = new RegExp("refugees|muslim|immigration|immigrant|syria|somalia|afganistan|iraq|ban");

			if(refugeeRights.test(id.text.toLowerCase())){
				var keyword = id.text.toLowerCase().match(refugeeRights);
				Bot.post('statuses/update', { status:
				 'Trump just tweeted about immigration (keyword: ' + keyword + '). Please consider donating to Refugee Rights: https://refugeerights.org/donate/' }, BotTweeted);
			}

			var plannedParenthood = new RegExp("pro-life|roe|wade|abortion|embryo|clinic");

			if(plannedParenthood.test(id.text.toLowerCase())){
				var keyword = id.text.toLowerCase().match(plannedParenthood);
				Bot.post('statuses/update', { status:
					'Trump just tweeted about abortion (keyword: ' + keyword + '). Please consider donating to Planned Parenthood: https://www.plannedparenthood.org/donate' }, BotTweeted);
			}

			var environment = new RegExp("climate|resources|oil|pipeline|epa|environment|coal|keystone|bakken");

			if(environment.test(id.text.toLowerCase())){
				var keyword = id.text.toLowerCase().match(environment);
				Bot.post('statuses/update', { status:
					'Trump just tweeted about the environment (keyword: ' + keyword + '). Please consider donating to the NRDC: https://www.nrdc.org/donate' }, BotTweeted);
			}

		// Bot.post('statuses/retweet/:id', id, BotTweeted);

			function BotTweeted(error, response) {
				if (error) {
					console.log('Bot could not tweet, : ' + error);
				}
				else {
					console.log('Bot tweeted : ' + id.id);
				}
			}
		}
	}

	/* Set an interval of 30 minutes (in microseconds) */
	setInterval(BotTweet, 30*60*1000);
}

/* Initiate the Bot */
BotInit();
