const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
    name: "verify",
    description: "verify setup",
    permission: "ADMINISTRATOR",

    async run(message, args, client) {
        const channel = message.guild.channels.cache.find(c => c.name == "verify");
        const emoji = "✅"

        const verifiedRole = message.guild.roles.cache.find(role => role.name === "Verified");

        const embed = new Discord.MessageEmbed;
        embed.setTitle("✅    **Verifieer jezelf!**    ✅")
        .setColor("GREEN")
        .setDescription("Weet je zeker dat je geen robot bent?")
        .setFooter(message.author.username)
        .setTimestamp();

        message.channel.bulkDelete(1);

        var embedMessage = await channel.send({ embeds: [embed] });
        embedMessage.react(emoji);

        client.on("messageReactionAdd", async (reaction, user) => {
            if (user.bot) return;
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if(reaction.message.channel.id == channel.id){
                if(reaction.emoji.name == emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(verifiedRole);
                }
                reaction.users.remove(user.id);      
            }
        })
    }
});