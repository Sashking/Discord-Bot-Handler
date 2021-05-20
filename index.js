const { Collection, Client, Discord, Message } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Client({
	disableEveryone: true,
});
const Schema = require('./money');
const mongo = require('mongoose');
mongo
	.connect(
		'mongodb+srv://sashking:D0i6oeQtBnYBwz45@cluster0.lyi8d.mongodb.net/Data',
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
		}
	)
	.then(console.log('\n\n💾  Connected to MongoDB!'));
const prefix = config.prefix;
const token = config.token;
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
['command'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

// functions
client.balance = (id, message) =>
	new Promise(async (ful) => {
		const data = await Schema.findOne({ Guild: message.guild.id, ID: id });
		if (!data) return ful(0);
		ful(data.Coins);
	});

client.add = (id, coins, message) => {
	Schema.findOne({ Guild: message.guild.id, ID: id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.Coins += coins;
		} else {
			data = new Schema({
				Guild: message.guild.id,
				ID: id,
				Coins: coins,
			});
		}
		data.save();
	});
};

client.remove = (id, coins, message) => {
	Schema.findOne({ id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.Coins -= coins;
		} else {
			data = new Schema({
				Guild: message.guild.id,
				ID: id,
				Coins: -coins,
			});
		}
		data.save();
	});
};

client.login(token);
