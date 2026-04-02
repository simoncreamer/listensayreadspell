/**
 * curriculum.js
 *
 * All content lives here. To add a new set or word group, follow the
 * existing pattern. Image and audio files go in:
 *   public/images/<word>.jpg   (or .png / .webp)
 *   public/audio/<word>.mp3    (or .ogg)
 *
 * The app falls back to browser text-to-speech if an audio file is
 * missing, and to an emoji placeholder if an image file is missing.
 */

const CURRICULUM = [
  {
    id: "set1",
    homeLabel: "Set 1",
    homeSounds: "s · a · t · p · i · n",

    steps: [

      /* ── Listen: individual sounds ─────────────────────────── */
      {
        type: "listen",
        label: "satpin",
        sounds: [
          { letter: "s", audio: "audio/s.mp3" },
          { letter: "a", audio: "audio/a.mp3" },
          { letter: "t", audio: "audio/t.mp3" },
          { letter: "p", audio: "audio/p.mp3" },
          { letter: "i", audio: "audio/i.mp3" },
          { letter: "n", audio: "audio/n.mp3" },
        ],
      },

      /* ── Group 1: at ────────────────────────────────────────── */
      {
        type: "say",
        label: "1",
        group: "at",
        rows: [
          { phonemes: "a · t",     word: "at",  audio: "audio/at.mp3",  phonemeAudio: "audio/a...t.mp3" },
          { phonemes: "s · a · t", word: "sat", audio: "audio/sat.mp3", phonemeAudio: "audio/s...a...t.mp3" },
          { phonemes: "p · a · t", word: "pat", audio: "audio/pat.mp3", phonemeAudio: "audio/p...a...t.mp3" },
        ],
      },
      {
        type: "spell",
        label: "1",
        group: "at",
        words: [
          { word: "at",  image: "images/at.jpg",  audio: "audio/at spelling.mp3",  emoji: "🎯" },
          { word: "sat", image: "images/sat sit.jpg", audio: "audio/sat spelling.mp3", emoji: "🪑" },
          { word: "pat", image: "images/pat.jpg", audio: "audio/pat spelling.mp3", emoji: "🐾" },
        ],
      },
      {
        type: "match",
        label: "1",
        group: "at",
        items: [
          { word: "at",  image: "images/at.jpg",  emoji: "🎯" },
          { word: "sat", image: "images/sat.jpg", emoji: "🪑" },
          { word: "pat", image: "images/pat.jpg", emoji: "🐾" },
        ],
      },

      /* ── Group 2: in ────────────────────────────────────────── */
      {
        type: "say",
        label: "2",
        group: "in",
        rows: [
          { phonemes: "i · n",     word: "in",  audio: "audio/in.mp3",  phonemeAudio: "audio/i...n.mp3" },
          { phonemes: "t · i · n", word: "tin", audio: "audio/tin.mp3", phonemeAudio: "audio/t...i...n.mp3 },
          { phonemes: "p · i · n", word: "pin", audio: "audio/pin.mp3", phonemeAudio: "audio/p...i...n.mp3" },
        ],
      },
      {
        type: "spell",
        label: "2",
        group: "in",
        words: [
          { word: "in",  image: "images/in.jpg",  audio: "audio/in spelling.mp3",  emoji: "📥" },
          { word: "tin", image: "images/tin.jpg", audio: "audio/tin spelling.mp3", emoji: "🥫" },
          { word: "pin", image: "images/pin.jpg", audio: "audio/pin spelling.mp3", emoji: "📌" },
        ],
      },
      {
        type: "match",
        label: "2",
        group: "in",
        items: [
          { word: "in",  image: "images/in.jpg",  emoji: "📥" },
          { word: "tin", image: "images/tin.jpg", emoji: "🥫" },
          { word: "pin", image: "images/pin.jpg", emoji: "📌" },
        ],
      },

      /* ── Group 3: an ────────────────────────────────────────── */
      {
        type: "say",
        label: "3",
        group: "an",
        rows: [
          { phonemes: "n · a · p", word: "nap", audio: "audio/nap.mp3", phonemeAudio: "audio/n...a...p.mp3" },
          { phonemes: "t · a · p", word: "tap", audio: "audio/tap.mp3", phonemeAudio: "audio/t...a...p.mp3" },
          { phonemes: "p · a · n", word: "pan", audio: "audio/pan.mp3", phonemeAudio: "audio/p...a...t.mp3" },
          { phonemes: "t · a · n", word: "tan", audio: "audio/tan.mp3", phonemeAudio: "audio/t..a...p.mp3" },
        ],
      },
      {
        type: "spell",
        label: "3",
        group: "an",
        words: [
          { word: "nap", image: "images/nap.jpg", audio: "audio/nap spelling.mp3", emoji: "😴" },
          { word: "tap", image: "images/tap.jpg", audio: "audio/tap spelling.mp3", emoji: "🚰" },
          { word: "pan", image: "images/pan.jpg", audio: "audio/pan spelling.mp3", emoji: "🍳" },
          { word: "tan", image: "images/tan.jpg", audio: "audio/tan v2 spelling.mp3", emoji: "🏖️" },
        ],
      },
      {
        type: "match",
        label: "3",
        group: "an",
        items: [
          { word: "nap", image: "images/nap.jpg", emoji: "😴" },
          { word: "tap", image: "images/tap.jpg", emoji: "🚰" },
          { word: "pan", image: "images/pan.jpg", emoji: "🍳" },
          { word: "tan", image: "images/tan.jpg", emoji: "🏖️" },
        ],
      },

      /* ── Group 4: it (Set 1.2) ──────────────────────────────── */
      {
        type: "say",
        label: "4",
        group: "it",
        rows: [
          { phonemes: "s · i · t",     word: "sit",  audio: "audio/sit.mp3",  phonemeAudio: "audio/s...i..t.mp3" },
          { phonemes: "p · i · t",     word: "pit",  audio: "audio/pit.mp3",  phonemeAudio: "audio/p...i...t.mp3" },
          { phonemes: "n · i · t · s", word: "nits", audio: "audio/nits.mp3", phonemeAudio: "audio/n...i...t...s.mp3" },
        ],
      },
      {
        type: "spell",
        label: "4",
        group: "it",
        words: [
          { word: "sit",  image: "images/sit.jpg",  audio: "audio/sit.mp3",  emoji: "🪑" },
          { word: "pit",  image: "images/pit.jpg",  audio: "audio/pit.mp3",  emoji: "🕳️" },
          { word: "nits", image: "images/nits.jpg", audio: "audio/nits.mp3", emoji: "🔍" },
        ],
      },
      {
        type: "match",
        label: "4",
        group: "it",
        items: [
          { word: "sit",  image: "images/sit.jpg",  emoji: "🪑" },
          { word: "pit",  image: "images/pit.jpg",  emoji: "🕳️" },
          { word: "nits", image: "images/nits.jpg", emoji: "🔍" },
        ],
      },

      /* ── Group 5: ip ────────────────────────────────────────── */
      {
        type: "say",
        label: "5",
        group: "ip",
        rows: [
          { phonemes: "t · i · p", word: "tip", audio: "audio/tip.mp3", phonemeAudio: "audio/t...i...p.mp3" },
          { phonemes: "p · i · p", word: "pip", audio: "audio/pip.mp3", phonemeAudio: "audio/p...i...p.mp3" },
          { phonemes: "n · i · p", word: "nip", audio: "audio/nip.mp3", phonemeAudio: "audio/n...i...p.mp3" },
          { phonemes: "s · i · p", word: "sip", audio: "audio/sip.mp3", phonemeAudio: "audio/s..i...p.mp3" },
        ],
      },
      {
        type: "spell",
        label: "5",
        group: "ip",
        words: [
          { word: "tip", image: "images/tip.jpg", audio: "audio/tip.mp3", emoji: "💡" },
          { word: "pip", image: "images/pip.jpg", audio: "audio/pip.mp3", emoji: "🍎" },
          { word: "nip", image: "images/nip.jpg", audio: "audio/nip.mp3", emoji: "🤏" },
          { word: "sip", image: "images/sip.jpg", audio: "audio/sip.mp3", emoji: "🥤" },
        ],
      },
      {
        type: "match",
        label: "5",
        group: "ip",
        items: [
          { word: "tip", image: "images/tip.jpg", emoji: "💡" },
          { word: "pip", image: "images/pip.jpg", emoji: "🍎" },
          { word: "nip", image: "images/nip.jpg", emoji: "🤏" },
          { word: "sip", image: "images/sip.jpg", emoji: "🥤" },
        ],
      },

      /* ── Group 6: ant ───────────────────────────────────────── */
      {
        type: "say",
        label: "6",
        group: "ant",
        rows: [
          { phonemes: "a · n · t",         word: "ant",   audio: "audio/ant.mp3",   phonemeAudio: "audio/a...n...t.mp3" },
          { phonemes: "p · a · n · t · s", word: "pants", audio: "audio/pants.mp3", phonemeAudio: "audio/p...a...n...t...s.mp3" },
          { phonemes: "s · n · a · p",     word: "snap",  audio: "audio/snap.mp3",  phonemeAudio: "audio/s...n...a...p.mp3" },
        ],
      },
      {
        type: "spell",
        label: "6",
        group: "ant",
        words: [
          { word: "ant",   image: "images/ant.jpg",   audio: "audio/ant.mp3",   emoji: "🐜" },
          { word: "pants", image: "images/pants.jpg", audio: "audio/pants.mp3", emoji: "👖" },
          { word: "snap",  image: "images/snap.jpg",  audio: "audio/snap.mp3",  emoji: "📸" },
        ],
      },
      {
        type: "match",
        label: "6",
        group: "ant",
        items: [
          { word: "ant",   image: "images/ant.jpg",   emoji: "🐜" },
          { word: "pants", image: "images/pants.jpg", emoji: "👖" },
          { word: "snap",  image: "images/snap.jpg",  emoji: "📸" },
        ],
      },

    ], // end steps
  }, // end set1

  /* ════════════════════════════════════════════════════════════
     SET 2  —  add content following the same pattern as Set 1
  ════════════════════════════════════════════════════════════ */
  {
    id: "set2",
    homeLabel: "Set 2",
    homeSounds: "ck · d · e · h · m · r",
    locked: true,   // unlocks automatically when Set 1 is complete
    steps: [
      // Add steps here following the same structure as Set 1
    ],
  },

]; // end CURRICULUM
