const request = require('request');
const cron = require('node-cron');
const _ = require('underscore');
const config = require(__dirname+'/config.json');
const wclurl = `https://www.warcraftlogs.com/v1/reports/guild/${config.guild}/${config.realm}/${config.region}?api_key=${config.apikey}`;
let temp = [];

let cronJob = cron.schedule('*/15 * * * * *', () => {
    request.get(wclurl, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            update(JSON.parse(body));
        }
    })
    console.log(wclurl);
});

function update(body) {
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
