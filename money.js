const mongo = require('mongoose');

const Schema = new mongo.Schema({
	Guild: String,
	ID: String,
	Coins: Number,
});

module.exports = mongo.model('money', Schema);
