const Command = require("../Structures/Command.js");
const Discord = require('discord.js');

const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = new Command({
    name: "kick",
    permission: "KICK_MEMBERS",
    description: "Kickt een speler!",

    async run(message, args, client) {
        if(!args[1]) return message.reply(`Gebruik: !kick <speler> <<reden>>, ${message.author}!`);

        const channel = message.guild.channels.cache.find(c => c.name == "log");
        const kickUser = message.mentions.members.first();
        var reason = args.slice(2).join(" ");

        if(!args[2]) reason = "Geen reden opgegeven.";

        if (!kickUser) return message.reply(`Deze gebruiker is niet gevonden!`);
        const command = client.commands.find(cmd => cmd.name == args[0]);
        const kickUserPermission = kickUser.permissions.has(command.permission,);
        if (kickUserPermission) return message.channel.send(`Sorry ${message.author}, je kan ${kickUser} niet kicken!`);
        const kickReason = reason;

        const embed = new Discord.MessageEmbed;
            embed.setColor("RED")
            .setTitle("Gebruiker gekickt")
            .setFooter(message.author.username)
            .setTimestamp()
            .setDescription(`**Gekickt:** ${kickUser}, (${kickUser.id})
            **Gekickt door:** ${message.author.username}
            **Reden:** ${kickReason}`);

        const botEmbed = new Discord.MessageEmbed;
            botEmbed.setTitle(`❌ **Je Bent Gekickt van: ${message.guild.name}** ❌`)
            .setColor("RED")
            .setThumbnail(kickUser.user.avatarURL({ dynamic: true }))
            .setDescription(`**Gekickt door:** ${message.author.username}
            **Reden:** ${kickReason}`)
            .setFooter(message.author.username)
            .setTimestamp();

            kickUser.send({embed: botEmbed}).catch(()=>{return});

        await delay(100); 
        kickUser.kick(reason);
        channel.send({ embeds: [embed] });
        message.channel.bulkDelete(2);
        const msg = await message.channel.send(`:white_check_mark: Succesvol ${kickUser} gekickt, ${message.author}! :white_check_mark: `)
        setTimeout(() => msg.delete(), 5000);
    }
});