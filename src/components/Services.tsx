import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/content'

export function Services() {
  return (
    <section className="section services" id="leistungen">
      <div className="container-wide">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> WAS ICH TUE</p><h2>Präzision für<br /><em>Ihre Vision.</em></h2></div>
          <p className="heading-copy">Jedes Projekt beginnt mit einer Idee. Ich unterstütze Sie dabei, daraus eine durchdachte digitale Lösung zu machen.</p>
        </div>
        <div className="services-grid">
          {services.map(({ number, title, description, icon: Icon }) => (
            <article className="service-card" key={number}>
              <div className="service-top"><Icon size={28} strokeWidth={1.2} /><span>{number} / 06</span></div>
              <h3>{title}</h3><p>{description}</p>
              <a href="#kontakt" aria-label={`${title} anfragen`}><ArrowUpRight size={18} /></a>
            </article>
          ))}
        </div>
        <div className="services-note"><span>INDIVIDUELL. DURCHDACHT. PRÄZISE.</span><a href="#kontakt">Ihr Projekt ist einzigartig? <strong>Schreiben Sie mir <ArrowUpRight size={15} /></strong></a></div>
      </div>
    </section>
  )
}
