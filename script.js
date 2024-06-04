document.addEventListener("mousemove", leftOrRightSideOfScreen);
let phase2 = document.querySelector(".containerSurroundingBox");
let bocchi = document.querySelector(".boxContainingBocchiPics");
function leftOrRightSideOfScreen(e) {
  if (isHoveredOverBocchi) {
    if (bocchi.style.transform.includes("scaleX(-1)")) {
      bocchi.style.transform = "scaleX(1)";
    }
    return; // Do nothing if hovering over phase3
  }
  const halfOfScreen = window.innerWidth / 2;
  if (e.clientX < halfOfScreen) {
    console.log("left");
    bocchi.style.transform = "scaleX(-1)";
  } else {
    console.log("right");
    bocchi.style.transform = "scaleX(1)";
  }
}
document.addEventListener("mousemove", headMovement);

function headMovement(e) {
  requestAnimationFrame(() => {
    let bocchiRect = bocchi.getBoundingClientRect(); // Dynamic retrieval inside the animation frame
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
    phase2.style.setProperty("--xAngle", containerXAngle.toFixed(2) + "deg");
    phase2.style.setProperty("--yAngle", containerYAngle.toFixed(2) + "deg");

    // Debugging output
    console.log("Mouse X relative to container:", mouseXRelativetoContainer);
    console.log("Mouse Y relative to container:", mouseYRelativetoContainer);
    console.log("Calculated X angle:", containerXAngle.toFixed(2) + "deg");
    console.log("Calculated Y angle:", containerYAngle.toFixed(2) + "deg");
  });
}
let isHoveredOverBocchi = false;
bocchi.addEventListener("mouseover", () => {
  //this default for transform style so basically removing it
  isHoveredOverBocchi = true;
  phase2.style.transformStyle = "flat";
  phase2.style.transform = "none";
});
// transform-style: preserve-3d;
// transform: perspective(500px) rotateX(var(--yAngle, 0deg))
//   rotateY(var(--xAngle, 0deg));
bocchi.addEventListener("mouseout", () => {
  isHoveredOverBocchi = false;
  phase2.style.transformStyle = "preserve-3d";
  phase2.style.transform =
    "perspective(500px) rotateX(var(--yAngle, 0deg)) rotateY(var(--xAngle, 0deg))";
});
