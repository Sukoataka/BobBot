const Discord = require('discord.js');
const Client = require('./Client.js');


/**
 * 
 * @param {Discord.Message | Discord.Interaction} message 
 * @param {string[]} args 
 * @param {Client} client 
 * @param {member} member
 * @param {Discord.ClientEvents[K]} eventArgs
 */

function RunFunction(message, args, client, eventArgs) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */

class Command {
    /**
     * @param {CommandOptions} options
     * @typedef {{name: string, description: string, permission: Discord.PermissionString, run: RunFunction}} CommandOptions
     * @param {RunFunction<K>} runFunction
     * @param {K} event
    */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.permission = options.permission;
        this.run = options.run;

    }
};

module.exports = Command;