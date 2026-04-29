// Score
let score = 0;

// Streak system
let streak = 0;

//
let gameOver = false;

// Badge tracking (prevents repeat triggering)
let badgeShown = {
  3: false,
  8: false,
  12: false
};

// Rubbishes
const rubbishList = [
  {src: "plasticbottle.png", correct: "plastic", fact: "Only plastics 1, 2, 5 can be recycled."},
  {src: "winebottle.png", correct: "glass", fact: "Glass bottles can be recycled endlessly in NZ."},
  {src: "cardboardbox.png", correct: "paper", fact: "Cardboard should be clean and dry before recycling."},
  {src: "chips.png", correct: "landfill", fact: "Chip bags cannot be recycled in NZ."},
  {src: "banana.png", correct: "food", fact: "Food scraps go into food waste bins in NZ."},
  {src: "newspaper.png", correct: "paper", fact: "Paper can be recycled if it is clean and dry."},
  {src: "jar.png", correct: "glass", fact: "Glass jars are recyclable but lids must be removed."},
  {src: "yogurt.png", correct: "plastic", fact: "Some yogurt containers are recyclable if cleaned."},
  {src: "tissue.png", correct: "landfill", fact: "Used tissues cannot be recycled."}
];

// Sounds
const correctSound = new Audio("Correct.mp3");
const wrongSound = new Audio("Wrong.mp3");
const badgeSound = new Audio("badge.mp3");

// Badge element
const badge = document.getElementById("badge");

let currentIndex = 0;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle once at start
shuffle(rubbishList);

// Elements
const scoreBoard = document.getElementById("scoreBoard");
const rubbishItem = document.getElementById("rubbishItem");
const kaitiMessage = document.getElementById("kaitiMessage");

// Bins
const foodBin = document.getElementById("food");
const glassBin = document.getElementById("glass");
const landfillBin = document.getElementById("landfill");
const paperBin = document.getElementById("paper");
const plasticBin = document.getElementById("plastic");

// New rubbish function
function newRubbish() {
if (currentIndex >= rubbishList.length) {
  gameOver = true;


  kaitiMessage.textContent =
    "🎉 You finished all the rubbish! Final Score: " + score;

  rubbishItem.style.visibility = "hidden";
  return;
}

  const item = rubbishList[currentIndex];

  rubbishItem.src = item.src;
  rubbishItem.dataset.correct = item.correct;
  rubbishItem.dataset.fact = item.fact;

  kaitiMessage.textContent = "Choose the correct bin!";

  currentIndex++;
}

// Badge function
function showBadge(src, message) {
  badge.src = src;
  badge.style.display = "block";
  kaitiMessage.textContent = message;

  // badge sound
  badgeSound.currentTime = 0;
  badgeSound.play();

  // Confetti 
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    badge.style.display = "none";
  }, 2000);
}

// Start first item
newRubbish();



// Check bin function
function checkBin(bin) {
  if (gameOver) return;
  const isCorrect = bin.dataset.correct === rubbishItem.dataset.correct;

  if (isCorrect) {
    score++;
    streak++;

    correctSound.currentTime = 0;
    correctSound.play();

    let message =
      "✅ Nice one! " + rubbishItem.dataset.fact;

    // Streak bonus
    if (streak % 3 === 0) {
      score += 2;
      message += " 🔥 Streak Bonus! +2 points!";
    }

    kaitiMessage.textContent = message;

    // Badges
    if (score >= 3 && !badgeShown[3]) {
      showBadge("badge1.png", "🌱 Eco Starter!");
      badgeShown[3] = true;
    } else if (score >= 8 && !badgeShown[8]) {
      showBadge("badge2.png", "🌿 Recycling Pro!");
      badgeShown[8] = true;
    } else if (score >= 12 && !badgeShown[12]) {
      showBadge("badge3.png", "🌍 Kaitiaki Legend!");
      badgeShown[12] = true;
    }

  } else {
    wrongSound.currentTime = 0;
    wrongSound.play();

    streak = 0;

    kaitiMessage.textContent =
      "❌ Oops! That belongs in the " +
      rubbishItem.dataset.correct +
      " bin. " +
      rubbishItem.dataset.fact;
  }

  scoreBoard.textContent = "Score: " + score;

  setTimeout(newRubbish, 2000);
}

// Bin clicks
foodBin.onclick = () => checkBin(foodBin);
glassBin.onclick = () => checkBin(glassBin);
landfillBin.onclick = () => checkBin(landfillBin);
paperBin.onclick = () => checkBin(paperBin);
plasticBin.onclick = () => checkBin(plasticBin);
