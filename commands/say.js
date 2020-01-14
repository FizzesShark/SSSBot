const Global = require('../commands/train.js');


//	TODO: make the Markov chain be updated across different files
module.exports = {
	name: 'say',
	description: 'Says something based on the channel it was trained on!',
	execute(msg) {
		console.log(Global.m.start);
		msg.channel.send(Global.m.generateSentence());
	}
};