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

        if (positiveOutcome) {
            message.channel.send(
                new MessageEmbed()
                    .setDescription(
                        `You successfully commited a crime and earned **${coins}** coins!`
                    )
                    .setColor('00D166')
                    .setTimestamp()
            );
            client.add(message.author.id, coins);
        } else {
            message.channel.send(
                new MessageEmbed()
                    .setDescription(
                        `You got caught and lost **${coins}** coins! Better luck next time...`
                    )
                    .setColor('F93A2F')
                    .setTimestamp()
            );
            client.remove(message.author.id, coins);
        }

		
		
	},
};
