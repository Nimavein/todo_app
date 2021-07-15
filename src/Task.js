import React, { useState } from "react";
import { useGlobalContext } from "./context";
import axios from "axios";

const Task = ({ name, isDone, id, todoId, todoName }) => {
  const [isTaskDone, setIsTaskDone] = useState(isDone);
  const { todoList, setTodoList, jwt } = useGlobalContext();

  const handleCheckboxChange = () => {
    setIsTaskDone(!isTaskDone);
    let allTodos = [...todoList];
    allTodos.find((x) => x.id === todoId).task.find((i) => i.id === id).isDone =
      !isTaskDone;
    const changedTodoTasks = allTodos.find((x) => x.id === todoId).task;
    console.log(changedTodoTasks);
    setTodoList(allTodos);

    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const bodyParameters = {
      name: todoName,
      task: changedTodoTasks,
    };
    axios
      .put(
        `https://recruitment.ultimate.systems/to-do-lists/${todoId}`,
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

        console.log(todoList);
      });
  };

  return (
    <div>
      {name}
      <label>
        <input
          type="checkbox"
          checked={isTaskDone}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default Task;
