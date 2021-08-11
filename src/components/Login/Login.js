import './Login.css';
import { Link,useHistory } from 'react-router-dom';
import { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext";


const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault()
        console.log("Indide handle login");
    
        try {
          setError("")
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          history.push("/")
        } catch {
          setError("Failed to log in");
        }
    
        setLoading(false)
      }

    return (

        <div className="login">
            <center>
            {error && 
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
            }
            { loading && <div className="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>}
            <form onSubmit={ handleLogin }>
                    <h2 className="text-primary mb-4">Login to continue.</h2>

                    <div className="mb-3">
                    <input type="email" ref={ emailRef } className="form-control email" placeholder="Enter email"/>
                    </div>

                    <div className="mb-3">
                    <input type="password" ref={ passwordRef} className="form-control password" placeholder="Enter password"/>
                    </div>

                    <button type="submit" disabled={ loading } className="btn btn-primary btn-login mb-3">Login</button>

                    <br />

                    <Link to="/reset-password">Forgot Password ?</Link>

                    <br />

                    <span>Create an account ? <Link to="/signup">Signup</Link></span>

                </form>
            </center>
        </div>

    );
}
 
export default Login;