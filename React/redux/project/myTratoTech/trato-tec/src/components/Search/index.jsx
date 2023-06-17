import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeSearch, resetSearch } from "store/reducers/search";
import styles from "./Search.module.scss";

export default function Search() {
  const searchValue = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetSearch());
  }, [location.pathname, dispatch]);

  return (
    <div className={styles.busca}>
      <input
        className={styles.input}
        placeholder="Type here to search your products"
        value={searchValue}
        onChange={(e) => dispatch(changeSearch(e.target.value))}
      />
    </div>
  );
}
