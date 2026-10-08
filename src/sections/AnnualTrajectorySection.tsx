import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

type TimelineItem = { id: string; label: string; title: string; date: string; body: string; x: number; y: number }

const focus = {
  title: '主线重心：企业 AI 落地',
  date: '',
  body: '这一年的探索并不止于掌握更多工具，而是逐步回到企业真实场景：如何把数据、业务规则、系统接口、权限边界与人的判断组织起来，让 AI 在可验证、可控制的条件下参与工作。后续内容将围绕这条主线展开。',
}

const items: TimelineItem[] = [
  { id: 'hard', label: 'Hard模块需求跟进', title: 'Hard模块需求跟进', date: '2025.10', body: '从独立梳理业务需求、撰写方案，到与 IT 完成评审并介入开发，开始在真实系统项目中理解“业务问题如何被翻译成可执行需求”。三方仓自动建档、DDP 在途监控、标签出货自检等事项，构成了这一年的实践起点。', x: 10, y: 24 },
  { id: 'warehouse', label: '分仓专项问题', title: '分仓专项问题', date: '2025.11', body: '围绕排柜定仓和区域组合测算，逐步看到真实供应链决策并不存在单一最优解：装柜效率、仓租、头尾程费用、SKU 差异、服务水平与实际操作性必须同时权衡。这次专项推动了从“解决功能”到“理解问题结构”的转变。', x: 28, y: 24 },
  { id: 'forecast', label: '预测逻辑初探索', title: '预测逻辑初探索', date: '2025.12', body: '从销售预测现状与经典时间序列方法入手，学习如何区分需求中的水平、趋势、季节性与随机成分，并开始接触 Prophet、LightGBM 等模型的适用边界。这为后续 AP02 的滚动验证和更谨慎的预测判断奠定了基础。', x: 49, y: 24 },
  { id: 'ai', label: 'AI能力建设', title: 'AI能力建设', date: '2026.02起', body: '从 Python、数据分析和模型搭建的学习出发，逐步把关注点扩展到 Agent、工具调用、记忆、协作与运行环境。重点不在追逐单一工具，而在于理解一项 AI 能力真正进入工作流还需要哪些基础条件。', x: 69, y: 48 },
  { id: 'erp', label: 'Hard新ERP系统需求调研', title: 'Hard新ERP系统需求调研', date: '2026.03', body: '在新 ERP 系统需求调研中，开始从业务中枢、数据对象、专业系统边界、原子服务和受控接口的角度理解系统建设。这一阶段强化了对数据、规则、权限与责任必须被提前设计的认识。', x: 39, y: 48 },
  { id: 'personal-ai', label: '个人AI工作模式', title: '个人AI工作模式', date: '2026.04-05', body: '通过待办工具、COMM、Memoria、时间管理和实体排期终端等实践，逐渐形成可持续运行的个人 AI 工作环境：大量尝试不同 Agent 框架，各种承担适合的任务，历史经验能够被检索，人的注意力回到确认、沟通与判断。', x: 24, y: 72 },
  { id: 'org', label: '个人提效到组织提效', title: '个人提效到组织提效', date: '2026.06起', body: '从个人工作模式出发，开始在 AP 项目、培训数据看板和可控业务链路中验证组织提效。重要变化不是把个人工具简单复制给团队，而是开始面对可信数据、共享知识、权限控制、验收和协作方式等组织问题。', x: 40, y: 72 },
  { id: 'product', label: '从工具到产品的思考', title: '从工具到产品的思考', date: '2026.07起', body: '当能力开始高频出现、多人使用并需要稳定运行时，单次工具或 Skill 已不足以承载价值。由此形成新的判断：确定性的规则和数据链路应沉淀为产品，AI 负责理解、分析、例外与行动编排，人保留授权和最终判断。', x: 56, y: 72 },
]

export function AnnualTrajectorySection() {
  const [selected, setSelected] = useState<TimelineItem | null>(null)
  const { ref, isVisible } = useRevealOnView<HTMLElement>()
  const active = selected ?? focus
  const resetFocus = () => setSelected(null)

  return <section ref={ref} id="trajectory" className={`trajectory-section ${isVisible ? 'is-revealed' : ''}`}>
    <div className="trajectory-heading trajectory-reveal trajectory-reveal--heading"><p className="eyebrow">Year in trajectory / 01</p><h2>年度轨迹</h2></div>
    <div className="trajectory-layout">
      <div className="trajectory-canvas trajectory-reveal trajectory-reveal--canvas" aria-label="年度成长轨迹，点击节点查看具体说明">
        <svg className="trajectory-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 7 24 H 76 C 91 24, 91 48, 76 48 H 25 C 10 48, 10 72, 25 72 H 67" />
        </svg>
        {items.map((item, index) => <button key={item.id} type="button" className={`trajectory-node trajectory-reveal trajectory-reveal--node ${selected?.id === item.id ? 'is-active' : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%`, '--node-delay': `${220 + index * 70}ms` } as CSSProperties} onClick={() => setSelected(item)} aria-pressed={selected?.id === item.id}>
          <span className="node-dot" /><span className="node-label">{item.label}</span>
        </button>)}
        <button type="button" className="focus-cluster" onClick={resetFocus} aria-label="查看企业 AI 落地主线说明" />
      </div>
      <aside className="trajectory-detail trajectory-reveal trajectory-reveal--detail" aria-live="polite"><p className="detail-label">{selected ? 'NODE DETAIL' : 'NARRATIVE FOCUS'}</p><h3>{active.title}</h3><p className="detail-date">{active.date}</p><p>{active.body}</p><div className="detail-rule" /></aside>
    </div>
  </section>
}
