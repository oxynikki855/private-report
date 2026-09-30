import { useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

type AgentId = 'openclaw' | 'claude-code' | 'codex' | 'droid' | 'hermes' | 'workbuddy' | 'deepseek-harness' | 'pi-agent'

type AgentScore = { label: string; value: number }
type AgentProfile = { id: AgentId; name: string; asset: string; scores?: AgentScore[]; usage: string }

const scoreLabels = ['代码能力', '交互便捷性', '记忆与上下文', '子 Agent 调度', '框架 Harness', '自主进化']
const scores = (values: number[]) => scoreLabels.map((label, index) => ({ label, value: values[index] }))

const agents: AgentProfile[] = [
  { id: 'openclaw', name: 'OpenClaw', asset: '/assets/agent-team/openclaw.svg', scores: scores([4.0, 4.5, 4.0, 4.0, 4.5, 3.5]), usage: '团队使用最广泛、探索也最深入的个人办公助理型框架。它以 IM 与多渠道作为自然入口，适合承接日常任务、记忆、定时事务、工具调用和多 Agent 协作；团队围绕它积累了最多的实际使用经验。' },
  { id: 'hermes', name: 'Hermes', asset: '/assets/agent-team/hermes-desktop.ico', scores: scores([4.0, 3.5, 4.0, 3.5, 3.5, 3.0]), usage: '同样更偏个人办公助理，但在技能自动生成、技能自进化、上下文与记忆约束方面有鲜明取向。它与 OpenClaw 的体验和表现明显不同；就个人使用感受而言，更偏好 Hermes 的工作方式。' },
  { id: 'claude-code', name: 'Claude Code', asset: '/assets/agent-team/claude-code.svg', scores: scores([5.0, 3.0, 3.5, 2.5, 5.0, 2.0]), usage: '典型 Coding Agent，主要工作在 TUI/终端中。适合代码编写、文件读写、调试与测试；每一步文件改动和命令执行都直观可见，便于人持续确认与控制。' },
  { id: 'droid', name: 'Droid', asset: '/assets/agent-team/droid.svg', scores: scores([4.5, 3.5, 3.5, 3.5, 4.0, 2.5]), usage: '偏工程执行的 Coding Agent，同样适合在 TUI/执行环境中完成代码、文件、测试和任务编排。它在任务生命周期、Spec 模式与并行子任务方面提供较完整的 Harness，仍保留可见、可控的工程过程。' },
  { id: 'codex', name: 'Codex', asset: '/assets/agent-team/codex.svg', scores: scores([4.8, 3.0, 3.5, 3.5, 4.5, 2.5]), usage: '工程终端型 Coding Agent，适合深入代码库、修改文件、执行命令与完成开发任务。与 Claude Code、Droid 一样，操作主要发生在可检查的 TUI 工作流中；当前对其更高级能力的实际体验仍在补充。' },
  { id: 'workbuddy', name: 'WorkBuddy', asset: '/assets/agent-team/workbuddy.ico', scores: scores([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]), usage: '偏桌面工作入口的 AI 助手与 Coding Agent 形态，适合把自然语言任务放进项目/文件工作区中完成。它提供了观察不同桌面端产品如何组织模型、项目上下文与开发协作的参考；横评体验与打分后续继续补充。' },
  { id: 'deepseek-harness', name: 'DeepSeek Harness', asset: '/assets/agent-team/deepseek-harness.svg', scores: scores([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]), usage: '核心启发是“Everything is a Plugin”：将 Agent、执行能力、会话、工具、治理与交付面都作为可组合、可替换的插件理解。这种架构思路对后续企业工作流和平台化设计有重要参考价值。' },
  { id: 'pi-agent', name: 'Pi Agent', asset: '/assets/agent-team/pi-agent.svg', usage: '尚未正式体验，打分待体验后决定。它预期是一种更轻量、可高度自定义的 Agent 形态，可能适合在二次开发后融入企业工作流与具体业务入口。' },
]

function AgentMark({ agent }: { agent: AgentProfile }) {
  return <img className="agent-logo" src={agent.asset} alt="" />
}

export function AgentTeamSection() {
  const [selectedId, setSelectedId] = useState<AgentId | null>(null)
  const { ref, isVisible } = useRevealOnView<HTMLElement>()
  const selected = agents.find((agent) => agent.id === selectedId) ?? null

  return <section ref={ref} id="agent-team" className={`agent-team-section ${isVisible ? 'is-revealed' : ''} ${selected ? 'has-selection' : ''}`}>
    <div className="agent-team-heading agent-team-reveal"><p className="eyebrow">Agent collaboration / 03</p><h2>我的Agent团队</h2><p>始于2026年2月底</p></div>
    {!selected ? <div className="agent-gallery" aria-label="我的 Agent 团队，点击任一图案查看详情">
      {agents.map((agent) => <button key={agent.id} type="button" className={`agent-tile agent-tile--${agent.id} agent-team-reveal`} onClick={() => setSelectedId(agent.id)} aria-label={`查看 ${agent.name} 详情`}><AgentMark agent={agent} /></button>)}
    </div> : <div className="agent-focus" key={selected.id}>
      <div className="agent-focus-mark"><AgentMark agent={selected} /></div>
      <div className="agent-focus-detail"><button type="button" className="agent-back" onClick={() => setSelectedId(null)}>← 返回团队</button><p className="eyebrow">Agent profile</p><h3>{selected.name}</h3><div className="agent-detail-placeholder"><section><b>横评打分</b>{selected.scores ? <div className="agent-scores">{selected.scores.map((score) => <div key={score.label}><span>{score.label}</span><strong>{score.value.toFixed(1)}</strong></div>)}</div> : <p>{selected.id === 'pi-agent' ? '待体验后决定。' : '待补：此框架暂不纳入当前横评，后续自行补充。'}</p>}</section><section><b>使用场景</b><p>{selected.usage}</p></section></div></div>
    </div>}
  </section>
}
