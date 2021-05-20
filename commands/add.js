const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'add',
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
		
		client.add(member.id, parseInt(args[0]), message);
		message.channel.send(`Added ${args[0]} :coin: to ${member}!`);
	},
};
