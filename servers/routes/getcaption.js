module.exports = async function(vid, callback) {
  console.log("summary0 start");
  var getSubtitles = require('youtube-captions-scraper').getSubtitles;
  var fs = require('fs');
  // var fs = require('fs');
  var FileSaver = require('file-saver');
  const wrtiteJsonFile = require("write-json-file");
  var videoID = vid;
  await getSubtitles({
    videoID: videoID, // youtube video id
    lang: 'en' // default: `en`
  }).then(function(captions) {
    // var filename = "./data/rawjson/" + videoID + ".json";
  var filename = "./data/rawjson/" + videoID + ".json";
  
  var cap = JSON.stringify(captions);
  // console.log(c  ap);
  
  console.log("saving file");

  fs.writeFileSync(filename, cap, function (err) {
    if (err) throw err;
    console.log('File Saved!' + filename);
  });
  console.log("file saved: "+filename);
  return cap;
  }); 
  console.log("summary0 end");
  callback();
  }