const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const prefix = require('../config.json').prefix;

module.exports = {
	name: 'help',
	aliases: ['h'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		message.channel.send(
			new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setDescription(
					`**\`${prefix}balance\`** - shows your or mentioned user's balance\n**\`${prefix}work\`** - lets you get some money by working\n**\`${prefix}daily\`** - claim your daily reward\n**\`${prefix}weekly\`** - claim your weekly reward\n**\`${prefix}gamble\`** - try your luck and either double your bet or lose it\n**\`${prefix}pay\`** - transfer specified amount of money to another user\n**\`${prefix}leaderboard\`** - shows top 10 players\n**\`${prefix}help\`** - list of all commands\n**\`${prefix}ping\`** - see bot's ping`
				)
				.setColor('F8C300')
				.setTimestamp()
		);
	},
};
