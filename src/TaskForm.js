import React, { useState } from "react";
import Task from "./Task";

const TaskForm = ({
  taskData,
  setTaskData,
  allTasksToAddData,
  setAllTasksToAddData,
}) => {
  const [checked, setChecked] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    setTaskData({
      ...taskData,
      isDone: checked,
    });
    console.log(taskData);
  };

  const handleFormChange = (e) => {
    setTaskData({
      ...taskData,
      isDone: !checked,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    console.log(taskData);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setAllTasksToAddData([...allTasksToAddData, taskData]);
    console.log(allTasksToAddData);
  };

  return (
    <div className="task-form">
      {allTasksToAddData.map((task) => {
        return <Task key={task.name} {...task} taskData={taskData} />;
      })}
      <form onSubmit={(e) => handleAddTask(e, taskData)}>
        <div>
          <input type="checkbox" onChange={handleCheckboxChange} />

          <input
            onChange={handleFormChange}
            required
            type="text"
            id="name"
            placeholder="Task Name"
          />
        </div>

        <div>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
