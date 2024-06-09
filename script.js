//This is for tracking whether or not we are on the left or right side of
//the screen so we can know when to flip the image vertically or not
document.addEventListener("mousemove", leftOrRightSideOfScreen);
let bocchiPersonalSpace = document.querySelector(".containerSurroundingBox");
let bocchi = document.querySelector(".boxContainingBocchiPics");
function leftOrRightSideOfScreen(e) {
  //This negates the flipping of image when hovered onto image
  //because I dont want ripe mango bocchi to be following mouse
  if (isHoveredOverBocchi) {
    if (bocchi.style.transform.includes("scaleX(-1)")) {
      bocchi.style.transform = "scaleX(1)";
    }
    return; // Do nothing if hovering over phase3
  }
  //this is how we see if the mouse is on the left side of screen or right side
  //divide screen width by half if it is smaller than new num then it is left
  const halfOfScreen = window.innerWidth / 2;
  if (e.clientX < halfOfScreen) {
    console.log("left");
    bocchi.style.transform = "scaleX(-1)";
  } else {
    console.log("right");
    bocchi.style.transform = "scaleX(1)";
  }
}

//this is the part of the code that makes bocchi tilt toward the mouse
document.addEventListener("mousemove", headMovement);

function headMovement(e) {
  requestAnimationFrame(() => {
    // we get the "measurments"  of bocchi query
    let bocchiRect = bocchi.getBoundingClientRect();
    let xPos = e.clientX;
    let yPos = e.clientY;

    // Calculate relative positions
    let mouseXRelativetoContainer =
      xPos - (bocchiRect.x + bocchiRect.width / 2);
    let mouseYRelativetoContainer =
      yPos - (bocchiRect.y + bocchiRect.height / 2);

    // Calculate rotation angles
    let containerXAngle = 60 * (mouseXRelativetoContainer / window.innerWidth); // Sensitivity adjusted
    let containerYAngle =
      -1 * 60 * (mouseYRelativetoContainer / window.innerHeight); // Sensitivity adjusted

    // Apply the calculated angles as CSS custom properties
    bocchiPersonalSpace.style.setProperty(
      "--xAngle",
      containerXAngle.toFixed(2) + "deg"
    );
    bocchiPersonalSpace.style.setProperty(
      "--yAngle",
      containerYAngle.toFixed(2) + "deg"
    );
  });
}

//this part of the code is to change bocchi to different expressions based
//on where the mouse is
let isHoveredOverBocchi = false;
let hoverTimer;
let hoverTimerText;

//the reason we have a if !isHoveredOverBocchi so we can hover over bocchi
//without getting conflicts with other mouseovers
//bocchi is inside a div that acts as her personal space however
//when we hover over bocchi we are also hovering over her personal space,so
//we need to disable the other eventlisteners when we are directly hovered over
//bocchi. Whenever we are not directly hovered over bocchi isHoveredOverBocchi
//will always be set to false by the moust out eventlistener
bocchiPersonalSpace.addEventListener("mouseover", () => {
  if (!isHoveredOverBocchi) {
    // Only trigger if not already over Bocchi directly
    bocchi.style.backgroundImage = "url('/images/hitori-gotou-nope.jpg')";
  }
});
bocchiPersonalSpace.addEventListener("mouseout", () => {
  if (!isHoveredOverBocchi) {
    // Only trigger if not already over Bocchi directly
    bocchi.style.backgroundImage = "url('/images/star-eye-bocchi.png')";
  }
});

//this is getting the paragraph of words behind bocchi
const bocchiCopyPasta = document.getElementById("copypasta");
bocchi.addEventListener("mouseover", () => {
  if (!isHoveredOverBocchi) {
    isHoveredOverBocchi = true;
    //this default for transform style so basically removing it
    bocchiPersonalSpace.style.transformStyle = "flat";
    bocchiPersonalSpace.style.transform = "none";
    bocchi.style.backgroundImage = "url('/images/ripe-mango-bocchi.png')";
    clearTimeout(hoverTimer); // Clear any existing timers

    hoverTimer = setTimeout(() => {
      bocchi.style.backgroundImage = "url('/images/bocchi-the-rock.gif')";
    }, 2000);
    //showing text a little more delayed because when I change the style of
    //the bocchiCopyPasta to inline it is faster than changing the background
    //image, which looks a little bit weird, so delaying it makes it look a bit
    //smoother
    hoverTimerText = setTimeout(() => {
      bocchiCopyPasta.style.display = "inline";
    }, 2300);
  }
});

bocchi.addEventListener("mouseout", () => {
  bocchiCopyPasta.style.display = "none";

  clearTimeout(hoverTimer);
  clearTimeout(hoverTimerText);
  isHoveredOverBocchi = false;
  bocchiPersonalSpace.style.transformStyle = "preserve-3d";
  bocchiPersonalSpace.style.transform =
    "perspective(500px) rotateX(var(--yAngle, 0deg)) rotateY(var(--xAngle, 0deg))";
});

//this is the part of the code that just automatically puts break tags into the
//h1 tag cause I am too lazy to manually do that.
//also not using query selector here cause I realize I don't really need query
//sselector here query slector is O of N time so ill just use the
// getElement that is O of 1 time

function addLineBreaks() {
  const bocchiCopyPasta = document.getElementById("copypasta");
  const words = bocchiCopyPasta.innerText.split(" ");
  //we will add br through a for loop and store it in a new String to then
  // replace the older text with the new one.
  let newCopyPasta = "";
  for (let i = 0; i < words.length; i++) {
    newCopyPasta += words[i] + " ";
    if ((i + 1) % 14 === 0) {
      newCopyPasta += "<br>";
    }
  }
  bocchiCopyPasta.innerHTML = newCopyPasta;
}
addLineBreaks();
