# 小红书卡片生成器

一款在线卡片图片生成工具，专为小红书内容创作场景设计。提供多种精心设计的模板，支持富文本编辑、多页分页、一键导出 PNG/ZIP。

## 功能特性

- **多样模板** — 11 款风格各异的卡片模板，覆盖日记、科技、艺术、读书、便签等主题
- **富文本编辑** — 基于 Tiptap，支持粗体、斜体、标题、列表、分割线、代码块等常用格式
- **多页编辑** — 支持将长内容拆分为多页卡片，页码自动显示，列表编号跨页连续
- **实时预览** — 编辑即时呈现，所见即所得，预览尺寸为 414×552（对应 3× 输出 1242×1656）
- **一键导出** — 单页导出 PNG，多页自动打包为 ZIP
- **字数统计** — 全文总字数动态计算，部分模板支持阅读时间估算

## 模板列表

| 模板 | 风格描述 |
|------|---------|
| 干货清单 | 毛玻璃卡片 + 多彩渐变，适合技巧分享、清单类内容 |
| 笔记段落 | 书卷纸质感 + 引号装饰，适合感悟、故事、日记类内容 |
| 科技数码 | 赛博暗色调 + 霓虹发光线条，适合科技、工具、数码类内容 |
| 艺术画框 | 水彩色块 + 画框边线 + 优雅衬线体，适合美学、感悟、摄影类内容 |
| Kindle Oasis | 高度还原 Kindle Oasis 3 外观，适合读书笔记、摘抄 |
| iPhone 17 | Apple iPhone 17 风格，Dynamic Island + 状态栏，适合日常记录 |
| MacBook | Apple MacBook 外观，macOS 桌面 + Pages 文档窗口 |
| FC 红白机 | 8-bit 像素风格，复古游戏卡带感 |
| 日记便签 | 浅绿纸张质感，墨绿大标题，手写日记风格 |
| 公众号长文 | 米白背景 + 植物水印，超大粗体标题，严肃阅读氛围 |
| Text Note | 绿色粗边框便签，超大加粗标题，清新通透 |

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 3 |
| 富文本 | Tiptap 3 |
| 图片导出 | html-to-image + jszip |
| 中文字体 | LXGW 文泉驿（霞鹜文楷） |
| 图标 | Lucide React |

## 快速开始

**要求：** Node.js 18+，pnpm（推荐）

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## Docker 部署

项目提供 `docker.sh` 脚本统一管理容器生命周期。

```bash
# 赋予执行权限（首次使用）
chmod +x docker.sh

./docker.sh build      # 构建镜像
./docker.sh run        # 启动容器（镜像不存在时自动先 build）
./docker.sh stop       # 停止并移除容器
./docker.sh restart    # 重启容器
./docker.sh logs       # 实时查看日志（Ctrl+C 退出）
./docker.sh status     # 查看镜像和容器状态
./docker.sh clean      # 删除容器和镜像（有确认提示）
```

默认映射宿主机 `8080` 端口，可通过环境变量覆盖（仅对当次命令生效）：

```bash
PORT=3000 ./docker.sh run
```

启动后访问 `http://localhost:8080`。

## 项目结构

```
src/
├── components/
│   ├── Editor.tsx          # 标题、内容、标签编辑器
│   ├── RichTextEditor.tsx  # Tiptap 富文本编辑器
│   ├── Preview.tsx         # 卡片预览区域
│   ├── ExportButton.tsx    # PNG / ZIP 导出
│   ├── TemplateSelector.tsx # 模板切换按钮
│   └── TemplateModal.tsx   # 模板选择弹窗
├── templates/
│   ├── base.ts             # 模板接口定义 & buildPages 逻辑
│   ├── registry.ts         # 模板注册表
│   ├── checklist/          # 干货清单
│   ├── essay/              # 笔记段落
│   ├── tech/               # 科技数码
│   ├── art/                # 艺术画框
│   ├── kindle/             # Kindle Oasis
│   ├── iphone17/           # iPhone 17
│   ├── macbook/            # MacBook
│   ├── fc8bit/             # FC 红白机
│   ├── journal/            # 日记便签
│   ├── article/            # 公众号长文
│   └── textnote/           # Text Note
├── App.tsx
└── index.css               # 全局样式 & 各模板富文本样式
```

## 新增模板

1. 在 `src/templates/` 下新建目录，创建 `index.tsx`
2. 实现 `CardTemplate` 接口：

```typescript
export interface CardTemplate {
  id: string                              // 唯一标识
  name: string                            // 显示名称
  description: string                     // 简介
  render: (data: PageRenderData) => ReactNode  // 渲染函数
  defaultData: CardData                   // 示例数据
}
```

3. 在 `src/templates/registry.ts` 中 import 并添加到 `templates` 数组
4. 如需自定义富文本样式，在 `src/index.css` 中添加 `.tpl-<id>-body` 相关样式

## 数据流

```
用户输入（Editor）
  ↓  CardData { title, pages[], tags[] }
buildPages()
  ↓  PageRenderData[] { title, content, tags, pageInfo, listStartIndex, totalCharCount }
Template.render()
  ↓
预览（Preview）→ 导出（ExportButton）
```

## License

[MIT](./LICENSE)
