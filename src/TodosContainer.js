import { useGlobalContext } from "./context";
import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import Filter from "./Filter";
import axios from "axios";

const TodosContainer = () => {
  const { todoList, setTodoList, filteredTodos, filterPhrase, jwt } =
    useGlobalContext();

  useEffect(async () => {
    const data = await axios.get(
      "https://recruitment.ultimate.systems/to-do-lists",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setTodoList(data.data);
    console.log(data.data);
  }, []);

  return (
    <div>
      <Link to="/">login page</Link>
      <Filter />
      {filterPhrase === ""
        ? todoList.map((todo) => {
            return <Todo key={todo.id} {...todo} />;
          })
        : filteredTodos.map((todo) => {
            return <Todo key={todo.id} {...todo} />;
          })}

      <TodoForm />
    </div>
  );
};

export default TodosContainer;
