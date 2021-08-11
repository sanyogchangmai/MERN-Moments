import './Upload.css';
import { useState } from 'react';
import Axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Upload = () => {

    const { currentUser } = useAuth();
    const user = currentUser.uid;
    let uploaded_img;
    const [image, setImage] = useState('');
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleUpload() {
        setLoading(true);
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "jee6awcx");
    
        Axios.post("https://api.cloudinary.com/v1_1/dwaz9dsmr/image/upload", formData)
          .then(function (response) {
            console.log(response);
            console.log("Image url is " + response.data.secure_url);
            setImage(response.data.secure_url);
            setLoading(false);
          });
      }

    function handleSubmit(e){
        e.preventDefault();
        const data = {user,image,description};

        fetch('http://localhost:5000/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }).then(() => {
        alert('Moment added successfully!');
        history.push('/');
      }).catch((err) => {
          setError(err);
      })
    }

    return (

        <div className="upload">

            <form className="upload-form" onSubmit={ handleSubmit }>

                <center>
                    <h1>Upload your precious memory here.</h1>
                    {error && 
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                    }

                    { loading && 
                    <div className="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>}
                </center>

                <div class="mb-3 mt-5 form-div">
                    <label for="formFile" className="form-label">Upload image here</label>
                    <input onChange={(e) => setFile(e.target.files[0])} className="form-control" type="file" id="formFile" />
                </div>

                <center>
                    <button type="button" onClick={ handleUpload } className="btn btn-primary submit-btn">
                        { loading ? <span>Uploading....</span> : <span>Upload</span> }
                    </button>
                </center>

                <div class="mb-3 d-none">
                    <label for="exampleFormControlInput1" className="form-label">User UID</label>
                    <input type="text" name="user" value={ user } className="form-control" placeholder="user"/>
                </div>

                <div class="mb-3 d-none">
                    <label for="exampleFormControlInput1" className="form-label">Image URL</label>
                    <input type="text" name="image" value={ image } className="form-control" placeholder="Image url"/>
                </div>

                <div class="mb-3 form-div">
                    <label for="exampleFormControlTextarea1" className="form-label">Write your memory here</label>
                    <textarea name="description" value={ description } onChange={ (e) => {setDescription(e.target.value) }} className="form-control" rows="8"></textarea>
                </div>

                <center>
                    <button type="submit" disabled={ loading } className="btn btn-primary submit-btn">Submit</button>
                </center>

            </form>

        </div>

    );
}

export default Upload;