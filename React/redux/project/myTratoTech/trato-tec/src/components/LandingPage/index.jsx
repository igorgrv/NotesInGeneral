import Navbar from "components/Navbar";
import styles from "./LandingPage.module.scss";
import Footer from "components/Footer";
import { Outlet } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles["container-outlet"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
