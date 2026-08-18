import Parser from 'rss-parser'
import * as cheerio from 'cheerio'
import { db } from '@/db/db'
import { content } from '@/db/schema/content'
import { chunks } from '@/db/schema/chunks'
import { batchExec } from './utils/batchExec'
import z from 'zod'
import { FatalError } from 'workflow'
import { chunkArticles } from '@/lib/chunking/chunkArticles'

const RSS_URL = 'https://www.tothenew.com/blog/feed/'
const feedItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.url(),
  pubDate: z.coerce.date()
})

export async function ingestBlogArticlesWorkflow() {
  'use workflow'

  const newArticles = await getNewArticlesFromRssFeed()
  return await batchExec(newArticles, ingestArticleStep)
}

function ingestArticleStep(batch: unknown): Promise<void> {
  throw new Error('Function not implemented.')
}

function getNewArticlesFromRssFeed() {}
