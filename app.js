/**
 * app.js
 * Core application logic. Reads from CURRICULUM (curriculum.js).
 * Uses localStorage for progress. Falls back to browser TTS if
 * audio files are missing, and emoji if image files are missing.
 *
 * Display notation in curriculum.js:
 *   <u>xx</u>   → underline (two-letter graphemes)
 *   <g>x</g>    → green (split digraph vowel)
 *   <r>x</r>    → red (silent e)
 */

/* ── State ─────────────────────────────────────────────────── */
let progress       = JSON.parse(localStorage.getItem("phonics_progress") || "{}");
let currentSet     = null;
let currentStepIdx = 0;
let dndDragging    = null;
let dndState       = {};
let fwAnimId       = null;

/* ── Persistence ────────────────────────────────────────────── */
function saveProgress() {
  localStorage.setItem("phonics_progress", JSON.stringify(progress));
}
function markStep(setId, idx) {
  if (!progress[setId]) progress[setId] = {};
  progress[setId][idx] = true;
  saveProgress();
}
function isStepDone(setId, idx) {
  return !!(progress[setId] && progress[setId][idx]);
}
function isSetComplete(c) {
  return c.steps.length > 0 && c.steps.every((_, i) => isStepDone(c.id, i));
}
function stepsCompleted(c) {
  return c.steps.filter((_, i) => isStepDone(c.id, i)).length;
}

/* ── Display helper ─────────────────────────────────────────── */
function renderDisplay(str) {
  if (!str) return "";
  return str
    .replace(/<u>(.*?)<\/u>/g, '<span style="text-decoration:underline;text-underline-offset:3px;">$1</span>')
    .replace(/<g>(.*?)<\/g>/g, '<span style="color:#1D9E75;font-weight:600;">$1</span>')
    .replace(/<r>(.*?)<\/r>/g, '<span style="color:#D85A30;font-weight:600;">$1</span>');
}

/* ── Audio ──────────────────────────────────────────────────── */
function playAudioFile(src, onEnd) {
  const audio = new Audio(src);
  audio.onended = onEnd || null;
  audio.onerror = () => {
    const word = src.split("/").pop().replace(/\.[^.]+$/, "").replace(/\s*spelling\s*/i, "").trim();
    speakTTS(word, 0.85, onEnd);
  };
  audio.play().catch(() => {
    const word = src.split("/").pop().replace(/\.[^.]+$/, "").replace(/\s*spelling\s*/i, "").trim();
    speakTTS(word, 0.85, onEnd);
  });
}

function speakTTS(text, rate, onEnd) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate  = rate || 1;
  u.lang  = "en-GB";
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
}

function playPhonemeSequence(audioFiles, index) {
  if (index >= audioFiles.length) return;
  playAudioFile(audioFiles[index], () => {
    setTimeout(() => playPhonemeSequence(audioFiles, index + 1), 300);
  });
}

/* ── Image helper ───────────────────────────────────────────── */
function imgOrEmoji(src, emoji, cls) {
  if (!src) return `<span>${emoji}</span>`;
  return `<img src="${src}" alt="" class="${cls || ""}"
    onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${emoji}'}))"/>`;
}

/* ── SVG helpers ────────────────────────────────────────────── */
const SVG = {
  audio: (s, c) => {
    const sz = s || 22, cl = c || "#378ADD";
    return `<svg width="${sz}" height="${sz}" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10.25" stroke="${cl}" stroke-width="1"/>
      <polygon points="8,7 16,11 8,15" fill="${cl}"/>
    </svg>`;
  },
  bubble: () => `<svg width="34" height="30" viewBox="0 0 34 30" fill="none">
    <rect x="1" y="1" width="32" height="22" rx="7" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="1"/>
    <path d="M9 23 L7 29 L15 23" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="1" stroke-linejoin="round"/>
  </svg>`,
  arrowRight: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  arrowLeft: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16 10H4M9 5L4 10L9 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  home: () => `<svg width="32" height="32" viewBox="0 0 20 20" fill="none">
    <path d="M3 9.5L10 3L17 9.5V17H13V13H7V17H3V9.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" fill="none"/>
  </svg>`,
  tick: (s) => { const n = s || 28; return `<svg width="${n}" height="${n}" viewBox="0 0 28 28">
    <circle cx="14" cy="14" r="13" fill="#1D9E75"/>
    <polyline points="8,14 12,18 20,10" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`; },
  cross: (s) => { const n = s || 28; return `<svg width="${n}" height="${n}" viewBox="0 0 28 28">
    <circle cx="14" cy="14" r="13" fill="#D85A30"/>
    <line x1="9" y1="9" x2="19" y2="19" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="19" y1="9" x2="9" y2="19" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`; },
};

/* ── Helper: is this the last match step in the set? ────────── */
function isLastMatchStep() {
  // Find all match steps in current set
  const matchSteps = currentSet.steps.map((s, i) => ({ ...s, i })).filter(s => s.type === "match");
  if (!matchSteps.length) return true;
  return matchSteps[matchSteps.length - 1].i === currentStepIdx;
}

/* ── Navigation helpers ─────────────────────────────────────── */
function navRow(nextHidden) {
  const isFirst = currentStepIdx === 0;
  const backBtn = `<button class="icon-only-btn" onclick="goBack()" ${isFirst ? "disabled" : ""}>${SVG.arrowLeft()}</button>`;
  const nextBtn = nextHidden
    ? `<button class="btn" id="next-btn" style="display:none;padding:10px 14px;" onclick="advanceStep()">${SVG.arrowRight()}</button>`
    : `<button class="btn" style="padding:10px 14px;" onclick="advanceStep()">${SVG.arrowRight()}</button>`;
  return `<div class="nav-row">${backBtn}${nextBtn}</div>`;
}

/* ── Screen switching ───────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goHome() {
  stopFireworks();
  document.getElementById("activity-container").innerHTML = "";
  document.getElementById("step-indicator").innerHTML = "";
  showScreen("screen-home");
  renderHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBack() {
  if (currentStepIdx > 0) {
    currentStepIdx--;
    renderSetHeader();
    renderStepIndicator();
    renderCurrentStep();
  }
}

function advanceStep() {
  markStep(currentSet.id, currentStepIdx);
  const next = currentStepIdx + 1;
  if (next >= currentSet.steps.length) {
    renderSetHeader();
    const nextSet = CURRICULUM.find(c => c.id !== currentSet.id && c.steps.length > 0 && !isSetComplete(c));
    launchFireworks(currentSet.homeLabel, nextSet ? nextSet.homeLabel : null);
  } else {
    currentStepIdx = next;
    renderSetHeader();
    renderStepIndicator();
    renderCurrentStep();
  }
}

/* ── Home screen ────────────────────────────────────────────── */
function renderHome() {
  const g = document.getElementById("set-grid");
  g.innerHTML = "";
  CURRICULUM.forEach((c, ci) => {
    const done   = isSetComplete(c);
    const prevOk = ci === 0 || isSetComplete(CURRICULUM[ci - 1]);
    const locked = false;
    const el     = document.createElement("div");
    el.className = "set-card" + (locked ? " locked-card" : "");
    el.innerHTML = `<div class="set-number">${c.homeLabel}${done ? " ✓" : ""}</div>
                    <div class="set-sounds">${renderDisplay(c.homeSounds)}</div>`;
    if (!locked) el.onclick = () => openSet(c.id, 0);
    g.appendChild(el);
  });
}

/* ── Set screen ─────────────────────────────────────────────── */
function openSet(id, stepIdx) {
  currentSet     = CURRICULUM.find(c => c.id === id);
  currentStepIdx = stepIdx || 0;
  showScreen("screen-set");
  renderSetHeader();
  renderStepIndicator();
  renderCurrentStep();
}

function renderSetHeader() {
  document.getElementById("set-title").textContent = currentSet.homeLabel;
  document.getElementById("set-subtitle").innerHTML = renderDisplay(currentSet.homeSounds);
  const pct = (stepsCompleted(currentSet) / currentSet.steps.length * 100) + "%";
  document.getElementById("set-progress").style.width = pct;
}

/* ── Step indicator ─────────────────────────────────────────── */
function renderStepIndicator() {
  const ind = document.getElementById("step-indicator");
  ind.innerHTML = "";
  ind.style.cssText = "display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;padding:10px 0 6px;border-top:0.5px solid #e0e0e0;";

  const seen = new Map();
  currentSet.steps.forEach((s, i) => { if (!seen.has(s.label)) seen.set(s.label, i); });

  seen.forEach((firstIdx, label) => {
    const matching = currentSet.steps.map((s, i) => ({ ...s, i })).filter(s => s.label === label);

    // Skip the single-step listen tab (satpin etc) — not shown in strip
    if (matching.length === 1) return;

    // Group container
    const group = document.createElement("div");
    group.style.cssText = "display:flex;align-items:center;gap:5px;";

    matching.forEach((step) => {
      const isDone   = isStepDone(currentSet.id, step.i);
      const isActive = step.i === currentStepIdx;
      const isLocked = !isDone && !isActive && step.i > 0 && !isStepDone(currentSet.id, step.i - 1);

      if (step.type === "say") {
        // Number circle — clickable when unlocked
        const num = document.createElement("div");
        const size = "34px";
        num.style.cssText = `
          width:${size}; height:${size};
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-family:'Patrick Hand',cursive;
          font-size:16px; font-weight:600;
          cursor:${isLocked ? "default" : "pointer"};
          transition:all 0.2s;
          border:2px solid ${isActive ? "#185FA5" : isDone ? "#1D9E75" : isLocked ? "#ccc" : "#999"};
          background:${isActive ? "#E6F1FB" : isDone ? "#1D9E75" : "transparent"};
          color:${isActive ? "#185FA5" : isDone ? "#fff" : isLocked ? "#ccc" : "#555"};
        `;
        num.textContent = label;
        if (!isLocked) {
          num.onclick = () => {
            if (isDone || isActive) {
              currentStepIdx = step.i;
              renderStepIndicator();
              renderCurrentStep();
            }
          };
        }
        group.appendChild(num);

      } else {
        // Dot for Spell and Match
        const dot = document.createElement("div");
        const size = "14px";
        dot.style.cssText = `
          width:${size}; height:${size};
          border-radius:50%;
          transition:all 0.2s;
          background:${isDone ? "#1D9E75" : isActive ? "#378ADD" : "#ccc"};
          cursor:${isLocked ? "default" : "pointer"};
        `;
        if (!isLocked) {
          dot.onclick = () => {
            if (isDone || isActive) {
              currentStepIdx = step.i;
              renderStepIndicator();
              renderCurrentStep();
            }
          };
        }
        group.appendChild(dot);
      }
    });

    ind.appendChild(group);
  });
}
/* ── Activity router ────────────────────────────────────────── */
function renderCurrentStep() {
  const step = currentSet.steps[currentStepIdx];
const stage = document.getElementById("activity-container");
  
  // Wrap every activity in a fixed-size pane
  stage.innerHTML = `<div class="activity-pane" id="activity-pane"></div>`;
  const pane = document.getElementById("activity-pane");

  const map = { listen: renderListen, say: renderSay, spell: renderSpell, match: renderMatch };
  if (map[step.type]) map[step.type](pane, step);
}

/* ── Activity 1: Listen ─────────────────────────────────────── */
function renderListen(c, step) {
  let html = `<div class="card"><h2 style="margin-bottom:1rem;color:#185FA5;">Listen</h2><div class="sound-grid">`;
  step.sounds.forEach(s => {
    html += `<div class="sound-btn" id="sb-${s.letter}">
      <span>${renderDisplay(s.display || s.letter)}</span>
      <span onclick="playSound('${s.audio}','${encodeURIComponent(s.letter)}')" style="display:inline-flex;cursor:pointer;">${SVG.audio(60, "#378ADD")}</span>
    </div>`;
  });
  html += `</div>
    <div class="nav-row">
      <button class="icon-only-btn" onclick="goBack()" ${currentStepIdx === 0 ? "disabled" : ""}>${SVG.arrowLeft()}</button>
      <button class="btn" id="next-btn" style="display:none;padding:10px 14px;" onclick="advanceStep()">${SVG.arrowRight()}</button>
    </div>
  </div>`;
  c.innerHTML = html;

  // Track which sounds have been played
  const played = new Set();
  const total = step.sounds.length;

  // Override playSound to track plays
  step.sounds.forEach(s => {
    const btn = c.querySelector(`#sb-${s.letter} span:last-child`);
    if (!btn) return;
    btn.onclick = () => {
      playSound(s.audio, encodeURIComponent(s.letter));
      played.add(s.letter);
      if (played.size >= total) {
        const nb = document.getElementById("next-btn");
        if (nb) nb.style.display = "inline-flex";
      }
    };
  });
}

function playSound(audioSrc, encodedLetter) {
  const letter = decodeURIComponent(encodedLetter);
  document.querySelectorAll(".sound-btn").forEach(b => b.classList.remove("playing"));
  const btn = document.getElementById("sb-" + letter);
  if (btn) btn.classList.add("playing");
  playAudioFile(audioSrc, () => { if (btn) btn.classList.remove("playing"); });
  setTimeout(() => { if (btn) btn.classList.remove("playing"); }, 1200);
}

/* ── Activity 2: Say ────────────────────────────────────────── */
function renderSay(c, step) {
  let html = `<div class="card">
  <table class="blend-table">
    <colgroup>
      <col style="width:36%"/>
      <col style="width:14%"/>
      <col style="width:36%"/>
      <col style="width:14%"/>
    </colgroup>
    <thead><tr>
      <th class="listen-h">Listen</th>
      <th class="say-h">Say</th>
      <th class="listen-h col-divider">Listen</th>
      <th class="say-h">Say</th>
    </tr></thead>
    <tbody>`;

  step.rows.forEach((row) => {
    const safePhoneme = row.phonemeAudio.replace(/'/g, "\\'");
    html += `<tr>
      <td>
        <div class="blend-listen-cell">
          <span class="phoneme-text">${renderDisplay(row.phonemes)}</span>
          <button class="icon-btn-round" onclick="playAudioFile('${safePhoneme}')">
            ${SVG.audio(22, "#378ADD")}
          </button>
        </div>
      </td>
      <td><div class="blend-say-cell">${SVG.bubble()}</div></td>
      <td class="col-divider">
        <div class="blend-listen-cell">
          <span class="word-text">${renderDisplay(row.display || row.word)}</span>
          <button class="icon-btn-round" onclick="playAudioFile('${row.audio}')">
            ${SVG.audio(22, "#378ADD")}
          </button>
        </div>
      </td>
      <td><div class="blend-say-cell">${SVG.bubble()}</div></td>
    </tr>`;
  });

  html += `</tbody></table>${navRow(false)}</div>`;
  c.innerHTML = html;
}

/* ── Activity 3: Spell ──────────────────────────────────────── */
function renderSpell(c, step) {
  let html = `<div class="card"><div class="spell-container">`;

  step.words.forEach((item, idx) => {
    const pic = item.image
      ? `<img src="${item.image}" alt="${item.word}"
           onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${item.emoji}',style:'font-size:26px'}))">`
      : `<span style="font-size:26px">${item.emoji}</span>`;
    const safeAudio = item.audio.replace(/'/g, "\\'");
    html += `<div class="spell-item">
      <div class="spell-pic">${pic}</div>
      <button class="icon-btn-round" onclick="playAudioFile('${safeAudio}')">
        ${SVG.audio(24, "#378ADD")}
      </button>
      <input class="spell-input" id="sp-${idx}" type="text"
        autocomplete="off" autocorrect="off" spellcheck="false" />
      <div class="result-icon" id="sr-${idx}"></div>
    </div>`;
  });

  // Always show back button; next arrow hidden until all words correct
  const isFirst = currentStepIdx === 0;
  html += `</div>
    <div class="nav-row" style="margin-top:0.75rem;">
      <button class="icon-only-btn" onclick="goBack()" ${isFirst ? "disabled" : ""}>${SVG.arrowLeft()}</button>
      <button class="btn" id="next-btn" style="display:none;padding:10px 14px;" onclick="advanceStep()">${SVG.arrowRight()}</button>
    </div>
  </div>`;
  c.innerHTML = html;

  step.words.forEach((item, idx) => {
    const inp = document.getElementById("sp-" + idx);
    if (!inp) return;

    function checkSpelling() {
      const val = inp.value.trim().toLowerCase();
      if (!val) return;
      const ok = val === item.word.toLowerCase();
      inp.className = "spell-input " + (ok ? "correct-input" : "wrong-input");
      const iconEl = document.getElementById("sr-" + idx);
      if (ok) {
        iconEl.innerHTML = SVG.tick();
      } else {
        iconEl.innerHTML = SVG.cross();
        setTimeout(() => {
          inp.value = "";
          inp.className = "spell-input";
          iconEl.innerHTML = "";
          inp.focus();
        }, 900);
      }
      const allOk = step.words.every((_, i) => {
        const el = document.getElementById("sp-" + i);
        return el && el.classList.contains("correct-input");
      });
      if (allOk) {
        const nb = document.getElementById("next-btn");
        if (nb) nb.style.display = "inline-flex";
      }
    }

    inp.addEventListener("blur", checkSpelling);
    inp.addEventListener("keydown", e => { if (e.key === "Enter") inp.blur(); });
  });
}

/* ── Activity 4: Match (drag & drop) ───────────────────────── */
function renderMatch(c, step) {
  const items     = step.items;
  const isLast    = isLastMatchStep();
  const isFirst   = currentStepIdx === 0;

  dndState    = {};
  items.forEach(it => { dndState[it.word] = null; });
  dndDragging = null;

  // Right-hand button: home on last match, hidden forward arrow on others
  const rightBtn = isLast
    ? `<button class="icon-only-btn" onclick="goHome()">${SVG.home()}</button>`
    : `<button class="btn" id="match-next" style="display:none;padding:10px 14px;" onclick="advanceStep()">${SVG.arrowRight()}</button>`;

  c.innerHTML = `<div class="card">
    <div class="dnd-grid">
      <div class="dnd-drag-col" id="drag-col"></div>
      <div class="dnd-drop-col" id="drop-col"></div>
    </div>
    <div class="nav-row" style="margin-top:1rem;">
      <button class="icon-only-btn" onclick="goBack()" ${isFirst ? "disabled" : ""}>${SVG.arrowLeft()}</button>
      ${rightBtn}
    </div>
  </div>`;

  const shuffledPics  = [...items].sort(() => Math.random() - 0.5);
  const shuffledWords = [...items].sort(() => Math.random() - 0.5);

  const dragCol = document.getElementById("drag-col");
  shuffledPics.forEach(it => {
    const el = document.createElement("div");
    el.className = "drag-chip";
    el.id        = "chip-" + it.word;
    el.draggable = true;
    el.innerHTML = it.image
      ? `<img src="${it.image}" alt="${it.word}"
           onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${it.emoji}',style:'font-size:28px'}))">`
      : `<span style="font-size:28px">${it.emoji}</span>`;
    el.addEventListener("dragstart", e => {
      dndDragging = it.word;
      el.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    el.addEventListener("dragend", () => {
      el.classList.remove("dragging");
      dndDragging = null;
    });
    dragCol.appendChild(el);
  });

  const dropCol = document.getElementById("drop-col");
  shuffledWords.forEach(it => {
    const el = document.createElement("div");
    el.className = "drop-slot";
    el.id        = "slot-" + it.word;
    el.innerHTML = `<span class="slot-word">${renderDisplay(it.display || it.word)}</span>
                    <span class="slot-img"  id="si-${it.word}"></span>
                    <span class="slot-result" id="sr2-${it.word}"></span>`;

    el.addEventListener("dragover",  e => { e.preventDefault(); el.classList.add("over"); });
    el.addEventListener("dragleave", ()  => el.classList.remove("over"));
    el.addEventListener("drop", e => {
      e.preventDefault();
      el.classList.remove("over");
      if (!dndDragging || el.classList.contains("correct-slot")) return;

      const prevSlotKey = Object.keys(dndState).find(k => dndState[k] === dndDragging);
      if (prevSlotKey) {
        dndState[prevSlotKey] = null;
        const ps = document.getElementById("slot-" + prevSlotKey);
        if (ps && !ps.classList.contains("correct-slot")) {
          ps.classList.remove("correct-slot", "wrong-slot");
          document.getElementById("si-" + prevSlotKey).innerHTML  = "";
          document.getElementById("sr2-" + prevSlotKey).innerHTML = "";
        }
        const prevChip = document.getElementById("chip-" + dndDragging);
        if (prevChip) prevChip.classList.remove("used");
      }

      const correct = dndDragging === it.word;
      dndState[it.word] = dndDragging;

      const src     = items.find(x => x.word === dndDragging);
      const slotImg = document.getElementById("si-" + it.word);
      slotImg.innerHTML = src
        ? (src.image
            ? `<img src="${src.image}" alt="${src.word}"
                 onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${src.emoji}',style:'font-size:24px'}))">`
            : `<span style="font-size:24px">${src.emoji}</span>`)
        : "";

      const chip  = document.getElementById("chip-" + dndDragging);
      const resEl = document.getElementById("sr2-" + it.word);

      if (correct) {
        el.classList.add("correct-slot");
        if (chip)  chip.classList.add("used");
        if (resEl) resEl.innerHTML = SVG.tick(22);
      } else {
        el.classList.add("wrong-slot");
        if (resEl) resEl.innerHTML = SVG.cross(22);
        setTimeout(() => {
          el.classList.remove("wrong-slot");
          slotImg.innerHTML = "";
          if (resEl) resEl.innerHTML = "";
          dndState[it.word] = null;
          if (chip) chip.classList.remove("used");
        }, 900);
      }

      // Show forward arrow (or trigger fireworks on last match) when all correct
      if (items.every(x => dndState[x.word] === x.word)) {
        if (isLast) {
          // Trigger fireworks after short delay
          setTimeout(() => {
            markStep(currentSet.id, currentStepIdx);
            renderSetHeader();
            const nextSet = CURRICULUM.find(c => c.id !== currentSet.id && c.steps.length > 0 && !isSetComplete(c));
            launchFireworks(currentSet.homeLabel, nextSet ? nextSet.homeLabel : null);
          }, 600);
        } else {
          const nb = document.getElementById("match-next");
          if (nb) nb.style.display = "inline-flex";
        }
      }
    });

    dropCol.appendChild(el);
  });
}

/* ── Fireworks ──────────────────────────────────────────────── */
function launchFireworks(setLabel, nextLabel) {
  const overlay = document.getElementById("fw-overlay");
  const msg     = document.getElementById("fw-message");
  const canvas  = document.getElementById("fw-canvas");
  const ctx     = canvas.getContext("2d");

  document.getElementById("fw-title").textContent    = setLabel + " complete!";
  document.getElementById("fw-subtitle").textContent = "Amazing work — keep it up!";
  document.getElementById("fw-btn").textContent      = nextLabel ? nextLabel + " →" : "Back to sets";

  overlay.classList.add("active");
  msg.classList.add("active");

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const COLORS    = ["#1D9E75","#378ADD","#D85A30","#BA7517","#D4537E","#7F77DD","#639922","#E24B4A"];
  const rand = (a, b) => Math.random() * (b - a) + a;

  function burst(x, y) {
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2, speed = rand(2, 9);
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size:  rand(3, 7),
        decay: rand(0.012, 0.022),
        gravity: rand(0.08, 0.18),
        trail: [],
      });
    }
  }

  let lastBurst = 0, burstCount = 0;

  function loop(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (ts - lastBurst > 600 && burstCount < 12) {
      burst(rand(canvas.width * 0.15, canvas.width * 0.85),
            rand(canvas.height * 0.1, canvas.height * 0.5));
      lastBurst = ts;
      burstCount++;
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 5) p.trail.shift();
      p.vy += p.gravity;
      p.x  += p.vx;
      p.y  += p.vy;
      p.vx *= 0.97;
      p.alpha -= p.decay;
      if (p.alpha <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.alpha * 0.35;
      p.trail.forEach(t => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (burstCount < 12 || particles.length > 0) {
      fwAnimId = requestAnimationFrame(loop);
    }
  }

  burst(canvas.width * 0.3,  canvas.height * 0.3);
  burst(canvas.width * 0.7,  canvas.height * 0.25);
  fwAnimId = requestAnimationFrame(loop);
}

function stopFireworks() {
  if (fwAnimId) { cancelAnimationFrame(fwAnimId); fwAnimId = null; }
  document.getElementById("fw-overlay").classList.remove("active");
  document.getElementById("fw-message").classList.remove("active");
}

function dismissFireworks() {
  stopFireworks();
  const nextSet = CURRICULUM.find(c => c.id !== currentSet.id && c.steps.length > 0 && !isSetComplete(c));
  if (nextSet) openSet(nextSet.id, 0);
  else goHome();
}

/* ── Boot ───────────────────────────────────────────────────── */
renderHome();
