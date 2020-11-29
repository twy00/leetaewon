const express = require("express");
const summarize = require("./agg");
const router = express.Router();
const savecaption = require("./getcaption");
const makesummary1 = require("./summarize1");
const fs = require('fs')
const summarize2 = require("./summarize2");


// router.get("/", (req, res) => res.json({
//     username:"Bryan",
//     videoid: req.query.video
// }));

router.get("/", (req, res) => res.json({
    videoid: req.query.video,
    username: "Taewon"
}));

router.post("/check", (req, res) =>{
    // console.log("post check")
    let videoid = req.body.videoid;
    let path = "./data/summary_text/" + videoid + ".json";
    let sendresult = new Object();

    if(fs.existsSync(path)) {
        // console.log("The file exists.");
        sendresult.tf = true;
        let data = fs.readFileSync(path);
        var datajson = JSON.parse(data);
        sendresult.text = datajson;
        console.log("file exists " + videoid)

    } else {
        console.log('The file does not exist.');
        sendresult.tf = false;
    }
    // console.log(sendresult)
    res.send(sendresult);
    console.log(sendresult.tf);

})

router.post("/video", (req, res) => {
    let video_id = req.body.videoid;
    let checkid = new Object();

    if (video_id.length == 11) {
        checkid.tf = true;
        
        summarize(video_id)
        
    }
    else {checkid.tf = false; res.send(checkid);}

    res.send(checkid);

});

// router.post("/summary", (req, res) => {
//     let video_id = req.body.videoid;
//     let summary = new Object();

//     // summarize(video_id)

//     const result = "./data/summary_text/" + videoID + ".json";
//     summary.sum = JSON.parse(result);
//     console.log("summary created");
//     // console.log("summary" + summary.sum);
    

//     var file = new File(result);
//     var cond = true
//     while (cond){
//         if (file.exists()){
//             cond = false;
//             fs.readFile(result,'utf8',function(err,data){ 
//                 var js = JSON.parse(data);
//                 summary.text = js;
//                 res.send(summary);
//              });
            
//         }
//     }
    

// });


module.exports = router;