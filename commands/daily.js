const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../daily-rewards');

let claimedCache = [];

const clearCache = () => {
	claimedCache = [];
	setTimeout(clearCache, 1000 * 60 * 10); // clearing cache every 10 minutes
};
clearCache();

const cooldownEmbed = new MessageEmbed();
cooldownEmbed.setDescription(`You have already claimed your daily reward!`);
cooldownEmbed.setColor('F93A2F');
cooldownEmbed.setTimestamp();

module.exports = {
	name: 'daily',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (claimedCache.includes(message.author.id)) {
			console.log('Returning from cache.');
			return message.channel.send(cooldownEmbed);
		}

		const obj = {
			Guild: message.guild.id,
			User: message.author.id,
		};

		console.log('Fetching from mongo.');
		const results = await Schema.findOne(obj);
		console.log(results);
		if (results) {
			const then = new Date(results.updatedAt).getTime();
			const now = new Date().getTime();

			const diffTime = Math.abs(now - then);
			const DiffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

			if (DiffDays <= 1) {
				claimedCache.push(message.author.id);
				return message.channel.send(cooldownEmbed);	
			}
		}

		await Schema.findOneAndUpdate(obj, obj, {
			upsert: true,
		});
		claimedCache.push(message.author.id);

		const coins = Math.floor(Math.random() * 5000) + 1;

		message.channel.send(
			new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setDescription(
					`You received **${coins}** :coin: today as your daily reward!\nMake sure to come back tomorrow and claim your daily reward again.`
				)
				.setColor('00D166')
				.setTimestamp()
		);
		client.add(message.author.id, coins, message);
	},
};
