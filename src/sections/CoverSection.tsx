import type { CSSProperties } from 'react'
import { reportData } from '../content/report.data'

export function CoverSection() {
  const { meta, hero } = reportData
  return <section className="cover"><div className="cover-main reveal"><img className="cover-logo" src="/assets/brand/sailvan-logo.png" alt="赛维时代 Sailvan Times" /><p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}<em>{hero.highlightedTitle}</em></h1><p className="cover-summary">{hero.summary}</p></div><aside className="cover-folio reveal" style={{ '--delay': '120ms' } as CSSProperties}><p>{meta.year}</p><dl><div><dt>汇报主体</dt><dd>{meta.team}</dd></div><div><dt>统计区间</dt><dd>{meta.period}</dd></div><div><dt>资料版本</dt><dd>{meta.version}</dd></div></dl></aside></section>
}
