import classNames from "classnames";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import styles from "./Navbar.module.scss";
import { RiShoppingCart2Line, RiShoppingCartFill } from "react-icons/ri";
import Buscar from "components/Search";

let iconProps = {
  size: 24,
  color: "white",
};

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} />
      <div className={styles.links}>
        {/* classNames pode fazer juntar classes, basta pormos , */}
        <div>
          <a
            href="/"
            className={classNames(styles.link, {
              [styles.selected]: window.location.pathname === "/",
            })}
          >
            Página Inicial
          </a>
        </div>
      </div>
      <div className={styles.busca}>
        <Buscar />
      </div>
      <div className={styles.icones}>
        <a href="/carrinho">
          {window.location.pathname === "/carrinho" ? (
            <RiShoppingCartFill {...iconProps} />
          ) : (
            <RiShoppingCart2Line {...iconProps} />
          )}
        </a>
      </div>
    </nav>
  );
}
