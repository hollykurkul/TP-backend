DROP TABLE IF EXISTS character_items;
DROP TABLE IF EXISTS character_weapons;
DROP TABLE IF EXISTS healing_items;
DROP TABLE IF EXISTS weapons;
DROP TABLE IF EXISTS bosses;
DROP TABLE IF EXISTS enemies;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE characters (
  id serial PRIMARY KEY,
  name text NOT NULL,
  animal_type text NOT NULL
);

CREATE TABLE locations (
  id serial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE enemies (
  id serial PRIMARY KEY,
  name text NOT NULL,
  hp integer NOT NULL,
  location_id integer NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE bosses (
  id serial PRIMARY KEY,
  name text NOT NULL,
  hp integer NOT NULL, 
  location_id integer NOT NULL REFERENCES locations(id) ON DELETE CASCADE  
);

CREATE TABLE weapons (
  id serial PRIMARY KEY,
  name text NOT NULL,
  damage integer NOT NULL, 
  location_id integer NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE healing_items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  healing_amount integer NOT NULL,
  location_id integer NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE character_weapons (
  character_id integer NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  weapon_id integer NOT NULL REFERENCES weapons(id) ON DELETE CASCADE,
  PRIMARY KEY (character_id, weapon_id)
);

CREATE TABLE character_items (
  character_id integer NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  item_id integer NOT NULL REFERENCES healing_items(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  PRIMARY KEY (character_id, item_id)
);

