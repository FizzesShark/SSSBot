module.exports = {
	name: 'yeet',
	description: 'Gottem',
	execute(msg, args) {
		const cmd = args.shift().toLowerCase();
		if (cmd == 'yeet') {
			msg.channel.send('Boop.');
		}
	}
};