import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Todopage = () => {

  const [todos, setTodo] = useState("")
  const [newTodo, setNewTodo] = useState("")
  const [editTodoId, setEditTodoId] = useState(null);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getData')
      setTodo(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handelInputChange = (e) => {
    setNewTodo(e.target.value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    try {
      const response = await axios.post('http://localhost:3000/insertData', { todo: newTodo })
      setTodo([...todos, response.data])

      setNewTodo('')
      fetchData()

    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteData/${id}`);
      setTodo(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err)
    }
  };



  const handleUpdate = async () => {
    if (!newTodo.trim()) return;

    try {
      await axios.put(`http://localhost:3000/editData/${editTodoId}`, { todo: newTodo });
      setEditTodoId(null);
      setNewTodo('');
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='bg-white w-[500px] h-[700px] rounded-md pd-20 mt-20'>
        <p className='flex justify-center text-3xl '> Todo application</p>


        <form onSubmit={handleSubmit}>
          <div className='my-5'>

            <input type='text' value={newTodo} placeholder='Enter Todo' required
              onChange={handelInputChange}
              className='bg-transparent focus:outline-none focus:ring-0 border-b border-gray-300 placeholder-gray-500 text-gray-700 py-2 px-3 mx-auto w-full font-sans'
            />


          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
            type="submit" >
            Create Todo
          </button>
        </form>
        <div className='bg-white rounded-lg shadow-lg p-4'>
          <ul className='bg-white rounded-lg shadow-lg p-4'>
            {todos && todos.map((todo) => (
              <li key={todo.id}
                className='flex items-center justify-between py-2'
              >
                {editTodoId === todo.id ? (
                  <>
                    <input
                      type='text'
                      value={editTodoId === todo.id ? newTodo : todo.todo}
                      onChange={handelInputChange}
                      className='shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                    />
                    <button
                      onClick={handleUpdate}
                      className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <span>{todo.todo}</span>
                )}
                {editTodoId !== todo.id && (
                  <button
                    onClick={() => setEditTodoId(todo.id)}
                    className='px-4 relative left-[25%] py-2 bg-blue-500 text-white rounded'
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className='px-4 py-2 ml-2 bg-red-500 text-white rounded'

                >Delete</button>
              </li>
            ))}

          </ul>

        </div>
      </div>


    </div>
  )
}

export default Todopage
