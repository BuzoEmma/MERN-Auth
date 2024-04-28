import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormContainter from "../components/FormContainter";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfor);
  console.log(userInfo);
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({...res}));
      } catch (err) {
        toast.error(err?.data?.message || err.error?.message);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <FormContainter>
      {isLoading && <Loader />}
      <h1>Sign In</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            value={name}
            name="name"
            id="name"
            autoComplete="name"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            name="email"
            id="email"
            autoComplete="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder=" Password"
            autoComplete="new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Ponfirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            name="confirmpassword"
            id="confirmPassword"
            autoComplete="new password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="submit-button" type="submit">
          Sign In
        </button>

        <div className="register-link">
          Already have an account? <Link to="/login">logIn</Link>
        </div>
      </form>
    </FormContainter>
  );
};

export default RegisterScreen;
