const Discord = require('discord.js');
const Markov = require('../markov.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { token, prefix } = require('./config.json');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const m = new Markov(2);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(`${prefix}`) || msg.author.bot) {
		if (msg.mentions.everyone) {
			return msg.channel.send('What the fuck. Did you really ping me at this time for that? You did. \nArrangements have been made so that I will no longer be directly pinged from you. If you need me, contact somebody else.');
		}
		if (msg.mentions.has(client.user)) {
			return msg.channel.send('What the fuck. Did you really ping me at this time for that? You did. \nArrangements have been made so that I will no longer be directly pinged from you. If you need me, contact somebody else.');
		}
	}
	const args = msg.content.slice(prefix.length).split(/ +/);
	const cmdName = args.shift().toLowerCase();

	if (!client.commands.has(cmdName)) return;

	if (cmdName === 'train') {
		const arr = client.commands.get(cmdName).execute(msg);
		for (const obj in arr) {
			m.trainSentence(obj.content);
		}
		return;
	}

	if (cmdName === 'say') {
		client.commands.get(cmdName).execute(msg, m);
	}

	const cmd = client.commands.get(cmdName);

	if (cmd.args && !args.length) {
		let reply = `No arguments provided, ${msg.author}`;

		if (cmd.usage) {
			reply += `\n Proper usage would be as follows: '${prefix}${cmd.name} ${cmd.usage}'`;
		}

		return msg.channel.send(reply);
	}

	try {
		if (cmd.args) cmd.execute(msg, args);
		else cmd.execute(msg);
	}
	catch (error) {
		console.error(error);
		msg.reply('An error occurred!');
	}
});

client.login(token);