import type { Context } from 'https://edge.netlify.com'

export default async (request: Request, context: Context) => {
  return context.rewrite('https://netease-cloud-music-api-yang1206.vercel.app/')
}
