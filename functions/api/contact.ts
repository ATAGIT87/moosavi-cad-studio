interface Env {
  RESEND_API_KEY?: string
  RESEND_FROM_EMAIL?: string
}

interface Context {
  request: Request
  env: Env
}

const recipient = 'al.tabatabaei@yahoo.com'
const maxFileSize = 5 * 1024 * 1024
const extensions = new Set(['pdf', 'png', 'jpg', 'jpeg', 'dwg', 'dxf', 'step', 'stp'])
const services = new Set([
  '2D CAD Zeichnungen',
  '3D CAD Modellierung',
  'Technische Zeichnungen',
  'Digitalisierung von Skizzen',
  'Umwandlung von 2D in 3D',
  'Individuelle CAD-Dienstleistungen',
  'Sonstiges',
])

function json(body: object, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

function readText(form: FormData, key: string, maxLength: number): string | null {
  const value = form.get(key)
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed && trimmed.length <= maxLength ? trimmed : null
}

function toBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000))
  }
  return btoa(binary)
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    console.error('Contact form is missing email provider configuration.')
    return json({ error: 'Das Kontaktformular ist derzeit nicht eingerichtet. Bitte schreiben Sie direkt an al.tabatabaei@yahoo.com.' }, 503)
  }

  const contentLength = Number(request.headers.get('content-length'))
  if (contentLength > maxFileSize + 128 * 1024) {
    return json({ error: 'Die Datei darf maximal 5 MB groß sein.' }, 413)
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return json({ error: 'Die Formulardaten konnten nicht gelesen werden.' }, 400)
  }

  const name = readText(form, 'name', 120)
  const email = readText(form, 'email', 254)
  const service = readText(form, 'service', 100)
  const message = readText(form, 'message', 5000)
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !service || !services.has(service) || !message || form.get('consent') !== 'on') {
    return json({ error: 'Bitte überprüfen Sie Ihre Angaben und füllen Sie alle Pflichtfelder aus.' }, 400)
  }

  const upload = form.get('attachment')
  const attachments: { filename: string; content: string }[] = []
  if (upload instanceof File && upload.name) {
    const extension = upload.name.split('.').pop()?.toLowerCase() ?? ''
    if (!extensions.has(extension) || upload.size === 0 || upload.size > maxFileSize) {
      return json({ error: 'Bitte wählen Sie eine unterstützte Datei mit maximal 5 MB.' }, 400)
    }
    const filename = upload.name.replace(/[^\w.\-]/g, '_').slice(-150)
    attachments.push({ filename, content: toBase64(new Uint8Array(await upload.arrayBuffer())) })
  } else if (upload !== null && !(upload instanceof File)) {
    return json({ error: 'Die Datei konnte nicht gelesen werden.' }, 400)
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [recipient],
        reply_to: email,
        subject: 'Neue Projektanfrage – Moosavi CAD Studio',
        text: `Name: ${name}\nE-Mail: ${email}\nLeistung: ${service}\n\nNachricht:\n${message}`,
        ...(attachments.length ? { attachments } : {}),
      }),
    })
    if (!response.ok) {
      console.error(`Contact email provider returned HTTP ${response.status}.`)
      return json({ error: 'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an al.tabatabaei@yahoo.com.' }, 502)
    }
    return json({ success: true }, 200)
  } catch (error) {
    console.error('Contact email delivery failed:', error)
    return json({ error: 'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an al.tabatabaei@yahoo.com.' }, 502)
  }
}
