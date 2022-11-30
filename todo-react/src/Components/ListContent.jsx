import { useState } from "react";
import styles from "./ListContent.module.css";

import { notes } from "./notes.jsx";

export function ListContent() {
  const [newTasksComents, setNewTasksComents] = useState([]);
  const [newTasksInput, setNewTasksInput] = useState("");
  console.log(newTasksInput)
 
  const handleNewTasks = (event) => {
    setNewTasksInput(event.target.value)
  }

  const handleCreateTasks = (event) => {
    event.preventDefault();
    console.log("aquii")
    setNewTasksComents([...newTasksComents, newTasksInput])
    console.log(newTasksComents)
  }

  return (
    <section className={styles.listContent}>
      <div>
        <form onSubmit={handleCreateTasks}>
          <input
            type="text"
            value={newTasksInput}
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTasks}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
      {notes.map((note) => {
        return (
          <div className={styles.boxList} key={note.id}>
            <p>{note.title}</p>
          </div>
        );
      })}
    </section>
  );
}
