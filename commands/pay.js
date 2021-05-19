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
		const user = message.mentions.users.first();
		if (!user)
			return message.channel.send(
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(
						`
                        Invalid use! Usage: 
                        \`pay <@user> <amount>\`
                        `
					)
			);

		if (user.id == message.author.id)
			return message.channel.send(
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(`You can't pay yourself!`)
			);

		const amount = args[1];
		if (!amount || isNaN(amount))
			return message.channel.send(
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(
						`
                        Invalid use! Usage: 
                        \`pay <@user> <amount>\`
                        `
					)
			);

		const convertedAmount = parseInt(amount);
		if ((await client.balance(message.author.id)) < convertedAmount)
			return message.channel.send(
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(`Insufficient balance!`)
			);

		await client.remove(message.author.id, convertedAmount);
		await client.add(user.id, convertedAmount);

		message.channel.send(
			new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setDescription(
					`${message.author} transfered **${convertedAmount}** coins to ${user}`
				)
				.setColor('00D166')
		);
	},
};
