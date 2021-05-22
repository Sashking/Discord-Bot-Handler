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
client.balance = (id, type, message) => 
	new Promise(async (ful) => {
		const data = await Schema.findOne({ Guild: message.guild.id, ID: id });
		if (!data) return ful(0);
		if (type == 'cash') ful(data.Cash);
		else if (type == 'bank') ful(data.Bank);
		else console.log('Invalid type (cash/bank)');
	});

client.add = (id, amount, type, message) => {
	Schema.findOne({ Guild: message.guild.id, ID: id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			if (type == 'cash') data.Cash += amount;
			else if (type == 'bank') data.Bank += amount;
		} else {
			if (type == 'cash') {
				data = new Schema({
					Guild: message.guild.id,
					ID: id,
					Cash: amount,
					Bank: 0,
				});
			} else if (type == 'bank') {
				data = new Schema({
					Guild: message.guild.id,
					ID: id,
					Cash: 0,
					Bank: amount,
				});
			}
		}
		data.save();
	});
};

client.remove = (id, amount, type, message) => {
	Schema.findOne({ Guild: message.guild.id, ID: id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			if (type == 'cash') data.Cash -= amount;
			else if (type == 'bank') data.Bank -= amount;
		} else {
			if (type == 'cash') {
				data = new Schema({
					Guild: message.guild.id,
					ID: id,
					Cash: -amount,
					Bank: 0,
				});
			} else if (type == 'bank') {
				data = new Schema({
					Guild: message.guild.id,
					ID: id,
					Cash: 0,
					Bank: -amount,
				});
			}
		}
		data.save();
	});
};

client.login(token);
