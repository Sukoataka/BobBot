const Command = require("../Structures/Command.js");
const Discord = require('discord.js');

const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = new Command({
    name: "ban",
    permission: "BAN_MEMBERS",
    description: "Bant een speler!",

    async run(message, args, client) {
        if(!args[1]) return message.reply(`Gebruik: !ban <speler> <<reden>>, ${message.author}!`);

        const channel = message.guild.channels.cache.find(c => c.name == "log");
        const banUser = message.mentions.members.first();
        var reason = args.slice(2).join(" ");

        if (!banUser) return message.reply(`Deze gebruiker is niet gevonden!`);
        
        if(!args[2]) reason = "Geen reden opgegeven.";

        const command = client.commands.find(cmd => cmd.name == args[0]);
        const banUserPermission = banUser.permissions.has(command.permission);
        if (banUserPermission) return message.channel.send(`Sorry ${message.author}, je kan ${banUser} niet bannen!`);

        const embed = new Discord.MessageEmbed;
            embed.setColor("RED")
            .setTitle("Gebruiker Gebanned")
            .setFooter(message.author.username)
            .setTimestamp()
            .setDescription(`**Gebanned:** ${banUser}, (${banUser.id})
            **Gebanned door:** ${message.author.username}
            **Reden:** ${reason}`);

        const botEmbed = new Discord.MessageEmbed;
            botEmbed.setTitle(`❌ **Je Bent Gebannned van: ${message.guild.name}** ❌`)
            .setColor("RED")
            .setThumbnail(banUser.user.avatarURL({ dynamic: true }))
            .addField("Reden van ban:", `${reason}`)
            .setFooter(message.author.username)
            .setTimestamp();


        banUser.createDM().then((DMChannel) => {
        DMChannel.send({ embeds: [botEmbed] });
        });

        await delay(100);
        banUser.ban({ reason: reason });
        channel.send({ embeds: [embed] });
        message.channel.bulkDelete(1);
        const msg = await message.channel.send(`:white_check_mark: Succesvol ${banUser} gebanned, ${message.author}! :white_check_mark: `);
        setTimeout(() => msg.delete(), 5000);
    }
});