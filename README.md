# Agent Preview

静态页面预览站点，用于承载 Agent 生成的各类功能页面（旅游攻略、学习计划等）。每个页面独立成 tab，左侧菜单自动发现，移动端友好。

**在线地址：** https://chenliheng.github.io/agent-preview/

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
├── meta.ts      # 页面元信息
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
  hidden: false,   // 可选，设为 true 则不在菜单显示
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

保存后，菜单和路由会自动更新。

## 目录结构

```
src/
├── App.tsx                 # 路由入口
├── layout/                 # 布局（侧边栏 + 移动端抽屉）
├── pages/
│   ├── registry.ts         # 页面自动发现
│   ├── types.ts            # 页面类型定义
│   ├── home/               # 首页
│   ├── travel-guide/       # 旅游攻略示例
│   └── study-plan/         # 学习计划示例
├── hooks/
│   └── useMediaQuery.ts    # 响应式 hook
└── styles/
    ├── variables.less      # 设计 token
    └── global.less         # 全局样式
```

## 部署

项目已配置 GitHub Actions，推送到 `main` 分支后自动构建并部署到 GitHub Pages。

### 首次部署需手动配置

1. 进入 GitHub 仓库 **Settings → Pages**
2. 将 **Source** 设为 **GitHub Actions**
3. 推送代码到 `main` 分支，等待 workflow 完成

部署地址：`https://chenliheng.github.io/agent-preview/`

## 移动端预览

- 使用 HashRouter，避免 GitHub Pages 子路径刷新 404
- 视口宽度 < 768px 时，侧边栏自动变为顶部栏 + 抽屉菜单
- 适合手机端直接访问预览
