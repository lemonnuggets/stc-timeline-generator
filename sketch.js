let backgroundImage;
let futureImage;
let pastImage;
let presentImage;
let stcLogo;

let WIDTH = 796;
let HEIGHT = 796;
let canvas;
let primaryTextFont;
let secondaryTextFont;

var showBackgroundImage;

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

var text1;
var text2;
var primaryTextSize;

var secondaryTextSize;
var secondaryTextSizeMin;
var secondaryTextSizeMax;
var secondaryTextSizeStep;

var secondaryTextX;
var secondaryTextXMin;
var secondaryTextXMax;
var secondaryTextY;
var secondaryTextYMin;
var secondaryTextYMax;

var textBoxWidth;
var textBoxWidthMin;
var textBoxWidthMax;

var startColOffset;
var startColOffsetMin;
var startColOffset;
var iconXOffset;
var iconXOffsetMin;
var iconXOffsetMax;

var iconYOffset;
var iconYOffsetMin;
var iconYOffsetMax;

var stcIconYOffset;
var stcIconYOffsetMin;
var stcIconYOffsetMax;

var scaleFactor;
var scaleFactorMin;
var scaleFactorMax;
var scaleFactorStep;

var gui;
// const guiOpts = {
//     title: "STC Timeline Generator",
//     theme: "yorha",
// };
function setDefaults(notFirst) {
    showBackgroundImage = false;

    backgroundColor = "#17213A";
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

    dottedCircleOffsetRadius = 16;
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

    text1 =
        "Razer has planned to release a cutting-edge gaming chair built with carbon fibre and RGB lighting, Project Brooklyn Chair, in 2022-23.";
    text2 =
        "At CES 2021, Razer unveiled a conceptual design for a transparent plastic face mask called Project Hazel to improve social interaction during this pandemic.";
    primaryTextSize = 21;

    textBoxWidth = 438;
    textBoxWidthMin = 300;
    textBoxWidthMax = 600;

    startColOffset = 17;
    startColOffsetMin = -30;
    startColOffsetMax = 30;

    secondaryTextSize = 31;
    secondaryTextSizeMin = 20;
    secondaryTextSizeMax = 40;
    secondaryTextSizeStep = 0.1;

    secondaryTextX = 24;
    secondaryTextXMin = 0;
    secondaryTextXMax = 100;

    secondaryTextY = 54;
    secondaryTextYMin = 0;
    secondaryTextYMax = 100;

    iconXOffset = 12;
    iconXOffsetMin = 0;
    iconXOffsetMax = 50;

    iconYOffset = 6;
    iconYOffsetMin = 0;
    iconYOffsetMax = 50;

    stcIconYOffset = 15;
    stcIconYOffsetMin = 0;
    stcIconYOffsetMax = 50;

    scaleFactor = 0.55;
    scaleFactorMin = 0.1;
    scaleFactorMax = 5;
    scaleFactorStep = 0.01;

    if (notFirst) {
        // No way to set values programmatically in p5.gui
        // so instead directly using quicksettings.js setValuesFromJSON()
        // method.
        // Since manually setting values, we should redraw the canvas.
        gui.prototype.setValuesFromJSON({
            showBackgroundImage,
            backgroundColor,
            primaryColor,
            secondaryColor,
            lineStartGap,
            lineEndGap,
            circleX,
            circleRadius,
            dottedCircleOffsetRadius,
            bubbleHeight,
            bubbleRadius,
            dashSize,
            spaceSize,
            text1,
            text2,
            primaryTextSize,
            secondaryTextSize,
            secondaryTextX,
            secondaryTextY,
            textBoxWidth,
            startColOffset,
            iconXOffset,
            iconYOffset,
            stcIconYOffset,
            scaleFactor,
        });
        draw();
    }
}
function preload() {
    primaryTextFont = loadFont("assets/fonts/Montserrat/Medium.ttf");
    secondaryTextFont = loadFont("assets/fonts/Cera Pro/Bold.otf");

    brandLogo = loadImage("./assets/razer.svg");
    stcLogo = loadImage("./assets/stc.svg");
    futureImage = loadImage("./assets/future.svg");
    // presentImage = loadImage("./assets/present.svg");
    pastImage = loadImage("./assets/past.svg");
    backgroundImage = loadImage("assets/sample.jpg");
}
function setup() {
    // WIDTH = backgroundImage.width;
    // HEIGHT = backgroundImage.height;
    WIDTH = 600;
    HEIGHT = 600;

    setDefaults();
    gui = createGui("STC Timeline Generator");
    gui.addGlobals(
        "showBackgroundImage",
        "backgroundColor",
        "primaryColor",
        "secondaryColor",
        "text1",
        "text2",
        "lineStartGap",
        "lineEndGap",
        "circleX",
        "circleRadius",
        "dottedCircleOffsetRadius",
        "bubbleHeight",
        "bubbleRadius",
        "dashSize",
        "spaceSize",
        "primaryTextSize",
        "secondaryTextSize",
        "secondaryTextX",
        "secondaryTextY",
        "startColOffset",
        "textBoxWidth",
        "iconXOffset",
        "iconYOffset",
        "stcIconYOffset",
        "scaleFactor"
    );

    canvas = createCanvas(WIDTH, HEIGHT);
    document.querySelector("#save-button").addEventListener("click", () => {
        saveCanvas();
    });
    document.querySelector("#reset-button").addEventListener("click", () => {
        setDefaults(true);
    });
    setDefaults(true);

    noLoop();
}

function textHeight(text, maxWidth) {
    var words = text.split(" ");
    var line = "";
    var h = textLeading();

    for (let i = 0; i < words.length; i++) {
        var testLine = line + words[i] + " ";
        var testWidth = drawingContext.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {
            line = words[i] + " ";
            h += textLeading();
        } else {
            line = testLine;
        }
    }

    return h;
}
function draw() {
    if (showBackgroundImage) {
        background(backgroundImage);
    } else {
        background(backgroundColor);
    }

    // watermark
    image(
        brandLogo,
        WIDTH / 2 - brandLogo.width / 2,
        HEIGHT / 2 - brandLogo.height / 2
    );

    // STC logo
    image(
        stcLogo,
        WIDTH - secondaryTextX - stcLogo.width * scaleFactor,
        secondaryTextY - stcLogo.height * scaleFactor + stcIconYOffset,
        216.26 * scaleFactor,
        86 * scaleFactor
    );

    // past/present/future
    push();
    // strokeWeight(0.1);
    // document.querySelector("canvas").style.letterSpacing = "300px";
    fill(primaryColor);
    stroke(primaryColor);
    textFont(secondaryTextFont);
    textSize(secondaryTextSize);
    text("FUTURE", secondaryTextX, secondaryTextY);
    image(
        futureImage,
        secondaryTextX + textWidth("FUTURE") + iconXOffset,
        secondaryTextY - secondaryTextSize + iconYOffset,
        88 * scaleFactor,
        53 * scaleFactor
    );
    noFill();
    pop();

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

    // text
    push();
    strokeWeight(0.1);
    fill(secondaryColor);
    stroke(secondaryColor);
    textSize(primaryTextSize);
    textFont(primaryTextFont);
    textAlign(LEFT, CENTER);
    let textBoxHeight = textHeight(text1, textBoxWidth);
    text(
        text1,
        circleX + bubbleRadius / 2 + startColOffset,
        HEIGHT / 2 -
            bubbleHeight -
            bubbleRadius / 2 -
            textBoxHeight / 2 -
            textLeading() / 4,
        textBoxWidth
    );
    textAlign(RIGHT, CENTER);
    textBoxHeight = textHeight(text2, textBoxWidth);
    // textLeading(0);
    text(
        text2,
        WIDTH - circleX - bubbleRadius / 2 - textBoxWidth - startColOffset,
        HEIGHT / 2 +
            bubbleHeight +
            bubbleRadius / 2 -
            textBoxHeight / 2 -
            textLeading() / 4,
        textBoxWidth
    );
    pop();
}
