import { useRevealOnView } from '../hooks/useRevealOnView'

const capabilityLayers = [
  ['业务理解与 AI 原生重构', '看懂流程、角色、输入输出、规则与例外；找出真实瓶颈；重构人和 AI 的分工；判断从小痛点到正式项目的优先级。'],
  ['技术判断与实现理解', '拆清资料、规则、模型、工具、权限、人工确认、输出和评测；判断何时先做 Prompt/Skill，何时需要工具、接口或正式系统。'],
  ['技术语言翻译与协作推进', '把技术选择翻译为业务流程、投入、风险、责任与验收标准；分别与业务、IT、管理层建立可理解的协作语言。'],
]

const deliverySteps = ['场景进入', '业务诊断', '方案共创', '最小验证', '生产化与采用', '效果复盘', '能力沉淀与扩展']

export function InternalFdeSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>()

  return <section ref={ref} id="internal-fde" className={`fde-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="fde-hero fde-reveal fde-reveal--hero"><p className="eyebrow">Future planning / 12</p><h2>后续的可能方向：<br />内部 FDE 团队</h2><p>FDE（Forward Deployed Engineer）更熟悉业务现场，也理解 AI 和技术实现的边界。它的职责是连接业务、AI 与 IT，把真实问题转化为可验证、可采用、可复用的能力。</p><span>讨论稿 · 团队设计 v0.1</span></header>

    <article className="fde-positioning fde-reveal fde-reveal--section"><div><p className="scene-index">TEAM POSITIONING</p><h3>业务拥有问题与结果，IT 拥有技术底座，FDE 拥有从问题到 AI 落地的转化过程。</h3></div><div className="fde-role-map"><div><b>业务主管 / 专家</b><p>定义问题重要性，提供规则、例外、案例与验收标准，推动试用并确认业务价值。</p></div><i>→</i><div className="fde-role-map--focus"><b>内部 AI FDE</b><p>诊断问题、重构流程、设计验证、组织交付、推动采用，并沉淀可复用能力。</p></div><i>→</i><div><b>IT / 数据团队</b><p>提供系统接口、数据权限、服务器、安全、稳定性与企业级技术支持。</p></div></div></article>

    <article className="fde-capabilities fde-reveal fde-reveal--section"><p className="scene-index">CORE CAPABILITY MODEL</p><h3>团队的价值在于能否把业务问题转成可落地的 AI 方案</h3><div className="fde-capability-grid">{capabilityLayers.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{text}</p></div>)}</div><div className="fde-transverse"><b>贯穿全程：结果复盘与知识沉淀</b><p>它决定团队是在重复做项目，还是在积累组织能力；项目应留下经验卡、方法、Skill、工具、评测、知识资产或正式产品能力。</p></div></article>

    <article className="fde-delivery fde-reveal fde-reveal--section"><div><p className="scene-index">DELIVERY LOOP</p><h3>诊断、共创、生产、沉淀</h3><p>业务部门提出“想做一个 AI 工具”时，FDE 先将它转为问题定义，再共创解决方案。以实际投入使用为验收标准，项目经验在团队内循环吸收。</p></div><ol>{deliverySteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b></li>)}</ol><p className="fde-delivery-note">停止也是正常结论：当资料不可用、规则不稳定、风险过高或价值不足时，应及时结束低价值试验，并留下可供下一次判断的复盘。</p></article>

    <article className="fde-growth fde-reveal fde-reveal--section"><p className="scene-index">TALENT PATH & PERSONAL FOCUS</p><h3>以 AI 原生思维的年轻人为主，通过真实任务培养，而不是只靠课程和工具培训。</h3><div className="fde-growth-grid"><div className="fde-growth-path"><span>我的下一阶段</span><h4>聚焦 AP06：销售运营板块的 AI 落地。</h4><p>销售运营连接数据、流程、系统、权限和实际经营动作，业务核心且复杂；这也与后续运营轮岗方向相契合。需求预测项目继续定期向王总汇报，并行推进数据、模型与补货判断的验证。</p></div><div className="fde-growth-path"><span>应届生培养</span><h4>从供应链轮岗，逐步成长为供应链方向 FDE。</h4><p>通过“研究任务 → 业务场景映射 → 最小实现/验证 → 结果复盘 → 可复用资产”的任务式路径，在真实流程中理解供应链、AI 和技术协同。</p></div></div><div className="fde-levels"><div><b>L1</b><span>场景观察者</span></div><div><b>L2</b><span>场景实践者</span></div><div><b>L3</b><span>域 FDE</span></div><div><b>L4</b><span>域负责人 / FDE Lead</span></div></div></article>

    <article className="fde-future-close fde-reveal fde-reveal--section"><p>不比拼团队的Agent/skill数量，</p><h3>而关注多少真实业务问题被稳定改善，<br />并沉淀为团队可复用能力。</h3></article>
  </section>
}
