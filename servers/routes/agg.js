
const jquery = require("jquery/dist/jquery");


module.exports = function(vid, callback) {
  const savecaption = require("./getcaption");
  const makesummary1 = require("./summarize1");
  const makesummary2 = require("./summarize2");


  savecaption(vid, makesummary1(vid))
  
}