import styles from "./HeaderWithoutImage.module.scss";

export default function HeaderWithoutImage({ title, description }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.description}>{description}</h2>
    </div>
  );
}
