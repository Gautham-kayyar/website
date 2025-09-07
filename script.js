// SCRIPT INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS (Animation on Scroll)
  AOS.init({ duration: 700, once: true });

  // 2. Initialize Swiper Slider for Activities
  const swiper = new Swiper('.activity-slider', {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 30 }
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    // START OF CHANGE: Added Autoplay configuration
    autoplay: {
      delay: 3000, // 3 seconds delay between slides
      disableOnInteraction: false, // Continue autoplay even after user interaction
    },
    // END OF CHANGE
  });

  // 3. Mobile Menu Logic
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.main-nav a');

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
      }
    });
  });
});


// QUIZ LOGIC
const questions = [
  { q: "What's your full name?", type: 'text', placeholder: 'Enter your name here' },
  { q: "Which branch of engineering are you in?", type: 'text', placeholder: 'e.g., Aeronautical, CSE, Mechanical' },
  { q: "Which semester are you in?", type: 'text', placeholder: 'e.g., 3rd, 5th' },
  { q: "What excites you most about aerospace?", type: 'mcq', opts: ["Aircraft & RC Planes", "Drones & UAVs", "Satellites & Space Tech", "AI/ML in Aeronautics"] },
  { q: "What do you hope to achieve by joining a community like this?", type: 'mcq', opts: ["Build practical, hands-on projects", "Learn from experienced peers", "Compete in competitions", "Contribute to open-source software"] },
  { q: "How much time are you willing to dedicate per week?", type: 'mcq', opts: ["A few hours (2-4)", "A good amount (5-8)", "I'm ready to dive in deep! (8+)"] },
  { q: "What's your current skill level in your area of interest?", type: 'mcq', opts: ["Just a beginner, eager to learn!", "Intermediate, I know the basics.", "Advanced, I can lead projects."] }
];

let idx = 0;
let answers = {};

function renderQuiz() {
  const body = document.getElementById("quizBody");
  if (idx < questions.length) {
    const q = questions[idx];
    let questionHTML = `<p><strong>${q.q}</strong></p>`;
    if (q.type === 'text') {
      questionHTML += `
        <div class="quiz-input-group">
          <input type="text" id="quizTextInput" placeholder="${q.placeholder}">
          <button id="quizNextBtn">Next →</button>
        </div>
      `;
      body.innerHTML = questionHTML;
      document.getElementById('quizNextBtn').onclick = () => {
        const input = document.getElementById('quizTextInput');
        const value = input.value.trim();
        if (value) {
          answers[q.q] = value;
          idx++;
          renderQuiz();
        } else {
          alert("Please fill in the field to continue.");
        }
      };
      document.getElementById('quizTextInput').onkeyup = (event) => {
        if (event.key === 'Enter') {
          document.getElementById('quizNextBtn').click();
        }
      };
    } else if (q.type === 'mcq') {
      const optionsWrap = document.createElement("div");
      optionsWrap.className = "options";
      q.opts.forEach(o => {
        const b = document.createElement("button");
        b.textContent = o;
        b.onclick = () => { answers[q.q] = o; idx++; renderQuiz(); };
        optionsWrap.appendChild(b);
      });
      body.innerHTML = questionHTML;
      body.appendChild(optionsWrap);
    }
  } else {
    body.innerHTML = `<p>Submitting your answers...</p>`;
    const formspreeEndpoint = 'https://formspree.io/f/xxxxxxxx'; // REPLACE THIS
    fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })
    .then(response => {
      body.innerHTML = response.ok
        ? `<p>Thanks for completing! 🎉<br>Your response has been submitted.</p>`
        : `<p>Sorry, there was an error submitting your response. Please try again later.</p>`;
    })
    .catch(error => {
      console.error('Error:', error);
      body.innerHTML = `<p>Sorry, there was an error submitting your response. Please try again later.</p>`;
    });
  }
}


// MODAL LOGIC
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

// CHANGED: Project Description Toggle Function
function toggleProjectDescription(button) {
  const descriptionWrapper = button.previousElementSibling; // The div wrapping the paragraph
  const isExpanded = button.dataset.expanded === 'true';

  descriptionWrapper.classList.toggle('expanded');
  button.dataset.expanded = !isExpanded;

  if (isExpanded) {
    button.innerHTML = 'Learn More <i class="fas fa-arrow-right"></i>';
  } else {
    button.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
  }
}
