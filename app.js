var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');
var request = require('request');
var marked = require('marked');
var dotenv = require('dotenv').load();
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('style'));

app.get("/", function (req, res){
	res.redirect("/forums");
});

app.get("/forums", function (req, res){
	var threadArray = [];
	db.all("SELECT * FROM categories", function (err, categories){
		if (err) {
			throw err;
		}else {
			categories.forEach(function(category){
				db.get("SELECT * FROM threads WHERE cat_id=? ORDER BY threads.votes DESC", category.id, function (err, thread){
					threadArray.push(thread)
					if (threadArray.length === categories.length) {
						res.render("index.ejs", {categories: categories, thread:threadArray});
					}
				})
			})
		}
	});
});

app.get("/forums/threads/new/:id", function (req, res){
	var id = req.params.id;
	db.get("SELECT * FROM categories WHERE id=?", id, function (err, category){
		if(err){
			throw err;
		}else {
			res.render("newCategory.ejs", {category: category});
		}
	});
});

app.post("/forums/threads/new/:id", function (req, res){
	var id = req.params.id;
	var title = req.body.title;
	var content = req.body.content;
	var votes = 0;

	db.run("INSERT INTO threads (cat_id, title, content, votes) VALUES (?,?,?,?)", id, title, content, votes, function (err){
		if(err){
			throw err;
		}else {
			res.redirect("/forums/"+id);
		}
	});
});

app.get("/forums/:category", function (req, res){
	var id = req.params.category;
	db.get("SELECT * FROM categories WHERE id=?", id, function (err, category){
		if(err){
			throw err;
		}else {
			db.all("SELECT * FROM categories INNER JOIN threads ON threads.cat_id = categories.id", function (err, threads) {
				db.all("SELECT * FROM replies", function (err, replies) {
					res.render("categories.ejs", {category: category, threads: threads, replies: replies})
				})
			})
		}
	});
});

app.get("/forums/threads/:id", function (req, res){
	var id = req.params.id;
	db.get("SELECT * FROM threads WHERE id=?", id, function (err, thread){
		if(err){
			throw err;
		}else {
			db.all("SELECT * FROM replies WHERE thread_id=?", id, function (err, reply){
				db.all("SELECT * FROM nested", function (err, nest) {
					if (err){
						throw err;
					}else {
						res.render("thread.ejs", {thread: thread, reply: reply, nest: nest});
					}
				});
			});
		}
	});
});

app.post("/forums/threads/:id", function (req, res){
	var id = req.params.id;
	var reply = req.body.reply;
	var location = req.body.location;
	var key = process.env.key;
	request("http://dev.virtualearth.net/REST/v1/Locations/"+location+"?o=&key="+key, function (error, response, body) {
		body = JSON.parse(body);
		if (body.resourceSets[0].resources.length > 0) {
			var locality = body.resourceSets[0].resources[0].address.adminDistrict
		}else{
			var locality = "NY";
		}
	var locality = "NY";
			db.run("INSERT INTO replies (thread_id, content, locality) VALUES (?,?,?)", id, reply, locality, function (err) {
			if(err){
				throw err;
			}
			res.redirect("/forums/threads/"+id);
		});
	});
});

app.put("/forums/threads/:id", function (req, res){
	var id = req.params.id;
	db.get("SELECT * FROM threads WHERE id=?", id, function (err, thread){
		if(err){
			throw err;
		}else {
			var votes = thread.votes+1;
			db.run("UPDATE threads SET votes=? WHERE id=?", votes, id, function (err) {
				res.redirect("/forums/threads/"+id)
			});
		}
	});
});

app.get("/forums/threads/nested/:id", function (req, res) {
	var id = req.params.id;
	db.get("SELECT * FROM replies WHERE id=?", id, function (err, nested){
		if(err){
			throw err;
		}else {
			res.render("nested.ejs", {nested: nested});
		}
	});
});

app.post("/forums/threads/nested/:id", function (req, res) {
	var id = req.params.id;
	var threadId = req.body.thread_id;
	var content = req.body.content;
	db.run("INSERT INTO nested (replies_id, content) VALUES (?,?)", id, content, function (err) {
			if(err){
				throw err;
			}
				res.redirect("/forums/threads/"+threadId);
	});
});


app.listen(process.env.PORT || 5000, function(){
	console.log('listening on port 3000!');
});
