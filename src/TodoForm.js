import { useGlobalContext } from "./context";
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";

const TodoForm = ({ handleAddTodoVisibility }) => {
  const [todoData, setTodoData] = useState();
  const { setTodoList, jwt, setOrder } = useGlobalContext();
  const [taskData, setTaskData] = useState({});
  const [allTasksToAddData, setAllTasksToAddData] = useState([]);

  const handleFormChange = (e) => {
    setTodoData({
      ...todoData,
      [e.currentTarget.id]: e.currentTarget.value,
      task: allTasksToAddData,
    });
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const bodyParameters = { name: todoData.name, task: todoData.task };
    axios
      .post(
        "https://recruitment.ultimate.systems/to-do-lists",
        bodyParameters,
        config
      )
      .then((response) => {
        // Handle success.
        axios
          .get("https://recruitment.ultimate.systems/to-do-lists", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then((response) => {
            setTodoList(response.data);
          });
        setAllTasksToAddData([]);
        setOrder(false);
        handleAddTodoVisibility();
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="form-backdrop">
      <div className="add-todo-container">
        <form className="add-todo-form" id="add-form">
          <input
            className="add-todo-name-input"
            onChange={handleFormChange}
            required
            type="text"
            id="name"
            placeholder="List name"
          />
        </form>
        <hr className="form-divider" />
        <TaskForm
          todoData={todoData}
          setTodoData={setTodoData}
          handleFormChange={handleFormChange}
          taskData={taskData}
          setTaskData={setTaskData}
          allTasksToAddData={allTasksToAddData}
          setAllTasksToAddData={setAllTasksToAddData}
        />
        <div className="add-todo-form-buttons">
          <button
            className="cancel-add-todo-button"
            onClick={handleAddTodoVisibility}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={(e) => handleAddTodo(e, todoData)}
            form="add-todo-form"
            className="save-add-todo-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
