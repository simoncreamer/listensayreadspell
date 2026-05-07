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


// Compatibility for Listen (Sounds) page
function playSound(src) {
  playAudioFile(src);
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
    window.scrollTo({ top: 0, behavior: "smooth" });

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
    window.scrollTo({ top: 0, behavior: "smooth" });

  }
}

/* ── Home screen ────────────────────────────────────────────── */
function renderHome() {
  const g = document.getElementById("set-grid");
  g.innerHTML = "";
  CURRICULUM.forEach((c, ci) => {
    const done = isSetComplete(c);
    const el   = document.createElement("div");
    el.className = "set-card";
    el.innerHTML = `<div class="set-number">${c.homeLabel}${done ? " ✓" : ""}</div>
                    <div class="set-sounds">${renderDisplay(c.homeSounds)}</div>`;
    el.onclick = () => openSet(c.id, 0);
    g.appendChild(el);

    // For sets that come in pairs (.1 and .2 only, no .3),
    // add a placeholder after the .2 to fill the third column
    const twoOnly = ["set1-2","set2-2","set3-2","set4-2","set5-2","set6-2","set7-2"];
    if (twoOnly.includes(c.id)) {
      const ph = document.createElement("div");
      ph.className = "grid-placeholder";
      g.appendChild(ph);
    }
  });
}

/* ── Set screen ─────────────────────────────────────────────── */
function openSet(id, stepIdx) {
  currentSet     = CURRICULUM.find(c => c.id === id);
  currentStepIdx = stepIdx || 0;
  // Preload all audio in this set
  currentSet.steps.forEach(step => {
    const srcs = [];
    if (step.sounds) step.sounds.forEach(s => srcs.push(s.audio));
    if (step.rows)   step.rows.forEach(r => { srcs.push(r.audio); srcs.push(r.phonemeAudio); });
    if (step.words)  step.words.forEach(w => srcs.push(w.audio));
    srcs.forEach(src => { const a = new Audio(); a.preload = "auto"; a.src = src; });
  });
  showScreen("screen-set");
  renderSetHeader();
  renderStepIndicator();
  renderCurrentStep();
  window.scrollTo({ top: 0, behavior: "smooth" });

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

   // Single-step = Listen tab — show as a labelled button
    if (matching.length === 1) {
      const btn = document.createElement("button");
      btn.style.cssText = `
        font-family:'Patrick Hand',cursive;
        font-size:18px;
        font-weight:600;
        padding:5px 10px;
        border-radius:20px;
        border:2px solid ${matching[0].i === currentStepIdx ? "#185FA5" : isStepDone(currentSet.id, matching[0].i) ? "#1D9E75" : "#ccc"};
        background:${matching[0].i === currentStepIdx ? "#E6F1FB" : isStepDone(currentSet.id, matching[0].i) ? "#E1F5EE" : "#f5f5f5"};
        color:${matching[0].i === currentStepIdx ? "#185FA5" : isStepDone(currentSet.id, matching[0].i) ? "#0F6E56" : "#888"};
        cursor:pointer;
        white-space:nowrap;
      `;
      btn.innerHTML = renderDisplay(currentSet.homeSounds);
      btn.onclick = () => {
        currentStepIdx = matching[0].i;
        renderStepIndicator();
        renderCurrentStep();
      };
      ind.appendChild(btn);
      return;
    }

    // Group container
    const group = document.createElement("div");
    group.style.cssText = "display:flex;align-items:center;gap:5px;";

    matching.forEach((step) => {
      const isDone   = isStepDone(currentSet.id, step.i);
      const isActive = step.i === currentStepIdx;
      const isLocked = !isDone && !isActive && step.i > 0 && !isStepDone(currentSet.id, step.i - 1);

      if (step.type === "say" || step.type === "sayPaired") {
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
    const map = {
       listen:          renderListen,
       say:             renderSay,
       sayPaired:       renderSayPaired,
       alphabetNames:   renderAlphabetNames,
       alphabetSounds:  renderAlphabetSounds,
       patterns:        renderPatterns,
       spell:           renderSpell,
       match:           renderMatch,
};
  if (map[step.type]) map[step.type](pane, step);
}

/* ── Activity 1: Listen ─────────────────────────────────────── */
function renderListen(c, step) {
  let html = `<div class="card"><h2 style="margin-bottom:1rem;color:#1a1a1a;">Listen</h2><div class="sound-grid">`;
  step.sounds.forEach(s => {
    html += `<div class="sound-btn" id="sb-${s.letter}">
      <span>${renderDisplay(s.display || s.letter)}</span>
      <span onclick="playSound('${s.audio}')" style="display:inline-flex;cursor:pointer;">${SVG.audio(22, "#378ADD")}</span>
    </div>`;
  });
  html += `</div>${navRow(false)}</div>`;
  c.innerHTML = html;
}

/* ── Activity 2: Say ────────────────────────────────────────── */
function renderSay(c, step) {
  let html = `<div class="card">
  <h2 style="margin-bottom:1rem;color:#1a1a1a;">Say</h2>
  <table class="blend-table" style="width:90%;margin:0 auto;">
    <colgroup>
      <col style="width:60%"/>
      <col style="width:20%"/>
      <col style="width:20%"/>
    </colgroup>
    <thead><tr>
      <th></th>
      <th class="listen-h">Listen</th>
      <th class="say-h">Say</th>
    </tr></thead>
    <tbody>`;

  step.rows.forEach((row, idx) => {
    const safePhoneme = row.phonemeAudio.replace(/'/g, "\\'");
    html += `
      <tr>
        <td><span class="word-text">${renderDisplay(row.phonemes)}</span></td>
        <td style="text-align:center;">
          <button class="icon-btn-round" onclick="playAudioFile('${safePhoneme}')">
            ${SVG.audio(24, "#378ADD")}
          </button>
        </td>
        <td style="text-align:center;"><div class="blend-say-cell">${SVG.bubble()}</div></td>
      </tr>
      <tr>
        <td><span class="word-text">${renderDisplay(row.display || row.word)}</span></td>
        <td style="text-align:center;">
          <button class="icon-btn-round" onclick="playAudioFile('${row.audio}')">
            ${SVG.audio(24, "#378ADD")}
          </button>
        </td>
        <td style="text-align:center;"><div class="blend-say-cell">${SVG.bubble()}</div></td>
      </tr>
      ${idx < step.rows.length - 1 ? `<tr><td colspan="3" style="padding:66px 0;"></td></tr>` : ""}`;
  });

  html += `</tbody></table>${navRow(false)}</div>`;
  c.innerHTML = html;
}

/* ── Activity 3: Spell ──────────────────────────────────────── */
function renderSpell(c, step) {
  let html = `<div class="card"><h2 style="margin-bottom:1rem;color:#1a1a1a;">Spell</h2><div class="spell-container">`;

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

  const isFirst = currentStepIdx === 0;
 html += `</div>
    <div class="nav-row" style="margin-top:0.75rem;">
      <button class="icon-only-btn" onclick="goBack()" ${isFirst ? "disabled" : ""}>${SVG.arrowLeft()}</button>
      <button class="btn" style="padding:10px 14px;" onclick="advanceStep()">${SVG.arrowRight()}</button>
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
    }

    inp.addEventListener("blur", checkSpelling);
    inp.addEventListener("keydown", e => { if (e.key === "Enter") inp.blur(); });
  });
}

/* ── Activity 4: Match (drag & drop) ───────────────────────── */
function renderMatch(c, step) {
  const items   = step.items;
  const isFirst = currentStepIdx === 0;

  dndState    = {};
  items.forEach(it => { dndState[it.word] = null; });
  dndDragging = null;

c.innerHTML = `<div class="card">
    <h2 style="margin-bottom:1rem;color:#1a1a1a;">Match</h2>
    <div class="dnd-grid">
      <div class="dnd-drag-col" id="drag-col"></div>
      <div class="dnd-drop-col" id="drop-col"></div>
    </div>
    <div class="nav-row" style="margin-top:1rem;">
      <button class="icon-only-btn" onclick="goBack()" ${isFirst ? "disabled" : ""}>${SVG.arrowLeft()}</button>
      <button class="btn" style="padding:10px 14px;" onclick="advanceStep()">${SVG.arrowRight()}</button>    </div>
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
    });

    dropCol.appendChild(el);
  });
}

/* ═══════════════════════════════════════════════════════════════
   SET 8 — NEW ACTIVITY TYPES
   Add these functions to app.js, before the Fireworks section.
   Also update the activity router map (shown at bottom of this file).
   ═══════════════════════════════════════════════════════════════ */

/* ── Activity 5: Alphabet Names ─────────────────────────────── */
function renderAlphabetNames(c, step) {
  const VOWELS = ["A","E","I","O","U"];
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function row(letters, highlightVowels) {
    return letters.map(l => {
      const isVowel = VOWELS.includes(l.toUpperCase());
      const active  = highlightVowels ? isVowel : !isVowel;
      return `<span style="
        font-size:26px;
        font-weight:${active ? "700" : "400"};
        color:${active ? "#1a1a1a" : "#bbb"};
        margin:0 3px;
        font-family:'Patrick Hand',cursive;
      ">${l}</span>`;
    }).join("");
  }

  const safeAudio1 = step.audio1.replace(/'/g, "\\'");
  const safeAudio2 = step.audio2.replace(/'/g, "\\'");
  const safeAudio3 = step.audio3.replace(/'/g, "\\'");

  c.innerHTML = `<div class="card">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.2rem;">
      <h2 style="color:#1a1a1a;margin:0;">The Alphabet</h2>
      <button class="icon-btn-round" onclick="playAudioFile('${safeAudio1}')">${SVG.audio(24,"#378ADD")}</button>
    </div>

    <div style="margin-bottom:1.2rem;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;">
        <p style="font-size:18px;margin:0;color:#1a1a1a;">
          Vowels (V) — <strong>names</strong>
        </p>
        <button class="icon-btn-round" onclick="playAudioFile('${safeAudio2}')">${SVG.audio(24,"#378ADD")}</button>
      </div>
      <div style="line-height:2;flex-wrap:wrap;">
        ${row(LETTERS, true)}
      </div>
    </div>

    <div style="margin-bottom:1.2rem;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;">
        <p style="font-size:18px;margin:0;color:#1a1a1a;">
          Consonants (C) — <strong>names</strong>
        </p>
        <button class="icon-btn-round" onclick="playAudioFile('${safeAudio3}')">${SVG.audio(24,"#378ADD")}</button>
      </div>
      <div style="line-height:2;flex-wrap:wrap;">
        ${row(LETTERS, false)}
      </div>
    </div>

    ${navRow(false)}
  </div>`;
}

/* ── Activity 6: Alphabet Sounds ────────────────────────────── */
function renderAlphabetSounds(c, step) {
  const VOWELS  = ["a","e","i","o","u"];
  const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

  function row(letters, highlightVowels) {
    return letters.map(l => {
      const isVowel = VOWELS.includes(l);
      const active  = highlightVowels ? isVowel : !isVowel;
      return `<span style="
        font-size:26px;
        font-weight:${active ? "700" : "400"};
        color:${active ? "#1a1a1a" : "#bbb"};
        margin:0 3px;
        font-family:'Patrick Hand',cursive;
      ">${l}</span>`;
    }).join("");
  }

  const safeAudio1 = step.audio1.replace(/'/g, "\\'");
  const safeAudio2 = step.audio2.replace(/'/g, "\\'");

  c.innerHTML = `<div class="card">
    <h2 style="color:#1a1a1a;margin-bottom:1.2rem;">The Alphabet</h2>

    <div style="margin-bottom:1.2rem;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;">
        <p style="font-size:18px;margin:0;color:#1a1a1a;">
          Vowels (V) — <strong>sounds</strong>
        </p>
        <button class="icon-btn-round" onclick="playAudioFile('${safeAudio1}')">${SVG.audio(24,"#378ADD")}</button>
      </div>
      <div style="line-height:2;flex-wrap:wrap;">
        ${row(LETTERS, true)}
      </div>
    </div>

    <div style="margin-bottom:1.2rem;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;">
        <p style="font-size:18px;margin:0;color:#1a1a1a;">
          Consonants (C) — <strong>sounds</strong>
        </p>
        <button class="icon-btn-round" onclick="playAudioFile('${safeAudio2}')">${SVG.audio(24,"#378ADD")}</button>
      </div>
      <div style="line-height:2;flex-wrap:wrap;">
        ${row(LETTERS, false)}
      </div>
    </div>

    ${navRow(false)}
  </div>`;
}

/* ── Activity 7: Patterns (CVC vs CVCe) ─────────────────────── */
function renderPatterns(c, step) {
  const safeAudio1 = step.audio1.replace(/'/g, "\\'");
  const safeAudio2 = step.audio2.replace(/'/g, "\\'");

function letterDiagram(letters) {
    return `<div style="display:inline-flex;align-items:flex-end;gap:0;margin:0.5rem 0;">
      ${letters.map(l => `
        <div style="display:flex;flex-direction:column;align-items:center;margin:0 4px;">
          <span style="font-size:11px;color:#666;font-family:'Patrick Hand',cursive;white-space:nowrap;margin-bottom:4px;border-bottom:1.5px solid #aaa;padding-bottom:2px;">${l.label}</span>
          <span style="font-size:32px;font-weight:600;font-family:'Patrick Hand',cursive;color:${l.color || "#1a1a1a"};">${l.char}</span>
        </div>`).join("")}
    </div>`;
  }

  const tapDiagram = letterDiagram([
    { char: "t", label: "consonant",  color: "#1a1a1a" },
    { char: "a", label: "vowel sound",color: "#1a1a1a" },
    { char: "p", label: "consonant",  color: "#1a1a1a" },
  ]);

  const tapeDiagram = letterDiagram([
    { char: "t", label: "consonant",  color: "#1a1a1a" },
    { char: "a", label: "vowel name", color: "#1D9E75" },
    { char: "p", label: "consonant",  color: "#1a1a1a" },
    { char: "e", label: "silent E",   color: "#D85A30" },
  ]);

  c.innerHTML = `<div class="card">
    <h2 style="color:#1a1a1a;margin-bottom:1.5rem;">Reading Patterns</h2>

    <div style="background:#f5f5f5;border-radius:8px;padding:0.5rem 1rem;display:inline-block;margin-bottom:0.75rem;">
      <span style="font-size:16px;font-family:'Patrick Hand',cursive;font-weight:600;color:#185FA5;">C – V – C</span>
    </div>

    <div style="display:flex;align-items:center;gap:16px;margin-bottom:2.5rem;flex-wrap:wrap;">
      ${tapDiagram}
      <button class="icon-btn-round" onclick="playAudioFile('${safeAudio1}')">${SVG.audio(26,"#378ADD")}</button>
    </div>

    <div style="background:#f5f5f5;border-radius:8px;padding:0.5rem 1rem;display:inline-block;margin-bottom:0.75rem;">
      <span style="font-size:16px;font-family:'Patrick Hand',cursive;font-weight:600;color:#185FA5;">C – V – C – silent E</span>
    </div>

    <div style="display:flex;align-items:center;gap:16px;margin-bottom:1rem;flex-wrap:wrap;">
      ${tapeDiagram}
      <button class="icon-btn-round" onclick="playAudioFile('${safeAudio2}')">${SVG.audio(26,"#378ADD")}</button>
    </div>

    ${navRow(false)}
  </div>`;
}

/* ── Activity 8: Say (paired CVC/CVCe format) ───────────────── */
function renderSayPaired(c, step) {
  let html = `<div class="card">
  <h2 style="margin-bottom:1rem;color:#1a1a1a;">Say</h2>
  <table class="blend-table" style="width:90%;margin:0 auto;">
    <colgroup>
      <col style="width:60%"/>
      <col style="width:20%"/>
      <col style="width:20%"/>
    </colgroup>
    <thead><tr>
      <th></th>
      <th class="listen-h">Listen</th>
      <th class="say-h">Say</th>
    </tr></thead>
    <tbody>`;

  step.rows.forEach((row, idx) => {
    const safeAudio = row.audio.replace(/'/g, "\\'");
    // Each row is a single word/phoneme line
    html += `
      <tr>
        <td><span class="word-text">${renderDisplay(row.display || row.word)}</span></td>
        <td style="text-align:center;">
          <button class="icon-btn-round" onclick="playAudioFile('${safeAudio}')">
            ${SVG.audio(24,"#378ADD")}
          </button>
        </td>
        <td style="text-align:center;"><div class="blend-say-cell">${SVG.bubble()}</div></td>
      </tr>`;

    // After every even-indexed row (0,2,4...) add the 66px gap UNLESS it's the last pair
    const isEvenRow   = idx % 2 === 1; // after the second of each pair
    const isLastRow   = idx === step.rows.length - 1;
    if (isEvenRow && !isLastRow) {
      html += `<tr><td colspan="3" style="padding:33px 0;"></td></tr>`;
    }
  });

  html += `</tbody></table>${navRow(false)}</div>`;
  c.innerHTML = html;
}



/* ── Fireworks ──────────────────────────────────────────────── */
function launchFireworks(setLabel, nextLabel) {
  const overlay = document.getElementById("fw-overlay");
  const msg     = document.getElementById("fw-message");
  const canvas  = document.getElementById("fw-canvas");
  const ctx     = canvas.getContext("2d");

  document.getElementById("fw-title").textContent    = setLabel + " ✓";
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
  const currentIdx = CURRICULUM.findIndex(c => c.id === currentSet.id);
  const nextSet = CURRICULUM.find((c, i) => i > currentIdx && c.steps.length > 0 && !isSetComplete(c));
  if (nextSet) openSet(nextSet.id, 0);
  else goHome();
}

/* ── Boot ───────────────────────────────────────────────────── */
showLoginScreen();
