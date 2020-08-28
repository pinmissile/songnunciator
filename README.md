# songnunciator
A discord bot that publically announces your Spotify songs.

## Usage
```
!announceMe
```
Write this in the channel you want to be announced in.
```
!helpMe
```
Bot instructions. Essentially the same as these instructions.

## Dependencies

[Get node.js](https://nodejs.org/en/download/)

Clone this repo, navigate to the new directory.
```
git clone https://github.com/pinmissile/songnunciator.git
cd songnunciator
```
Install these dependencies via npm.
```
npm install discord.io
npm install winston
```

## How to run

```
node bot.js
```

## How to debug
[Register a discord application](https://discord.com/developers/applications), make a bot, take note of the bot's token and make an auth.json.
```
echo {token:"BOT_TOKEN_GOES_HERE"} > auth.json
```
Find the invite URL, run the bot, and test the bot out on a discord server of your choice. 
