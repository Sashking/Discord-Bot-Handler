const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../shop-items');
const Inventory = require('../inventory-items');

module.exports = {
    //name: 'buy',
    //aliases: ['item-buy'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const invalidUseEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('Too few arguments given.\n\nUsage:\n`buy <item> (quantity)`')
			.setColor('F93A2F')
			.setTimestamp();

        // e!buy <name> <quantity>
        const itemName = args[0];
        const quantityString = args[1];
        const quantity = 1;

        if (!itemName) return message.channel.send(invalidUseEmbed);
        if (quantityString) {
            if (isNaN(quantityString)) return message.channel.send(invalidUseEmbed);
            if (parseInt(quantityString) < 1) return message.channel.send(invalidUseEmbed);
            quantity = parseInt(quantityString);
        }
        
        await Schema.findOne({ Guild: message.guild.id, Name: itemName }, (err, data) => {
            if (data) {
                Inventory.findOne({ Guild: message.guild.id, User: message.author.id }, (err, data) => {
                    if (data) {
                        // add new item to the list
                        if (data.Items[itemName]) {
                            data.Items[itemName].Amount += quantity;
                        } else {
                            const newItem = {
                                Name: itemName,
                                Amount: quantity,
                            };
                            data.Items.push(newItem);
                        }
                    } else {
                        // create new inventory and add item to the list
                        data = new Inventory({
                            Guild: message.guild.id,
                            User: message.author.id,
                            Items: {
                                Item: { Name: itemName, Amount: quantity, }
                            },
                        });
                    }
                });
                data.save();

                const successEmbed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`You bought **${quantity}x ${itemName}**`)
                    .setColor('00D166')
                    .setTimestamp();
                
                message.channel.send(successEmbed);
            } else {
                const itemNotFoundEmbed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**${itemName}** not found!`)
                    .setColor('F93A2F')
                    .setTimestamp();
                
                message.channel.send(itemNotFoundEmbed);
            }
        })
    }
}