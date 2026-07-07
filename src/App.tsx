import { useState, useRef, useMemo } from "react"
import { templates } from "./templates/registry"
import type { CardTemplate, CardData } from "./templates/base"
import { buildPages } from "./templates/base"
import { Editor } from "./components/Editor"
import { Preview } from "./components/Preview"
import { TemplateSelector } from "./components/TemplateSelector"
import { TemplateModal } from "./components/TemplateModal"
import { ExportButton } from "./components/ExportButton"

function App() {
  const [template, setTemplate] = useState<CardTemplate>(templates[0])
  const [data, setData] = useState<CardData>({ ...templates[0].defaultData })
  const [modalOpen, setModalOpen] = useState(false)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])

  const pages = useMemo(() => buildPages(data), [data])

  pageRefs.current.length = pages.length

  function handleTemplateChange(t: CardTemplate) {
    setTemplate(t)
    // 如果用户还没编辑过（内容与当前模板默认数据一致），才加载新模板的示例数据
    const curDefault = template.defaultData
    const isUntouched =
      data.title === curDefault.title &&
      data.tags.join() === curDefault.tags.join() &&
      data.pages.join() === curDefault.pages.join()
    if (isUntouched) {
      setData({ ...t.defaultData })
    }
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 顶栏 */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-primary tracking-tight">
            小红书卡片生成器
          </h1>
          <span className="text-xs text-muted-foreground">
            输入内容 → 选模板 → 导出图片
          </span>
        </div>
      </header>

      {/* 主体 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧：编辑区 */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <TemplateSelector
              current={template}
              onClickChange={() => setModalOpen(true)}
            />
            <Editor data={data} onChange={setData} />
            <ExportButton
              pageRefs={pageRefs}
              pageCount={pages.length}
            />
          </div>

          {/* 右侧：预览区 */}
          <div className="flex-shrink-0 flex justify-center lg:self-start">
            <Preview
              template={template}
              pages={pages}
              pageRefs={pageRefs}
            />
          </div>
        </div>
      </main>

      {/* 模板选择弹层 */}
      {modalOpen && (
        <TemplateModal
          current={template}
          onConfirm={handleTemplateChange}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App