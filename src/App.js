import React, { useState, useEffect } from "react";

function ToDoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://assets.breatheco.de/apis/fake/todos/")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== "") {
      setTasks([...tasks, task]);
      setTask("");
      fetch("http://assets.breatheco.de/apis/fake/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ label: task })
      })
        .then(res => res.json())
        .then(data => console.log("Task added:", data))
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    const taskToDelete = newTasks[index];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    fetch(`http://assets.breatheco.de/apis/fake/todos/${taskToDelete.id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => console.log("Task deleted:", data))
      .catch(err => console.error(err));
  };

  const handleDeleteAll = () => {
    setTasks([]);
    fetch("http://assets.breatheco.de/apis/fake/todos/", {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => console.log("All tasks deleted:", data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "100px", padding: "20px" }}>
      <div style={{ width: "50%", textAlign: "center" }}>
        <h1>To Do App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={handleChange}
            style={{
              display: "block",
              margin: "0 auto",
              padding: "10px",
              width: "75%",
              border: "none",
              borderBottom: "1px solid grey"
            }}
          />
        </form>
        <div>
          {tasks.length > 0 ? (
            tasks.map((t, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", padding: "10px" }}>
                <p>{t}</p>
                <button style={{ padding: "5px", border: "none" }} onClick={() => handleDelete(index)}>X</button>
              </div>
            ))
          ) : (
            <p style={{ border: "1px solid grey", background: "blue", padding: "10px" }}><strong>No tasks, add a task</strong></p>
          )}
        </div>
        <p style={{ fontSize: "10px", marginTop: "10px" }}>
          {tasks.length} item{tasks.length === 1 ? "" : "s"} left
        </p>
        <button onClick={handleDeleteAll}>Delete all tasks</button>
      </div>
    </div>
  )};
export default ToDoApp;