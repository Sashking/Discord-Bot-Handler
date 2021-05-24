const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../shop-items')

module.exports = {
    name: 'shop',
    aliases: ['store'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let items = [];
        await Schema.find({ Guild: message.guild.id }, (err, data) => {
            if (data) {
                data.map(item => {
                    let obj = new Object({
                        name: `${client.emoji} ${item.Price} - ${item.Name}`,
                        value: `${item.Description}` || 'No description',
                        inline: false
                    });
                    console.log(obj) // TODO remove this later
                    items.push(obj);
                })
            } else {
                const emptyStoreEmbed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription('Store is empty\nUse `item-create` to add new item to the store.')
                    .setColor('F93A2F')
                    .setTimestamp();
                return message.channel.send(emptyStoreEmbed);
            }
        })

        const storeEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Buy an item with \`buy <name> <quantity>\`\nFor more information about an item use \`item-info <name>\``)
            .addFields(items)
            .setColor('F8C300')
            .setTimestamp()
        
        message.channel.send(storeEmbed);
    }
}