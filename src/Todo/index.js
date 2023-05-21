import './index.css'
import { useStore } from '../store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
function Task () {
  const { taskStore } = useStore()
  const [keyword, setKeyword] = useState('')
  const handleChange = (id) => {
    taskStore.changeItem(id)
  }
  const handleDelete = (id) => {
    taskStore.deleteItem(id)
  }
  const handleChangeAll = () => {
    taskStore.changeItemAll(taskStore.isAll)
  }
  const handleKeyUp = (e) => {
    if (e.code === 'Enter') {
      if(!keyword || keyword==' ') return
      const item = {
        id: taskStore.list.length + 1,
        name: keyword,
        isDone: false
      }
      taskStore.addItem(item)
      setKeyword('')
    }

  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </header>
      <section className="main">

        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={handleChangeAll}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {taskStore.list.map(item => (
            <li
              key={item.id}
              className="todo"
            >
              <div className="view">
                <input className="toggle" type="checkbox" checked={item.isDone} onChange={() => handleChange(item.id)} />
                <label >{item.name}</label>
                <button className="destroy" onClick={() => handleDelete(item.id)}></button>
              </div>
            </li>

          ))}
          {/* <li
              className="todo completed"
            >
              <div className="view">
                <input className="toggle" type="checkbox" defaultChecked={true} />
                <label >learn react</label>
                <button className="destroy"></button>
              </div>
            </li> */}
        </ul>

      </section>
      <footer className="footer">
        <span className="todo-count">
          任务总数: {taskStore.list.length} 已完成: {taskStore.filterDone}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)