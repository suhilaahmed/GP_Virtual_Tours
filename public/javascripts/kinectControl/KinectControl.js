
var imported = document.createElement('script');
imported.src = "/socket.io/socket.io.js";
document.head.appendChild(imported);

var manualControl = false;
var longitude = 0;
var latitude = 0;
var savedX;
var savedY;
var savedLongitude;
var savedLatitude;
var Images ;
var footRightInti;
var ZoomFactor = 0;
var sign = 1;
//console.log("IMAGESSSSSSSSSSS" + Images);
// panoramas background
var imagePath = document.getElementById("IMGPath").innerText.toString();

var PanoramaParent = document.getElementById("MySlider1");

var panoramasArray =PanoramaParent;//["/images/panoramas/01.jpg","/images/panoramas/02.jpg","/images/panoramas/03.jpg","/images/panoramas/04.jpg","/images/panoramas/05.jpg","/images/panoramas/06.jpg","/images/panoramas/07.jpg","/images/panoramas/08.jpg","/images/panoramas/tajmahal2.jpg"];
var panoramaNumber = Math.floor(Math.random() * panoramasArray.length);
// setting up the renderer
renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(1355, 520);
PanoramaParent.appendChild(renderer.domElement);
renderer.domElement.id = "MySlider1";
// creating a new scene
var scene = new THREE.Scene();

// adding a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.target = new THREE.Vector3(0, 0, 0);

// creation of a big sphere geometry
var sphere = new THREE.SphereGeometry(100, 100, 40);
sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

// creation of the sphere material
var sphereMaterial = new THREE.MeshBasicMaterial();
//sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber]);
sphereMaterial.map = THREE.ImageUtils.loadTexture(imagePath);

// geometry + material = mesh (actual object)
var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
scene.add(sphereMesh);

// listeners
document.addEventListener("mousedown", onDocumentMouseDown, false);
document.addEventListener("mousemove", onDocumentMouseMove, false);
document.addEventListener("mouseup", onDocumentMouseUp, false);

//Add Kinect Events
// document.addEventListener("mouseup", onDocumentMouseUp, false);

render();
var firsttemp = false;
function render() {

    requestAnimationFrame(render);

    if (!manualControl) {
        //longitude += 0.1;

    }
    if(firsttemp){
        //console.log("camera.position().z = " +  camera.getPosition().z);
        if(sign == -1){
            if(ZoomFactor > -40){
                camera.translateZ(-2);
                ZoomFactor-= 2;
            }
        }
        else if(sign == 1){
            if(ZoomFactor < 40 ){
                camera.translateZ(2);
                ZoomFactor+= 2;
            }
        }

        firsttemp = false;
    }

    // limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
    latitude = Math.max(-85, Math.min(85, latitude));

    // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
    camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
    camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude));
    camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));

    camera.lookAt(camera.target);

    // calling again render function
    renderer.render(scene, camera);

}

// when the mouse is pressed, we switch to manual control and save current coordinates
function onDocumentMouseDown(event) {

    event.preventDefault();

    manualControl = true;

    savedX = event.clientX;
    savedY = event.clientY;

    savedLongitude = longitude;
    savedLatitude = latitude;

}

// when the mouse moves, if in manual contro we adjust coordinates
function onDocumentMouseMove(event) {

    if (manualControl) {
        longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
        latitude = (event.clientY - savedY) * 0.1 + savedLatitude;
        console.log("event.clientX = " + event.clientX);
        console.log("event.clientY= " + event.clientY);
    }

}

// when the mouse is released, we turn manual control off
function onDocumentMouseUp(event) {

    manualControl = false;

}

// pressing a key (actually releasing it) changes the texture map
document.onkeyup = function (event) {

    panoramaNumber = (panoramaNumber + 1) % panoramasArray.length;
    sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber]);

}

function moveRight(posX, posY, curRightFoot) {
    var speed = 60;

    if (manualControl) {
        longitude = (savedX - posX) * 0.1 + savedLongitude;
        latitude = (posY - savedY) * 0.1 + savedLatitude;
        console.log("longitude = " + longitude);
        console.log("latitude= " + latitude);
    }

}

function Zoom(curRightFoot){

    //console.log("Diff  = " + Math.abs(footRightInti - curRightFoot));
    if(Math.abs(footRightInti - curRightFoot) > 0.2){
        if(Math.sign(footRightInti - curRightFoot) == Math.sign(-1))
            sign = 1;
        else if(Math.sign(footRightInti - curRightFoot) == Math.sign(1))
            sign = -1;

        firsttemp = true;
    }
}

function HandCatch(posX, posY) {

    manualControl = true;

    savedX = posX;
    savedY = posY;

    savedLongitude = longitude;
    savedLatitude = latitude;
}

//Kinect
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
var firstCatch = true;
var firstAppear = true;

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
    // draw semi transparent hand cicles
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.fillStyle = handColor;
    ctx.arc(jointPoint.depthX * 398, jointPoint.depthY * 338, HANDSIZE, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
}

socket.on('bodyFrame', function (bodyFrame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var index = 0;
    //---------------------------------------
    var rightHandPosX;
    var rightHandPosY;
    var curRightFoot;
    bodyFrame.bodies.forEach(function (body) {
        //console.log("Here");
        if (body.tracked) {
            for (var jointType in body.joints) {
                var joint = body.joints[jointType];
               // var t = body.
                ctx.fillStyle = colors[index];
                ctx.fillRect(joint.depthX * 398, joint.depthY * 338, 10, 10);

            }
            //------------------------------
            if(firstAppear){
                footRightInti = body.joints[19].cameraZ;
                console.log("cameraZ = " + body.joints[19].cameraZ);
                firstAppear = false;
            }

            rightHandPosX = body.joints[11].depthX;
            rightHandPosY = body.joints[11].depthY;
            curRightFoot = body.joints[19].cameraZ;
            //console.log(rightHandPos);
            //alert(rightHandPos);
            if (body.rightHandState == 3) {
                if (firstCatch === true) {
                    firstCatch = false;
                    HandCatch(rightHandPosX * window.innerWidth, rightHandPosY * 400);
                }
                moveRight(rightHandPosX * window.innerWidth, rightHandPosY * 400 , curRightFoot);
            }
            if (body.rightHandState == 2) {
                firstCatch = true;
                manualControl = false;
            }
            Zoom(curRightFoot);
            //draw hand states
            updateHandState(body.leftHandState, body.joints[7]);
            updateHandState(body.rightHandState, body.joints[11]);
            index++;
        }
    });
});