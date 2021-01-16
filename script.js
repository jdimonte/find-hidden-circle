/* global delayTime,collidePointCircle,BOLD,textStyle, delayTime, color, fill, mouseX, mouseY, round, text, sq, sqrt, rect, line, createCanvas, colorMode, HSB, background, ellipse, random, width, height */

let backgroundColor,
  spherePosition,
  rectPosition,
  mousePosition,
  hint,
  prevMousePosition,
  dist,
  prevdist,
  hit,
  level,
  score,
  win;

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object aka POJsO (Plain Old JavaScript Object)
  spherePosition = {
    x: random(width),
    y: random(height),
    d: 100
  };
  rectPosition = {
    x: 130,
    y: 140
  };
  mousePosition = {
    x: 0,
    y: 0
  };
  prevMousePosition = {
    x: 0,
    y: 0
  };
  hint = "cold";
  hit = "false";
  level = 1;
  score = 0;
  win = "false";
}

function draw() {
  background(backgroundColor);
  //ellipse(spherePosition.x, spherePosition.y, spherePosition.d);
  // rect(rectPosition.x, rectPosition.y, 20, 20);
  // line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  // let circleSquareDistance = computeDistance(spherePosition, rectPosition);
  // text(`The circle and the square are ${circleSquareDistance} apart`, 20, 20);
  handleCollision();

  mousePosition.x = mouseX;
  mousePosition.y = mouseY;
  // mousePosition = {
  //   "x": mouseX,
  //   "y": mouseY,
  // }
  hint = giveHint();

  fill("white");
  textStyle(BOLD);
  if (score == 0) {
    text(`You are ${hint}!`, 20, 40);
    text(`Score ${score}`, 20, 60);
  } else if (score > 0 && score < 10) {
    text(`You are ${hint}!`, 20, 40);
    text(`Score ${score}!  Find a new circle!`, 20, 60);
  } else {
    text(`You win!! Click to play again!`, 20, 60);
    win = true;
  }

  prevMousePosition.x = mousePosition.x;
  prevMousePosition.x = mousePosition.y;

  // if (win === "true") {
  //   background("green");
  //   text(`You win!! Click to play again!`, 20, 60);
  // }
}

function mousePressed() {
  backgroundColor = 95;
  // This variable contains a JSON object aka POJsO (Plain Old JavaScript Object)
  spherePosition = {
    x: random(width),
    y: random(height),
    d: 100
  };
  rectPosition = {
    x: 130,
    y: 140
  };
  mousePosition = {
    x: 0,
    y: 0
  };
  prevMousePosition = {
    x: 0,
    y: 0
  };
  hint = "cold";
  hit = "false";
  level = 1;
  score = 0;
  win = "false";
}

function giveHint() {
  let dist = computeDistance(mousePosition, spherePosition);
  let prevdist = computeDistance(prevMousePosition, spherePosition);
  if (dist < prevdist) {
    backgroundColor = color("red");
    return "warmer";
  } else {
    backgroundColor = color("blue");
    return "colder";
  }
}

function computeDistance(point1, point2) {
  // square root of: different in x values squared + difference in y values
  // squared
  let xDiff = point1.x - point2.x;
  let yDiff = point1.y - point2.y;
  let distance = sqrt(sq(xDiff) + sq(yDiff));
  return round(distance);
}

function handleCollision() {
  hit = collidePointCircle(
    mouseX,
    mouseY,
    spherePosition.x,
    spherePosition.y,
    spherePosition.d
  );
  if (hit) {
    background("green");
    level += 1;
    score++;
    if (level <= 10) {
      fill("white");
      text(`Next level! Level: ${level}! Click to play the next level!`);
      //delayTime(0.5);
      hit = false;
      spherePosition.x = random(width);
      spherePosition.y = random(height);
      spherePosition.d -= 10;
    } else {
      text(`Game over! You win! Nice job!`);
    }
  }
}
