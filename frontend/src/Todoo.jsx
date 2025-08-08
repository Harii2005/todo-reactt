import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Todoo.css";

export default function Todoo() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token, logout, user } = useAuth();

  // Fetch todos when the component mounts
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8080/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid, logout user
          logout();
          navigate("/login");
          return;
        }
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
    if (!token) {
      setError("You must be logged in to add tasks");
      return;
    }

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
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        throw new Error("Failed to add todo");
      }

      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
      setNewTask("");
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    if (!token) {
      setError("You must be logged in to delete tasks");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Mark a todo as done/undone
  const markAsDone = async (id, isDone) => {
    if (!token) {
      setError("You must be logged in to update tasks");
      return;
    }

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
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
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
    if (!token) {
      setError("You must be logged in to update tasks");
      return;
    }

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
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        throw new Error("Failed to mark all todos as done");
      }

      setTodos(todos.map((todo) => ({ ...todo, isDone: true })));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="todo-page">
      <div className="todo-container">
        {/* Header Section */}
        <div className="todo-header">
          <div className="header-content">
            <div className="header-title">
              <h1>Welcome back, {user?.username || "User"}!</h1>
              <p className="header-subtitle">Stay organized and productive</p>
            </div>
            <div className="header-actions">
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="add-task-section">
          <form
            className="add-task-form"
            onSubmit={(e) => {
              e.preventDefault();
              addNewTask();
            }}
          >
            <div className="add-task-input-group">
              <label htmlFor="new-task">Add a new task</label>
              <input
                id="new-task"
                className="add-task-input"
                placeholder="What needs to be done?"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="add-task-button"
              disabled={!newTask.trim()}
            >
              <span>Add Task</span>
            </button>
          </form>
        </div>

        {/* Tasks Section */}
        <div className="tasks-section">
          <div className="tasks-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-3)",
              }}
            >
              <h3 className="tasks-title">Your Tasks</h3>
              {todos.length > 0 && (
                <span className="tasks-count">{todos.length}</span>
              )}
            </div>
            {todos.length > 0 && (
              <div className="bulk-actions">
                <button
                  className="mark-all-done-button"
                  onClick={allDone}
                  disabled={todos.every((todo) => todo.isDone)}
                >
                  Mark All Complete
                </button>
              </div>
            )}
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>Add your first task above to get started!</p>
            </div>
          ) : (
            <div className="todo-list">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`todo-item ${todo.isDone ? "completed" : ""}`}
                >
                  <div className="todo-content">
                    <div
                      className={`todo-checkbox ${
                        todo.isDone ? "checked" : ""
                      }`}
                      onClick={() => markAsDone(todo._id, !todo.isDone)}
                    />
                    <span className="todo-text">{todo.task}</span>
                  </div>
                  <div className="todo-actions">
                    <button
                      onClick={() => markAsDone(todo._id, !todo.isDone)}
                      className={`todo-action-button ${
                        todo.isDone ? "undo-button" : "complete-button"
                      }`}
                    >
                      {todo.isDone ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="todo-action-button delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
