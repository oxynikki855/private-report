import { useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

const principles = [
  ['季节性朴素法先行', '第一版先建立可解释的 seasonal-naive baseline；LightGBM / GBDT 只有在严格验证中优于 baseline 后才进入比较。'],
  ['Walk-forward 验证', '按预测截点向前滚动验证，不随机切分时间序列；每个特征都必须在当时真实可得。'],
  ['可实现销量', '库存、下架、断货和供应限制会影响观测销量。当前试点面向补货，重点预测在供给约束下可实现的销量。'],
  ['版本化预测', '预测按 forecast origin 与 target month 保留版本。新的月度预测可以修正未承诺决策，但不覆盖当时实际采用过的判断。'],
]

const slowLayerInputs = [
  ['历史销量与当前日均量', '内部销售实际、近期可售日均量。', '作为基准需求的核心证据，学习稳定的销量水平与短期动量。'],
  ['季节性、生命周期与市场趋势', '月份/节假日、产品阶段、关键词市场趋势、排名/评价/退款。', '作为连续可更新的结构性特征，帮助模型区分品类周期、竞争力和市场背景。'],
  ['价格、广告、促销与业务已知信息', '价格快照、已知促销计划、广告预算/活动、销售提前获知的业务信息。', '只有在预测截点已审批或已知时才可进入模型；实际发生后的数据只用于复盘。'],
  ['库存位置与提前期', '在库、在途、可售状态、分仓位置、海运/备货周期。', '作为可实现销量和补货 horizon 的供给约束，连接预测与采购决策。'],
]

const fastLayerInputs = [
  ['链接与平台事件', '审核、下架、限流、Buy Box、平台政策变化。', '标记销售通道突发阻断，避免被慢层错误学习为需求自然下滑。'],
  ['供应与物流异常', '断货、入仓延误、供应商交期、港口/航线/运价变化。', '提示到货和可售能力变化，触发人工核验或供给侧调整。'],
  ['外部环境冲击', '天气预警、关税/政治、黑天鹅类低频事件。', '由 Agent 监控、组织证据和解释影响；不将没有历史先例的冲击硬塞进历史权重。'],
]

export function DemandForecastSection() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>({ selector: '.forecast-reveal' })
  const [forecastLaunchState, setForecastLaunchState] = useState<'idle' | 'launching' | 'ready' | 'error'>('idle')
  const [worldLaunchState, setWorldLaunchState] = useState<'idle' | 'launching' | 'ready' | 'error'>('idle')

  const launchDemo = async (target: 'forecast' | 'worldmonitor') => {
    const setState = target === 'forecast' ? setForecastLaunchState : setWorldLaunchState
    setState('launching')
    try {
      const response = await fetch(`/__local-demo/${target}`, { method: 'POST' })
      if (!response.ok) throw new Error('服务启动失败')
      const payload = await response.json() as { url: string }
      window.open(payload.url, '_blank', 'noopener,noreferrer')
      setState('ready')
    } catch {
      setState('error')
    }
  }

  return <section ref={ref} id="demand-forecast" className={`forecast-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="forecast-hero forecast-reveal forecast-reveal--hero"><p className="eyebrow">Forecasting project / 09</p><h2>需求预测：<br />历史规律和突发事件结合</h2><p>需求预测项目连接分仓、库存与采购决策。当前从 US 市场两个 SPU 试点开始：AMB005585、AM002971。</p></header>

    <div className="forecast-command forecast-reveal forecast-reveal--command"><div><p className="scene-index">DEMO / LOCAL SERVICES</p><h3>把预测规律与外部事件放在同一套判断框架中查看</h3><p>AP02 演示展示慢层/快层因子如何进入预测系统；WorldMonitor 用于观察外部环境、物流、政策与突发事件等快层信号。</p></div><div className="forecast-launch-group"><div><button type="button" className="forecast-launch" onClick={() => launchDemo('forecast')} disabled={forecastLaunchState === 'launching'}>{forecastLaunchState === 'launching' ? '正在启动 AP02…' : '▶ 打开 AP02 预测演示'}</button>{forecastLaunchState === 'ready' && <p className="forecast-launch-status">AP02 演示已打开</p>}{forecastLaunchState === 'error' && <p className="forecast-launch-status is-error">AP02 服务启动失败</p>}</div><div><button type="button" className="forecast-launch forecast-launch--secondary" onClick={() => launchDemo('worldmonitor')} disabled={worldLaunchState === 'launching'}>{worldLaunchState === 'launching' ? '正在启动 WorldMonitor…' : '▶ 打开 WorldMonitor'}</button>{worldLaunchState === 'ready' && <p className="forecast-launch-status">WorldMonitor 已打开</p>}{worldLaunchState === 'error' && <p className="forecast-launch-status is-error">WorldMonitor 服务启动失败</p>}</div></div></div>

    <article className="forecast-principles forecast-reveal forecast-reveal--section"><p className="scene-index">01 / MODEL DISCIPLINE</p><h3>先让每一个模型结论经得起时间和数据口径的检验</h3><div className="forecast-principle-grid">{principles.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{text}</p></div>)}</div></article>

    <article className="forecast-input-map forecast-reveal forecast-reveal--section"><header><p className="scene-index">02 / INPUTS INTO TWO LAYERS</p><h3>同一份数据，不同的时间性质，进入不同处理层</h3><p>判断一个数据该放在哪里，先看它是否稳定、可重复、能在预测时点获得；再看它是否代表突发事件或供给异常。模型负责从稳定证据中学习规律，Agent 负责把变化中的事件带回人类判断。</p></header><div className="forecast-input-columns"><section className="forecast-input-column forecast-input-column--slow"><div className="input-column-head"><span>慢层 · 基准预测</span><p>进入可验证的模型特征与补货约束</p></div>{slowLayerInputs.map(([title, source, handling]) => <div className="forecast-input-row" key={title}><h4>{title}</h4><p><b>来源</b>{source}</p><p><b>处理</b>{handling}</p></div>)}</section><section className="forecast-input-column forecast-input-column--fast"><div className="input-column-head"><span>快层 · 事件监控</span><p>由 Agent 发现、整理证据并提示人判断</p></div>{fastLayerInputs.map(([title, source, handling]) => <div className="forecast-input-row" key={title}><h4>{title}</h4><p><b>来源</b>{source}</p><p><b>处理</b>{handling}</p></div>)}</section></div></article>

    <article className="forecast-two-layer forecast-reveal forecast-reveal--section"><div className="forecast-layer forecast-layer--slow"><p>慢层 · 基准预测</p><h3>历史销量、季节性、生命周期、可售库存与稳定市场信号</h3><span>模型负责学习可重复、可在预测时点获得的规律。</span></div><div className="forecast-layer-connector"><i>+</i><span>人机协同</span></div><div className="forecast-layer forecast-layer--fast"><p>快层 · 事件监控</p><h3>促销、链接状态、供应异常、物流、政策和环境事件</h3><span>Agent 负责发现规律可能失效的变化，组织证据并提示人工判断。</span></div></article>

    <article className="forecast-boundary forecast-reveal forecast-reveal--section"><div><p className="scene-index">03 / CURRENT STAGE</p><h3>历史探索留下了方法，也留下了需要重新验证的地方</h3></div><div><p>此前全品类实验积累了稀疏需求分层、季节性朴素/Croston 基线、LightGBM 特征和滚动验证等经验；其中一些指标只能作为历史实验记录，不能直接等同当前试点效果。</p><p>当前项目先围绕确认的试点数据、严格 walk-forward 回测与基准对比推进。价格、促销、广告、库存状态和外部市场信号将在数据定义清楚后逐组进入验证。</p></div></article>
  </section>
}
