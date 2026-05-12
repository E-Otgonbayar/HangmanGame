const WORDS = [
  { word: "JAVASCRIPT",    category: "Technology", hint: "The language of the web" },
  { word: "KUBERNETES",    category: "Technology", hint: "Container orchestration platform" },
  { word: "ALGORITHM",     category: "Technology", hint: "Step-by-step problem solver" },
  { word: "PROMETHEUS",    category: "Technology", hint: "Monitoring & alerting toolkit" },
  { word: "FIREWALL",      category: "Technology", hint: "Network security barrier" },
  { word: "ENCRYPTION",    category: "Technology", hint: "Data scrambling for security" },
  { word: "ULAANBAATAR",   category: "Geography",  hint: "Coldest capital city on Earth" },
  { word: "MONGOLIA",      category: "Geography",  hint: "Land of the eternal blue sky" },
  { word: "HIMALAYAN",     category: "Geography",  hint: "World's highest mountain range" },
  { word: "ARCHIPELAGO",   category: "Geography",  hint: "A chain of islands" },
  { word: "MEDITERRANEAN", category: "Geography",  hint: "Ancient sea between continents" },
  { word: "PHANTOM",       category: "Words",      hint: "A ghostly apparition" },
  { word: "LABYRINTH",     category: "Words",      hint: "A complex maze" },
  { word: "CRYPTIC",       category: "Words",      hint: "Mysterious and puzzling" },
  { word: "ECLIPSE",       category: "Words",      hint: "When one body blocks another's light" },
  { word: "SILHOUETTE",    category: "Words",      hint: "A dark shape against a bright background" },
  { word: "SYMPHONY",      category: "Music",      hint: "An elaborate orchestral composition" },
  { word: "STACCATO",      category: "Music",      hint: "Short, detached musical notes" },
  { word: "CRESCENDO",     category: "Music",      hint: "Gradually getting louder" },
  { word: "COUNTERPOINT",  category: "Music",      hint: "Two melodies played simultaneously" },
  { word: "WOLVERINE",     category: "Animals",    hint: "Ferocious mustelid of the north" },
  { word: "PANGOLIN",      category: "Animals",    hint: "The world's only scaly mammal" },
  { word: "CHAMELEON",     category: "Animals",    hint: "Master of colour change" },
  { word: "NARWHAL",       category: "Animals",    hint: "The unicorn of the sea" },
  { word: "QUASAR",        category: "Science",    hint: "An extremely luminous galaxy core" },
  { word: "NEUTRON",       category: "Science",    hint: "A particle with no charge" },
  { word: "QUANTUM",       category: "Science",    hint: "The smallest discrete unit of energy" },
  { word: "CATALYST",      category: "Science",    hint: "Speeds up a reaction without being consumed" },
];

const BODY_PARTS = [
  'hm-head',
  'hm-body',
  'hm-arm-l',
  'hm-arm-r',
  'hm-leg-l',
  'hm-leg-r',
];

const MAX_WRONG = 6;
const ROWS      = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

let state = {
  word:    '',
  guessed: new Set(),
  wrong:   0,
  wins:    0,
  losses:  0,
  over:    false,
};

/* ── Build on-screen keyboard ── */
function buildKeyboard() {
  const kb = document.getElementById('hm-keyboard');
  kb.innerHTML = '';

  ROWS.forEach(row => {
    const div = document.createElement('div');
    div.className = 'hm-key-row';

    row.split('').forEach(ch => {
      const btn = document.createElement('button');
      btn.className   = 'hm-key';
      btn.id          = 'key-' + ch;
      btn.textContent = ch;
      btn.addEventListener('click', () => guess(ch));
      div.appendChild(btn);
    });

    kb.appendChild(div);
  });
}

/* ── Start a new round ── */
function newGame() {
  const pick    = WORDS[Math.floor(Math.random() * WORDS.length)];
  state.word    = pick.word;
  state.guessed = new Set();
  state.wrong   = 0;
  state.over    = false;

  document.getElementById('hm-category').textContent  = pick.category;
  document.getElementById('hm-hint').textContent       = pick.hint;
  document.getElementById('hm-overlay').style.display  = 'none';
  document.getElementById('hm-figure').style.display   = 'none';
  BODY_PARTS.forEach(id => document.getElementById(id).style.display = 'none');

  buildKeyboard();
  renderWord();
  renderLives();
  renderGuessed();
}

/* ── Render the word letter slots ── */
function renderWord() {
  const el     = document.getElementById('hm-word-display');
  el.innerHTML = '';

  const words = state.word.split(' ');
  words.forEach((w, wi) => {
    w.split('').forEach(ch => {
      const slot     = document.createElement('div');
      slot.className = 'hm-letter-slot';

      const letter     = document.createElement('div');
      letter.className = 'hm-letter';
      if (state.guessed.has(ch)) {
        letter.textContent = ch;
        letter.classList.add('revealed');
      }

      const line     = document.createElement('div');
      line.className = 'hm-letter-line';

      slot.appendChild(letter);
      slot.appendChild(line);
      el.appendChild(slot);
    });

    if (wi < words.length - 1) {
      const gap     = document.createElement('div');
      gap.className = 'hm-space-gap';
      el.appendChild(gap);
    }
  });
}

/* ── Render lives row ── */
function renderLives() {
  const el     = document.getElementById('hm-lives');
  el.innerHTML = '';

  for (let i = 0; i < MAX_WRONG; i++) {
    const h       = document.createElement('span');
    h.className   = 'hm-heart' + (i < state.wrong ? ' lost' : '');
    h.textContent = i < state.wrong ? '✕' : '♦';
    el.appendChild(h);
  }
}

/* ── Render wrong-guess letters ── */
function renderGuessed() {
  const el     = document.getElementById('hm-guessed');
  el.innerHTML = '';

  [...state.guessed]
    .filter(c => !state.word.replace(/ /g, '').includes(c))
    .forEach(c => {
      const s       = document.createElement('span');
      s.className   = 'hm-wrong-letter';
      s.textContent = c;
      el.appendChild(s);
    });
}

/* ── Reveal the next body part on the gallows ── */
function showBodyPart(idx) {
  document.getElementById('hm-figure').style.display         = '';
  document.getElementById(BODY_PARTS[idx]).style.display     = '';
}

/* ── Handle a letter guess ── */
function guess(ch) {
  if (state.over || state.guessed.has(ch)) return;
  state.guessed.add(ch);

  const btn = document.getElementById('key-' + ch);

  if (state.word.includes(ch)) {
    btn.classList.add('correct-key');
    btn.disabled = true;
  } else {
    btn.classList.add('wrong-key');
    btn.disabled = true;
    showBodyPart(state.wrong);
    state.wrong++;
  }

  renderWord();
  renderLives();
  renderGuessed();

  const won = state.word
    .replace(/ /g, '')
    .split('')
    .every(c => state.guessed.has(c));

  if (won)                        { state.wins++;   endGame(true);  }
  else if (state.wrong >= MAX_WRONG) { state.losses++; endGame(false); }
}

/* ── Show win / lose overlay ── */
function endGame(won) {
  state.over = true;

  setTimeout(() => {
    const title       = document.getElementById('ov-title');
    title.textContent = won ? 'You Win!' : 'Hanged!';
    title.className   = 'hm-overlay-title ' + (won ? 'win' : 'lose');

    document.getElementById('ov-word').textContent   = state.word;
    document.getElementById('ov-wins').textContent   = state.wins;
    document.getElementById('ov-losses').textContent = state.losses;
    document.getElementById('hm-overlay').style.display = 'flex';
  }, 600);
}

/* ── Physical keyboard support ── */
document.addEventListener('keydown', e => {
  const ch = e.key.toUpperCase();
  if (/^[A-Z]$/.test(ch)) guess(ch);
});

/* ── Play Again button ── */
document.getElementById('hm-play-btn').addEventListener('click', newGame);

/* ── Boot ── */
buildKeyboard();
newGame();
