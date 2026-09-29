"use strict";

// Placeholder figures from the design handoff. Each row is [task, result].
const AGENTS = [
  {"name": "Admissions Counselling", "kind": "Specialist", "desc": "Engages prospects and applicants, and brings counsellors in where they add the most value.", "clock": "always on · fair week", "goal": "Follow up every lead from this weekend's education fair.", "plan": "4,000 new leads. Call each back within minutes, answer programme questions, qualify intent, and book counsellor meetings for the strongest.", "target": 212, "unit": "counsellor meetings booked", "rows": [["Import", "4,000 fair leads added"], ["Voice", "1,900 callbacks within 10 minutes"], ["Chat", "2,860 programme questions answered"], ["Qualify", "620 marked high intent"], ["Book", "meetings placed in counsellor calendars"], ["Sync", "CRM updated with every outcome"]]},
  {"name": "Student Services", "kind": "Specialist", "desc": "Resolves everyday needs: academics, exams, fees, requests and campus services.", "clock": "always on · week 3", "goal": "Clear this week's student service queue.", "plan": "Resolve routine queries in the portal and on WhatsApp, and route the rest to the right office with context.", "target": 1070, "unit": "queries resolved without a ticket", "rows": [["Intake", "1,240 open queries"], ["Chat", "860 resolved in the portal"], ["WhatsApp", "210 answered on WhatsApp"], ["Route", "140 sent to the right office"], ["Escalate", "12 sensitive cases to wellbeing"], ["Report", "recurring issues summarised"]]},
  {"name": "Careers & Placement", "kind": "Specialist", "desc": "Supports students and placement teams through readiness, eligibility and deadlines.", "clock": "running · drive in 9 days", "goal": "Get every eligible student registered before the placement drive.", "plan": "Check eligibility, answer questions, remind by voice and WhatsApp, and flag students who are not ready.", "target": 1640, "unit": "students registered", "rows": [["Check", "1,860 students checked for eligibility"], ["Chat", "eligibility questions answered"], ["Voice", "420 reminder calls"], ["WhatsApp", "deadline alerts sent"], ["Flag", "96 not placement-ready flagged"], ["Sync", "placement cell updated"]]},
  {"name": "Alumni Engagement", "kind": "Specialist", "desc": "Keeps the alumni line open: events, giving, mentorship and updates.", "clock": "running · event in 3 weeks", "goal": "Fill the Mumbai alumni meet-up.", "plan": "Invite alumni in the region with personalised calls and messages, take registrations in the conversation, and follow up.", "target": 420, "unit": "registrations", "rows": [["Segment", "3,200 alumni in the region"], ["Voice", "1,100 personalised calls"], ["WhatsApp", "invites and reminders sent"], ["Chat", "event questions answered"], ["Register", "registrations taken in the chat"], ["Follow up", "no-shows contacted"]]},
  {"name": "Employer Engagement", "kind": "Specialist", "desc": "Works with recruiters on scheduling, requirements and confirmation of interest.", "clock": "running · season opens", "goal": "Confirm slots with 60 recruiters for the placement season.", "plan": "Contact each recruiter, gather role requirements, propose dates and confirm slots.", "target": 48, "unit": "recruiter slots confirmed", "rows": [["Contact", "60 recruiters contacted"], ["Gather", "role requirements collected"], ["Schedule", "interview dates proposed"], ["Confirm", "48 slots confirmed"], ["Remind", "reminders before each visit"], ["Report", "placement team briefed"]]},
  {"name": "Academic Operations", "kind": "Specialist", "desc": "Handles timetables, attendance, exam logistics and faculty schedules.", "clock": "running · semester in 5 days", "goal": "Resolve timetable clashes before the semester starts.", "plan": "Check every timetable, find clashes, draft alternatives, confirm with faculty and notify students.", "target": 73, "unit": "clashes resolved", "rows": [["Scan", "4,800 timetables checked"], ["Detect", "73 clashes found"], ["Propose", "alternatives drafted"], ["Faculty", "changes confirmed with faculty"], ["Notify", "students told in the portal"], ["Monitor", "attendance watched in week one"]]},
  {"name": "Conversion", "kind": "Outcome", "desc": "Finds where people drop off and who can still be influenced to enrol.", "clock": "running · deposit window", "goal": "We need another 120 enrolments. Where should we focus?", "plan": "410 offer holders have not paid a deposit. Rank them by likelihood to convert, answer their fee and hostel questions, call the top 180, and send the highest intent to counsellors.", "target": 120, "unit": "additional enrolments", "rows": [["Analyse", "410 offer holders without a deposit"], ["Prioritise", "180 most likely to convert"], ["Chat", "fee and hostel questions answered"], ["Voice", "180 offer-holder calls placed"], ["Counsellors", "44 high-intent handovers"], ["Monitor", "deposits tracked daily"]]},
  {"name": "Completion", "kind": "Outcome", "desc": "Gets started applications finished before the deadline.", "clock": "running · day 6 of 30", "goal": "Increase applications completed this month by 15%.", "plan": "1,140 applications are incomplete. Help with documents in the portal, call applicants who have gone quiet, remind before deadlines, and hand hard cases to counsellors.", "target": 171, "unit": "more applications completed", "rows": [["Analyse", "1,140 incomplete applications found"], ["Segment", "4 groups by what is blocking them"], ["Chat", "document help inside the portal"], ["Voice", "86 quiet applicants called today"], ["WhatsApp", "312 deadline reminders sent"], ["Counsellors", "38 handed over with context"]]},
  {"name": "Revenue", "kind": "Outcome", "desc": "Works backwards from a revenue number to the audience and outreach.", "clock": "running · 4 weeks left", "goal": "Generate ₹50 lakh from alumni event registrations.", "plan": "At ₹5,000 a registration that is 1,000 paid places. Rank alumni by likelihood, call the strongest segments and answer payment questions.", "target": 50, "unit": "₹ lakh in registrations", "rows": [["Model", "1,000 registrations needed"], ["Segment", "6,400 alumni ranked"], ["Voice", "calls to the top segments"], ["WhatsApp", "early-bird offers sent"], ["Chat", "payment questions answered"], ["Monitor", "revenue tracked daily"]]},
  {"name": "Intervention", "kind": "Outcome", "desc": "Surfaces the students and cases that need attention before they escalate.", "clock": "running · weekly", "goal": "Who needs intervention this week, and why?", "plan": "Read attendance, marks and fee status, find students at risk, and route each one to the right mentor or counsellor.", "target": 18, "unit": "students reached this week", "rows": [["Scan", "attendance, marks and fees read"], ["Detect", "64 students at risk"], ["Prioritise", "18 need action this week"], ["Route", "mentors and counsellors assigned"], ["Chat", "check-in messages sent"], ["Track", "outcomes logged"]]},
  {"name": "Re-engagement", "kind": "Outcome", "desc": "Brings back applicants and students who have gone quiet.", "clock": "running · new intake", "goal": "Re-engage last cycle's lapsed applicants.", "plan": "2,300 applicants stopped last cycle. Group them by why they stopped, call and message with what has changed, and hand interested ones to counsellors.", "target": 310, "unit": "applications restarted", "rows": [["Find", "2,300 lapsed applicants"], ["Segment", "grouped by why they stopped"], ["Voice", "740 calls placed"], ["WhatsApp", "personalised nudges sent"], ["Chat", "new intake questions answered"], ["Hand over", "130 to counsellors"]]},
  {"name": "Leadership Briefing", "kind": "Outcome", "desc": "Prepares a clear summary of what changed and what needs a decision.", "clock": "running · before Monday", "goal": "Brief me on the admissions position before Monday's board meeting.", "plan": "Pull data from every connected system, compare with last year, and write a one-page brief with the decisions needed.", "target": 1, "unit": "board brief ready", "rows": [["Gather", "data from 5 systems"], ["Compare", "against last year at this point"], ["Explain", "3 changes that matter"], ["Recommend", "2 decisions needed"], ["Draft", "board summary written"], ["Share", "sent to your inbox"]]}
];

const SPECIALIST = [0, 1, 2, 3, 4, 5];
const OUTCOME = [6, 7, 8, 9, 10, 11];

const TICK_MS = 400;
const COUNT_TICKS = 6;   // ticks for the result to count up (2.4s)
const CYCLE_TICKS = 22;  // ticks before moving to the next agent (~9s)
const HOLD_MS = 12000;   // after a hover or click, replay the chosen agent this long
const RING = 414.7;      // circumference of the r=66 progress ring

const DONE_NOTE = "Target reached. Summary sent to you with what worked and what to change next time.";
const WORKING_NOTE = "Working towards the target. Updates as each step completes.";

const state = { spec: SPECIALIST[0], out: OUTCOME[0], tick: 0 };
let pausedAt = 0;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function restartAnimation(node) {
  node.style.animation = "none";
  void node.offsetWidth;
  node.style.animation = "";
}

function withoutTransition(node, apply) {
  node.style.transition = "none";
  apply();
  void node.offsetWidth;
  node.style.transition = "";
}

/* ---------- Agent lists ---------- */

function buildList(kind, indices) {
  const list = document.querySelector(`[data-list="${kind}"]`);
  return indices.map((idx) => {
    const agent = AGENTS[idx];
    const item = el("li", "agent-item");
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    const head = el("div", "agent-item-head");
    head.append(el("span", "agent-item-name", agent.name), el("span", "agent-item-arrow", "→"));
    head.lastChild.setAttribute("aria-hidden", "true");
    item.append(head, el("div", "agent-item-desc", agent.desc));

    const select = () => {
      pausedAt = Date.now();
      if (state[kind] !== idx) {
        state[kind] = idx;
        state.tick = 0;
        render();
      }
    };
    item.addEventListener("mouseenter", select);
    item.addEventListener("click", select);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select();
      }
    });
    list.append(item);
    return { idx, item };
  });
}

/* ---------- Panels ---------- */

function buildRows(container, agent, kind) {
  container.replaceChildren(...agent.rows.map(([task, result]) => {
    const row = el("div", kind === "spec" ? "spec-row" : "out-step");
    const dot = el("span", "dot");
    dot.setAttribute("aria-hidden", "true");
    row.append(dot, el("span", "row-task", task), el("span", "row-status", result));
    return row;
  }));
}

function makePanel(kind) {
  const card = document.querySelector(`[data-panel="${kind}"]`);
  const q = (name) => card.querySelector(`[data-${name}]`);
  return {
    kind,
    card,
    name: q("name"),
    clock: q("clock"),
    goal: q("goal"),
    rows: q("rows"),
    count: q("count"),
    unit: q("unit"),
    note: q("note"),
    pct: q("pct"),
    bar: q("bar"),
    ring: q("ring"),
    shown: null,
    done: null,
  };
}

function formatCount(agent, frac) {
  if (agent.target <= 1) return frac >= 1 ? "1" : "0";
  const n = Math.round(agent.target * frac);
  return (n > 0 ? "+" : "") + n;
}

function renderPanel(panel, idx) {
  const agent = AGENTS[idx];
  const frac = Math.min(1, state.tick / COUNT_TICKS);
  const done = frac >= 1;
  const pct = Math.round(frac * 100) + "%";
  const dash = (frac * RING).toFixed(1) + " " + RING;
  const switched = panel.shown !== idx;

  if (switched) {
    panel.shown = idx;
    panel.name.textContent = agent.name + " Agent";
    panel.clock.textContent = agent.clock;
    panel.goal.textContent = panel.kind === "out" ? `"${agent.goal}"` : agent.goal;
    panel.unit.textContent = agent.unit;
    buildRows(panel.rows, agent, panel.kind);
    restartAnimation(panel.card);
  }

  panel.count.textContent = formatCount(agent, frac);

  // A new agent starts its progress from zero instead of animating back down.
  const setProgress = () => {
    if (panel.bar) panel.bar.style.width = pct;
    if (panel.ring) panel.ring.setAttribute("stroke-dasharray", dash);
  };
  const meter = panel.bar || panel.ring;
  if (switched) withoutTransition(meter, setProgress);
  else setProgress();
  if (panel.pct) panel.pct.textContent = pct;

  if (switched || panel.done !== done) {
    panel.done = done;
    panel.note.textContent = done ? DONE_NOTE : WORKING_NOTE;
    panel.note.classList.toggle("is-done", done);
    restartAnimation(panel.note);
  }
}

/* ---------- Loop ---------- */

let lists, panels;

function render() {
  lists.spec.forEach(({ idx, item }) => item.classList.toggle("is-active", idx === state.spec));
  lists.out.forEach(({ idx, item }) => item.classList.toggle("is-active", idx === state.out));
  renderPanel(panels.spec, state.spec);
  renderPanel(panels.out, state.out);
}

function next(indices, current) {
  return indices[(indices.indexOf(current) + 1) % indices.length];
}

function tick() {
  state.tick += 1;
  if (state.tick > CYCLE_TICKS) {
    state.tick = 0;
    const holding = pausedAt && Date.now() - pausedAt < HOLD_MS;
    if (!holding) {
      state.spec = next(SPECIALIST, state.spec);
      state.out = next(OUTCOME, state.out);
    }
  }
  render();
}

/* ---------- Header menus ---------- */

function initMenus() {
  const menus = [...document.querySelectorAll("[data-menu]")];
  const setOpen = (menu, open) => {
    menu.lastElementChild.hidden = !open;
    menu.setAttribute("aria-expanded", String(open));
  };
  const openOnly = (menu) => menus.forEach((m) => setOpen(m, m === menu));
  const closeAll = () => menus.forEach((m) => setOpen(m, false));

  menus.forEach((menu) => {
    menu.addEventListener("mouseenter", () => openOnly(menu));
    menu.addEventListener("mouseleave", closeAll);
    menu.addEventListener("click", () => openOnly(menu));
    menu.addEventListener("keydown", (e) => {
      if (e.target !== menu) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openOnly(menu);
      }
    });
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  document.addEventListener("click", (e) => {
    if (!menus.some((m) => m.contains(e.target))) closeAll();
  });
}

function init() {
  initMenus();
  lists = { spec: buildList("spec", SPECIALIST), out: buildList("out", OUTCOME) };
  panels = { spec: makePanel("spec"), out: makePanel("out") };
  render();
  setInterval(tick, TICK_MS);
}

init();
