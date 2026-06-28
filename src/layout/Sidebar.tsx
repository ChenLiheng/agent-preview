import { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { visiblePages } from '@/pages/registry'
import styles from './Sidebar.module.less'

interface SidebarProps {
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

export default function Sidebar({ onNavigate }: SidebarProps) {
  const grouped = groupPages()

  const handleClick = useCallback(() => {
    onNavigate?.()
  }, [onNavigate])

  return (
    <nav className={styles.sidebar} aria-label="主导航">
      <div className={styles.brand}>
        <span className={styles.brandIcon}>⚡</span>
        <span className={styles.brandText}>Agent Preview</span>
      </div>

      <div className={styles.menu}>
        {grouped.map(([groupName, pages]) => (
          <div key={groupName} className={styles.group}>
            {grouped.length > 1 && (
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
                    onClick={handleClick}
                  >
                    <span className={styles.linkIcon}>{page.meta.icon ?? '📄'}</span>
                    <span className={styles.linkText}>{page.meta.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
