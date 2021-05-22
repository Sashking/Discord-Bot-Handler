const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'pay',
	aliases: ['give', 'donate', 'transfer'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`pay <user> <amount>`')
			.setColor('F93A2F')
			.setTimestamp();

		const insufficientBalanceEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Insufficient cash balance!`)
			.setColor('F93A2F')
			.setTimestamp();

		const payYourselfEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`You can't pay yourself!`)
			.setColor('F93A2F')
			.setTimestamp();
		
		const minimalAmountEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Minimal transfer amount is ${client.emoji} 1`)
			.setColor('F93A2F')
			.setTimestamp();

		const user = message.mentions.users.first();

		if (!user || !args[1] || isNaN(args[1]))
			return message.channel.send(invalidUseEmbed);

		if (user.id == message.author.id)
			return message.channel.send(payYourselfEmbed);

		const amount = parseInt(args[1]);

		const successEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`${message.author} transfered ${client.emoji} **${amount}** to ${user}.`)
			.setColor('00D166')
			.setTimestamp();

		if (amount < 1) return message.channel.send(minimalAmountEmbed);
		if ((await client.balance(message.author.id, 'cash', message)) < amount) return message.channel.send(insufficientBalanceEmbed);

		await client.remove(message.author.id, amount, 'cash', message);
		await client.add(user.id, amount, 'cash', message);

		message.channel.send(successEmbed);
	},
};
