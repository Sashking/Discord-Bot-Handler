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
		const bank = await client.balance(member.id, 'bank', message);
		const cash = await client.balance(member.id, 'cash', message);

		const balanceEmbed = new MessageEmbed()
			.setAuthor(
				member.user.tag,
				member.user.displayAvatarURL({ dynamic: true })
			)
			.addFields(
				{ name: 'Cash:', value: `${cash} :coin:`, inline: true },
				{ name: 'Bank:', value: `${bank} :coin:`, inline: true },
				{ name: 'Total:', value: `${cash + bank} :coin:`, inline: true }
			)
			.setColor('F8C300')
			.setTimestamp();

		message.channel.send(balanceEmbed);
	},
};
