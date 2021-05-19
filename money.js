const mongo = require('mongoose');

const Schema = new mongo.Schema({
	id: String,
	coins: Number,
});

module.exports = mongo.model('money', Schema);
