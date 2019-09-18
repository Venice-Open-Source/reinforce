CREATE TABLE IF NOT EXISTS users (
  user_id serial PRIMARY KEY,
  email VARCHAR (250) UNIQUE NOT NULL,
  password VARCHAR (250) NOT NULL
);

CREATE TABLE IF NOT EXISTS cardsets (
  cardset_id serial PRIMARY KEY,
  label VARCHAR (50) NOT NULL,
  description VARCHAR (500),
  user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS cards (
  card_id serial PRIMARY KEY,
  question VARCHAR (500) NOT NULL,
  answer VARCHAR (500) NOT NULL,
  cardset_id INTEGER REFERENCES cardsets(cardset_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  email VARCHAR (250) NOT NULL REFERENCES users(email), 
  ssid VARCHAR (250) NOT NULL
);