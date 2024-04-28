import multimatch from 'multimatch'
import type { Page } from '../'

/**
 * Filter route by a list of glob patterns.
 * @param pages - List of pages.
 * @param routePatterns - List of glob patterns.
 * @returns - List of pages that match the glob patterns.
 */
export function filterRoute(pages: Page[], routePatterns: string[]) {
  const pagePaths = multimatch(pages.map(({ path }) => path), routePatterns)
  return pages.filter(({ path }) => pagePaths.includes(path))
}
