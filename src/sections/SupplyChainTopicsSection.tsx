import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

type TopicTab = 'warehouse' | 'packing' | 'forecast'
type ForecastMethod = { id: string; label: string; formula: string[]; title: string; logic: string; calculation: string; notes?: string[] }

type WarehouseSlide = { kicker: string; title: string; lead: string; content: ReactNode }

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${encodeURIComponent(name)}`

const forecastSymbols: Record<string, string[]> = {
  decomposition: ['Dₜ：第 t 期实际需求', 'Lₜ：基础需求水平', 'Tₜ：趋势成分', 'Sₜ：季节性成分'],
  'moving-average': ['yₜ：第 t 期预测值', 'Dᵢ：第 i 期实际需求', 'N：纳入平均的历史期数', 'wᵢ：第 i 期的权重'],
  exponential: ['yₜ：本期预测值', 'Dₜ₋₁：上一期实际需求', 'yₜ₋₁：上一期预测值', 'α：平滑因子，取值在 0 到 1 之间'],
  holt: ['Iₜ：本期需求水平估计', 'Sₜ：本期趋势估计', 'α：水平更新速度', 'β：趋势更新速度'],
  winters: ['Iₜ：去季节化后的水平估计', 'Sₜ：趋势估计', 'cₜ：季节系数', 'α / β / γ：水平、趋势、季节的更新因子', 'N：一个完整季节周期的长度'],
  bass: ['P(t)：时点 t 的购买概率', 'D(t)：截至 t 的累计需求', 'p：创新系数（外部影响）', 'q：模仿系数（已有用户影响）', 'm：潜在市场总规模'],
  leading: ['ρₖ：滞后 k 期时的相关系数', 'Dᴬ：先行产品的需求序列', 'Dᴮ：目标产品的需求序列', 'k：A 相对 B 的领先/滞后期数'],
  logit: ['Pₙᵢ：用户 n 选择选项 i 的概率', 'Vₙᵢ：用户 n 对选项 i 的代表效用', 'Σⱼ：对所有可选项 j 求和', 'e：自然常数，确保概率为正并可归一化'],
}

const forecastMethods: ForecastMethod[] = [
  { id: 'decomposition', label: '需求构成', formula: ['Dₜ = 系统成分 + 随机成分', '系统成分 = Lₜ + Tₜ + Sₜ'], title: '先判断需求中哪些部分可被解释', logic: '需求并不是完全随机的。系统成分是可以从历史或业务规律中识别的部分；随机成分则是难以提前解释的噪声。预测的工作不是消灭误差，而是尽可能识别前者、理解后者。', calculation: 'L（Level）表示长期基础需求水准；T（Trend）表示随时间持续上升或下降的方向；S（Seasonality）表示在固定周期内重复出现的高低波动。不同模型的区别，在于它们分别如何估计这三类成分。', notes: ['L：需求水平', 'T：需求趋势', 'S：季节性因素'] },
  { id: 'moving-average', label: '移动平均', formula: ['yₜ = (1 / N) Σ Dᵢ', '加权：yₜ = ΣwᵢDᵢ / Σwᵢ'], title: '用最近 N 期需求的平均值，平滑短期波动', logic: '适用于没有明显趋势、也没有强季节性的相对平稳需求。它不试图解释变化原因，只将最近一段历史的平均水平作为下一期预测。', calculation: '简单移动平均给最近 N 期同等权重；加权移动平均允许近期需求权重更高。N 越大，结果越平滑但对变化反应越慢；N 越小，反应更快但更容易受噪声影响。' },
  { id: 'exponential', label: '一次指数平滑', formula: ['yₜ = αDₜ₋₁ + (1 − α)yₜ₋₁'], title: '用新观测值逐步修正上一期预测', logic: '本质上仍是加权平均，但不必保存一整段历史数据。近期观测权重最大，越早的数据权重以指数形式递减。', calculation: 'α 是平滑因子：α 较大时更相信最新实际值，预测反应快；α 较小时更相信原有预测，结果更平稳。适用于平稳需求。' },
  { id: 'holt', label: 'Holt趋势平滑', formula: ['yₜ = Iₜ₋₁ + Sₜ₋₁', 'Iₜ = αDₜ + (1−α)(Iₜ₋₁+Sₜ₋₁)', 'Sₜ = β(Iₜ−Iₜ₋₁)+(1−β)Sₜ₋₁'], title: '在平滑需求水平的同时，持续估计趋势', logic: '当需求存在持续上涨或下滑时，只用一次平滑会系统性滞后。Holt 法把“当前水平”和“变化速度”拆开更新。', calculation: 'Iₜ 是当前需求水平估计，Sₜ 是趋势估计；预测由上一期水平加趋势得到。α 控制水平更新，β 控制趋势更新，适用于有趋势、季节性不明显的序列。' },
  { id: 'winters', label: 'Holt-Winters', formula: ['Iₜ = α(Dₜ / cₜ₋ₙ) + (1−α)(Iₜ₋₁+Sₜ₋₁)', 'Sₜ = β(Iₜ−Iₜ₋₁)+(1−β)Sₜ₋₁', 'cₜ = γ(Dₜ / Iₜ)+(1−γ)cₜ₋ₙ'], title: '将水平、趋势与季节性同时纳入预测', logic: '当需求既有长期变化，也有重复的旺淡季波动时，需要把季节影响从实际需求中分离出来，再判断真实水平与趋势。', calculation: '先用上一周期季节系数 cₜ₋ₙ 对需求去季节化，更新水平 Iₜ 和趋势 Sₜ；再用新水平反推并更新季节系数 cₜ。γ 控制季节因子的更新速度。' },
  { id: 'bass', label: 'Bass扩散', formula: ['P(t) = p + (q / m)D(t)', 'D(t) = m · [1−e⁻⁽ᵖ⁺ᑫ⁾ᵗ] / [1+(q/p)e⁻⁽ᵖ⁺ᑫ⁾ᵗ]'], title: '为缺少历史数据的新产品描述扩散路径', logic: '新产品的购买由两股力量驱动：p 表示外部影响带来的创新者购买，q 表示已有用户影响带来的模仿购买，m 是潜在市场规模。', calculation: '先估计市场规模与创新/模仿参数，再得到累计需求的 S 型曲线与需求率的钟形曲线。适合讨论产品生命周期和扩散节奏，不适合直接替代成熟 SKU 的短期补货预测。' },
  { id: 'leading', label: '先行指标', formula: ['ρₖ = Corr(Dᴬₜ, Dᴮₜ₊ₖ)'], title: '用相似产品更早出现的需求变化，帮助判断新产品', logic: '当目标产品自身历史很短时，可寻找同类别、需求模式可复现的先行产品。它不是把别人的销量直接复制过来，而是识别两者的领先—滞后关系。', calculation: '计算不同滞后期 k 下的相关系数 ρₖ，筛选高于阈值且滞后合理的候选指标。若产品 A 领先产品 B 三个月，A 当前的变化就可作为 B 未来变化的参考信号。' },
  { id: 'logit', label: '多元Logit', formula: ['Pₙᵢ = eⱽⁿⁱ / Σⱼeⱽⁿʲ'], title: '从“消费者会选哪个”理解需求概率', logic: '与时间序列只看过去销量不同，Logit 将需求理解为消费者在多个选项间的选择结果。效用 Vₙᵢ 越高，选择该选项的概率越大。', calculation: '为每个用户—选项组合估计代表效用 Vₙᵢ，再通过 Softmax 归一化成概率。可用于价格、属性、广告等因素影响下的品类选择或需求分配分析。' },
]

function PackingTopic() {
  return <div className="packing-page"><div><p className="warehouse-kicker">3D BIN PACKING / ONGOING AP WORK</p><h3>装柜不是把空间“塞满”，而是在可执行约束下找到更好的组合</h3><p className="warehouse-lead">三维装箱同样属于 NP-hard 组合优化：箱规、体积、重量、朝向、叠放规则和多 SKU 拼柜会使候选堆叠方式快速膨胀。当前 AP 相关工作仍在继续验证。</p><div className="packing-points"><div><b>优化目标</b><p>提高装载率、减少不必要开柜，同时满足货型、安全与目的仓约束。</p></div><div><b>工厂协同</b><p>效率高但堆叠复杂的方案，可能增加工厂装柜执行难度；算法可行不等于现场可执行。</p></div><div><b>现实边界</b><p>装柜会反向约束分仓与拼柜方案，不能把它视为分仓之后完全独立的下游步骤。</p></div></div></div><div className="packing-callout"><span>正在推进</span><strong>后续会在真实箱规、装柜规则与工厂执行反馈之间，继续验证算法结果是否可用。</strong></div></div>
}

function ForecastTopic() {
  const [methodId, setMethodId] = useState(forecastMethods[0].id)
  const active = forecastMethods.find((method) => method.id === methodId) ?? forecastMethods[0]
  const symbols = forecastSymbols[active.id] ?? []
  return <div className="forecast-topic"><div className="forecast-methods" role="tablist" aria-label="需求预测方法"><div className="forecast-rail" />{forecastMethods.map((method, index) => <button key={method.id} role="tab" aria-selected={method.id === active.id} className="forecast-pill" style={{ '--step': index } as CSSProperties} onClick={() => setMethodId(method.id)}><span>{method.label}</span></button>)}</div><article className="forecast-detail" key={active.id}><p className="warehouse-kicker">FORECAST METHOD</p><h3>{active.title}</h3><div className="forecast-formulas">{active.formula.map((formula) => <code key={formula}>{formula}</code>)}</div><div className="forecast-copy"><section><b>模型逻辑</b><p>{active.logic}</p></section><section><b>如何计算</b><p>{active.calculation}</p></section><section className="forecast-symbols"><b>符号含义</b><div>{symbols.map((symbol) => <span key={symbol}>{symbol}</span>)}</div></section>{active.notes && <section className="forecast-notes">{active.notes.map((note) => <span key={note}>{note}</span>)}</section>}</div></article></div>
}

const warehouseSlides: WarehouseSlide[] = [
  {
    kicker: '01 / FROM FUNCTION TO PROBLEM',
    title: '从 IT 分仓功能开始',
    lead: '分仓专项最初从配合 IT 测试既有功能开始：能否将未来两周需求、实际可回货供应、人工确认、装柜模拟、费用测算与 FBX 备货动作串成可用的业务链路。',
    content: <div className="warehouse-first-page"><div className="warehouse-flow"><div><span>需求</span><p>展示料号未来两周发货需求</p></div><i>→</i><div><span>供给</span><p>拉取订单内可满足的供应量</p></div><i>→</i><div><span>确认</span><p>人工调整并确认发货数据</p></div><i>→</i><div><span>模拟</span><p>装柜与头尾程费用测算</p></div><i>→</i><div><span>执行</span><p>对接 FBX 备货动作</p></div></div><div className="warehouse-issues"><div className="warehouse-statement"><b>测试结论</b><strong>现有分仓功能尚难直接进入业务使用。</strong><p>功能能够描述一个计算流程，但输入、约束与输出结果还不足以支撑真实发运决策。</p></div><div className="issue-list"><div><span>01</span><p><b>操作不贴合实际</b>：不同货型 SKU 一起模拟时，容易出现装不满或无法自然处理的情况。</p></div><div><span>02</span><p><b>装柜结果不稳定</b>：算法结果与实际经验存在出入，影响使用者对测算结论的信任。</p></div><div><span>03</span><p><b>场景兼容不完整</b>：VC 订单等业务场景暂不兼容既有逻辑，无法覆盖真实操作边界。</p></div><div><span>04</span><p><b>费用结论不够可解释</b>：仓租、尾程与装柜等关键假设变化时，无法清楚说明方案为何更优。</p></div></div></div></div>,
  },
  {
    kicker: '02 / MODEL LITERACY',
    title: 'UFLP：现实问题的数学边界',
    lead: '设施选址理论提供了很好的思考语言，但不是把课本模型直接套到分仓业务上。理解“像什么、又不像什么”，比匆忙套用求解器更重要。',
    content: <div className="warehouse-model-page"><div className="uflp-model"><div><span>UFLP</span><h4>无容量限制固定成本选址</h4><p>在候选地点中选择开哪些设施，并把每个需求点分配给已开设施，使“固定开设成本 + 运输成本”最小。</p></div><div className="uflp-formula"><span>OBJECTIVE</span><strong>min Σ fⱼyⱼ + Σ dᵢⱼxᵢⱼ</strong><p>开仓与客户分配都是离散决策。</p></div></div><div className="model-contrast"><div><span>理论模型的前提</span><p>候选地点可自由开设；设施无容量上限；客户分配与运输成本可明确表达。</p></div><div><span>我们的真实场景</span><p>合作仓库地址已固定；不在“选址建仓”。整柜容量、箱规、柜型、拼柜和一批货选哪家供应商等离散约束，都会改变可行解。</p></div><div><span>重新定义问题</span><p>它更接近“固定仓网下的配送网络设计 + 整柜发运/装柜组合优化”，不是经典 UFLP 的直接实例。</p></div></div><div className="complexity-strip"><div><b>P 类问题</b><p>存在能在多项式时间内求解的算法；例如固定方案下的部分线性成本计算或最短路径类子问题。</p></div><div><b>NP 类问题</b><p>给定一个候选解，可在多项式时间内验证它是否满足条件、成本是否正确。</p></div><div><b>为什么是 NP-hard</b><p>区域覆盖、供应商/仓网、开柜数、SKU 分配与拼柜相互耦合，候选组合会随规模迅速膨胀；它同时带有固定费用网络流与装箱问题的组合特征。</p></div></div></div>,
  },
  {
    kicker: '03 / TOOL PROTOTYPE',
    title: '确定性测算 + AI 参与解释和辅助判断',
    lead: '在可控的五区区域级抽象下，将可复算的成本比较与 AI 决策辅助分开处理。',
    content: <div className="warehouse-tool-page"><div className="tool-responsibilities"><div><span>CODE / ENGINE</span><h4>确定性引擎</h4><p>枚举区域组合、匹配费率、合计成本、保留参数版本；同一输入必须得到同一输出。</p></div><div><span>AI / COPILOT</span><h4>解释与辅助</h4><p>解释成本差异、识别临界选择、整理非标准输入、生成核验清单；不虚构费率，不替代计算。</p></div><div><span>HUMAN / REVIEW</span><h4>确认边界</h4><p>确认数据口径、服务要求、业务偏好与最终采用方案。工具给出带条件的比较，人工承担判断。</p></div></div><figure className="warehouse-tool-shot"><img src={asset('分仓策略工具.jpeg')} alt="SKU 长期分仓策略工具界面截图" /></figure></div>,
  },
]

function WarehouseDeck() {
  const [page, setPage] = useState(0)
  const slide = warehouseSlides[page]
  const previous = () => setPage((current) => Math.max(0, current - 1))
  const next = () => setPage((current) => Math.min(warehouseSlides.length - 1, current + 1))

  return <div className="warehouse-deck">
    <button className={`warehouse-arrow warehouse-arrow--prev ${page === 0 ? 'is-disabled' : ''}`} onClick={previous} disabled={page === 0} aria-label="查看上一页">←</button>
    <article className="warehouse-slide" key={page}>
      <p className="warehouse-kicker">{slide.kicker}</p><h3>{slide.title}</h3><p className="warehouse-lead">{slide.lead}</p>{slide.content}
    </article>
    <button className={`warehouse-arrow warehouse-arrow--next ${page === warehouseSlides.length - 1 ? 'is-disabled' : ''}`} onClick={next} disabled={page === warehouseSlides.length - 1} aria-label="查看下一页">→</button>
    <div className="warehouse-pagination" aria-label="分仓专项页面导航">{warehouseSlides.map((_, index) => <button key={index} className={index === page ? 'is-active' : ''} onClick={() => setPage(index)} aria-label={`查看第 ${index + 1} 页`} />)}</div>
  </div>
}

export function SupplyChainTopicsSection() {
  const [tab, setTab] = useState<TopicTab>('warehouse')
  const { ref, isVisible } = useRevealOnView<HTMLElement>({ selector: '.supply-reveal' })

  return <section ref={ref} id="supply-chain-topics" className={`supply-section ${isVisible ? 'is-revealed' : ''}`}>
    <div className="supply-heading supply-reveal supply-reveal--heading"><div><p className="eyebrow">Supply chain exploration / 02</p><h2>供应链重点专题问题初探索</h2></div><p>2026春节前</p></div>
    <div className="topic-tabs supply-reveal supply-reveal--tabs" role="tablist" aria-label="供应链专题">
      <button role="tab" aria-selected={tab === 'warehouse'} onClick={() => setTab('warehouse')}>分仓专项</button>
      <button role="tab" aria-selected={tab === 'packing'} onClick={() => setTab('packing')}>三维装箱问题</button>
      <button role="tab" aria-selected={tab === 'forecast'} onClick={() => setTab('forecast')}>需求预测专题</button>
    </div>
    <div className="topic-panel supply-reveal supply-reveal--panel">{tab === 'warehouse' ? <WarehouseDeck /> : tab === 'packing' ? <PackingTopic /> : <ForecastTopic />}</div>
  </section>
}
