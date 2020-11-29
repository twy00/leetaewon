export function saveCaption(vid) {
    var getSubtitles = require('youtube-captions-scraper').getSubtitles;
    var fs = require('browserify-fs');
    // var fs = require('fs');
    var FileSaver = require('file-saver');
    const wrtiteJsonFile = require("write-json-file");
    var videoID = vid;
    console.log('vid ' + videoID);
    getSubtitles({
      videoID: videoID, // youtube video id
      lang: 'en' // default: `en`
    }).then(function(captions) {
      // var filename = "./data/rawjson/" + videoID + ".json";
      var filename = "./data/rawjson/" + videoID + ".json";
      console.log(filename);
      var cap = JSON.stringify(captions);
      // console.log(cap);
      // FileSaver.saveAs(cap, filename);

      fs.writeFile(filename, cap);
      // console.log(__dirname)
      console.log("Write file synce complete");
      
      // wrtiteJsonFile(filename, cap);
       
      // fs.writeFileSync(filename, cap, function (err) {
      //   if (err) throw err;
      //   console.log('File Saved!' + filename);
      // });
      return cap;
    });
    
  }
  
// function concat(vid) {
//   var jsonfile = require("captions/rawjson/" + vid + ".json");
//   var obj = JSON.parse(jsonfile);
//   var result = "";

//   // for (idx in obj) {
//   //   result = result + obj[idx]["text"] + " "
//   // }

//   console.log(result);

// }
