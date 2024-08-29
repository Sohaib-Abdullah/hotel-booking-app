import { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <span className="logo">lamabooking</span>
        {user ? (
          <span>{user.username}</span>
        ) : (
          <div className="navItems">
            <Link to="/register" className="navbarButton">
              Register
            </Link>
            <Link to="/login" className="navbarButton">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
