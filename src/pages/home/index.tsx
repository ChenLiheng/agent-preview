import { Link } from 'react-router-dom'
import { visiblePages } from '../registry'
import styles from './index.module.less'

export default function HomePage() {
  const otherPages = visiblePages.filter((page) => page.path !== 'home')

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Agent Preview</h1>
        <p className={styles.subtitle}>
          静态页面预览站点，每个功能独立成页，由 Agent 按需扩展。
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>全部页面</h2>
        <div className={styles.grid}>
          {otherPages.map((page) => (
            <Link key={page.path} to={`/${page.path}`} className={styles.card}>
              <span className={styles.cardIcon}>{page.meta.icon ?? '📄'}</span>
              <span className={styles.cardTitle}>{page.meta.title}</span>
              {page.meta.group && (
                <span className={styles.cardGroup}>{page.meta.group}</span>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
