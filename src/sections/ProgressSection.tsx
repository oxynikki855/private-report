import { ReportSection } from '../components/layout/ReportSection'

export function ProgressSection() { return <ReportSection id="progress" eyebrow="Practice trajectory / 03" title="成长不是按月罗列事项，而是在实践中不断改变看问题和做事的方式。"><div className="stage-rail">{['待补：从工具与方法的探索开始', '待补：把探索带到真实工作场景', '待补：从单点实践走向可验证成果', '待补：沉淀为产品思维与组织能力'].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item}</h3><p>以真实经历、项目或阶段填充；每一步都应说明做了什么、学到了什么，以及如何影响下一步实践。</p></article>)}</div></ReportSection> }
