--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: responsavel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.responsavel (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: responsavel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.responsavel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: responsavel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.responsavel_id_seq OWNED BY public.responsavel.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "responsavelId" integer NOT NULL,
    token text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: tarefa; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tarefa (
    id integer NOT NULL,
    "responsavelId" integer NOT NULL,
    name text NOT NULL,
    descricao text NOT NULL,
    dia timestamp without time zone DEFAULT now() NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: tarefa_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tarefa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tarefa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tarefa_id_seq OWNED BY public.tarefa.id;


--
-- Name: responsavel id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.responsavel ALTER COLUMN id SET DEFAULT nextval('public.responsavel_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: tarefa id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tarefa ALTER COLUMN id SET DEFAULT nextval('public.tarefa_id_seq'::regclass);


--
-- Data for Name: responsavel; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.responsavel VALUES (1, 'Ruytter', 'ruytter@gmail.com', '$2b$10$WyLIPlU.rei5ZzIGlLmtZONyj2XyBivL5cHQWhi6VNxhvfapTgfSy', '2023-01-23 11:30:16.865449');
INSERT INTO public.responsavel VALUES (2, 'josé', 'jose@gmail.com', '$2b$10$nsmJ/O9SnuQ822HF8P0nM.XzmLpLF37DpbCCGiVCxpvEOVLqr3ypu', '2023-01-23 11:32:59.765715');
INSERT INTO public.responsavel VALUES (3, 'Robson', 'robson@gmail.com', '$2b$10$rYy3YrM/4jbr9JtfsLXgLe/BNbNHcmSMfaNPojMXE7uNGg1lvNnaC', '2023-01-23 11:33:59.725845');
INSERT INTO public.responsavel VALUES (4, 'Pedro', 'pedro@gmail.com', '$2b$10$V7AGQna7sYTlhno3F42wA.q0IUYYTY3jOq4/DwyE15VvOHBufDjE.', '2023-01-23 14:53:23.974698');
INSERT INTO public.responsavel VALUES (5, 'joana', 'joana@gmail.com', '$2b$10$fDCb2cWo1bEvDQs3Vrwpwe5PYH7Vy3ussLiRThkKLIviZTej6LRre', '2023-01-27 19:07:33.075');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (2, 2, 'da836ffd-a8ab-4e08-9b70-5eb8cb8e70ad', true, '2023-01-28 15:57:28.699');
INSERT INTO public.sessions VALUES (1, 5, '3a04cfb3-bcd4-4562-aa87-645d878f5273', true, '2023-01-27 19:30:04.725');
INSERT INTO public.sessions VALUES (3, 4, '2ce82fdd-e73a-45c7-8a1d-1e5a759ee1c8', true, '2023-01-28 17:28:51.178');


--
-- Data for Name: tarefa; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.tarefa VALUES (3, 5, 'Codar', 'fazer projetão e poc', '2023-01-28 17:21:12.345', 'em execução', '2023-01-28 15:54:33.31');


--
-- Name: responsavel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.responsavel_id_seq', 5, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: tarefa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tarefa_id_seq', 3, true);


--
-- Name: responsavel responsavel_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.responsavel
    ADD CONSTRAINT responsavel_email_key UNIQUE (email);


--
-- Name: responsavel responsavel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.responsavel
    ADD CONSTRAINT responsavel_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_responsavelId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_responsavelId_key" UNIQUE ("responsavelId");


--
-- Name: tarefa tarefa_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tarefa
    ADD CONSTRAINT tarefa_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_responsavelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES public.responsavel(id);


--
-- Name: tarefa tarefa_responsavelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tarefa
    ADD CONSTRAINT "tarefa_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES public.responsavel(id);


--
-- PostgreSQL database dump complete
--

