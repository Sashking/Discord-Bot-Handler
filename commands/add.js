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

		const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`add <member> [cash | bank] <amount>`')
			.setColor('F93A2F')
			.setTimestamp();

		const member = message.mentions.members.first();
		const type = args[1];
		const amount = args[2];

		if (!member || !type || isNaN(parseInt(amount)))
			return message.channel.send(invalidUseEmbed);
		if (type == 'cash' || type == 'bank') {
			await client.add(member.id, parseInt(amount), type, message);

			const embed = new MessageEmbed()
				.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
				.setDescription(`Added ${client.emoji} ${amount} to ${member}`)
				.setColor('00D166')
				.setTimestamp()

			message.channel.send(embed);
		} else return message.channel.send(invalidUseEmbed);
	},
};
