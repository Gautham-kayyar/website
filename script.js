// Init AOS on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 700, once: true });

  // Mobile Menu Logic
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.main-nav a');

  // Toggle menu on hamburger click
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  // Close menu when a link is clicked (for single-page navigation)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
      }
    });
  });
});

// Quiz Logic
const questions = [
  { q: "What excites you most?", opts: ["Aircraft Design", "Drones", "Space Systems", "Aerodynamics"] },
  { q: "Your preferred role?", opts: ["Builder", "Programmer", "Researcher", "Competitor"] },
  { q: "Skill level", opts: ["Beginner", "Intermediate", "Advanced"] }
];
let idx = 0;
let answers = {};

function renderQuiz() {
  const body = document.getElementById("quizBody");
  if (idx < questions.length) {
    const q = questions[idx];
    body.innerHTML = `<p><strong>${q.q}</strong></p>`;
    const wrap = document.createElement("div");
    wrap.className = "options";
    q.opts.forEach(o => {
      const b = document.createElement("button");
      b.textContent = o;
      b.onclick = () => { answers[idx] = o; idx++; renderQuiz(); };
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
  } else {
    body.innerHTML = `<p>Thanks for completing! 🎉<br>Your answers have been saved locally.</p>`;
    localStorage.setItem("aeroQuiz", JSON.stringify(answers));
  }
}

// Modal Logic
const quizModal = document.getElementById("quizModal");

function openModal() {
  quizModal.classList.add('active');
  idx = 0;
  answers = {};
  renderQuiz();
}

function closeModal() {
  quizModal.classList.remove('active');
}
