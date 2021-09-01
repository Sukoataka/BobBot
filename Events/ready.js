const Event = require('../Structures/Event.js');

module.exports = new Event("ready", async (client, guild) => {
    console.log(`%c${client.user.username} is online`, 'background: #222; color: #bada55');
    client.user.setActivity("Testing",{type: "PLAYING"});


//Auto restart voor verify reaction listener//


    const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

    let namechannel = guild.channels.cache.find(c => c.name == "verify");
    namechannel.bulkDelete(1);
    await delay(3000);
    namechannel.send("!verify");
});