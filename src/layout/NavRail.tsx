import { NavLink } from 'react-router-dom'
import { visiblePages } from '@/pages/registry'
import styles from './NavRail.module.less'

/**
 * 导航轨 — 桌面为垂直图标轨，移动端为底部标签栏
 */
export default function NavRail() {
  return (
    <nav className={styles.rail} aria-label="主导航">
      {/* 品牌标志 */}
      <div className={styles.brand}>
        <span className={styles.brandIcon} title="Agent Preview">⚡</span>
      </div>

      {/* 导航项 —— 桌面只显图标，移动端图标+标签 */}
      <div className={styles.menu}>
        {visiblePages.map((page) => (
          <NavLink
            key={page.path}
            to={`/${page.path}`}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{page.meta.icon ?? '📄'}</span>
            <span className={styles.label}>{page.meta.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
