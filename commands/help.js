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
		const helpEmbed = new MessageEmbed();
		helpEmbed.setAuthor(
			message.author.tag,
			message.author.displayAvatarURL({ dynamic: true })
		);
		helpEmbed.addFields(
			{
				name: `\`${prefix}balance\``,
				value: `shows yours or mentioned user's balance`,
				inline: true,
			},
			{
				name: `\`${prefix}work\``,
				value: `lets you get some money by working`,
				inline: true,
			},
			{
				name: `\`${prefix}crime\``,
				value: `high risk - high reward ¯\\_(ツ)_/¯`,
				inline: true,
			},
			{
				name: `\`${prefix}daily\``,
				value: `claim your daily reward`,
				inline: true,
			},
			{
				name: `\`${prefix}weekly\``,
				value: `claim your weekly reward`,
				inline: true,
			},
			{
				name: `\`${prefix}leaderboard\``,
				value: `top 10 players in server`,
				inline: true,
			},
			{
				name: `\`${prefix}gamble\``,
				value: `try your luck and either double your bet or lose it`,
				inline: true,
			},
			{
				name: `\`${prefix}pay\``,
				value: `(amins only) transfer specified amount of money to another user`,
				inline: true,
			},
			{
				name: `\`${prefix}add\``,
				value: `(admins only) adds specified amount of money to selected user`,
				inline: true,
			},
			{
				name: `\`${prefix}remove\``,
				value: `removes specified amount of money from selcted user`,
				inline: true,
			},
			{
				name: `\`${prefix}help\``,
				value: `list of all commands`,
				inline: true,
			},
			{
				name: `\`${prefix}ping\``,
				value: `see bot's ping`,
				inline: true,
			},
			{ name: `** **`, value: `** **`, inline: true }
		);
		helpEmbed.setColor('F8C300');
		helpEmbed.setTimestamp();

		message.channel.send(helpEmbed);
	},
};
