const Markov = require(TODO);

module.exports = {
	name: 'train',
	description: 'Construct a Chain based on the channel',
	usage: '<send-in-desired-channel>',
	execute(msg) {
		const channel = msg.channel;
		const m = fetch(channel);
	}
};

function fetch(channel) {
	channel.messages.fetch({ limit: 1 }).then(messages => {
		let Snowflake = '';
		const arr = [];
		for (const [key, value] of messages) {
			Snowflake = key;
			arr.push(value);
		}
		return getAll(channel, arr, Snowflake);
	});
}

function getAll(channel, arr, latest) {
	if (arr.length % 100 !== 0 && arr.length !== 1) {
		console.log('Training complete!');
		return trainMarkov(arr);
	}
	channel.messages.fetch({ before: latest, limit: 100 }).then(messages => {
		for (const [key, value] of messages.filter(m => !m.author.bot)) {
			arr.push(value);
		}
		getAll(channel, arr, arr[arr.length - 1].id);
	});
}

function trainMarkov(arr) {
	const m = new Markov(2);
	for (message in arr) {
		m.trainSentence(message.content);
	}
	return m;
}