import Header from "components/Header";
import styles from "./Home.module.scss";
import watch from "assets/inicial.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const categories = useSelector(state => state.categories)
  return (
    <div>
      <Header
        title="Tech Products"
        description="Buy different types of products on the best site in Brazil!"
        image={watch}
        className={styles.header}
      />
      <div className={styles.categories}>
        <div className={styles["categories-title"]}>
          <h1>Categories</h1>
        </div>
        <div className={styles["categories-container"]}>
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <img src={category.thumbnail} alt={category.title} />
                <h1>{category.title}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
