import styles from './Task.module.css'
import { Trash } from 'phosphor-react'

export function Task(props) {
  return(
    <div className={styles.task}>
      <input type="checkbox" checked={props.isComplete} onChange={props.handleCheckedChange} />
      <p style={{textDecoration: props.isComplete ? 'line-through' : 'none', color: props.isComplete ? 'var(--gray-300)' : 'var(--gray-100)'}}>{props.taskText}</p>
      <Trash color='var(--gray-300)' onClick={props.handleDeleteTask}/>
    </div>
  )
}