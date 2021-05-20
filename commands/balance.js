const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'balance',
	aliases: ['bal'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.member;

		const bal = await client.balance(member.id, message);
		message.channel.send(
			new MessageEmbed()
				.setAuthor(
					member.user.tag,
					member.user.displayAvatarURL({ dynamic: true })
				)
				.addField('Balance:', bal + ' :coin:')
				.setColor('F8C300')
				.setTimestamp()
		);
	},
};
