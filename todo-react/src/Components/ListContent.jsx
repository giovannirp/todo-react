import { useState } from "react";
import { Coments } from "./Coments";
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from "phosphor-react";
import Clipboard from '../assets/clipboard.png';

import styles from "./ListContent.module.css";

import { notes } from "./notes.jsx";

export function ListContent() {
  const [newTasksComents, setNewTasksComents] = useState([
    "javascript"
  ]);
  const [newTasksInput, setNewTasksInput] = useState("");

  const handleNewTasks = (event) => {
    event.target.setCustomValidity("");
    setNewTasksInput(event.target.value);
  };

  const handleCreateTasks = (event) => {
    event.preventDefault();
    setNewTasksComents([...newTasksComents, newTasksInput]);
    setNewTasksInput("");
  };

  const deleteComent = (toDelete) => {
    const commentsDeleteOne = newTasksComents.filter((comment) => {
      return comment !== toDelete;
    });

    setNewTasksComents(commentsDeleteOne);
  };

  const handleNewTaskvalid = (event) => {
    event.target.setCustomValidity("Esse campo é obrigatório...")
  }
  
  const isTasksComments = newTasksInput.length === 0;

  return (
    <section className={styles.listContent}>
      <div>
        <form onSubmit={handleCreateTasks} className={styles.addTasks}>
          <input
            type="text"
            value={newTasksInput}
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTasks}
            onInvalid={handleNewTaskvalid}
            required
          />
          <button type="submit" disabled={isTasksComments}>
            <span>Criar</span> <PlusCircle size={17} />
          </button>
        </form>
      </div>
      <p>Tarefas criadas {newTasksComents.length}</p>
      {newTasksComents.map((comment) => {
        return (
          <div>
            <Coments key={uuidv4()} content={comment} onDelete={deleteComent} />
          </div>
        );
      })}
      {newTasksComents.length === 0 && (
        <div>
          <img src={Clipboard} title="Imagem Clipboard" />
          <p>
            Você ainda não tem tarefas cadastradas <br />
            Crie tarefas e organize seus itens a fazer 
          </p>
        </div>
      )}
    </section>
  );
}
