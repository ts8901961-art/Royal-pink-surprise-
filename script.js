const questions = [
  { question: 'When did we first meet?', hint: 'Think of the month that started our story.', answers: ['march'] },
  { question: "What's my nickname for you?", hint: 'A cute little nickname, just for you.', answers: ['rotlu baccha', 'rotlu bachha'] },
  { question: 'How much do I love you?', hint: 'Some feelings cannot be measured.', answers: ['not countable', 'beyond counting', 'uncountable', 'infinite', 'countless'] }
];
let current = 0;
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const hintEl = document.getElementById('hint');
const countEl = document.getElementById('questionCount');
const feedbackEl = document.getElementById('feedback');
const progressEl = document.getElementById('progressBar');
const nextButton = document.getElementById('nextButton');
function normalize(value) { return value.toLowerCase().trim().replace(/[.!?']/g, '').replace(/\s+/g, ' '); }
function renderQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;
  hintEl.textContent = q.hint;
  countEl.textContent = `QUESTION ${current + 1} OF 3`;
  progressEl.style.width = `${((current + 1) / 3) * 100}%`;
  answerEl.value = '';
  feedbackEl.textContent = '';
  nextButton.textContent = current === 2 ? 'Reveal my surprise ✨' : 'Unlock next 💌';
  answerEl.focus({preventScroll:true});
}
nextButton.addEventListener('click', () => {
  const typed = normalize(answerEl.value);
  if (!typed) { feedbackEl.textContent = 'Write your answer first, lovely. 💗'; return; }
  if (!questions[current].answers.includes(typed)) { feedbackEl.textContent = 'Not quite! Try once more. You know our little story. 💕'; return; }
  if (current < questions.length - 1) { current++; renderQuestion(); }
  else {
    document.getElementById('letter').scrollIntoView({behavior:'smooth'});
    feedbackEl.textContent = 'You unlocked it! Every word is for you. ❤️';
    nextButton.textContent = 'Unlocked 💖';
    nextButton.disabled = true;
  }
});
answerEl.addEventListener('keydown', e => { if (e.key === 'Enter') nextButton.click(); });
document.getElementById('replayButton').addEventListener('click', () => {
  current = 0; nextButton.disabled = false; renderQuestion();
  document.getElementById('quiz').scrollIntoView({behavior:'smooth'});
});
renderQuestion();
