CREATE TABLE IF NOT EXISTS users (
  id          BIGSERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  handle      TEXT,
  bio         TEXT DEFAULT '',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS posts (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  caption    TEXT DEFAULT '',
  category   TEXT,
  image_url  TEXT NOT NULL,
  ratio      TEXT DEFAULT '1/1',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS likes (
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);
CREATE TABLE IF NOT EXISTS comments (
  id         BIGSERIAL PRIMARY KEY,
  post_id    BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS follows (
  follower_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  followed_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (follower_id, followed_id)
);
-- À venir : commissions, discussions/messages, notifications, tutoriels
