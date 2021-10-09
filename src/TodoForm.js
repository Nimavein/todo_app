import { useGlobalContext } from "./context";
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";
const TodoForm = ({ handleAddTodoVisibility }) => {
  const [todoData, setTodoData] = useState();
  const { setTodoList, jwt, setOrder } = useGlobalContext();
  const [taskData, setTaskData] = useState([]);
  const [allTasksToAddData, setAllTasksToAddData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFormChange = (e) => {
    setTodoData({
      ...todoData,
      [e.currentTarget.id]: e.currentTarget.value,
      task: allTasksToAddData,
    });
  };

  useEffect(() => {
    setTodoData({
      ...todoData,
      task: allTasksToAddData,
    });
  }, [allTasksToAddData]);

  const handleAddTodo = (e) => {
    if (todoData) {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const bodyParameters = { name: todoData.name, task: todoData.task };
      axios
        .post(
          "https://thingproxy.freeboard.io/fetch/https://recruitment.ultimate.systems/to-do-lists",
          bodyParameters,
          config
        )
        .then((response) => {
          axios
            .get(
              "https://thingproxy.freeboard.io/fetch/https://recruitment.ultimate.systems/to-do-lists",
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            )
            .then((response) => {
              setTodoList(response.data);
            });
          setAllTasksToAddData([]);
          setOrder(false);
          handleAddTodoVisibility();
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
        });
    } else {
      setErrorMessage("List must have a name");
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);
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
        {errorMessage && <p className="add-todo-error">{errorMessage}</p>}
        <div className="add-todo-form-buttons">
          <button
            className="cancel-add-todo-button"
            onClick={handleAddTodoVisibility}
            type="button"
          >
            Cancel
          </button>
          <button
            type="submit"
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
