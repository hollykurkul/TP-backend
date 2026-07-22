DROP TABLE IF EXISTS story_choices;
DROP TABLE IF EXISTS story_nodes;
DROP TABLE IF EXISTS user_inventory;
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
  animal_type text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL
);

CREATE TABLE locations (
  id serial PRIMARY KEY,
  name text NOT NULL,
  hub text NOT NULL,
  rest text NOT NULL,
  combat text NOT NULL
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
  description text NOT NULL,
  image_url text NOT NULL,
  location_id integer NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE healing_items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  healing_amount integer NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  location_id integer NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE user_inventory (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weapon_id integer REFERENCES weapons(id) ON DELETE CASCADE,
  healing_item_id integer REFERENCES healing_items(id) ON DELETE CASCADE,

  -- exactly one of the two item references must be set
  CONSTRAINT one_item_type CHECK (
    (weapon_id IS NOT NULL)::int + (healing_item_id IS NOT NULL)::int = 1
  )
);

CREATE TABLE story_nodes (
  id text PRIMARY KEY,
  chapter_title text NOT NULL,
  scene_title text NOT NULL,
  body_lines text NOT NULL,
  speaker text,
  dialogue text
);

CREATE TABLE story_choices (
  id serial PRIMARY KEY,
  story_node_id text NOT NULL REFERENCES story_nodes(id) ON DELETE CASCADE,
  label text NOT NULL,
  choice_text text NOT NULL,
  next_node_id text REFERENCES story_nodes(id),
  sort_order integer NOT NULL DEFAULT 0
);
