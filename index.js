//WebServer
const PORT_NUMBER = 80;


var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/motion', (request, response)=>{
    // var gyro = JSON.parse(request.body);
    console.log(request.body);
    // console.log(gyro.alpha + " " + gyro.beta+ ' ' +gyro.gamma )
    response.sendStatus(200);
})

app.listen(PORT_NUMBER, function () {
    console.log('Server started on port '+ PORT_NUMBER);
}).on('error', function(){
    console.log('Port '+ PORT_NUMBER +' taken');
});

