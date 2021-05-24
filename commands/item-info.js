const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../shop-items')

module.exports = {
    //name: 'item-info',
    //aliases: ['item'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`item-info <name>`')
			.setColor('F93A2F')
			.setTimestamp();

        const itemName = args[0];
        if (!itemName) return message.channel.send(invalidUseEmbed);

        await Schema.find({ Guild: message.guild.id, Name: itemName }, (err, data) => {
            if (data) {
                console.log(data) // TODO fix this part and remove this
                console.log(data.Name)
                const itemEmbed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        /**
                         * Name:            Price:
                         * Chicken          💵 500
                         *
                         * Description:
                         * Just a normal chicken.
                         */

                        { name: 'Name:', value: data.Name, inline: true },
                        { name: 'Price:', value: `${client.emoji} ${data.Price}`, inline: true },
                        { name: '** **', value: '** **', inline: false },
                        { name: 'Description:', value: data.Description, inline: false },
                    )
                    .setColor('F8C300')
                    .setTimestamp()
                message.channel.send(itemEmbed);
            } else {
                const emptyStoreEmbed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription('Item not found.')
                    .setColor('F93A2F')
                    .setTimestamp();
                return message.channel.send(emptyStoreEmbed);
            }
        })
    }
}