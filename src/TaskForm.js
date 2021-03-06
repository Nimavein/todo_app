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
  };

  const handleFormChange = (e) => {
    setTaskData({
      ...taskData,
      isDone: !checked,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setAllTasksToAddData([...allTasksToAddData, taskData]);
  };

  return (
    <div className="task-form-container">
      {allTasksToAddData.map((task) => {
        return <Task key={task.name} {...task} taskData={taskData} />;
      })}
      <form className="task-form" onSubmit={(e) => handleAddTask(e, taskData)}>
        <div className="checkbox-input">
          <label>
            <input
              className="task-checkbox"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <span></span>
          </label>

          <input
            className="add-task-input"
            onChange={handleFormChange}
            required
            type="text"
            id="name"
            placeholder="Task Name"
          />
        </div>

        <button className="add-task-button">Add</button>
      </form>
    </div>
  );
};

export default TaskForm;
