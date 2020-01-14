const Markov = require('../markov.js');

module.exports = {
	name: 'train',
	description: 'Construct a Chain based on the channel',
	usage: '<send-in-desired-channel>',
	async execute(msg) {
		const channel = msg.channel;
		return await fetch(channel);
	}
};

function fetch(channel) {
	//	Initial function to grab first 'before' message

	channel.messages.fetch({ limit: 1 }).then(messages => {
		//	'Before' Snowflake
		let Snowflake = '';

		//	Array for message objects
		const arr = [];
		for (const [key, value] of messages) {
			Snowflake = key;
			arr.push(value);
		}
		return getAll(channel, arr, Snowflake);
	});
}

function getAll(channel, arr, latest) {
	//	Helper function for getting all messages

	//	If there are no more messages to get, train a Chain with all previous messages
	if (arr.length % 100 !== 0 && arr.length !== 1) {
		console.log('Training complete!');
		console.log(arr.length);
		return train(arr);
	}

	//	Fetches 100 messages at a time, if possible
	channel.messages.fetch({ before: latest, limit: 100 }).then(messages => {
		for (const [key, value] of messages.filter(message => !message.author.bot)) {
			arr.push(value);
			console.log(key);
		}
		getAll(channel, arr, arr[arr.length - 1].id);
	});
}

function train(arr) {
	const m = new Markov(2);
	for (const message of arr) {
		m.trainSentence(message.content);
	}
	console.log(m.start);
	return m;
}