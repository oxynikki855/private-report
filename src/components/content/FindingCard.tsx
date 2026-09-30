import type { Finding } from '../../content/report.types'
import { PlaceholderNotice } from './PlaceholderNotice'

export function FindingCard({ finding }: { finding: Finding }) {
  return <article className="finding-card"><p className="finding-label">{finding.label}</p><h3>{finding.title}</h3><p>{finding.description}</p><PlaceholderNotice status={finding.status}>请以经确认的业务事实替换此条高层判断。</PlaceholderNotice></article>
}
