import './Edit.css';
import { useAuth } from "../../contexts/AuthContext";
import { useHistory,Link,useParams  } from "react-router-dom";
import { useState, useEffect } from 'react';

const Edit = () => {

    const { id } = useParams();

    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [user, setUser] = useState(currentUser.uid);
    const [data, setData] = useState();
    const [description, setDescription] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/moment/${id}`, {
          "method": "GET",
          })
          .then(res => 
            res.json())
          .then(result => {
            setData(result);
            console.log(result);
          });
      }, [])

      function handleSubmit(e){
        e.preventDefault();
        const data = {description};

        fetch("http://localhost:5000/edit/" + id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }).then(() => {
        alert('Moment updated successfully!');
        history.push('/');
      }).catch((err) => {
          setError(err);
      })
    }


    return (

        <div className="edit">

            { data && 
            <form className="edit-form" onSubmit={ handleSubmit }>

                <center>
                    <h1>Edit your memory here.</h1>

                    <br /><br />

                    <img src={ data.img_url} class="img-fluid" alt="..."></img>

                </center>

                {/* <div class="mb-3 mt-5 form-div">
                    <label for="formFile" class="form-label">Upload image here</label>
                    <input class="form-control" type="file" id="formFile" />
                </div> */}
                <div class="mb-3 form-div">
                    <label for="exampleFormControlTextarea1" class="form-label">Edit your memory here</label>
                    <textarea defaultValue={ data.description } onChange={ (e) => setDescription(e.target.value)} name="description" className="form-control" rows="8"></textarea>
                </div>

                <center>
                    <button type="submit" className="btn btn-primary submit-btn">Update</button>
                </center>

            </form>}

        </div>

    );
}

export default Edit;