import React, { useState } from "react";
import { useGlobalContext } from "./context";

const Sort = () => {
  const { todoList, setTodoList, setSortedBy } = useGlobalContext();
  const [sortedById, setSortedById] = useState(true);
  const [sortedByName, setSortedByName] = useState(false);

  const handleSort = (byWhat) => {
    if (byWhat === "name" && sortedByName === false) {
      const sortedTodoList = todoList.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        const order = nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        return order;
      });
      setSortedById(false);
      setSortedByName(true);
      setSortedBy("nameAsc");
      setTodoList(sortedTodoList);
    } else if (byWhat === "name" && sortedByName === true) {
      const sortedTodoList = todoList.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        const order = nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        return order;
      });
      setSortedById(false);
      setSortedByName(false);
      setSortedBy("nameDesc");
      setTodoList(sortedTodoList);
    } else if (byWhat === "id" && sortedById === false) {
      const sortedTodoList = todoList.sort(function (a, b) {
        return a.id - b.id;
      });
      setSortedByName(false);
      setSortedById(true);
      setSortedBy("idAsc");
      setTodoList(sortedTodoList);
    } else if (byWhat === "id" && sortedById === true) {
      const sortedTodoList = todoList.sort(function (a, b) {
        return b.id - a.id;
      });
      setSortedByName(false);
      setSortedById(false);
      setSortedBy("idDesc");
      setTodoList(sortedTodoList);
    }
  };
  return (
    <div>
      <button onClick={() => handleSort("name")}>SortByName</button>
      <button onClick={() => handleSort("id")}>SortByDate</button>
    </div>
  );
};

export default Sort;
