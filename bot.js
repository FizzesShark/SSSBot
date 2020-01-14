const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { token, prefix } = require('./config.json');
const fs = require('fs');
let m;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let trained = false;

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
		m = client.commands.get(cmdName).execute(msg);
		trained = true;
		return;
	}

	if (cmdName === 'say') {
		console.log(m.start);
		client.commands.get(cmdName).execute(msg, m, trained);
		return;
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