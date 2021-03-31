let backgroundImage;
let WIDTH = 796;
let HEIGHT = 796;
let canvas;

var backgroundColor;
var primaryColor;
var secondaryColor;

var lineStartGap;
var lineStartGapMin;
var lineStartGapMax;

var lineEndGap;
var lineEndGapMin;
var lineEndGapMax;

var circleX;
var circleXMin;
var circleXMax;

var circleRadius;
var circleRadiusMin;
var circleRadiusMax;

var dottedCircleOffsetRadius;
var dottedCircleOffsetRadiusMin;
var dottedCircleOffsetRadiusMax;

var bubbleHeight;
var bubbleHeightMin;
var bubbleHeightMax;

var bubbleRadius;
var bubbleRadiusMin;
var bubbleRadiusMax;

var dashSize;
var dashSizeMin;
var dashSizeMax;

var spaceSize;
var spaceSizeMin;
var spaceSizeMax;

var gui;
// const guiOpts = {
//     title: "STC Timeline Generator",
//     theme: "yorha",
// };
function setDefaults() {
    backgroundColor = "#101728";
    primaryColor = "#0ECC7C";
    secondaryColor = "#ffffff";

    lineStartGapMin = 0;
    lineStartGapMax = WIDTH / 8;
    lineStartGap = 0;

    lineEndGapMin = 0;
    lineEndGapMax = WIDTH / 8;
    lineEndGap = 0;

    circleXMin = 0;
    circleXMax = WIDTH / 2;
    circleX = 89;

    circleRadiusMin = 1;
    circleRadiusMax = 30;
    circleRadius = 13;

    dottedCircleOffsetRadius = 14;
    dottedCircleOffsetRadiusMin = 0;
    dottedCircleOffsetRadiusMax = 30;

    bubbleHeightMin = 0;
    bubbleHeightMax = HEIGHT / 2;
    bubbleHeight = 95;

    bubbleRadiusMin = 0;
    bubbleRadiusMax = 90;
    bubbleRadius = 70;

    dashSizeMin = 0;
    dashSizeMax = 30;
    dashSizeStep = 0.1;
    dashSize = 4;

    spaceSizeMin = 0;
    spaceSizeMax = 30;
    spaceSizeStep = 0.1;
    spaceSize = 6.9;
}
function preload() {
    backgroundImage = loadImage(
        "https://instagram.fcok4-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/165518340_395676648168558_2007177254094814758_n.jpg?tp=1&_nc_ht=instagram.fcok4-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=JWz0akwh-ZoAX_8SZFk&ccb=7-4&oh=6dcaa45579cf923e28c6103e0e3cf0f3&oe=6089F699&_nc_sid=4f375e"
    );
}
function setup() {
    // WIDTH = backgroundImage.width;
    // HEIGHT = backgroundImage.height;
    WIDTH = 600;
    HEIGHT = 600;

    setDefaults();

    canvas = createCanvas(WIDTH, HEIGHT);
    document.querySelector("#save-button").addEventListener("click", () => {
        saveCanvas();
    });
    document.querySelector("#reset-button").addEventListener("click", () => {
        setDefaults();
    });

    gui = createGui("STC Timeline Generator");
    gui.addGlobals(
        "backgroundColor",
        "primaryColor",
        "secondaryColor",
        "lineStartGap",
        "lineEndGap",
        "circleX",
        "circleRadius",
        "dottedCircleOffsetRadius",
        "bubbleHeight",
        "bubbleRadius",
        "dashSize",
        "spaceSize"
    );
    noLoop();
}
function draw() {
    background(backgroundColor);
    // background(backgroundImage);
    strokeWeight(2);
    stroke(primaryColor);
    fill(primaryColor);
    // Main line
    line(lineStartGap, HEIGHT / 2, WIDTH - lineEndGap, HEIGHT / 2);

    //Points marked on the line
    circle(circleX, HEIGHT / 2, circleRadius);
    circle(WIDTH - circleX, HEIGHT / 2, circleRadius);
    noFill();

    // Bubble circles
    circle(circleX, HEIGHT / 2 - bubbleHeight - bubbleRadius / 2, bubbleRadius);
    circle(
        WIDTH - circleX,
        HEIGHT / 2 + bubbleHeight + bubbleRadius / 2,
        bubbleRadius
    );

    // Dotted Circles around points on the line
    push();
    drawingContext.setLineDash([dashSize, spaceSize]);
    circle(circleX, HEIGHT / 2, circleRadius + dottedCircleOffsetRadius);
    circle(
        WIDTH - circleX,
        HEIGHT / 2,
        circleRadius + dottedCircleOffsetRadius
    );
    pop();

    strokeWeight(0.35);

    // lines connecting middle line to bubbles
    line(circleX, HEIGHT / 2, circleX, HEIGHT / 2 - bubbleHeight);
    line(
        WIDTH - circleX,
        HEIGHT / 2,
        WIDTH - circleX,
        HEIGHT / 2 + bubbleHeight
    );
}
