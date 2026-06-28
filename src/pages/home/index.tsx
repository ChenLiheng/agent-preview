import styles from './index.module.less'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Agent Preview</span>
        <h1 className={styles.title}>
          静态页面预览站
        </h1>
        <p className={styles.subtitle}>
          每个功能独立成页，由 Agent 按需扩展。左侧导航轨（移动端底部标签栏）可切换页面。
        </p>
        <div className={styles.hint}>
          <span className={styles.hintArrow}>←</span>
          <span className={styles.hintText}>点击图标切换页面，悬浮查看名称</span>
        </div>
      </header>
    </div>
  )
}
