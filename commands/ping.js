module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args) {
		msg.channel.send('Pong.');

		if (!args.length) return;

		if (args[0] == 'gottem') {
			msg.channel.send('Goteem.');
		}
	}
};