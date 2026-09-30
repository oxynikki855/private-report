export type ContentStatus = 'ready' | 'needs-data' | 'needs-copy' | 'needs-asset'

export type Finding = { id: string; label: string; title: string; description: string; status: ContentStatus }
export type Metric = { label: string; value: string; description: string; definition: string; period: string; source: string; status: ContentStatus }
export type Decision = { id: string; type: string; title: string; description: string; status: ContentStatus }

export type ReportData = {
  meta: { title: string; year: string; team: string; period: string; version: string }
  hero: { eyebrow: string; title: string; highlightedTitle: string; summary: string }
  findings: Finding[]
  metric: Metric
  caseStudy: { title: string; summary: string; status: ContentStatus }
  decisions: Decision[]
}
