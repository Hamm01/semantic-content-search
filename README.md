# RAG AI Semantic Search

> An AI-powered semantic search engine that transforms videos, blogs, and documents into an intelligent, searchable knowledge base with precise source references and timestamp-based navigation.

## Overview

RAG AI Semantic Search is a backend-focused project designed to explore modern AI retrieval architectures. It ingests content from multiple sources, processes and indexes it, generates vector embeddings, and enables semantic search over the indexed knowledge.

Instead of relying on keyword matching, the system understands the meaning behind a user's query and retrieves the most relevant content along with its original source and exact location.

The frontend is intentionally minimal and serves only as a demonstration interface. The primary focus of this project is building scalable backend services, AI retrieval pipelines, vector search infrastructure, and production-ready architecture.

---

## Features

- AI-powered semantic search
- Video transcript indexing
- Blog and document indexing
- Exact timestamp navigation for videos
- Source-aware search results
- Vector similarity search
- Hybrid metadata + semantic search
- REST APIs
- Modular backend architecture
- Production-ready development practices

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

> The frontend is intentionally lightweight and primarily serves as a user interface for interacting with the backend APIs.

---

### Backend

- Next.js Route Handlers
- Node.js
- TypeScript
- Drizzle ORM
- Zod
- REST APIs

---

### Database

#### Neon PostgreSQL

Used as the primary relational database.

Stores:

- Users
- Videos
- Blog Articles
- Metadata
- Sources
- Search History

Managed using **Drizzle ORM** for type-safe schema definitions, migrations, and queries.

---

#### TimescaleDB + pgvector

Used for semantic search and vector retrieval.

Stores:

- Embeddings
- Content Chunks
- Vector Metadata
- Similarity Indexes

Provides:

- Vector Similarity Search
- Cosine Distance Search
- Semantic Retrieval
- Timestamp-Based Retrieval

---

## AI Pipeline

```text
Video / Blog / PDF
        │
        ▼
Content Extraction
        │
        ▼
Chunking
        │
        ▼
Embedding Generation
        │
        ▼
Vector Storage (TimescaleDB)
        │
        ▼
Semantic Search
        │
        ▼
Context Retrieval
        │
        ▼
Response with Source + Timestamp
```

---

## Architecture

```text
                Client
                   │
                   ▼
             Next.js Application
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
Neon PostgreSQL         TimescaleDB + pgvector
     (Drizzle ORM)         (Vector Search)
        │                     │
        └──────────┬──────────┘
                   ▼
          Semantic Retrieval Engine
                   │
                   ▼
          Source + Timestamp Response
```

---

## Code Quality

Maintaining high code quality is a core principle of this project. Every change is validated through automated tooling and AI-assisted code reviews.

### Tooling

- **TypeScript** — Strict type safety
- **Drizzle ORM** — Type-safe database access
- **ESLint** — Static code analysis
- **Prettier** — Consistent code formatting
- **Husky** — Git hooks
- **lint-staged** — Lint staged files
- **CodeRabbit** — AI-powered pull request reviews
- **GitHub Actions** — Continuous Integration (CI)

---

## Project Goals

The objective of this repository is to understand and implement the complete lifecycle of a production-grade Retrieval-Augmented Generation (RAG) system.

Topics explored include:

- Semantic Search
- Embeddings
- Vector Databases
- pgvector
- TimescaleDB
- Neon PostgreSQL
- Drizzle ORM
- Retrieval Pipelines
- Chunking Strategies
- Search Ranking
- Hybrid Search
- Production Backend Design
- AI Infrastructure

---

## Future Roadmap

- Multi-model embedding support
- Hybrid keyword + vector search
- Re-ranking models
- Streaming responses
- OCR support
- PDF ingestion
- Audio indexing
- YouTube integration
- Documentation indexing
- Personal knowledge base
- Multi-source ingestion
- Multi-tenant architecture

---

## Repository Structure

```text
app/
components/
lib/
db/
drizzle/
services/
repositories/
embeddings/
retrieval/
vector/
types/
utils/
```

---

## Philosophy

This project is not intended to be another chatbot.

Its goal is to build a production-grade AI retrieval engine capable of indexing videos, blogs, and documents, enabling natural language search with accurate source attribution and precise timestamp navigation.

The emphasis is on backend engineering, scalable architecture, modern AI retrieval techniques, and maintainable code rather than frontend complexity.
