import { useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

type ProjectId = 'ap01' | 'ap02' | 'ap03' | 'ap04' | 'ap06' | 'ap10' | 'ap05-ap09'
type Project = { id: ProjectId; label: string; image?: string; needsMedia?: boolean }

const projects: Project[] = [
  { id: 'ap01', label: 'AP01', image: '01-ap01-agent-image-line-v2-retry.jpg' },
  { id: 'ap02', label: 'AP02', image: '02-ap02-restart-data-bottleneck.jpg', needsMedia: true },
  { id: 'ap03', label: 'AP03', image: '03-ap03-customer-service-dispatch-v2.jpg' },
  { id: 'ap04', label: 'AP04', image: '04-ap04-erp-digital-employee-platform-v2.jpg' },
  { id: 'ap06', label: 'AP06', image: '06-ap06-operations-bottleneck.jpg' },
  { id: 'ap10', label: 'AP10', image: '10-ap10-quality-app-constellation-v2.jpg', needsMedia: true },
  { id: 'ap05-ap09', label: 'AP05 · AP09' },
]

function ProjectTextState() {
  return <div className="ap-text-state"><div><p className="ap-state-label">AP05 / 开发板块</p><h3>业务优先，AI 先做少量辅助。</h3><p>开发板块当前开品压力较大，AI 用于少量开品辅助工作；重心仍在业务本身，不急于为了项目形式增加额外流程或负担。</p></div><div><p className="ap-state-label">AP09 / 品类</p><h3>九月中旬刚启动，团队仍在学习中。</h3><p>项目处于理解业务、学习方法和识别可切入场景的阶段，暂无明显成果；后续以真实问题和团队接受度为基础渐进式推进。</p></div></div>
}

export function ApProjectsSection() {
  const [selectedId, setSelectedId] = useState<ProjectId>('ap01')
  const [mediaOpen, setMediaOpen] = useState(false)
  const { ref, isVisible } = useRevealOnView<HTMLElement>()
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0]
  const selectProject = (id: ProjectId) => { setSelectedId(id); setMediaOpen(false) }

  return <section ref={ref} id="ap-projects" className={`ap-projects-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="ap-projects-heading ap-projects-reveal ap-projects-reveal--heading"><p className="eyebrow">AP projects / 07</p><h2>各 AP 项目的渐进式进展。</h2></header>
    <div className="ap-tabs ap-projects-reveal ap-projects-reveal--tabs" role="tablist" aria-label="AP 项目选择">{projects.map((project) => <button key={project.id} role="tab" aria-selected={project.id === selected.id} onClick={() => selectProject(project.id)}>{project.label}</button>)}</div>
    <div className="ap-project-panel ap-projects-reveal ap-projects-reveal--panel">{selected.image ? <figure className="ap-dashboard" key={selected.id}><img src={asset(selected.image)} alt={`${selected.label} 项目演示图`} />{selected.needsMedia && <button className="ap-media-trigger" type="button" onClick={() => setMediaOpen(true)}>▶ 播放补充素材</button>}</figure> : <ProjectTextState />}</div>
    {mediaOpen && <div className="ap-media-modal" role="dialog" aria-modal="true" aria-label={`${selected.label} 补充素材`}><button className="ap-media-close" type="button" onClick={() => setMediaOpen(false)}>×</button><div className="ap-media-placeholder"><p>{selected.label} · EXTRA MATERIAL</p><strong>补充视频/图片素材待放入</strong><span>将对应文件放入 public/assets 后，可在此处直接播放或展示。</span></div></div>}
  </section>
}
