const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List of all bot commands.',
	args: true,
	usage: '[command name]',
	execute(msg, args) {
		const data = [];
		const cmds = msg.client.commands;
		// Bug: msg.client doesn't exist

		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(cmds.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command`);

			return msg.author.send(data, { split: true })
				.then(() => {
					if (msg.channel.type === 'dm') return;
					msg.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${msg.author.tag}. \n`, error);
					msg.reply('I could not DM you! Do you have DMs disabled?');
				});
		}
		const name = args[0].toLowerCase();
		const cmd = cmds.get(name) || cmds.find(c => c.aliases && c.aliases.includes(name));

		if (!cmd) {
			return msg.reply('Not a valid command');
		}

		data.push(`Name: ${cmd.name}`);

		if (cmd.aliases) data.push(`Aliases: ${cmd.aliases.join(' ')}`);
		if (cmd.description) data.push(`Description: ${cmd.description}`);
		if (cmd.usage) data.push(`Usage: ${prefix}${cmd.name} ${cmd.usage}`);

		msg.channel.send(data, { split: true });
	}
};