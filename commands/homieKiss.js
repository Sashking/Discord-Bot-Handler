const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'homiekiss',
	aliases: ['hk'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		let images = [
			'https://cdn.discordapp.com/attachments/586086236557410324/844247314847105034/unknown.png',
			'https://cdn.discordapp.com/attachments/586086236557410324/844247391347671040/unknown.png',
            'https://cdn.discordapp.com/attachments/586086236557410324/844256151088005180/artworks-ZhwDSeaanaGoh00P-LSd33A-t500x500.png',
            'https://cdn.discordapp.com/attachments/586086236557410324/844256368222404648/artworks-000509242308-x3l7g6-t500x500.png',
            
		];
		let chosenImage = images[Math.floor(Math.random() * images.length)];

        message.channel.send(
            new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
                .setImage(chosenImage)
        )
	},
};
