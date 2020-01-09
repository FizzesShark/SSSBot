const Markov = require('./markov.js');

const m = new Markov(2);

module.exports = {
	m,
	trained: false
};