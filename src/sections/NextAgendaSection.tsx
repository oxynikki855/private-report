import { PlaceholderNotice } from '../components/content/PlaceholderNotice'
import { ReportSection } from '../components/layout/ReportSection'
import { reportData } from '../content/report.data'

export function NextAgendaSection() { return <ReportSection id="next" eyebrow="Growth & next chapter / 06" title="把这一年的实践沉淀为下一阶段继续成长的方向。"><div className="decisions">{reportData.decisions.map((decision) => <article className="decision-item" key={decision.id}><p>{decision.type}</p><h3>{decision.title}</h3><span>{decision.description}</span><PlaceholderNotice status={decision.status}>补充下一阶段的具体目标、行动条件与希望获得的支持。</PlaceholderNotice></article>)}</div></ReportSection> }
