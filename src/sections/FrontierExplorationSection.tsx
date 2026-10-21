import { useRevealOnView } from '../hooks/useRevealOnView'

export function FrontierExplorationSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>({ selector: '.frontier-reveal' })

  return <section ref={ref} id="frontier-exploration" className={`frontier-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="frontier-hero frontier-reveal frontier-reveal--hero"><p className="eyebrow">Frontier exploration / 10</p><h2>持续关注前沿，<br />及时吸纳新能力</h2><p>保持对 Agent、模型、工作流和产品形态变化的敏感度：什么值得立刻上手，什么值得先观察，什么可能与内部业务问题产生连接。</p></header>

    <article className="frontier-routine frontier-reveal frontier-reveal--section"><div><p className="scene-index">WEEKLY RHYTHM</p><h3>每周关注 GitHub 热门项目与行业新动态</h3></div><p>通过热门项目、开源发布、产品更新与社区讨论持续接触新的技术方向。重点不在收藏清单，而在于快速判断它与当前项目是否相关：能否改善 Agent 协作、任务闭环、运行治理、数据处理或业务工作入口。</p></article>

    <article className="frontier-case frontier-case--dsh frontier-reveal frontier-reveal--section"><div className="frontier-case-mark"><span>01</span><b>DSH</b></div><div><p className="scene-index">FROM RELEASE TO PRACTICE</p><h3>DSH 开源当周开始上手，并进入 Sailoom 的实际开发</h3><p>DeepSeek Harness 于 8 月 13 日开源。它将模型、工具、会话、Agent loop、权限和 Web/Headless 入口组织为插件体系，“Everything is a Plugin”的思路为 Sailoom 的平台设计提供了直接参考。</p><p>对 Sailoom 来说，值得学习的不是照搬某个实现，而是把稳定的任务/运行/验收控制面，与可替换的 Agent 执行能力分开设计。</p></div></article>

    <article className="frontier-case frontier-case--jev frontier-reveal frontier-reveal--section"><div className="frontier-case-mark"><span>02</span><b>JEV</b></div><div><p className="scene-index">TYPED DECISION SIGNAL</p><h3>JEV 突然爆发后，第一时间申请试用并持续关注</h3><p>TypeSafe 在 9 月 15 日发布 JEV：它面向软件中的快速类型化决策，输入状态与问题，返回结构化答案及置信度，而非生成长文本。当前尚未真正投入时间体验，但这一方向本身值得持续观察。</p><p>它启发的是一种分工：部分高频、边界明确的判断可以交给更快、更便宜的结构化决策模型，例如意图路由、是否需要人工介入、节点是否重试、上下文是否需要保留；需要解释、创造和复杂推理的任务仍由大模型承担。</p></div></article>

    <article className="frontier-case frontier-reveal frontier-reveal--section"><div className="frontier-case-mark"><span>03</span><b>OPUS 5.5</b></div><div><p className="scene-index">CODE-FIRST VIDEO PRACTICE</p><h3>关注 Claude Opus 5.5，实践“纯搓代码生产视频”</h3><p>近期在 GitHub 上观察到多个以代码驱动制作视频的案例，也因此开始关注 Claude Opus 5.5 与这一类工作方式。这里记录的是个人观察与实践，不对外部案例或工具能力作延伸判断。</p><p>我也在按这一思路实践：将画面、节奏与交互以代码组织并迭代。本次汇报中的演示视频均按这一思路制作；当前重点是继续探索这种制作方式在表达与迭代上的适用边界，而非将其包装为已经验证的通用方案。</p></div></article>

    <article className="frontier-signals frontier-reveal frontier-reveal--section"><p className="scene-index">PERSONAL AGENT PRODUCT WAVE</p><div className="frontier-signals-content"><h3>Dots、Cue、Muse 等新兴产品持续进入视野</h3><div className="frontier-signals-copy"><p>近期个人代理产品密集出现，持续改变人们对“Agent 在电脑上长期运行、连接应用、代办日常工作”的想象。</p><p>目前对这些产品仍以接触和观察为主；它们的价值更多在于提供产品形态与用户习惯的参考：什么是自然入口、怎样交付结果、如何让用户保持授权和掌控。</p></div></div></article>

    <p className="frontier-close frontier-reveal frontier-reveal--section">持续探索的价值，在于当一个新能力真正与业务问题相遇时，已经具备足够的背景和判断基础，知道该试什么、该验证什么、也知道哪些地方不能急于下结论。</p>
  </section>
}
