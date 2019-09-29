DROP DATABASE IF EXISTS films_reviews_api_db;
CREATE DATABASE films_reviews_api_db;

\c films_reviews_api_db;

-- DROP TABLE IF EXISTS reviews CASCADE; 
-- DROP TABLE IF EXISTS apps CASCADE; 

CREATE TABLE apps (
  id VARCHAR PRIMARY KEY,
  owner_email VARCHAR UNIQUE NOT NULL,
  owner_name VARCHAR NOT NULL,
  app_name VARCHAR NOT NULL
);

CREATE TABLE reviews (
  id VARCHAR PRIMARY KEY,
  app_id VARCHAR REFERENCES apps(id),
  film_id VARCHAR NOT NULL,
  reviewer_username VARCHAR NOT NULL,
  text VARCHAR NOT NULL
);
