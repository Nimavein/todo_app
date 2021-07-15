import { useGlobalContext } from "./context";
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";

const TodoForm = () => {
  const [todoData, setTodoData] = useState();
  const { setTodoList, jwt } = useGlobalContext();
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
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div>
      <h1>Add todo form</h1>
      <form onSubmit={(e) => handleAddTodo(e, todoData)}>
        <div>
          <label>
            Name:
            <input onChange={handleFormChange} required type="text" id="name" />
          </label>
        </div>

        <div className="login-form-buttons">
          <button>Add</button>
        </div>
      </form>
      <TaskForm
        todoData={todoData}
        setTodoData={setTodoData}
        handleFormChange={handleFormChange}
        taskData={taskData}
        setTaskData={setTaskData}
        allTasksToAddData={allTasksToAddData}
        setAllTasksToAddData={setAllTasksToAddData}
      />
    </div>
  );
};

export default TodoForm;
