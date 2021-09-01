const Command = require("../Structures/Command.js");
const Discord = require('discord.js');

module.exports = new Command({
    name: "clear",
    permission: "MANAGE_MESSAGES",
    description: "Clears the chat.",

    async run(message, args, member) {
        const amount = args[1];
        if(!amount || isNaN(amount))return message.channel.send(`Gebruik: !clear <getal>, ${message.author}!`);

        const amountParsed = parseInt(amount);
        if(amountParsed < 1) return message.channel.send(`U kunt niet minder dan 1 bericht clearen, ${message.author}!`); 
        if(amountParsed > 100) return message.channel.send(`U kunt niet meer dan 100 berichten clearen, ${message.author}!`);

        message.channel.bulkDelete(amountParsed + 1);

        const msg = await message.channel.send(`${message.author} heeft ${amountParsed} berichten gecleared!`);
        setTimeout(() => msg.delete(), 3000);
    }
});