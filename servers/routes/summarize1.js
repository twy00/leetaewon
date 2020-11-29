//동영상 다운로드, srt 다운로드 후 혜원이가 보내준 파일 살향허면 result 나옴 -> 그걸 읽어서 화면에 출력하면 됨.
module.exports = function(vid){
    console.log("summary1 start");
    const { PythonShell } = require("python-shell");
    // const {spawn} = require("child_process")
    // const process = spawn("python3", ["youtube_summary.py", vid]);
    
    var script = "youtube_summary.py";
    let options = {
        mode: 'text',
        scriptPath: "./data/",
        pythonOptions: ['-u'], // get print results in real-time
        args: [vid]
    }

    PythonShell.run(script, options, function (err) {
        if (err) throw err;
        console.log('finished1');
      });
    
    console.log("summary1");

    
    console.log("summary1 end");
    
}
