const Event = require('../Structures/Event.js');

const Discord = require('discord.js');

module.exports = new Event("guildMemberAdd", (client, member) => {
    const channel = member.guild.channels.cache.find(c => c.name == "welcome-and-goodbye");

    if(!channel) return;

    const embed = new Discord.MessageEmbed();

    embed.setTitle(member.user.tag)
    .setColor("GREEN")
    .setAuthor("Nieuwe gebruiker")
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .addFields({
        name: "Account aangemaakt op:",
        value: member.user.createdAt.toUTCString(),
        inline: true
    }, {
        name: "Gebruiker is gejoined op:",
        value: member.joinedAt.toUTCString(),
        inline: true
    })
    .setTimestamp(member.joinedTimestamp);

    channel.send({ embeds: [embed] })
});