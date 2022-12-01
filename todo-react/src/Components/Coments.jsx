import { Trash } from "phosphor-react";
import styles from "./Coments.module.css";

export function Coments(props) {
  const handleDelete = () => {
    props.onDelete(props.content);
  };

  return (
    <div className={styles.boxList} key={props.id}>
      <p>{props.content}</p>
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
