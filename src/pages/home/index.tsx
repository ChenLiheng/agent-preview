import { Link } from 'react-router-dom'
import { visiblePages } from '../registry'
import styles from './index.module.less'

export default function HomePage() {
  const otherPages = visiblePages.filter((page) => page.path !== 'home')

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Agent Preview</span>
        <h1 className={styles.title}>
          静态页面预览站
        </h1>
        <p className={styles.subtitle}>
          每个功能独立成页，由 Agent 按需扩展。点击下方卡片浏览已有页面。
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.grid}>
          {otherPages.map((page) => (
            <Link key={page.path} to={`/${page.path}`} className={styles.card}>
              <div className={styles.cardIcon}>{page.meta.icon ?? '📄'}</div>
              <div className={styles.cardBody}>
                <span className={styles.cardTitle}>{page.meta.title}</span>
                {page.meta.group && (
                  <span className={styles.cardGroup}>{page.meta.group}</span>
                )}
              </div>
              <span className={styles.cardArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>使用 React + Vite + TypeScript 构建，自动部署至 GitHub Pages。</p>
      </footer>
    </div>
  )
}
