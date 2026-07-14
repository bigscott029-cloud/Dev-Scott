import { siteConfig } from '../config/site'

/** Downloads the original resume PDF instead of generating a site-derived version. */
export async function downloadResumePdf(): Promise<void> {
  const link = document.createElement('a')
  link.href = siteConfig.resumePdf
  link.download = 'Big-Scotts-Resume.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
