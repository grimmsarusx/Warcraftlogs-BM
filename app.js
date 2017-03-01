const request = require('request');
const cron = require('node-cron');
const _ = require('underscore');
const config = require(__dirname + '/config.json');
const wclurl = `https://www.warcraftlogs.com/v1/reports/guild/${config.guild}/${config.realm}/${config.region}?api_key=${config.apikey}`;
let temp = [];

let cronJob = cron.schedule('*/' + config.seconds + ' * * * * *', () => {
	make_request();
});

function make_request() {
	try {
		request.get(wclurl, (err, response, body) => {
			if (!err && response.statusCode == 200) {
				if (body.indexOf("down") == -1 && body.indexOf("<html>") == -1) {
					update(JSON.parse(body));
				}
			}
		})
	}
	catch (e) {
		setTimeout(function() {
			make_request();
		}, 10000);
	}
}

function update(body) {
	try {
		var id = _.last(body).id;

		if (JSON.stringify(temp).indexOf(id) == -1) {
			var title = _.last(body).title;
			var owner = _.last(body).owner;
			var string = `New log: ${title} (${owner}) -- https://www.warcraftlogs.com/reports/${id}`;

			temp.push(id);
			request.post(config.discordURL).form({
				content: string
			});

			console.log(string)
		}
		else {
			console.log(`Latest log has already been announced (${id}) ${temp}`);
		}
	}
	catch (e) {
		console.log(e);
	}
}
