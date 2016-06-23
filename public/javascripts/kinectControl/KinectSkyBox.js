var imported = document.createElement('script');
imported.src = "/socket.io/socket.io.js";
document.head.appendChild(imported);

var manualControl = false;
var Images ;
var footRightInti;
var sign = 1;
var firstCatch = false;
var firstAppear = true;
var startStreaming = false;
//=============================================================================

var socket = io.connect('/');
var canvas = document.getElementById('bodyCanvas');
var ctx = canvas.getContext('2d');
var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

// handstate circle size
var HANDSIZE = 20;

// closed hand state color
var HANDCLOSEDCOLOR = "red";

// open hand state color
var HANDOPENCOLOR = "green";

// lasso hand state color
var HANDLASSOCOLOR = "blue";

function updateHandState(handState, jointPoint) {
    switch (handState) {
        case 3:
            drawHand(jointPoint, HANDCLOSEDCOLOR);
            break;

        case 2:
            drawHand(jointPoint, HANDOPENCOLOR);
            break;

        case 4:
            drawHand(jointPoint, HANDLASSOCOLOR);
            break;
    }
}

function drawHand(jointPoint, handColor) {
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.fillStyle = handColor;
    ctx.arc(jointPoint.depthX * 398, jointPoint.depthY * 338, HANDSIZE, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
}

//====================================================================

function Start(){
    startStreaming = true;

}

socket.on('bodyFrame', function (bodyFrame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var index = 0;
    //---------------------------------------
    var rightHandPosX;
    var rightHandPosY;
    var curRightFoot;
    bodyFrame.bodies.forEach(function (body) {
        if (body.tracked) {
            for (var jointType in body.joints) {
                var joint = body.joints[jointType];
                ctx.fillStyle = colors[index];
                ctx.fillRect(joint.depthX * 398, joint.depthY * 338, 10, 10);

            }
            //------------------------------
            if(startStreaming){
                if(firstAppear){
                    footRightInti = body.joints[19].cameraZ;
                    console.log("cameraZ = " + body.joints[19].cameraZ);
                    firstAppear = false;
                }

                rightHandPosX = body.joints[11].depthX;
                rightHandPosY = body.joints[11].depthY;
                curRightFoot = body.joints[19].cameraZ;

                if (body.rightHandState == 3) {
                    if (firstCatch === false) {
                        firstCatch = true;
                        SendMessage("CameraParent", "SetRightHandState",firstCatch.toString());
                    }
                    SendMessage("CameraParent", "SetRightHandCooridnate", rightHandPosX.toString() + ','+ rightHandPosY.toString());

                }
                if (body.rightHandState == 2) {
                    firstCatch = false;
                    SendMessage("CameraParent", "SetRightHandState", firstCatch.toString());

                    manualControl = false;
                }
                if (body.leftHandState == 3) {
                    SendMessage("CameraParent", "SetLeftHandState","true");
                    SendMessage("CameraParent", "SetLeftHandCooridnate", rightHandPosX.toString() + ','+ rightHandPosY.toString());
                }
                if (body.leftHandState == 2) {
                    SendMessage("CameraParent", "SetLeftHandState","false");
                }
                if(footRightInti - curRightFoot > 0.3){
                    SendMessage("CameraParent", "Zooming","Zoom OUT");
                    console.log("Zoom OUT" + footRightInti - curRightFoot);            }
                else if(footRightInti - curRightFoot < -0.3){
                    SendMessage("CameraParent", "Zooming","Zoom IN");
                    console.log("Zoom IN" + footRightInti - curRightFoot);
                }

            }

            updateHandState(body.leftHandState, body.joints[7]);
            updateHandState(body.rightHandState, body.joints[11]);
            index++;
        }
    });
});