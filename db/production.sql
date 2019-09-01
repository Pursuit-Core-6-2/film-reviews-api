DROP DATABASE IF EXISTS production;
CREATE DATABASE production;

\c production;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL, 
  password_digest VARCHAR,
  points INT
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id),
  text VARCHAR NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  value INT NOT NULL
);

CREATE TABLE journal_entries (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id),
  text VARCHAR NOT NULL,
  ts TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR (25)
);

CREATE TABLE je_tags (
  id SERIAL PRIMARY KEY,
  je_id INT REFERENCES journal_entries(id),
  tag_id INT REFERENCES tags(id)
);
