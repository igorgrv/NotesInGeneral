import styles from "./Search.module.scss";

export default function Search() {
  return (
    <div className={styles.busca}>
      <input
        className={styles.input}
        placeholder="Type here to search your products"
      />
    </div>
  );
}
