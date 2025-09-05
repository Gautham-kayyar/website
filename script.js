// Init AOS
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration:700, once:true });
});

// Quiz Logic
const questions = [
  { q:"What excites you most?", opts:["Aircraft Design","Drones","Space Systems","Aerodynamics"] },
  { q:"Your preferred role?", opts:["Builder","Programmer","Researcher","Competitor"] },
  { q:"Skill level", opts:["Beginner","Intermediate","Advanced"] }
];
let idx = 0;
let answers = {};

function renderQuiz(){
  const body = document.getElementById("quizBody");
  if(idx < questions.length){
    const q = questions[idx];
    body.innerHTML = `<p><strong>${q.q}</strong></p>`;
    const wrap = document.createElement("div"); 
    wrap.className = "options";
    q.opts.forEach(o=>{
      const b = document.createElement("button");
      b.textContent = o;
      b.onclick = ()=>{ answers[idx]=o; idx++; renderQuiz(); };
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
  } else {
    body.innerHTML = `<p>Thanks for completing! 🎉<br>Your answers have been saved locally.</p>`;
    localStorage.setItem("aeroQuiz", JSON.stringify(answers));
  }
}

function openModal(){
  document.getElementById("quizModal").style.display="flex"; 
  idx=0; answers={}; renderQuiz();
}
function closeModal(){
  document.getElementById("quizModal").style.display="none";
}
