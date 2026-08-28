import { ingestBlogArticlesWorkflow } from '@/workflows/ingestBlogArticles'
import { verifyAndRunCron } from '@/workflows/utils/VerifyandRunCron'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return await verifyAndRunCron(request, ingestBlogArticlesWorkflow)
}
