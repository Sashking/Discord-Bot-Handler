const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../shop-items');

module.exports = {
	//name: 'item-edit',
	//aliases: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`item-edit <item> [name | price | description] <value>`')
			.setColor('F93A2F')
			.setTimestamp();

        const item = args[0];
		const type = args[1];
        const value = args[2];

        if (!item || !type || !value) return message.channel.send(invalidUseEmbed);
        if (!['name', 'price', 'description'].includes(type)) return message.channel.send(invalidUseEmbed);

        Schema.find({ Guild: message.guild.id, Name: item }, (err, data) => {
            if (data) {
                if (type == 'name') data.Name = value;
                else if (type == 'price') {
                    if (!isNaN(value)) data.Price = value;
                    else return message.channel.send(invalidUseEmbed);
                } else if (type == 'description') data.Description = value;

                const successEmbed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Item edited!`)
                    .setColor('00D166')
                    .setTimestamp();
                message.channel.send(successEmbed);
            } else {
                return message.channel.send(invalidUseEmbed);
            }
        })
	},
};
