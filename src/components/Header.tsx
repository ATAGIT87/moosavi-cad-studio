import { Box, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  ['Home', '/'],
  ['Über uns', '/uber-uns'],
  ['Portfolioseite', '/portfolio'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  return (
    <header className="site-header">
      <div className="container-wide header-inner">
        <a className="brand" href="/" aria-label="Moosavi CAD Studio – zur Startseite" onClick={() => setOpen(false)}>
          <Box className="brand-icon" size={40} strokeWidth={1} aria-hidden="true" />
          <span className="brand-name">Moosavi <strong>CAD</strong><small>Studio</small></span>
        </a>
        <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Hauptnavigation">
          {links.map(([label, href]) => <a key={href} href={href} aria-current={currentPath === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <button className="menu-toggle" type="button" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  )
}
