import { Trash } from "phosphor-react";
import styles from "./Coments.module.css";

export function Coments({id, content, onDelete, onTaksChecked }) {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleCheck = (event) => {
    onTaksChecked(event, id)
  }

  return (
    <div className={styles.boxList}>
      <input type="checkbox" title="Marcar Tarefa" onChange={handleCheck} />

      <p>{content}</p>
      <button
        onClick={handleDelete}
        className={styles.buttonTrash}
        title="Deletar comentário"
      >
        <Trash size={24} />
      </button>
    </div>
  );
}
