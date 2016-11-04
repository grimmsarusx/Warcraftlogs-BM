const request = require('request');
const cron = require('node-cron');
const _ = require('underscore');
const wclurl = "https://www.warcraftlogs.com:443/v1/reports/guild/<guild>/<realm>/<eu/us>?api_key=<key>";
const discordurl = "https://discordapp.com/api/webhooks/<webhook id>/<webhook token>";
let temp = [];

let cronJob = cron.schedule('*/15 * * * * *', () => {
    request.get(wclurl, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            update(JSON.parse(body));
        }
    })
});

function update(body) {
    if (!_.isEqual(temp, body) && !_.isEqual(_.last(temp).id, _.last(body).id)) {
        temp = body;
        request.post(discordurl).form({
            content: "Found new logs! https://www.warcraftlogs.com/reports/" + _.last(temp).id
        })
    }
}