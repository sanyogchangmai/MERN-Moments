import './Navbar.css';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { useState } from 'react';

const Navbar = () => {

    const [error, setError] = useState("");
    const history = useHistory();
    const { logout } = useAuth();

    async function handleLogout() {
        setError("");
    
        try {
          await logout();
          history.push("/login");
        } catch {
          setError("Failed to log out");
        }
      }


    return (

        <div>

            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">Moments</Link>
                        <div className="dropdown settings">
                          <Link className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Settings
                          </Link>

                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><Link className="dropdown-item" to="/upload">Upload</Link></li>
                            <li><Link className="dropdown-item" to="/update-profile">Update Profile</Link></li>
                            <li onClick={ handleLogout }><Link className="dropdown-item" href="#">Logout</Link></li>
                          </ul>
                        </div>
                </div>
            </nav>

            { error && 
            <div className="alert alert-danger mt-4 mb-3" role="alert">
              { error }
            </div>
            }

        </div>

    );
}

export default Navbar;