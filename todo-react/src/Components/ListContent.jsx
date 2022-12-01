import { useState } from "react";
import { Coments } from "./Coments";
import { v4 as uuidv4 } from 'uuid';

import styles from "./ListContent.module.css";

import { notes } from "./notes.jsx";

export function ListContent() {
  const [newTasksComents, setNewTasksComents] = useState([
    "Javascript"
  ]);
  const [newTasksInput, setNewTasksInput] = useState("");

  const handleNewTasks = (event) => {
    setNewTasksInput(event.target.value);
  };

  const handleCreateTasks = (event) => {
    event.preventDefault();
    console.log("aquii");
    setNewTasksComents([...newTasksComents, newTasksInput]);
    setNewTasksInput("");
  };

  const deleteComent = (toDelete) => {
    const commentsDeleteOne = newTasksComents.filter((comment) => {
      return comment !== toDelete;
    });

    setNewTasksComents(commentsDeleteOne);
  };

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
      <p>Tarefas criadas {newTasksComents.length}</p>
      {newTasksComents.map((comment) => {
        console.log(uuidv4())
        return (
          <div>
            <Coments key={uuidv4()} content={comment} onDelete={deleteComent} />
          </div>
        );
      })}
    </section>
  );
}
