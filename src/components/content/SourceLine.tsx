export function SourceLine({ definition, period, source }: { definition: string; period: string; source: string }) {
  return <details className="source-line"><summary>查看指标口径与来源</summary><dl><div><dt>口径</dt><dd>{definition}</dd></div><div><dt>期间</dt><dd>{period}</dd></div><div><dt>来源</dt><dd>{source}</dd></div></dl></details>
}
