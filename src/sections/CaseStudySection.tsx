import { PlaceholderNotice } from '../components/content/PlaceholderNotice'
import { ReportSection } from '../components/layout/ReportSection'
import { reportData } from '../content/report.data'

export function CaseStudySection() { const { caseStudy } = reportData; return <ReportSection id="case-study" eyebrow="Case file / 05" title={caseStudy.title} className="print-break-before"><div className="case-grid"><div><p className="lead-copy">{caseStudy.summary}</p><PlaceholderNotice status={caseStudy.status}>请提供已脱敏的截图或流程图，并附图注、来源、时间与可展示范围。</PlaceholderNotice></div><div className="case-frame"><p>REAL EVIDENCE</p><strong>待放入真实产品截图、项目成果或流程证据。</strong><small>问题 → 关键选择 → 结果 → 可复用经验</small></div></div></ReportSection> }
