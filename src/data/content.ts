import { Box, DraftingCompass, FilePenLine, Layers3, PenTool, ScanLine } from 'lucide-react'

export const services = [
  { number: '01', title: '2D CAD Zeichnungen', description: 'Klare, präzise Zeichnungen als verlässliche Grundlage für Ihre Ideen und Projekte.', icon: DraftingCompass },
  { number: '02', title: '3D CAD Modellierung', description: 'Räumliche Modelle, die Formen, Details und Zusammenhänge greifbar machen.', icon: Box },
  { number: '03', title: 'Technische Zeichnungen', description: 'Strukturierte technische Darstellung – verständlich und sorgfältig ausgearbeitet.', icon: FilePenLine },
  { number: '04', title: 'Digitalisierung von Skizzen', description: 'Aus handgezeichneten Skizzen und bestehenden Vorlagen werden digitale CAD-Daten.', icon: ScanLine },
  { number: '05', title: 'Umwandlung von 2D in 3D', description: 'Ihre vorhandenen 2D-Zeichnungen als anschauliches dreidimensionales Modell.', icon: Layers3 },
  { number: '06', title: 'Individuelle CAD-Lösungen', description: 'Unterstützung für Ihre spezifischen Anforderungen – abgestimmt auf Ihr Vorhaben.', icon: PenTool },
]

export type ProjectCategory = '3D-Modellierung' | '2D-Zeichnung' | 'Digitalisierung'
export type Project = {
  title: string
  category: ProjectCategory
  description: string
  image: string
  imageAlt: string
  illustrative: boolean
}

// Replace these illustrative studies with your own projects and image paths.
export const projects: Project[] = [
  { title: 'Form & Funktion', category: '3D-Modellierung', description: 'Eine Studie in räumlicher Konstruktion', image: '/images/study-form.svg', imageAlt: 'Illustrative CAD-Darstellung eines geometrischen Bauteils', illustrative: true },
  { title: 'Präzision im Detail', category: '2D-Zeichnung', description: 'Technische Linien und klare Geometrie', image: '/images/study-detail.svg', imageAlt: 'Illustrative technische Zeichnung mit Ansichten und Bemaßungen', illustrative: true },
  { title: 'Von der Skizze zum Modell', category: 'Digitalisierung', description: 'Eine Idee in digitaler Form', image: '/images/study-digital.svg', imageAlt: 'Illustrative Darstellung einer Skizze neben einem CAD-Modell', illustrative: true },
]
