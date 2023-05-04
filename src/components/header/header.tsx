import { useContext } from "react";
import { userLoggedIn } from "../../context/context";
import { STRING } from "../../controller/string";
import { User } from "../../interface/interface";
import styles from "../../styles/components/header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = (): JSX.Element => {
  const user: User | null = useContext(userLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    navigate("/");
  };

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>
        {STRING.WELCOME_TO}
        {user?.name}
      </h1>
      <button onClick={handleLogout} className={styles.logoutButton}>
        {STRING.LOGOUT}
      </button>
    </div>
  );
};

export default Header;
