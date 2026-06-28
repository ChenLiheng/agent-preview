import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useMediaQuery'
import Sidebar from './Sidebar'
import styles from './Layout.module.less'

export default function Layout() {
  const isMobile = useIsMobile()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <div className={styles.layout}>
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

      {/* 桌面侧边栏 */}
      {!isMobile && (
        <aside className={styles.desktopSidebar}>
          <Sidebar />
        </aside>
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
            <Sidebar onNavigate={closeDrawer} />
          </aside>
        </>
      )}

      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
