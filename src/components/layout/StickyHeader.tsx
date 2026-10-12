import { reportSections } from '../../app/report-config'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useReadingProgress } from '../../hooks/useReadingProgress'

type HeaderProps = { title: string; year: string }

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`

export function StickyHeader({ title, year }: HeaderProps) {
  const activeId = useActiveSection(reportSections.map((section) => section.id))
  const progress = useReadingProgress()
  const active = reportSections.find((section) => section.id === activeId)

  return <>
    <header className="report-header">
      <img src={asset('brand/sailvan-logo.png')} alt="赛维时代 Sailvan Times" />
      <p>{title} · {year}</p>
      <p>{active?.label ?? '年度轨迹'}</p>
    </header>
    <div className="reading-progress" aria-label={`阅读进度 ${Math.round(progress)}%`}><span style={{ width: `${progress}%` }} /></div>
  </>
}
