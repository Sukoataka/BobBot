const Event = require('../Structures/Event.js');

const Discord = require('discord.js');

module.exports = new Event("guildMemberRemove", (client, member) => {
    const channel = member.guild.channels.cache.find(c => c.name == "welcome-and-goodbye");

    if(!channel) return;

    const embed = new Discord.MessageEmbed();

    embed.setTitle(member.user.tag)
    .setColor("RED")
    .setAuthor("Gebruiker Geleaved")
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .addField("Gebruiker was gejoined op:", member.joinedAt.toUTCString())
    .setTimestamp(member.joinedTimestamp);

    channel.send({ embeds: [embed] })
});