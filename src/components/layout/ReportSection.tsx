import type { CSSProperties, ReactNode } from 'react'
import { useRevealOnView } from '../../hooks/useRevealOnView'

type ReportSectionProps = { id: string; eyebrow: string; title: string; children: ReactNode; className?: string }

export function ReportSection({ id, eyebrow, title, children, className = '' }: ReportSectionProps) {
  const { ref, isVisible } = useRevealOnView<HTMLElement>({ selector: '.page-reveal' })
  return <section ref={ref} id={id} className={`report-section ${isVisible ? 'is-revealed' : ''} ${className}`}>
    <div className="section-heading page-reveal" style={{ '--reveal-delay': '0ms' } as CSSProperties}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
    <div className="section-content page-reveal" style={{ '--reveal-delay': '120ms' } as CSSProperties}>{children}</div>
  </section>
}
