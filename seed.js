var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

db.run("INSERT INTO categories (name, description) VALUES ('Mets', 'All things Mets are discussed here'), ('Jets', 'All things Jets are discussed here'), ('GoT', 'Discuss the TV show and the books. NO SPOILERS!!'), ('Beer', 'Lets talk craft beers and breweries. NO BUD LIGHT!!')", function (err) {
	if(err){
		throw err;
	}
});


db.run("INSERT INTO threads (title, content, cat_id, votes) VALUES ('first thread', 'this is my first thread', '1', '0'), ('second thread', 'this is my second thread', '2', '0'), ('third thread', 'this is my third thread', '3', '0'), ('first thread', 'this is my first thread', '4', '0')", function (err) {
	if(err){
		throw err;
	}
});