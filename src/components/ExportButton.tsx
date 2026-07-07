import { useState } from "react"
import { toPng } from "html-to-image"
import JSZip from "jszip"
import { saveAs } from "file-saver"

interface ExportButtonProps {
  pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  pageCount: number
  fileName?: string
}

export function ExportButton({ pageRefs, pageCount, fileName = "xiaohongshu-card" }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  async function handleExport() {
    if (exporting) return
    setExporting(true)
    try {
      if (pageCount === 1) {
        // 单页直接下载 PNG
        const el = pageRefs.current[0]
        if (!el) return
        const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true })
        const a = document.createElement("a")
        a.href = dataUrl
        a.download = `${fileName}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        // 多页打包为 zip 下载
        const zip = new JSZip()
        for (let i = 0; i < pageCount; i++) {
          const el = pageRefs.current[i]
          if (!el) continue
          const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true })
          // dataUrl 格式: "data:image/png;base64,xxxxx"
          const base64 = dataUrl.split(",")[1]
          zip.file(`${fileName}-${i + 1}.png`, base64, { base64: true })
        }
        const blob = await zip.generateAsync({ type: "blob" })
        saveAs(blob, `${fileName}.zip`)
      }
    } catch (err) {
      console.error("导出失败", err)
    } finally {
      setExporting(false)
    }
  }

  const label = exporting
    ? "导出中..."
    : pageCount > 1
      ? `导出全部 ${pageCount} 页`
      : "导出图片"

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
        exporting
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
      }`}
    >
      {label}
    </button>
  )
}