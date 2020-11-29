//동영상 다운로드, srt 다운로드 후 혜원이가 보내준 파일 살향허면 result 나옴 -> 그걸 읽어서 화면에 출력하면 됨.
module.exports = async function(vid, callback){
    console.log("summary2 start");
    const { PythonShell } = require("python-shell");
    // const {spawn} = require("child_process")
    // const process = spawn("python3", ["youtube_summary.py", vid]);
    
    var script2 = "make_summary.py";
    let options2 = {
        mode: 'text',
        scriptPath: "./data/",
        pythonOptions: ['-u'], // get print results in real-time
        args: [vid]
    }
  
    await PythonShell.run(script2, options2, function (err) {
        if (err) throw err;
        console.log('finished2');
    });
    

    console.log("summary file")
    // process.stdout.on('data', data=>{
    //     console.log("generatring summary");
    //     console.log(data.toString());
    // });

    console.log("summary2 end");
    callback();
}

