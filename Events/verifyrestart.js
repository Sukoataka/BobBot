const Event = require('../Structures/Event.js');

//When bot is connected, restart verification listener

module.exports = new Event("ready", async (guild) => {
    let namechannel = guild.channels.cache.find(c => c.name == "verify");
    namechannel.bulkDelete(1);
    namechannel.send("!verify")
});