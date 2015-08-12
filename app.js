var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('style'));

app.get("/", function (req, res){
	res.redirect("/forums");
});

app.get("/forums", function (req, res){
	db.all("SELECT * FROM categories", function (err, categories){
		if (err) {
			throw err;
		}else {
			res.render("index.ejs", {categories: categories});
		}
	});
});



app.listen(3000, function(){
	console.log('listening on port 3000!')
});