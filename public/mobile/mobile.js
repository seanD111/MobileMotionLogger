var args = {
    frequency:20,                   // ( How often the object sends the values - milliseconds )
    gravityNormalized:true,         // ( If the gravity related values to be normalized )
    orientationBase:GyroNorm.GAME,      // ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
    decimalCount:3,                 // ( How many digits after the decimal point will there be in the return values )
    logger:null,                    // ( Function to be called to log messages from gyronorm.js )
    screenAdjusted:false            // ( If set to true it will return screen adjusted values. )
};

var gn = new GyroNorm();

gn.init(args).then(function(){
    gn.start(function(data){
    // Process:
    // data.do.alpha    ( deviceorientation event alpha value )
    // data.do.beta     ( deviceorientation event beta value )
    // data.do.gamma    ( deviceorientation event gamma value )
    // data.do.absolute ( deviceorientation event absolute value )

    // data.dm.x        ( devicemotion event acceleration x value )
    // data.dm.y        ( devicemotion event acceleration y value )
    // data.dm.z        ( devicemotion event acceleration z value )

    // data.dm.gx       ( devicemotion event accelerationIncludingGravity x value )
    // data.dm.gy       ( devicemotion event accelerationIncludingGravity y value )
    // data.dm.gz       ( devicemotion event accelerationIncludingGravity z value )

    // data.dm.alpha    ( devicemotion event rotationRate alpha value )
    // data.dm.beta     ( devicemotion event rotationRate beta value )
    // data.dm.gamma    ( devicemotion event rotationRate gamma value )
    // 




        var details = {
            'orientation':{
                'alpha': data.do.alpha,
                'beta': data.do.beta,
                'gamma': data.do.gamma

            },
            'acceleration':{
                'x': Math.cos(data.do.gamma)*data.dm.x,
                'y': Math.cos(data.do.alpha)*data.dm.y,
                'z': Math.cos(data.do.beta)*data.dm.z
            },

            'id': document.getElementById("device_id").value
        };
        var xhr = new XMLHttpRequest();
        var url = "motion";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            // if (xhr.readyState === 4 && xhr.status === 200) {
            //     var json = JSON.parse(xhr.responseText);
            //     console.log(json.email + ", " + json.password);
            // }
        };
        var tosend = JSON.stringify(details, ['orientation', 'acceleration', 'alpha', 'beta', 'gamma', 'x','y','z', 'id']);
        console.log(tosend)
        xhr.send(tosend);




        // const formBody = Object.keys(details) .map(key=>encodeURIComponent(key)+'='+encodeURIComponent(details[key])).join('&')

        // fetch('motion', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   body: formBody
        // })
    });
}).catch(function(e){
  // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
});

window.onclick=function(){
    gn.setHeadDirection();
}
