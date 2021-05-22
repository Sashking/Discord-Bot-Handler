const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'rob',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`rob <user>`')
			.setColor('F93A2F')
			.setTimestamp();

		const user = message.mentions.members.first();
		const coins = Math.floor(Math.random() * client.balance(user.id, 'cash', message));
		const robSuccesful = Math.random() < 0.5;

		const winEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Congratulations! You robbed **${user}** :coin:!`)
			.setColor('00D166')
			.setTimestamp();

		const lossEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`You got caught while robbing ${user}. And now have to pay ${coins}.`)
			.setColor('F93A2F')
			.setTimestamp();

		const noMoneyInCashEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`You tried to rob ${user}, but he didn't have any cash.`)
			.setColor('F93A2F')
			.setTimestamp();

		if (!user) return message.channel.send(invalidUseEmbed);
		if (client.balance(user.id, 'cash', message) < 1) return message.channel.send(noMoneyInCashEmbed);

		if (robSuccesful) {
            await client.remove(user.id, coins, 'cash', message);
			await client.add(message.author.id, coins, 'cash', message);
			message.channel.send(winEmbed);
		} else {
			await client.remove(message.author.id, Math.floor(coins / 2), 'cash', message);
            await client.add(user.id, Math.floor(coins / 2), 'cash', message);
			message.channel.send(lossEmbed);
		}
	},
};
