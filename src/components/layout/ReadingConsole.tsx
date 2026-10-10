import { useEffect, useState } from 'react'
import { SectionNav } from './SectionNav'

const DEFAULT_INTENSITY = 1
const STORAGE_KEY = 'sailvan-report-ambient-intensity'

type ReadingConsoleProps = { onIntensityChange: (intensity: number) => void }

export function ReadingConsole({ onIntensityChange }: ReadingConsoleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [intensity, setIntensity] = useState(DEFAULT_INTENSITY)

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY))
    if (Number.isFinite(saved) && saved >= 0.35 && saved <= 1.6) setIntensity(saved)
  }, [])

  useEffect(() => {
    onIntensityChange(intensity)
    window.localStorage.setItem(STORAGE_KEY, String(intensity))
  }, [intensity, onIntensityChange])

  const percentage = Math.round(intensity * 100)

  return <aside className="reading-console"><button className="reading-console-toggle" type="button" aria-expanded={isOpen} aria-controls="reading-console-panel" onClick={() => setIsOpen((open) => !open)}>阅读控制台</button><div id="reading-console-panel" className="reading-console-panel" hidden={!isOpen}><div className="reading-console-control"><div><label htmlFor="ambient-intensity">背景浓度</label><output htmlFor="ambient-intensity">{percentage}%</output></div><input id="ambient-intensity" type="range" min="0.35" max="1.6" step="0.05" value={intensity} onChange={(event) => setIntensity(Number(event.target.value))} /><button type="button" onClick={() => setIntensity(DEFAULT_INTENSITY)}>恢复默认</button></div><SectionNav /></div></aside>
}
