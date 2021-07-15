import React from "react";
import { useGlobalContext } from "./context";

const Filter = () => {
  const { filterPhrase, setFilterPhrase } = useGlobalContext();
  const handleFilter = (e) => {
    setFilterPhrase(e.currentTarget.value);
  };
  return (
    <div>
      <form>
        <input
          className="search-input"
          placeholder="Search"
          onChange={handleFilter}
          value={filterPhrase}
        />
      </form>
    </div>
  );
};

export default Filter;
