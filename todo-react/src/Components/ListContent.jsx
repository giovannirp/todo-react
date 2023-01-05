import { useState } from "react";
import { Coments } from "./Coments";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle } from "phosphor-react";
import Clipboard from "../assets/clipboard.png";

import styles from "./ListContent.module.css";
import { MessagemTarefas } from "./MessagemTarefas";

export function ListContent() {
  
  const initialForm = {
    taskInput: '',
    filter: ''
  }

  const [newTasksComents, setNewTasksComents] = useState([]);

  const [formState, setFormState] = useState(initialForm);
  const [filter, setFilter] = useState('');

  const handleTasks = (event) => {
    const target = event.currentTarget
    const { value, name } = target;

    target.setCustomValidity("")

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleCreateTasks = (event) => {
    event.preventDefault();

    const objectContent = {
      id: uuidv4(),
      content: formState.taskInput,
      isComplete: false,
    };

    setNewTasksComents([...newTasksComents, objectContent]);
    formState.taskInput = ''
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
      if (task.id === id) {
        task.isComplete = event.target.checked;
        return task;
      }
      return task;
    });

    setNewTasksComents(taskNew);
  };

  const searchList = () => {
    setFilter(filter)
  }

  console.log("mey array", newTasksComents)

  const filterList = newTasksComents.filter(item => item.content.includes(formState.filter))

  const isTasksComments = formState.taskInput.length === 0;
  const lenghtTasks = newTasksComents.filter(
    (task) => task.isComplete == true
  ).length;

  return (
    <section className={styles.listContent}>
      <div>
        <form onSubmit={handleCreateTasks} className={styles.addTasks}>
          <input
            type="text"
            name="taskInput"
            value={formState.taskInput}
            placeholder="Adicione uma nova tarefa"
            onChange={handleTasks}
            onInvalid={handleNewTaskvalid}
            required
          />
          <button type="submit" disabled={isTasksComments}>
            <span>Criar</span> <PlusCircle size={17} />
          </button>
        </form>
      </div>

      <div className={styles.contentFeedTasks}>
        <strong>
          Tarefas criadas <span>{newTasksComents.length}</span>
        </strong>
        <strong>
          Concluídas{" "}
          <span>
            {lenghtTasks} de {newTasksComents.length}
          </span>
        </strong>
      </div>

      <input
        type="text"
        name="filter"
        value={formState.filter}
        onChange={handleTasks}
      />

      {filterList.map((comment) => {
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
        <MessagemTarefas
          image={Clipboard}
          messagePrimary="Você ainda não tem tarefas cadastradas"
          messageSecundary="Crie tarefas e organize seus itens a fazer"
        />
      )}
    </section>
  );
}
