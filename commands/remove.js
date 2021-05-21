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

		const invalidUseEmbed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription('Too few arguments given.\n\nUsage:\n`remove <member> [cash | bank] <amount>`')
			.setColor('F93A2F')
			.setTimestamp();

		const member = message.mentions.members.first();
		const type = args[1];
		const amount = args[2];

		if (!member || !type || isNaN(parseInt(amount)))
			return message.channel.send(invalidUseEmbed);
		if (type == 'cash' || type == 'bank') {
			client.remove(member.id, parseInt(amount), type, message);
			message.channel.send(`Removed ${amount} :coin: from ${member}!`);
		} else return message.channel.send(invalidUseEmbed);
	},
};
