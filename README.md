# Phonics for English

A progressive phonics web app for EAL adult learners.

---

## Project structure

```
phonics/
├── index.html          Main HTML shell
├── style.css           All styles
├── app.js              Application logic
├── curriculum.js       All content — sets, words, audio & image paths
└── public/
    ├── audio/          Audio files  (one per sound/word)
    └── images/         Image files  (one per word)
```

---

## Adding your audio files

Name each file to match the word or letter, e.g.:

```
public/audio/s.mp3
public/audio/a.mp3
public/audio/sat.mp3
public/audio/pin.mp3
...
```

The app falls back to browser text-to-speech if a file is missing,
so you can deploy and add files incrementally.

---

## Adding your images

Name each file to match the word, e.g.:

```
public/images/sat.jpg
public/images/pin.jpg
...
```

Supported formats: `.jpg`, `.png`, `.webp`
Recommended size: 200×200 px (square crops work best)

The app falls back to an emoji placeholder if an image is missing.

---

## Deploying to Vercel

1. Install the Vercel CLI (one-time):
   ```bash
   npm install -g vercel
   ```

2. From inside the `phonics/` folder:
   ```bash
   vercel
   ```
   Follow the prompts. Accept all defaults.

3. Your site will be live at a URL like `https://phonics-abc123.vercel.app`

**To update after making changes:**
```bash
vercel --prod
```

### Alternatively — drag & drop deploy
1. Go to https://vercel.com and sign in
2. Click **Add New → Project**
3. Drag the entire `phonics/` folder onto the page
4. Click **Deploy**

---

## Adding more sets (Set 2, 3…)

Open `curriculum.js`. At the bottom of the `CURRICULUM` array, copy
the Set 2 stub and fill in the steps following the same structure as
Set 1. The app picks up new sets automatically — no changes to
`app.js` or `index.html` needed.

---

## Adding Supabase login & cloud progress sync

When you're ready to move from localStorage to real user accounts:

1. Create a free project at https://supabase.com
2. Create two tables:
   - `students` — id, email, created_at
   - `progress`  — student_id, set_id, step_idx, completed_at
3. Install the Supabase JS client:
   ```bash
   npm install @supabase/supabase-js
   ```
4. Replace the `saveProgress()` / `markStep()` / `isStepDone()`
   functions in `app.js` with Supabase calls.
   (Ask Claude to do this step when you're ready — it's straightforward.)

---

## Browser support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
Drag-and-drop on touch screens requires a small extra library
(e.g. `drag-drop-touch`) — ask Claude to add this when needed.
