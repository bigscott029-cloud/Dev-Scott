import { coreSkills, experience, marketingSkills, specializations } from '../data/portfolio'
import { siteConfig } from '../config/site'

/** Builds ATS-friendly resume HTML for PDF export. */
function buildResumeHtml(): string {
  const skillGroups = coreSkills
    .map(
      (g) =>
        `<div style="margin-bottom:12px"><strong>${g.category}:</strong> ${g.skills.map((s) => s.name).join(', ')}</div>`,
    )
    .join('')

  return `
    <div id="resume-pdf" style="font-family:Arial,Helvetica,sans-serif;color:#111;padding:40px;max-width:800px;line-height:1.5">
      <h1 style="font-size:28px;margin:0 0 4px;color:#111">Software Engineer</h1>
      <p style="margin:0 0 16px;color:#444;font-size:14px">${siteConfig.email} | ${siteConfig.github.replace('https://', '')}</p>

      <h2 style="font-size:16px;border-bottom:2px solid #3B82F6;padding-bottom:4px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px">Professional Summary</h2>
      <p style="margin:0;font-size:13px;color:#333">
        Software developer experienced in building full-stack web applications, Python automation systems,
        Telegram bots, and cross-platform mobile applications. Passionate about solving business problems
        through scalable software, automation, and product thinking.
      </p>

      <h2 style="font-size:16px;border-bottom:2px solid #3B82F6;padding-bottom:4px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px">Core Skills</h2>
      <div style="font-size:13px;color:#333">${skillGroups}</div>

      <h2 style="font-size:16px;border-bottom:2px solid #3B82F6;padding-bottom:4px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px">Specializations</h2>
      <p style="margin:0;font-size:13px;color:#333">${specializations.join(' • ')}</p>

      <h2 style="font-size:16px;border-bottom:2px solid #3B82F6;padding-bottom:4px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px">Experience</h2>
      <div style="margin-bottom:8px">
        <strong style="font-size:14px">${experience.role}</strong>
        <span style="float:right;font-size:13px;color:#666">${experience.period}</span>
      </div>
      <ul style="margin:8px 0 0;padding-left:20px;font-size:13px;color:#333">
        ${experience.responsibilities.map((r) => `<li style="margin-bottom:4px">${r}</li>`).join('')}
      </ul>

      <h2 style="font-size:16px;border-bottom:2px solid #3B82F6;padding-bottom:4px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px">Digital Growth & Marketing</h2>
      <ul style="margin:0;padding-left:20px;font-size:13px;color:#333">
        ${marketingSkills.map((s) => `<li style="margin-bottom:4px">${s}</li>`).join('')}
      </ul>
    </div>
  `
}

/** Generates and downloads an ATS-friendly PDF resume. */
export async function downloadResumePdf(): Promise<void> {
  const [{ default: html2pdf }] = await Promise.all([import('html2pdf.js')])

  const container = document.createElement('div')
  container.innerHTML = buildResumeHtml()
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  document.body.appendChild(container)

  const element = container.querySelector('#resume-pdf') as HTMLElement

  try {
    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: 'Software_Engineer_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save()
  } finally {
    document.body.removeChild(container)
  }
}
