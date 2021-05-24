const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../shop-items');

module.exports = {
	name: 'item-create',
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
			.setDescription('Too few arguments given.\n\nUsage:\n`item-create <name>`')
			.setColor('F93A2F')
			.setTimestamp();

		const itemName = args[0]; // TODO manage multiple-word items
		if (!itemName) return message.channel.send(invalidUseEmbed);

		Schema.findOne({ Guild: message.guild.id, Name: itemName }, (err, data) => {
			if (data) {
				const duplicateEmbed = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`Item with name ${itemName} already exists.\n\nTry using different name!`)
					.setColor('F93A2F')
					.setTimestamp();
				
				message.channel.send(duplicateEmbed);
			} else {
				const newItem = new Schema({
					Guild: message.guild.id,
					Name: itemName,
					Price: 0,
					Description: '',
				}).save();
		
				const successEmbed = new MessageEmbed()
					.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`Successfully created new item - **${itemName}**\n\nYou can edit this item further using \`item-edit\` command!`)
					.setColor('00D166')
					.setTimestamp();
				
				message.channel.send(successEmbed);
			}
		})
	},
};


/**
 * 		prefix = 'zex '
 * 		message = 'zex item-create chicken is cool'
 * 		message.slice(1, prefix.length)
 * 		
 * 		commands = ['item-create', 'item-delete', ...]
 * 		command = ''
 * 		'item-create chicken is cool'
 * 		message.slice(1, command.length)
 * 
 * 		'chicken is cool'
 * 		args = []
 * 		args = ['chicken', 'is', 'cool']
 * 
 * 		args.join('') 	>>> 'chickeniscool'
 * 		args.join(' ') 	>>> 'chicken is cool'
 * 		args.join('--') >>>	'chicken--is--cool'
 */