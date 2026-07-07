import type { CardTemplate, PageRenderData } from "@/templates/base"

interface PreviewProps {
  template: CardTemplate
  pages: PageRenderData[]
  pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export function Preview({ template, pages, pageRefs }: PreviewProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs text-muted-foreground">
        预览 · {template.name}
        {pages.length > 1 && ` · ${pages.length} 页`}
      </div>
      <div className="flex flex-col gap-4">
        {pages.map((page, i) => (
          <div
            key={i}
            ref={(el) => { pageRefs.current[i] = el }}
            style={{
              width: 414,
              height: 552,
              overflow: "hidden",
              borderRadius: 8,
              boxShadow: "0 4px 24px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            {template.render(page)}
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">
        1242 x 1656 px（3倍导出）
      </div>
    </div>
  )
}