import styles from './index.module.less'

const destinations = [
  {
    name: '京都',
    days: 3,
    highlights: ['清水寺', '伏见稻荷大社', '岚山竹林'],
    tips: '建议购买巴士一日券，避开周末人流高峰。',
  },
  {
    name: '大阪',
    days: 2,
    highlights: ['道顿堀', '大阪城', '环球影城'],
    tips: '美食集中在道顿堀和心斋桥，提前预订环球影城门票。',
  },
]

export default function TravelGuidePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>日本关西旅游攻略</h1>
        <p className={styles.desc}>5 天行程示例，可根据实际情况调整。</p>
      </header>

      <div className={styles.timeline}>
        {destinations.map((dest, index) => (
          <article key={dest.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.dayBadge}>Day {index + 1}-{index + dest.days}</span>
              <h2 className={styles.cardTitle}>{dest.name}</h2>
            </div>
            <ul className={styles.highlights}>
              {dest.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.tips}>
              <strong>小贴士：</strong>
              {dest.tips}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
