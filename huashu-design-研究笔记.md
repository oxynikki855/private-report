# huashu-design 与两个 Showcase 研究笔记

> 调研日期：2026-09-28
> 目标：为本次**纯 HTML 工作汇报**建立一套可执行的视觉、叙事、交互与交付准则。
> 调研对象：[huashu-design](https://github.com/alchaincyf/huashu-design)、[鹦鹉进化史](https://www.huasheng.ai/parrots/)、[聊聊 Skill](https://skill-huasheng.vercel.app)。

## 一句话结论

本次报告不应模仿 PPT 的逐页容器，而应做成一篇具备**章节导航、阅读节奏、关键数据高潮、可追溯证据和有限交互**的数字报告。它可以有“演讲感”，但阅读主路径应当是滚动，而非翻页。

---

## 1. 三个参考对象分别教会我们什么

### 1.1 huashu-design：先建立“设计语法”，再生产页面

项目的主要方法不是某一个固定的视觉风格，而是一套从设计上下文到可验证交付物的工作流：

- **从真实上下文出发。** 对明确品牌，仓库要求先取得官方资产、提取色值，并以 CSS 变量固化，而不是凭记忆选色。[README：品牌资产协议](https://github.com/alchaincyf/huashu-design#品牌资产协议)
- **先做少量高差异样页，确认视觉语法。** 其 HTML deck 规范建议在批量制作前先完成两张视觉结构最不同的 showcase 页，以低成本验证字体、颜色、间距、章节结构和图文关系。[slide-decks.md：先做 2 页 showcase 定 grammar](https://github.com/alchaincyf/huashu-design/blob/main/references/slide-decks.md)
- **内容、数据、图像必须真实。** 鹦鹉案例先确定图像是内容所必需，再获取公共领域的博物插画；Skill 演讲案例强调真实 GitHub 数据与可验证规格，而非装饰性占位。[README：真实案例](https://github.com/alchaincyf/huashu-design#showcase--真实案例)
- **排印是主体，不是装饰。** 仓库明确倡导 CSS Grid、`text-wrap: pretty`、衬线 display 与无衬线正文的有理由搭配，反对默认的“紫色渐变、emoji、圆角卡片、Inter 大标题”等 AI 模板感组合。[README：反 AI slop 规则](https://github.com/alchaincyf/huashu-design#反-ai-slop-规则)
- **交付前必须在浏览器中验证。** 建议检查桌面与窄屏、多种交互状态、控制台错误和滚动中的布局；静态截图不足以验证真实体验。[verification.md](https://github.com/alchaincyf/huashu-design/blob/main/references/verification.md)

**对本次汇报的启发：**先确定“报告的编辑气质”和一组跨章节的设计 token，而不是先列目录、再把内容塞进统一卡片。

### 1.2 《鹦鹉进化史》：长卷叙事、章节锚点与证据感

该站点是典型的滚动叙事专题：顶部提供起源、谱系、巨兽、三大家族、智识、挽歌等章节入口；正文按“引子 → 起源 → 分类 → 代表物种 → 智力 → 灭绝 → 来源”推进。标题、短引言、年代/数量、图版说明和参考来源交替出现。[站点](https://www.huasheng.ai/parrots/)

值得借鉴的结构：

1. **封面先建立一个问题或观点。** 不是“工作汇报”四个字，而是让读者先理解本报告最值得花时间的结论。
2. **顶部目录是章节锚点。** 读者可按主线顺读，也能直达自己关心的部分。
3. **每章只承担一种叙事职能。** 如背景、问题、行动、成果、证据、下一步；避免一章里同时讲五件事。
4. **数据作为停顿和证据。** 年代、数量、比例在视觉上成为路标；不把所有数据缩成一张密集表。
5. **图注与来源是内容的一部分。** 不是末尾小字免责，而是让论证有可靠的档案感。
6. **末尾给出完整来源与边界。** 所有结论、数据口径、时间范围应可追溯。

**对本次汇报的启发：**适合采用“网页专题/年度信”形态：每一章以一个明确结论领起，正文和证据交替出现，末尾完整列出数据来源、口径及未完成项。

### 1.3 《聊聊 Skill》：舞台节奏与“先静后动”

README 说明该展示是 13 页 HTML deck，使用黑底极简衬线系统；其中的流程案例采取“完整静态 workflow dashboard 默认可见，观众点击播放后才以 cinematic overlay 动画呈现，结束后再回到 dashboard”的双层机制。[README：聊聊 Skill](https://github.com/alchaincyf/huashu-design#聊聊-skill--pm-after-party-演讲-deck)；站点首屏也可见页码、左右箭头以及键盘/点击操作提示。[站点](https://skill-huasheng.vercel.app)

值得借鉴的原则：

- **重要信息必须静态可读。** 动画是强化理解与控制节奏的第二层，不能是唯一载体。
- **转场服务于章节变化。** 暗底、巨字和留白可用于开章、转折、收束，而非每段内容都套一层动效。
- **将复杂过程先还原成看得清的图。** 先让人理解流程/结构，再决定是否播放演示。
- **演示状态可控。** 键盘快捷方式、页码或进度指示适合现场讲解，但它们不应干扰普通阅读。

**对本次汇报的启发：**可保留少量“舞台页”——封面、章节过渡、关键结论、收束——但主体仍是可自然滚读的长页。动效只用于锚定节奏、提示数据变化或解释一个复杂流程。

---

## 2. 建议采用的报告形态

### 核心形态：编辑型长卷报告（Editorial Scrollytelling）

- **主路径：**纵向滚动；章节可由固定/粘性目录跳转。
- **阅读单位：**每屏只强调一个结论、一个关键数据或一组证据。
- **节奏：**“大观点 → 证据/过程 → 数据停顿 → 下一观点”。
- **现场讲解：**可选“演讲模式”：全屏、`Space`/方向键逐节跳转；但不影响网页正常滚动。
- **静态备份：**最终应额外导出 PDF，便于留档和转发；HTML 是源文件与最佳阅读体验。

这是将 `parrots` 的专题叙事与 `skill-huasheng` 的舞台节奏结合，而不是把两者机械拼接。

---

## 3. 本次可直接执行的设计准则

### 3.1 内容与叙事

1. **标题必须是结论，而不只是栏目名。**
   - 不用：“项目进展”。
   - 推荐：“我们已将 A 从试验推进为可复用的 B，但 C 仍是下一阶段的瓶颈。”
2. **章节不要超过 5–6 个。** 每章只回答一个问题。
3. **以证据替代形容词。** “效果显著”应落到时间、数量、对比、案例或原始链接。
4. **数据有口径。** 在数据附近标明时间范围、样本/来源和必要的限制说明。
5. **结尾不能只写“感谢观看”。** 应收束为：已取得的变化、尚未解决的风险、需要的决策/支持、下一周期的承诺。

### 3.2 视觉系统

建议的基础方向是**暖色出版物 + 克制的技术图表**，而非 SaaS dashboard：

- **底色：**偏暖、低饱和的纸白或极浅灰，而不是纯白大画布。
- **强调色：**从本次汇报的现有品牌资产、产品截图或真实素材中取样；收敛至 2–3 个有彩色和一组中性色，而非凭空套“科技蓝/紫”。[design-styles.md：色彩推导协议](https://github.com/alchaincyf/huashu-design/blob/main/references/design-styles.md)
- **网格：**12 栏或主/辅两栏 CSS Grid；章节内允许不同构图，但所有内容应对齐同一条隐形版心。
- **字体：**中文正文优先选择可读的黑体或宋体；display 与正文形成明确对比。中文正文建议 17–18px、行高约 1.8，正文行长控制在约 28–32 个汉字。[typography.md：中文排印](https://github.com/alchaincyf/huashu-design/blob/main/references/typography.md)
- **数字：**使用等宽数字（`font-variant-numeric: tabular-nums`），让指标列和时间线稳定。[typography.md](https://github.com/alchaincyf/huashu-design/blob/main/references/typography.md)
- **标题：**使用 `text-wrap: balance`；正文使用 `text-wrap: pretty`。中文开启 `line-break: strict`，并全局设置 `font-synthesis: none`，避免伪粗体和伪斜体。[typography.md](https://github.com/alchaincyf/huashu-design/blob/main/references/typography.md)

### 3.3 交互与动效

**可做：**

- 章节导航与阅读进度。
- 目录锚点、回到顶部、当前章节高亮。
- 随滚动轻量出现的标题/图表标注；可使用 `IntersectionObserver`。
- 一个复杂流程的“静态图 + 点击播放的解释动效”。
- 图表的筛选、展开原始数据或查看口径（若数据适合）。

**不做或严格克制：**

- 自动播放背景音乐、无法暂停的动画。
- 滚动劫持（强制滚轮逐屏翻页）。
- 纯装饰型视差、持续漂浮、无意义粒子/霓虹光效。
- 为了炫技而让数字只能在动画结束后才可读。
- 用 hover 承载触屏设备不可获得的关键信息。

原则是：**任何交互失效后，报告仍完整可读；任何动画被跳过后，论点仍成立。**

### 3.4 图表与图示

- 一张图表只回答一个问题，标题直接写结论。
- 优先“断言—证据”布局：结论式标题 + 一个主图/主证据，尽量不堆 bullet。[design-styles.md：断言-证据](https://github.com/alchaincyf/huashu-design/blob/main/references/design-styles.md)
- 图例能直接写在线末就不另设图例；非重点系列灰化；数据来源紧随图表。
- 对流程、协作关系、系统架构，优先制作简洁的 SVG/CSS 图解，而不是截图拼贴。
- 禁止没有真实数据支撑的“装饰性图表”、伪地图、伪增长曲线。

---

## 4. 推荐的信息架构（初版）

```text
01  封面：本期最重要的一句话结论
02  Executive summary：3 个必须带走的发现
03  Context：这段时间我们面对的背景、目标和约束
04  Progress：已经完成了什么，用时间线/过程与证据呈现
05  Outcomes：结果、影响与关键数据（每一项有明确口径）
06  Deep dive：选择一个最值得讲的案例或方法，做静态图 + 按需动效
07  Risks & lessons：尚存风险、失败/限制、从中学到什么
08  Next：下一阶段优先级、里程碑、需要的决策或资源
09  Appendix：完整数据来源、口径、链接与补充材料
```

若汇报材料偏少，可缩为 6 章：封面、三条结论、进展、案例、下一步、附录；不要用空洞的目录页或为了“完整”硬凑章节。

---

## 5. 明确不应照搬的部分

| 参考特征 | 不直接照搬的原因 | 本次的替代方式 |
|---|---|---|
| `skill-huasheng` 的逐页 deck 主结构 | 它适合现场演讲；工作汇报还需要可独立阅读、可回看和可转发 | 长卷为主，另提供可选演讲模式 |
| 黑底极简贯穿全站 | 长时间阅读、密集数据和正式文档的可读性成本高 | 浅暖底为常态；暗底只用于封面/开章/关键结论 |
| 大量 cinematic demo | 制作成本高，且容易让动效抢走事实 | 仅对一个复杂流程使用“静态先行、点击播放”的增强层 |
| 鹦鹉专题的重图版叙事 | 其图像本身是内容证据；工作汇报若无真实素材，强塞图片会显得虚 | 使用真实产品截图、结构图、数据图和原始链接；没有就以排印和数据为主 |
| 纯粹的留白美学 | 留白若没有明确锚点会显得信息不足 | 在封面与章节过渡保留大留白，正文页以清晰的阅读密度为先 |
| 通用“AI 科技感”紫渐变、玻璃卡片、emoji 图标 | 仓库明确将它们识别为模板化 AI 视觉 | 使用有来源的色彩、少量高质量图形和一致的排印系统 |

---

## 6. 制作前必须确定的输入

为了让设计从内容长出来，开始制作前需要收集：

1. 汇报对象、场景与预计阅读/演讲时长。
2. 报告时间范围、核心目标，以及希望对方最终记住的一句话。
3. 已有品牌资产或现成产品截图；没有品牌规范也需明确可借用的真实视觉线索。
4. 所有可量化成果的原始数据、口径、日期和来源。
5. 一个需要重点讲清楚的案例/流程。
6. 是否需要 PDF 静态存档、是否需要现场演讲模式。

---

## 7. 推荐制作流程

1. 先把上述输入整理成内容大纲，明确每章的结论句与证据。
2. 先制作两张 showcase：**封面** + **一张数据/案例深挖页**。
3. 确认视觉语法后，再完成全部章节。
4. 在 1920px 宽桌面、笔记本宽度和手机窄屏下检查阅读；检查锚点导航、动效降级、字体加载和控制台错误。
5. 导出 PDF 作为静态备份；HTML 作为正式主产物。

---

## 来源

- [alchaincyf/huashu-design README](https://github.com/alchaincyf/huashu-design)
- [design-styles.md](https://github.com/alchaincyf/huashu-design/blob/main/references/design-styles.md)
- [typography.md](https://github.com/alchaincyf/huashu-design/blob/main/references/typography.md)
- [slide-decks.md](https://github.com/alchaincyf/huashu-design/blob/main/references/slide-decks.md)
- [verification.md](https://github.com/alchaincyf/huashu-design/blob/main/references/verification.md)
- [鹦鹉进化史 Showcase](https://www.huasheng.ai/parrots/)
- [聊聊 Skill Showcase](https://skill-huasheng.vercel.app)
