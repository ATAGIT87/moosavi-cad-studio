import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Portfolio } from './components/Portfolio'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  return (
    <>
      <div id="top" />
      <Header />
      <main>
        {path === '/' && <><Hero /><Services /><Contact /></>}
        {path === '/uber-uns' && <About />}
        {path === '/portfolio' && <Portfolio />}
        {path !== '/' && path !== '/uber-uns' && path !== '/portfolio' && (
          <section className="not-found"><h1>Seite nicht gefunden</h1><a href="/">Zur Startseite</a></section>
        )}
      </main>
      <Footer />
    </>
  )
}
