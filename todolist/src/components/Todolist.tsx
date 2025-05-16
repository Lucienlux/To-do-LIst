'use client'
import React, { useState, Dispatch, SetStateAction} from 'react'


const Todolist = () => {
  const [tasks, setTasks] = useState<string[]>([])
  const [submittedTasks, setsubmittedTasks] = useState<string>("")
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  function moveToCompleted(index: number){
    const taskMove = tasks[index]
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)

    setCompletedTasks([...completedTasks, taskMove])
  }

  function deleteTask(index: number, taskList: string[], taskSetter: Dispatch<SetStateAction<string[]>>) {
    const newTasks = [...taskList]
    newTasks.splice(index, 1)
    taskSetter(newTasks)
  }

  function movesubmitted(){
    setTasks([...tasks, submittedTasks])
  }

    function handlechange(event: React.ChangeEvent<HTMLInputElement>) {
    setsubmittedTasks(event.target.value)
  }

  return (
    <div>
    <div>
      <div className='flex justify-center items-center'>
        <input minLength={1} onChange={handlechange} type="text" className='border-2 rounded-md p-2 w-3xl' placeholder='Add a new task' />
        <button onClick={movesubmitted} className='bg-purple-900 font-mono text-white rounded-md p-2 ml-2'>Add</button>
      </div>
      <div key={crypto.randomUUID()} className='flex justify-start items-center mt-4 mx-10 grid-rows-1'>
        <ol className="flex flex-col items-start gap-4">
          {tasks.map((value, index) => {
            return(
              <div key={crypto.randomUUID()} className='flex items-center gap-2 border p-2 rounded'>
                <input onChange={() => moveToCompleted(index)} className='accent-black md:accent-pink-500 ...' type='checkbox'/>
                <li className='font-mono'>{`${index + 1}. ${value}`}</li>
                <button onClick={() => deleteTask(index, tasks, setTasks)} className='border rounded p-0.5'>X</button>
              </div>
            )
          })}
        </ol>
      </div>

      <div className='flex justify-center pt-6'>
        <h1 className='text-center font-mono font-extrabold'>Completed Tasks</h1>
      </div>
      <div>
        <ol>
          {completedTasks.map((value, index) => (
            <div key={crypto.randomUUID()} className='flex justify-start items-center mt-4 mx-10 grid-rows-1'>
              <div className='flex items-center gap-2 border p-2 rounded'>
              <li className='font-mono'>{`${index + 1}. ${value}`}</li>
              <button onClick={() => deleteTask(index, completedTasks, setCompletedTasks)} className='border rounded p-0.5'>X</button>
              </div>
            </div>
          ))}
        </ol>
      </div>
      
    </div> 
    </div>
  )
}

export default Todolist
