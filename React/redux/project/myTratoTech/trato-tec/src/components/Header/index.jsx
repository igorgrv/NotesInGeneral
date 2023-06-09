import styles from "./Header.module.scss";
export default function Header({ title, description, image, className = "" }) {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles["header-text"]}>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div className={styles["header-image"]}>
        <img src={image} alt={title} className={className} />
      </div>
    </header>
  );
}
