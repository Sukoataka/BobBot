/** @format */

const Discord = require("discord.js");

const Command = require("./Command.js");

const Event = require("./Event.js");

const botConfig = require("../botConfig.json");

const intents = new Discord.Intents(32767);

const fs = require("fs");

class Client extends Discord.Client {
	constructor() {
		super({ intents });

		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();

		this.prefix = botConfig.prefix;
	}

	start(token) {
		fs.readdirSync("./Commands")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Command}
				 */
				const command = require(`../Commands/${file}`);
				console.log(`De file ${command.name}.js is geladen!`);
				this.commands.set(command.name, command);
			});

		fs.readdirSync("./Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);
				console.log(`De file ${event.event}.js is geladen!`);
				this.on(event.event, event.run.bind(null, this));
			});

		this.login(token);
	}
}

module.exports = Client;
