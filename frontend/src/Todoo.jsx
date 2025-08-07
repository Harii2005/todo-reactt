import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Todoo.css";

export default function Todoo() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Get token from localStorage
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to /login to render Login.jsx
      return null;
    }
    return token;
  };

  // Fetch todos from the backend
  const fetchTodos = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const response = await fetch("http://localhost:8080/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add a new todo
  const addNewTask = async () => {
    if (!newTask.trim()) return;

    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8080/api/todos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
      setNewTask("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Mark a todo as done/undone
  const markAsDone = async (id, isDone) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Mark all todos as done
  const allDone = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(
        "http://localhost:8080/api/todos/markall/done",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark all todos as done");
      }

      setTodos(todos.map((todo) => ({ ...todo, isDone: true })));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <button onClick={() => navigate("/signup")}>SignUp</button>
      <div className="container">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
        <div>
          <h1>Todo App</h1>
          <input
            style={{ marginLeft: "10px", padding: "5px" }}
            placeholder="add task"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addNewTask}
            style={{
              marginLeft: "10px",
              padding: "8px 30px",
              backgroundColor: "skyblue",
            }}
          >
            Add
          </button>
        </div>
        <div>
          <h4>Tasks to do</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ul>
            {todos.map((todo) => (
              <li
                key={todo._id}
                style={todo.isDone ? { textDecoration: "line-through" } : {}}
              >
                {todo.task}
                <button
                  onClick={() => deleteTodo(todo._id)}
                  style={{ marginLeft: "50px" }}
                >
                  Delete
                </button>
                <button onClick={() => markAsDone(todo._id, !todo.isDone)}>
                  {todo.isDone ? "Undo" : "Done"}
                </button>
              </li>
            ))}
          </ul>
          <br />
          <button
            style={{
              marginRight: "40px",
              backgroundColor: "red",
              padding: "8px 30px",
            }}
            onClick={allDone}
          >
            Mark All Done
          </button>
        </div>
      </div>
    </>
  );
}
