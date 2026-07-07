import type { CardTemplate, CardData, PageRenderData } from "../base"

const defaultData: CardData = {
  title: "效率工作流分享",
  pages: [
    "<ol><li>用 Raycast 替代 Spotlight，启动应用、搜索文件快 3 倍</li><li>iTerm2 + oh-my-zsh，终端颜值与效率双提升</li><li>Karabiner 改键，CapsLock 变 Hyper Key</li><li>Rectangle 窗口管理，告别手动拖拽调整大小</li><li>Obsidian 双链笔记，知识管理从此有了体系</li></ol>",
  ],
  tags: ["效率工具", "MacBook", "工作流"],
}

const DOCK_ICONS = [
  { bg: "#4FC3F7", label: "F" },
  { bg: "#FF9800", label: "✉" },
  { bg: "#4CAF50", label: "◎" },
  { bg: "#2196F3", label: "♫" },
  { bg: "#9C27B0", label: "⚙" },
  { bg: "#FF5722", label: "▶" },
  { bg: "#00ACC1", label: "✏" }, // active
  { bg: "#607D8B", label: "≡" },
]

// 黄绿色机身
const BODY        = "#B8C840"
const BODY_LIGHT  = "#CCE050"
const BODY_DARK   = "#9AAA28"

function MacBookCard({ data }: { data: PageRenderData }) {
  const contentText = data.content.replace(/<[^>]*>/g, "").trim()
  const isTitleOnly = !!data.title && !contentText

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // 纯白背景，突出机身
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px 24px 24px",
        position: "relative",
        overflow: "hidden",
        fontFamily: '-apple-system, "SF Pro Display", "PingFang SC", sans-serif',
      }}
    >
      {/* ══ MacBook 整体容器 ══ */}
      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>

        {/* ── 上盖（屏幕）──  */}
        <div style={{
          width: "100%",
          position: "relative",
          borderRadius: "14px 14px 0 0",
          background: `linear-gradient(160deg, ${BODY_LIGHT} 0%, ${BODY} 60%, ${BODY_DARK} 100%)`,
          padding: "8px 8px 0",
          boxShadow: [
            "0 -1px 0 rgba(255,255,255,0.4)",
            "0 2px 0 rgba(0,0,0,0.08)",
            "0 8px 32px rgba(0,0,0,0.14)",
            "inset 0 1px 0 rgba(255,255,255,0.35)",
          ].join(", "),
        }}>

          {/* 屏幕黑边框 — 四周均匀细边 */}
          <div style={{
            borderRadius: "8px 8px 0 0",
            background: "#111111",
            padding: "3px 3px 0",
            overflow: "hidden",
          }}>

            {/* 屏幕画面 */}
            <div style={{
              borderRadius: "6px 6px 0 0",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}>

              {/* 壁纸：黄绿青胶囊气泡，参照图片色调 */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #F0F060 0%, #C8E820 15%, #80D840 30%, #40C878 45%, #60D8C8 60%, #A8E840 75%, #E8F040 90%, #F8F860 100%)",
              }} />
              {/* 气泡装饰，模拟图片中的胶囊形状 */}
              {[
                { left: "4%",  top: "8%",  w: 13, h: 72, bg: "rgba(240,220,40,0.7)",  r: 9 },
                { left: "17%", top: "2%",  w: 13, h: 85, bg: "rgba(160,220,40,0.75)", r: 9 },
                { left: "30%", top: "12%", w: 13, h: 65, bg: "rgba(80,200,120,0.7)",  r: 9 },
                { left: "43%", top: "5%",  w: 10, h: 40, bg: "rgba(80,210,200,0.65)", r: 7 },
                { left: "53%", top: "22%", w: 10, h: 28, bg: "rgba(100,200,220,0.6)", r: 7 },
                { left: "63%", top: "4%",  w: 13, h: 78, bg: "rgba(200,230,40,0.7)",  r: 9 },
                { left: "76%", top: "8%",  w: 13, h: 72, bg: "rgba(230,240,60,0.7)",  r: 9 },
                { left: "89%", top: "3%",  w: 10, h: 60, bg: "rgba(160,230,60,0.65)", r: 7 },
              ].map((b, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: b.left, top: b.top,
                  width: `${b.w}%`, height: `${b.h}%`,
                  borderRadius: b.r,
                  background: b.bg,
                  backdropFilter: "blur(2px)",
                }} />
              ))}

              {/* macOS 菜单栏 */}
              <div style={{
                position: "relative", zIndex: 10,
                height: 22, flexShrink: 0,
                background: "rgba(20,30,10,0.42)",
                backdropFilter: "blur(20px)",
                display: "flex", alignItems: "center",
                padding: "0 10px", gap: 9,
              }}>
                {/* Apple logo */}
                <svg width="9" height="11" viewBox="0 0 14 17" fill="rgba(255,255,255,0.88)">
                  <path d="M13.17 12.3c-.28.64-.61 1.23-1 1.76-.52.74-.95 1.25-1.27 1.53-.51.47-1.05.71-1.64.72-.42 0-.93-.12-1.52-.36-.59-.24-1.13-.36-1.62-.36-.52 0-1.07.12-1.67.36-.6.24-1.09.37-1.45.38-.57.02-1.12-.23-1.67-.74-.35-.31-.8-.84-1.34-1.59A11.6 11.6 0 0 1 .4 11.5C.14 10.56 0 9.65 0 8.77c0-1 .22-1.87.65-2.6A3.83 3.83 0 0 1 2.02 4.7c.57-.32 1.19-.48 1.85-.49.46 0 1.06.14 1.8.42.74.28 1.22.42 1.42.42.16 0 .7-.17 1.6-.5.86-.31 1.59-.44 2.18-.4 1.62.13 2.84.77 3.64 1.91a3.56 3.56 0 0 0-2.15 3.24c.01.87.23 1.64.68 2.31.44.64.96 1.14 1.54 1.48l-.41.21zM10.1.5c0 .68-.25 1.32-.74 1.9-.6.7-1.32 1.1-2.1 1.04a2.1 2.1 0 0 1-.02-.26c0-.66.29-1.36.8-1.93.25-.29.57-.53.97-.72C9.4.34 9.77.24 10.1.17c.01.11.01.22.01.33z"/>
                </svg>
                {["Finder","文件","编辑","显示","窗口"].map((m) => (
                  <span key={m} style={{ fontSize: 7.5, color: "rgba(255,255,255,0.82)", letterSpacing: 0.1 }}>{m}</span>
                ))}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                  {/* WiFi */}
                  <svg width="10" height="8" viewBox="0 0 11 9" fill="none">
                    <path d="M5.5 8a.6.6 0 1 0 0-1.2A.6.6 0 0 0 5.5 8z" fill="rgba(255,255,255,0.85)"/>
                    <path d="M3.2 5.5a3.2 3.2 0 0 1 4.6 0" stroke="rgba(255,255,255,0.75)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
                    <path d="M1.2 3.2a6 6 0 0 1 8.6 0" stroke="rgba(255,255,255,0.5)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
                  </svg>
                  {/* 电量 */}
                  <div style={{ width: 17, height: 8, border: "0.8px solid rgba(255,255,255,0.5)", borderRadius: 2, padding: 1.5, position: "relative" }}>
                    <div style={{ width: "90%", height: "100%", background: "#34C759", borderRadius: 0.5 }}/>
                    <div style={{ position: "absolute", right: -2.5, top: 2, width: 1.5, height: 4, background: "rgba(255,255,255,0.4)", borderRadius: "0 1px 1px 0" }}/>
                  </div>
                  <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>09:41</span>
                </div>
              </div>

              {/* Pages 文档窗口 */}
              <div style={{
                position: "relative", zIndex: 5,
                margin: "6px 7px 0",
                borderRadius: "6px 6px 0 0",
                background: "#F5F5F5",
                boxShadow: "0 4px 20px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.12)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                // 高度撑满到 Dock 上方
                minHeight: 0,
                height: 180,
              }}>
                {/* 标题栏 */}
                <div style={{
                  height: 22, flexShrink: 0,
                  background: "linear-gradient(180deg, #EAEAEA 0%, #DEDEDE 100%)",
                  borderBottom: "1px solid #C8C8C8",
                  display: "flex", alignItems: "center",
                  padding: "0 8px", position: "relative",
                }}>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    {["#FF5F57","#FFBD2E","#28C840"].map((c) => (
                      <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }}/>
                    ))}
                  </div>
                  <span style={{
                    position: "absolute", left: "50%", transform: "translateX(-50%)",
                    fontSize: 7.5, color: "#555", fontWeight: 600,
                  }}>
                    ✏️ {data.title ? (data.title.length > 18 ? data.title.slice(0,17)+"…" : data.title) : "无标题文稿"}
                  </span>
                </div>

                {/* 工具栏 */}
                <div style={{
                  height: 19, flexShrink: 0,
                  background: "#F8F8F8",
                  borderBottom: "1px solid #E2E2E2",
                  display: "flex", alignItems: "center",
                  padding: "0 7px", gap: 4,
                }}>
                  {["B","I","U","⁋","≡"].map((t) => (
                    <div key={t} style={{
                      width: 12, height: 12, borderRadius: 2,
                      background: "#EBEBEB", border: "1px solid #D0D0D0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 6, color: "#444", fontWeight: 700,
                    }}>{t}</div>
                  ))}
                  <div style={{ flex: 1 }}/>
                  <span style={{ fontSize: 6.5, color: "#999" }}>Pages</span>
                </div>

                {/* 文档内容 */}
                <div style={{
                  flex: 1, display: "flex",
                  background: "#D8D8D8",
                  padding: "5px 5px 0",
                  overflow: "hidden",
                }}>
                  <div style={{
                    flex: 1, background: "#FFF",
                    borderRadius: "2px 2px 0 0",
                    boxShadow: "0 1px 5px rgba(0,0,0,0.12)",
                    padding: "9px 11px 7px",
                    display: "flex", flexDirection: "column",
                    overflow: "hidden",
                  }}>
                    {isTitleOnly ? (
                      <div style={{
                        flex: 1, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", textAlign: "center",
                      }}>
                        <h1 style={{ fontSize: 13, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.3, lineHeight: 1.4 }}>
                          {data.title}
                        </h1>
                      </div>
                    ) : (
                      <>
                        {data.title && (
                          <div style={{ marginBottom: 6, flexShrink: 0 }}>
                            <h1 style={{ fontSize: 11, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.2, lineHeight: 1.4 }}>
                              {data.title}
                            </h1>
                            <div style={{ height: 0.5, background: "rgba(0,0,0,0.07)", marginTop: 4 }}/>
                          </div>
                        )}
                        <div
                          className="tpl-macbook-body"
                          style={{ flex: 1, overflow: "hidden", position: "relative" }}
                          dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                        {data.tags.length > 0 && (
                          <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 5, flexShrink: 0 }}>
                            {data.tags.map((tag) => (
                              <span key={tag} style={{
                                fontSize: 7, color: "#007AFF",
                                background: "rgba(0,122,255,0.07)",
                                padding: "1px 5px", borderRadius: 3,
                                fontWeight: 500, border: "1px solid rgba(0,122,255,0.1)",
                              }}>#{tag}</span>
                            ))}
                          </div>
                        )}
                        {data.pageInfo && (
                          <div style={{ textAlign: "center", marginTop: 3, flexShrink: 0 }}>
                            <span style={{ fontSize: 6.5, color: "rgba(0,0,0,0.18)", letterSpacing: 0.5 }}>
                              {data.pageInfo.current} / {data.pageInfo.total}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Dock 栏 */}
              <div style={{
                position: "relative", zIndex: 10,
                height: 32, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                paddingBottom: 3,
              }}>
                <div style={{
                  display: "flex", alignItems: "flex-end", gap: 3,
                  background: "rgba(255,255,255,0.22)",
                  backdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.38)",
                  borderRadius: 10, padding: "3px 6px 4px",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)",
                }}>
                  {DOCK_ICONS.map((ic, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 4,
                        background: ic.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 7.5, color: "#fff", fontWeight: 700,
                        boxShadow: i === 6
                          ? "0 0 0 1.5px rgba(255,255,255,0.7), 0 2px 6px rgba(0,0,0,0.2)"
                          : "0 1px 3px rgba(0,0,0,0.18)",
                      }}>
                        {ic.label}
                      </div>
                      <div style={{
                        width: 2.5, height: 2.5, borderRadius: "50%",
                        background: i === 6 ? "rgba(255,255,255,0.9)" : "transparent",
                      }}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Apple Logo 上盖背面正中 */}
          <div style={{
            position: "absolute", top: "44%", left: "50%",
            transform: "translate(-50%,-50%)", opacity: 0.18,
          }}>
            <svg width="22" height="26" viewBox="0 0 14 17" fill={BODY_LIGHT}>
              <path d="M13.17 12.3c-.28.64-.61 1.23-1 1.76-.52.74-.95 1.25-1.27 1.53-.51.47-1.05.71-1.64.72-.42 0-.93-.12-1.52-.36-.59-.24-1.13-.36-1.62-.36-.52 0-1.07.12-1.67.36-.6.24-1.09.37-1.45.38-.57.02-1.12-.23-1.67-.74-.35-.31-.8-.84-1.34-1.59A11.6 11.6 0 0 1 .4 11.5C.14 10.56 0 9.65 0 8.77c0-1 .22-1.87.65-2.6A3.83 3.83 0 0 1 2.02 4.7c.57-.32 1.19-.48 1.85-.49.46 0 1.06.14 1.8.42.74.28 1.22.42 1.42.42.16 0 .7-.17 1.6-.5.86-.31 1.59-.44 2.18-.4 1.62.13 2.84.77 3.64 1.91a3.56 3.56 0 0 0-2.15 3.24c.01.87.23 1.64.68 2.31.44.64.96 1.14 1.54 1.48l-.41.21zM10.1.5c0 .68-.25 1.32-.74 1.9-.6.7-1.32 1.1-2.1 1.04a2.1 2.1 0 0 1-.02-.26c0-.66.29-1.36.8-1.93.25-.29.57-.53.97-.72C9.4.34 9.77.24 10.1.17c.01.11.01.22.01.33z"/>
            </svg>
          </div>
        </div>

        {/* 转轴细条 */}
        <div style={{
          width: "100%", height: 4,
          background: `linear-gradient(180deg, ${BODY_DARK} 0%, #7A8A18 100%)`,
          boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
        }}/>

        {/* 底部边缘倒角条（模拟底座衔接） */}
        <div style={{
          width: "98%", height: 6,
          background: `linear-gradient(180deg, ${BODY_DARK} 0%, ${BODY} 100%)`,
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
        }}/>
      </div>
    </div>
  )
}

export const macbookTemplate: CardTemplate = {
  id: "macbook",
  name: "MacBook",
  description: "Apple MacBook 外观，macOS 桌面壁纸 + Dock + Pages 文档窗口，适合效率、技术分享类内容",
  render: (data) => <MacBookCard data={data} />,
  defaultData,
}
