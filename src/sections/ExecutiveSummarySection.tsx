import { FindingCard } from '../components/content/FindingCard'
import { ReportSection } from '../components/layout/ReportSection'
import { reportData } from '../content/report.data'

export function ExecutiveSummarySection() { return <ReportSection id="summary" eyebrow="Narrative map / 01" title="这一年的实践，沿着三条彼此连接的主线展开。"><div className="findings-grid">{reportData.findings.map((finding) => <FindingCard key={finding.id} finding={finding} />)}</div></ReportSection> }
