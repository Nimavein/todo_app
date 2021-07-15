import React from "react";
import { useGlobalContext } from "./context";

const Filter = () => {
  const { filterPhrase, setFilterPhrase } = useGlobalContext();
  const handleFilter = (e) => {
    setFilterPhrase(e.currentTarget.value);
  };
  return (
    <div>
      <h3>filter</h3>
      <form>
        <input onChange={handleFilter} value={filterPhrase} />
      </form>
    </div>
  );
};

export default Filter;
