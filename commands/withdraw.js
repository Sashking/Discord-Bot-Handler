const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'withdraw',
	aliases: ['with'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const invalidUseEmbed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(
				'Too few arguments given.\n\nUsage:\n`withdraw <amount>`'
			)
			.setColor('F93A2F')
			.setTimestamp();

		const insufficientBalanceEmbed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(`Insufficient bank balance!`)
			.setTimestamp();

		const successEmbed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(`Withdrew **${amount}** :coin:.`)
			.setColor('00D166');

		if (!args[0]) {
			const amount = client.balance(message.author.id, 'bank', message);
		} else if (isNaN(args[0])) return message.channel.send(invalidUseEmbed);
		else {
			const amount = parseInt(args[0]);
		}

		if ((await client.balance(message.author.id, 'bank', message)) < amount)
			return message.channel.send(insufficientBalanceEmbed);

		await client.remove(message.author.id, amount, 'bank', message);
		await client.add(message.author.id, amount, 'cash', message);

		message.channel.send(successEmbed);
	},
};
