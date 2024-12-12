CREATE DATABASE movies;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  overview TEXT,
  titleEmbedding vector(384), 
  taglineEmbedding vector(384), 
  overviewEmbedding vector(384)
);