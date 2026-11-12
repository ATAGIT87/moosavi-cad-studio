import { ArrowUpRight, FileUp, LoaderCircle, Mail, MapPin, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const allowedExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'dwg', 'dxf', 'step', 'stp']

export function Contact() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (file && (file.size > MAX_FILE_SIZE || !allowedExtensions.includes(file.name.split('.').pop()?.toLowerCase() ?? ''))) {
      setStatus('error')
      setMessage('Bitte wählen Sie eine unterstützte Datei mit maximal 5 MB.')
      return
    }
    setStatus('sending')
    setMessage('')
    try {
      const response = await fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      const result: { error?: string } = await response.json()
      if (!response.ok) throw new Error(result.error || 'Ihre Nachricht konnte nicht gesendet werden.')
      form.reset()
      setFile(null)
      setStatus('success')
      setMessage('Vielen Dank! Ihre Nachricht wurde versendet.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.')
    }
  }

  return (
    <section className="contact" id="kontakt">
      <div className="container-wide">
        <div className="contact-intro"><p className="eyebrow"><span /> GEMEINSAM STARTEN</p><h2>Ihre Idee.<br /><em>Der nächste Schritt.</em></h2><p>Sie haben ein Projekt im Kopf? Erzählen Sie mir davon. Ich freue mich auf Ihre Nachricht.</p></div>
        <div className="contact-grid">
          <div className="contact-details">
            <span className="contact-label">KONTAKT</span>
            <a href="mailto:al.tabatabaei@yahoo.com"><Mail size={18} /><span><small>E-MAIL</small>al.tabatabaei@yahoo.com</span><ArrowUpRight size={16} /></a>
            <div className="contact-location"><MapPin size={18} /><span><small>STANDORT</small>Deutschland</span></div>
            <div className="contact-side-note"><span>✳</span><p>Jedes gute Projekt beginnt<br />mit einem Gespräch.</p></div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row"><label>Ihr Name <span>*</span><input name="name" required maxLength={120} placeholder="Vor- und Nachname" autoComplete="name" /></label><label>E-Mail-Adresse <span>*</span><input name="email" type="email" required maxLength={254} placeholder="ihre@email.de" autoComplete="email" /></label></div>
            <label>Worum geht es? <span>*</span><select name="service" required defaultValue=""><option value="" disabled>Bitte wählen Sie eine Leistung</option><option>2D CAD Zeichnungen</option><option>3D CAD Modellierung</option><option>Technische Zeichnungen</option><option>Digitalisierung von Skizzen</option><option>Umwandlung von 2D in 3D</option><option>Individuelle CAD-Dienstleistungen</option><option>Sonstiges</option></select></label>
            <label>Ihre Nachricht <span>*</span><textarea name="message" required maxLength={5000} rows={4} placeholder="Erzählen Sie mir ein wenig über Ihr Projekt ..." /></label>
            <div className="upload-wrap"><label className="upload-label"><FileUp size={19} /><span><strong>{file ? file.name : 'Datei hinzufügen'}</strong><small>PDF, JPG, PNG, DWG, DXF, STEP · max. 5 MB</small></span><input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf,.step,.stp" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label>{file && <button className="remove-file" type="button" aria-label="Datei entfernen" onClick={() => { const input = document.querySelector<HTMLInputElement>('input[name="attachment"]'); if (input) input.value = ''; setFile(null) }}><X size={17} /></button>}</div>
            <label className="consent"><input type="checkbox" name="consent" required /><span>Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. <b>*</b></span></label>
            <div className="form-footer"><button className="button button-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Wird gesendet <LoaderCircle className="spinner" size={17} /></> : <>Anfrage senden <ArrowUpRight size={17} /></>}</button><span>* Pflichtfelder</span></div>
            {message && <p className={`form-message ${status}`} role="status">{message}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
