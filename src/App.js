import './App.css';
import Video from './video';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoid: null
    };
  }

  componentDidMount () {
    fetch("main/")
    .then(res=>res.json())
    .then(data=>this.setState({videoid:data.videoid}));
  }

  

  render() {

    const barstyle = {
      "position":"fixed",
      "top": "0",
      "width": "100%"
    }

    return (
      <div>
        <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">LeeTaeWon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <header className="App-header">
          <div><br />

          <h3>Enter YouTube Video ID</h3>
          </div>
        </header> */}
        
      </div>
      <div>
        <Video />
      </div>
      </div>
      
      
      

    )
  }
}

export default App;
