import { useRevealOnView } from '../hooks/useRevealOnView'

const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

export function SailoomReflectionSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>()

  return <section ref={ref} id="sailoom-reflection" className={`sailoom-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="sailoom-hero sailoom-reveal sailoom-reveal--hero"><p className="eyebrow">Beyond project management / 08</p><h2>Sailoom：<br />让 Agent 工作成为可见、可验收的组织能力</h2><p>为了让AP01的流程更清晰，我进行了一次对多项目、多框架 AI 工作如何被组织、验收与复用的持续探索。</p></header>

    <article className="sailoom-scene sailoom-reveal sailoom-reveal--scene"><div className="sailoom-copy"><p className="scene-index">01 / PROJECT WORKSPACE</p><h3>从找 Agent 聊天，走向进入项目工作台</h3><p>一个项目空间应当让人自然看到当前可用的 Agent、Skill、任务、结果和最近进展。探索性对话、明确任务和循环任务可以共存，但真实项目工作不应继续散落在不同聊天窗口里。</p><p>对话可以保留自由；一旦形成需要交付、验收或复用的工作，就应归入对应的项目语境。</p></div><figure className="sailoom-image"><img src={asset('sailoom-entrance.jpeg')} alt="Sailoom 项目工作区入口截图" /></figure></article>

    <article className="sailoom-scene sailoom-scene--reverse sailoom-reveal sailoom-reveal--scene"><figure className="sailoom-image sailoom-image--board"><img src={asset('Sailoom-taskboard.jpeg')} alt="Sailoom 任务泳道看板截图" /></figure><div className="sailoom-copy"><p className="scene-index">02 / TASK CLOSURE</p><h3>任务看板：状态机轮转形成一条可回看的闭环</h3><p>任务要回答的是：在什么项目里，用哪个经过验证的能力，处理什么输入，最后交付什么人类可检查的结果。</p><div className="sailoom-state-line"><span>待准备</span><i>→</i><span>已就绪</span><i>→</i><span>运行中</span><i>→</i><span>待查看 / 待验收</span><i>→</i><span>已完成</span></div><p className="scene-note">失败、返工、等待决策不是异常状态，而是业务工作流中应被明确呈现和处理的正常分支。</p></div></article>

    <article className="sailoom-layers sailoom-reveal sailoom-reveal--scene"><p className="scene-index">03 / THREE DISTINCT LAYERS</p><h3>区分业务任务、任务状态和工作流</h3><div className="sailoom-layer-grid"><div><span>业务任务</span><p>对人有意义的工作，例如完成一个商品场景图需求或生成一份调研结论。</p></div><div><span>工作流</span><p>这项工作需要经过哪些步骤、谁接力，以及何时需要人作出判断。</p></div><div><span>Agent 运行</span><p>某个 Agent 在工作流某一步实际执行的一次具体工作，保留过程和结果证据。</p></div></div><p className="sailoom-layer-close">任务、工作流和运行记录分层后，人可以看清进展、理解为什么需要介入，也能只对某一步返工或重试。</p></article>

    <article className="sailoom-architecture sailoom-reveal sailoom-reveal--scene"><div><p className="scene-index">04 / CORE + PLUGINS</p><h3>平台核心保持稳定，能力按项目需要接入</h3><p>核心负责项目空间、任务、运行历史、产物、验收、权限和台账；不同 Agent 框架、Skill、工作流、知识库、数据来源与结果视图则作为能力组合接入。</p></div><div className="sailoom-plugin-stack"><div className="sailoom-core"><b>STABLE CORE</b><strong>任务 · 运行 · 台账 · 看板 · 验收 · 权限</strong></div><div className="sailoom-plugin-row"><span>Agent 适配</span><span>Skill / 能力包</span><span>工作流</span><span>项目知识</span></div><div className="sailoom-plugin-row"><span>数据来源</span><span>结果视图</span><span>通知协作</span><span>项目专属界面</span></div></div></article>

    <article className="sailoom-boundary sailoom-reveal sailoom-reveal--scene"><div><p className="scene-index">CURRENT STAGE</p><h3>初版开发，将以 AP01 作为 v1 试点</h3></div><div><p>当前已具备核心骨架、任务/运行/台账/看板、OpenClaw 试点接入以及可运行的对话、任务看板和设置界面。</p><p>通用多框架执行器注入、热加载、插件/技能市场、跨平台桌面壳和服务器化多租户仍属于后续阶段。现阶段首先要验证的是：人是否能仅凭看板完成“提出任务 → Agent 运行 → 结果归位 → 验收/返工 → 有效做法复用”的真实闭环。</p></div></article>
  </section>
}
