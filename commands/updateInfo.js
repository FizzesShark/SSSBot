const store = require('./store.js');

const questions = [
	'What\'s your age?',
	'What\'s your gender?',
	'Tell us about some of your hobbies.',
	'And your interests?'
];

//	Ideas: get all fields from MongoDB, so I only have to update Schemas to update questions
//		   DM user, await messages only from the same person and in the DM channel

module.exports = {
	name: 'update',
	description: 'Create a new profile, or update your old one for Secret Santa.',
	usage: '$update',
	execute(msg) {
		const user = msg.author;

		console.log('Was called');
		user.send('Goddamnit');
		msg.channel.send('Didn\'t work');

		for (let i = 0; i < questions.length; i++){
			//
		}
	}
}