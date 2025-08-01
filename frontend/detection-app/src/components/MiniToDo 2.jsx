import { useState, useEffect } from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';
import '../styles/MiniToDo.css'; 

const MiniToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todo");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  const update = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("todo", JSON.stringify(newTasks));
  };

  return (
    <div className="todo-panel">

      <h3>To-Do</h3>

      <div className="todo-input-group">
        <input
          type="text"
          placeholder="Add task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            update([...tasks, { id: Date.now(), text: input, done: false }]);
            setInput("");
          }}
        >
          Add
        </button>
      </div>

      <ul className="todo-list">
        {tasks.length === 0 && <li className="empty">No tasks to show</li>}
        {tasks.map(task => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <span onClick={() =>
              update(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))
            }>
              {task.text}
            </span>
            <div className="todo-actions">
              <CheckCircle
                size={16}
                onClick={() =>
                  update(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))
                }
              />
              <Trash2
                size={16}
                onClick={() =>
                  update(tasks.filter(t => t.id !== task.id))
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniToDo;
