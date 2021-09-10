const Command = require("../Structures/Command.js");
const Discord = require('discord.js');

module.exports = new Command({
    name: "botinfo",
    description: "hallo command",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const embed = new Discord.MessageEmbed;
            embed.setColor("AQUA")
            .setTitle("BobBot - Botinfo")
            .setFooter(message.author.username)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .addField("Naam: ", "BobBot")
            .addField("Versie: ", "V1.0")
            .addField("Gemaakt door: ", "Ban#9614")
            .addField("Aangemaakt op: ", "Mon, 16 Aug 2021 18:06:42 GMT");

        message.channel.send({ embeds: [embed] });
    }
});