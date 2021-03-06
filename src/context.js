import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [filterPhrase, setFilterPhrase] = useState("");
  const [jwt, setJwt] = useState();
  const [sortedBy, setSortedBy] = useState();
  const [order, setOrder] = useState(false);

  let filteredTodos = todoList.filter((todo) =>
    todo.name.includes(filterPhrase)
  );

  useEffect(() => {
    if (localStorage.hasOwnProperty("jwt") === true) {
      const token = localStorage.getItem("jwt");
      setJwt(token);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        todoList,
        setTodoList,
        filterPhrase,
        setFilterPhrase,
        filteredTodos,
        jwt,
        setJwt,
        sortedBy,
        setSortedBy,
        order,
        setOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
