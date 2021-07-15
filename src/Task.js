import React from "react";

const Task = ({ name, isDone }) => {
  console.log(name);

  return (
    <div>
      {name}
      {isDone && " is done"}
    </div>
  );
};

export default Task;
