const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const prefix = require('../config.json').prefix;

module.exports = {
	name: 'help',
	aliases: ['h'],
	run: async (client, message, args) => {
		message.channel.send(
			`\`${prefix}homiekiss\` - homiekiss 😏\n\`${prefix}help\` - všechny příkazy`
		);
	},
};
