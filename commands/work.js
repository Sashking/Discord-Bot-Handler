const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'work',
	cooldown: 1000 * 60,
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const jobs = [
			'Programmer',
			'Builder',
			'Waiter',
			'Bus Driver',
			'Chef',
			'Mechanic',
			'Doctor',
		];
		const jobIndex = Math.floor(Math.random() * jobs.length);
		const coins = Math.floor(Math.random() * 200) + 1;
		const workEmbed = new MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription(
				`You worked as a **${jobs[jobIndex]}** and earned **${coins}** :coin:!`
			)
			.setColor('00D166')
			.setTimestamp();

		await client.add(message.author.id, coins, 'cash', message);
		message.channel.send(workEmbed);
	},
};
