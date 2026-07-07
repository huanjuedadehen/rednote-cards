import type { CardData } from "@/templates/base"
import { RichTextEditor } from "./RichTextEditor"
import { Plus, Trash2 } from "lucide-react"

interface EditorProps {
  data: CardData
  onChange: (data: CardData) => void
}

export function Editor({ data, onChange }: EditorProps) {
  function handleTitleChange(value: string) {
    onChange({ ...data, title: value })
  }

  function handlePageChange(index: number, html: string) {
    const pages = [...data.pages]
    pages[index] = html
    onChange({ ...data, pages })
  }

  function handleAddPage() {
    onChange({ ...data, pages: [...data.pages, "<p></p>"] })
  }

  function handleRemovePage(index: number) {
    if (data.pages.length <= 1) return
    const pages = data.pages.filter((_, i) => i !== index)
    onChange({ ...data, pages })
  }

  function handleTagsChange(value: string) {
    const tags = value
      .split(/[,，、\s]+/)
      .map((t) => t.replace(/^#/, "").trim())
      .filter(Boolean)
    onChange({ ...data, tags })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* 标题 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">标题</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="输入卡片标题"
          className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* 多页编辑 */}
      <div className="flex flex-col gap-4">
        {data.pages.map((pageContent, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                第 {i + 1} 页
              </label>
              {data.pages.length > 1 && (
                <button
                  onClick={() => handleRemovePage(i)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={12} />
                  删除此页
                </button>
              )}
            </div>
            <RichTextEditor
              content={pageContent}
              onChange={(html) => handlePageChange(i, html)}
              placeholder={`第 ${i + 1} 页内容...`}
            />
          </div>
        ))}

        <button
          onClick={handleAddPage}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        >
          <Plus size={14} />
          添加一页
        </button>
      </div>

      {/* 标签 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          标签
          <span className="text-muted-foreground font-normal ml-1">
            （用空格或逗号分隔）
          </span>
        </label>
        <input
          type="text"
          value={data.tags.map((t) => `#${t}`).join(" ")}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="#标签1 #标签2"
          className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>
    </div>
  )
}