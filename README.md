# Warcraftlogs Discord Webhook
Checks warcraftlogs every 15 sec and posts on discord if new logs are found

I recommend running this in something like [PM2](https://github.com/Unitech/pm2)

Run ```npm install``` in the folder to download all dependencies.

You can find your WCL api key by going to your profile and scrolling down to "Web API Keys"
Then simply replace the current url with your specific url.
```
https://www.warcraftlogs.com:443/v1/reports/guild/<guild>/<realm>/<eu/us>?api_key=<public api key>
```

You get the discord url by going in to your server settings and then under webhooks you create a new entry with your own settings.
Then just paste that url where it says:

```
https://discordapp.com/api/webhooks/<webhook id>/<webhook token>
```
Image of the discord webhooks GUI:
![Image of discord webhooks](http://i.imgur.com/zi5J1X5.png)
