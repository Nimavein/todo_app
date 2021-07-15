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
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isTaskDone}
        onChange={handleCheckboxChange}
      />
      {name}
    </div>
  );
};

export default Task;
