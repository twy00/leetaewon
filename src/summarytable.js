import React, {Component} from 'react'
import {getJSON} from "./summary"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom'
import "mark.js/dist/mark.min.js";
import { Form, Button, Col, InputGroup, FormControl } from 'react-bootstrap';
import Mark from 'mark.js';
import fs from "fs";
import { checkfileexists } from './checkfileexists';
// import as from "../data/summary_text/tIeHLnjs5U8.json"
// import {getSubtitles} from "youtube-captions-scraper"

const requestserver = "http://localhost:3001/main/check";

class SummaryTable extends Component {
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
        this.check = this.check.bind(this);
      }
    
    seekTo (e) {
      this.player.seekTo(60)
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
          alert("file does no exists");
          returnvalue =  false;
        }
        else{
          alert("file does exists");
         returnvalue = true;
         console.log(json.text)
         this.state.summary = json.text;
        }
      });
      return returnvalue;
    }
    render() {
        this.check();
        const videoId = this.props.videoId
        console.log("run request summary")

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
        
        // this.requestSummary();
        var path = "../data/summary_text/" + videoId + ".json";
        

        const summarytext = getJSON(videoId);
        return (
            <div >
                <br /><br />
                
                  <div class="searchresult">
                  {this.state.summary.map((summary) => {
                      var time = summary.start_sec;
                      var sum = summary.value
                      var time_min = summary.start_min
                      console.log("time: "+time);
                      

                      return (
                          
                          <table id="tablestyle">
                          <td style={tdstyle}><button style={timelinebuttonstyle} onClick={() => this.player.seekTo(time)}>{time_min}</button></td>
                          <td  style={summarystyle}>{sum}</td>
                          </table>
                      )
                      
                  })}
                  </div>
              
                    
                    
            </div>

            
            
        );
      }
     
}
export default SummaryTable;