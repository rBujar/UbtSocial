import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setInputs((prev) => ({...prev, [e.target.name]:e.target.value}));
  };

  const {login} = useContext(AuthContext);

  const handleLogin = async (e) =>{
    e.preventDefault()
    try{
      await login(inputs);
      navigate("/")
    }catch(err){
      setErr(err.response.data)
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello world!</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
            voluptate unde facilis ab numquam asperiores fugiat, consectetur
            harum aliquid adipisci atque minima consequuntur aut quam excepturi,
            eius perspiciatis quisquam tempore!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
          <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
          </form>
          {err && err}
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
