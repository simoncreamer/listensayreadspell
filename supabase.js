/* ═══════════════════════════════════════════════════════════════
   SUPABASE INTEGRATION FOR PHONICS APP
   
   INSTRUCTIONS:
   1. Add this entire file as a new <script> tag in index.html
      BEFORE curriculum.js and app.js:
      <script src="supabase.js"></script>
   
   2. In app.js, replace the three persistence functions:
      saveProgress(), markStep(), isStepDone()
      with the versions at the bottom of this file.
   
   3. In app.js, replace renderHome() call at boot with:
      showLoginScreen();
   ═══════════════════════════════════════════════════════════════ */

const SUPABASE_URL = "https://basrlitxwgtatreouwni.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhc3JsaXR4d2d0YXRyZW91d25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTE4NDAsImV4cCI6MjA5MzY2Nzg0MH0.BrnNDB4AOc4sHcP1-VMe0T-4u_0yMS2kseTlJ9LE9jY";

const DB_HEADERS = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
};

/* ── Current session ─────────────────────────────────────────── */
let currentStudent = null; // { id, username, class_id }
let currentTeacher = null; // { id, username }

/* ── DB helpers ──────────────────────────────────────────────── */
async function dbGet(table, params) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url, { headers: DB_HEADERS });
  return res.json();
}

async function dbPost(table, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...DB_HEADERS, "Prefer": "return=representation" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function dbUpsert(table, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...DB_HEADERS, "Prefer": "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(body),
  });
  return res.json();
}

/* ── Login screen ────────────────────────────────────────────── */
function showLoginScreen() {
  // Add login screen to DOM if not present
  if (!document.getElementById("screen-login")) {
    const div = document.createElement("div");
    div.id = "screen-login";
    div.className = "screen active";
    div.innerHTML = `
      <div style="
        min-height:100vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        padding:2rem 1rem;
      ">
        <h1 style="margin-bottom:0.25rem;text-align:center;">Listen. Say. Read. Spell.</h1>
        <p class="sub" style="margin-bottom:2rem;text-align:center;">Sign in to continue</p>

        <div style="
          width:100%;
          max-width:320px;
          background:#fff;
          border:0.5px solid #e0e0e0;
          border-radius:12px;
          padding:1.5rem;
        ">
          <div style="margin-bottom:1rem;">
            <label style="font-size:14px;color:#666;display:block;margin-bottom:4px;font-family:'Patrick Hand',cursive;">Username</label>
            <input id="login-username" type="text" autocomplete="off" autocorrect="off"
              autocapitalize="off" spellcheck="false"
              placeholder="e.g. Swin01"
              style="
                width:100%;padding:10px 12px;
                font-size:18px;
                border:0.5px solid #ccc;
                border-radius:8px;
                font-family:'Patrick Hand',cursive;
                box-sizing:border-box;
              "/>
          </div>
          <div style="margin-bottom:1.25rem;">
            <label style="font-size:14px;color:#666;display:block;margin-bottom:4px;font-family:'Patrick Hand',cursive;">PIN</label>
            <input id="login-pin" type="password" inputmode="numeric" maxlength="4"
              placeholder="4-digit PIN"
              style="
                width:100%;padding:10px 12px;
                font-size:18px;
                border:0.5px solid #ccc;
                border-radius:8px;
                font-family:'Patrick Hand',cursive;
                box-sizing:border-box;
                letter-spacing:6px;
              "/>
          </div>
          <div id="login-error" style="color:#D85A30;font-size:14px;margin-bottom:0.75rem;min-height:20px;font-family:'Patrick Hand',cursive;"></div>
          <button onclick="handleLogin()" class="btn primary" style="width:100%;font-size:16px;padding:12px;">
            Sign in
          </button>
        </div>

        <p style="margin-top:1.5rem;font-size:13px;color:#aaa;font-family:'Patrick Hand',cursive;">
          Teacher? <span onclick="showTeacherLogin()" style="color:#185FA5;cursor:pointer;text-decoration:underline;">Sign in here</span>
        </p>
      </div>
    `;
    document.querySelector(".app").appendChild(div);
  }

  // Hide all other screens, show login
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-login").classList.add("active");

  // Enter key support
  document.getElementById("login-pin").addEventListener("keydown", e => {
    if (e.key === "Enter") handleLogin();
  });
}

async function handleLogin() {
  const username = document.getElementById("login-username").value.trim();
  const pin      = document.getElementById("login-pin").value.trim();
  const errEl    = document.getElementById("login-error");

  errEl.textContent = "";
  if (!username || !pin) { errEl.textContent = "Please enter your username and PIN."; return; }

  // Check teachers first
  const teachers = await dbGet("teachers", {
    username: `eq.${username}`,
    pin: `eq.${pin}`,
    select: "id,username",
  });

  if (teachers.length > 0) {
    currentTeacher = teachers[0];
    currentStudent = null;
    showTeacherDashboard();
    return;
  }

  // Check students
  const students = await dbGet("students", {
    username: `eq.${username}`,
    pin: `eq.${pin}`,
    select: "id,username,class_id",
  });

  if (students.length === 0) {
    errEl.textContent = "Username or PIN not found. Try again.";
    return;
  }

  currentStudent = students[0];
  currentTeacher = null;

  // Load their progress from Supabase into the local progress object
  await loadProgressFromSupabase();

  // Go to home screen
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-home").classList.add("active");
  renderHome();
}

/* ── Load progress from Supabase ─────────────────────────────── */
async function loadProgressFromSupabase() {
  if (!currentStudent) return;
  const rows = await dbGet("progress", {
    student_id: `eq.${currentStudent.id}`,
    select: "set_id,step_idx",
  });
  progress = {};
  rows.forEach(r => {
    if (!progress[r.set_id]) progress[r.set_id] = {};
    progress[r.set_id][r.step_idx] = true;
  });
}

/* ── REPLACEMENT persistence functions ───────────────────────── */
/* Replace these three functions in app.js:                       */

async function saveProgress() {
  // No-op: saving happens in markStep directly
}

async function markStep(setId, idx) {
  if (!progress[setId]) progress[setId] = {};
  progress[setId][idx] = true;

  if (currentStudent) {
    await dbUpsert("progress", {
      student_id: currentStudent.id,
      set_id: setId,
      step_idx: idx,
    });
  }
}

function isStepDone(setId, idx) {
  return !!(progress[setId] && progress[setId][idx]);
}

/* ── Logout ──────────────────────────────────────────────────── */
function logout() {
  currentStudent = null;
  currentTeacher = null;
  progress = {};
  showLoginScreen();
}

/* ── Teacher login ───────────────────────────────────────────── */
function showTeacherLogin() {
  const errEl = document.getElementById("login-error");
  errEl.textContent = "Enter your teacher username and PIN above.";
  document.getElementById("login-username").focus();
}

/* ═══════════════════════════════════════════════════════════════
   TEACHER DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
async function showTeacherDashboard() {
  // Create dashboard screen if needed
  if (!document.getElementById("screen-teacher")) {
    const div = document.createElement("div");
    div.id = "screen-teacher";
    div.className = "screen";
    document.querySelector(".app").appendChild(div);
  }

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-teacher").classList.add("active");
  document.getElementById("screen-teacher").innerHTML = `
    <div style="padding:1rem 0;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <h1 style="margin:0;">Teacher Dashboard</h1>
        <button class="btn" onclick="logout()">Sign out</button>
      </div>
      <p class="sub">Loading classes...</p>
    </div>`;

  // Fetch classes
  const classes = await dbGet("classes", { select: "id,name", order: "name.asc" });

  // Fetch all students with progress counts
  const students = await dbGet("students", { select: "id,username,class_id", order: "username.asc" });

  // Fetch all progress rows
  const allProgress = await dbGet("progress", { select: "student_id,set_id,step_idx" });

  // Build progress map per student
  const progMap = {};
  allProgress.forEach(r => {
    if (!progMap[r.student_id]) progMap[r.student_id] = {};
    if (!progMap[r.student_id][r.set_id]) progMap[r.student_id][r.set_id] = {};
    progMap[r.student_id][r.set_id][r.step_idx] = true;
  });

  // Helper: is a set complete for a student?
  function setCompleteForStudent(studentId, setDef) {
    const sp = progMap[studentId] || {};
    return setDef.steps.length > 0 && setDef.steps.every((_, i) => sp[setDef.id] && sp[setDef.id][i]);
  }

  // Render
  let html = `
    <div style="padding:1rem 0;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <h1 style="margin:0;">Teacher Dashboard</h1>
        <button class="btn" onclick="logout()">Sign out</button>
      </div>`;

  if (classes.length === 0) {
    html += `<p class="sub">No classes found. Add classes and students in Supabase.</p>`;
  }

  classes.forEach(cls => {
    const classStudents = students.filter(s => s.class_id === cls.id);
    html += `
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:18px;color:#185FA5;margin-bottom:0.75rem;border-bottom:0.5px solid #e0e0e0;padding-bottom:0.5rem;">
          ${cls.name} — ${classStudents.length} student${classStudents.length !== 1 ? "s" : ""}
        </h2>`;

    if (classStudents.length === 0) {
      html += `<p class="sub" style="margin:0;">No students in this class yet.</p>`;
    } else {
      html += `<div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-family:'Patrick Hand',cursive;font-size:14px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="text-align:left;padding:8px 10px;border:0.5px solid #e0e0e0;white-space:nowrap;">Student</th>`;

      CURRICULUM.forEach(c => {
        html += `<th style="padding:6px 4px;border:0.5px solid #e0e0e0;white-space:nowrap;text-align:center;font-size:12px;">${c.homeLabel}</th>`;
      });

      html += `<th style="padding:6px 8px;border:0.5px solid #e0e0e0;text-align:center;font-size:12px;">Total</th>
            </tr>
          </thead>
          <tbody>`;

      classStudents.forEach(student => {
        let completedSets = 0;
        html += `<tr>
          <td style="padding:8px 10px;border:0.5px solid #e0e0e0;font-weight:600;white-space:nowrap;">${student.username}</td>`;

        CURRICULUM.forEach(c => {
          const done = setCompleteForStudent(student.id, c);
          if (done) completedSets++;
          const sp = progMap[student.id] || {};
          const stepsTotal = c.steps.length;
          const stepsDone  = stepsTotal > 0
            ? c.steps.filter((_, i) => sp[c.id] && sp[c.id][i]).length
            : 0;
          const pct = stepsTotal > 0 ? Math.round(stepsDone / stepsTotal * 100) : 0;

          html += `<td style="
            padding:4px;
            border:0.5px solid #e0e0e0;
            text-align:center;
            background:${done ? "#E1F5EE" : pct > 0 ? "#FFF8E6" : "#fff"};
          ">
            <span style="font-size:13px;color:${done ? "#0F6E56" : pct > 0 ? "#BA7517" : "#ccc"};">
              ${done ? "✓" : pct > 0 ? pct + "%" : "—"}
            </span>
          </td>`;
        });

        html += `<td style="padding:6px 8px;border:0.5px solid #e0e0e0;text-align:center;font-weight:600;color:#185FA5;">
            ${completedSets}/${CURRICULUM.length}
          </td>
        </tr>`;
      });

      html += `</tbody></table></div>`;
    }
    html += `</div>`;
  });

  // Students without a class
  const unassigned = students.filter(s => !s.class_id);
  if (unassigned.length > 0) {
    html += `<div style="margin-bottom:2rem;">
      <h2 style="font-size:18px;color:#888;margin-bottom:0.75rem;">Unassigned students</h2>
      <p style="font-family:'Patrick Hand',cursive;font-size:14px;color:#666;">
        ${unassigned.map(s => s.username).join(", ")}
      </p>
    </div>`;
  }

  html += `</div>`;
  document.getElementById("screen-teacher").innerHTML = html;
}
