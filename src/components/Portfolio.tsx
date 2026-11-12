import { useState } from 'react'
import { projects, type ProjectCategory } from '../data/content'

const categories: ('Alle' | ProjectCategory)[] = ['Alle', '3D-Modellierung', '2D-Zeichnung', 'Digitalisierung']

export function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>('Alle')
  const [showAll, setShowAll] = useState(false)
  const filtered = projects.map((project, index) => ({ project, number: index + 1 }))
    .filter(({ project }) => active === 'Alle' || project.category === active)
  const visible = showAll ? filtered : filtered.slice(0, 6)

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container-wide">
        <div className="portfolio-heading">
          <h2>Mein Portfolio</h2>
          <p>Ein Einblick in die Möglichkeiten von CAD – von der ersten Linie bis zur räumlichen Darstellung.</p>
        </div>
        <div className="portfolio-toolbar">
          <div className="filters" aria-label="Portfolio nach Kategorie filtern">
            {categories.map((category) => <button key={category} className={active === category ? 'active' : ''} type="button" aria-pressed={active === category} onClick={() => { setActive(category); setShowAll(false) }}>{category}</button>)}
          </div>
          <span>PROJEKTE / {String(filtered.length).padStart(2, '0')}</span>
        </div>
        <div className="portfolio-grid">
          {visible.map(({ project, number }) => (
            <article className="project-card" key={project.title}>
              <div className="project-image"><img src={project.image} alt={project.imageAlt} loading="lazy" />{project.illustrative && <span className="project-image-label">ILLUSTRATIVE STUDIE</span>}</div>
              <div className="project-meta">
                <div className="project-title"><h3>{project.title}</h3><span>{String(number).padStart(2, '0')}</span></div>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="portfolio-empty">Für diese Kategorie sind noch keine Projekte vorhanden.</p>}
        {filtered.some(({ project }) => project.illustrative) && <p className="portfolio-disclaimer">Als illustrative Studien gekennzeichnete Darstellungen sind keine Kundenreferenzen.</p>}
        {!showAll && filtered.length > 6 && <button className="portfolio-more" type="button" onClick={() => setShowAll(true)}>Mehr Projekte</button>}
      </div>
    </section>
  )
}
