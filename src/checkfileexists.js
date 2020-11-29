export function checkfileexists(path) {
    var http = new XMLHttpRequest();
    console.log("Check file existance")
    console.log(path);
    var res = Boolean();
    
    http.open('HEAD', path, false); 
    http.send(); 
    if (http.status === 200) { 
         res = true;
    } else {
        
        res = false;
    } 

    return res;
}