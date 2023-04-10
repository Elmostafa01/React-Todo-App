import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('todos')
    if (localValue == null) return []

    return JSON.parse(localValue)
  });
  const [inputValue, setInputValue] = useState('')


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
   // console.log("saved to local storage", todos);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return 
    setTodos([...todos, inputValue])
    setInputValue('')
  }

  const handleDelete = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  
  return (
    <>
    <div className="container">
        <form onSubmit={handleSubmit} className='form'>
            <img className='logo' src={'./images/logo.png'} alt='logo' />
            <div className="create-task">
              <label className='newtask' htmlFor='task'>New Task</label>
              <input
               autoComplete='off' className='input-task'
               value={inputValue} onChange={(e)=> setInputValue(e.target.value)} 
               type='text' id='task' placeholder='Type your Task...'
                />
            </div>
            <button type='submit' className='add'>Add</button>

            <h2 className='tasks'>Todo List :</h2>
            <ul className='list'>
              {todos.map((todo, index) => (
                <li key={index} >
                  <label>
                    <input className='checkbox' type='checkbox' />
                    <span className='task-todo'>{todo}{' '}</span>
                </label>
                <button className='delete'>
                  <img onClick={() => handleDelete(index)} src={'./images/trash.png'} alt='Delete'/>
                </button>
                </li>
              ))}
            </ul>          
        </form>
    </div>
    </>
  )
}

export default App
