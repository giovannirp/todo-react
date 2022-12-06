import { useState } from "react";
import { Coments } from "./Coments";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle } from "phosphor-react";
import Clipboard from "../assets/clipboard.png";

import styles from "./ListContent.module.css";

export function ListContent() {
  const [newTasksComents, setNewTasksComents] = useState([]);

  const [newTasksInput, setNewTasksInput] = useState("");

  const handleNewTasks = (event) => {
    event.target.setCustomValidity("");
    setNewTasksInput(event.target.value);
  };

  const handleCreateTasks = (event) => {
    event.preventDefault();

    const objectContent = {id: uuidv4(), content: newTasksInput, isComplete: false}

    setNewTasksComents([...newTasksComents, objectContent])
    setNewTasksInput("");
  };

  const deleteComent = (toDelete) => {
    const commentsDeleteOne = newTasksComents.filter((comment) => {
      return comment.id !== toDelete;
    });

    setNewTasksComents(commentsDeleteOne);
  };

  const handleNewTaskvalid = (event) => {
    event.target.setCustomValidity("Esse campo é obrigatório...");
  };

  const taksCheck = (event, id) => {
    const taskNew = newTasksComents.map((task) => {
      if(task.id === id) {
        task.isComplete = event.target.checked;
        return task;
      }
      return task;
    })

    setNewTasksComents(taskNew)
  }

  const isTasksComments = newTasksInput.length === 0;
  const lenghtTasks = newTasksComents.filter((task) => task.isComplete == true).length;

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

      <div className={styles.contentFeedTasks}>
        <strong>Tarefas criadas <span>{newTasksComents.length}</span></strong>
        <strong>Concluídas <span>{lenghtTasks} de {newTasksComents.length}</span></strong>
      </div>

      {newTasksComents.map((comment) => {
        return (
          <div>
            <Coments
              id={comment.id}
              content={comment.content}
              onDelete={deleteComent}
              onTaksChecked={taksCheck}
            />
          </div>
        );
      })}
      {newTasksComents.length === 0 && (
        <div className={styles.contentMenssage}>
          <img src={Clipboard} title="Imagem Clipboard" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong> <br />
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      )}
    </section>
  );
}
