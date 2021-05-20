const { Client, Message, MessageEmbed, User } = require('discord.js');

module.exports = {
	name: 'remove',
	aliases: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) return;

		const member = message.mentions.members.first() || message.member;

		if (isNaN(parseInt(args[0])))
			return message.channel.send('Please specify an amount.');

		client.remove(member.id, parseInt(args[0]), message);
		message.channel.send(`Removed ${args[0]} :coin: from ${member}!`);
	},
};
