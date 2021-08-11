import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import './ForgotPassword.css';

const ForgotPassword = () => {

    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setMessage("")
          setError("")
          setLoading(true)
          await resetPassword(emailRef.current.value)
          setMessage("Check your inbox for further instructions")
        } catch {
          setError("Failed to reset password")
        }
    
        setLoading(false)
      }

    return (

        <div className="forgot-password">
            <center>
            {error && 
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
            }
            {message && 
            <div className="alert alert-success" role="alert">
              {message}
            </div>
            }
            <form onSubmit={ handleSubmit }>
                    <h2 className="text-primary mb-4">Reset Password.</h2>

                    <div className="mb-3">
                    <input type="email" ref={ emailRef } className="form-control email" placeholder="Enter email"/>
                    </div>

                    <button type="submit" disabled={ loading } className="btn btn-primary btn-reset-pass mb-3">Continue</button>

                    <br />

                    <span>Create an account ? <Link to="/login">Login</Link></span>

                </form>
            </center>
        </div>

    );
}
 
export default ForgotPassword;