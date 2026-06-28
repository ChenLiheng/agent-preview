import { Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/layout/Layout'
import { pageRegistry, defaultPagePath } from '@/pages/registry'
import styles from './App.module.less'

function PageLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <span>加载中...</span>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={`/${defaultPagePath}`} replace />} />
          {pageRegistry.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <Suspense fallback={<PageLoader />}>
                  <page.Component />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to={`/${defaultPagePath}`} replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
