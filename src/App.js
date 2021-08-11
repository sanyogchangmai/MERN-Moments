import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios'
import { useState } from 'react';
import { Image } from 'cloudinary-react'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';
import Edit from './components/Edit/Edit';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import PrivateRoute from "../src/components/PrivateRoute";
import { AuthProvider } from "../src/contexts/AuthContext"
import ForgotPassword from 'components/ForgotPassword/ForgotPassword';
import UpdateProfile from 'components/UpdateProfile/UpdateProfile';

function App() {

  // const [file, setFile] = useState('');

  // const img = [1, 2, 3, 4, 5, 6, 7, 8];

  // function handleUpload() {
  //   console.log(file);
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "jee6awcx");

  //   Axios.post("https://api.cloudinary.com/v1_1/dwaz9dsmr/image/upload", formData)
  //     .then(function (response) {
  //       console.log(response);
  //       console.log("Image url is " + response.data.secure_url);
  //     });
  // }

  return (
    <div className="App">

      <Router>
      <AuthProvider>
        <Navbar />

        <Switch>

        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/upload" component={Upload} />
        <PrivateRoute exact path="/edit/:id" component={Edit} />
        <PrivateRoute exact path="/update-profile" component={UpdateProfile} />

        <Route exact path="/reset-password">
          <ForgotPassword/>
        </Route>

          {/* <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/upload">
            <Upload />
          </Route>

          <Route exact path="/edit">
            <Edit />
          </Route> */}

          <Route exact path="/signup">
            <Signup/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

        </Switch>

        </AuthProvider>


      </Router>

      {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button onClick={handleUpload}>Submit</button> */}
      {/* <br />
      <Image style={{ width: 300 }} cloudName="dwaz9dsmr" publicId="https://res.cloudinary.com/dwaz9dsmr/image/upload/v1628246900/xykitwaiseddnjwh0fap.jpg" /> */}


      {/* <div className="container">
        <div className="row">

          {img.map(file => (
            <div className="card" style={{ width: 300 }}>
              <img src="https://res.cloudinary.com/dwaz9dsmr/image/upload/v1628258393/srzh6esk5ut0qsbpn06a.jpg" className="card-img-top" alt="" />
              <div className="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>))}

        </div>
      </div> */}


    </div>
  );
}

export default App;
