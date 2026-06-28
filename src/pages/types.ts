import type { ComponentType } from 'react'

/** 页面元信息 */
export interface PageMeta {
  /** 页面标题 */
  title: string
  /** 菜单图标（emoji 或简短字符） */
  icon?: string
  /** 菜单分组 */
  group?: string
  /** 排序权重，越小越靠前 */
  order?: number
  /** 是否在菜单中隐藏 */
  hidden?: boolean
}

/** 注册页面条目 */
export interface PageEntry {
  /** 路由路径（不含前导斜杠） */
  path: string
  meta: PageMeta
  Component: ComponentType
}
