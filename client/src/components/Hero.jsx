import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <h2>MERN Authentication</h2>
      <p>
        This is a boilerplate for MERN Authentication that stores a JWT in{" "}
        <br />
        HTTP-only cookies. It also uses Redux Toolkit and other libraries.
      </p>
      <div className="hero-buttons">
        <Link to={"/login"}>
          <button className="hero-button">Sign In</button>
        </Link>
        <Link to={"/register"}>
          <button className="hero-button">Sign Up</button>
        </Link>
      </div>
      <Link to={"/login"}>
        <button className="text-button">Already have an account?</button>
      </Link>
    </div>
  );
};

export default Hero;
