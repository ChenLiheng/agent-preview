# Agent Preview

静态页面预览站点，用于承载 Agent 生成的各类功能页面（旅游攻略、学习计划等）。每个页面独立成页，导航自动发现。

**在线地址：** https://chenliheng.github.io/agent-preview/

## 设计亮点

- **垂直图标导航轨**（NavRail）— 桌面端 60px 窄轨，仅显图标，悬浮显示页面名称；移动端自动变为底部标签栏 + 抽屉菜单
- **翡翠绿点缀 + 暖灰中性色** — 清爽高级，区别于默认蓝
- **纯 CSS 动效** — 悬浮反馈、过渡动画、进度条渐变，尊重 `prefers-reduced-motion`

## 技术栈

- React 18 + Vite 5 + TypeScript
- react-router-dom（HashRouter）
- Less + CSS Modules

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:5173/agent-preview/`

## 构建

```bash
npm run build
npm run preview
```

## 如何新增一个页面

Agent 或开发者只需在 `src/pages/` 下新建一个文件夹，包含两个文件，**无需修改任何现有代码**：

```
src/pages/my-new-page/
├── meta.ts      # 页面元信息（标题、图标、分组、排序）
└── index.tsx    # 页面组件
```

### meta.ts 示例

```ts
import type { PageMeta } from '../types'

const meta: PageMeta = {
  title: '我的新页面',
  icon: '🎯',
  group: '工具',   // 可选，菜单分组
  order: 30,       // 可选，排序权重，越小越靠前
  hidden: false,   // 可选，设为 true 则不在导航显示
}

export default meta
```

### index.tsx 示例

```tsx
import styles from './index.module.less'

export default function MyNewPage() {
  return (
    <div className={styles.container}>
      <h1>我的新页面</h1>
    </div>
  )
}
```

保存后，导航轨和路由会自动更新。

## 目录结构

```
src/
├── App.tsx               # 路由入口
├── layout/
│   ├── Layout.tsx        # 布局（NavRail + 内容区）
│   ├── Layout.module.less
│   ├── NavRail.tsx       # 导航轨组件
│   └── NavRail.module.less
├── pages/
│   ├── registry.ts       # 页面自动发现（glob 扫描）
│   ├── types.ts          # 页面类型定义
│   ├── home/             # 首页
│   ├── travel-guide/     # 旅游攻略示例
│   └── study-plan/       # 学习计划示例
├── hooks/
│   └── useMediaQuery.ts  # 响应式 hook
└── styles/
    ├── variables.less    # 设计令牌（色板、间距、阴影）
    └── global.less       # 全局样式
```

## 部署

项目已配置 GitHub Actions，推送到 `main` 分支后自动构建并部署到 GitHub Pages。

部署地址：`https://chenliheng.github.io/agent-preview/`

## 响应式

- 桌面端（>768px）：垂直图标导航轨位于左侧，内容区全高
- 移动端（≤768px）：顶部固定品牌栏 + 底部标签栏 + 全屏抽屉菜单
- 使用 HashRouter，避免 GitHub Pages 子路径刷新 404
