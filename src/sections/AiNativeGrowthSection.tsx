import { useEffect, useRef, useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

const terminalSequences = [
  [
    '$ curl -fsS --connect-timeout 5 https://api.github.com/zen && printf \'\\nnetwork: reachable\\n\'',
    'Keep it logically awesome.\nnetwork: reachable',
  ],
  [
    '$ ip route get 1.1.1.1 && getent hosts api.anthropic.com',
    'default route resolved  ·  DNS lookup succeeded',
  ],
  [
    '$ systemctl --user stop openclaw-gateway && sleep 2 && systemctl --user start openclaw-gateway',
    'openclaw-gateway.service  ·  restarted successfully',
  ],
  [
    '$ journalctl --user -u openclaw-gateway --since \'10 minutes ago\' --no-pager | tail -n 12',
    'recent gateway events inspected  ·  no blocking error found',
  ],
]

function TerminalTyping() {
  const [sequenceIndex, setSequenceIndex] = useState(() => Math.floor(Math.random() * terminalSequences.length))
  const [typed, setTyped] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const started = useRef(false)
  const { ref, isVisible } = useRevealOnView<HTMLDivElement>()
  const [command, output] = terminalSequences[sequenceIndex]

  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true
    let character = 0
    let nextTimer: number | undefined
    const typing = window.setInterval(() => {
      character += 1
      setTyped(command.slice(0, character))
      if (character >= command.length) {
        window.clearInterval(typing)
        window.setTimeout(() => setShowOutput(true), 250)
        nextTimer = window.setTimeout(() => {
          setTyped('')
          setShowOutput(false)
          setSequenceIndex((current) => {
            const candidates = terminalSequences.map((_, index) => index).filter((index) => index !== current)
            return candidates[Math.floor(Math.random() * candidates.length)]
          })
          started.current = false
        }, 5250)
      }
    }, 18)
    return () => {
      window.clearInterval(typing)
      if (nextTimer) window.clearTimeout(nextTimer)
    }
  }, [command, isVisible, sequenceIndex])

  return <div ref={ref} className="operations-terminal" aria-label="Linux 环境与 Agent 运维命令演示"><div className="terminal-bar"><span /><span /><span /><b>WSL2 · Agent Operations</b></div><div className="terminal-body"><p className="terminal-command">{typed}<i aria-hidden="true" /></p>{showOutput && <p className="terminal-output">{output}</p>}</div></div>
}

function KnowledgeGraph() {
  const outerNodes = [
    [145, 130, 6], [290, 72, 5], [465, 95, 7], [655, 145, 5], [810, 105, 6],
    [875, 275, 5], [805, 435, 7], [640, 505, 5], [455, 530, 6], [275, 495, 5],
    [120, 405, 7], [95, 250, 5], [270, 235, 4], [690, 260, 4], [715, 365, 4],
    [325, 395, 4], [525, 160, 4], [510, 465, 4],
  ]
  const links = [[0, 12], [12, 16], [16, 2], [2, 13], [13, 3], [3, 14], [14, 6], [6, 7], [7, 17], [17, 8], [8, 9], [9, 15], [15, 10], [10, 11], [11, 0], [1, 12], [4, 13], [5, 14], [15, 17]]

  return <svg className="knowledge-graph" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-label="无文字的 Obsidian 知识关系图谱动画">
    <g className="graph-network">{outerNodes.map(([x, y], index) => <line key={`core-${index}`} x1="500" y1="300" x2={x} y2={y} />)}{links.map(([from, to], index) => <line key={`link-${index}`} x1={outerNodes[from][0]} y1={outerNodes[from][1]} x2={outerNodes[to][0]} y2={outerNodes[to][1]} className="graph-link" />)}{outerNodes.map(([x, y, size], index) => <circle key={`node-${index}`} cx={x} cy={y} r={size} className={index % 6 === 0 ? 'is-accent' : undefined} />)}<circle className="graph-core" cx="500" cy="300" r="16" /></g>
  </svg>
}

export function AiNativeGrowthSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>()

  return <section ref={ref} id="ai-native-growth" className={`ai-growth-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="ai-growth-hero ai-growth-reveal ai-growth-reveal--hero">
      <p className="eyebrow">AI native growth / 04</p>
      <h2><span>从第一次惊讶，</span><span>到 AI Native 能力的成长</span></h2>
      <p>在一次次真实任务里，开始理解如何让 Agent 获得知识、使用工具、沉淀经验，并与人的工作节奏协同。</p>
    </header>

    <article className="ai-growth-scene ai-growth-scene--erp ai-growth-reveal ai-growth-reveal--scene">
      <div className="ai-growth-copy"><p className="scene-index">01 / BUSINESS RESEARCH</p><h3>第一次真实业务：使用 AI Agent 辅助调研</h3><p>在 Hard 新 ERP 独立部署调研中，面对的是多个子系统、功能清单和业务边界。Agent 根据投喂的系统文档和 ERP 标准功能，写了一份调研对照清单，会议中随时记录笔记、分析差异。</p><p className="scene-note">第一次直观看到：AI 不是只用来回答问题，也可以参与理解复杂业务资料和组织调研过程。</p></div>
      <figure className="ai-growth-image ai-growth-image--wide"><img src={asset('ERP调研截图.jpg')} alt="Hard BU ERP 独立部署调研表盘截图" /></figure>
    </article>

    <article className="ai-growth-scene ai-growth-scene--reading ai-growth-reveal ai-growth-reveal--scene">
      <figure className="ai-growth-image"><img src={asset('管理的常识阅读.jpeg')} alt="管理的常识深度阅读报告截图" /></figure>
      <div className="ai-growth-copy"><p className="scene-index">02 / KNOWLEDGE AS CONTEXT</p><h3>读书笔记：人类和 Agent 共同可用的知识</h3><p>将管理、供应链和技术资料整理为结构化阅读报告，既减轻了长篇阅读与整理的负担，也让关键概念、案例和判断可以在后续任务中被检索、复用和追问。</p><p>逐步建立更可追溯的知识输入：我可以快速回到原文、检查整理是否准确，Agent 也能随时使用这些知识为我提供指引。</p><a className="source-launch" href={asset('管理的常识-reading-report.html')} target="_blank" rel="noreferrer">打开《管理的常识》阅读报告 <span>↗</span></a></div>
    </article>

    <article className="ai-growth-scene ai-growth-scene--camp ai-growth-reveal ai-growth-reveal--scene">
      <div className="ai-growth-copy"><p className="scene-index">03 / CAPTURE TO SHARE</p><h3>课堂笔记开始在当下沉淀并分享</h3><p>赛马训练营中的口述笔记，不再只留在课后等待人工整理。通过 Agent 协助把课程信息转化为可阅读的商业创新思维模型报告，课堂输入在15分钟内就变成了后续复盘和交流的共同材料。</p><p className="scene-note">这是一种新的学习节奏：现场理解、快速沉淀、回看校正，再带着结构化内容继续讨论。</p><a className="source-launch" href={asset('赛马训练营-商业创新思维模型-报告.html')} target="_blank" rel="noreferrer">打开赛马训练营报告 <span>↗</span></a></div>
      <figure className="ai-growth-image"><img src={asset('赛马训练营.jpeg')} alt="赛马训练营商业创新思维模型报告截图" /></figure>
    </article>

    <article className="ai-growth-scene ai-growth-scene--report ai-growth-reveal ai-growth-reveal--scene">
      <figure className="ai-growth-image ai-growth-image--report"><img src={asset('双周汇报示例.jpeg')} alt="双周工作汇报图片示例" /></figure>
      <div className="ai-growth-copy"><p className="scene-index">04 / REPEATABLE OUTPUT</p><h3>双周汇报 Skill：高质量表达开始稳定产出</h3><p>把固定的汇报逻辑、版式、重点和检查要求沉淀为可复用 Skill 后，双周汇报不必每次从空白开始。它让“信息如何取舍、如何组织、如何呈现”逐步成为稳定流程，而不是一次性的临场发挥。</p><p>这也让我开始理解：当一个能力高频重复、质量标准清楚时，应该被沉淀为可复用的工作方法。</p></div>
    </article>

    <article className="ai-growth-scene ai-growth-scene--knowledge ai-growth-reveal ai-growth-reveal--scene">
      <div className="ai-growth-copy"><p className="scene-index">05 / PERSONAL KNOWLEDGE BASE</p><h3>开始用 Obsidian 管理知识，让阅读、项目与经验逐步连接起来。</h3><p>当前知识库放在 OneDrive 中，多端可用；即使回家后，也能继续查阅和整理。重要文件还没有全部迁入，后续会逐步把项目文档、阅读材料和关键经验迁移进去。</p><p>知识库的意义不只在于存放文件，而在于让分散的笔记、项目、判断和复盘开始形成可追溯的关系。</p></div>
      <div className="knowledge-graph-frame"><KnowledgeGraph /></div>
    </article>

    <article className="ai-growth-operations ai-growth-reveal ai-growth-reveal--scene">
      <div className="ai-growth-operations-heading"><p className="scene-index">06 / OPERATING THE ENVIRONMENT</p><h3>从使用工具，到能够维护工作环境</h3></div>
      <div className="ai-growth-operation-grid"><div><span>01</span><h4>理解配置与终端</h4><p>逐步看懂 OpenClaw 配置文件，开始使用简单终端工具；从“会点开一个工具”进入“知道它如何被配置和运行”。</p></div><div><span>02</span><h4>迁移到 WSL2</h4><p>将 OpenClaw 从 Windows 迁移到 WSL2，开始学习 Linux 的文件、命令、环境与运行方式，让工具能力不再完全依赖图形界面。</p></div><div><span>03</span><h4>能力长在部门上</h4><p>承担 Hard 端绝大多数人的龙虾运维。现在已有一批业务同事具备完整 Agent 运维能力；但在半年前，这仍是一种相对稀少的能力。</p></div></div>
      <TerminalTyping />
    </article>
  </section>
}
