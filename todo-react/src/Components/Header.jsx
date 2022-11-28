import logoTodo from '../assets/logo-todo.png';

import styles from "./Header.module.css";

export function Header() {
  return(
    <header className={styles.header}>
      <img src={logoTodo} alt="Logo Projeto" />
    </header>
  )
}