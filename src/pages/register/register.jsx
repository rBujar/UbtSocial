import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Ubt Social.</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
            voluptate unde facilis ab numquam asperiores fugiat, consectetur
            harum aliquid adipisci atque minima consequuntur aut quam excepturi,
            eius perspiciatis quisquam tempore!
          </p>
          <span>Do you have an account?</span>
          <button>Login</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
          </form>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
