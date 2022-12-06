import styles from "./Message.module.css";

export function MessagemTarefas({image, messagePrimary, messageSecundary}) {
  return (
    <div className={styles.contentMenssage}>
      <img src={image} title="Imagem Clipboard" />
      <p>
        <strong>{messagePrimary}</strong> <br />
        {messageSecundary}
      </p>
    </div>
  );
}
