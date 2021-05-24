const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../shop-items');

module.exports = {
	name: 'item-delete',
	aliases: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) return;
		const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`item-delete <name>`')
			.setColor('F93A2F')
			.setTimestamp();

		const itemName = args[0];
		if (!itemName) return message.channel.send(invalidUseEmbed);

        Schema.findOneAndDelete({ Guild: message.guild.id, Name: itemName }).then(() => {
            const successEmbed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Successfully deleted **${itemName}**`)
                .setColor('00D166')
                .setTimestamp();
		
		    message.channel.send(successEmbed);
        })
	},
};
