import { useGlobalContext } from "./context";
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";
import Task from "./Task";

const TodoEditForm = ({ id, handleEditVisibility, name, task }) => {
  const [todoEditData, setTodoEditData] = useState();
  const { setTodoList, jwt, todoList, setOrder } = useGlobalContext();
  const [taskData, setTaskData] = useState({});
  const [allTasksToAddData, setAllTasksToAddData] = useState([]);
  const [todoName] = useState(name);

  const handleFormChange = (e) => {
    setTodoEditData({
      ...todoEditData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleEditTodo = (e) => {
    e.preventDefault();
    let allTodos = [...todoList];
    const todoTasks = allTodos.find((x) => x.id === id).task;
    // Request API.
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const bodyParameters = {
      name: todoName,
      ...(typeof todoEditData !== "undefined" && {
        name: todoEditData.name,
      }),
      task: [...allTasksToAddData, ...todoTasks],
    };
    axios
      .put(
        `https://recruitment.ultimate.systems/to-do-lists/${id}`,
        bodyParameters,
        config
      )
      .then((response) => {
        axios
          .get("https://recruitment.ultimate.systems/to-do-lists", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then((response) => {
            setTodoList(response.data);
          });
        setOrder(false);
        handleEditVisibility();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-form-backdrop">
      <div className="edit-todo-container">
        <form id="edit-form" className="edit-todo-form">
          <input
            className="edit-todo-name-input"
            onChange={handleFormChange}
            placeholder={name}
            type="text"
            id="name"
          />

          <hr className="form-divider" />

          {task &&
            task.map((singleTask) => {
              return (
                <Task
                  key={singleTask.name}
                  {...singleTask}
                  todoId={id}
                  todoName={name}
                  todoTasks={task}
                  isTaskAdded={true}
                />
              );
            })}
        </form>
        <TaskForm
          handleFormChange={handleFormChange}
          taskData={taskData}
          setTaskData={setTaskData}
          allTasksToAddData={allTasksToAddData}
          setAllTasksToAddData={setAllTasksToAddData}
        />
        <div className="edit-form-buttons">
          <button
            className="cancel-edit-todo-button"
            onClick={handleEditVisibility}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={(e) => handleEditTodo(e, todoEditData)}
            form="add-todo-form"
            className="save-edit-todo-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoEditForm;
