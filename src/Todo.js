import { useGlobalContext } from "./context";
import React, { useState } from "react";
import Task from "./Task";
import axios from "axios";
import TodoEditForm from "./TodoEditForm";

const Todo = ({ id, name, tasks, task }) => {
  const { todoList, setTodoList, jwt } = useGlobalContext();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteTodo = (id) => {
    const newTodos = todoList.filter((todo) => todo.id !== id);
    axios.delete(`https://recruitment.ultimate.systems/to-do-lists/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setTodoList(newTodos);
  };

  const handleEditVisibility = () => {
    setIsEditOpen(!isEditOpen);
  };

  return (
    <div>
      <h1>{name}</h1>
      {task &&
        task.map((singleTask) => {
          return <Task key={singleTask.name} {...singleTask} />;
        })}

      <button onClick={(e) => deleteTodo(id)}>delete</button>
      {/*}      {tasks.map((task) => {
        return <Task key={task.id} {...task} />;
      })}
    */}
      <button onClick={() => handleEditVisibility()}>edit</button>
      {isEditOpen && (
        <TodoEditForm
          id={id}
          name={name}
          task={task}
          handleEditVisibility={handleEditVisibility}
        />
      )}
    </div>
  );
};

export default Todo;
