console.clear();

const Client = require("./Structures/Client.js");

const botConfig = require("./botConfig.json");

const client = new Client();

client.start(botConfig.token);