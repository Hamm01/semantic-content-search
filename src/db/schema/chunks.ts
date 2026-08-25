import {
  index,
  integer,
  text,
  uuid,
  vector,
  snakeCase
} from 'drizzle-orm/pg-core'
import { id, timestamps } from '../utils'
import { content } from './content'

export const chunks = snakeCase.table(
  'chunks',
  {
    id,
    contentId: uuid()
      .notNull()
      .references(() => content.id, { onDelete: 'cascade' }),
    startPosition: integer(),
    // TODO: Its will change to not null when we implement the embedding
    embedding: vector({ dimensions: 1024 }).notNull(),
    text: text().notNull(),
    ...timestamps
  },
  table => [index('chunks_contentId_idx').on(table.contentId)]
)
