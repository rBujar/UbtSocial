import { Link, useNavigate} from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      username:"",
      email:"",
      password:"",
      name:"",
    });
    const [err, setErr] = useState(null);

    const handleChange = (e) =>{
      setInputs((prev) => ({...prev, [e.target.name]:e.target.value}));
    };

    const handleClick = async e =>{
      e.preventDefault();
      setErr(null)

      try{
        await axios.post("http://localhost:8800/api/auth/register", inputs)
        setInputs({username: "", email: "", password: "", name: ""});
        Navigate("/login")
        
      }catch(err){
        setErr(err.response.data);
      }
    };

    console.log(err)

  return (
    <div className="register">
      <div className="register-card">
        <div className="left">
          <h1>Ubt Social.</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
            voluptate unde facilis ab numquam asperiores fugiat, consectetur
            harum aliquid adipisci atque minima consequuntur aut quam excepturi,
            eius perspiciatis quisquam tempore!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            {err && <div className="error-message">{err}</div>}
          </form>
          <button onClick={handleClick}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
