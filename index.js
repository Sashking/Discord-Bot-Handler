const { Collection, Client } = require('discord.js');
const config = require('./config.json');
const Schema = require('./money');
const mongo = require('mongoose');
const fs = require('fs');
const client = new Client({ disableEveryone: true, });
mongo.connect('mongodb+srv://sashking:D0i6oeQtBnYBwz45@cluster0.lyi8d.mongodb.net/Data', { useUnifiedTopology: true, useNewUrlParser: true, })
	.then(console.log('\n\n💾  Connected to MongoDB!'));
module.exports = client;
client.emoji = config.emoji;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
['command'].forEach((handler) => { require(`./handlers/${handler}`)(client); });

// functions
client.balance = (id, type, message) => 
	new Promise(async (ful) => {
		const data = await Schema.findOne({ Guild: message.guild.id, ID: id });
		if (!data) return ful(0);
		if (type == 'cash') ful(data.Cash);
		else if (type == 'bank') ful(data.Bank);
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

client.login(config.token);
