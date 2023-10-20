import { useState } from 'react'
import CustomForm from './Components/customForm'
import TaskList from './Components/TaskList'
import EditForm from './Components/EditForm'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', [])
  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previousFocusEl, setPreviousFocusEl] = useState(null)

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }
  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id))
  }
  const toggleCheckTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? {...t, checked: !t.checked}
        : t
    )))
  }
  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? {...t, name: task.name}
        : t
    )))
    closeEditMode()
  }

  const closeEditMode = () => {
    setIsEditing(false)
    previousFocusEl.focus()
  }

  const enterEditMode = (task) => {
    setEditedTask(task)
    setIsEditing(true)
    setPreviousFocusEl(document.activeElement)
  }

  return (
    <>
      <div className="container">
        <header><h1>My Task List</h1></header>
        
        {isEditing && (
          <EditForm 
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )}

        <CustomForm addTask={addTask}/>
        
        {tasks && <TaskList 
          tasks={tasks}
          deleteTask={deleteTask}
          toggleCheckTask={toggleCheckTask}
          enterEditMode={enterEditMode}
        />}

      </div>
    </>
  )
}

export default App
