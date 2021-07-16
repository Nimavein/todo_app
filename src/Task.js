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
    setTodoList(allTodos);
  };

  return (
    <div className="single-task">
      <input
        className="task-checkbox"
        type="checkbox"
        checked={isTaskDone}
        onChange={handleCheckboxChange}
      />

      <p className="task-name">{name}</p>
    </div>
  );
};

export default Task;
