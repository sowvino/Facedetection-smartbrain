import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Imagelinkform from './components/Imagelinkform/Imagelinkform.js';
import Facerecognition from './components/Facerecognition/Facerecognition.js';
import SigninForm from './components/SigninForm/SigninForm.js';
import Register from './components/Register/Register.js';
import Rank from './components/Rank/Rank.js';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, { Component } from 'react';
import './App.css';


const initialState = {
  input: '',
  imageurl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    email: "",
    name: "",
    password: "",
    joindate: " ",
    entry: 0
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        password: data.password,
        joindate: data.joined,
        entry: data.entry
      }
    })
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
      .region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    }
  }

  displaybox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  onButtonSubmit = () => {
    this.setState({ imageurl: this.state.input });

    fetch('http://localhost:3000/imageurl', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      })
    }).then(response => response.json())
      .then((response) => {
        fetch('http://localhost:3000/image', {
          method: "put",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id,
          })
        }).then(response => response.json()).then(count => {
          this.setState(Object.assign(this.state.user, { entry: count }));
        });
        this.displaybox(this.calculateFaceLocation(response));
      })
      .catch(error => console.log('error', error));
  }

  particlesInit = async (engine) => {
    await loadFull(engine);
  };

  particlesLoaded = async (container) => {
  };


  render() {
    return (
      <div className="App">
        <Particles className='particles'
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          options={{
            background: {
              color: {
                value: "",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.2,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                directions: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "polygon",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />

        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entry={this.state.user.entry} />
            <Imagelinkform onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <Facerecognition box={this.state.box} imageurl={this.state.imageurl} />
          </div> : (this.state.route === 'signin' ?
            <SigninForm loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
            <Register loadUser={this.loadUser}
              onRouteChange={this.onRouteChange} />)


        }



      </div>
    );

  }

};


export default App;
