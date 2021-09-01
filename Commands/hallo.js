const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "hallo",
    description: "hallo command",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        message.channel.send(`Hallo ${message.author}!`)
    }
});