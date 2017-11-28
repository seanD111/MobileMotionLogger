//WebServer
const PORT_NUMBER = 80;


var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var devices = {};

app.post('/motion', (request, response)=>{
    devices[request.body.id] =request.body.acceleration;
    // console.log(gyro.alpha + " " + gyro.beta+ ' ' +gyro.gamma )
    response.sendStatus(200);
})

app.get('/motion', (request, response)=>{
    // var gyro = JSON.parse(request.body);
    console.log(devices);
    // console.log(gyro.alpha + " " + gyro.beta+ ' ' +gyro.gamma )
    response.send(devices);
})

app.listen(PORT_NUMBER, function () {
    console.log('Server started on port '+ PORT_NUMBER);
}).on('error', function(){
    console.log('Port '+ PORT_NUMBER +' taken');
});

