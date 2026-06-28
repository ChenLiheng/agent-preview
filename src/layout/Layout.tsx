import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useMediaQuery'
import Sidebar from './Sidebar'
import NavRail from './NavRail'
import styles from './Layout.module.less'

export default function Layout() {
  const isMobile = useIsMobile()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <div className={styles.layout}>
      {/* 桌面端：侧边栏（可折叠） */}
      {!isMobile && (
        <>
          <aside
            className={`${styles.desktopSidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}
          >
            <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
          </aside>

          {/* 侧边栏收起后，左侧边缘的展开按钮 */}
          {sidebarCollapsed && (
            <button
              type="button"
              className={styles.expandBtn}
              onClick={toggleSidebar}
              aria-label="展开侧边栏"
              title="展开侧边栏"
            >
              ▶
            </button>
          )}
        </>
      )}

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
            <Sidebar onNavigate={closeDrawer} />
          </aside>
        </>
      )}

      {/* 移动端底部标签栏 */}
      {isMobile && <NavRail />}

      <main
        className={`${styles.main} ${sidebarCollapsed ? styles.mainExpanded : ''}`}
      >
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
