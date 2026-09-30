import { reportSections } from '../../app/report-config'
import { useActiveSection } from '../../hooks/useActiveSection'

export function SectionNav() {
  const activeId = useActiveSection(reportSections.map((section) => section.id))
  return <nav className="section-nav" aria-label="报告章节导航">
    {reportSections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={activeId === section.id ? 'location' : undefined}>
      <span>{String(index + 1).padStart(2, '0')}</span>{section.label}
    </a>)}
  </nav>
}
