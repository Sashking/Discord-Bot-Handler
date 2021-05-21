const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'deposit',
	aliases: ['dep'],
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
				'Too few arguments given.\n\nUsage:\n`deposit <amount>`'
			)
			.setColor('F93A2F')
			.setTimestamp();

		const insufficientBalanceEmbed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(`Insufficient cash balance!`)
			.setTimestamp();

		const successEmbed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(`Deposited **${amount}** :coin:.`)
			.setColor('00D166');

		if (!args[0]) {
			const amount = client.balance(message.author.id, 'cash', message);
		} else if (isNaN(args[0])) return message.channel.send(invalidUseEmbed);
		else {
			const amount = parseInt(args[0]);
		}

		if ((await client.balance(message.author.id, 'cash', message)) < amount)
			return message.channel.send(insufficientBalanceEmbed);

		await client.remove(message.author.id, amount, 'cash', message);
		await client.add(message.author.id, amount, 'bank', message);

		message.channel.send(successEmbed);
	},
};
