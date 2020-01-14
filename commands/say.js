//	TODO: make the Markov chain be updated across different files
module.exports = {
	name: 'say',
	description: 'Says something based on the channel it was trained on!',
	execute(msg, m, trained) {
		if (!trained) return;
		console.log(m.start);
		msg.channel.send(m.generateSentence());
	}
};