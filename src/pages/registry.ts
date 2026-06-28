import { lazy, type ComponentType } from 'react'
import type { PageEntry } from './types'

interface MetaModule {
  default: import('./types').PageMeta
}

const pageModules = import.meta.glob('./*/index.tsx')
const metaModules = import.meta.glob('./*/meta.ts', { eager: true }) as Record<
  string,
  MetaModule
>

/**
 * 从 glob 路径中提取页面目录名
 */
function extractPageName(globPath: string): string {
  const match = globPath.match(/\.\/([^/]+)\//)
  return match?.[1] ?? ''
}

/**
 * 扫描 pages 目录，自动注册所有页面
 */
function buildPageRegistry(): PageEntry[] {
  const entries: PageEntry[] = []

  for (const [modulePath, loader] of Object.entries(pageModules)) {
    const pageName = extractPageName(modulePath)
    if (!pageName) continue

    const metaPath = `./${pageName}/meta.ts`
    const metaModule = metaModules[metaPath]
    if (!metaModule?.default) continue

    const LazyComponent = lazy(() =>
      (loader as () => Promise<{ default: ComponentType }>)().then((mod) => ({
        default: mod.default,
      })),
    )

    entries.push({
      path: pageName,
      meta: metaModule.default,
      Component: LazyComponent,
    })
  }

  return entries.sort((a, b) => {
    const orderA = a.meta.order ?? 100
    const orderB = b.meta.order ?? 100
    if (orderA !== orderB) return orderA - orderB
    return a.meta.title.localeCompare(b.meta.title, 'zh-CN')
  })
}

/** 所有已注册页面 */
export const pageRegistry: PageEntry[] = buildPageRegistry()

/** 菜单可见页面 */
export const visiblePages = pageRegistry.filter((page) => !page.meta.hidden)

/** 默认首页路径 */
export const defaultPagePath = pageRegistry.find((p) => p.path === 'home')?.path
  ?? pageRegistry[0]?.path
  ?? 'home'

export type { PageMeta, PageEntry } from './types'
