import { useRevealOnView } from '../hooks/useRevealOnView'

const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

const reflections = [
  {
    number: '01',
    phrase: '学得越慢，学得越快。',
    body: 'AI 的模型、产品与方法更新得过快。暂时错过某一个月的新工具，并不意味着永远落后；下一个月的更新可能已经改变了上一轮讨论的重心。真正困难的是，既不想错过，又无法把所有新东西都变成自己的长期负担。表面上 AI 带来提效，个人体验却常常是信息密度、选择成本和持续学习压力被同时放大。',
    question: '怎样在前沿敏感度与有限精力之间建立可持续节奏？',
  },
  {
    number: '02',
    phrase: '懂得越多，懂得越少。',
    body: '以知识库为例：我已经知道文件系统加索引、RAG 切分与向量召回、Graph 关系等多种形态，也开始知道建设时需要关注来源、检索、结构、更新与权限。但进入企业场景后，真正的问题变成：从哪里开始？怎样验证网上的方法是否有价值？怎样在已有思路上继续开发和改善？知道的选择越多，起点反而越不确定。',
    question: '知识和方法进入企业，如何从“知道很多可能”走到“验证一个可用起点”？',
  },
  {
    number: '03',
    phrase: '做得越好，做得越差。',
    body: 'AI 能给出的成品越来越精美，人的预期也被同步抬高。以这次 HTML 报告为例：过去不会想象用页面和动效来讲述，如今可以大胆设想；但对这种方法还不够熟悉时，AI 根据描述做出的结果与预期仍会有很大落差。更高能力模型也让“一句提示词做出惊艳成品”的案例越来越常见，反而让熟悉流程、组件、转场的人怀疑：这些知识会不会变成对 AI 发挥的限制？',
    question: '人类怎样既给 AI 足够空间，又能稳定得到自己真正想要的结果？',
  },
]

export function ReflectionSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>({ selector: '.reflection-reveal' })

  return <section ref={ref} id="reflection" className={`reflection-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="reflection-hero reflection-reveal reflection-reveal--hero"><p className="eyebrow">Frontier exploration & reflection / 11</p><h2>AI 转型的矛盾与阵痛</h2></header>
    <div className="reflection-list">{reflections.map((item, index) => <article className={`reflection-item reflection-item--${index + 1} reflection-reveal reflection-reveal--item`} style={{ '--reflection-delay': `${index * 150}ms` } as React.CSSProperties} key={item.number}><div className="reflection-phrase"><span>{item.number}</span><h3>{item.phrase}</h3></div><div className="reflection-reading"><p>{item.body}</p><p className="reflection-question">{item.question}</p></div></article>)}</div>
    <article className="reflection-team reflection-reveal reflection-reveal--team"><p className="scene-index">FROM PERSONAL CAPABILITY TO TEAM EXPERIENCE</p><h3>团队如何跟上 AI 转型的脚步？</h3><p className="reflection-team-intro">我原来更在意怎样帮助整个团队提升对 AI 的认知水平，让大家理解得更多、用得更好。但在实际推进中，少数对 AI 感兴趣的人能够很快上手，也能做出令人惊讶的成果；当成果需要被更多同事使用时，能够迅速接纳并爆发式使用 AI 的人仍然只是少数。</p><div className="reflection-evidence-row"><div className="reflection-evidence-copy"><p>后来和一个外部团队沟通时，我发现他们把 AI OS、连接器、配置、Agent、Skill 和 Pipeline 等复杂内容都留在系统内部。用户面对的是一个轻量的 Bot：提出任务、查看任务状态，剩下的复杂度由系统吸收。</p></div><figure className="reflection-evidence paper-surface"><img src={asset('complexity-to-task-entrance.jpg')} alt="复杂的 Agent、Skill、连接器、配置与 Pipeline 被系统吸收后，用户通过一个 Bot 提交任务并查看提交、运行和完成状态的示意图" /><figcaption>复杂能力留在系统内部；人只面对任务入口和任务状态。</figcaption></figure></div><div className="reflection-evidence-row reflection-evidence-row--reverse"><figure className="reflection-evidence paper-surface"><img src={asset('department-bot-task-pipeline.jpg')} alt="部门 Bot 接收用户提交的任务并显示任务看板，预设 Pipeline 在后台调度多个 Agent 与 Skill 的示意图" /><figcaption>部门 Bot 接住任务，预设 Pipeline 在后台唤醒 Agent 与 Skill。</figcaption></figure><div className="reflection-evidence-copy"><p>其实 Sailoom 也在向类似的方向靠近，只不过我没有察觉到。销售提交一个需求后，可以看到任务是否运行、进展到哪里、结果何时返回；背后由什么 Agent 执行、怎样拆解、调用哪些 Skill，则由预设的 Pipeline 处理。</p></div></div></article>
  </section>
}
