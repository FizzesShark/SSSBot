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
	const cmd = args.shift().toLowerCase();

	if (!client.commands.has(cmd)) return;

	try {
		client.commands.get(cmd).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('An error occurred!');
	}
});

client.login(token);