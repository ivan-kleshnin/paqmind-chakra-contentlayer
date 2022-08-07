CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT,
  email TEXT,
  email_verified TIMESTAMPTZ,
  image TEXT,
  role TEXT NOT NULL DEFAULT 'student',

  -- created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- last_seen TIMESTAMPTZ,

  UNIQUE (email),
  PRIMARY KEY (id)
);

CREATE TABLE accounts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
	user_id UUID NOT NULL,
	type TEXT NOT NULL,
	provider TEXT NOT NULL,
	provider_account_id TEXT NOT NULL,
	refresh_token TEXT,
	refresh_token_expires_in BIGINT,
	access_token TEXT,
	expires_at BIGINT,
	token_type TEXT,
	scope TEXT,

	-- Not passed by GithubProvider at least:
	-- id_token TEXT,
	-- session_state: TEXT

	-- created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	-- updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
		ON UPDATE restrict ON DELETE restrict,
	UNIQUE (provider, provider_account_id)
);

-- == Potential performance improvements ==
-- CREATE INDEX provider_account_id ON accounts(provider_account_id);
-- CREATE INDEX provider_id ON accounts(provider_id);

-- CREATE TABLE sessions (
-- 	id UUID DEFAULT gen_random_uuid() NOT NULL,
-- 	user_id UUID NOT NULL,
-- 	session_token TEXT NOT NULL,
-- 	expires TIMESTAMPTZ NOT NULL,

-- 	-- created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
-- 	-- updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (user_id) REFERENCES users(id)
--    ON UPDATE restrict ON DELETE restrict,
--  UNIQUE (session_token)
-- );

-- == To consider ==
-- CREATE UNIQUE INDEX session_token ON sessions(session_token);

CREATE TABLE verification_tokens (
	identifier TEXT NOT NULL,
	token TEXT NOT NULL,
	expires TIMESTAMPTZ NOT NULL,

  PRIMARY KEY (identifier, token)
);

-- CREATE TABLE todos (
--   id UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
--   authorId UUID NOT NULL,
--   title TEXT NOT NULL,
--   createdAt TIMESTAMPTZ NOT NULL DEFAULT (now()),
--   isCompleted BOOLEAN NOT NULL DEFAULT false,
--   isPublic BOOLEAN NOT NULL DEFAULT false
-- );

-- ALTER TABLE todos ADD FOREIGN KEY (authorId) REFERENCES users(id)
--   ON DELETE CASCADE ON UPDATE CASCADE;

-- CREATE VIEW online_users AS
-- SELECT users.id,
--   users.last_seen
--  FROM users
-- WHERE (users.last_seen >= (now() - '00:00:30'::interval));

