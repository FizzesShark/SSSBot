module.exports = {
	name: 'ping',
	args: true,
	description: 'Ping!',
	usage: '<args> := {gottem}',
	execute(msg, args) {
		msg.channel.send('Pong.');

		if (!args.length) return;

		if (args[0] == 'gottem') {
			msg.channel.send('Goteem.');
		}
	}
};