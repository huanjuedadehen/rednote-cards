# AGENTS.md

## 常用命令

```bash
pnpm dev          # 开发服务器
pnpm build        # 先 typecheck（tsc -b），再构建（vite）
pnpm preview      # 预览生产构建
```

- 使用 **pnpm**，没有 package-lock.json，只有 `pnpm-lock.yaml`。
- 没有 lint 或 test 脚本。
- `pnpm build` 先跑 `tsc -b`。类型错误**会阻断**构建（`strict: true`, `noUnusedLocals`, `noUnusedParameters`）。

## 架构

单页 React 18 + Vite 6 应用。入口：`src/main.tsx` → `src/App.tsx`。

路径别名 `@/` → `src/`（同时在 `vite.config.ts` 和 `tsconfig.app.json` 中配置）。

CSS 工具函数：`src/lib/utils.ts` 导出 `cn()`（clsx + tailwind-merge）。

## 数据流

```
CardData { title, pages[], tags[] }
   → buildPages()  (src/templates/base.ts)
   → PageRenderData[] { title, content, tags, pageInfo, listStartIndex, totalCharCount }
   → template.render()
   → 预览 / 导出（html-to-image + jszip）
```

**`buildPages()` 中的分页逻辑：**
- `title` 仅在第 0 页设置，后续页为空字符串。
- `tags` 仅在**最后一页**设置，其余为空数组。
- `listStartIndex` 跨页累加 `<li>` 数量（用于跨页有序列表的编号连续性）。
- `totalCharCount` 每页相同（去 HTML 标签后的全文总字数）。

## 新增模板

1. 创建 `src/templates/<id>/index.tsx`，实现 `CardTemplate` 接口（见 `src/templates/base.ts:29`）。
2. 在 `src/templates/registry.ts` 中 import 并加入 `templates` 数组。
3. 如果模板需要自定义富文本样式，在 `src/index.css` 中添加 `.tpl-<id>-body` 样式规则。

## Docker

使用 `docker.sh` 脚本管理。默认宿主机端口 8080，可通过环境变量覆盖：`PORT=3000 ./docker.sh run`。
