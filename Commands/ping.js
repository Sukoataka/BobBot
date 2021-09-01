const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "ping",
    permission: "MANAGE_CHANNELS",
    description: "Shows ping of bot",

    async run(message, args, client) {
        const msg = await message.channel.send(`Ping: ${client.ws.ping} ms.`);
        msg.edit(`Ping: ${client.ws.ping} ms.\nMessage Ping: ${msg.createdTimestamp - message.createdTimestamp} ms.`)

    }
});
