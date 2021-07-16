import React, { useState } from "react";
import { useGlobalContext } from "./context";

const Task = ({ name, isDone, id, todoId, todoName }) => {
  const [isTaskDone, setIsTaskDone] = useState(isDone);
  const { todoList, setTodoList } = useGlobalContext();

  const handleCheckboxChange = () => {
    setIsTaskDone(!isTaskDone);
    let allTodos = [...todoList];
    allTodos.find((x) => x.id === todoId).task.find((i) => i.id === id).isDone =
      !isTaskDone;
    setTodoList(allTodos);
  };

  return (
    <div className="single-task">
      <label>
        <input
          className="task-checkbox"
          type="checkbox"
          checked={isTaskDone}
          onChange={handleCheckboxChange}
        />
        <span></span>
      </label>

      <p className="task-name">{name}</p>
    </div>
  );
};

export default Task;
