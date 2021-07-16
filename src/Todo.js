import { useGlobalContext } from "./context";
import React, { useState } from "react";
import axios from "axios";
import TodoEditForm from "./TodoEditForm";
import { FaTrash } from "react-icons/fa";

const Todo = ({ id, name, task, created_at }) => {
  const { todoList, setTodoList, jwt } = useGlobalContext();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const whenCreated = created_at.slice(0, 10);
  const allTasksNumber = task.length;
  const doneTasksNumber = task.filter((item) => item.isDone === true).length;

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
    <div onClick={() => handleEditVisibility()} className="todo">
      <p className="todo-name">{name}</p>
      <p className="todo-create-date">{`Created at: ${whenCreated}`}</p>
      <div className="tasks-numbers">
        <p className="completed-tasks-text">{`Completed: ${doneTasksNumber}`}</p>
        <p className="uncompleted-tasks-text">{`Uncompleted: ${
          allTasksNumber - doneTasksNumber
        }`}</p>
        <p className="all-tasks-text">{`All: ${allTasksNumber}`}</p>
      </div>
      <button className="todo-delete-button" onClick={(e) => deleteTodo(id)}>
        <FaTrash className="delete-icon" />
      </button>
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
