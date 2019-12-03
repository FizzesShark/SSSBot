const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(`${prefix}`) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	if (cmd == 'args') {
		msg.channel.send('Nice');
	}
});

client.login(token);