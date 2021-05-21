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
				name: '` balance `',
				value: `shows yours or mentioned user's balance`,
				inline: true,
			},
			{
				name: '` withdraw `',
				value: `allows you to withdraw money from bank`,
				inline: true,
			},
			{
				name: '** **',
				value: '** **',
			},
			{
				name: '` deposit `',
				value: `allows you to deposit money to bank`,
				inline: true,
			},
			{
				name: '` work `',
				value: `lets you get some money by working`,
				inline: true,
			},
			{
				name: '** **',
				value: '** **',
			},
			{
				name: '` crime `',
				value: `high risk - high reward ¯\\_(ツ)_/¯`,
				inline: true,
			},
			{
				name: '` daily `',
				value: `claim your daily reward`,
				inline: true,
			},
			{
				name: '** **',
				value: '** **',
			},
			{
				name: '` weekly `',
				value: `claim your weekly reward`,
				inline: true,
			},
			{
				name: '` leaderboard `',
				value: `top 10 players in server`,
				inline: true,
			},
			{
				name: '** **',
				value: '** **',
			},
			{
				name: '` gamble <amount> `',
				value: `try your luck and either double your bet or lose it`,
				inline: true,
			},
			{
				name: '` pay <user> <amount> `',
				value: `(amins only) transfer specified amount of money to another user`,
				inline: true,
			},
			{
				name: '** **',
				value: '** **',
			},
			{
				name: '` add <user> [cash | bank] <amount> `',
				value: `(admins only) adds specified amount of money to selected user`,
				inline: true,
			},
			{
				name: '` remove [cash | bank] <amount> `',
				value: `removes specified amount of money from selcted user`,
				inline: true,
			},
			{
				name: '** **',
				value: '** **',
			},
			{
				name: '` help `',
				value: `list of all commands`,
				inline: true,
			},
			{
				name: '` ping `',
				value: `see bot's ping`,
				inline: true,
			}
		);
		helpEmbed.setColor('F8C300');
		helpEmbed.setTimestamp();

		message.channel.send(helpEmbed);
	},
};
