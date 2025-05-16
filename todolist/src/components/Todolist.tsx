'use client'
import React, { useState } from 'react'

const Todolist = () => {
  const [tasks, setTasks] = useState<string[]>([])
  const [submittedTasks, setsubmittedTasks] = useState<string>("")

  function movesubmitted(){
    setTasks([...tasks, submittedTasks])
  }

    function handlechange(event: React.ChangeEvent<HTMLInputElement>) {
    setsubmittedTasks(event.target.value)
  }

  return (
    <body>
      <div className='flex justify-center items-center'>
        <input minLength={1} onChange={handlechange} type="text" className='border-2 rounded-md p-2 w-3xl' placeholder='Add a new task' />
        <button onClick={movesubmitted} className='bg-purple-900 font-mono text-white rounded-md p-2 ml-2'>Add</button>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <ol className="flex flex-wrap space-x-4">
          {tasks.map((value, index) => {
            return(
              <div className='flex items-center gap-2 border p-2 rounded'>
                <input type='checkbox'/>
                {`${index + 1}. ${value}`}
                <li>
                </li>
                <button className='flex'>X</button>
              </div>
            )
          })}
        </ol>
      </div>

      <div className='flex justify-center items-center my-100'>
          <h1 className='text-center font-mono font-extrabold'>Completed Tasks</h1>
          
      </div>
    </body>
  )
}

export default Todolist
