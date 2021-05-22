const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'gamble',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`gamble <amount>`')
			.setColor('F93A2F')
			.setTimestamp();

		const insufficientBalanceEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Insufficient cash balance!`)
			.setTimestamp();

		const winEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Congratulations! You won **${args[0]}** :coin:!`)
			.setColor('00D166')
			.setTimestamp();

		const lossEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Aww \:( You lost **${args[0]}** :coin:! Better luck next time...`)
			.setColor('F93A2F')
			.setTimestamp();

		if (!args[0] || isNaN(args[0])) return message.channel.send(invalidUseEmbed);

		const bet = parseInt(args[0]);

		if (await client.balance(message.author.id, 'cash', message) < bet || bet < 1) return message.channel.send(insufficientBalanceEmbed);

		const userWins = Math.random() < 0.5; // 50% probability of winning

		if (userWins) {
			await client.add(message.author.id, bet, 'cash', message);
			message.channel.send(winEmbed);
		} else {
			await client.remove(message.author.id, bet, 'cash', message);
			message.channel.send(lossEmbed);
		}
	},
};
