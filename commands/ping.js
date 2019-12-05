module.exports = {
	name: 'ping',
	args: true,
	description: 'Spam ping!',
	usage: '<user>',
	execute(msg, args) {
		msg.channel.send(`${args.shift()}`);
	}
};