var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

db.run("INSERT INTO categories (name, description) VALUES ('first category', 'this is my first category'), ('second category', 'this is my second category'), ('third category', 'this is my third category')", function (err) {
	if(err){
		throw err;
	}
});


db.run("INSERT INTO threads (title, content, cat_id) VALUES ('first thread', 'this is my first thread', 1), ('second thread', 'this is my second thread', 2), ('third thread', 'this is my third thread', 3)", function (err) {
	if(err){
		throw err;
	}
});