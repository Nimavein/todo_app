import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { FaChevronDown } from "react-icons/fa";

const Sort = () => {
  const { todoList, setTodoList, setSortedBy, order, setOrder } =
    useGlobalContext();
  const [sortedById, setSortedById] = useState(true);
  const [sortedByName, setSortedByName] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSort = (e) => {
    if (e) {
      setOrder(false);
      setSelectedValue(e.target.value);
    }
  };

  useEffect(() => {
    if (selectedValue === "name" && sortedByName === false) {
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
    } else if (selectedValue === "name" && sortedByName === true) {
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
    } else if (selectedValue === "id" && sortedById === false) {
      const sortedTodoList = todoList.sort(function (a, b) {
        return a.id - b.id;
      });
      setSortedByName(false);
      setSortedById(true);
      setSortedBy("idAsc");
      setTodoList(sortedTodoList);
    } else if (selectedValue === "id" && sortedById === true) {
      const sortedTodoList = todoList.sort(function (a, b) {
        return b.id - a.id;
      });
      setSortedByName(false);
      setSortedById(false);
      setSortedBy("idDesc");
      setTodoList(sortedTodoList);
    }
  }, [selectedValue, order]);

  const changeOrder = () => {
    setOrder(!order);
  };

  return (
    <div>
      <button
        aria-label="order"
        className={
          order === false ? "change-sort-button" : "change-sort-button open"
        }
        onClick={changeOrder}
      >
        {selectedValue !== "" && <FaChevronDown className="arrow-icon" />}
      </button>
      <select
        onChange={(e) => handleSort(e)}
        value={selectedValue}
        className="sort-input"
        name="sort"
        id="sort"
      >
        <option value="" disabled defaultValue="sortBy">
          Sort By
        </option>
        <option value="id">Date</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default Sort;
