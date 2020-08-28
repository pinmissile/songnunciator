
// Requirements
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Global variables
var usersToAnnounce = {}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.setPresence( {game: {name:"DM me \"!helpme\""}} );
});

bot.on('presence', function(user, userID, status, game, event) {
    if (!game || !event) return;
    if (Object.keys(usersToAnnounce).includes(userID) && game['name'] == "Spotify"){
        for (var channel of usersToAnnounce[userID]) {
            try {
                msg = user + ' is now listening to:\n';
                msg += event['d']['game']['details'];
                msg += " by _" + event['d']['game']['state'];
                msg += "_\n**Album:** " + event['d']['game']['assets']['large_text'];
                bot.sendMessage({
                    to: channel,
                    message: msg
                });
            }
            catch(error) {
                logger.info(msg);
            }
        }
    }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (userID == bot.id) return;
    message = message.toLowerCase();
    if (message =="!announceme"){
        if (usersToAnnounce[userID]){
            if (usersToAnnounce[userID].has(channelID)){
                usersToAnnounce[userID].delete(channelID);
                bot.sendMessage({
                    to: channelID,
                    message: "No longer announcing " + user + "!"
                });
                if (usersToAnnounce[userID].size == 0){
                    delete usersToAnnounce[userID];
                }
            }
            else {
                usersToAnnounce[userID].add(channelID);
                bot.sendMessage({
                    to: channelID,
                    message: "Now announcing " + user + '!'
                });
            }
        }
        else {
            usersToAnnounce[userID] = new Set();
            usersToAnnounce[userID].add(channelID);
            bot.sendMessage({
                to: channelID,
                message: "Now announcing " + user + '!'
            });
        }
    }
    else if (message == "!helpme"){
        bot.sendMessage({
            to: channelID,
            message: "Just type _!announceMe_ in the " +
                     "channel you want to be announced in, " +
                     "and I will announce any songs you play " +
                     "on Spotify in all channels you've asked " +
                     "to be announced in. Message _!announceMe_ " +
                     "again to turn this feature off."
        });
    }
});