# RAG AI Semantic Search

> An AI-powered semantic search engine that transforms videos, blogs, and documents into an intelligent, searchable knowledge base with precise source references and timestamp-based navigation.

## Overview

RAG AI Semantic Search is a backend-focused project designed to explore modern AI retrieval architectures. It ingests content from multiple sources, processes and indexes it, generates vector embeddings, and enables semantic search over the indexed knowledge.

Instead of relying on keyword matching, the system understands the meaning behind a user's query and retrieves the most relevant content along with its original source and exact location.

The frontend is intentionally minimal and serves only as a demonstration interface. The primary focus of this project is building scalable backend services, data pipelines, search infrastructure, and production-ready architecture.

---

## Features

- Semantic search powered by vector embeddings
- Video transcript indexing
- Blog and document indexing
- Exact timestamp navigation for videos
- Source-aware search results
- Background processing using queues
- Hybrid metadata + vector search
- REST APIs
- Production-ready architecture
- Modular backend design

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

> The frontend exists only for interacting with the search APIs and visualizing search results.

---

### Backend

- Node.js
- TypeScript
- Next.js API Routes / Route Handlers
- REST APIs
- RabbitMQ
- Background Workers
- Cron Jobs
- Zod Validation

---

### Databases

#### Neon PostgreSQL

Used for relational application data.

Examples:

- Users
- Videos
- Blog Articles
- Metadata
- Search History
- Projects
- Sources

---

#### TimescaleDB + pgvector

Used for AI retrieval and semantic search.

Stores:

- Embeddings
- Content chunks
- Metadata
- Similarity indexes
- Vector search indexes

Provides:

- Semantic retrieval
- Cosine similarity search
- Hybrid search
- Timestamp retrieval

---

## AI Pipeline

```
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
LLM Context Generation
        │
        ▼
Response with Source + Timestamp
```

---

## Architecture

```
Client

      │

      ▼

Next.js API

      │

      ├───────────────► Neon PostgreSQL

      │

      ├───────────────► RabbitMQ

      │                     │

      │                     ▼

      │              Background Workers

      │                     │

      ▼                     ▼

TimescaleDB (pgvector)

      │

      ▼

Semantic Retrieval Engine

      │

      ▼

Response Builder
```

---

## Code Quality

Maintaining high code quality is a core principle of this project. Every change is validated through automated tooling and AI-assisted code reviews before being merged.

### Tooling

- **TypeScript** — Strict type safety
- **ESLint** — Static code analysis
- **Prettier** — Consistent code formatting
- **Husky** — Git hooks for pre-commit checks
- **lint-staged** — Lint only staged files
- **CodeRabbit** — AI-powered pull request reviews
- **GitHub Actions** — Continuous Integration (CI)

---

## Project Goals

The objective of this repository is to understand and implement the complete lifecycle of a modern Retrieval-Augmented Generation (RAG) system.

Topics explored include:

- Semantic Search
- Embeddings
- Vector Databases
- Retrieval Pipelines
- Chunking Strategies
- Background Processing
- Event-Driven Architecture
- Queue Systems
- Search Ranking
- Hybrid Search
- Production Backend Design
- AI Infrastructure

---

## Future Roadmap

- Multi-model embedding support
- Re-ranking models
- Hybrid search
- Streaming responses
- OCR support
- PDF ingestion
- Audio indexing
- YouTube integration
- Notion integration
- GitHub repository indexing
- Documentation indexing
- Personal knowledge base
- Multi-tenant architecture

---

## Repository Structure

```
app/
components/
lib/
server/
workers/
queues/
services/
repositories/
embeddings/
retrieval/
vector/
database/
types/
utils/
```

---

## Philosophy

This project is not intended to be another chatbot.

Its goal is to build a production-grade AI retrieval engine capable of indexing large volumes of knowledge and returning highly relevant answers with complete source attribution and precise timestamp navigation.

The emphasis is on scalable backend architecture, maintainable code, and real-world engineering practices rather than frontend complexity.
