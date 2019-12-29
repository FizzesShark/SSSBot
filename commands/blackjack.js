const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/blackjack').filter(file => file.endsWith('.js'));

module.exports = {
	name: 'blackjack',
	args: false,
	description: 'Start a new blackjack game!',
	usage: '```React to the message to join the game, then use $start to start!```',
	execute(msg) {
		return;
	}
};