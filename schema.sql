PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS users;

CREATE TABLE categories (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT,
  description TEXT
);

CREATE TABLE threads (
	id INTEGER PRIMARY KEY autoincrement,
	cat_id INTEGER,
	user_id INTEGER,
	votes INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	title TEXT,
	content TEXT,
	FOREIGN KEY(cat_id) REFERENCES categories(id),
	FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE replies (
	id INTEGER PRIMARY KEY autoincrement,
	thread_id INTEGER,
	user_id INTEGER,
	content TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	locality TEXT,
	FOREIGN KEY(thread_id) REFERENCES threads(id),
	FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE users (
	id INTEGER PRIMARY KEY autoincrement,
	name TEXT,
	password TEXT,
	img TEXT
);

CREATE TABLE nested (
	id INTEGER PRIMARY KEY autoincrement,
	replies_id INTEGER,
	user_id INTEGER,
	content TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(replies_id) REFERENCES replies(id),
	FOREIGN KEY(user_id) REFERENCES users(id)
);