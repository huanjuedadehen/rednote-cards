import { buildPages } from "@/templates/base"
import type { CardTemplate } from "@/templates/base"
import { Repeat } from "lucide-react"

interface TemplateSelectorProps {
  current: CardTemplate
  onClickChange: () => void
}

export function TemplateSelector({ current, onClickChange }: TemplateSelectorProps) {
  const previewPage = buildPages(current.defaultData)[0]

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">当前模板</label>
      <div className="flex items-center gap-4 rounded-xl border border-border p-3 bg-card">
        {/* 缩略图 */}
        <div
          className="flex-shrink-0 rounded-lg overflow-hidden bg-secondary/30"
          style={{ width: 72, height: 96 }}
        >
          <div
            style={{
              width: 414,
              height: 552,
              transform: "scale(0.174)",
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
          >
            {current.render(previewPage)}
          </div>
        </div>

        {/* 名称 + 描述 */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">{current.name}</div>
          <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {current.description}
          </div>
        </div>

        {/* 更换按钮 */}
        <button
          onClick={onClickChange}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 active:scale-[0.97] transition-all flex-shrink-0"
        >
          <Repeat size={13} />
          更换模板
        </button>
      </div>
    </div>
  )
}
