const mongo = require('mongoose');

const Schema = new mongo.Schema({
	Guild: String,
	User: String,
	Items: Object({
        Item: Object({
            Name: String,
		    Amount: Number,
        })
	}),
});

module.exports = mongo.model('inventory', Schema);
