const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'crime',
	cooldown: 1000 * 60 * 60,
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const coins = Math.floor(Math.random() * 2000) + 1;
		const positiveOutcome = Math.random() < 0.3; // 30% probability of outcome being positive

		const successEmbed = new MessageEmbed()
			.setDescription(`You successfully commited a crime and earned **${coins}** :coin:!`)
			.setColor('00D166')
			.setTimestamp();

		const failureEmbed = new MessageEmbed()
			.setDescription(`You got caught and lost **${coins}** :coin:! Better luck next time...`)
			.setColor('F93A2F')
			.setTimestamp();

		if (positiveOutcome) {
			await client.add(message.author.id, coins, 'cash', message);
			message.channel.send(successEmbed);
		} else {
			await client.remove(message.author.id, coins, 'cash', message);
			message.channel.send(failureEmbed);
		}
	},
};
