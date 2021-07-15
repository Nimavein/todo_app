import { useGlobalContext } from "./context";
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";

const TodoEditForm = ({ id, handleEditVisibility, name }) => {
  const [todoEditData, setTodoEditData] = useState();
  const { todoList, setTodoList, jwt } = useGlobalContext();
  const [taskData, setTaskData] = useState({});
  const [allTasksToAddData, setAllTasksToAddData] = useState([]);
  const [todoName, setTodoName] = useState(name);
  const [oldTasks, setOldTasks] = useState([]);

  const handleFormChange = (e) => {
    setTodoEditData({
      ...todoEditData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    axios
      .get(`https://recruitment.ultimate.systems/to-do-lists/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log(response.data.task);
        setOldTasks(response.data.task);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditTodo = (e) => {
    e.preventDefault();
    console.log(todoName);
    // Request API.
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const bodyParameters = {
      name: todoName,
      ...(typeof todoEditData !== "undefined" && {
        name: todoEditData.name,
      }),
      task: [...allTasksToAddData, ...oldTasks],
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
        handleEditVisibility();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>edit todo form</h2>
      <form onSubmit={(e) => handleEditTodo(e, todoEditData)}>
        <div>
          <label>
            Name:
            <input onChange={handleFormChange} type="text" id="name" />
          </label>
        </div>

        <div className="login-form-buttons">
          <button>edit</button>
        </div>
      </form>
      <TaskForm
        handleFormChange={handleFormChange}
        taskData={taskData}
        setTaskData={setTaskData}
        allTasksToAddData={allTasksToAddData}
        setAllTasksToAddData={setAllTasksToAddData}
      />
    </div>
  );
};

export default TodoEditForm;
