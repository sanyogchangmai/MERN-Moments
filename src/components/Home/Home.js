import './Home.css';
import {Link,useHistory} from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { useState,useEffect } from 'react';
import Masonry from 'react-masonry-css';

const Home = () => {

    const img = [1, 2, 3, 4, 5, 6, 7, 8];
    const { currentUser } = useAuth();
    const [data, setData] = useState("");
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/moments/${currentUser.uid}`, {
          "method": "GET",
          })
          .then(res => 
            res.json())
          .then(result => {
            setData(result);
            console.log(result);
            history.push("/");
          });
      }, [])

      function handleDelete(id){
        console.log(id);
        fetch("http://localhost:5000/moment/" + id, {
          method: "DELETE",
        }).then(() => {
          alert("Deleted successfully!");
          window.location.reload(false);
        });
      }

      const breakpointColumnsObj = {
        default: 4,
        1200: 3,
        1000: 2,
        500: 1
      };

    return (

        <div className="home">

          <center>
          <h1 className="heading">Relive your Moments</h1>
          </center>

            {/* <div className="container">
                <div className="row masonry" data-masonry='{"percentPosition": true }'>
                    <h1 className="heading">{ currentUser.email } Relive your Moments</h1>
                    <center>
                    </center>
                    {data &&
                    <>
                    {data.map(file => (
                      <div className="col-3">
                        <div className="card alert alert-primary">

                            <img src={file.img_url} className="card-img-top" alt="" />
                            <div className="card-body">

                                <div className="dropdown">
                                    <i className="fas fa-ellipsis-v img-option" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link className="dropdown-item" to={`/edit/${ file._id }`}>Edit</Link></li>
                                        <li className="dropdown-item" onClick={ () => handleDelete(file._id) }>Delete</li>
                                    </ul>
                                </div>


                                <p class="card-text">{ file.description }</p>
                            </div>
                        </div>
                        </div>))}
                    </>}
                </div>
            </div> */}

            
            {data &&
                    <Masonry breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                      
                    {data.map(file => (
                          <div className="card alert alert-primary">

                            <img src={file.img_url} className="card-img-top" alt="" />
                            <div className="card-body">

                                <div className="dropdown">
                                    <i className="fas fa-ellipsis-v img-option" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link className="dropdown-item" to={`/edit/${ file._id }`}>Edit</Link></li>
                                        <li className="dropdown-item" onClick={ () => handleDelete(file._id) }>Delete</li>
                                    </ul>
                                </div>


                                <p class="card-text">{ file.description }</p>
                            </div>
                        </div>
                        ))}
                        
                        </Masonry>}
            

        </div>

    );
}

export default Home;