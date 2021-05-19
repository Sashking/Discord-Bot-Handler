const { Collection, Client, Discord } = require('discord.js');
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
client.balance = (id) =>
	new Promise(async (ful) => {
		const data = await Schema.findOne({ id });
		if (!data) return ful(0);
		ful(data.coins);
	});

client.add = (id, coins) => {
	Schema.findOne({ id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.coins += coins;
		} else {
			data = new Schema({ id, coins });
		}
		data.save();
	});
};

client.remove = (id, coins) => {
	Schema.findOne({ id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.coins -= coins;
		} else {
			data = new Schema({ id, coins: -coins });
		}
		data.save();
	});
};

client.login(token);
