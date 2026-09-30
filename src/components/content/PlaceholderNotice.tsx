import type { ContentStatus } from '../../content/report.types'

const statusLabels: Record<ContentStatus, string> = { ready: '已核实', 'needs-data': '待补数据', 'needs-copy': '待补文案', 'needs-asset': '待补素材' }

export function PlaceholderNotice({ status, children }: { status: ContentStatus; children: string }) {
  if (status === 'ready') return null
  return <p className="placeholder-notice"><span>{statusLabels[status]}</span>{children}</p>
}
