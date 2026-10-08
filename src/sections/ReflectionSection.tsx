import { useRevealOnView } from '../hooks/useRevealOnView'

const reflections = [
  {
    number: '01',
    phrase: '学得越慢，学得越快。',
    body: 'AI 的模型、产品与方法更新得过快。暂时错过某一个月的新工具，并不意味着永远落后；下一个月的更新可能已经改变了上一轮讨论的重心。真正困难的是，既不想错过，又无法把所有新东西都变成自己的长期负担。表面上 AI 带来提效，个人体验却常常是信息密度、选择成本和持续学习压力被同时放大。',
    question: '怎样在前沿敏感度与有限精力之间建立可持续节奏？',
    view: '我的判断：不必把“知道”当作“必须立即掌握”。可以保持高频扫描，但把深度投入留给与当前业务问题相遇的少数方向；学习的速度，最终由筛选、验证与放弃的速度决定。',
  },
  {
    number: '02',
    phrase: '懂得越多，懂得越少。',
    body: '以知识库为例：我已经知道文件系统加索引、RAG 切分与向量召回、Graph 关系等多种形态，也开始知道建设时需要关注来源、检索、结构、更新与权限。但进入企业场景后，真正的问题变成：从哪里开始？怎样验证网上的方法是否有价值？怎样在已有思路上继续开发和改善？知道的选择越多，起点反而越不确定。',
    question: '知识和方法进入企业，如何从“知道很多可能”走到“验证一个可用起点”？',
    view: '我的判断：这不是知识不足，而是需要把知识转成实验设计。先选一个边界小、可回退、能被业务用户判断的场景，提前写清它解决什么、什么算有效、失败后学到什么；让结果而不是方法名决定下一步。',
  },
  {
    number: '03',
    phrase: '做得越好，做得越差。',
    body: 'AI 能给出的成品越来越精美，人的预期也被同步抬高。以这次 HTML 报告为例：过去不会想象用页面和动效来讲述，如今可以大胆设想；但对这种方法还不够熟悉时，AI 根据描述做出的结果与预期仍会有很大落差。更高能力模型也让“一句提示词做出惊艳成品”的案例越来越常见，反而让熟悉流程、组件、转场的人怀疑：这些知识会不会变成对 AI 发挥的限制？',
    question: '人类怎样既给 AI 足够空间，又能稳定得到自己真正想要的结果？',
    view: '我的判断：知识本身不是限制，过早把实现路径写死才可能成为限制。高能力模型适合接收目标、受众、边界和验收标准，再自行探索；模型能力或任务风险不足时，人需要补充结构和细节。好的协作不是提示词越短或越长，而是人清楚哪些该定义、哪些该放手。',
  },
]

export function ReflectionSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>()

  return <section ref={ref} id="reflection" className={`reflection-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="reflection-hero reflection-reveal reflection-reveal--hero"><p className="eyebrow">Frontier exploration & reflection / 11</p><h2>当 AI 变得更强，<br />人的位置也需要重新学习。</h2><p>持续跟进前沿带来的不只是更多工具，也带来对学习、知识、能力和团队关系的重新理解。</p></header>
    <div className="reflection-list">{reflections.map((item, index) => <article className={`reflection-item reflection-item--${index + 1} reflection-reveal reflection-reveal--item`} style={{ '--reflection-delay': `${index * 150}ms` } as React.CSSProperties} key={item.number}><div className="reflection-phrase"><span>{item.number}</span><h3>{item.phrase}</h3></div><div className="reflection-reading"><p>{item.body}</p><p className="reflection-question">{item.question}</p><aside className="reflection-view"><span>我的判断</span><p>{item.view}</p></aside></div></article>)}</div>
    <article className="reflection-team reflection-reveal reflection-reveal--team"><p className="scene-index">FROM PERSONAL CAPABILITY TO TEAM EXPERIENCE</p><h3><span>项目能成功，</span><em>是因为有我。</em><span>项目不成功，</span><em>也可能是因为有我。</em></h3><div className="reflection-team-tension"><p>个人经验可以快速推动事情开始；但当团队对“资深玩家”的依赖过深，成员会在“该怎么开始”时先来找答案，而不是自己尝试、自己得到 AI 的 aha moment。</p><p>团队不必先理解所有术语、组件或方法，才有资格使用 AI。更重要的是提供低门槛、可控、能获得反馈的工作入口，让成员用自己的语言尝试，并在真正需要时再获得帮助。</p></div><p className="reflection-team-close">下一阶段：从给出做法的人，逐步成为搭建环境、设置边界、帮助团队自己获得经验的人。</p></article>
  </section>
}
