import './App.css';
import React from "react"
import ReactDOM from 'react-dom'
import YouTubePlayer from "./iframe"
import SummaryTable from "./summarytable"
import 'bootstrap/dist/css/bootstrap.min.css';
import {checkfileexists} from "./checkfileexists"
import { Form, Button, Col, InputGroup, FormControl } from 'react-bootstrap';



const videoserver = "http://localhost:3001/main/video";
const requestserver = "http://localhost:3001/main/check";


class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoid: "na",
      url: null,
      isid: false,
      summaryavailable: false,

      pip: true,
      playing:true,
      controls: true,
      loop: true
    }

    this.requestVideo = this.requestVideo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderVideo = this.renderVideo.bind(this);

  }

  seekTo (e) {
    this.player.seekTo(60)
  }

  renderVideo (vid) {
    const element = (
      <YouTubePlayer videoId={vid} />
    )
    ReactDOM.render(element, document.getElementById('player'))
    
    var path = "./data/summary_text/" + vid + ".json";
    const fs = require("fs");
  }

  requestVideo (e) {
    e.preventDefault();
    const data = {videoid:this.state.videoid}
    console.log("request: "+ this.state.videoid);
    fetch(videoserver,{
      method: "POST",
      headers: { "Content-Type":  "application/json" },
      body: JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(json => {
      if(json.tf === false){
        this.setState({
          isid:false
        })
        alert("Not an proper ID");
        
      }
      else{
        alert("proper video!")
        this.renderVideo(this.state.videoid);
        // this.rendersummary(this.state.videoid);
      }
    });
  }
  
  onChange(e) {
    this.setState({
      videoid: e.target.value
    })
  }

  

  render() {

    const searchstyle = {
      "itemsAlign": "center",
      "verticalAlign":"center",
      "padding-left": "40%",
      "padding-right": "10%",
      "display": "flex",
      "align-item": "center",
    }

    return (
      // <div className="App">

      //   <form id="input" onSubmit={this.onSubmit}>
      //     <input type="text" name="videoid" onChange={this.onChange}  required/>
      //     <button id="button" type="submit" onClick={this.requestVideo}>Go</button>
      //   </form>

      <div>
        <h5 style={searchstyle}>
          <br />
          Enter Video ID
        </h5>
        
        <Form onSubmit={this.onSubmit}>
          <Form.Row className="align-items-center" style={searchstyle}>
            <Col sm={3} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
                Name
              </Form.Label>
              <Form.Control id="inlineFormInputName" placeholder="Video ID" onChange={this.onChange} />
            </Col>
            <Col xs="auto" className="my-1">
              <Button variant="light" type="submit" onClick={this.requestVideo}>Search</Button>
            </Col>
          </Form.Row>
        </Form>
      


      <div>
      <div id="player"></div>
      {/* <div id="summary"></div> */}
      </div>
      
      </div>
      // </div>
    )
  }
}

export default Video;
