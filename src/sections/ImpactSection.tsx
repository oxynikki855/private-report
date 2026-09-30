import { MetricCard } from '../components/content/MetricCard'
import { ReportSection } from '../components/layout/ReportSection'
import { reportData } from '../content/report.data'

export function ImpactSection() { return <ReportSection id="impact" eyebrow="Outcomes & evidence / 04" title="成长要落在真实实践里，也要经得起事实核对。"><div className="impact-grid"><div><p className="lead-copy">这里呈现能够被验证的成果：真实指标、项目产物、产品截图或阶段性验证。它们不是为了装点成绩，而是帮助说明实践真正走到了哪里。</p><p className="impact-aside">收到真实数据后，此处可替换为单结论 SVG 趋势、前后对比或构成图；不使用无数据支撑的装饰性图表。</p></div><MetricCard metric={reportData.metric} /></div></ReportSection> }
