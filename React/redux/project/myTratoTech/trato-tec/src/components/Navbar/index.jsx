import classNames from "classnames";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import styles from "./Navbar.module.scss";
import { RiShoppingCart2Line, RiShoppingCartFill } from "react-icons/ri";
import Buscar from "components/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";

let iconProps = {
  size: 24,
  color: "white",
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} onClick={() => navigate("/")}/>
      <div className={styles.links}>
        <div>
          <Link
            to="/"
            className={classNames(styles.link, {
              [styles.selected]: location.pathname === "/",
            })}
          >
            Home Page
          </Link>
        </div>
      </div>
      <div className={styles.busca}>
        <Buscar />
      </div>
      <div className={styles.icones}>
        <Link to="/cart">
          {location.pathname === "/cart" ? (
            <RiShoppingCartFill {...iconProps} />
          ) : (
            <RiShoppingCart2Line {...iconProps} />
          )}
        </Link>
      </div>
    </nav>
  );
}
