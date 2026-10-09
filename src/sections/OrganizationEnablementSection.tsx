import { useRevealOnView } from '../hooks/useRevealOnView'

const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

export function OrganizationEnablementSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>()

  return <section ref={ref} id="organization-enablement" className={`org-enable-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="org-enable-hero org-enable-reveal org-enable-reveal--hero"><p className="eyebrow">Organization enablement / 06</p><h2><span>个人提效到<span className="org-enable-emphasis">组织提效</span></span><span>向业务辐射和赋能</span></h2><p>个人工作面板的经验，只有被迁移到可共享的数据、规则、权限和工作入口中，才有机会成为组织真正能够使用的能力。</p></header>

    <article className="org-enable-scene org-enable-reveal org-enable-reveal--scene"><div className="org-enable-copy"><p className="scene-index">01 / TALENT DATA PRODUCT</p><h3>从个人面板经验出发，为人才发展部构建更全面的数据看板</h3><p>这里不是把数据重新放到一个漂亮页面上，而是先让数据链路、统计口径和报表输出成为稳定可运行的产品能力。</p><div className="org-enable-points"><div><b>每日自动拉取</b><p>数据从 eHR 系统定时拉取，各项统计口径实时计算与刷新。</p></div><div><b>秒级生成报表</b><p>提供导出能力，快速输出高质量、可直接使用的培训报表。</p></div><div><b>人机共治</b><p>Agent 原生可操纵；权限可管理、规则可配置，关键动作可以被追溯。</p></div></div></div><figure className="org-enable-image"><img src={asset('PXKB-1.jpeg')} alt="人才发展培训数据看板截图" /></figure></article>

    <article className="org-enable-scene org-enable-scene--reverse org-enable-reveal org-enable-reveal--scene"><figure className="org-enable-image"><img src={asset('PXKB-2.jpeg')} alt="Agent 参与培训数据消费截图" /></figure><div className="org-enable-copy"><p className="scene-index">02 / AGENT DATA CONSUMPTION</p><h3>让 Agent 参与数据消费，而不只是搬运工</h3><p>在可信看板之上，Agent 可以按需析出结论，协助完成零散的额外积分记录；人不必再依赖记忆或在多张表之间反复核对。</p><div className="org-enable-points"><div><b>自由析出结论</b><p>从看板和已整理的数据中按问题提取所需结论，而不是重新搬运原始数据。</p></div><div><b>语音记录动作</b><p>通过语音指挥 Agent 处理零散的额外积分记录，减少临时手工操作。</p></div><div><b>留痕与审计</b><p>积分统计不再依赖个人记忆，数据、规则与写入动作均可查看和审计。</p></div></div></div></article>

    <figure className="org-enable-full-image org-enable-reveal org-enable-reveal--image"><img src={asset('02-repair-data-pipe-agent-patrol.jpg')} alt="数据管道修复与 Agent 巡检结论图" /></figure>

    <article className="org-enable-ap org-enable-reveal org-enable-reveal--scene"><div className="org-enable-ap-heading"><p className="scene-index">03 / AP TRAINING & FEISHU ECOSYSTEM</p><h3>AP 项目的培训与飞书小生态</h3></div><div className="org-enable-ap-grid"><div><span>飞书组织认证</span><p>赛维时代 Hard BU AP 项目团队完成飞书组织认证；飞书机器人可以按业务需要自建，相比企微提供更灵活、更稳定的协作入口。</p></div><div><span>渐进式项目启动</span><p>各 AP 项目渐进式启动：有的提升对 Skill 的理解，有的已经走向轻量开发，以真实场景持续验证。</p></div><div><span>方法或工具</span><p>Skill 本质上仍是高效且结构化的提示词。何时教方法、何时给工具，需要协助业务做好判断，而不是把所有问题都交给同一种形式。</p></div></div></article>

    <figure className="org-enable-full-image org-enable-full-image--last org-enable-reveal org-enable-reveal--image"><img src={asset('03-skill-to-tool-boundary.jpg')} alt="从 Skill 到工具边界的结论图" /></figure>
  </section>
}
