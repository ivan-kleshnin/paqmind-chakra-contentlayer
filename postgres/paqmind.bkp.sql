--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: paqmind
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO paqmind;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: gen_hasura_uuid(); Type: FUNCTION; Schema: hdb_catalog; Owner: paqmind
--

CREATE FUNCTION hdb_catalog.gen_hasura_uuid() RETURNS uuid
    LANGUAGE sql
    AS $$select gen_random_uuid()$$;


ALTER FUNCTION hdb_catalog.gen_hasura_uuid() OWNER TO paqmind;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hdb_action_log; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_action_log (
    id uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);


ALTER TABLE hdb_catalog.hdb_action_log OWNER TO paqmind;

--
-- Name: hdb_cron_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_cron_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_cron_event_invocation_logs OWNER TO paqmind;

--
-- Name: hdb_cron_events; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_cron_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    trigger_name text NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_cron_events OWNER TO paqmind;

--
-- Name: hdb_metadata; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_metadata (
    id integer NOT NULL,
    metadata json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL
);


ALTER TABLE hdb_catalog.hdb_metadata OWNER TO paqmind;

--
-- Name: hdb_scheduled_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_scheduled_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_scheduled_event_invocation_logs OWNER TO paqmind;

--
-- Name: hdb_scheduled_events; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_scheduled_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    webhook_conf json NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    retry_conf json,
    payload json,
    header_conf json,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    comment text,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_scheduled_events OWNER TO paqmind;

--
-- Name: hdb_schema_notifications; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_schema_notifications (
    id integer NOT NULL,
    notification json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL,
    instance_id uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hdb_schema_notifications_id_check CHECK ((id = 1))
);


ALTER TABLE hdb_catalog.hdb_schema_notifications OWNER TO paqmind;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: paqmind
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO paqmind;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: paqmind
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    refresh_token_expires_in BIGINT,
    access_token text,
    expires_at BIGINT,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public.accounts OWNER TO paqmind;

--
-- Name: users; Type: TABLE; Schema: public; Owner: paqmind
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    role text DEFAULT 'student'::text NOT NULL,
    "lastSeen" timestamp with time zone
);


ALTER TABLE public.users OWNER TO paqmind;

--
-- Name: onlineUsers; Type: VIEW; Schema: public; Owner: paqmind
--

CREATE VIEW public."onlineUsers" AS
 SELECT users.id,
    users."lastSeen"
   FROM public.users
  WHERE (users."lastSeen" >= (now() - '00:00:30'::interval));


ALTER TABLE public."onlineUsers" OWNER TO paqmind;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: paqmind
--

CREATE TABLE public.posts (
    id text NOT NULL,
    title text NOT NULL,
    content text,
    published boolean DEFAULT false NOT NULL,
    "authorId" text NOT NULL
);


ALTER TABLE public.posts OWNER TO paqmind;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: paqmind
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO paqmind;

--
-- Name: todos; Type: TABLE; Schema: public; Owner: paqmind
--

CREATE TABLE public.todos (
    id text DEFAULT public.uuid_generate_v4() NOT NULL,
    "authorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    "isPublic" boolean DEFAULT false NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.todos OWNER TO paqmind;

--
-- Name: verificationTokens; Type: TABLE; Schema: public; Owner: paqmind
--

CREATE TABLE public."verificationTokens" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."verificationTokens" OWNER TO paqmind;

--
-- Data for Name: hdb_action_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_action_log (id, action_name, input_payload, request_headers, session_variables, response_payload, errors, created_at, response_received_at, status) FROM stdin;
\.


--
-- Data for Name: hdb_cron_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_cron_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_cron_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_cron_events (id, trigger_name, scheduled_time, status, tries, created_at, next_retry_at) FROM stdin;
\.


--
-- Data for Name: hdb_metadata; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_metadata (id, metadata, resource_version) FROM stdin;
1	{"sources":[{"configuration":{"connection_info":{"database_url":{"from_env":"PG_DATABASE_URL"},"isolation_level":"read-committed","use_prepared_statements":false}},"kind":"postgres","name":"paqmin","tables":[{"object_relationships":[{"name":"user","using":{"foreign_key_constraint_on":"userId"}}],"table":{"name":"accounts","schema":"public"}},{"object_relationships":[{"name":"user","using":{"manual_configuration":{"column_mapping":{"id":"id"},"insertion_order":null,"remote_table":{"name":"users","schema":"public"}}}}],"table":{"name":"onlineUsers","schema":"public"}},{"object_relationships":[{"name":"user","using":{"foreign_key_constraint_on":"authorId"}}],"table":{"name":"posts","schema":"public"}},{"object_relationships":[{"name":"user","using":{"foreign_key_constraint_on":"userId"}}],"table":{"name":"sessions","schema":"public"}},{"object_relationships":[{"name":"author","using":{"manual_configuration":{"column_mapping":{"authorId":"id"},"insertion_order":null,"remote_table":{"name":"users","schema":"public"}}}}],"table":{"name":"todos","schema":"public"}},{"array_relationships":[{"name":"accounts","using":{"foreign_key_constraint_on":{"column":"userId","table":{"name":"accounts","schema":"public"}}}},{"name":"posts","using":{"foreign_key_constraint_on":{"column":"authorId","table":{"name":"posts","schema":"public"}}}},{"name":"sessions","using":{"foreign_key_constraint_on":{"column":"userId","table":{"name":"sessions","schema":"public"}}}},{"name":"todos","using":{"foreign_key_constraint_on":{"column":"authorId","table":{"name":"todos","schema":"public"}}}}],"table":{"name":"users","schema":"public"}},{"table":{"name":"verificationTokens","schema":"public"}}]}],"version":3}	33
\.


--
-- Data for Name: hdb_scheduled_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_scheduled_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_scheduled_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_scheduled_events (id, webhook_conf, scheduled_time, retry_conf, payload, header_conf, status, tries, created_at, next_retry_at, comment) FROM stdin;
\.


--
-- Data for Name: hdb_schema_notifications; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_schema_notifications (id, notification, resource_version, instance_id, updated_at) FROM stdin;
1	{"metadata":false,"remote_schemas":[],"sources":[]}	33	07e5bc63-5491-4b2c-8d04-09af5ff13d6d	2022-08-04 17:13:09.657551+00
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: paqmind
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) FROM stdin;
6c39e484-d442-4ea5-8758-6e7dd876c306	47	2022-08-04 14:39:09.849937+00	{"settings": {"migration_mode": "true"}, "isStateCopyCompleted": true}	{"console_notifications": {"admin": {"date": "2022-08-05T06:34:47.887Z", "read": "default", "showBadge": false}}, "telemetryNotificationShown": true}
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: paqmind
--

COPY public.accounts (id, "userId", type, provider, "providerAccountId", refresh_token, refresh_token_expires_in, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
d656c0dd-a5b9-4cc9-a464-2680c7305ff4	a9226a16-3e83-4c46-aadf-ead15ad77778	oauth	github	2128182	ghr_rVLfIdXV2Pe7AxOJobKvX2o8lCRku4YUJEkif86OTIbnYuFqlheoF2AV4S7WhTCeT7govY09zN4F	15897600	ghu_fIvdTbQFmCAhWo2MwtIvWh1dgqQhXH3OeDFu	1659706245	bearer		\N	\N
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: paqmind
--

COPY public.posts (id, title, content, published, "authorId") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: paqmind
--

COPY public.sessions (id, "sessionToken", "userId", expires) FROM stdin;
9f8444e2-617a-4a94-9a20-fbbf5e6415e8	8351801b-5106-4042-a1c7-2baea22f4628	a9226a16-3e83-4c46-aadf-ead15ad77778	2022-09-04 05:30:46.136
\.


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: paqmind
--

COPY public.todos (id, "authorId", "createdAt", "isCompleted", "isPublic", title) FROM stdin;
123ac673-f88a-4b0c-a48a-964b5780c8ae	a9226a16-3e83-4c46-aadf-ead15ad77778	2022-08-05 06:14:48.154	f	f	My First Todo
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: paqmind
--

COPY public.users (id, name, email, "emailVerified", image, role, "lastSeen") FROM stdin;
a9226a16-3e83-4c46-aadf-ead15ad77778	Ivan Kleshnin	ivan@paqmind.com	\N	https://avatars.githubusercontent.com/u/2128182?v=4	student	\N
\.


--
-- Data for Name: verificationTokens; Type: TABLE DATA; Schema: public; Owner: paqmind
--

COPY public."verificationTokens" (identifier, token, expires) FROM stdin;
\.


--
-- Name: hdb_action_log hdb_action_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_action_log
    ADD CONSTRAINT hdb_action_log_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_events hdb_cron_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_events
    ADD CONSTRAINT hdb_cron_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_resource_version_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_resource_version_key UNIQUE (resource_version);


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_scheduled_events hdb_scheduled_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_events
    ADD CONSTRAINT hdb_scheduled_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_schema_notifications hdb_schema_notifications_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_schema_notifications
    ADD CONSTRAINT hdb_schema_notifications_pkey PRIMARY KEY (id);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verificationTokens verificationTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public."verificationTokens"
    ADD CONSTRAINT "verificationTokens_pkey" PRIMARY KEY (identifier, token);


--
-- Name: hdb_cron_event_invocation_event_id; Type: INDEX; Schema: hdb_catalog; Owner: paqmind
--

CREATE INDEX hdb_cron_event_invocation_event_id ON hdb_catalog.hdb_cron_event_invocation_logs USING btree (event_id);


--
-- Name: hdb_cron_event_status; Type: INDEX; Schema: hdb_catalog; Owner: paqmind
--

CREATE INDEX hdb_cron_event_status ON hdb_catalog.hdb_cron_events USING btree (status);


--
-- Name: hdb_cron_events_unique_scheduled; Type: INDEX; Schema: hdb_catalog; Owner: paqmind
--

CREATE UNIQUE INDEX hdb_cron_events_unique_scheduled ON hdb_catalog.hdb_cron_events USING btree (trigger_name, scheduled_time) WHERE (status = 'scheduled'::text);


--
-- Name: hdb_scheduled_event_status; Type: INDEX; Schema: hdb_catalog; Owner: paqmind
--

CREATE INDEX hdb_scheduled_event_status ON hdb_catalog.hdb_scheduled_events USING btree (status);


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: paqmind
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: accounts_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: paqmind
--

CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON public.accounts USING btree (provider, "providerAccountId");


--
-- Name: sessions_sessionToken_key; Type: INDEX; Schema: public; Owner: paqmind
--

CREATE UNIQUE INDEX "sessions_sessionToken_key" ON public.sessions USING btree ("sessionToken");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: paqmind
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_cron_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: paqmind
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_scheduled_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: accounts accounts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: posts posts_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: todos todos_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paqmind
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT "todos_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

