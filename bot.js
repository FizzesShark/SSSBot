const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { token, prefix } = require('./config.json');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(`${prefix}`) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const cmdName = args.shift().toLowerCase();

	if (!client.commands.has(cmdName)) return;

	const cmd = client.commands.get(cmdName);

	if (cmd.args && !args.length) {
		let reply = `No arguments provided, ${msg.author}`;

		if (cmd.usage) {
			reply += `\n Proper usage would be as follows: '${prefix}${cmd.name} ${cmd.usage}'`;
		}

		return msg.channel.send(reply);
	}

	try {
		cmd.execute(msg, args);
	}
	catch (error) {
		console.error(error);
		msg.reply('An error occurred!');
	}
});

client.login(token);