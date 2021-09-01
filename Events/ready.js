const Event = require('../Structures/Event.js');

//When bot is connected, console log that the bot is connected

module.exports = new Event("ready", async (client, guild) => {
    console.log(`%c${client.user.username} is online`, 'background: #222; color: #bada55');
    client.user.setActivity("Testing",{type: "PLAYING"});
});