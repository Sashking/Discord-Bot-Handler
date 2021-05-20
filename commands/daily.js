const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'daily',
	cooldown: 1000 * 60 * 60 * 24,
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const coins = Math.floor(Math.random() * 5000) + 1;

		message.channel.send(
			new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setDescription(`You received **${coins}** :coin: today as your daily reward!\nMake sure to come back tomorrow and claim your daily reward again.`)
				.setColor('00D166')
				.setTimestamp()
		);
		client.add(message.author.id, coins, message);
	},
};
