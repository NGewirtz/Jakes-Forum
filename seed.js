var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

db.run("INSERT INTO categories (name, description) VALUES ('Mets', 'All things Mets are discussed here'), ('Jets', 'All things Jets are discussed here'), ('GoT', 'Discuss the TV show and the books. NO SPOILERS!!'), ('Beer', 'Lets talk craft beers and breweries. NO BUD LIGHT!!')", function (err) {
	if(err){
		throw err;
	}
});


db.run("INSERT INTO threads (title, content, cat_id, votes) VALUES ('Matt Harvey: Great pitcher or greatest pitcher?', 'My vote is greatest pitcher of all time, what do you guys think?', '1', '0'), ('DEFENSE', 'Am I Rite?', '2', '0'), ('Is Jon Snow dead?', 'No spoilers.. but is Jon Snow dead?', '3', '0'), ('DOG FISH HEAD!!!', 'DOG FISH HEAD!!!!!!!!!!!', '4', '0')", function (err) {
	if(err){
		throw err;
	}
});