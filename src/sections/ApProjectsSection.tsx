import { useEffect, useRef, useState } from 'react'
import { useRevealOnView } from '../hooks/useRevealOnView'

const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

type ProjectId = 'ap01' | 'ap02' | 'ap03' | 'ap04' | 'ap06' | 'ap10' | 'ap05-ap09'
type MediaSlide = { kind: 'video'; src: string; title: string } | { kind: 'image'; src: string; title: string; alt: string }
type Project = { id: ProjectId; label: string; image?: string; media?: MediaSlide[] }

const projects: Project[] = [
  { id: 'ap01', label: 'AP01', image: '01-ap01-agent-image-line-v2-retry.jpg' },
  { id: 'ap02', label: 'AP02', image: '02-ap02-restart-data-bottleneck.jpg', media: [
    { kind: 'video', src: 'AP02-在途订单整体时间修改.mp4', title: '在途订单整体时间修改' },
    { kind: 'video', src: 'AP02-排柜批次修改.mp4', title: '排柜批次修改' },
    { kind: 'video', src: 'AP02播放素材.mp4', title: 'AP02 项目演示' },
  ] },
  { id: 'ap03', label: 'AP03', image: '03-ap03-customer-service-dispatch-v2.jpg' },
  { id: 'ap04', label: 'AP04', image: '04-ap04-erp-digital-employee-platform-v2.jpg' },
  { id: 'ap06', label: 'AP06', image: '06-ap06-operations-bottleneck.jpg' },
  { id: 'ap10', label: 'AP10', image: '10-ap10-quality-app-constellation-v2.jpg', media: [
    { kind: 'video', src: 'AP10-EIP录制.mp4', title: 'EIP 演示录制' },
    { kind: 'video', src: 'AP10-质量中台.mp4', title: '质量中台演示' },
  ] },
  { id: 'ap05-ap09', label: 'AP05 · AP09' },
]

function ProjectTextState() {
  return <div className="ap-text-state"><div><p className="ap-state-label">AP05 / 开发板块</p><h3>业务优先，AI 先做少量辅助。</h3><p>开发板块当前开品压力较大，AI 用于少量开品辅助工作；重心仍在业务本身，不急于为了项目形式增加额外流程或负担。</p></div><div><p className="ap-state-label">AP09 / 品类</p><h3>九月中旬刚启动，团队仍在学习中。</h3><p>项目处于理解业务、学习方法和识别可切入场景的阶段，暂无明显成果；后续以真实问题和团队接受度为基础渐进式推进。</p></div></div>
}

export function ApProjectsSection() {
  const [selectedId, setSelectedId] = useState<ProjectId>('ap01')
  const [mediaOpen, setMediaOpen] = useState(false)
  const [mediaIndex, setMediaIndex] = useState(0)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, isVisible } = useRevealOnView<HTMLElement>({ selector: '.ap-projects-reveal' })
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0]
  const media = selected.media ?? []
  const activeMedia = media[mediaIndex]
  const selectProject = (id: ProjectId) => { setSelectedId(id); setMediaOpen(false); setMediaIndex(0) }
  const pauseVideo = () => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0 }
  const closeMedia = () => { pauseVideo(); setMediaOpen(false); setMediaIndex(0); window.setTimeout(() => triggerRef.current?.focus(), 0) }
  const changeMedia = (index: number) => { pauseVideo(); setMediaIndex((index + media.length) % media.length) }
  const openMedia = () => { setMediaIndex(0); setMediaOpen(true) }

  useEffect(() => {
    if (!mediaOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMedia()
      if (event.target instanceof HTMLVideoElement) return
      if (event.key === 'ArrowLeft') changeMedia(mediaIndex - 1)
      if (event.key === 'ArrowRight') changeMedia(mediaIndex + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown) }
  }, [mediaOpen, mediaIndex])

  return <section ref={ref} id="ap-projects" className={`ap-projects-section ${isVisible ? 'is-revealed' : ''}`}>
    <header className="ap-projects-heading ap-projects-reveal ap-projects-reveal--heading"><p className="eyebrow">AP projects / 07</p><h2>各 AP 项目的渐进式进展</h2></header>
    <div className="ap-tabs ap-projects-reveal ap-projects-reveal--tabs" role="tablist" aria-label="AP 项目选择">{projects.map((project) => <button key={project.id} role="tab" aria-selected={project.id === selected.id} onClick={() => selectProject(project.id)}>{project.label}</button>)}</div>
    <div className="ap-project-panel ap-projects-reveal ap-projects-reveal--panel">{selected.image ? <figure className="ap-dashboard" key={selected.id}><img src={asset(selected.image)} alt={`${selected.label} 项目演示图`} />{media.length > 0 && <button ref={triggerRef} className="ap-media-trigger" type="button" onClick={openMedia}>▶ 查看 {media.length} 段补充素材</button>}</figure> : <ProjectTextState />}</div>
    {mediaOpen && activeMedia && <div className="ap-media-modal" role="dialog" aria-modal="true" aria-labelledby="ap-media-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMedia() }}><div className="ap-media-dialog"><header className="ap-media-header"><div><p>{selected.label} · EXTRA MATERIAL</p><h3 id="ap-media-title">{activeMedia.title}</h3></div><span>{mediaIndex + 1} / {media.length}</span><button ref={closeRef} className="ap-media-close" type="button" onClick={closeMedia} aria-label="关闭补充素材">×</button></header><div className="ap-media-stage">{activeMedia.kind === 'video' ? <video ref={videoRef} key={activeMedia.src} controls playsInline preload="metadata" aria-label={activeMedia.title}><source src={asset(activeMedia.src)} type="video/mp4" /></video> : <img src={asset(activeMedia.src)} alt={activeMedia.alt} />}</div><div className="ap-media-controls"><button type="button" onClick={() => changeMedia(mediaIndex - 1)} aria-label="上一段素材">←</button><div role="tablist" aria-label="补充素材选择">{media.map((item, index) => <button key={item.src} type="button" role="tab" aria-selected={index === mediaIndex} onClick={() => changeMedia(index)}>{index + 1}<span>{item.title}</span></button>)}</div><button type="button" onClick={() => changeMedia(mediaIndex + 1)} aria-label="下一段素材">→</button></div></div></div>}
  </section>
}
