import styles from "./HeaderWithImage.module.scss";

export default function HeaderWithImage({
  title,
  description,
  image,
  className,
}) {
  return (
    <div className={`${className} ${styles.header}`}>
      <div className={styles["header-text"]}>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div className={styles["header-image"]}>
        <img src={image} alt={title} />
      </div>
    </div>
  );
}
