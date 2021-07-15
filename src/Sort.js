import React from "react";
import { useGlobalContext } from "./context";

const Sort = () => {
  const { todoList, setTodoList, sortedBy, setSortedBy } = useGlobalContext();
  const handleSort = (byWhat) => {
    if (byWhat === "name") {
      const sortedTodoList = todoList.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setSortedBy("name");
      console.log(sortedTodoList);
      setTodoList(sortedTodoList);
    } else if (byWhat === "id") {
      const sortedTodoList = todoList.sort(function (a, b) {
        return a.id - b.id;
      });
      setSortedBy("id");
      console.log(sortedTodoList);
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
