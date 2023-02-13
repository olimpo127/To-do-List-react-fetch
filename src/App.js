import React, { useState, useEffect } from "react";

function ToDoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== "") {
      setTasks([...tasks, { label: task, done: false }]);
      setTask("");
      fetch("https://assets.breatheco.de/apis/fake/todos/user/olimpo127")
        .then((res) => res.json())
        .then((data) => {
          const updatedTasks = [...data, { label: task, done: false }];
          console.log("Task added:", updatedTasks);
          return updatedTasks;
        })
        .then((updatedTasks) => {
          fetch("https://assets.breatheco.de/apis/fake/todos/user/olimpo127", {
            method: "PUT",
            body: JSON.stringify(updatedTasks),
            headers: {
              "Content-Type": "application/json",
            },
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    fetch("http://assets.breatheco.de/apis/fake/todos/user/olimpo127", {
      method: "PUT",
      body: JSON.stringify(newTasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Task deleted:", newTasks);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteAll = () => {
    setTasks([]);
    fetch("http://assets.breatheco.de/apis/fake/todos/user/olimpo127", {
      method: "PUT", 
      body: JSON.stringify([{label: "none", done: false}]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => console.log("All tasks deleted:", data))
      .catch(err => console.error(err));
  };

  /*const createToDoUser = () => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/olimpo127", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "the user was created"))
      .catch((error) => console.log(error));
  };*/

  const getTasks = () => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/olimpo127")
      .then((res) => res.json())
      .then((data) => {
        console.log("Tasks Loaded:", data);
        setTasks(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //createToDoUser();
    getTasks();
  }, []);

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
            tasks.map((task, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", padding: "10px" }}>
                <p>{task.label}</p>
                <button style={{ padding: "5px", border: "none" }} onClick={() => handleDelete(index)}>X</button>
              </div>
            ))
          ) : (
            <p style={{ border: "1px solid grey", background: "lightblue", padding: "10px" }}><strong>No tasks, add a task</strong></p>
          )}
        </div>
        <p style={{ fontSize: "10px", marginTop: "10px" }}>
          {tasks.length} item{tasks.length === 1 ? "" : "s"} left
        </p>
        <button onClick={handleDeleteAll}>Delete all tasks</button>
      </div>
    </div>
  )
};
export default ToDoApp;