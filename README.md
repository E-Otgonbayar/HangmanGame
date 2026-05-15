🪢 Hangman
A classic word-guessing game built with vanilla HTML, CSS, and JavaScript. Features a dark editorial aesthetic, fluid responsive layout, and 28 curated words across six categories.

Preview
┌─────────────────────────────────────────┐
│           H A N G M A N                │
│        A game of words & fate          │
│                                         │
│   ┌──┐   [ TECHNOLOGY ]                │
│   │  │   Hint: Container orchestration │
│   │  O                                  │
│   │ /|\   _ U _ E R N E T E _         │
│   │ / \                                 │
│  ═╧═════  ♦ ♦ ♦ ✕ ✕ ✕   Wrong: B R   │
└─────────────────────────────────────────┘

Features

28 words across 6 categories — Technology, Geography, Words, Music, Animals, Science
Animated gallows figure that reveals part by part on each wrong guess
On-screen keyboard plus full physical keyboard support
Win/loss overlay with running score tracker
Fully responsive — scales from mobile (320px) to wide desktop using fluid clamp() sizing
Mobile layout — gallows stacks above the word panel on narrow screens
No dependencies, no build step — open index.html and play


Project Structure
hangman/
├── index.html   # Markup — gallows SVG, keyboard, overlay
├── index.css    # Styles — fluid responsive layout, animations
├── index.js     # Game logic — state, guessing, rendering
└── README.md

Getting Started
No installation required.
bash# Clone the repo
git clone https://github.com/your-username/hangman.git
cd hangman

# Open directly in your browser
open index.html
Or just drag index.html into any browser window.

How to Play

A random word is chosen and its letters appear as blank slots
Guess letters using the on-screen keyboard or your physical keyboard
A correct guess reveals all matching letters in the word
A wrong guess adds a body part to the gallows — 6 wrong guesses and you lose
Guess the full word before the figure is complete to win
Press Play Again to start a new round (score persists across rounds)


Word Categories
CategoryExample wordsTechnologyKUBERNETES, PROMETHEUS, FIREWALLGeographyULAANBAATAR, MONGOLIA, HIMALAYANWordsLABYRINTH, SILHOUETTE, ECLIPSEMusicCRESCENDO, STACCATO, COUNTERPOINTAnimalsNARWHAL, PANGOLIN, CHAMELEONScienceQUANTUM, CATALYST, QUASAR

Adding Words
Open index.js and add an entry to the WORDS array at the top:
js{ word: "YOURWORD", category: "Category", hint: "A short clue about the word" },
Words with spaces are supported — they render as separate letter groups.

Responsive Behaviour
ViewportLayout> 520pxGallows left, word/info/keyboard right≤ 520pxGallows on top, word and keyboard below
All font sizes, key dimensions, and spacing use clamp() so the game fills the viewport naturally without breakpoint jumps.

Tech Stack
LayerChoiceMarkupSemantic HTML5 with inline SVG gallowsStyleVanilla CSS — custom properties, clamp(), @keyframesLogicVanilla JavaScript — no frameworks, no bundlerFontsPlayfair Display + Courier Prime via Google Fonts

License
MIT — do whatever you want with it.
