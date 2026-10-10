import { useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

type WorkspaceScene = { id: string; image: string; alt: string; statement: string }

const scenes: WorkspaceScene[] = [
  { id: 'atoa-platform', image: 'AtoA-2.jpeg', alt: 'COMM A2A 协作平台截图', statement: '由于多框架的 Agent 团队需要做 A2A 沟通，于是生出了 COMM 平台。' },
  { id: 'atoa-meeting', image: 'AtoA-1.jpeg', alt: '多框架 Agent 会议截图', statement: '多框架 Agent 一起开会，会议内容可导出。' },
  { id: 'memoria', image: 'Memoria.png', alt: 'Memoria 共同记忆系统截图', statement: '多框架信息散乱、难以回忆，于是给 Agent 接了共同大脑 Memoria。' },
  { id: 'todo', image: 'todo-1.jpeg', alt: 'Agent 管理个人待办与排期截图', statement: '个人待办事项由 Agent 管理：每天告诉它排期，它来规划时间安排。' },
  { id: 'iot', image: 'todo-2.jpg', alt: 'AIoT 小屏展示待办与规划截图', statement: '外接小屏幕，是 AIoT 的一次初探索：让待办与规划更显眼、可见。' },
  { id: 'ap-board', image: 'AP-1.jpeg', alt: 'AP 项目管理平台截图', statement: 'AP 项目管理范式的一种解决方案...?' },
  { id: 'ap-report', image: 'AP-2.jpeg', alt: 'AP 项目定时截图自动汇报截图', statement: '定时截图自动汇报，人类不需要再做繁琐的维护。' },
  { id: 'forum', image: 'forum.jpeg', alt: '人类可读的 Agent 论坛截图', statement: '人类只可读的 Agent 论坛，及时沉淀团队经验。' },
]

export function AiNativeWorkspaceSection() {
  const [selectedId, setSelectedId] = useState(scenes[0].id)
  const { ref, isVisible } = useRevealOnView<HTMLElement>()
  const selected = scenes.find((scene) => scene.id === selectedId) ?? scenes[0]

  return <section ref={ref} id="ai-native-workspace" className={`workspace-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="workspace-heading workspace-reveal workspace-reveal--heading"><p className="eyebrow">Personal AI workspace / 05</p><h2>逐一解决个人小痛点，打造Agent协同工作环境</h2></header>
    <div className="workspace-showcase workspace-reveal workspace-reveal--showcase">
      <div className="workspace-media"><figure className="workspace-main-image" key={selected.id}><img src={asset(selected.image)} alt={selected.alt} /></figure><div className="workspace-picker" role="tablist" aria-label="AI Native 工作环境素材选择">{scenes.map((scene) => <button key={scene.id} type="button" role="tab" aria-selected={scene.id === selected.id} onClick={() => setSelectedId(scene.id)}><img src={asset(scene.image)} alt="" /></button>)}</div></div>
      <aside className="workspace-statement" key={selected.id}><p className="scene-index">{String(scenes.findIndex((scene) => scene.id === selected.id) + 1).padStart(2, '0')} / PRACTICE</p><h3>{selected.statement}</h3></aside>
    </div>
    <div className="workspace-conclusion workspace-reveal workspace-reveal--conclusion"><p className="scene-index">WORKING MODE SHIFT</p><h3>走在个人工作方式变革的前线上</h3><div className="workspace-conclusion-grid"><div className="workspace-theses"><p>AI 辅助提效不仅靠 Skill，还得依赖原生可操作的轻量工具和系统。自建系统的 API 调用打包成 MCP，任何动作都可以压缩为给 AI 的一条语音。</p><p>借助软件开发的思路，用git管理自建系统和任何项目，保证出错可回滚，开发不再是开盲盒，而是有规划的动作。</p><p>随之变化的，是用户习惯必然发生的改变：Word 演变成 Markdown 文档，PPT 演变成 HTML，Excel 演变成数据库处理。</p><p>从自己动手到发语音让 Agent 做事，个人换脑是组织变革的第一步。</p></div><figure className="workspace-voice-image paper-surface"><img src={asset('01-voice-to-agent-system.jpg')} alt="语音指令到 Agent 系统执行的工作流示意图" /></figure></div></div>
  </section>
}
