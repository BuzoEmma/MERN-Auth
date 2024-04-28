import { FaRegHandPointRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice.js";
import { logout } from "../slices/authSlice.js";



const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfor);

  const [logouApiCall] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await logouApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="main-nav">
        <nav className="navbar">
          <Link to={"/"}>
            <div className="navbar-logo">MERN AUTH</div>
          </Link>

          <div className="navbar-buttons">
            {userInfo ? (
              <>
                <div className="dropDown">
                  <h3>{userInfo.name}</h3>
                  <div className="dropDown-list">
                    <Link to={"/profile"}>Profile</Link>
                    <div className="logout-profile" onClick={handleLogout}>
                      Logout
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <button className="navbar-button">
                    <FaRegHandPointRight /> Sign In
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button className="navbar-button">
                    <FaRegHandPointRight /> Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
