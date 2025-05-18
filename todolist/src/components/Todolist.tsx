"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

const Todolist = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [editingTask, setEditingTask] = useState<{
    index: number;
    list: "tasks" | "completedTasks";
  } | null>(null);
  const [editText, setEditText] = useState<string>("");

  function moveToCompleted(index: number) {
    const taskMove = tasks[index];
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskMove]);
  }

  function editTask(
    index: number,
    taskList: string[],
    taskSetter: Dispatch<SetStateAction<string[]>>,
    newText: string
  ) {
    if (index >= 0 && index < taskList.length && newText.trim()) {
      const newTasks = [...taskList];
      newTasks[index] = newText.trim();
      taskSetter(newTasks);
    }
  }

  function deleteTask(
    index: number,
    taskList: string[],
    taskSetter: Dispatch<SetStateAction<string[]>>
  ) {
    const newTasks = [...taskList];
    newTasks.splice(index, 1);
    taskSetter(newTasks);
  }

  function moveSubmitted() {
    const trimmedTask = submittedTasks.trim();
    if (trimmedTask) {
      setTasks([...tasks, trimmedTask]);
      setSubmittedTasks("");
      setError("");
    } else {
      setError("Task cannot be empty");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSubmittedTasks(value);
    if (error && value.trim()) {
      setError("");
    }
  }

  return (
    <div>
      <div>
        <div className="flex justify-center items-center flex-col">
          <div className="flex">
            <input
              minLength={1}
              onChange={handleChange}
              value={submittedTasks}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  moveSubmitted();
                }
              }}
              type="text"
              className="border-2 rounded-md p-2 w-[600px]"
              placeholder="Add a new task"
            />
            <button
              onClick={moveSubmitted}
              disabled={!submittedTasks.trim()}
              className={`font-mono text-white rounded-md p-2 ml-2 ${
                submittedTasks.trim()
                  ? "bg-purple-900"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div
          key={crypto.randomUUID()}
          className="flex justify-start items-center mt-4 mx-10 grid-rows-1"
        >
          <ol className="flex flex-col items-start gap-4">
            {tasks.map((value, index) =>
              editingTask?.index === index && editingTask?.list === "tasks" ? (
                <div
                  key={crypto.randomUUID()}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <input
                    type="text"
                    value={editText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditText(e.target.value)
                    }
                    className=" font-mono border-2 rounded-md p-1 w-[200px]"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      editTask(index, tasks, setTasks, editText);
                      setEditingTask(null);
                      setEditText("");
                    }}
                    className="bg-purple-700 font-mono text-white rounded-md p-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingTask(null);
                      setEditText("");
                    }}
                    className="bg-red-600 font-mono text-white rounded-md p-1"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div
                  onDoubleClick={() => {
                    setEditingTask({ index, list: "tasks" });
                    setEditText(value);
                  }}
                  key={crypto.randomUUID()}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <label className="relative inline-block w-5 h-5 cursor-pointer">
                    <input
                      onChange={() => moveToCompleted(index)}
                      type="checkbox"
                      className="peer hidden"
                    />
                    <span
                      className="absolute inset-0 bg-white border-2 border-gray-500 rounded peer-checked:bg-purple-900 peer-checked:border-purple-900 transition-all duration-300 group-hover:border-purple-500 peer-focus:ring-2 peer-focus:ring-purple-500 peer-focus:ring-opacity-50"
                      aria-hidden="true"
                    ></span>
                    <span
                      className="absolute inset-0 scale-0 peer-checked:scale-100 peer-checked:checkmark-after transition-transform duration-200 ease-out"
                      aria-hidden="true"
                    ></span>
                  </label>
                  <li className="font-mono">{`${index + 1}. ${value}`}</li>
                  <button
                    onClick={() => deleteTask(index, tasks, setTasks)}
                    className="border rounded p-0.5"
                  >
                    X
                  </button>
                </div>
              )
            )}
          </ol>
        </div>

        <div className="flex justify-center pt-6">
          <h1 className="text-center font-mono font-extrabold">
            Completed Tasks
          </h1>
        </div>
        <div>
          <ol>
            {completedTasks.map((value, index) =>
              editingTask?.index === index &&
              editingTask?.list === "completedTasks" ? (
                <div
                  key={crypto.randomUUID()}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <input
                    type="text"
                    value={editText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditText(e.target.value)
                    }
                    className="border-2 rounded-md p-1 w-[200px]"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      editTask(
                        index,
                        completedTasks,
                        setCompletedTasks,
                        editText
                      );
                      setEditingTask(null);
                      setEditText("");
                    }}
                    className="bg-green-600 text-white rounded-md p-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingTask(null);
                      setEditText("");
                    }}
                    className="bg-red-600 text-white rounded-md p-1"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div
                  onDoubleClick={() => {
                    setEditingTask({ index, list: "completedTasks" });
                    setEditText(value);
                  }}
                  key={crypto.randomUUID()}
                  className="flex justify-start items-center mt-4 mx-10 grid-rows-1"
                >
                  <div className="flex items-center gap-2 border p-2 rounded">
                    <li className="font-mono">{`${index + 1}. ${value}`}</li>
                    <button
                      onClick={() =>
                        deleteTask(index, completedTasks, setCompletedTasks)
                      }
                      className="border rounded p-0.5"
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
