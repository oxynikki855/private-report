import type { ReportData } from './report.types'

export const reportData: ReportData = {
  meta: {
    title: '年度业绩汇报',
    year: '2026',
    team: '待填团队名称',
    period: '待填统计起止日期',
    version: 'v0.1 · content framework',
  },
  hero: {
    eyebrow: 'Annual growth narrative',
    title: '从个人探索，走向',
    highlightedTitle: '真实业务的实践与成长。',
    summary: '作为集团特招管培生，这一年围绕个人工作方式、企业 AI 落地、产品化思考与人才培养持续实践。本报告将按这条成长轨迹，呈现做过的事、形成的判断与仍在继续的探索。',
  },
  findings: [
    { id: 'personal-system', label: '01 / PERSONAL SYSTEM', title: '待补：个人工作方式如何被重构', description: '从工具尝试、协作与记忆，到任务管理和真实工作现场。', status: 'needs-copy' },
    { id: 'enterprise-practice', label: '02 / ENTERPRISE PRACTICE', title: '待补：如何将探索带入真实业务', description: '以 AP 项目、数据产品或可控场景验证为核心。', status: 'needs-data' },
    { id: 'growth', label: '03 / GROWTH', title: '待补：这一年形成的成长与下一步', description: '从执行、产品思维到组织协作与人才培养。', status: 'needs-copy' },
  ],
  metric: {
    label: 'KPI', value: '待填', description: '年度关键指标将在收到原始数据与对比基准后呈现。', definition: '待填指标定义与计算口径', period: '待填统计区间', source: '待填数据来源与确认人', status: 'needs-data',
  },
  caseStudy: { title: '一件最值得展开的年度案例', summary: '以“问题 → 关键选择 → 结果 → 可复用经验”讲清一件事。此处将放入经过确认和脱敏的产品截图、流程图或成果证据。', status: 'needs-asset' },
  decisions: [
    { id: 'priority', type: 'PRIORITY 01', title: '待填：下一年度优先事项', description: '说明应继续投入的方向、预期回报和衡量方式。', status: 'needs-copy' },
    { id: 'risk', type: 'RISK 02', title: '待填：关键风险或外部依赖', description: '说明影响年度目标的依赖、责任边界与建议处置路径。', status: 'needs-copy' },
    { id: 'decision', type: 'DECISION 03', title: '待填：需 CEO 决策/支持的事项', description: '补充所需决策、建议方案、最晚决策时间与不行动影响。', status: 'needs-copy' },
  ],
}
