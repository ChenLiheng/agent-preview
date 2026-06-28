import { useState, useCallback } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { visiblePages } from '@/pages/registry'
import NavRail from './NavRail'
import styles from './Layout.module.less'

export default function Layout() {
  const isMobile = useIsMobile()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <div className={styles.layout}>
      {/* 桌面端：垂直图标导航轨 */}
      {!isMobile && <NavRail />}

      {/* 移动端顶部栏 */}
      {isMobile && (
        <header className={styles.mobileHeader}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={openDrawer}
            aria-label="打开菜单"
          >
            <span className={styles.menuIcon} />
          </button>
          <span className={styles.mobileTitle}>Agent Preview</span>
        </header>
      )}

      {/* 移动端抽屉 */}
      {isMobile && drawerOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <aside className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <span className={styles.drawerBrand}>⚡ Agent Preview</span>
            </div>
            <nav className={styles.drawerNav}>
              {visiblePages.map((page) => (
                <NavLink
                  key={page.path}
                  to={`/${page.path}`}
                  className={({ isActive }) =>
                    `${styles.drawerLink} ${isActive ? styles.drawerActive : ''}`
                  }
                  onClick={closeDrawer}
                >
                  <span className={styles.drawerIcon}>{page.meta.icon ?? '📄'}</span>
                  <span className={styles.drawerLabel}>{page.meta.title}</span>
                  {page.meta.group && (
                    <span className={styles.drawerGroup}>{page.meta.group}</span>
                  )}
                </NavLink>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* 移动端底部导航轨 */}
      {isMobile && <NavRail />}

      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
