var net = require('net');
var fs= require ('fs');
var coords="";
var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        console.log('Received: ' + data);
        var r = data.toString();
        console.log(r.substring(0,4)); //post or get 
        if(r.substring(0,4)=="POST")
            {
                var startreq= r.indexOf('{');
                var length= r.length;
                var postdata=r.substring(startreq,length);
                coords=JSON.parse(postdata);
                console.log(" The data coords "+coords+" has been posted successfully ");
            }
        if(r.substring(0,3)=="GET")
        {
            socket.write("HTTP/1.1 200 OK\n");
            socket.write("Access-Control-Allow-Origin: *\n"); //CORS 
            content=JSON.stringify(coords);
            console.log(content);
            socket.write("Content-Length:"+content.length);
            socket.write("\n\n"); // two carriage returns
            socket.write(content);
        } 
    });  
    socket.on('close', function() {
        console.log('Connection closed');
    });
    socket.on('end', function() {
        console.log('client disconnected');
     });
    socket.on('error', function() {
        console.log('client disconnected');
     });
});
server.listen(1234, function() { 
    console.log('server is listening on port 1234');
});