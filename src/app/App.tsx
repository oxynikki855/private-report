import { StickyHeader } from '../components/layout/StickyHeader'
import { reportData } from '../content/report.data'
import { AnnualTrajectorySection } from '../sections/AnnualTrajectorySection'
import { SupplyChainTopicsSection } from '../sections/SupplyChainTopicsSection'
import { AgentTeamSection } from '../sections/AgentTeamSection'
import { CaseStudySection } from '../sections/CaseStudySection'
import { ContextSection } from '../sections/ContextSection'
import { CoverSection } from '../sections/CoverSection'
import { ExecutiveSummarySection } from '../sections/ExecutiveSummarySection'
import { ImpactSection } from '../sections/ImpactSection'
import { NextAgendaSection } from '../sections/NextAgendaSection'
import { ProgressSection } from '../sections/ProgressSection'

export function App() {
  return <><StickyHeader title={reportData.meta.title} year={reportData.meta.year} /><main className="report-shell"><CoverSection /><AnnualTrajectorySection /><SupplyChainTopicsSection /><AgentTeamSection /><ExecutiveSummarySection /><ContextSection /><ProgressSection /><ImpactSection /><CaseStudySection /><NextAgendaSection /></main></>
}
