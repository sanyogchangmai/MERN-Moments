import './UpdateProfile.css';
import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        const promises = []
        setLoading(true)
        setError("")
    
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }
    
        Promise.all(promises)
          .then(() => {
            history.push("/")
          })
          .catch(() => {
            setError("Failed to update account")
          })
          .finally(() => {
            setLoading(false)
          })
      }
    

    return (

        <div className="update-profile">

<center>
            {error && 
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
            }
            { loading && <div className="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>}
            <form onSubmit={ handleSubmit }>
                    <h2 className="text-primary mb-4">Update Profile.</h2>

                    <div className="mb-3">
                    <input type="email" ref={ emailRef } className="form-control email" placeholder="Enter email"/>
                    </div>

                    <div className="mb-3">
                    <input type="password" ref={ passwordRef } className="form-control password" placeholder="Enter password"/>
                    </div>

                    <div className="mb-3">
                    <input type="password" ref={ passwordConfirmRef } className="form-control password" placeholder="Confirm password"/>
                    </div>

                    <button type="submit" disabled={ loading } className="btn btn-primary btn-update-profile mb-3">Update</button>

                    <br />

                    <Link to="/">Cancel</Link>

                    <br />

                    {/* <span>Create an account ? <Link to="/signup">Signup</Link></span> */}

                </form>
            </center>

        </div>

    );
}
 
export default UpdateProfile;