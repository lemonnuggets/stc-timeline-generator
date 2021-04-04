// TODO: autosize files
// TODO: better scaling factor for images
var bubble1Image;
var bubble2Image;
var brandLogo;

var WIDTH = 796;
var HEIGHT = 796;
var canvas;
var primaryTextFont;
var secondaryTextFont;

var showBackgroundImage = false;
var type = ["FUTURE", "PAST"];
var currentType = "FUTURE";

var backgroundColor;
var primaryColor;
var secondaryColor;

var brandLogoAlpha;
var brandLogoAlphaMin;
var brandLogoAlphaMax;

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

var topMarginX;
var topMarginXMin;
var topMarginXMax;
var topMarginY;
var topMarginYMin;
var topMarginYMax;

var textBoxWidth;
var textBoxWidthMin;
var textBoxWidthMax;

var bubbleTextGap;
var bubbleTextGapMin;
var bubbleTextGap;
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

var stcScaleFactor;
var stcScaleFactorMin;
var stcScaleFactorMax;
var stcScaleFactorStep;

var bubble1ScaleFactor;
var bubble1ScaleFactorMin;
var bubble1ScaleFactorMax;
var bubble1ScaleFactorStep;

var bubble2ScaleFactor;
var bubble2ScaleFactorMin;
var bubble2ScaleFactorMax;
var bubble2ScaleFactorStep;

var brandLogoScaleFactor;
var brandLogoScaleFactorMin;
var brandLogoScaleFactorMax;
var brandLogoScaleFactorStep;

var typeIconScaleFactor;
var typeIconScaleFactorMin;
var typeIconScaleFactorMax;
var typeIconScaleFactorStep;
var gui;
var gui2;

function writeColor(image, x, y, red, green, blue, alpha) {
    let index = (x + y * image.width) * 4;
    image.pixels[index] = red;
    image.pixels[index + 1] = green;
    image.pixels[index + 2] = blue;
    image.pixels[index + 3] = alpha;
}
function hexToRgb(hex) {
    hex = hex.replace("#", "");

    var bigint = parseInt(hex, 16);

    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r, g, b];
}
function colorImage(image, hex, alpha = 255) {
    console.log("in", image);
    let [red, green, blue] = hexToRgb(hex);
    image.loadPixels();
    let flag = false;
    console.log("loaded", hex, red, green, blue);
    for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
            if (image.get(x, y)[3] > 0) {
                if (!flag) {
                    flag = true;
                    console.log("changed");
                }
                writeColor(image, x, y, red, green, blue, alpha);
            }
        }
    }
    image.updatePixels();
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

function preload() {
    primaryTextFont = loadFont("assets/fonts/Montserrat/Medium.ttf");
    secondaryTextFont = loadFont("assets/fonts/Cera Pro/Bold.otf");

    brandLogo = loadImage("./assets/razer.svg");
    stcLogo = loadImage("./assets/stc.svg");
    futureImage = loadImage("./assets/future.svg");
    // presentImage = loadImage("./assets/present.svg");
    pastImage = loadImage("./assets/past.svg");
    backgroundImage = loadImage("assets/sample.jpg");

    bubble1Image = loadImage("assets/bubble1.svg");
    bubble2Image = loadImage("assets/bubble2.svg");
}

function setup() {
    // WIDTH = backgroundImage.width;
    // HEIGHT = backgroundImage.height;
    function linkToInput(variable, inputID) {
        const input = document.querySelector(inputID);
        input.onchange = (e) => {
            console.log(e, input.files, window[variable]);
            if (input.files.length > 0) {
                const image = loadImage(
                    URL.createObjectURL(input.files[0]),
                    () => {
                        console.log(image);
                        window[variable] = image;
                        draw();
                    }
                );
                console.log(image);
            }
        };
    }

    linkToInput("bubble1Image", "#bubble1");
    linkToInput("bubble2Image", "#bubble2");
    linkToInput("brandLogo", "#brandLogo");
    WIDTH = 600;
    HEIGHT = 600;
    setDefaults();
    gui = createGui("STC Timeline Generator");
    gui.addGlobals(
        "type",
        "showBackgroundImage",
        "backgroundColor",
        "primaryColor",
        "secondaryColor",
        "brandLogoAlpha",
        "text1",
        "text2"
    );
    gui2 = createGui("Hopefully nothing to be touched");
    gui2.addGlobals(
        "typeIconScaleFactor",
        "brandLogoScaleFactor",
        "bubble2ScaleFactor",
        "bubble1ScaleFactor",
        "stcScaleFactor",
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
        "topMarginX",
        "topMarginY",
        "bubbleTextGap",
        "textBoxWidth",
        "iconXOffset",
        "iconYOffset",
        "stcIconYOffset",
        "scaleFactor"
    );
    gui2.setPosition(windowWidth - 250, 20);

    canvas = createCanvas(WIDTH, HEIGHT);
    document.querySelector("#save-button").addEventListener("click", () => {
        saveCanvas();
    });
    document.querySelector("#reset-button").addEventListener("click", () => {
        setDefaults((notFirst = true));
    });
    setDefaults((notFirst = true));

    noLoop();
}

function draw() {
    if (showBackgroundImage) {
        background(backgroundImage);
    } else {
        background(backgroundColor);
    }
    let typeText, typeImage;
    switch (type) {
        case "FUTURE":
            typeText = "FUTURE";
            typeImage = futureImage;
            if (currentType != typeText) {
                setDefaults((notFirst = true), (toBeRedrawn = false));
                currentType = typeText;
            }
            break;
        case "PAST":
            typeText = "PAST";
            typeImage = pastImage;
            if (currentType != typeText) {
                setDefaults((notFirst = true), (toBeRedrawn = false));
                currentType = typeText;
            }
            break;
    }
    push();

    colorImage(bubble1Image, secondaryColor);
    colorImage(bubble2Image, secondaryColor);
    colorImage(stcLogo, secondaryColor);

    colorImage(typeImage, primaryColor);
    colorImage(brandLogo, primaryColor, brandLogoAlpha);

    imageMode(CENTER);

    // watermark
    image(
        brandLogo,
        WIDTH / 2,
        HEIGHT / 2,
        brandLogo.width * brandLogoScaleFactor,
        brandLogo.height * brandLogoScaleFactor
    );

    // images in bubbles
    image(
        bubble1Image,
        circleX,
        HEIGHT / 2 - bubbleHeight - bubbleRadius / 2,
        bubble1Image.width * bubble1ScaleFactor,
        bubble1Image.height * bubble1ScaleFactor
    );

    image(
        bubble2Image,
        WIDTH - circleX,
        HEIGHT / 2 + bubbleHeight + bubbleRadius / 2,
        bubble2Image.width * bubble2ScaleFactor,
        bubble2Image.height * bubble2ScaleFactor
    );
    pop();
    // STC logo
    image(
        stcLogo,
        WIDTH - topMarginX - stcLogo.width * stcScaleFactor,
        topMarginY - stcLogo.height * stcScaleFactor + stcIconYOffset,
        stcLogo.width * stcScaleFactor,
        stcLogo.height * stcScaleFactor
    );

    // past/present/future
    push();
    fill(primaryColor);
    stroke(primaryColor);
    textFont(secondaryTextFont);
    textSize(secondaryTextSize);
    if (type !== "PAST") {
        text(typeText, topMarginX, topMarginY);
        image(
            typeImage,
            topMarginX + textWidth(typeText) + iconXOffset,
            topMarginY - secondaryTextSize + iconYOffset,
            88 * typeIconScaleFactor,
            53 * typeIconScaleFactor
        );
        noFill();
    } else {
        image(
            typeImage,
            topMarginX,
            topMarginY - secondaryTextSize + iconYOffset,
            88 * typeIconScaleFactor,
            53 * typeIconScaleFactor
        );
        text(typeText, typeImage.width, topMarginY);
    }
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
        circleX + bubbleRadius / 2 + bubbleTextGap,
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
        WIDTH - circleX - bubbleRadius / 2 - textBoxWidth - bubbleTextGap,
        HEIGHT / 2 +
            bubbleHeight +
            bubbleRadius / 2 -
            textBoxHeight / 2 -
            textLeading() / 4,
        textBoxWidth
    );
    pop();
}

function setDefaults(notFirst = false, toBeRedrawn = true) {
    if (!notFirst) {
        backgroundColor = "#17213A";
        primaryColor = "#0ECC7C";
        secondaryColor = "#ffffff";

        brandLogoAlpha = 55;
        brandLogoAlphaMin = 0;
        brandLogoAlphaMax = 255;
        text1 =
            "Razer has planned to release a cutting-edge gaming chair built with carbon fibre and RGB lighting, Project Brooklyn Chair, in 2022-23.";
        text2 =
            "At CES 2021, Razer unveiled a conceptual design for a transparent plastic face mask called Project Hazel to improve social interaction during this pandemic.";
    }

    lineStartGapMin = 0;
    lineStartGapMax = WIDTH / 8;
    if (type === "PAST") {
        lineStartGap = 50;
    } else {
        lineStartGap = 0;
    }

    lineEndGapMin = 0;
    lineEndGapMax = WIDTH / 8;
    if (type === "FUTURE") {
        lineEndGap = 50;
    } else {
        lineEndGap = 0;
    }

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

    primaryTextSize = 21;

    textBoxWidth = 438;
    textBoxWidthMin = 300;
    textBoxWidthMax = 600;

    bubbleTextGap = 17;
    bubbleTextGapMin = -30;
    bubbleTextGapMax = 30;

    secondaryTextSize = 31;
    secondaryTextSizeMin = 20;
    secondaryTextSizeMax = 40;
    secondaryTextSizeStep = 0.1;

    topMarginX = 24;
    topMarginXMin = 0;
    topMarginXMax = 100;

    topMarginY = 54;
    topMarginYMin = 0;
    topMarginYMax = 100;

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
    scaleFactorMin = 0.01;
    scaleFactorMax = 5;
    scaleFactorStep = 0.01;

    stcScaleFactor = 0.55;
    stcScaleFactorMin = 0.01;
    stcScaleFactorMax = 5;
    stcScaleFactorStep = 0.01;

    bubble1ScaleFactor = 0.55;
    bubble1ScaleFactorMin = 0.01;
    bubble1ScaleFactorMax = 5;
    bubble1ScaleFactorStep = 0.01;

    bubble2ScaleFactor = 0.55;
    bubble2ScaleFactorMin = 0.01;
    bubble2ScaleFactorMax = 5;
    bubble2ScaleFactorStep = 0.01;

    brandLogoScaleFactor = 0.55;
    brandLogoScaleFactorMin = 0.01;
    brandLogoScaleFactorMax = 5;
    brandLogoScaleFactorStep = 0.01;

    typeIconScaleFactor = 0.55;
    typeIconScaleFactorMin = 0.01;
    typeIconScaleFactorMax = 5;
    typeIconScaleFactorStep = 0.01;
    if (notFirst) {
        // No way to set values programmatically in p5.gui
        // so instead directly using quicksettings.js setValuesFromJSON()
        // method.
        // Since manually setting values, we should toBeRedrawn the canvas.
        gui2.prototype.setValuesFromJSON({
            lineStartGap,
            lineEndGap,
            circleX,
            circleRadius,
            dottedCircleOffsetRadius,
            bubbleHeight,
            bubbleRadius,
            dashSize,
            spaceSize,
            primaryTextSize,
            secondaryTextSize,
            topMarginX,
            topMarginY,
            textBoxWidth,
            bubbleTextGap,
            iconXOffset,
            iconYOffset,
            stcIconYOffset,
            scaleFactor,
            typeIconScaleFactor,
            brandLogoScaleFactor,
            bubble2ScaleFactor,
            bubble1ScaleFactor,
            stcScaleFactor,
        });
        if (toBeRedrawn) {
            backgroundColor = "#17213A";
            primaryColor = "#0ECC7C";
            secondaryColor = "#ffffff";

            brandLogoAlpha = 55;
            brandLogoAlphaMin = 0;
            brandLogoAlphaMax = 255;
            text1 =
                "Razer has planned to release a cutting-edge gaming chair built with carbon fibre and RGB lighting, Project Brooklyn Chair, in 2022-23.";
            text2 =
                "At CES 2021, Razer unveiled a conceptual design for a transparent plastic face mask called Project Hazel to improve social interaction during this pandemic.";

            gui.prototype.setValuesFromJSON({
                showBackgroundImage,
                backgroundColor,
                primaryColor,
                secondaryColor,
                brandLogoAlpha,
                text1,
                text2,
            });
            draw();
        }
    }
}
