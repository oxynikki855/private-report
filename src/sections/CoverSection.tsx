import type { CSSProperties } from 'react'
import { reportData } from '../content/report.data'

export function CoverSection() {
  const { meta, hero } = reportData
  return <section className="cover"><div className="cover-main reveal"><img className="cover-logo" src="/assets/brand/sailvan-logo.png" alt="赛维时代 Sailvan Times" /><p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}<em>{hero.highlightedTitle}</em></h1><p className="cover-summary">{hero.summary}</p></div><aside className="cover-folio reveal" style={{ '--delay': '120ms' } as CSSProperties}><p>{meta.year}</p><dl><div><dt>汇报主体</dt><dd>Hard 供应中心 陈启航</dd></div><div><dt>汇报时间</dt><dd>2026.10.9</dd></div><div><dt>资料版本</dt><dd>{meta.version}</dd></div></dl></aside></section>
}
