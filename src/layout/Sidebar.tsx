import { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { visiblePages } from '@/pages/registry'
import styles from './Sidebar.module.less'

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  onNavigate?: () => void
}

/**
 * 按分组整理菜单项
 */
function groupPages() {
  const groups = new Map<string, typeof visiblePages>()

  for (const page of visiblePages) {
    const groupName = page.meta.group ?? '默认'
    const existing = groups.get(groupName) ?? []
    existing.push(page)
    groups.set(groupName, existing)
  }

  return Array.from(groups.entries())
}

export default function Sidebar({ collapsed, onToggle, onNavigate }: SidebarProps) {
  const grouped = groupPages()

  const handleClick = useCallback(() => {
    onNavigate?.()
  }, [onNavigate])

  return (
    <nav className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`} aria-label="主导航">
      {/* 品牌 */}
      <div className={styles.brand}>
        <span className={styles.brandIcon}>⚡</span>
        {!collapsed && <span className={styles.brandText}>Agent Preview</span>}
      </div>

      {/* 菜单项 */}
      <div className={styles.menu}>
        {grouped.map(([groupName, pages]) => (
          <div key={groupName} className={styles.group}>
            {!collapsed && grouped.length > 1 && (
              <div className={styles.groupTitle}>{groupName}</div>
            )}
            <ul className={styles.list}>
              {pages.map((page) => (
                <li key={page.path}>
                  <NavLink
                    to={`/${page.path}`}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ''}`
                    }
                    title={collapsed ? page.meta.title : undefined}
                    onClick={handleClick}
                  >
                    <span className={styles.linkIcon}>{page.meta.icon ?? '📄'}</span>
                    {!collapsed && <span className={styles.linkText}>{page.meta.title}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 折叠按钮 */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={onToggle}
          aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
          title={collapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          <span className={`${styles.collapseIcon} ${collapsed ? styles.collapseIconFlipped : ''}`}>
            ◀
          </span>
          {!collapsed && <span className={styles.collapseText}>收起菜单</span>}
        </button>
      </div>
    </nav>
  )
}
