import { useEffect, useState } from "react";
import FormContainter from "../components/FormContainter";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfor);
  const [profile, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const res = await profile({
          _id: userInfo._id,
          email,
          name,
          password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("profile updated");
      } catch (err) {
        toast(err?.data?.message || err.message);
      }
    }
  };

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  return (
    <FormContainter>
      {isLoading && <Loader />}
      <h1>Update Profile</h1>

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
          Update
        </button>
      </form>
    </FormContainter>
  );
};

export default Profile;
