import { useState } from 'react'
import Todolist from './components/todolist'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Todolist />
    </div>
  )
}

export default App
