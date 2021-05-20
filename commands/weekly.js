const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'weekly',
	cooldown: 1000 * 60 * 60 * 24 * 7,
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const coins = Math.floor(Math.random() * 35000) + 1;

		client.add(message.author.id, coins, message);
		message.channel.send(
			new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setDescription(`You received **${coins}** :coin: as your weekly reward!\nMake sure to come back next week to claim your weekly reward again!`)
				.setColor('00D166')
				.setTimestamp()
		);
	},
};
