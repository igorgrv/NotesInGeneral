import Header from "components/Header";
import styles from "./Home.module.scss";
import watch from "assets/inicial.png";

export default function Home() {
  return (
    <div>
      <Header
        title="Classificados Tech"
        description="Compre diversos tipos de produtos no melhor site do Brasil!"
        image={watch}
        className={styles.header}
      />
    </div>
  );
}
