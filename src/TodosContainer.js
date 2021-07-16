import { useGlobalContext } from "./context";
import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import Filter from "./Filter";
import axios from "axios";
import Sort from "./Sort";
import add from "./images/add.png";

const TodosContainer = () => {
  const [isAddTodoVisible, setIsAddTodoVisible] = useState(false);
  const [isEditTodoVisible, setIsEditTodoVisible] = useState(false);
  const { todoList, setTodoList, filteredTodos, filterPhrase, sortedBy } =
    useGlobalContext();

  const token = localStorage.getItem("jwt");

  useEffect(async () => {
    const data = await axios.get(
      "https://recruitment.ultimate.systems/to-do-lists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodoList(data.data);
  }, []);

  useEffect(() => {}, [sortedBy]);

  const handleAddTodoVisibility = () => {
    setIsAddTodoVisible(!isAddTodoVisible);
  };

  return (
    <div className="todos-container">
      {todoList.length === 0 && "Your list is empty"}
      <div className="content">
        {" "}
        <div className="filter-sort">
          <Filter />
          <Sort />
        </div>
        {filterPhrase === ""
          ? todoList.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  {...todo}
                  isEditTodoVisible={isEditTodoVisible}
                  setIsEditTodoVisible={setIsEditTodoVisible}
                />
              );
            })
          : filteredTodos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  {...todo}
                  isEditTodoVisible={isEditTodoVisible}
                  setIsEditTodoVisible={setIsEditTodoVisible}
                />
              );
            })}
        <img
          className="add-todo-button"
          src={add}
          alt="add list"
          onClick={handleAddTodoVisibility}
        />
        {isAddTodoVisible && (
          <TodoForm handleAddTodoVisibility={handleAddTodoVisibility} />
        )}
      </div>
    </div>
  );
};

export default TodosContainer;
