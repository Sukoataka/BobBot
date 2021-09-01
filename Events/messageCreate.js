const Event = require('../Structures/Event.js');

module.exports = new Event("messageCreate", (client, message) => {

    if(message.channel.type === "DM") return;

    if(!message.content.startsWith(client.prefix)) return;

    const args = message.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if(!command) return message.reply(`!${args[0]} is geen geldig commando!`);

    const permission = message.member.permissions.has(command.permission, true);

    if (!permission) return message.channel.send(`Sorry ${message.author}, je hebt hier geen permissie voor!`)

    command.run(message, args, client);

    console.log(`${message.author.username} gebruikte het commando: !${args[0]}.`);
})