import { Header } from './components/Header'
import styles from './App.module.css'
import './global.css'
import { ClipboardText } from 'phosphor-react'
import { Task } from './components/Task'
import { useState } from 'react'
import { nanoid } from "nanoid"

export function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [createdTaskCount, setCreatedTaskCount] = useState(0)
  let complete=0


  function handleNewTaskChange(event){
    setNewTask(event.target.value)
  }

  function handleCreateNewTask(event){
    event.preventDefault()
    setTasks([...tasks, {
      id: nanoid(),
      taskText: newTask,
      isComplete: false
    }])

    setCreatedTaskCount(createdTaskCount + 1)
    setNewTask('')
  }

  function handleCheckedChange(id) {
    setTasks(tasks.map(task => {return(id === task.id ? {...task, isComplete: !task.isComplete} : task)}))
  }

  for(const task of tasks){
    if(task.isComplete){
      complete++
    }
  }

  function handleDeleteTask(id) {
    const tasksWithoutDeleted = tasks.filter(task => task.id != id)
    setTasks(tasksWithoutDeleted)

    setCreatedTaskCount(createdTaskCount - 1)
  }

  return(
    <>
      <Header />

      <div className={styles.taskContainer}>
        <form onSubmit={handleCreateNewTask}>
          <input type="text" name='txt_task' value={newTask} onChange={handleNewTaskChange}/>
          <button type='submit'>Criar <strong>+</strong></button>
        </form>

        <div className={styles.taskWrapper}>
          <header>
            <p>Tarefas criadas <span>{ createdTaskCount }</span></p>
            <p>Concluidas <span>{ complete } de { createdTaskCount }</span></p>
          </header>
          <div className={styles.taskList}>
            {
              
              tasks.map(task => {
                return(
                  <Task key={task.id} taskText={task.taskText} isComplete={task.isComplete} handleCheckedChange={() => handleCheckedChange(task.id)} handleDeleteTask={() => handleDeleteTask(task.id)}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}