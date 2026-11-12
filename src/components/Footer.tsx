export function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-main"><a className="footer-brand" href="/">MOOSAVI<span>.</span><small>CAD STUDIO</small></a><p>Präzision, die Ideen<br />Form gibt.</p><a href="#top" className="back-top">ZURÜCK NACH OBEN ↑</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} MOOSAVI CAD STUDIO</span><span>MINA MOOSAVI · DEUTSCHLAND</span><span>MIT SORGFALT GESTALTET</span></div>
      </div>
    </footer>
  )
}
