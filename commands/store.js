//	MongoDB access using Mongoose.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SSBot', { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
	id			: { type : String, unique : true, required : true },
	age			: { type : Number },
	gender		: { type : String },
	hobbies 	: { type : String },
	interests	: { type : String }
});

const User = mongoose.model('User', userSchema);

module.exports = async (id, age, gender, hobbies, ints) => {
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function() {
		console.log('Connected');
	});

	const updateObj = {};
	if (id) updateObj.id = id;
	if (age) updateObj.age = age;
	if (gender) updateObj.gender = gender;
	if (hobbies) updateObj.hobbies = hobbies;
	if (ints) updateObj.interests = ints;

	User.findOneAndUpdate({ id: id }, updateObj, { upsert: true }, function(err) {
		if (err) return console.error(err);
		return console.log('Successfully saved');
	});
};