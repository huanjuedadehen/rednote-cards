import { useState } from "react"
import { templates } from "@/templates/registry"
import { buildPages } from "@/templates/base"
import type { CardTemplate } from "@/templates/base"
import { X, Check } from "lucide-react"

interface TemplateModalProps {
  current: CardTemplate
  onConfirm: (template: CardTemplate) => void
  onClose: () => void
}

export function TemplateModal({ current, onConfirm, onClose }: TemplateModalProps) {
  const [selected, setSelected] = useState<CardTemplate>(current)

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-card"
      style={{ fontFamily: "inherit" }}
    >
      {/* 顶栏 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
        <h2 className="text-base font-semibold text-foreground">选择模板</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            <Check size={14} />
            使用此模板
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* 模板网格 */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          }}
        >
          {templates.map((t) => {
            const isSelected = selected.id === t.id
            const isCurrent = current.id === t.id
            const previewPage = buildPages(t.defaultData)[0]

            return (
              <button
                key={t.id}
                onClick={() => setSelected(t)}
                className={`flex flex-col rounded-2xl border-2 overflow-hidden text-left transition-all group ${
                  isSelected
                    ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                    : "border-border hover:border-primary/40 hover:shadow-md hover:scale-[1.01]"
                }`}
                style={{ transition: "all 0.18s cubic-bezier(0.4,0,0.2,1)" }}
              >
                {/* 卡片缩略图 */}
                <div
                  className="relative w-full overflow-hidden bg-secondary/20 flex-shrink-0 flex items-start justify-center"
                  style={{ height: 210 }}
                >
                  <div
                    style={{
                      width: 414,
                      height: 552,
                      transform: "scale(0.363)",
                      transformOrigin: "top center",
                      pointerEvents: "none",
                      flexShrink: 0,
                    }}
                  >
                    {t.render(previewPage)}
                  </div>

                  {/* 选中遮罩 */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/8 flex items-start justify-end p-2">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
                        <Check size={11} className="text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>

                {/* 名称 + 描述 */}
                <div className="px-3 py-2.5 bg-card">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-medium text-foreground leading-tight">
                      {t.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded leading-none">
                        当前
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-0.5 block">
                    {t.description}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
