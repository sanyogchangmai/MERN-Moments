import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Inside handleSubmit");
    console.log(emailRef.current.value);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      console.log("inside try 1");
      setLoading(true);
      console.log("inside try 2");
      await signup(emailRef.current.value, passwordRef.current.value)
      console.log("inside try 3");
      history.push("/");
      console.log("inside try");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="signup">
      <center>
        {error && 
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        }

        { loading && <div className="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>}

        {/* { currentUser.email} */}

        <form onSubmit={ handleSubmit }>
          <h2 className="text-primary mb-4">Create an account.</h2>

          <div className="mb-3">
            <input
              type="email"
              ref={emailRef}
              className="form-control email"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              ref={passwordRef}
              className="form-control password"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              ref={passwordConfirmRef}
              className="form-control password"
              placeholder="Confirm password"
            />
          </div>

          <button
            disabled={ loading }
            type="submit"
            className="btn btn-primary btn-signup mb-3"
          >
            Create account
          </button>

          <br />

          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </center>
    </div>
  );
};

export default Signup;
