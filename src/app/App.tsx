import { StickyHeader } from '../components/layout/StickyHeader'
import { reportData } from '../content/report.data'
import { AnnualTrajectorySection } from '../sections/AnnualTrajectorySection'
import { SupplyChainTopicsSection } from '../sections/SupplyChainTopicsSection'
import { AgentTeamSection } from '../sections/AgentTeamSection'
import { AiNativeGrowthSection } from '../sections/AiNativeGrowthSection'
import { AiNativeWorkspaceSection } from '../sections/AiNativeWorkspaceSection'
import { OrganizationEnablementSection } from '../sections/OrganizationEnablementSection'
import { ApProjectsSection } from '../sections/ApProjectsSection'
import { SailoomReflectionSection } from '../sections/SailoomReflectionSection'
import { DemandForecastSection } from '../sections/DemandForecastSection'
import { FrontierExplorationSection } from '../sections/FrontierExplorationSection'
import { ReflectionSection } from '../sections/ReflectionSection'
import { InternalFdeSection } from '../sections/InternalFdeSection'
import { CoverSection } from '../sections/CoverSection'

export function App() {
  return <><StickyHeader title={reportData.meta.title} year={reportData.meta.year} /><main className="report-shell"><CoverSection /><AnnualTrajectorySection /><SupplyChainTopicsSection /><AgentTeamSection /><AiNativeGrowthSection /><AiNativeWorkspaceSection /><OrganizationEnablementSection /><ApProjectsSection /><SailoomReflectionSection /><DemandForecastSection /><FrontierExplorationSection /><ReflectionSection /><InternalFdeSection /></main></>
}
