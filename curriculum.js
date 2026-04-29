/**
 * curriculum.js
 *
 * Grapheme highlighting notation in `display` field:
 *   Plain text         → no highlight
 *   <u>xx</u>         → underline (two-letter graphemes: ck, ee, sh, th etc.)
 *   <g>x</g>          → green (split digraph vowel: a_e, i_e etc.)
 *   <r>x</r>          → red (silent e in split digraph)
 *
 * Audio files: public/audio/<name>.mp3
 * Image files: public/images/<name>.png
 * Sets 2-10 use placeholder emoji/TTS until real files are added.
 */

const CURRICULUM = [

  /* ═══════════════════════════════════════════════════════════
     SET 1 — s, a, t, p, i, n
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set1",
    homeLabel: "Set 1",
    homeSounds: "s · a · t · p · i · n",
    steps: [
      {
        type: "listen", label: "satpin",
        sounds: [
          { letter: "s", display: "s", audio: "audio/s.mp3" },
          { letter: "a", display: "a", audio: "audio/a.mp3" },
          { letter: "t", display: "t", audio: "audio/t.mp3" },
          { letter: "p", display: "p", audio: "audio/p.mp3" },
          { letter: "i", display: "i", audio: "audio/i.mp3" },
          { letter: "n", display: "n", audio: "audio/n.mp3" },
        ],
      },
      /* 1.1 group at */
      { type: "say",   label: "1", group: "at", rows: [
        { phonemes: "a · t",     display: "at",  word: "at",  audio: "audio/at.mp3",  phonemeAudio: "audio/a...t.mp3" },
        { phonemes: "s · a · t", display: "sat", word: "sat", audio: "audio/sat.mp3", phonemeAudio: "audio/s...a...t.mp3" },
        { phonemes: "p · a · t", display: "pat", word: "pat", audio: "audio/pat.mp3", phonemeAudio: "audio/p...a...t.mp3" },
      ]},
      { type: "spell", label: "1", group: "at", words: [
        { word: "at",  display: "at",  image: "images/at.jpg",      audio: "audio/at spelling.mp3",  emoji: "🎯" },
        { word: "sat", display: "sat", image: "images/sit.png", audio: "audio/sat spelling.mp3", emoji: "🪑" },
        { word: "pat", display: "pat", image: "images/pat.png",     audio: "audio/pat spelling.mp3", emoji: "🐾" },
      ]},
      { type: "match", label: "1", group: "at", items: [
        { word: "at",  display: "at",  image: "images/at.jpg",      emoji: "🎯" },
        { word: "sat", display: "sat", image: "images/sit.png", emoji: "🪑" },
        { word: "pat", display: "pat", image: "images/pat.png",     emoji: "🐾" },
      ]},
      /* 1.1 group in */
      { type: "say",   label: "2", group: "in", rows: [
        { phonemes: "i · n",     display: "in",  word: "in",  audio: "audio/in.mp3",  phonemeAudio: "audio/i...n.mp3" },
        { phonemes: "t · i · n", display: "tin", word: "tin", audio: "audio/tin.mp3", phonemeAudio: "audio/t...i...n.mp3" },
        { phonemes: "p · i · n", display: "pin", word: "pin", audio: "audio/pin.mp3", phonemeAudio: "audio/p...i...n.mp3" },
      ]},
      { type: "spell", label: "2", group: "in", words: [
        { word: "in",  display: "in",  image: "images/in.png",  audio: "audio/in spelling.mp3",  emoji: "📥" },
        { word: "tin", display: "tin", image: "images/tin.png", audio: "audio/tin spelling.mp3", emoji: "🥫" },
        { word: "pin", display: "pin", image: "images/pin.png", audio: "audio/pin spelling.mp3", emoji: "📌" },
      ]},
      { type: "match", label: "2", group: "in", items: [
        { word: "in",  display: "in",  image: "images/in.png",  emoji: "📥" },
        { word: "tin", display: "tin", image: "images/tin.png", emoji: "🥫" },
        { word: "pin", display: "pin", image: "images/pin.png", emoji: "📌" },
      ]},
      /* 1.1 group an */
      { type: "say",   label: "3", group: "an", rows: [
        { phonemes: "n · a · p", display: "nap", word: "nap", audio: "audio/nap.mp3", phonemeAudio: "audio/n...a...p.mp3" },
        { phonemes: "t · a · p", display: "tap", word: "tap", audio: "audio/tap.mp3", phonemeAudio: "audio/t...a...p.mp3" },
        { phonemes: "p · a · n", display: "pan", word: "pan", audio: "audio/pan.mp3", phonemeAudio: "audio/p...a...n.mp3" },
        { phonemes: "t · a · n", display: "tan", word: "tan", audio: "audio/tan.mp3", phonemeAudio: "audio/t...a...n.mp3" },
      ]},
      { type: "spell", label: "3", group: "an", words: [
        { word: "nap", display: "nap", image: "images/nap.png", audio: "audio/nap spelling.mp3",    emoji: "😴" },
        { word: "tap", display: "tap", image: "images/tap.png", audio: "audio/tap spelling.mp3",    emoji: "🚰" },
        { word: "pan", display: "pan", image: "images/pan.png", audio: "audio/pan spelling.mp3",    emoji: "🍳" },
        { word: "tan", display: "tan", image: "images/tan.png", audio: "audio/tan v2 spelling.mp3", emoji: "🏖️" },
      ]},
      { type: "match", label: "3", group: "an", items: [
        { word: "nap", display: "nap", image: "images/nap.png", emoji: "😴" },
        { word: "tap", display: "tap", image: "images/tap.png", emoji: "🚰" },
        { word: "pan", display: "pan", image: "images/pan.png", emoji: "🍳" },
        { word: "tan", display: "tan", image: "images/tan.png", emoji: "🏖️" },
      ]},
      /* 1.2 group it */
      { type: "say",   label: "4", group: "it", rows: [
        { phonemes: "s · i · t",     display: "sit",  word: "sit",  audio: "audio/sit.mp3",  phonemeAudio: "audio/s...i...t.mp3" },
        { phonemes: "p · i · t",     display: "pit",  word: "pit",  audio: "audio/pit.mp3",  phonemeAudio: "audio/p...i...t.mp3" },
        { phonemes: "n · i · t · s", display: "nits", word: "nits", audio: "audio/nits.mp3", phonemeAudio: "audio/n...i...t...s.mp3" },
      ]},
      { type: "spell", label: "4", group: "it", words: [
        { word: "sit",  display: "sit",  image: "images/sit.png",  audio: "audio/sit.mp3",  emoji: "🪑" },
        { word: "pit",  display: "pit",  image: "images/pit.jpg",  audio: "audio/pit.mp3",  emoji: "🕳️" },
        { word: "nits", display: "nits", image: "images/nits.jpg", audio: "audio/nits.mp3", emoji: "🔍" },
      ]},
      { type: "match", label: "4", group: "it", items: [
        { word: "sit",  display: "sit",  image: "images/sit.png",  emoji: "🪑" },
        { word: "pit",  display: "pit",  image: "images/pit.jpg",  emoji: "🕳️" },
        { word: "nits", display: "nits", image: "images/nits.jpg", emoji: "🔍" },
      ]},
      /* 1.2 group ip */
      { type: "say",   label: "5", group: "ip", rows: [
        { phonemes: "t · i · p", display: "tip", word: "tip", audio: "audio/tip.mp3", phonemeAudio: "audio/t...i...p.mp3" },
        { phonemes: "p · i · p", display: "pip", word: "pip", audio: "audio/pip.mp3", phonemeAudio: "audio/p...i...p.mp3" },
        { phonemes: "n · i · p", display: "nip", word: "nip", audio: "audio/nip.mp3", phonemeAudio: "audio/n...i...p.mp3" },
        { phonemes: "s · i · p", display: "sip", word: "sip", audio: "audio/sip.mp3", phonemeAudio: "audio/s...i...p.mp3" },
      ]},
      { type: "spell", label: "5", group: "ip", words: [
        { word: "tip", display: "tip", image: "images/tip.png", audio: "audio/tip.mp3", emoji: "💡" },
        { word: "pip", display: "pip", image: "images/pip.png", audio: "audio/pip.mp3", emoji: "🍎" },
        { word: "nip", display: "nip", image: "images/nip.png", audio: "audio/nip.mp3", emoji: "🤏" },
        { word: "sip", display: "sip", image: "images/sip.jpg", audio: "audio/sip.mp3", emoji: "🥤" },
      ]},
      { type: "match", label: "5", group: "ip", items: [
        { word: "tip", display: "tip", image: "images/tip.png", emoji: "💡" },
        { word: "pip", display: "pip", image: "images/pip.png", emoji: "🍎" },
        { word: "nip", display: "nip", image: "images/nip.png", emoji: "🤏" },
        { word: "sip", display: "sip", image: "images/sip.jpg", emoji: "🥤" },
      ]},
      /* 1.2 group ant */
      { type: "say",   label: "6", group: "ant", rows: [
        { phonemes: "a · n · t",         display: "ant",   word: "ant",   audio: "audio/ant.mp3",   phonemeAudio: "audio/a...n...t.mp3" },
        { phonemes: "p · a · n · t · s", display: "pants", word: "pants", audio: "audio/pants.mp3", phonemeAudio: "audio/p...a...n...t...s.mp3" },
        { phonemes: "s · n · a · p",     display: "snap",  word: "snap",  audio: "audio/snap.mp3",  phonemeAudio: "audio/s...n...a...p.mp3" },
      ]},
      { type: "spell", label: "6", group: "ant", words: [
        { word: "ant",   display: "ant",   image: "images/ant.png",   audio: "audio/ant.mp3",   emoji: "🐜" },
        { word: "pants", display: "pants", image: "images/pants.jpg", audio: "audio/pants.mp3", emoji: "👖" },
        { word: "snap",  display: "snap",  image: "images/snap.jpg",  audio: "audio/snap.mp3",  emoji: "📸" },
      ]},
      { type: "match", label: "6", group: "ant", items: [
        { word: "ant",   display: "ant",   image: "images/ant.png",   emoji: "🐜" },
        { word: "pants", display: "pants", image: "images/pants.jpg", emoji: "👖" },
        { word: "snap",  display: "snap",  image: "images/snap.jpg",  emoji: "📸" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 2 — ck/c/k, e, h, r, m, d
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set2",
    homeLabel: "Set 2",
    homeSounds: "<u>ck</u> · e · h · r · m · d",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "ck", display: "<u>ck</u>", audio: "audio/ck.mp3" },
          { letter: "e",  display: "e",          audio: "audio/e.mp3" },
          { letter: "h",  display: "h",          audio: "audio/h.mp3" },
          { letter: "r",  display: "r",          audio: "audio/r.mp3" },
          { letter: "m",  display: "m",          audio: "audio/m.mp3" },
          { letter: "d",  display: "d",          audio: "audio/d.mp3" },
        ],
      },
      /* 2.1 group hat */
      { type: "say",   label: "1", group: "hat", rows: [
        { phonemes: "h · a · t", display: "hat", word: "hat", audio: "audio/hat.mp3", phonemeAudio: "audio/hat.mp3" },
        { phonemes: "m · a · t", display: "mat", word: "mat", audio: "audio/mat.mp3", phonemeAudio: "audio/mat.mp3" },
        { phonemes: "c · a · t", display: "cat", word: "cat", audio: "audio/cat.mp3", phonemeAudio: "audio/cat.mp3" },
      ]},
      { type: "spell", label: "1", group: "hat", words: [
        { word: "hat", display: "hat", image: "images/hat.png", audio: "audio/hat.mp3", emoji: "🎩" },
        { word: "mat", display: "mat", image: "images/mat.png", audio: "audio/mat.mp3", emoji: "🟫" },
        { word: "cat", display: "cat", image: "images/cat.png", audio: "audio/cat.mp3", emoji: "🐱" },
      ]},
      { type: "match", label: "1", group: "hat", items: [
        { word: "hat", display: "hat", image: "images/hat.png", emoji: "🎩" },
        { word: "mat", display: "mat", image: "images/mat.png", emoji: "🟫" },
        { word: "cat", display: "cat", image: "images/cat.png", emoji: "🐱" },
      ]},
      /* 2.1 group pen */
      { type: "say",   label: "2", group: "pen", rows: [
        { phonemes: "p · e · n", display: "pen", word: "pen", audio: "audio/pen.mp3", phonemeAudio: "audio/pen.mp3" },
        { phonemes: "h · e · n", display: "hen", word: "hen", audio: "audio/hen.mp3", phonemeAudio: "audio/hen.mp3" },
        { phonemes: "t · e · n", display: "ten", word: "ten", audio: "audio/ten.mp3", phonemeAudio: "audio/ten.mp3" },
        { phonemes: "r · e · d", display: "red", word: "red", audio: "audio/red.mp3", phonemeAudio: "audio/red.mp3" },
      ]},
      { type: "spell", label: "2", group: "pen", words: [
        { word: "pen", display: "pen", image: "images/pen.png", audio: "audio/pen.mp3", emoji: "🖊️" },
        { word: "hen", display: "hen", image: "images/hen.png", audio: "audio/hen.mp3", emoji: "🐔" },
        { word: "ten", display: "ten", image: "images/ten.png", audio: "audio/ten.mp3", emoji: "🔟" },
        { word: "red", display: "red", image: "images/red.png", audio: "audio/red.mp3", emoji: "🔴" },
      ]},
      { type: "match", label: "2", group: "pen", items: [
        { word: "pen", display: "pen", image: "images/pen.png", emoji: "🖊️" },
        { word: "hen", display: "hen", image: "images/hen.png", emoji: "🐔" },
        { word: "ten", display: "ten", image: "images/ten.png", emoji: "🔟" },
        { word: "red", display: "red", image: "images/red.png", emoji: "🔴" },
      ]},
      /* 2.1 group tent */
      { type: "say",   label: "3", group: "tent", rows: [
        { phonemes: "t · e · n · t",   display: "tent",            word: "tent", audio: "audio/tent.mp3", phonemeAudio: "audio/tent.mp3" },
        { phonemes: "d · e · s · k",   display: "desk",            word: "desk", audio: "audio/desk.mp3", phonemeAudio: "audio/desk.mp3" },
        { phonemes: "h · a · n · d",   display: "hand",            word: "hand", audio: "audio/hand.mp3", phonemeAudio: "audio/hand.mp3" },
        { phonemes: "n · e · ck",      display: "ne<u>ck</u>",     word: "neck", audio: "audio/neck.mp3", phonemeAudio: "audio/neck.mp3" },
      ]},
      { type: "spell", label: "3", group: "tent", words: [
        { word: "tent", display: "tent",        image: "images/tent.png", audio: "audio/tent.mp3", emoji: "⛺" },
        { word: "desk", display: "desk",        image: "images/desk.png", audio: "audio/desk.mp3", emoji: "🪑" },
        { word: "hand", display: "hand",        image: "images/hand.png", audio: "audio/hand.mp3", emoji: "✋" },
        { word: "neck", display: "ne<u>ck</u>", image: "images/neck.png", audio: "audio/neck.mp3", emoji: "👔" },
      ]},
      { type: "match", label: "3", group: "tent", items: [
        { word: "tent", display: "tent",        image: "images/tent.png", emoji: "⛺" },
        { word: "desk", display: "desk",        image: "images/desk.png", emoji: "🪑" },
        { word: "hand", display: "hand",        image: "images/hand.png", emoji: "✋" },
        { word: "neck", display: "ne<u>ck</u>", image: "images/neck.png", emoji: "👔" },
      ]},
      /* 2.2 group hip */
      { type: "say",   label: "4", group: "hip", rows: [
        { phonemes: "h · i · p", display: "hip", word: "hip", audio: "audio/hip.mp3", phonemeAudio: "audio/hip.mp3" },
        { phonemes: "r · i · p", display: "rip", word: "rip", audio: "audio/rip.mp3", phonemeAudio: "audio/rip.mp3" },
        { phonemes: "n · e · t", display: "net", word: "net", audio: "audio/net.mp3", phonemeAudio: "audio/net.mp3" },
      ]},
      { type: "spell", label: "4", group: "hip", words: [
        { word: "hip", display: "hip", image: "images/hip.png", audio: "audio/hip.mp3", emoji: "🦴" },
        { word: "rip", display: "rip", image: "images/rip.png", audio: "audio/rip.mp3", emoji: "😬" },
        { word: "net", display: "net", image: "images/net.png", audio: "audio/net.mp3", emoji: "🥅" },
      ]},
      { type: "match", label: "4", group: "hip", items: [
        { word: "hip", display: "hip", image: "images/hip.png", emoji: "🦴" },
        { word: "rip", display: "rip", image: "images/rip.png", emoji: "😬" },
        { word: "net", display: "net", image: "images/net.png", emoji: "🥅" },
      ]},
      /* 2.2 group sad */
      { type: "say",   label: "5", group: "sad", rows: [
        { phonemes: "s · a · d", display: "sad", word: "sad", audio: "audio/sad.mp3", phonemeAudio: "audio/sad.mp3" },
        { phonemes: "m · a · n", display: "man", word: "man", audio: "audio/man.mp3", phonemeAudio: "audio/man.mp3" },
        { phonemes: "m · a · d", display: "mad", word: "mad", audio: "audio/mad.mp3", phonemeAudio: "audio/mad.mp3" },
      ]},
      { type: "spell", label: "5", group: "sad", words: [
        { word: "sad", display: "sad", image: "images/sad.png", audio: "audio/sad.mp3", emoji: "😢" },
        { word: "man", display: "man", image: "images/man.png", audio: "audio/man.mp3", emoji: "👨" },
        { word: "mad", display: "mad", image: "images/mad.png", audio: "audio/mad.mp3", emoji: "😡" },
      ]},
      { type: "match", label: "5", group: "sad", items: [
        { word: "sad", display: "sad", image: "images/sad.png", emoji: "😢" },
        { word: "man", display: "man", image: "images/man.png", emoji: "👨" },
        { word: "mad", display: "mad", image: "images/mad.png", emoji: "😡" },
      ]},
      /* 2.2 group sick */
      { type: "say",   label: "6", group: "sick", rows: [
        { phonemes: "s · i · ck",   display: "si<u>ck</u>",   word: "sick",  audio: "audio/sick.mp3",  phonemeAudio: "audio/sick.mp3" },
        { phonemes: "k · i · ck",   display: "ki<u>ck</u>",   word: "kick",  audio: "audio/kick.mp3",  phonemeAudio: "audio/kick.mp3" },
        { phonemes: "s · t · i · ck", display: "sti<u>ck</u>", word: "stick", audio: "audio/stick.mp3", phonemeAudio: "audio/stick.mp3" },
        { phonemes: "s · n · a · ck", display: "sna<u>ck</u>", word: "snack", audio: "audio/snack.mp3", phonemeAudio: "audio/snack.mp3" },
      ]},
      { type: "spell", label: "6", group: "sick", words: [
        { word: "sick",  display: "si<u>ck</u>",   image: "images/sick.png",  audio: "audio/sick.mp3",  emoji: "🤒" },
        { word: "kick",  display: "ki<u>ck</u>",   image: "images/kick.png",  audio: "audio/kick.mp3",  emoji: "🦵" },
        { word: "stick", display: "sti<u>ck</u>",  image: "images/stick.png", audio: "audio/stick.mp3", emoji: "🪵" },
        { word: "snack", display: "sna<u>ck</u>",  image: "images/snack.png", audio: "audio/snack.mp3", emoji: "🍎" },
      ]},
      { type: "match", label: "6", group: "sick", items: [
        { word: "sick",  display: "si<u>ck</u>",  image: "images/sick.png",  emoji: "🤒" },
        { word: "kick",  display: "ki<u>ck</u>",  image: "images/kick.png",  emoji: "🦵" },
        { word: "stick", display: "sti<u>ck</u>", image: "images/stick.png", emoji: "🪵" },
        { word: "snack", display: "sna<u>ck</u>", image: "images/snack.png", emoji: "🍎" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 3 — g, o, u, l, f, b
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set3",
    homeLabel: "Set 3",
    homeSounds: "g · o · u · l · f · b",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "g", display: "g", audio: "audio/g.mp3" },
          { letter: "o", display: "o", audio: "audio/o.mp3" },
          { letter: "u", display: "u", audio: "audio/u.mp3" },
          { letter: "l", display: "l", audio: "audio/l.mp3" },
          { letter: "f", display: "f", audio: "audio/f.mp3" },
          { letter: "b", display: "b", audio: "audio/b.mp3" },
        ],
      },
      /* 3.1 group fit */
      { type: "say",   label: "1", group: "fit", rows: [
        { phonemes: "f · i · t", display: "fit", word: "fit", audio: "audio/fit.mp3", phonemeAudio: "audio/fit.mp3" },
        { phonemes: "g · a · p", display: "gap", word: "gap", audio: "audio/gap.mp3", phonemeAudio: "audio/gap.mp3" },
        { phonemes: "b · i · t", display: "bit", word: "bit", audio: "audio/bit.mp3", phonemeAudio: "audio/bit.mp3" },
      ]},
      { type: "spell", label: "1", group: "fit", words: [
        { word: "fit", display: "fit", image: "images/fit.png", audio: "audio/fit.mp3", emoji: "💪" },
        { word: "gap", display: "gap", image: "images/gap.png", audio: "audio/gap.mp3", emoji: "↔️" },
        { word: "bit", display: "bit", image: "images/bit.png", audio: "audio/bit.mp3", emoji: "🔩" },
      ]},
      { type: "match", label: "1", group: "fit", items: [
        { word: "fit", display: "fit", image: "images/fit.png", emoji: "💪" },
        { word: "gap", display: "gap", image: "images/gap.png", emoji: "↔️" },
        { word: "bit", display: "bit", image: "images/bit.png", emoji: "🔩" },
      ]},
      /* 3.1 group bun */
      { type: "say",   label: "2", group: "bun", rows: [
        { phonemes: "b · u · n", display: "bun", word: "bun", audio: "audio/bun.mp3", phonemeAudio: "audio/bun.mp3" },
        { phonemes: "g · u · m", display: "gum", word: "gum", audio: "audio/gum.mp3", phonemeAudio: "audio/gum.mp3" },
        { phonemes: "f · o · g", display: "fog", word: "fog", audio: "audio/fog.mp3", phonemeAudio: "audio/fog.mp3" },
        { phonemes: "b · u · m", display: "bum", word: "bum", audio: "audio/bum.mp3", phonemeAudio: "audio/bum.mp3" },
      ]},
      { type: "spell", label: "2", group: "bun", words: [
        { word: "bun", display: "bun", image: "images/bun.png", audio: "audio/bun.mp3", emoji: "🍞" },
        { word: "gum", display: "gum", image: "images/gum.png", audio: "audio/gum.mp3", emoji: "🫧" },
        { word: "fog", display: "fog", image: "images/fog.png", audio: "audio/fog.mp3", emoji: "🌫️" },
        { word: "bum", display: "bum", image: "images/bum.png", audio: "audio/bum.mp3", emoji: "🍑" },
      ]},
      { type: "match", label: "2", group: "bun", items: [
        { word: "bun", display: "bun", image: "images/bun.png", emoji: "🍞" },
        { word: "gum", display: "gum", image: "images/gum.png", emoji: "🫧" },
        { word: "fog", display: "fog", image: "images/fog.png", emoji: "🌫️" },
        { word: "bum", display: "bum", image: "images/bum.png", emoji: "🍑" },
      ]},
      /* 3.1 group bug */
      { type: "say",   label: "3", group: "bug", rows: [
        { phonemes: "b · u · g",     display: "bug",  word: "bug",  audio: "audio/bug.mp3",  phonemeAudio: "audio/bug.mp3" },
        { phonemes: "f · r · o · g", display: "frog", word: "frog", audio: "audio/frog.mp3", phonemeAudio: "audio/frog.mp3" },
        { phonemes: "f · l · a · g", display: "flag", word: "flag", audio: "audio/flag.mp3", phonemeAudio: "audio/flag.mp3" },
      ]},
      { type: "spell", label: "3", group: "bug", words: [
        { word: "bug",  display: "bug",  image: "images/bug.png",  audio: "audio/bug.mp3",  emoji: "🐛" },
        { word: "frog", display: "frog", image: "images/frog.png", audio: "audio/frog.mp3", emoji: "🐸" },
        { word: "flag", display: "flag", image: "images/flag.png", audio: "audio/flag.mp3", emoji: "🚩" },
      ]},
      { type: "match", label: "3", group: "bug", items: [
        { word: "bug",  display: "bug",  image: "images/bug.png",  emoji: "🐛" },
        { word: "frog", display: "frog", image: "images/frog.png", emoji: "🐸" },
        { word: "flag", display: "flag", image: "images/flag.png", emoji: "🚩" },
      ]},
      /* 3.2 group dog */
      { type: "say",   label: "4", group: "dog", rows: [
        { phonemes: "d · o · g", display: "dog", word: "dog", audio: "audio/dog.mp3", phonemeAudio: "audio/dog.mp3" },
        { phonemes: "f · u · n", display: "fun", word: "fun", audio: "audio/fun.mp3", phonemeAudio: "audio/fun.mp3" },
        { phonemes: "g · u · t", display: "gut", word: "gut", audio: "audio/gut.mp3", phonemeAudio: "audio/gut.mp3" },
      ]},
      { type: "spell", label: "4", group: "dog", words: [
        { word: "dog", display: "dog", image: "images/dog.png", audio: "audio/dog.mp3", emoji: "🐶" },
        { word: "fun", display: "fun", image: "images/fun.png", audio: "audio/fun.mp3", emoji: "🎉" },
        { word: "gut", display: "gut", image: "images/gut.png", audio: "audio/gut.mp3", emoji: "🫃" },
      ]},
      { type: "match", label: "4", group: "dog", items: [
        { word: "dog", display: "dog", image: "images/dog.png", emoji: "🐶" },
        { word: "fun", display: "fun", image: "images/fun.png", emoji: "🎉" },
        { word: "gut", display: "gut", image: "images/gut.png", emoji: "🫃" },
      ]},
      /* 3.2 group leg */
      { type: "say",   label: "5", group: "leg", rows: [
        { phonemes: "l · e · g", display: "leg", word: "leg", audio: "audio/leg.mp3", phonemeAudio: "audio/leg.mp3" },
        { phonemes: "b · a · g", display: "bag", word: "bag", audio: "audio/bag.mp3", phonemeAudio: "audio/bag.mp3" },
        { phonemes: "c · u · p", display: "cup", word: "cup", audio: "audio/cup.mp3", phonemeAudio: "audio/cup.mp3" },
        { phonemes: "l · o · g", display: "log", word: "log", audio: "audio/log.mp3", phonemeAudio: "audio/log.mp3" },
      ]},
      { type: "spell", label: "5", group: "leg", words: [
        { word: "leg", display: "leg", image: "images/leg.png", audio: "audio/leg.mp3", emoji: "🦵" },
        { word: "bag", display: "bag", image: "images/bag.png", audio: "audio/bag.mp3", emoji: "👜" },
        { word: "cup", display: "cup", image: "images/cup.png", audio: "audio/cup.mp3", emoji: "☕" },
        { word: "log", display: "log", image: "images/log.png", audio: "audio/log.mp3", emoji: "🪵" },
      ]},
      { type: "match", label: "5", group: "leg", items: [
        { word: "leg", display: "leg", image: "images/leg.png", emoji: "🦵" },
        { word: "bag", display: "bag", image: "images/bag.png", emoji: "👜" },
        { word: "cup", display: "cup", image: "images/cup.png", emoji: "☕" },
        { word: "log", display: "log", image: "images/log.png", emoji: "🪵" },
      ]},
      /* 3.2 group gold */
      { type: "say",   label: "6", group: "gold", rows: [
        { phonemes: "g · o · l · d", display: "gold", word: "gold", audio: "audio/gold.mp3", phonemeAudio: "audio/gold.mp3" },
        { phonemes: "f · o · l · d", display: "fold", word: "fold", audio: "audio/fold.mp3", phonemeAudio: "audio/fold.mp3" },
        { phonemes: "g · o · l · f", display: "golf", word: "golf", audio: "audio/golf.mp3", phonemeAudio: "audio/golf.mp3" },
      ]},
      { type: "spell", label: "6", group: "gold", words: [
        { word: "gold", display: "gold", image: "images/gold.png", audio: "audio/gold.mp3", emoji: "🥇" },
        { word: "fold", display: "fold", image: "images/fold.png", audio: "audio/fold.mp3", emoji: "📄" },
        { word: "golf", display: "golf", image: "images/golf.png", audio: "audio/golf.mp3", emoji: "⛳" },
      ]},
      { type: "match", label: "6", group: "gold", items: [
        { word: "gold", display: "gold", image: "images/gold.png", emoji: "🥇" },
        { word: "fold", display: "fold", image: "images/fold.png", emoji: "📄" },
        { word: "golf", display: "golf", image: "images/golf.png", emoji: "⛳" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 4 — j, ee, ie, ai, oa, or
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set4",
    homeLabel: "Set 4",
    homeSounds: "j · <u>ee</u> · <u>ie</u> · <u>ai</u> · <u>oa</u> · <u>or</u>",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "j",  display: "j",          audio: "audio/j.mp3" },
          { letter: "ee", display: "<u>ee</u>",   audio: "audio/ee.mp3" },
          { letter: "ie", display: "<u>ie</u>",   audio: "audio/ie.mp3" },
          { letter: "ai", display: "<u>ai</u>",   audio: "audio/ai.mp3" },
          { letter: "oa", display: "<u>oa</u>",   audio: "audio/oa.mp3" },
          { letter: "or", display: "<u>or</u>",   audio: "audio/or.mp3" },
        ],
      },
      /* 4.1 group jam */
      { type: "say",   label: "1", group: "jam", rows: [
        { phonemes: "j · a · m",     display: "jam",  word: "jam",  audio: "audio/jam.mp3",  phonemeAudio: "audio/jam.mp3" },
        { phonemes: "j · e · t",     display: "jet",  word: "jet",  audio: "audio/jet.mp3",  phonemeAudio: "audio/jet.mp3" },
        { phonemes: "j · o · g",     display: "jog",  word: "jog",  audio: "audio/jog.mp3",  phonemeAudio: "audio/jog.mp3" },
        { phonemes: "j · u · m · p", display: "jump", word: "jump", audio: "audio/jump.mp3", phonemeAudio: "audio/jump.mp3" },
      ]},
      { type: "spell", label: "1", group: "jam", words: [
        { word: "jam",  display: "jam",  image: "images/jam.png",  audio: "audio/jam.mp3",  emoji: "🍓" },
        { word: "jet",  display: "jet",  image: "images/jet.png",  audio: "audio/jet.mp3",  emoji: "✈️" },
        { word: "jog",  display: "jog",  image: "images/jog.png",  audio: "audio/jog.mp3",  emoji: "🏃" },
        { word: "jump", display: "jump", image: "images/jump.png", audio: "audio/jump.mp3", emoji: "🦘" },
      ]},
      { type: "match", label: "1", group: "jam", items: [
        { word: "jam",  display: "jam",  image: "images/jam.png",  emoji: "🍓" },
        { word: "jet",  display: "jet",  image: "images/jet.png",  emoji: "✈️" },
        { word: "jog",  display: "jog",  image: "images/jog.png",  emoji: "🏃" },
        { word: "jump", display: "jump", image: "images/jump.png", emoji: "🦘" },
      ]},
      /* 4.1 group ee */
      { type: "say",   label: "2", group: "ee", rows: [
        { phonemes: "t · r · ee",         display: "tr<u>ee</u>",    word: "tree",   audio: "audio/tree.mp3",   phonemeAudio: "audio/tree.mp3" },
        { phonemes: "s · l · ee · p",     display: "sl<u>ee</u>p",   word: "sleep",  audio: "audio/sleep.mp3",  phonemeAudio: "audio/sleep.mp3" },
        { phonemes: "s · t · r · ee · t", display: "str<u>ee</u>t",  word: "street", audio: "audio/street.mp3", phonemeAudio: "audio/street.mp3" },
      ]},
      { type: "spell", label: "2", group: "ee", words: [
        { word: "tree",   display: "tr<u>ee</u>",   image: "images/tree.png",   audio: "audio/tree.mp3",   emoji: "🌳" },
        { word: "sleep",  display: "sl<u>ee</u>p",  image: "images/sleep.png",  audio: "audio/sleep.mp3",  emoji: "😴" },
        { word: "street", display: "str<u>ee</u>t", image: "images/street.png", audio: "audio/street.mp3", emoji: "🛣️" },
      ]},
      { type: "match", label: "2", group: "ee", items: [
        { word: "tree",   display: "tr<u>ee</u>",   image: "images/tree.png",   emoji: "🌳" },
        { word: "sleep",  display: "sl<u>ee</u>p",  image: "images/sleep.png",  emoji: "😴" },
        { word: "street", display: "str<u>ee</u>t", image: "images/street.png", emoji: "🛣️" },
      ]},
      /* 4.1 group ie */
      { type: "say",   label: "3", group: "ie", rows: [
        { phonemes: "p · ie",         display: "p<u>ie</u>",    word: "pie",   audio: "audio/pie.mp3",   phonemeAudio: "audio/pie.mp3" },
        { phonemes: "t · ie",         display: "t<u>ie</u>",    word: "tie",   audio: "audio/tie.mp3",   phonemeAudio: "audio/tie.mp3" },
        { phonemes: "c · r · ie · d", display: "cr<u>ie</u>d",  word: "cried", audio: "audio/cried.mp3", phonemeAudio: "audio/cried.mp3" },
      ]},
      { type: "spell", label: "3", group: "ie", words: [
        { word: "pie",   display: "p<u>ie</u>",   image: "images/pie.png",   audio: "audio/pie.mp3",   emoji: "🥧" },
        { word: "tie",   display: "t<u>ie</u>",   image: "images/tie.png",   audio: "audio/tie.mp3",   emoji: "👔" },
        { word: "cried", display: "cr<u>ie</u>d", image: "images/cried.png", audio: "audio/cried.mp3", emoji: "😢" },
      ]},
      { type: "match", label: "3", group: "ie", items: [
        { word: "pie",   display: "p<u>ie</u>",   image: "images/pie.png",   emoji: "🥧" },
        { word: "tie",   display: "t<u>ie</u>",   image: "images/tie.png",   emoji: "👔" },
        { word: "cried", display: "cr<u>ie</u>d", image: "images/cried.png", emoji: "😢" },
      ]},
      /* 4.2 group ai */
      { type: "say",   label: "4", group: "ai", rows: [
        { phonemes: "t · r · ai · n", display: "tr<u>ai</u>n",  word: "train", audio: "audio/train.mp3", phonemeAudio: "audio/train.mp3" },
        { phonemes: "h · ai · l",     display: "h<u>ai</u>l",   word: "hail",  audio: "audio/hail.mp3",  phonemeAudio: "audio/hail.mp3" },
        { phonemes: "p · ai · n · t", display: "p<u>ai</u>nt",  word: "paint", audio: "audio/paint.mp3", phonemeAudio: "audio/paint.mp3" },
      ]},
      { type: "spell", label: "4", group: "ai", words: [
        { word: "train", display: "tr<u>ai</u>n", image: "images/train.png", audio: "audio/train.mp3", emoji: "🚂" },
        { word: "hail",  display: "h<u>ai</u>l",  image: "images/hail.png",  audio: "audio/hail.mp3",  emoji: "🌨️" },
        { word: "paint", display: "p<u>ai</u>nt", image: "images/paint.png", audio: "audio/paint.mp3", emoji: "🎨" },
      ]},
      { type: "match", label: "4", group: "ai", items: [
        { word: "train", display: "tr<u>ai</u>n", image: "images/train.png", emoji: "🚂" },
        { word: "hail",  display: "h<u>ai</u>l",  image: "images/hail.png",  emoji: "🌨️" },
        { word: "paint", display: "p<u>ai</u>nt", image: "images/paint.png", emoji: "🎨" },
      ]},
      /* 4.2 group oa */
      { type: "say",   label: "5", group: "oa", rows: [
        { phonemes: "s · oa · p",     display: "s<u>oa</u>p",  word: "soap", audio: "audio/soap.mp3", phonemeAudio: "audio/soap.mp3" },
        { phonemes: "r · oa · d",     display: "r<u>oa</u>d",  word: "road", audio: "audio/road.mp3", phonemeAudio: "audio/road.mp3" },
        { phonemes: "l · oa · f",     display: "l<u>oa</u>f",  word: "loaf", audio: "audio/loaf.mp3", phonemeAudio: "audio/loaf.mp3" },
        { phonemes: "b · oa · t",     display: "b<u>oa</u>t",  word: "boat", audio: "audio/boat.mp3", phonemeAudio: "audio/boat.mp3" },
      ]},
      { type: "spell", label: "5", group: "oa", words: [
        { word: "soap", display: "s<u>oa</u>p", image: "images/soap.png", audio: "audio/soap.mp3", emoji: "🧼" },
        { word: "road", display: "r<u>oa</u>d", image: "images/road.png", audio: "audio/road.mp3", emoji: "🛣️" },
        { word: "loaf", display: "l<u>oa</u>f", image: "images/loaf.png", audio: "audio/loaf.mp3", emoji: "🍞" },
        { word: "boat", display: "b<u>oa</u>t", image: "images/boat.png", audio: "audio/boat.mp3", emoji: "⛵" },
      ]},
      { type: "match", label: "5", group: "oa", items: [
        { word: "soap", display: "s<u>oa</u>p", image: "images/soap.png", emoji: "🧼" },
        { word: "road", display: "r<u>oa</u>d", image: "images/road.png", emoji: "🛣️" },
        { word: "loaf", display: "l<u>oa</u>f", image: "images/loaf.png", emoji: "🍞" },
        { word: "boat", display: "b<u>oa</u>t", image: "images/boat.png", emoji: "⛵" },
      ]},
      /* 4.2 group or */
      { type: "say",   label: "6", group: "or", rows: [
        { phonemes: "s · p · or · t",    display: "sp<u>or</u>t",   word: "sport",  audio: "audio/sport.mp3",  phonemeAudio: "audio/sport.mp3" },
        { phonemes: "p · or · k",        display: "p<u>or</u>k",    word: "pork",   audio: "audio/pork.mp3",   phonemeAudio: "audio/pork.mp3" },
        { phonemes: "f · or · g · e · t", display: "f<u>or</u>get", word: "forget", audio: "audio/forget.mp3", phonemeAudio: "audio/forget.mp3" },
      ]},
      { type: "spell", label: "6", group: "or", words: [
        { word: "sport",  display: "sp<u>or</u>t",  image: "images/sport.png",  audio: "audio/sport.mp3",  emoji: "⚽" },
        { word: "pork",   display: "p<u>or</u>k",   image: "images/pork.png",   audio: "audio/pork.mp3",   emoji: "🥩" },
        { word: "forget", display: "f<u>or</u>get", image: "images/forget.png", audio: "audio/forget.mp3", emoji: "🤔" },
      ]},
      { type: "match", label: "6", group: "or", items: [
        { word: "sport",  display: "sp<u>or</u>t",  image: "images/sport.png",  emoji: "⚽" },
        { word: "pork",   display: "p<u>or</u>k",   image: "images/pork.png",   emoji: "🥩" },
        { word: "forget", display: "f<u>or</u>get", image: "images/forget.png", emoji: "🤔" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 5 — z, w, ng, v, oo (book), oo (moon)
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set5",
    homeLabel: "Set 5",
    homeSounds: "z · w · <u>ng</u> · v · <u>oo</u>",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "z",  display: "z",         audio: "audio/z.mp3" },
          { letter: "w",  display: "w",         audio: "audio/w.mp3" },
          { letter: "ng", display: "<u>ng</u>", audio: "audio/ng.mp3" },
          { letter: "v",  display: "v",         audio: "audio/v.mp3" },
          { letter: "oo", display: "<u>oo</u>", audio: "audio/oo.mp3" },
        ],
      },
      /* 5.1 group zip */
      { type: "say",   label: "1", group: "zip", rows: [
        { phonemes: "z · i · p",         display: "zip",    word: "zip",    audio: "audio/zip.mp3",    phonemeAudio: "audio/zip.mp3" },
        { phonemes: "z · i · g · z · a · g", display: "zigzag", word: "zigzag", audio: "audio/zigzag.mp3", phonemeAudio: "audio/zigzag.mp3" },
        { phonemes: "z · i · n · c",     display: "zinc",   word: "zinc",   audio: "audio/zinc.mp3",   phonemeAudio: "audio/zinc.mp3" },
      ]},
      { type: "spell", label: "1", group: "zip", words: [
        { word: "zip",    display: "zip",    image: "images/zip.png",    audio: "audio/zip.mp3",    emoji: "🤐" },
        { word: "zigzag", display: "zigzag", image: "images/zigzag.png", audio: "audio/zigzag.mp3", emoji: "〰️" },
        { word: "zinc",   display: "zinc",   image: "images/zinc.png",   audio: "audio/zinc.mp3",   emoji: "⚗️" },
      ]},
      { type: "match", label: "1", group: "zip", items: [
        { word: "zip",    display: "zip",    image: "images/zip.png",    emoji: "🤐" },
        { word: "zigzag", display: "zigzag", image: "images/zigzag.png", emoji: "〰️" },
        { word: "zinc",   display: "zinc",   image: "images/zinc.png",   emoji: "⚗️" },
      ]},
      /* 5.1 group wet */
      { type: "say",   label: "2", group: "wet", rows: [
        { phonemes: "w · e · t",     display: "wet",  word: "wet",  audio: "audio/wet.mp3",  phonemeAudio: "audio/wet.mp3" },
        { phonemes: "w · i · n · d", display: "wind", word: "wind", audio: "audio/wind.mp3", phonemeAudio: "audio/wind.mp3" },
        { phonemes: "w · e · s · t", display: "west", word: "west", audio: "audio/west.mp3", phonemeAudio: "audio/west.mp3" },
      ]},
      { type: "spell", label: "2", group: "wet", words: [
        { word: "wet",  display: "wet",  image: "images/wet.png",  audio: "audio/wet.mp3",  emoji: "💧" },
        { word: "wind", display: "wind", image: "images/wind.png", audio: "audio/wind.mp3", emoji: "💨" },
        { word: "west", display: "west", image: "images/west.png", audio: "audio/west.mp3", emoji: "🧭" },
      ]},
      { type: "match", label: "2", group: "wet", items: [
        { word: "wet",  display: "wet",  image: "images/wet.png",  emoji: "💧" },
        { word: "wind", display: "wind", image: "images/wind.png", emoji: "💨" },
        { word: "west", display: "west", image: "images/west.png", emoji: "🧭" },
      ]},
      /* 5.1 group sing */
      { type: "say",   label: "3", group: "sing", rows: [
        { phonemes: "s · i · ng",     display: "si<u>ng</u>",   word: "sing", audio: "audio/sing.mp3", phonemeAudio: "audio/sing.mp3" },
        { phonemes: "r · i · ng",     display: "ri<u>ng</u>",   word: "ring", audio: "audio/ring.mp3", phonemeAudio: "audio/ring.mp3" },
        { phonemes: "l · o · ng",     display: "lo<u>ng</u>",   word: "long", audio: "audio/long.mp3", phonemeAudio: "audio/long.mp3" },
        { phonemes: "b · a · ng",     display: "ba<u>ng</u>",   word: "bang", audio: "audio/bang.mp3", phonemeAudio: "audio/bang.mp3" },
      ]},
      { type: "spell", label: "3", group: "sing", words: [
        { word: "sing", display: "si<u>ng</u>", image: "images/sing.png", audio: "audio/sing.mp3", emoji: "🎤" },
        { word: "ring", display: "ri<u>ng</u>", image: "images/ring.png", audio: "audio/ring.mp3", emoji: "💍" },
        { word: "long", display: "lo<u>ng</u>", image: "images/long.png", audio: "audio/long.mp3", emoji: "📏" },
        { word: "bang", display: "ba<u>ng</u>", image: "images/bang.png", audio: "audio/bang.mp3", emoji: "💥" },
      ]},
      { type: "match", label: "3", group: "sing", items: [
        { word: "sing", display: "si<u>ng</u>", image: "images/sing.png", emoji: "🎤" },
        { word: "ring", display: "ri<u>ng</u>", image: "images/ring.png", emoji: "💍" },
        { word: "long", display: "lo<u>ng</u>", image: "images/long.png", emoji: "📏" },
        { word: "bang", display: "ba<u>ng</u>", image: "images/bang.png", emoji: "💥" },
      ]},
      /* 5.2 group van */
      { type: "say",   label: "4", group: "van", rows: [
        { phonemes: "v · a · n",     display: "van",  word: "van",  audio: "audio/van.mp3",  phonemeAudio: "audio/van.mp3" },
        { phonemes: "v · e · t",     display: "vet",  word: "vet",  audio: "audio/vet.mp3",  phonemeAudio: "audio/vet.mp3" },
        { phonemes: "v · e · s · t", display: "vest", word: "vest", audio: "audio/vest.mp3", phonemeAudio: "audio/vest.mp3" },
      ]},
      { type: "spell", label: "4", group: "van", words: [
        { word: "van",  display: "van",  image: "images/van.png",  audio: "audio/van.mp3",  emoji: "🚐" },
        { word: "vet",  display: "vet",  image: "images/vet.png",  audio: "audio/vet.mp3",  emoji: "🐾" },
        { word: "vest", display: "vest", image: "images/vest.png", audio: "audio/vest.mp3", emoji: "🦺" },
      ]},
      { type: "match", label: "4", group: "van", items: [
        { word: "van",  display: "van",  image: "images/van.png",  emoji: "🚐" },
        { word: "vet",  display: "vet",  image: "images/vet.png",  emoji: "🐾" },
        { word: "vest", display: "vest", image: "images/vest.png", emoji: "🦺" },
      ]},
      /* 5.2 group book */
      { type: "say",   label: "5", group: "book", rows: [
        { phonemes: "b · oo · k", display: "b<u>oo</u>k", word: "book", audio: "audio/book.mp3", phonemeAudio: "audio/book.mp3" },
        { phonemes: "f · oo · t", display: "f<u>oo</u>t", word: "foot", audio: "audio/foot.mp3", phonemeAudio: "audio/foot.mp3" },
        { phonemes: "l · oo · k", display: "l<u>oo</u>k", word: "look", audio: "audio/look.mp3", phonemeAudio: "audio/look.mp3" },
      ]},
      { type: "spell", label: "5", group: "book", words: [
        { word: "book", display: "b<u>oo</u>k", image: "images/book.png", audio: "audio/book.mp3", emoji: "📚" },
        { word: "foot", display: "f<u>oo</u>t", image: "images/foot.png", audio: "audio/foot.mp3", emoji: "🦶" },
        { word: "look", display: "l<u>oo</u>k", image: "images/look.png", audio: "audio/look.mp3", emoji: "👀" },
      ]},
      { type: "match", label: "5", group: "book", items: [
        { word: "book", display: "b<u>oo</u>k", image: "images/book.png", emoji: "📚" },
        { word: "foot", display: "f<u>oo</u>t", image: "images/foot.png", emoji: "🦶" },
        { word: "look", display: "l<u>oo</u>k", image: "images/look.png", emoji: "👀" },
      ]},
      /* 5.2 group moon */
      { type: "say",   label: "6", group: "moon", rows: [
        { phonemes: "z · oo",         display: "z<u>oo</u>",    word: "zoo",   audio: "audio/zoo.mp3",   phonemeAudio: "audio/zoo.mp3" },
        { phonemes: "m · oo · n",     display: "m<u>oo</u>n",   word: "moon",  audio: "audio/moon.mp3",  phonemeAudio: "audio/moon.mp3" },
        { phonemes: "s · p · oo · n", display: "sp<u>oo</u>n",  word: "spoon", audio: "audio/spoon.mp3", phonemeAudio: "audio/spoon.mp3" },
        { phonemes: "f · oo · d",     display: "f<u>oo</u>d",   word: "food",  audio: "audio/food.mp3",  phonemeAudio: "audio/food.mp3" },
      ]},
      { type: "spell", label: "6", group: "moon", words: [
        { word: "zoo",   display: "z<u>oo</u>",   image: "images/zoo.png",   audio: "audio/zoo.mp3",   emoji: "🦒" },
        { word: "moon",  display: "m<u>oo</u>n",  image: "images/moon.png",  audio: "audio/moon.mp3",  emoji: "🌙" },
        { word: "spoon", display: "sp<u>oo</u>n", image: "images/spoon.png", audio: "audio/spoon.mp3", emoji: "🥄" },
        { word: "food",  display: "f<u>oo</u>d",  image: "images/food.png",  audio: "audio/food.mp3",  emoji: "🍽️" },
      ]},
      { type: "match", label: "6", group: "moon", items: [
        { word: "zoo",   display: "z<u>oo</u>",   image: "images/zoo.png",   emoji: "🦒" },
        { word: "moon",  display: "m<u>oo</u>n",  image: "images/moon.png",  emoji: "🌙" },
        { word: "spoon", display: "sp<u>oo</u>n", image: "images/spoon.png", emoji: "🥄" },
        { word: "food",  display: "f<u>oo</u>d",  image: "images/food.png",  emoji: "🍽️" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 6 — y, x, ch, sh, th (thin), th (that)
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set6",
    homeLabel: "Set 6",
    homeSounds: "y · x · <u>ch</u> · <u>sh</u> · <u>th</u>",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "y",  display: "y",         audio: "audio/y.mp3" },
          { letter: "x",  display: "x",         audio: "audio/x.mp3" },
          { letter: "ch", display: "<u>ch</u>", audio: "audio/ch.mp3" },
          { letter: "sh", display: "<u>sh</u>", audio: "audio/sh.mp3" },
          { letter: "th", display: "<u>th</u>", audio: "audio/th.mp3" },
        ],
      },
      /* 6.1 group yes */
      { type: "say",   label: "1", group: "yes", rows: [
        { phonemes: "y · e · s", display: "yes", word: "yes", audio: "audio/yes.mp3", phonemeAudio: "audio/yes.mp3" },
        { phonemes: "y · a · m", display: "yam", word: "yam", audio: "audio/yam.mp3", phonemeAudio: "audio/yam.mp3" },
        { phonemes: "y · u · m", display: "yum", word: "yum", audio: "audio/yum.mp3", phonemeAudio: "audio/yum.mp3" },
      ]},
      { type: "spell", label: "1", group: "yes", words: [
        { word: "yes", display: "yes", image: "images/yes.png", audio: "audio/yes.mp3", emoji: "✅" },
        { word: "yam", display: "yam", image: "images/yam.png", audio: "audio/yam.mp3", emoji: "🍠" },
        { word: "yum", display: "yum", image: "images/yum.png", audio: "audio/yum.mp3", emoji: "😋" },
      ]},
      { type: "match", label: "1", group: "yes", items: [
        { word: "yes", display: "yes", image: "images/yes.png", emoji: "✅" },
        { word: "yam", display: "yam", image: "images/yam.png", emoji: "🍠" },
        { word: "yum", display: "yum", image: "images/yum.png", emoji: "😋" },
      ]},
      /* 6.1 group box */
      { type: "say",   label: "2", group: "box", rows: [
        { phonemes: "b · o · x",     display: "box",  word: "box",  audio: "audio/box.mp3",  phonemeAudio: "audio/box.mp3" },
        { phonemes: "s · i · x",     display: "six",  word: "six",  audio: "audio/six.mp3",  phonemeAudio: "audio/six.mp3" },
        { phonemes: "t · e · x · t", display: "text", word: "text", audio: "audio/text.mp3", phonemeAudio: "audio/text.mp3" },
      ]},
      { type: "spell", label: "2", group: "box", words: [
        { word: "box",  display: "box",  image: "images/box.png",  audio: "audio/box.mp3",  emoji: "📦" },
        { word: "six",  display: "six",  image: "images/six.png",  audio: "audio/six.mp3",  emoji: "6️⃣" },
        { word: "text", display: "text", image: "images/text.png", audio: "audio/text.mp3", emoji: "💬" },
      ]},
      { type: "match", label: "2", group: "box", items: [
        { word: "box",  display: "box",  image: "images/box.png",  emoji: "📦" },
        { word: "six",  display: "six",  image: "images/six.png",  emoji: "6️⃣" },
        { word: "text", display: "text", image: "images/text.png", emoji: "💬" },
      ]},
      /* 6.1 group ch */
      { type: "say",   label: "3", group: "ch", rows: [
        { phonemes: "ch · a · t",   display: "<u>ch</u>at",  word: "chat",  audio: "audio/chat.mp3",  phonemeAudio: "audio/chat.mp3" },
        { phonemes: "ch · i · p · s", display: "<u>ch</u>ips", word: "chips", audio: "audio/chips.mp3", phonemeAudio: "audio/chips.mp3" },
        { phonemes: "ch · i · n",   display: "<u>ch</u>in",  word: "chin",  audio: "audio/chin.mp3",  phonemeAudio: "audio/chin.mp3" },
        { phonemes: "i · t · ch",   display: "it<u>ch</u>",  word: "itch",  audio: "audio/itch.mp3",  phonemeAudio: "audio/itch.mp3" },
      ]},
      { type: "spell", label: "3", group: "ch", words: [
        { word: "chat",  display: "<u>ch</u>at",  image: "images/chat.png",  audio: "audio/chat.mp3",  emoji: "💬" },
        { word: "chips", display: "<u>ch</u>ips", image: "images/chips.png", audio: "audio/chips.mp3", emoji: "🍟" },
        { word: "chin",  display: "<u>ch</u>in",  image: "images/chin.png",  audio: "audio/chin.mp3",  emoji: "🧑" },
        { word: "itch",  display: "it<u>ch</u>",  image: "images/itch.png",  audio: "audio/itch.mp3",  emoji: "🤚" },
      ]},
      { type: "match", label: "3", group: "ch", items: [
        { word: "chat",  display: "<u>ch</u>at",  image: "images/chat.png",  emoji: "💬" },
        { word: "chips", display: "<u>ch</u>ips", image: "images/chips.png", emoji: "🍟" },
        { word: "chin",  display: "<u>ch</u>in",  image: "images/chin.png",  emoji: "🧑" },
        { word: "itch",  display: "it<u>ch</u>",  image: "images/itch.png",  emoji: "🤚" },
      ]},
      /* 6.2 group sh */
      { type: "say",   label: "4", group: "sh", rows: [
        { phonemes: "sh · u · t", display: "<u>sh</u>ut", word: "shut", audio: "audio/shut.mp3", phonemeAudio: "audio/shut.mp3" },
        { phonemes: "d · i · sh", display: "di<u>sh</u>", word: "dish", audio: "audio/dish.mp3", phonemeAudio: "audio/dish.mp3" },
        { phonemes: "sh · o · p", display: "<u>sh</u>op", word: "shop", audio: "audio/shop.mp3", phonemeAudio: "audio/shop.mp3" },
      ]},
      { type: "spell", label: "4", group: "sh", words: [
        { word: "shut", display: "<u>sh</u>ut", image: "images/shut.png", audio: "audio/shut.mp3", emoji: "🚪" },
        { word: "dish", display: "di<u>sh</u>", image: "images/dish.png", audio: "audio/dish.mp3", emoji: "🍽️" },
        { word: "shop", display: "<u>sh</u>op", image: "images/shop.png", audio: "audio/shop.mp3", emoji: "🛍️" },
      ]},
      { type: "match", label: "4", group: "sh", items: [
        { word: "shut", display: "<u>sh</u>ut", image: "images/shut.png", emoji: "🚪" },
        { word: "dish", display: "di<u>sh</u>", image: "images/dish.png", emoji: "🍽️" },
        { word: "shop", display: "<u>sh</u>op", image: "images/shop.png", emoji: "🛍️" },
      ]},
      /* 6.2 group th-thin */
      { type: "say",   label: "5", group: "th-thin", rows: [
        { phonemes: "th · i · n",   display: "<u>th</u>in",  word: "thin",  audio: "audio/thin.mp3",  phonemeAudio: "audio/thin.mp3" },
        { phonemes: "th · i · ck",  display: "<u>th</u>i<u>ck</u>", word: "thick", audio: "audio/thick.mp3", phonemeAudio: "audio/thick.mp3" },
        { phonemes: "m · o · th",   display: "mo<u>th</u>",  word: "moth",  audio: "audio/moth.mp3",  phonemeAudio: "audio/moth.mp3" },
        { phonemes: "m · a · th · s", display: "ma<u>th</u>s", word: "maths", audio: "audio/maths.mp3", phonemeAudio: "audio/maths.mp3" },
      ]},
      { type: "spell", label: "5", group: "th-thin", words: [
        { word: "thin",  display: "<u>th</u>in",          image: "images/thin.png",  audio: "audio/thin.mp3",  emoji: "📏" },
        { word: "thick", display: "<u>th</u>i<u>ck</u>",  image: "images/thick.png", audio: "audio/thick.mp3", emoji: "📚" },
        { word: "moth",  display: "mo<u>th</u>",          image: "images/moth.png",  audio: "audio/moth.mp3",  emoji: "🦋" },
        { word: "maths", display: "ma<u>th</u>s",         image: "images/maths.png", audio: "audio/maths.mp3", emoji: "➕" },
      ]},
      { type: "match", label: "5", group: "th-thin", items: [
        { word: "thin",  display: "<u>th</u>in",         image: "images/thin.png",  emoji: "📏" },
        { word: "thick", display: "<u>th</u>i<u>ck</u>", image: "images/thick.png", emoji: "📚" },
        { word: "moth",  display: "mo<u>th</u>",         image: "images/moth.png",  emoji: "🦋" },
        { word: "maths", display: "ma<u>th</u>s",        image: "images/maths.png", emoji: "➕" },
      ]},
      /* 6.2 group th-that */
      { type: "say",   label: "6", group: "th-that", rows: [
        { phonemes: "th · i · s", display: "<u>th</u>is",  word: "this", audio: "audio/this.mp3", phonemeAudio: "audio/this.mp3" },
        { phonemes: "th · a · t", display: "<u>th</u>at",  word: "that", audio: "audio/that.mp3", phonemeAudio: "audio/that.mp3" },
        { phonemes: "th · e · n", display: "<u>th</u>en",  word: "then", audio: "audio/then.mp3", phonemeAudio: "audio/then.mp3" },
      ]},
      { type: "spell", label: "6", group: "th-that", words: [
        { word: "this", display: "<u>th</u>is", image: "images/this.png", audio: "audio/this.mp3", emoji: "👆" },
        { word: "that", display: "<u>th</u>at", image: "images/that.png", audio: "audio/that.mp3", emoji: "👉" },
        { word: "then", display: "<u>th</u>en", image: "images/then.png", audio: "audio/then.mp3", emoji: "➡️" },
      ]},
      { type: "match", label: "6", group: "th-that", items: [
        { word: "this", display: "<u>th</u>is", image: "images/this.png", emoji: "👆" },
        { word: "that", display: "<u>th</u>at", image: "images/that.png", emoji: "👉" },
        { word: "then", display: "<u>th</u>en", image: "images/then.png", emoji: "➡️" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 7 — qu, ou, oi, ue, er, ar
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set7",
    homeLabel: "Set 7",
    homeSounds: "<u>qu</u> · <u>ou</u> · <u>oi</u> · <u>ue</u> · <u>er</u> · <u>ar</u>",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "qu", display: "<u>qu</u>", audio: "audio/qu.mp3" },
          { letter: "ou", display: "<u>ou</u>", audio: "audio/ou.mp3" },
          { letter: "oi", display: "<u>oi</u>", audio: "audio/oi.mp3" },
          { letter: "ue", display: "<u>ue</u>", audio: "audio/ue.mp3" },
          { letter: "er", display: "<u>er</u>", audio: "audio/er.mp3" },
          { letter: "ar", display: "<u>ar</u>", audio: "audio/ar.mp3" },
        ],
      },
      /* 7.1 group qu */
      { type: "say",   label: "1", group: "qu", rows: [
        { phonemes: "qu · i · z",       display: "<u>qu</u>iz",   word: "quiz",  audio: "audio/quiz.mp3",  phonemeAudio: "audio/quiz.mp3" },
        { phonemes: "qu · i · ck",      display: "q<u>ui</u><u>ck</u>", word: "quick", audio: "audio/quick.mp3", phonemeAudio: "audio/quick.mp3" },
        { phonemes: "qu · ee · n",      display: "<u>qu</u> <u>ee</u>n", word: "queen", audio: "audio/queen.mp3", phonemeAudio: "audio/queen.mp3" },
      ]},
      { type: "spell", label: "1", group: "qu", words: [
        { word: "quiz",  display: "<u>qu</u>iz",         image: "images/quiz.png",  audio: "audio/quiz.mp3",  emoji: "❓" },
        { word: "quick", display: "q<u>ui</u><u>ck</u>", image: "images/quick.png", audio: "audio/quick.mp3", emoji: "⚡" },
        { word: "queen", display: "<u>qu</u> <u>ee</u>n", image: "images/queen.png", audio: "audio/queen.mp3", emoji: "👑" },
      ]},
      { type: "match", label: "1", group: "qu", items: [
        { word: "quiz",  display: "<u>qu</u>iz",          image: "images/quiz.png",  emoji: "❓" },
        { word: "quick", display: "q<u>ui</u><u>ck</u>",  image: "images/quick.png", emoji: "⚡" },
        { word: "queen", display: "<u>qu</u> <u>ee</u>n", image: "images/queen.png", emoji: "👑" },
      ]},
      /* 7.1 group ou */
      { type: "say",   label: "2", group: "ou", rows: [
        { phonemes: "ou · t",       display: "<u>ou</u>t",   word: "out",   audio: "audio/out.mp3",   phonemeAudio: "audio/out.mp3" },
        { phonemes: "l · ou · d",   display: "l<u>ou</u>d",  word: "loud",  audio: "audio/loud.mp3",  phonemeAudio: "audio/loud.mp3" },
        { phonemes: "r · ou · n · d", display: "r<u>ou</u>nd", word: "round", audio: "audio/round.mp3", phonemeAudio: "audio/round.mp3" },
      ]},
      { type: "spell", label: "2", group: "ou", words: [
        { word: "out",   display: "<u>ou</u>t",   image: "images/out.png",   audio: "audio/out.mp3",   emoji: "🚪" },
        { word: "loud",  display: "l<u>ou</u>d",  image: "images/loud.png",  audio: "audio/loud.mp3",  emoji: "📢" },
        { word: "round", display: "r<u>ou</u>nd", image: "images/round.png", audio: "audio/round.mp3", emoji: "⭕" },
      ]},
      { type: "match", label: "2", group: "ou", items: [
        { word: "out",   display: "<u>ou</u>t",   image: "images/out.png",   emoji: "🚪" },
        { word: "loud",  display: "l<u>ou</u>d",  image: "images/loud.png",  emoji: "📢" },
        { word: "round", display: "r<u>ou</u>nd", image: "images/round.png", emoji: "⭕" },
      ]},
      /* 7.1 group oi */
      { type: "say",   label: "3", group: "oi", rows: [
        { phonemes: "oi · l",         display: "<u>oi</u>l",   word: "oil",   audio: "audio/oil.mp3",   phonemeAudio: "audio/oil.mp3" },
        { phonemes: "c · oi · n",     display: "c<u>oi</u>n",  word: "coin",  audio: "audio/coin.mp3",  phonemeAudio: "audio/coin.mp3" },
        { phonemes: "f · oi · l",     display: "f<u>oi</u>l",  word: "foil",  audio: "audio/foil.mp3",  phonemeAudio: "audio/foil.mp3" },
        { phonemes: "p · oi · n · t", display: "p<u>oi</u>nt", word: "point", audio: "audio/point.mp3", phonemeAudio: "audio/point.mp3" },
      ]},
      { type: "spell", label: "3", group: "oi", words: [
        { word: "oil",   display: "<u>oi</u>l",   image: "images/oil.png",   audio: "audio/oil.mp3",   emoji: "🛢️" },
        { word: "coin",  display: "c<u>oi</u>n",  image: "images/coin.png",  audio: "audio/coin.mp3",  emoji: "🪙" },
        { word: "foil",  display: "f<u>oi</u>l",  image: "images/foil.png",  audio: "audio/foil.mp3",  emoji: "✨" },
        { word: "point", display: "p<u>oi</u>nt", image: "images/point.png", audio: "audio/point.mp3", emoji: "👆" },
      ]},
      { type: "match", label: "3", group: "oi", items: [
        { word: "oil",   display: "<u>oi</u>l",   image: "images/oil.png",   emoji: "🛢️" },
        { word: "coin",  display: "c<u>oi</u>n",  image: "images/coin.png",  emoji: "🪙" },
        { word: "foil",  display: "f<u>oi</u>l",  image: "images/foil.png",  emoji: "✨" },
        { word: "point", display: "p<u>oi</u>nt", image: "images/point.png", emoji: "👆" },
      ]},
      /* 7.2 group ue */
      { type: "say",   label: "4", group: "ue", rows: [
        { phonemes: "b · l · ue",     display: "bl<u>ue</u>",  word: "blue", audio: "audio/blue.mp3", phonemeAudio: "audio/blue.mp3" },
        { phonemes: "f · ue · l",     display: "f<u>ue</u>l",  word: "fuel", audio: "audio/fuel.mp3", phonemeAudio: "audio/fuel.mp3" },
        { phonemes: "t · r · ue",     display: "tr<u>ue</u>",  word: "true", audio: "audio/true.mp3", phonemeAudio: "audio/true.mp3" },
      ]},
      { type: "spell", label: "4", group: "ue", words: [
        { word: "blue", display: "bl<u>ue</u>", image: "images/blue.png", audio: "audio/blue.mp3", emoji: "🔵" },
        { word: "fuel", display: "f<u>ue</u>l", image: "images/fuel.png", audio: "audio/fuel.mp3", emoji: "⛽" },
        { word: "true", display: "tr<u>ue</u>", image: "images/true.png", audio: "audio/true.mp3", emoji: "✅" },
      ]},
      { type: "match", label: "4", group: "ue", items: [
        { word: "blue", display: "bl<u>ue</u>", image: "images/blue.png", emoji: "🔵" },
        { word: "fuel", display: "f<u>ue</u>l", image: "images/fuel.png", emoji: "⛽" },
        { word: "true", display: "tr<u>ue</u>", image: "images/true.png", emoji: "✅" },
      ]},
      /* 7.2 group er */
      { type: "say",   label: "5", group: "er", rows: [
        { phonemes: "h · er",             display: "h<u>er</u>",    word: "her",    audio: "audio/her.mp3",    phonemeAudio: "audio/her.mp3" },
        { phonemes: "t · er · m",         display: "t<u>er</u>m",   word: "term",   audio: "audio/term.mp3",   phonemeAudio: "audio/term.mp3" },
        { phonemes: "s · i · s · t · er", display: "sist<u>er</u>", word: "sister", audio: "audio/sister.mp3", phonemeAudio: "audio/sister.mp3" },
        { phonemes: "u · n · d · er",     display: "und<u>er</u>",  word: "under",  audio: "audio/under.mp3",  phonemeAudio: "audio/under.mp3" },
      ]},
      { type: "spell", label: "5", group: "er", words: [
        { word: "her",    display: "h<u>er</u>",    image: "images/her.png",    audio: "audio/her.mp3",    emoji: "👩" },
        { word: "term",   display: "t<u>er</u>m",   image: "images/term.png",   audio: "audio/term.mp3",   emoji: "📅" },
        { word: "sister", display: "sist<u>er</u>", image: "images/sister.png", audio: "audio/sister.mp3", emoji: "👧" },
        { word: "under",  display: "und<u>er</u>",  image: "images/under.png",  audio: "audio/under.mp3",  emoji: "⬇️" },
      ]},
      { type: "match", label: "5", group: "er", items: [
        { word: "her",    display: "h<u>er</u>",    image: "images/her.png",    emoji: "👩" },
        { word: "term",   display: "t<u>er</u>m",   image: "images/term.png",   emoji: "📅" },
        { word: "sister", display: "sist<u>er</u>", image: "images/sister.png", emoji: "👧" },
        { word: "under",  display: "und<u>er</u>",  image: "images/under.png",  emoji: "⬇️" },
      ]},
      /* 7.2 group ar */
      { type: "say",   label: "6", group: "ar", rows: [
        { phonemes: "c · ar",         display: "c<u>ar</u>",    word: "car",   audio: "audio/car.mp3",   phonemeAudio: "audio/car.mp3" },
        { phonemes: "ar · m",         display: "<u>ar</u>m",    word: "arm",   audio: "audio/arm.mp3",   phonemeAudio: "audio/arm.mp3" },
        { phonemes: "s · m · ar · t", display: "sm<u>ar</u>t",  word: "smart", audio: "audio/smart.mp3", phonemeAudio: "audio/smart.mp3" },
      ]},
      { type: "spell", label: "6", group: "ar", words: [
        { word: "car",   display: "c<u>ar</u>",   image: "images/car.png",   audio: "audio/car.mp3",   emoji: "🚗" },
        { word: "arm",   display: "<u>ar</u>m",   image: "images/arm.png",   audio: "audio/arm.mp3",   emoji: "💪" },
        { word: "smart", display: "sm<u>ar</u>t", image: "images/smart.png", audio: "audio/smart.mp3", emoji: "🧠" },
      ]},
      { type: "match", label: "6", group: "ar", items: [
        { word: "car",   display: "c<u>ar</u>",   image: "images/car.png",   emoji: "🚗" },
        { word: "arm",   display: "<u>ar</u>m",   image: "images/arm.png",   emoji: "💪" },
        { word: "smart", display: "sm<u>ar</u>t", image: "images/smart.png", emoji: "🧠" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 8 — a_e, i_e, o_e, u_e, e (me), y (funny), i (hi)
     Split digraph: first vowel = green, silent e = red
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set8",
    homeLabel: "Set 8",
    homeSounds: "a_e · i_e · o_e · u_e · e · y · i",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "a_e", display: "<g>a</g>_<r>e</r>", audio: "audio/a_e.mp3" },
          { letter: "i_e", display: "<g>i</g>_<r>e</r>", audio: "audio/i_e.mp3" },
          { letter: "o_e", display: "<g>o</g>_<r>e</r>", audio: "audio/o_e.mp3" },
          { letter: "u_e", display: "<g>u</g>_<r>e</r>", audio: "audio/u_e.mp3" },
          { letter: "e",   display: "e",                  audio: "audio/e_me.mp3" },
          { letter: "y",   display: "y",                  audio: "audio/y_funny.mp3" },
        ],
      },
      /* 8.1 a_e pairs */
      { type: "say",   label: "1", group: "a_e", rows: [
        { phonemes: "t · a · p",   display: "tap",                    word: "tap",   audio: "audio/tap.mp3",   phonemeAudio: "audio/tap.mp3" },
        { phonemes: "t · a_e · p", display: "t<g>a</g>p<r>e</r>",    word: "tape",  audio: "audio/tape.mp3",  phonemeAudio: "audio/tape.mp3" },
        { phonemes: "m · a · t",   display: "mat",                    word: "mat",   audio: "audio/mat.mp3",   phonemeAudio: "audio/mat.mp3" },
        { phonemes: "m · a_e · t", display: "m<g>a</g>t<r>e</r>",    word: "mate",  audio: "audio/mate.mp3",  phonemeAudio: "audio/mate.mp3" },
      ]},
      { type: "spell", label: "1", group: "a_e", words: [
        { word: "tape",  display: "t<g>a</g>p<r>e</r>",  image: "images/tape.png",  audio: "audio/tape.mp3",  emoji: "🧲" },
        { word: "plate", display: "pl<g>a</g>t<r>e</r>", image: "images/plate.png", audio: "audio/plate.mp3", emoji: "🍽️" },
        { word: "cake",  display: "c<g>a</g>k<r>e</r>",  image: "images/cake.png",  audio: "audio/cake.mp3",  emoji: "🎂" },
      ]},
      { type: "match", label: "1", group: "a_e", items: [
        { word: "tape",  display: "t<g>a</g>p<r>e</r>",  image: "images/tape.png",  emoji: "🧲" },
        { word: "plate", display: "pl<g>a</g>t<r>e</r>", image: "images/plate.png", emoji: "🍽️" },
        { word: "cake",  display: "c<g>a</g>k<r>e</r>",  image: "images/cake.png",  emoji: "🎂" },
      ]},
      /* 8.1 i_e pairs */
      { type: "say",   label: "2", group: "i_e", rows: [
        { phonemes: "r · i · p",   display: "rip",                  word: "rip",   audio: "audio/rip.mp3",   phonemeAudio: "audio/rip.mp3" },
        { phonemes: "r · i_e · p", display: "r<g>i</g>p<r>e</r>",  word: "ripe",  audio: "audio/ripe.mp3",  phonemeAudio: "audio/ripe.mp3" },
        { phonemes: "p · i · n",   display: "pin",                  word: "pin",   audio: "audio/pin.mp3",   phonemeAudio: "audio/pin.mp3" },
        { phonemes: "p · i_e · n", display: "p<g>i</g>n<r>e</r>",  word: "pine",  audio: "audio/pine.mp3",  phonemeAudio: "audio/pine.mp3" },
      ]},
      { type: "spell", label: "2", group: "i_e", words: [
        { word: "like",  display: "l<g>i</g>k<r>e</r>",  image: "images/like.png",  audio: "audio/like.mp3",  emoji: "👍" },
        { word: "ride",  display: "r<g>i</g>d<r>e</r>",  image: "images/ride.png",  audio: "audio/ride.mp3",  emoji: "🚴" },
        { word: "smile", display: "sm<g>i</g>l<r>e</r>", image: "images/smile.png", audio: "audio/smile.mp3", emoji: "😊" },
      ]},
      { type: "match", label: "2", group: "i_e", items: [
        { word: "like",  display: "l<g>i</g>k<r>e</r>",  image: "images/like.png",  emoji: "👍" },
        { word: "ride",  display: "r<g>i</g>d<r>e</r>",  image: "images/ride.png",  emoji: "🚴" },
        { word: "smile", display: "sm<g>i</g>l<r>e</r>", image: "images/smile.png", emoji: "😊" },
      ]},
      /* 8.2 o_e pairs */
      { type: "say",   label: "3", group: "o_e", rows: [
        { phonemes: "h · o · p",   display: "hop",                  word: "hop",  audio: "audio/hop.mp3",  phonemeAudio: "audio/hop.mp3" },
        { phonemes: "h · o_e · p", display: "h<g>o</g>p<r>e</r>",  word: "hope", audio: "audio/hope.mp3", phonemeAudio: "audio/hope.mp3" },
        { phonemes: "n · o · t",   display: "not",                  word: "not",  audio: "audio/not.mp3",  phonemeAudio: "audio/not.mp3" },
        { phonemes: "n · o_e · t", display: "n<g>o</g>t<r>e</r>",  word: "note", audio: "audio/note.mp3", phonemeAudio: "audio/note.mp3" },
      ]},
      { type: "spell", label: "3", group: "o_e", words: [
        { word: "stove", display: "st<g>o</g>v<r>e</r>", image: "images/stove.png", audio: "audio/stove.mp3", emoji: "🔥" },
        { word: "home",  display: "h<g>o</g>m<r>e</r>",  image: "images/home.png",  audio: "audio/home.mp3",  emoji: "🏠" },
        { word: "bone",  display: "b<g>o</g>n<r>e</r>",  image: "images/bone.png",  audio: "audio/bone.mp3",  emoji: "🦴" },
      ]},
      { type: "match", label: "3", group: "o_e", items: [
        { word: "stove", display: "st<g>o</g>v<r>e</r>", image: "images/stove.png", emoji: "🔥" },
        { word: "home",  display: "h<g>o</g>m<r>e</r>",  image: "images/home.png",  emoji: "🏠" },
        { word: "bone",  display: "b<g>o</g>n<r>e</r>",  image: "images/bone.png",  emoji: "🦴" },
      ]},
      /* 8.2 u_e pairs */
      { type: "say",   label: "4", group: "u_e", rows: [
        { phonemes: "c · u · t",   display: "cut",                  word: "cut",  audio: "audio/cut.mp3",  phonemeAudio: "audio/cut.mp3" },
        { phonemes: "c · u_e · t", display: "c<g>u</g>t<r>e</r>",  word: "cute", audio: "audio/cute.mp3", phonemeAudio: "audio/cute.mp3" },
        { phonemes: "t · u · b",   display: "tub",                  word: "tub",  audio: "audio/tub.mp3",  phonemeAudio: "audio/tub.mp3" },
        { phonemes: "t · u_e · b", display: "t<g>u</g>b<r>e</r>",  word: "tube", audio: "audio/tube.mp3", phonemeAudio: "audio/tube.mp3" },
      ]},
      { type: "spell", label: "4", group: "u_e", words: [
        { word: "June", display: "J<g>u</g>n<r>e</r>", image: "images/june.png", audio: "audio/june.mp3", emoji: "📅" },
        { word: "cube", display: "c<g>u</g>b<r>e</r>", image: "images/cube.png", audio: "audio/cube.mp3", emoji: "🧊" },
        { word: "mute", display: "m<g>u</g>t<r>e</r>", image: "images/mute.png", audio: "audio/mute.mp3", emoji: "🔇" },
        { word: "tune", display: "t<g>u</g>n<r>e</r>", image: "images/tune.png", audio: "audio/tune.mp3", emoji: "🎵" },
      ]},
      { type: "match", label: "4", group: "u_e", items: [
        { word: "June", display: "J<g>u</g>n<r>e</r>", image: "images/june.png", emoji: "📅" },
        { word: "cube", display: "c<g>u</g>b<r>e</r>", image: "images/cube.png", emoji: "🧊" },
        { word: "mute", display: "m<g>u</g>t<r>e</r>", image: "images/mute.png", emoji: "🔇" },
        { word: "tune", display: "t<g>u</g>n<r>e</r>", image: "images/tune.png", emoji: "🎵" },
      ]},
      /* 8.3 e/y/i */
      { type: "say",   label: "5", group: "e-me", rows: [
        { phonemes: "m · e",   display: "me",  word: "me",  audio: "audio/me.mp3",  phonemeAudio: "audio/me.mp3" },
        { phonemes: "h · e",   display: "he",  word: "he",  audio: "audio/he.mp3",  phonemeAudio: "audio/he.mp3" },
        { phonemes: "sh · e",  display: "she", word: "she", audio: "audio/she.mp3", phonemeAudio: "audio/she.mp3" },
        { phonemes: "w · e",   display: "we",  word: "we",  audio: "audio/we.mp3",  phonemeAudio: "audio/we.mp3" },
      ]},
      { type: "spell", label: "5", group: "e-me", words: [
        { word: "me",  display: "me",  image: "images/me.png",  audio: "audio/me.mp3",  emoji: "🧑" },
        { word: "he",  display: "he",  image: "images/he.png",  audio: "audio/he.mp3",  emoji: "👨" },
        { word: "she", display: "she", image: "images/she.png", audio: "audio/she.mp3", emoji: "👩" },
        { word: "we",  display: "we",  image: "images/we.png",  audio: "audio/we.mp3",  emoji: "👫" },
      ]},
      { type: "match", label: "5", group: "e-me", items: [
        { word: "me",  display: "me",  image: "images/me.png",  emoji: "🧑" },
        { word: "he",  display: "he",  image: "images/he.png",  emoji: "👨" },
        { word: "she", display: "she", image: "images/she.png", emoji: "👩" },
        { word: "we",  display: "we",  image: "images/we.png",  emoji: "👫" },
      ]},
      /* 8.3 y-funny */
      { type: "say",   label: "6", group: "y-funny", rows: [
        { phonemes: "s · u · n · n · y", display: "sunny", word: "sunny", audio: "audio/sunny.mp3", phonemeAudio: "audio/sunny.mp3" },
        { phonemes: "f · u · n · n · y", display: "funny", word: "funny", audio: "audio/funny.mp3", phonemeAudio: "audio/funny.mp3" },
        { phonemes: "m · e · r · r · y", display: "merry", word: "merry", audio: "audio/merry.mp3", phonemeAudio: "audio/merry.mp3" },
        { phonemes: "l · u · ck · y",    display: "luc<u>k</u>y", word: "lucky", audio: "audio/lucky.mp3", phonemeAudio: "audio/lucky.mp3" },
      ]},
      { type: "spell", label: "6", group: "y-funny", words: [
        { word: "sunny", display: "sunny", image: "images/sunny.png", audio: "audio/sunny.mp3", emoji: "☀️" },
        { word: "funny", display: "funny", image: "images/funny.png", audio: "audio/funny.mp3", emoji: "😄" },
        { word: "merry", display: "merry", image: "images/merry.png", audio: "audio/merry.mp3", emoji: "🎄" },
        { word: "lucky", display: "lucky", image: "images/lucky.png", audio: "audio/lucky.mp3", emoji: "🍀" },
      ]},
      { type: "match", label: "6", group: "y-funny", items: [
        { word: "sunny", display: "sunny", image: "images/sunny.png", emoji: "☀️" },
        { word: "funny", display: "funny", image: "images/funny.png", emoji: "😄" },
        { word: "merry", display: "merry", image: "images/merry.png", emoji: "🎄" },
        { word: "lucky", display: "lucky", image: "images/lucky.png", emoji: "🍀" },
      ]},
      /* 8.3 i-hi */
      { type: "say",   label: "7", group: "i-hi", rows: [
        { phonemes: "h · i",         display: "hi",    word: "hi",    audio: "audio/hi.mp3",    phonemeAudio: "audio/hi.mp3" },
        { phonemes: "p · i · l · o · t", display: "pilot", word: "pilot", audio: "audio/pilot.mp3", phonemeAudio: "audio/pilot.mp3" },
        { phonemes: "f · i · n · a · l", display: "final", word: "final", audio: "audio/final.mp3", phonemeAudio: "audio/final.mp3" },
        { phonemes: "S · i · m · o · n", display: "Simon", word: "Simon", audio: "audio/simon.mp3", phonemeAudio: "audio/simon.mp3" },
      ]},
      { type: "spell", label: "7", group: "i-hi", words: [
        { word: "hi",    display: "hi",    image: "images/hi.png",    audio: "audio/hi.mp3",    emoji: "👋" },
        { word: "pilot", display: "pilot", image: "images/pilot.png", audio: "audio/pilot.mp3", emoji: "👨‍✈️" },
        { word: "final", display: "final", image: "images/final.png", audio: "audio/final.mp3", emoji: "🏁" },
      ]},
      { type: "match", label: "7", group: "i-hi", items: [
        { word: "hi",    display: "hi",    image: "images/hi.png",    emoji: "👋" },
        { word: "pilot", display: "pilot", image: "images/pilot.png", emoji: "👨‍✈️" },
        { word: "final", display: "final", image: "images/final.png", emoji: "🏁" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 9 — ay, oy, ea, ie, y (cry), igh
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set9",
    homeLabel: "Set 9",
    homeSounds: "<u>ay</u> · <u>oy</u> · <u>ea</u> · <u>ie</u> · y · <u>igh</u>",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "ay",  display: "<u>ay</u>",  audio: "audio/ay.mp3" },
          { letter: "oy",  display: "<u>oy</u>",  audio: "audio/oy.mp3" },
          { letter: "ea",  display: "<u>ea</u>",  audio: "audio/ea.mp3" },
          { letter: "ie",  display: "<u>ie</u>",  audio: "audio/ie.mp3" },
          { letter: "y",   display: "y",           audio: "audio/y_cry.mp3" },
          { letter: "igh", display: "<u>igh</u>", audio: "audio/igh.mp3" },
        ],
      },
      /* 9.1 ay */
      { type: "say",   label: "1", group: "ay", rows: [
        { phonemes: "d · ay",         display: "d<u>ay</u>",   word: "day",  audio: "audio/day.mp3",  phonemeAudio: "audio/day.mp3" },
        { phonemes: "s · ay",         display: "s<u>ay</u>",   word: "say",  audio: "audio/say.mp3",  phonemeAudio: "audio/say.mp3" },
        { phonemes: "p · l · ay",     display: "pl<u>ay</u>",  word: "play", audio: "audio/play.mp3", phonemeAudio: "audio/play.mp3" },
        { phonemes: "p · r · ay",     display: "pr<u>ay</u>",  word: "pray", audio: "audio/pray.mp3", phonemeAudio: "audio/pray.mp3" },
      ]},
      { type: "spell", label: "1", group: "ay", words: [
        { word: "day",  display: "d<u>ay</u>",  image: "images/day.png",  audio: "audio/day.mp3",  emoji: "☀️" },
        { word: "say",  display: "s<u>ay</u>",  image: "images/say.png",  audio: "audio/say.mp3",  emoji: "💬" },
        { word: "play", display: "pl<u>ay</u>", image: "images/play.png", audio: "audio/play.mp3", emoji: "🎮" },
        { word: "pray", display: "pr<u>ay</u>", image: "images/pray.png", audio: "audio/pray.mp3", emoji: "🙏" },
      ]},
      { type: "match", label: "1", group: "ay", items: [
        { word: "day",  display: "d<u>ay</u>",  image: "images/day.png",  emoji: "☀️" },
        { word: "say",  display: "s<u>ay</u>",  image: "images/say.png",  emoji: "💬" },
        { word: "play", display: "pl<u>ay</u>", image: "images/play.png", emoji: "🎮" },
        { word: "pray", display: "pr<u>ay</u>", image: "images/pray.png", emoji: "🙏" },
      ]},
      /* 9.1 oy */
      { type: "say",   label: "2", group: "oy", rows: [
        { phonemes: "t · oy",         display: "t<u>oy</u>",    word: "toy",   audio: "audio/toy.mp3",   phonemeAudio: "audio/toy.mp3" },
        { phonemes: "b · oy",         display: "b<u>oy</u>",    word: "boy",   audio: "audio/boy.mp3",   phonemeAudio: "audio/boy.mp3" },
        { phonemes: "s · oy",         display: "s<u>oy</u>",    word: "soy",   audio: "audio/soy.mp3",   phonemeAudio: "audio/soy.mp3" },
        { phonemes: "e · n · j · oy", display: "enj<u>oy</u>",  word: "enjoy", audio: "audio/enjoy.mp3", phonemeAudio: "audio/enjoy.mp3" },
      ]},
      { type: "spell", label: "2", group: "oy", words: [
        { word: "toy",   display: "t<u>oy</u>",   image: "images/toy.png",   audio: "audio/toy.mp3",   emoji: "🧸" },
        { word: "boy",   display: "b<u>oy</u>",   image: "images/boy.png",   audio: "audio/boy.mp3",   emoji: "👦" },
        { word: "soy",   display: "s<u>oy</u>",   image: "images/soy.png",   audio: "audio/soy.mp3",   emoji: "🫘" },
        { word: "enjoy", display: "enj<u>oy</u>", image: "images/enjoy.png", audio: "audio/enjoy.mp3", emoji: "😊" },
      ]},
      { type: "match", label: "2", group: "oy", items: [
        { word: "toy",   display: "t<u>oy</u>",   image: "images/toy.png",   emoji: "🧸" },
        { word: "boy",   display: "b<u>oy</u>",   image: "images/boy.png",   emoji: "👦" },
        { word: "soy",   display: "s<u>oy</u>",   image: "images/soy.png",   emoji: "🫘" },
        { word: "enjoy", display: "enj<u>oy</u>", image: "images/enjoy.png", emoji: "😊" },
      ]},
      /* 9.2 ea */
      { type: "say",   label: "3", group: "ea", rows: [
        { phonemes: "s · ea · t",     display: "s<u>ea</u>t",  word: "seat", audio: "audio/seat.mp3", phonemeAudio: "audio/seat.mp3" },
        { phonemes: "m · ea · t",     display: "m<u>ea</u>t",  word: "meat", audio: "audio/meat.mp3", phonemeAudio: "audio/meat.mp3" },
        { phonemes: "l · ea · f",     display: "l<u>ea</u>f",  word: "leaf", audio: "audio/leaf.mp3", phonemeAudio: "audio/leaf.mp3" },
        { phonemes: "c · l · ea · n", display: "cl<u>ea</u>n", word: "clean",audio: "audio/clean.mp3",phonemeAudio: "audio/clean.mp3" },
      ]},
      { type: "spell", label: "3", group: "ea", words: [
        { word: "seat",  display: "s<u>ea</u>t",  image: "images/seat.png",  audio: "audio/seat.mp3",  emoji: "💺" },
        { word: "meat",  display: "m<u>ea</u>t",  image: "images/meat.png",  audio: "audio/meat.mp3",  emoji: "🥩" },
        { word: "leaf",  display: "l<u>ea</u>f",  image: "images/leaf.png",  audio: "audio/leaf.mp3",  emoji: "🍃" },
        { word: "clean", display: "cl<u>ea</u>n", image: "images/clean.png", audio: "audio/clean.mp3", emoji: "🧹" },
      ]},
      { type: "match", label: "3", group: "ea", items: [
        { word: "seat",  display: "s<u>ea</u>t",  image: "images/seat.png",  emoji: "💺" },
        { word: "meat",  display: "m<u>ea</u>t",  image: "images/meat.png",  emoji: "🥩" },
        { word: "leaf",  display: "l<u>ea</u>f",  image: "images/leaf.png",  emoji: "🍃" },
        { word: "clean", display: "cl<u>ea</u>n", image: "images/clean.png", emoji: "🧹" },
      ]},
      /* 9.2 ie-field */
      { type: "say",   label: "4", group: "ie-field", rows: [
        { phonemes: "th · ie · f",      display: "<u>th</u> <u>ie</u>f",   word: "thief",   audio: "audio/thief.mp3",   phonemeAudio: "audio/thief.mp3" },
        { phonemes: "f · ie · l · d",   display: "f<u>ie</u>ld",           word: "field",   audio: "audio/field.mp3",   phonemeAudio: "audio/field.mp3" },
        { phonemes: "c · oo · k · ie",  display: "c<u>oo</u>k<u>ie</u>",  word: "cookie",  audio: "audio/cookie.mp3",  phonemeAudio: "audio/cookie.mp3" },
        { phonemes: "m · a · r · r · ie · d", display: "marr<u>ie</u>d",  word: "married", audio: "audio/married.mp3", phonemeAudio: "audio/married.mp3" },
      ]},
      { type: "spell", label: "4", group: "ie-field", words: [
        { word: "thief",   display: "<u>th</u> <u>ie</u>f",  image: "images/thief.png",   audio: "audio/thief.mp3",   emoji: "🦹" },
        { word: "field",   display: "f<u>ie</u>ld",          image: "images/field.png",   audio: "audio/field.mp3",   emoji: "🌾" },
        { word: "cookie",  display: "c<u>oo</u>k<u>ie</u>", image: "images/cookie.png",  audio: "audio/cookie.mp3",  emoji: "🍪" },
        { word: "married", display: "marr<u>ie</u>d",        image: "images/married.png", audio: "audio/married.mp3", emoji: "💍" },
      ]},
      { type: "match", label: "4", group: "ie-field", items: [
        { word: "thief",   display: "<u>th</u> <u>ie</u>f",  image: "images/thief.png",   emoji: "🦹" },
        { word: "field",   display: "f<u>ie</u>ld",          image: "images/field.png",   emoji: "🌾" },
        { word: "cookie",  display: "c<u>oo</u>k<u>ie</u>", image: "images/cookie.png",  emoji: "🍪" },
        { word: "married", display: "marr<u>ie</u>d",        image: "images/married.png", emoji: "💍" },
      ]},
      /* 9.3 y-cry */
      { type: "say",   label: "5", group: "y-cry", rows: [
        { phonemes: "d · r · y", display: "dr<u>y</u>", word: "dry", audio: "audio/dry.mp3", phonemeAudio: "audio/dry.mp3" },
        { phonemes: "f · l · y", display: "fl<u>y</u>", word: "fly", audio: "audio/fly.mp3", phonemeAudio: "audio/fly.mp3" },
        { phonemes: "c · r · y", display: "cr<u>y</u>", word: "cry", audio: "audio/cry.mp3", phonemeAudio: "audio/cry.mp3" },
        { phonemes: "s · k · y", display: "sk<u>y</u>", word: "sky", audio: "audio/sky.mp3", phonemeAudio: "audio/sky.mp3" },
      ]},
      { type: "spell", label: "5", group: "y-cry", words: [
        { word: "dry", display: "dr<u>y</u>", image: "images/dry.png", audio: "audio/dry.mp3", emoji: "🌵" },
        { word: "fly", display: "fl<u>y</u>", image: "images/fly.png", audio: "audio/fly.mp3", emoji: "✈️" },
        { word: "cry", display: "cr<u>y</u>", image: "images/cry.png", audio: "audio/cry.mp3", emoji: "😢" },
        { word: "sky", display: "sk<u>y</u>", image: "images/sky.png", audio: "audio/sky.mp3", emoji: "🌤️" },
      ]},
      { type: "match", label: "5", group: "y-cry", items: [
        { word: "dry", display: "dr<u>y</u>", image: "images/dry.png", emoji: "🌵" },
        { word: "fly", display: "fl<u>y</u>", image: "images/fly.png", emoji: "✈️" },
        { word: "cry", display: "cr<u>y</u>", image: "images/cry.png", emoji: "😢" },
        { word: "sky", display: "sk<u>y</u>", image: "images/sky.png", emoji: "🌤️" },
      ]},
      /* 9.3 igh */
      { type: "say",   label: "6", group: "igh", rows: [
        { phonemes: "l · igh · t", display: "l<u>igh</u>t",  word: "light", audio: "audio/light.mp3", phonemeAudio: "audio/light.mp3" },
        { phonemes: "n · igh · t", display: "n<u>igh</u>t",  word: "night", audio: "audio/night.mp3", phonemeAudio: "audio/night.mp3" },
        { phonemes: "r · igh · t", display: "r<u>igh</u>t",  word: "right", audio: "audio/right.mp3", phonemeAudio: "audio/right.mp3" },
        { phonemes: "f · igh · t", display: "f<u>igh</u>t",  word: "fight", audio: "audio/fight.mp3", phonemeAudio: "audio/fight.mp3" },
      ]},
      { type: "spell", label: "6", group: "igh", words: [
        { word: "light", display: "l<u>igh</u>t", image: "images/light.png", audio: "audio/light.mp3", emoji: "💡" },
        { word: "night", display: "n<u>igh</u>t", image: "images/night.png", audio: "audio/night.mp3", emoji: "🌙" },
        { word: "right", display: "r<u>igh</u>t", image: "images/right.png", audio: "audio/right.mp3", emoji: "✅" },
        { word: "fight", display: "f<u>igh</u>t", image: "images/fight.png", audio: "audio/fight.mp3", emoji: "🥊" },
      ]},
      { type: "match", label: "6", group: "igh", items: [
        { word: "light", display: "l<u>igh</u>t", image: "images/light.png", emoji: "💡" },
        { word: "night", display: "n<u>igh</u>t", image: "images/night.png", emoji: "🌙" },
        { word: "right", display: "r<u>igh</u>t", image: "images/right.png", emoji: "✅" },
        { word: "fight", display: "f<u>igh</u>t", image: "images/fight.png", emoji: "🥊" },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     SET 10 — al, aw, ow (grow), ow (now), ir, ur
  ═══════════════════════════════════════════════════════════ */
  {
    id: "set10",
    homeLabel: "Set 10",
    homeSounds: "<u>al</u> · <u>aw</u> · <u>ow</u> · <u>ir</u> · <u>ur</u>",
    locked: true,
    steps: [
      {
        type: "listen", label: "sounds",
        sounds: [
          { letter: "al", display: "<u>al</u>", audio: "audio/al.mp3" },
          { letter: "aw", display: "<u>aw</u>", audio: "audio/aw.mp3" },
          { letter: "ow", display: "<u>ow</u>", audio: "audio/ow.mp3" },
          { letter: "ir", display: "<u>ir</u>", audio: "audio/ir.mp3" },
          { letter: "ur", display: "<u>ur</u>", audio: "audio/ur.mp3" },
        ],
      },
      /* 10.1 al */
      { type: "say",   label: "1", group: "al", rows: [
        { phonemes: "t · al · k",   display: "t<u>al</u>k",  word: "talk", audio: "audio/talk.mp3", phonemeAudio: "audio/talk.mp3" },
        { phonemes: "w · al · l",   display: "w<u>al</u>l",  word: "wall", audio: "audio/wall.mp3", phonemeAudio: "audio/wall.mp3" },
        { phonemes: "b · al · d",   display: "b<u>al</u>d",  word: "bald", audio: "audio/bald.mp3", phonemeAudio: "audio/bald.mp3" },
      ]},
      { type: "spell", label: "1", group: "al", words: [
        { word: "talk", display: "t<u>al</u>k", image: "images/talk.png", audio: "audio/talk.mp3", emoji: "🗣️" },
        { word: "wall", display: "w<u>al</u>l", image: "images/wall.png", audio: "audio/wall.mp3", emoji: "🧱" },
        { word: "bald", display: "b<u>al</u>d", image: "images/bald.png", audio: "audio/bald.mp3", emoji: "👨‍🦲" },
      ]},
      { type: "match", label: "1", group: "al", items: [
        { word: "talk", display: "t<u>al</u>k", image: "images/talk.png", emoji: "🗣️" },
        { word: "wall", display: "w<u>al</u>l", image: "images/wall.png", emoji: "🧱" },
        { word: "bald", display: "b<u>al</u>d", image: "images/bald.png", emoji: "👨‍🦲" },
      ]},
      /* 10.1 aw */
      { type: "say",   label: "2", group: "aw", rows: [
        { phonemes: "p · aw",             display: "p<u>aw</u>",           word: "paw",         audio: "audio/paw.mp3",         phonemeAudio: "audio/paw.mp3" },
        { phonemes: "d · r · aw",         display: "dr<u>aw</u>",          word: "draw",        audio: "audio/draw.mp3",        phonemeAudio: "audio/draw.mp3" },
        { phonemes: "c · r · aw · l",     display: "cr<u>aw</u>l",         word: "crawl",       audio: "audio/crawl.mp3",       phonemeAudio: "audio/crawl.mp3" },
        { phonemes: "s · t · r · aw · b · e · r · r · y", display: "str<u>aw</u>berry", word: "strawberry", audio: "audio/strawberry.mp3", phonemeAudio: "audio/strawberry.mp3" },
      ]},
      { type: "spell", label: "2", group: "aw", words: [
        { word: "paw",        display: "p<u>aw</u>",           image: "images/paw.png",        audio: "audio/paw.mp3",         emoji: "🐾" },
        { word: "draw",       display: "dr<u>aw</u>",          image: "images/draw.png",       audio: "audio/draw.mp3",        emoji: "✏️" },
        { word: "crawl",      display: "cr<u>aw</u>l",         image: "images/crawl.png",      audio: "audio/crawl.mp3",       emoji: "👶" },
        { word: "strawberry", display: "str<u>aw</u>berry",    image: "images/strawberry.png", audio: "audio/strawberry.mp3",  emoji: "🍓" },
      ]},
      { type: "match", label: "2", group: "aw", items: [
        { word: "paw",        display: "p<u>aw</u>",        image: "images/paw.png",        emoji: "🐾" },
        { word: "draw",       display: "dr<u>aw</u>",       image: "images/draw.png",       emoji: "✏️" },
        { word: "crawl",      display: "cr<u>aw</u>l",      image: "images/crawl.png",      emoji: "👶" },
        { word: "strawberry", display: "str<u>aw</u>berry", image: "images/strawberry.png", emoji: "🍓" },
      ]},
      /* 10.2 ow-grow */
      { type: "say",   label: "3", group: "ow-grow", rows: [
        { phonemes: "l · ow",         display: "l<u>ow</u>",      word: "low",     audio: "audio/low.mp3",     phonemeAudio: "audio/low.mp3" },
        { phonemes: "g · r · ow",     display: "gr<u>ow</u>",     word: "grow",    audio: "audio/grow.mp3",    phonemeAudio: "audio/grow.mp3" },
        { phonemes: "y · e · l · l · ow", display: "yell<u>ow</u>", word: "yellow", audio: "audio/yellow.mp3",  phonemeAudio: "audio/yellow.mp3" },
        { phonemes: "r · ai · n · b · ow", display: "r<u>ai</u>nb<u>ow</u>", word: "rainbow", audio: "audio/rainbow.mp3", phonemeAudio: "audio/rainbow.mp3" },
      ]},
      { type: "spell", label: "3", group: "ow-grow", words: [
        { word: "low",     display: "l<u>ow</u>",                    image: "images/low.png",     audio: "audio/low.mp3",     emoji: "⬇️" },
        { word: "grow",    display: "gr<u>ow</u>",                   image: "images/grow.png",    audio: "audio/grow.mp3",    emoji: "🌱" },
        { word: "yellow",  display: "yell<u>ow</u>",                 image: "images/yellow.png",  audio: "audio/yellow.mp3",  emoji: "🟡" },
        { word: "rainbow", display: "r<u>ai</u>nb<u>ow</u>",        image: "images/rainbow.png", audio: "audio/rainbow.mp3", emoji: "🌈" },
      ]},
      { type: "match", label: "3", group: "ow-grow", items: [
        { word: "low",     display: "l<u>ow</u>",             image: "images/low.png",     emoji: "⬇️" },
        { word: "grow",    display: "gr<u>ow</u>",            image: "images/grow.png",    emoji: "🌱" },
        { word: "yellow",  display: "yell<u>ow</u>",          image: "images/yellow.png",  emoji: "🟡" },
        { word: "rainbow", display: "r<u>ai</u>nb<u>ow</u>", image: "images/rainbow.png", emoji: "🌈" },
      ]},
      /* 10.2 ow-now */
      { type: "say",   label: "4", group: "ow-now", rows: [
        { phonemes: "c · ow",         display: "c<u>ow</u>",    word: "cow",   audio: "audio/cow.mp3",   phonemeAudio: "audio/cow.mp3" },
        { phonemes: "t · ow · n",     display: "t<u>ow</u>n",   word: "town",  audio: "audio/town.mp3",  phonemeAudio: "audio/town.mp3" },
        { phonemes: "b · r · ow · n", display: "br<u>ow</u>n",  word: "brown", audio: "audio/brown.mp3", phonemeAudio: "audio/brown.mp3" },
      ]},
      { type: "spell", label: "4", group: "ow-now", words: [
        { word: "cow",   display: "c<u>ow</u>",   image: "images/cow.png",   audio: "audio/cow.mp3",   emoji: "🐄" },
        { word: "town",  display: "t<u>ow</u>n",  image: "images/town.png",  audio: "audio/town.mp3",  emoji: "🏘️" },
        { word: "brown", display: "br<u>ow</u>n", image: "images/brown.png", audio: "audio/brown.mp3", emoji: "🟤" },
      ]},
      { type: "match", label: "4", group: "ow-now", items: [
        { word: "cow",   display: "c<u>ow</u>",   image: "images/cow.png",   emoji: "🐄" },
        { word: "town",  display: "t<u>ow</u>n",  image: "images/town.png",  emoji: "🏘️" },
        { word: "brown", display: "br<u>ow</u>n", image: "images/brown.png", emoji: "🟤" },
      ]},
      /* 10.3 ir */
      { type: "say",   label: "5", group: "ir", rows: [
        { phonemes: "d · ir · t",         display: "d<u>ir</u>t",      word: "dirt",     audio: "audio/dirt.mp3",     phonemeAudio: "audio/dirt.mp3" },
        { phonemes: "g · ir · l",         display: "g<u>ir</u>l",      word: "girl",     audio: "audio/girl.mp3",     phonemeAudio: "audio/girl.mp3" },
        { phonemes: "f · ir · s · t",     display: "f<u>ir</u>st",     word: "first",    audio: "audio/first.mp3",    phonemeAudio: "audio/first.mp3" },
        { phonemes: "b · ir · th · d · ay", display: "b<u>ir</u> <u>th</u>day", word: "birthday", audio: "audio/birthday.mp3", phonemeAudio: "audio/birthday.mp3" },
      ]},
      { type: "spell", label: "5", group: "ir", words: [
        { word: "dirt",     display: "d<u>ir</u>t",              image: "images/dirt.png",     audio: "audio/dirt.mp3",     emoji: "🌱" },
        { word: "girl",     display: "g<u>ir</u>l",              image: "images/girl.png",     audio: "audio/girl.mp3",     emoji: "👧" },
        { word: "first",    display: "f<u>ir</u>st",             image: "images/first.png",    audio: "audio/first.mp3",    emoji: "🥇" },
        { word: "birthday", display: "b<u>ir</u> <u>th</u>day", image: "images/birthday.png", audio: "audio/birthday.mp3", emoji: "🎂" },
      ]},
      { type: "match", label: "5", group: "ir", items: [
        { word: "dirt",     display: "d<u>ir</u>t",              image: "images/dirt.png",     emoji: "🌱" },
        { word: "girl",     display: "g<u>ir</u>l",              image: "images/girl.png",     emoji: "👧" },
        { word: "first",    display: "f<u>ir</u>st",             image: "images/first.png",    emoji: "🥇" },
        { word: "birthday", display: "b<u>ir</u> <u>th</u>day", image: "images/birthday.png", emoji: "🎂" },
      ]},
      /* 10.3 ur */
      { type: "say",   label: "6", group: "ur", rows: [
        { phonemes: "f · ur",         display: "f<u>ur</u>",   word: "fur",   audio: "audio/fur.mp3",   phonemeAudio: "audio/fur.mp3" },
        { phonemes: "t · ur · n",     display: "t<u>ur</u>n",  word: "turn",  audio: "audio/turn.mp3",  phonemeAudio: "audio/turn.mp3" },
        { phonemes: "h · ur · t",     display: "h<u>ur</u>t",  word: "hurt",  audio: "audio/hurt.mp3",  phonemeAudio: "audio/hurt.mp3" },
        { phonemes: "c · ur · l · y", display: "c<u>ur</u>ly", word: "curly", audio: "audio/curly.mp3", phonemeAudio: "audio/curly.mp3" },
      ]},
      { type: "spell", label: "6", group: "ur", words: [
        { word: "fur",   display: "f<u>ur</u>",   image: "images/fur.png",   audio: "audio/fur.mp3",   emoji: "🐻" },
        { word: "turn",  display: "t<u>ur</u>n",  image: "images/turn.png",  audio: "audio/turn.mp3",  emoji: "↩️" },
        { word: "hurt",  display: "h<u>ur</u>t",  image: "images/hurt.png",  audio: "audio/hurt.mp3",  emoji: "🤕" },
        { word: "curly", display: "c<u>ur</u>ly", image: "images/curly.png", audio: "audio/curly.mp3", emoji: "〰️" },
      ]},
      { type: "match", label: "6", group: "ur", items: [
        { word: "fur",   display: "f<u>ur</u>",   image: "images/fur.png",   emoji: "🐻" },
        { word: "turn",  display: "t<u>ur</u>n",  image: "images/turn.png",  emoji: "↩️" },
        { word: "hurt",  display: "h<u>ur</u>t",  image: "images/hurt.png",  emoji: "🤕" },
        { word: "curly", display: "c<u>ur</u>ly", image: "images/curly.png", emoji: "〰️" },
      ]},
    ],
  },

]; // end CURRICULUM
