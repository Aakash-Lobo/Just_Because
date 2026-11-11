
// Get the envelope flap
const flap = CSSRulePlugin.getRule(".envelope:before");

// Get elements
const envelope = document.querySelector(".envelope");
const letter = document.querySelector(".letter");
const shadow = document.querySelector(".shadow");

// Animation state
let isOpen = false;
let liftDistance = 0;

// Calculate how far the letter should rise
function getLiftDistance() {
  return Math.min(110, window.innerHeight * 0.16);
}

// Main envelope animation
const t1 = gsap.timeline({
  paused: true
});

t1.to(flap, {
  duration: 0.5,
  cssRule: {
    rotationX: 180
  }
})

.set(flap, {
  cssRule: {
    zIndex: 10
  }
})

.to(letter, {
  y: () => -liftDistance,
  duration: 0.9,
  ease: "back.inOut(1.5)"
})

.set(letter, {
  zIndex: 40
})

.to(letter, {
  duration: 0.7,
  ease: "back.out(.4)",
  y: () => -liftDistance,
  z: () => Math.min(80, window.innerWidth * 0.15)
});


// Shadow animation
// const t2 = gsap.timeline({
//   paused: true
// });

// t2.to(shadow, {
//   delay: 1.4,

//   width: () => Math.min(450, window.innerWidth * 0.9),

//   boxShadow: "-75px 150px 10px 5px #eeeef3",

//   ease: "back.out(.2)",
//   duration: 0.7
// });


// Open envelope
function openCard() {

  if (isOpen) return;

  isOpen = true;

  // Calculate movement using current screen dimensions
  liftDistance = getLiftDistance();

  // Reset and play animations
  t1.invalidate().play(0);
  t2.invalidate().play(0);
}


// Close envelope
function closeCard() {

  if (!isOpen) return;

  isOpen = false;

  t1.reverse();
  t2.reverse();
}
