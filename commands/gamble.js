const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'gamble',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const bet = args[0];

		if (!bet || isNaN(bet)) {
			return message.channel.send(
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(
						`
                        Invalid use! Usage: 
                        \`gamble <amount>\`
                        `
					)
					.setTimestamp()
			);
		}

		const convertedBet = parseInt(bet);

		if (client.balance(message.author.id, message) < convertedBet || bet < 1) {
			return message.channel.send(
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setDescription(`Insufficient balance!`)
			);
		}

		const userWins = Math.random() < 0.49; // 49% probability of user winning

		if (userWins) {
			message.channel.send(
				new MessageEmbed()
					.setDescription(
						`Congratulations! You won **${convertedBet}** :coin:!`
					)
					.setColor('00D166')
					.setTimestamp()
			);
			await client.add(message.author.id, convertedBet, message);
		} else {
			message.channel.send(
				new MessageEmbed()
					.setDescription(
						`Aww \:( you lost **${convertedBet}** :coin:! Better luck next time...`
					)
					.setColor('F93A2F')
					.setTimestamp()
			);
			await client.remove(message.author.id, convertedBet, message);
			await client.add(message.guild.ownerID, transactionFee, message);
		}
	},
};
