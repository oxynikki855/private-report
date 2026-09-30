import type { Metric } from '../../content/report.types'
import { PlaceholderNotice } from './PlaceholderNotice'
import { SourceLine } from './SourceLine'

export function MetricCard({ metric }: { metric: Metric }) {
  return <article className="metric-card"><p className="metric-label">{metric.label}</p><p className="metric-value">{metric.value}</p><p>{metric.description}</p><PlaceholderNotice status={metric.status}>填入原始值、单位、比较基准与确认人后，此处才显示正式指标。</PlaceholderNotice><SourceLine definition={metric.definition} period={metric.period} source={metric.source} /></article>
}
