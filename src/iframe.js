import React, {Component} from 'react'
import {getJSON} from "./summary"
import './App.css';
// import YouTube from "react-youtube"
// import Summary from "./summary"
import ReactPlayer from "react-player";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mark.js/dist/mark.min.js";
import { Form, Button, Col, InputGroup, FormControl } from 'react-bootstrap';
import Mark from 'mark.js';
import SummaryTable from "./summarytable"

import ReactDOM from 'react-dom'
// import {getSubtitles} from "youtube-captions-scraper"
const requestserver = "http://localhost:3001/main/check";


class YouTubePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          videoid: "BwDBAtPFT0s",
          url: null,
          isid: false,
          query: "",
          summary: [],
    
          pip: true,
          playing:true,
          controls: true,
          loop: true
        }
        this.Search = this.Search.bind(this)
        this.onChangequery = this.onChangequery.bind(this)
        this.check = this.check.bind(this)
      }
    Search () {
        // e.preventDefault();
        console.log("search: "+ this.state.query);

        var context = document.querySelector(".searchresult");
        var instance = new Mark(context);
        instance.unmark();
        instance.mark(this.state.query);
    }
    
    onChangequery = (e) => {
        this.setState({
          query: e.target.value
        })
        this.Search();
      }
    
    componentDidMount() {
      this.interval = setInterval(() => this.check(), 5000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    check (){
      var returnvalue = Boolean();
      const data = {videoid:this.props.videoId}
      console.log("summary video id: "+this.props.videoId);
      fetch(requestserver,{
        method: "POST",
        headers: { "Content-Type":  "application/json" },
        body: JSON.stringify(data),
      })
      .then(res=>res.json())
      .then(json => {
        if(json.tf === false){
          // alert("file does no exists");
          returnvalue =  false;
        }
        else{
          // alert("file does exists");
          returnvalue = true;
          console.log("file exists: " + returnvalue)
          this.state.summary = json.text;
          console.log(this.state.summary);
        }
      });
      return returnvalue;
      }
    
    
      
    render() {
        const videoId = this.props.videoId
        const url = "https://www.youtube.com/watch?v=" + videoId
        console.log("ID:"+ videoId);
        console.log("GET:"+ url);

        const searchstyle = {
          "itemsAlign": "center",
          "verticalAlign":"center",
          "padding-left": "40%",
          "padding-right": "10%",
          "display": "flex",
          "align-item": "center",
        }

        const tdstyle = {
            "width": "20%",
            "margin": "auto",
            "vertical-align": "middle",
            "text-align": "center",
            "padding":"0px 0px 0px 0px",
        };

        const timelinebuttonstyle = {
            "width": "100%",
            "size": "large",
            /* margin: 0 auto; */
            "float": "center",
            /* padding-bottom: 0px; */
            "background-color": "Transparent",
            "cursor": "pointer",
            "font-size": "220%",
            "text-align": "center",
            "vertical-align":"center",
            "color": "black",
            "border": "none",
            "font-weight": "bold",
            "outline":"none",
            

        };
        
        const summarystyle = {
            "width": "80%",
            "size": "medium",
            "font-size": "150%",
            "table-layout": "fixed",
            "word-wrap":"break-word",
            "text-align": "left",
        }

        const videostyle = {
            "margin-top": "5%",
            "margin-left": "auto",
            "margin-right": "auto",
            "align-items":"center",
            "position": "sticky",
          }
        
        
        // this.check();
        return (
            <div>
                
                {/* <ReactPlayer videoId={videoId} opts={opts} onReady={this.VideoOnReady} ref={(player) => this.player = player} />
                <button onClick={() => this.player.seekTo(40)}>SeekTo</button> */}
                <header>
                <ReactPlayer
                    url= {url}
                    className='react-player'
                    playing={true}
                    width='960px'
                    height='540px'
                    controls = {true}
                    pip = {true}
                    style = {videostyle}

                    ref={(player) => this.player = player}
                    />
                    </header><br />
                    

                      {/* <form >
                        <input id="inputquery" type="text" onChange={this.onChangequery} value={this.state.query} required/>
                        <button onClick={this.Search}>Search</button>
                      </form> */}

                      <Form >
                        <Form.Row className="align-items-center" style={searchstyle}>
                          <Col sm={3} className="my-1" >
                            <Form.Label htmlFor="inlineFormInputName" srOnly>
                              Name
                            </Form.Label>
                            <Form.Control id="inlineFormInputName" placeholder="Search Keyword" onChange={this.onChangequery} />
                          </Col>
                        </Form.Row>
                      </Form>

                    <br /><br />
                    {this.check ? 
                     <div class="searchresult">
                          
                          
                     {this.state.summary.map((summary) => {
                         var time = summary.start_sec;
                         var sum = summary.value
                         var time_min = summary.start_min
                         

                         return (
                             
                             <table id="tablestyle">
                             <td style={tdstyle}><button style={timelinebuttonstyle} onClick={() => this.player.seekTo(time)}>{time_min}</button></td>
                             <td  style={summarystyle}>{sum}</td>
                             </table>
                         )
                         
                     })}
                     </div>
                 
                    : <h4>Processing...</h4>}
                       



                     
            </div>

            
            
        );
      }
     
      
}
export default YouTubePlayer;