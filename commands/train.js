module.exports = {
	name: 'train',
	description: 'Construct a Chain based on the channel',
	usage: '<send-in-desired-channel>',
	execute(msg) {
		const channel = msg.channel;
		
	}
};

function getAll(channel, arr, latest) {
	if (arr.length % 100 !== 0) {
		return arr;
	}
	channel.fetchMessages({ before: latest.Snowflake }).then(messages => {
		for (let i = 0; i < messages.length; i++) {
			arr.push(messages[i].Message.content);
	}});
}