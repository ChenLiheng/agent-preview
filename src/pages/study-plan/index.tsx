import { useState } from 'react'
import styles from './index.module.less'

interface Task {
  id: string
  title: string
  done: boolean
}

const initialTasks: Task[] = [
  { id: '1', title: '完成 React 官方文档 Hooks 章节', done: true },
  { id: '2', title: '阅读 TypeScript 高级类型', done: false },
  { id: '3', title: '实现一个自定义 Hook 练习', done: false },
  { id: '4', title: '复习算法：二叉树遍历', done: false },
]

export default function StudyPlanPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const doneCount = tasks.filter((t) => t.done).length
  const progress = Math.round((doneCount / tasks.length) * 100)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>本周学习计划</h1>
        <p className={styles.desc}>前端进阶 · 第 12 周</p>
      </header>

      <div className={styles.progressBar}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.progressText}>
          {doneCount}/{tasks.length} 已完成 ({progress}%)
        </span>
      </div>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <button
              type="button"
              className={`${styles.checkbox} ${task.done ? styles.checked : ''}`}
              onClick={() => toggleTask(task.id)}
              aria-label={task.done ? '标记为未完成' : '标记为已完成'}
            >
              {task.done && '✓'}
            </button>
            <span className={`${styles.taskTitle} ${task.done ? styles.done : ''}`}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
