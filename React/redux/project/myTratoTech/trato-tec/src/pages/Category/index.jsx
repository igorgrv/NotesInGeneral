import Header from "components/Header";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Category.module.scss";
import Item from "components/item";

export default function Category() {
  const { categoryName } = useParams("categoryName");
  const { category, items } = useSelector((state) => {
    return {
      category: state.categories.find(
        (category) => category.id === categoryName
      ),
      items: state.items.filter((item) => item.category === categoryName),
    };
  });
  return (
    <div>
      <Header
        title={category.title}
        description={category.description}
        image={category.header}
      />
      <div className={styles.items}>
        {items?.map((item) => (
          <Item key={item.id} {...item}/>
        ))}
      </div>
    </div>
  );
}
